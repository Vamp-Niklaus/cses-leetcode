// ai-background.js
// Service-worker side of the AI helper. Loaded from service-worker-loader.js.
//
// Handles { type: "ai-mode-query", prompt, timeoutMs } from the content script:
// opens Google AI Mode in an inactive tab, submits the prompt, waits until the answer ends
// with the end token (or the timeout hits), returns the page text and closes the tab.
// Requests run one at a time so quick repeated clicks don't open a burst of Google tabs.
//
// Personal-use tool: this drives google.com through your own signed-in browser. There is no API.

const AI_MODE_URL = "https://www.google.com/search?udm=50";
const MAX_URL_QUERY = 1800; // longer prompts are typed into the AI Mode box instead of the URL

let queue = Promise.resolve();

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (!msg || msg.type !== "ai-mode-query") return false;
  queue = queue
    .then(() => runQuery(msg))
    .then(sendResponse, (e) => sendResponse({ ok: false, error: String((e && e.message) || e) }));
  return true;
});

async function runQuery({ prompt, timeoutMs = 60000 }) {
  const encoded = encodeURIComponent(prompt);
  const inUrl = encoded.length <= MAX_URL_QUERY;
  const tab = await chrome.tabs.create({ url: inUrl ? `${AI_MODE_URL}&q=${encoded}` : AI_MODE_URL, active: false });
  // A pending executeScript can outlive the worker's idle timer; poke an API every 20 s.
  const keepAlive = setInterval(() => chrome.runtime.getPlatformInfo(() => {}), 20000);
  try {
    await waitForLoad(tab.id, 20000);
    if (!inUrl) {
      try {
        const [res] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: fillAndSubmit, args: [prompt] });
        if (!res || !res.result || !res.result.ok) return { ok: false, error: (res && res.result && res.result.error) || "input-not-found" };
      } catch (_) {
        // The page may navigate the instant the prompt is submitted, which drops this call's result.
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
    const [res] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: waitForAnswer, args: [timeoutMs] });
    return (res && res.result) || { ok: false, error: "no-result" };
  } catch (e) {
    return { ok: false, error: String((e && e.message) || e) };
  } finally {
    clearInterval(keepAlive);
    chrome.tabs.remove(tab.id).catch(() => {});
  }
}

function waitForLoad(tabId, ms) {
  return new Promise((resolve) => {
    const done = () => {
      chrome.tabs.onUpdated.removeListener(onUpdated);
      clearTimeout(timer);
      resolve();
    };
    const onUpdated = (id, info) => {
      if (id === tabId && info.status === "complete") done();
    };
    const timer = setTimeout(done, ms);
    chrome.tabs.onUpdated.addListener(onUpdated);
    chrome.tabs.get(tabId).then((t) => t.status === "complete" && done()).catch(() => {});
  });
}

// ---- Functions below are serialized into the Google page: they must stay self-contained. ----

async function fillAndSubmit(prompt) {
  const find = () =>
    document.querySelector("textarea") ||
    document.querySelector('[contenteditable="true"]') ||
    document.querySelector('[role="textbox"]');
  let el = null;
  for (let i = 0; i < 40 && !(el = find()); i++) await new Promise((r) => setTimeout(r, 250));
  if (!el) return { ok: false, error: "input-not-found" };
  el.focus();
  if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
    const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value").set;
    setter.call(el, prompt);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  } else {
    document.execCommand("selectAll");
    document.execCommand("insertText", false, prompt);
  }
  await new Promise((r) => setTimeout(r, 400));
  const btn = document.querySelector('button[aria-label*="Send" i], button[aria-label*="Submit" i], button[type="submit"]');
  if (btn) {
    btn.click();
  } else {
    for (const type of ["keydown", "keypress", "keyup"]) {
      el.dispatchEvent(new KeyboardEvent(type, { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
    }
  }
  return { ok: true };
}

function waitForAnswer(timeoutMs) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    const tick = () => {
      const text = (document.body && document.body.innerText) || "";
      if (/\/sorry\//.test(location.pathname) || /unusual traffic from your computer/i.test(text)) {
        return resolve({ ok: false, error: "captcha", text: "" });
      }
      if (/accounts\.google\.com|consent\.google\./.test(location.hostname)) {
        return resolve({ ok: false, error: "login-or-consent", text: "" });
      }
      if (/ENDMARK7/.test(text)) return resolve({ ok: true, done: true, text });
      if (Date.now() - t0 > timeoutMs) return resolve({ ok: true, done: false, text });
      setTimeout(tick, 700);
    };
    tick();
  });
}
