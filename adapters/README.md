# Judge Adapter System Guide

This folder contains the **Judge Adapter System** for the Leetify for CSES extension.

---

## 1. How It Works

1. **`judge0.js` (Built-in & Read-Only)**
   - The default system judge.
   - Connected to **Judge0 Community Edition** (`https://ce.judge0.com`), requiring **no API key**.
   - Locked so it cannot be broken or deleted.

2. **`custom.js` (For Coders to Implement)**
   - A clean starter template file where developers can write their own adapter code to connect any third-party judge, private server, or custom backend.

---

## 2. Writing a Custom Adapter (`adapters/custom.js`)

Open [adapters/custom.js](file:///home/rakesh/Documents/modified-extension/1.1.1_0/adapters/custom.js). Implement the `runCustom(...)` function:

```javascript
export async function runCustom({
  url,        // The URL configured in Settings
  apiKey,     // Optional API key entered in Settings
  apiHost,    // Optional host/header value entered in Settings
  language,   // 'cpp' | 'c' | 'python' | 'java'
  code,       // The source code string to compile & run
  stdin,      // Input data for the test case
  timeoutMs,  // Max timeout in milliseconds (e.g. 10000)
  signal,     // AbortSignal for network cancellation
}) {
  // 1. Send your HTTP request
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": apiKey ? `Bearer ${apiKey}` : undefined
    },
    body: JSON.stringify({ language, code, stdin }),
    signal
  });

  if (res.status === 429) return { kind: "rate-limited" };
  if (!res.ok) return { kind: "infra-error" };

  const data = await res.json();

  // 2. Return the normalized result:
  return {
    kind: "ok",
    result: {
      output: data.stdout ?? data.output ?? "",
      compileError: data.compileError ?? null,
      runtimeError: data.runtimeError ?? null,
      timeMs: data.timeMs ?? null
    }
  };
}
```

### Expected Return Values

Your adapter must return one of these shapes:

| Scenario | Return Format | Behavior |
| :--- | :--- | :--- |
| **Run Finished** | `{ kind: "ok", result: { output, compileError: null, runtimeError: null, timeMs } }` | Displays pass/fail in CSES workspace |
| **Compilation Error** | `{ kind: "ok", result: { output: null, compileError: "details...", runtimeError: null, timeMs: null } }` | Displays compile error box |
| **Runtime Error** | `{ kind: "ok", result: { output: null, compileError: null, runtimeError: "details...", timeMs: null } }` | Displays runtime error verdict |
| **Timeout** | `{ kind: "timeout" }` | Automatically falls back to next judge |
| **Rate Limited (429)** | `{ kind: "rate-limited" }` | Automatically falls back to next judge |
| **Network Error / Down** | `{ kind: "infra-error" }` | Automatically falls back to next judge |

---

## 3. Activating Your Adapter in the Settings Page

1. Open the extension popup and click **⚙️ Configure Judges (Options)**.
2. Click **+ Add Custom Judge**.
3. Under **Provider Adapter**, select **Custom Adapter (`adapters/custom.js`)**.
4. Enter your endpoint URL and save.
5. Click **🧪 Test** to verify your custom adapter in real-time.
