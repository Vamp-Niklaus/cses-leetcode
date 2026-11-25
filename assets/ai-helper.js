// ai-helper.js
// "Hints" and "Debug" buttons for the CSES workspace, backed by Google AI Mode (see ai-background.js).
// Wired in from workspace-layout.js with one call: mountAiButtons(nav, { meta, problemNode }).

import { buildHintsPrompt, buildDebugPrompt, parseHints, parseDebug, locateFix } from "./ai-core.js";

const STYLE_ID = "csescode-ai-styles";
const PANEL_ID = "csescode-ai-panel";
const HINT_LEVELS = [
  { key: "h1", label: "Hint 1", title: "Which topic or data structure to think about" },
  { key: "h2", label: "Hint 2", title: "The key idea" },
  { key: "h3", label: "Hint 3", title: "The full solution in plain words" },
  { key: "ans", label: "Answer", title: "Reference code" },
];
const ERRORS = {
  captcha: "Google asked for a CAPTCHA. Open google.com once, solve it, then try again.",
  "login-or-consent": "Google wants you to sign in or accept its consent page. Do that in a normal tab, then retry.",
  "input-not-found": "Couldn't find the AI Mode input box on the Google page (the page layout may have changed).",
};

const hints = new Map(); // "<task>:<lang>" -> parsed hints
let ctx = null;
let panel = null;
let decorations = null;
let lastRun = null; // latest Run results from the workspace: { taskId, results, cases }
window.addEventListener("csescode:test-results", (e) => { lastRun = e.detail || null; });

// Failing cases from the last Run of this task, so Debug can see what the code actually printed.
function failuresFor(taskId) {
  if (!lastRun || lastRun.taskId !== taskId) return [];
  return (lastRun.results || [])
    .filter((r) => r.verdict === "fail" || r.verdict === "runtime-error" || r.verdict === "timeout")
    .map((r) => {
      const c = (lastRun.cases || []).find((x) => x.caseId === r.caseId) || {};
      return {
        verdict: r.verdict,
        input: c.input || "",
        expected: c.output || "",
        actual: r.verdict === "timeout" ? "(timed out)" : (r.actualOutput ?? r.stderr ?? ""),
      };
    });
}

// ---------- small helpers ----------

function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) el.append(kid && kid.nodeType ? kid : document.createTextNode(kid == null ? "" : String(kid)));
  return el;
}

function getEditor() {
  return window._csesMonacoEditor || null;
}

function getLanguage() {
  try {
    return getEditor().getModel().getLanguageId() || "cpp";
  } catch (_) {
    return "cpp";
  }
}

function problemContext() {
  const node = (ctx && ctx.problemNode) || document.querySelector(".md");
  const text = node ? node.innerText || node.textContent || "" : "";
  return {
    taskId: (location.pathname.match(/\/task\/(\d+)/) || [])[1] || "",
    title: (ctx && ctx.meta && ctx.meta.title) || document.title,
    statement: text.replace(/\n{3,}/g, "\n\n").trim(),
    language: getLanguage(),
  };
}

function askAI(prompt) {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage({ type: "ai-mode-query", prompt, timeoutMs: 75000 }, (res) => {
        if (chrome.runtime.lastError) return resolve({ ok: false, error: chrome.runtime.lastError.message });
        resolve(res || { ok: false, error: "no-response" });
      });
    } catch (e) {
      resolve({ ok: false, error: String((e && e.message) || e) });
    }
  });
}

const failText = (res) => ERRORS[res.error] || `Google AI Mode request failed (${res.error || "unknown error"}).`;

// ---------- styles ----------

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = h("style", { id: STYLE_ID });
  style.textContent = `
    #${PANEL_ID}{position:fixed;right:16px;bottom:16px;width:390px;max-width:calc(100vw - 32px);max-height:64vh;display:flex;flex-direction:column;
      background:#1e1f24;color:#e6e6e6;border:1px solid #3a3b42;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.45);z-index:2147483000;
      font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
    #${PANEL_ID} *{box-sizing:border-box}
    .csai-head{display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid #3a3b42}
    .csai-tab{background:transparent;border:0;color:#9a9ba3;font:inherit;font-weight:600;padding:3px 8px;border-radius:6px;cursor:pointer}
    .csai-tab.on{background:#2c2e36;color:#fff}
    .csai-close{margin-left:auto;background:transparent;border:0;color:#9a9ba3;font-size:18px;line-height:1;cursor:pointer}
    .csai-body{padding:10px;overflow:auto}
    .csai-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
    .csai-btn{background:#2c2e36;color:#e6e6e6;border:1px solid #3f414a;border-radius:6px;padding:4px 10px;font:inherit;cursor:pointer}
    .csai-btn:hover:not(:disabled){background:#383a44}
    .csai-btn:disabled{opacity:.5;cursor:default}
    .csai-btn.on{background:#3b5bdb;border-color:#3b5bdb;color:#fff}
    .csai-btn.go{background:#2f9e44;border-color:#2f9e44;color:#fff}
    .csai-status{color:#9a9ba3;margin:4px 0 8px}
    .csai-err{color:#ff8787;margin:4px 0 8px}
    .csai-text{white-space:pre-wrap;word-break:break-word}
    .csai-code{white-space:pre;overflow:auto;background:#15161a;border:1px solid #3a3b42;border-radius:6px;padding:8px;font:12px/1.4 "Fira Code",Consolas,monospace}
    .csai-issue{border:1px solid #3a3b42;border-radius:8px;padding:8px;margin-bottom:8px;background:#23242a}
    .csai-badge{display:inline-block;border-radius:4px;padding:0 6px;font-size:11px;font-weight:700;margin-right:6px;color:#fff}
    .csai-badge.syntax{background:#e03131}.csai-badge.overflow{background:#e8590c}.csai-badge.logic{background:#7048e8}
    .csai-diff{font:12px/1.4 "Fira Code",Consolas,monospace;margin:6px 0}
    .csai-diff del{background:rgba(224,49,49,.25);text-decoration:none;padding:0 2px}
    .csai-diff ins{background:rgba(47,158,68,.3);text-decoration:none;padding:0 2px}
    .csai-note{border-left:3px solid #3b5bdb;padding:4px 8px;margin:8px 0;background:#23242a}
    .csai-note.bad{border-color:#e8590c}.csai-note.ok{border-color:#2f9e44}
    .csai-errline{background:rgba(224,49,49,.18)}
    #csescode-ai-hints-btn.active,#csescode-ai-debug-btn.active{background:rgba(255,255,255,.2)}
  `;
  (document.head || document.documentElement).appendChild(style);
}

// ---------- mounting ----------

export function mountAiButtons(nav, context) {
  ctx = context || {};
  ensureStyles();
  for (const id of ["csescode-ai-hints-btn", "csescode-ai-debug-btn"]) document.getElementById(id)?.remove();
  const mk = (id, label, title, tab) => {
    const b = h("button", { type: "button", id, class: "csescode-nav-btn", title, onclick: (e) => { e.preventDefault(); openPanel(tab); } }, h("span", {}, label));
    nav.appendChild(b);
  };
  mk("csescode-ai-hints-btn", "Hints", "Hint 1 / 2 / 3 and the answer, from Google AI Mode", "hints");
  mk("csescode-ai-debug-btn", "Debug", "Check your code for syntax and overflow errors", "debug");
}

function setNavActive(tab) {
  document.getElementById("csescode-ai-hints-btn")?.classList.toggle("active", tab === "hints");
  document.getElementById("csescode-ai-debug-btn")?.classList.toggle("active", tab === "debug");
}

function closePanel() {
  panel?.remove();
  panel = null;
  clearDecorations();
  setNavActive(null);
}

function openPanel(tab, fromNav = true) {
  if (fromNav && panel && panel.dataset.tab === tab) return closePanel();
  panel?.remove();
  const body = h("div", { class: "csai-body" });
  const tabs = [["hints", "Hints"], ["debug", "Debug"]].map(([k, label]) =>
    h("button", { type: "button", class: "csai-tab" + (k === tab ? " on" : ""), onclick: () => { if (k !== tab) openPanel(k, false); } }, label)
  );
  panel = h("div", { id: PANEL_ID, "data-tab": tab }, h("div", { class: "csai-head" }, tabs, h("button", { type: "button", class: "csai-close", title: "Close", onclick: closePanel }, "×")), body);
  document.body.appendChild(panel);
  setNavActive(tab);
  if (tab === "hints") renderHints(body);
  else renderDebug(body);
}

// ---------- hints ----------

function hintsKey() {
  const c = problemContext();
  return `${c.taskId}:${c.language}`;
}

function renderHints(body) {
  body.textContent = "";
  const key = hintsKey();
  const out = h("div", {});
  const status = h("div", { class: "csai-status" }, "Pick a level. All levels come from one Google AI Mode request, so the first click takes 10–30 s.");
  const buttons = [];
  let shown = null;

  const show = (level) => {
    shown = level.key;
    buttons.forEach((b) => b.classList.toggle("on", b.dataset.key === level.key));
    const data = hints.get(key);
    out.textContent = "";
    const text = data && data[level.key];
    if (!text) return out.append(h("div", { class: "csai-err" }, "This level wasn't in Google's answer. Try Regenerate."));
    out.append(level.key === "ans" ? h("pre", { class: "csai-code" }, text) : h("div", { class: "csai-text" }, text));
    if (data && !data.complete) out.append(h("div", { class: "csai-status" }, "Google's answer was cut off, so some levels may be missing."));
  };

  const load = async (force) => {
    buttons.forEach((b) => (b.disabled = true));
    out.textContent = "";
    status.className = "csai-status";
    status.textContent = "Asking Google AI Mode in a background tab…";
    const res = await askAI(buildHintsPrompt(problemContext()));
    buttons.forEach((b) => (b.disabled = false));
    if (!res.ok) {
      status.className = "csai-err";
      status.textContent = failText(res);
      return false;
    }
    const parsed = parseHints(res.text);
    if (!parsed) {
      status.className = "csai-err";
      status.textContent = "Google answered, but not in the expected format. Try Regenerate.";
      return false;
    }
    hints.set(key, parsed);
    status.textContent = "";
    return true;
  };

  const row = h("div", { class: "csai-row" });
  for (const level of HINT_LEVELS) {
    const b = h("button", { type: "button", class: "csai-btn", title: level.title, "data-key": level.key, onclick: async () => {
      if (!hints.has(key) && !(await load())) return;
      show(level);
    } }, level.label);
    buttons.push(b);
    row.append(b);
  }
  row.append(h("button", { type: "button", class: "csai-btn", title: "Ask Google again", onclick: async () => {
    hints.delete(key);
    if (await load(true)) show(HINT_LEVELS.find((l) => l.key === (shown || "h1")));
  } }, "Regenerate"));

  body.append(row, status, out);
}

// ---------- debug ----------

function clearDecorations() {
  try { decorations && decorations.clear && decorations.clear(); } catch (_) {}
  decorations = null;
}

function decorate(lines) {
  clearDecorations();
  const ed = getEditor();
  if (!ed || !lines.length) return;
  const decs = lines.map((l) => ({ range: { startLineNumber: l, startColumn: 1, endLineNumber: l, endColumn: 1 }, options: { isWholeLine: true, className: "csai-errline" } }));
  try { decorations = ed.createDecorationsCollection(decs); } catch (_) {}
}

function applyIssue(issue) {
  const ed = getEditor();
  if (!ed) return { ok: false, msg: "Editor not found." };
  const model = ed.getModel();
  const lines = model.getValue().split("\n");
  const loc = locateFix(lines, issue);
  if (!loc) return { ok: false, msg: "Couldn't find that text in your code any more." };
  ed.executeEdits("csescode-ai-fix", [{
    range: { startLineNumber: loc.line, startColumn: loc.startCol, endLineNumber: loc.line, endColumn: loc.endCol },
    text: loc.text,
  }]);
  ed.revealLineInCenter && ed.revealLineInCenter(loc.line);
  return { ok: true, line: loc.line };
}

function renderIssue(issue) {
  const state = h("span", { class: "csai-status" });
  const apply = h("button", { type: "button", class: "csai-btn go", onclick: () => {
    const r = applyIssue(issue);
    state.className = r.ok ? "csai-status" : "csai-err";
    state.textContent = r.ok ? ` Applied on line ${r.line}.` : ` ${r.msg}`;
    if (r.ok) apply.disabled = true;
  } }, "Apply fix");
  const goto = h("button", { type: "button", class: "csai-btn", onclick: () => {
    const ed = getEditor();
    ed && ed.revealLineInCenter && ed.revealLineInCenter(issue.line);
    ed && ed.setPosition && ed.setPosition({ lineNumber: issue.line, column: 1 });
  } }, "Go to line");
  const diff = issue.find || issue.replace
    ? h("div", { class: "csai-diff" }, issue.find ? h("del", {}, issue.find) : "", issue.find ? " → " : "insert ", h("ins", {}, issue.replace || "(remove)"))
    : "";
  return h("div", { class: "csai-issue" },
    h("div", {}, h("span", { class: "csai-badge " + issue.type }, issue.type), `Line ${issue.line}`),
    diff,
    h("div", { class: "csai-text" }, issue.why),
    h("div", { class: "csai-row" }, apply, goto, state));
}

function renderDebug(body) {
  body.textContent = "";
  const out = h("div", {});
  const status = h("div", { class: "csai-status" }, "Checks your current code for syntax errors and integer overflow, and whether the approach fits the problem.");
  const run = h("button", { type: "button", class: "csai-btn go", onclick: async () => {
    const ed = getEditor();
    const code = ed ? ed.getValue() : "";
    out.textContent = "";
    clearDecorations();
    if (!code.trim()) { status.className = "csai-err"; status.textContent = "The editor is empty."; return; }
    run.disabled = true;
    status.className = "csai-status";
    status.textContent = "Asking Google AI Mode in a background tab…";
    const pc = problemContext();
    const res = await askAI(buildDebugPrompt({ ...pc, code, failures: failuresFor(pc.taskId) }));
    run.disabled = false;
    if (!res.ok) { status.className = "csai-err"; status.textContent = failText(res); return; }
    const d = parseDebug(res.text);
    if (!d) { status.className = "csai-err"; status.textContent = "Google answered, but not in the expected format. Try again."; return; }
    status.className = "csai-status";
    status.textContent = d.issues.length ? `${d.issues.length} issue${d.issues.length === 1 ? "" : "s"} found.` : "No syntax or overflow problems found.";
    if (!d.complete) status.textContent += " (Google's answer was cut off, so results may be incomplete.)";
    decorate(d.issues.map((i) => i.line));
    for (const issue of d.issues) out.append(renderIssue(issue));
    if (d.approach.note) out.append(h("div", { class: "csai-note " + (d.approach.ok ? "ok" : "bad") }, h("b", {}, d.approach.ok ? "Approach looks fine: " : "Approach check: "), d.approach.note));
    if (d.note) out.append(h("div", { class: "csai-text" }, d.note));
  } }, "Check my code");
  body.append(h("div", { class: "csai-row" }, run), status, out);
}
