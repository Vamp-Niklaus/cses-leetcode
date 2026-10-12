const iframe = document.getElementById("sandbox-frame");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === "EXECUTE_CUSTOM_ADAPTER") {
    const msgId = crypto.randomUUID();

    function handleSandboxReply(event) {
      if (event.data && event.data.id === msgId) {
        window.removeEventListener("message", handleSandboxReply);
        if (event.data.ok) {
          sendResponse({ ok: true, result: event.data.result });
        } else {
          sendResponse({ ok: false, error: event.data.error });
        }
      }
    }

    window.addEventListener("message", handleSandboxReply);

    // Forward execution request to the sandboxed iframe
    iframe.contentWindow.postMessage(
      {
        id: msgId,
        code: message.code,
        params: message.params,
      },
      "*"
    );

    return true; // Keep message channel open for async response
  }
});
