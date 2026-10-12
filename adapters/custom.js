/**
 * =====================================================================
 * CUSTOM JUDGE ADAPTER TEMPLATE
 * =====================================================================
 * 
 * Coders: Edit this file to integrate your own custom judge, backend API,
 * Cloudflare Worker, or third-party service!
 * 
 * Instructions:
 * 1. Read the parameters passed to `runCustom(...)` below.
 * 2. Send your HTTP request using `fetch()`.
 * 3. Return the standard result shape:
 *    - Success:        { kind: "ok", result: { output, compileError: null, runtimeError: null, timeMs } }
 *    - Compile Error:  { kind: "ok", result: { output: null, compileError: "your error", runtimeError: null, timeMs: null } }
 *    - Runtime Error:  { kind: "ok", result: { output: null, compileError: null, runtimeError: "your error", timeMs } }
 *    - Timeout:        { kind: "timeout" }
 *    - Rate-limited:   { kind: "rate-limited" }
 *    - Server down:    { kind: "infra-error" }
 */

export async function runCustom({
  url,        // The URL configured by the user in Settings
  apiKey,     // Optional API Key / Auth Token entered in Settings
  apiHost,    // Optional Host / Header value entered in Settings
  language,   // 'cpp' | 'c' | 'python' | 'java'
  code,       // The complete source code string
  stdin,      // Input data to pass to the program
  timeoutMs,  // Max timeout in milliseconds (e.g. 10000)
  signal,     // AbortSignal for network cancellation
}) {
  const rawUrl = (url || "").trim().replace(/\/+$/, "");

  // Example: Setting up your custom headers
  const headers = {
    "content-type": "application/json",
  };
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
    // Or: headers["x-api-key"] = apiKey;
  }

  // Example: Transform language ID if your server requires specific names
  const langMap = {
    cpp: "cpp",
    c: "c",
    python: "python3",
    java: "java",
  };

  try {
    const res = await fetch(rawUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        language: langMap[language] || language,
        code,
        stdin: stdin || "",
      }),
      signal,
    });

    // Handle rate-limits (will trigger fallback to next judge)
    if (res.status === 429) {
      return { kind: "rate-limited" };
    }

    if (!res.ok) {
      return { kind: "infra-error" };
    }

    const data = await res.json();

    // Map your server's JSON output to the standard shape:
    return {
      kind: "ok",
      result: {
        output: data.output ?? data.stdout ?? "",
        compileError: data.compileError ?? data.compile_error ?? null,
        runtimeError: data.runtimeError ?? data.stderr ?? null,
        timeMs: data.timeMs ?? data.time ?? null,
      },
    };
  } catch (err) {
    if (signal?.aborted) {
      return { kind: "timeout" };
    }
    return { kind: "infra-error" };
  }
}
