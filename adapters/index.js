/**
 * Judge Adapter Registry
 * Dispatches code execution to built-in Judge0 or user-written custom adapter script.
 */

import { runJudge0 } from "./judge0.js";

export const DUMMY_ADAPTER_TEMPLATE = `// Custom Adapter Script
// Write your custom HTTP call below. Must return { output, compileError, runtimeError, timeMs }
async function run({ url, apiKey, language, code, stdin, signal }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "Authorization": \`Bearer \${apiKey}\` } : {})
    },
    body: JSON.stringify({ language, code, stdin }),
    signal
  });

  if (res.status === 429) return { kind: "rate-limited" };
  if (!res.ok) return { kind: "infra-error" };

  const data = await res.json();
  return {
    kind: "ok",
    result: {
      output: data.stdout ?? data.output ?? "",
      compileError: data.compileError ?? null,
      runtimeError: data.runtimeError ?? null,
      timeMs: data.timeMs ?? null
    }
  };
}`;

async function ensureOffscreenDocument() {
  if (chrome.offscreen && chrome.offscreen.hasDocument) {
    const exists = await chrome.offscreen.hasDocument();
    if (!exists) {
      await chrome.offscreen.createDocument({
        url: "offscreen.html",
        reasons: ["IFRAME_SCRIPTING"],
        justification: "Execute user custom adapter script in sandbox",
      });
    }
  }
}

async function runCustomInSandbox(code, params) {
  try {
    await ensureOffscreenDocument();

    return await new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: "EXECUTE_CUSTOM_ADAPTER",
          code: code || DUMMY_ADAPTER_TEMPLATE,
          params,
        },
        (resp) => {
          if (chrome.runtime.lastError) {
            console.error("[Leetify] Sandbox message error:", chrome.runtime.lastError);
            resolve({ kind: "infra-error" });
            return;
          }
          if (resp && resp.ok) {
            resolve(resp.result);
          } else {
            console.error("[Leetify] Custom adapter error:", resp?.error);
            resolve({ kind: "infra-error" });
          }
        }
      );
    });
  } catch (err) {
    console.error("[Leetify] Failed to execute in sandbox:", err);
    return { kind: "infra-error" };
  }
}

export async function executeWithAdapter(judge, params) {
  const type = judge?.type || "judge0";

  if (type === "custom") {
    const code = (judge.adapterCode || "").trim() || DUMMY_ADAPTER_TEMPLATE;
    return await runCustomInSandbox(code, params);
  }

  // Default is locked Judge0
  return await runJudge0(params);
}
