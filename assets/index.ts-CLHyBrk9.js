import { s as storageGet, a as storageSet } from "./chromeStorage-CFdv0_zT.js";
import { executeWithAdapter } from "../adapters/index.js";

const DEFAULT_JUDGES = [
  {
    id: "judge0-ce",
    name: "Judge0 Community Edition (Default)",
    type: "judge0",
    url: "https://ce.judge0.com",
    apiKey: "",
    apiHost: "",
    isDefault: true,
    enabled: true,
  },
];

async function getJudgesList() {
  try {
    const list = await storageGet("leetify:judges");
    if (Array.isArray(list) && list.length > 0) {
      const enabled = list.filter((j) => j && j.enabled !== false);
      if (enabled.length > 0) return enabled;
    }
  } catch (e) {
    console.error("[Leetify] Failed to read judges list from storage:", e);
  }
  return DEFAULT_JUDGES;
}

async function runCaseOnJudge(judge, language, code, stdin, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await executeWithAdapter(judge, {
      url: judge.url,
      apiKey: judge.apiKey,
      apiHost: judge.apiHost,
      language,
      code,
      stdin,
      timeoutMs,
      signal: controller.signal,
    });
  } catch (err) {
    return controller.signal.aborted ? { kind: "timeout" } : { kind: "infra-error" };
  } finally {
    clearTimeout(timer);
  }
}

async function runCaseWithFallback(language, code, stdin, timeoutMs) {
  const judges = await getJudgesList();
  let lastOutcome = { kind: "infra-error" };

  for (let i = 0; i < judges.length; i++) {
    const judge = judges[i];
    try {
      const outcome = await runCaseOnJudge(judge, language, code, stdin, timeoutMs);
      if (outcome.kind === "ok") {
        return outcome;
      }
      lastOutcome = outcome;
      console.warn(`[Leetify] Judge "${judge.name}" responded with "${outcome.kind}". Falling back to next...`);
    } catch (e) {
      console.error(`[Leetify] Error running on judge "${judge.name}":`, e);
      lastOutcome = { kind: "infra-error" };
    }
  }

  return lastOutcome;
}

const RUN_CONCURRENCY = 2;
const RUN_TIMEOUT_MS = 10_000;

function normalizeOutput(t) {
  return t
    .split("\n")
    .map((r) => r.trimEnd())
    .join("\n")
    .replace(/\n+$/, "");
}

function computeVerdict(outcome, expected) {
  if (outcome.kind === "timeout") {
    return { verdict: "timeout", actualOutput: null, stderr: null, timeMs: null, compileError: null };
  }
  if (outcome.kind === "rate-limited" || outcome.kind === "infra-error") {
    return { verdict: "infra-error", actualOutput: null, stderr: null, timeMs: null, compileError: null };
  }
  const { result: res } = outcome;
  if (res.compileError !== null) {
    return {
      verdict: "compile-error",
      actualOutput: null,
      stderr: null,
      timeMs: null,
      compileError: res.compileError,
    };
  }
  if (res.runtimeError !== null) {
    return {
      verdict: "runtime-error",
      actualOutput: null,
      stderr: res.runtimeError,
      timeMs: res.timeMs,
      compileError: null,
    };
  }
  const out = res.output ?? "";
  return {
    verdict: normalizeOutput(out) === normalizeOutput(expected) ? "pass" : "fail",
    actualOutput: out,
    stderr: null,
    timeMs: res.timeMs,
    compileError: null,
  };
}

async function runWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const cur = next++;
      results[cur] = await fn(items[cur]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function runOneCase(request, testCase) {
  const outcome = await runCaseWithFallback(
    request.language,
    request.code,
    testCase.input,
    RUN_TIMEOUT_MS
  );
  return { caseId: testCase.caseId, detail: computeVerdict(outcome, testCase.expectedOutput) };
}

function toResult(caseId, detail) {
  return {
    caseId,
    verdict: detail.verdict,
    actualOutput: detail.actualOutput,
    stderr: detail.stderr,
    timeMs: detail.timeMs,
  };
}

async function handleRunRequest(request) {
  if (request.cases.length === 0) {
    return {
      type: "run-test-cases-result",
      taskId: request.taskId,
      compileError: null,
      results: [],
    };
  }

  const first = await runOneCase(request, request.cases[0]);
  if (first.detail.compileError !== null) {
    const results = request.cases.map((c) => ({
      caseId: c.caseId,
      verdict: "compile-error",
      actualOutput: null,
      stderr: null,
      timeMs: null,
    }));
    return {
      type: "run-test-cases-result",
      taskId: request.taskId,
      compileError: first.detail.compileError,
      results,
    };
  }

  const remaining = request.cases.slice(1);
  const remainingResults = await runWithConcurrency(remaining, RUN_CONCURRENCY, (c) =>
    runOneCase(request, c)
  );

  return {
    type: "run-test-cases-result",
    taskId: request.taskId,
    compileError: null,
    results: [
      toResult(first.caseId, first.detail),
      ...remainingResults.map((r) => toResult(r.caseId, r.detail)),
    ],
  };
}

function registerRunHandler() {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || msg.type !== "run-test-cases") return false;
    handleRunRequest(msg).then(sendResponse);
    return true;
  });
}

chrome.runtime.onInstalled.addListener(() => {});
registerRunHandler();
