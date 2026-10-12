/**
 * Built-in Judge0 Adapter (Locked System Standard)
 * Supports Judge0 CE, Self-Hosted Judge0, and RapidAPI Judge0.
 */

const JUDGE0_LANG_IDS = {
  cpp: 105,    // C++ (GCC 14.1.0)
  c: 103,      // C (GCC 14.1.0)
  python: 100, // Python (3.12.5)
  java: 91,    // Java (JDK 17.0.6)
};

function prepareJavaCode(code) {
  if (!/\bclass\s+Main\b/.test(code)) {
    return code.replace(/\b(?:public\s+)?class\s+[A-Za-z0-9_]+/, "public class Main");
  }
  return code.replace(/\bclass\s+Main\b/, "public class Main");
}

export async function runJudge0({ url, apiKey, apiHost, language, code, stdin, timeoutMs, signal }) {
  const rawUrl = (url || "https://ce.judge0.com").trim().replace(/\/+$/, "");
  const endpoint = `${rawUrl}/submissions?wait=true`;

  const headers = { "content-type": "application/json" };
  if (apiKey) {
    headers["X-RapidAPI-Key"] = apiKey;
    headers["X-Auth-Token"] = apiKey;
  }
  if (apiHost) {
    headers["X-RapidAPI-Host"] = apiHost;
  }

  const langId = JUDGE0_LANG_IDS[language] || 105;
  const preparedCode = language === "java" ? prepareJavaCode(code) : code;
  const cpuLimit = Math.min(10, Math.max(1, Math.floor(timeoutMs / 1000)));

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source_code: preparedCode,
      language_id: langId,
      stdin: stdin || "",
      cpu_time_limit: cpuLimit,
    }),
    signal,
  });

  if (res.status === 429) {
    return { kind: "rate-limited" };
  }
  if (!res.ok) {
    return { kind: "infra-error" };
  }

  let data = await res.json();

  // Safety poll if server queues the request
  while ((data.status?.id === 1 || data.status?.id === 2) && !signal.aborted) {
    await new Promise((r) => setTimeout(r, 400));
    const poll = await fetch(`${rawUrl}/submissions/${data.token}`, { headers, signal });
    if (!poll.ok) break;
    data = await poll.json();
  }

  const statusId = data.status?.id;

  // Time Limit Exceeded
  if (statusId === 5) {
    return { kind: "timeout" };
  }

  // Compilation Error
  if (statusId === 6) {
    return {
      kind: "ok",
      result: {
        compileError: data.compile_output || data.message || "Compilation Error",
        runtimeError: null,
        output: null,
        timeMs: null,
      },
    };
  }

  // Accepted (Success)
  if (statusId === 3) {
    return {
      kind: "ok",
      result: {
        compileError: null,
        runtimeError: null,
        output: data.stdout ?? "",
        timeMs: data.time ? Math.round(parseFloat(data.time) * 1000) : null,
      },
    };
  }

  // Runtime Errors (SIGSEGV, NZEC, SIGFPE, etc.)
  if ([7, 8, 9, 10, 11, 12].includes(statusId)) {
    return {
      kind: "ok",
      result: {
        compileError: null,
        runtimeError: data.stderr || data.message || data.status?.description || "Runtime Error",
        output: data.stdout ?? "",
        timeMs: data.time ? Math.round(parseFloat(data.time) * 1000) : null,
      },
    };
  }

  // Default fallback
  return {
    kind: "ok",
    result: {
      compileError: null,
      runtimeError: null,
      output: data.stdout ?? "",
      timeMs: data.time ? Math.round(parseFloat(data.time) * 1000) : null,
    },
  };
}
