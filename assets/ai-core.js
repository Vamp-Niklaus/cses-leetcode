// ai-core.js
// Prompt builders and response parsers for the Hints / Debug helper.
// Pure functions only: no DOM, no chrome.* APIs, so they can be tested with plain node.

// Everything the model writes comes after this sentence. Google AI Mode echoes our
// prompt back on the page, so we slice the page text after the LAST copy of it.
export const SENTINEL = "Begin your reply now.";

// The prompt never contains this token written out in full ("ENDMARK" + "7" are described
// separately), so seeing it on the page means the model really finished.
export const END_TOKEN = "ENDMARK7";
export const END_RE = /ENDMARK7/;
const END_INSTRUCTION = "Finish with the word ENDMARK immediately followed by the digit 7 (no space).";

const MAX_STATEMENT = 3500;
const MAX_CODE = 12000;

const LANG_NAMES = { cpp: "C++", c: "C", python: "Python 3", java: "Java" };
export const langName = (id) => LANG_NAMES[id] || id || "C++";

// Text of the descriptions used in the prompts. If a parsed section still starts with one
// of these, we are looking at the echoed prompt and not at an answer.
const ECHO_PREFIXES = ["one sentence:", "2-3 sentences:", "the complete solution", "a clean", "ok or bad", "one-line note", "one or two sentences"];

function clip(s, n) {
  s = String(s || "").trim();
  return s.length > n ? s.slice(0, n) + "\n[...truncated]" : s;
}

export function buildHintsPrompt({ taskId, title, statement, language }) {
  const lang = langName(language);
  return [
    `You are a competitive programming tutor. CSES problem ${taskId || ""} "${title || ""}".`,
    `Problem statement:`,
    `"""`,
    clip(statement, MAX_STATEMENT),
    `"""`,
    `Work only from the statement above; do not search. Reply using exactly these markers, each at the start of its own line, followed by its text:`,
    `@@H1@@ one sentence: only the topic or data structure to think about, no algorithm detail`,
    `@@H2@@ 2-3 sentences: the key idea or state transition, no code`,
    `@@H3@@ the complete solution explained step by step in plain English, no code, with complexity and any integer overflow caveat`,
    `@@ANS@@ a clean ${lang} solution in a single code block`,
    `${END_INSTRUCTION} No other text. ${SENTINEL}`,
  ].join("\n");
}

export function numberLines(code) {
  return String(code || "").split("\n").map((l, i) => `${i + 1}: ${l}`).join("\n");
}

export function formatFailures(failures) {
  return (failures || []).slice(0, 4).map((f, i) =>
    `Case ${i + 1} (${f.verdict || "fail"}):\ninput:\n${clip(f.input, 300)}\nexpected:\n${clip(f.expected, 300)}\nactual:\n${clip(f.actual, 300)}`
  ).join("\n");
}

export function buildDebugPrompt({ taskId, title, statement, code, language, failures = [] }) {
  const lang = langName(language);
  return [
    `You are a strict code checker for CSES problem ${taskId || ""} "${title || ""}".`,
    `Problem statement:`,
    `"""`,
    clip(statement, 1800),
    `"""`,
    `Check the ${lang} code below for (1) syntax or compile errors, (2) integer overflow, and (3) logic errors that explain the failing test cases below, if any. Also give a one-line verdict on whether the approach fits the problem constraints (including time limit). Do not rewrite the program: for each problem give the smallest keyword-level change. The "N: " prefix on each line is a line number and is not part of the code.`,
    `"""`,
    clip(numberLines(code), MAX_CODE),
    `"""`,
    ...(failures && failures.length ? [
      `Failing test cases from the judge (expected vs actual output). Extra lines in actual output mean the program prints something it should not; that is a logic error:`,
      `"""`,
      formatFailures(failures),
      `"""`,
    ] : []),
    `Reply using exactly these markers, each at the start of its own line:`,
    `@@ISSUE@@ line=<number> | type=<syntax, overflow or logic> | find=<exact text from that line> | replace=<replacement text> | why=<short reason>`,
    `(one ISSUE line per problem; if there is none write: @@ISSUE@@ none)`,
    `@@APPROACH@@ ok or bad | one-line note`,
    `@@NOTE@@ one or two sentences saying what is wrong`,
    `${END_INSTRUCTION} No other text. ${SENTINEL}`,
  ].join("\n");
}

// Returns only what the model wrote: the page text after the last echoed prompt, cut at the end token.
export function extractAnswer(text) {
  text = String(text || "");
  const i = text.lastIndexOf(SENTINEL);
  if (i >= 0) text = text.slice(i + SENTINEL.length);
  const e = text.search(END_RE);
  const hasEnd = e >= 0;
  if (hasEnd) text = text.slice(0, e);
  return { text: text.replace(/\r/g, ""), hasEnd };
}

function isEcho(s) {
  const t = s.trim().toLowerCase();
  return ECHO_PREFIXES.some((p) => t.startsWith(p));
}

function splitMarkers(text, names) {
  const re = new RegExp("@@(" + names.join("|") + ")@@", "g");
  const found = [];
  let m;
  while ((m = re.exec(text))) found.push({ name: m[1], start: m.index, bodyStart: m.index + m[0].length });
  const out = {};
  found.forEach((f, i) => {
    const end = i + 1 < found.length ? found[i + 1].start : text.length;
    (out[f.name] = out[f.name] || []).push(text.slice(f.bodyStart, end).trim());
  });
  return out;
}

// Code blocks copied from the page carry UI noise such as "C++" or "Copy code" on their own lines.
export function cleanCode(s) {
  const lines = String(s || "").replace(/^```[a-z+]*\n?/i, "").replace(/\n?```\s*$/, "").split("\n");
  while (lines.length && /^(c\+\+|cpp|c|python|java|copy( code)?|code)$/i.test(lines[0].trim())) lines.shift();
  return lines.join("\n").trim();
}

export function parseHints(pageText) {
  const { text, hasEnd } = extractAnswer(pageText);
  const parts = splitMarkers(text, ["H1", "H2", "H3", "ANS"]);
  const pick = (k) => {
    const v = (parts[k] || []).filter((x) => x && !isEcho(x)).pop();
    return v || "";
  };
  const h = { h1: pick("H1"), h2: pick("H2"), h3: pick("H3"), ans: cleanCode(pick("ANS")) };
  if (!h.h1 && !h.h2 && !h.h3 && !h.ans) return null;
  h.complete = hasEnd && !!(h.h1 && h.h2 && h.h3 && h.ans);
  return h;
}

const unquote = (s) => String(s || "").trim().replace(/^[`'"]+|[`'"]+$/g, "");

const ISSUE_RE = /line\s*=\s*(\d+)\s*\|\s*type\s*=\s*([A-Za-z]+)\s*\|\s*find\s*=\s*(.*?)\s*\|\s*replace\s*=\s*(.*?)\s*\|\s*why\s*=\s*(.*)$/s;

export function parseDebug(pageText) {
  const { text, hasEnd } = extractAnswer(pageText);
  const parts = splitMarkers(text, ["ISSUE", "APPROACH", "NOTE"]);
  if (!parts.ISSUE && !parts.APPROACH && !parts.NOTE) return null;

  const issues = [];
  for (const body of parts.ISSUE || []) {
    const m = ISSUE_RE.exec(body.replace(/\n+/g, " "));
    if (!m) continue;
    issues.push({
      line: parseInt(m[1], 10),
      type: /overflow/i.test(m[2]) ? "overflow" : /logic/i.test(m[2]) ? "logic" : "syntax",
      find: unquote(m[3]),
      replace: unquote(m[4]),
      why: m[5].trim(),
    });
  }

  let approach = { ok: null, note: "" };
  const ap = (parts.APPROACH || []).filter((x) => x && !isEcho(x)).pop();
  if (ap) {
    const m = /^(ok|bad)\b\s*\|?\s*(.*)$/is.exec(ap);
    if (m) approach = { ok: m[1].toLowerCase() === "ok", note: m[2].trim() };
  }
  const note = (parts.NOTE || []).filter((x) => x && !isEcho(x)).pop() || "";

  if (!issues.length && approach.ok === null && !note && !(parts.ISSUE || []).some((b) => /^none\b/i.test(b))) return null;
  return { issues, approach, note, complete: hasEnd };
}

// Finds where an issue's "find" text sits in the code. The model's line number can be off by one or
// two, so nearby lines are searched too. Returns a 1-based Monaco-style range or null.
export function locateFix(lines, issue) {
  const find = issue.find || "";
  const n = lines.length;
  const order = [0, 1, -1, 2, -2, 3, -3].map((d) => issue.line + d).filter((l) => l >= 1 && l <= n);

  if (!find) {
    // Nothing to match (typically a missing character): insert at the end of the stated line.
    const l = order[0];
    if (!l || !issue.replace) return null;
    return { line: l, startCol: lines[l - 1].length + 1, endCol: lines[l - 1].length + 1, text: issue.replace };
  }

  const loose = new RegExp(find.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s*"));
  for (const l of order) {
    const s = lines[l - 1];
    const i = s.indexOf(find);
    if (i >= 0) return { line: l, startCol: i + 1, endCol: i + 1 + find.length, text: issue.replace };
  }
  for (const l of order) {
    const m = loose.exec(lines[l - 1]);
    if (m) return { line: l, startCol: m.index + 1, endCol: m.index + 1 + m[0].length, text: issue.replace };
  }
  return null;
}
