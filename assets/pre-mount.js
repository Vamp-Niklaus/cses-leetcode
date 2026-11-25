// pre-mount.js
// Runs at document_start on CSES pages. Hides the original CSES page until the
// workspace has rendered, so a refresh shows one dark screen instead of the old UI
// flashing before the extension UI appears.
(function () {
  if (location.hostname !== "cses.fi") return;
  if (!/\/task\/\d+/.test(location.pathname)) return;

  const root = document.documentElement;
  const style = document.createElement("style");
  style.id = "csescode-pre-mount";
  style.textContent =
    "html.csescode-pending{background:#1e1e1e!important}" +
    "html.csescode-pending body{visibility:hidden!important}";
  (document.head || root).appendChild(style);
  root.classList.add("csescode-pending");

  let revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    root.classList.remove("csescode-pending");
    style.remove();
  }

  // The workspace is ready once its shadow root holds rendered children.
  const started = performance.now();
  function check() {
    const host = document.getElementById("leetify-cses-host");
    const workspace = host && host.shadowRoot && host.shadowRoot.getElementById("leetify-cses-root");
    if (workspace && workspace.children.length > 0) {
      requestAnimationFrame(() => requestAnimationFrame(reveal));
      return;
    }
    // Safety net: if the extension is disabled or the page is not a workspace page, never stay hidden.
    if (performance.now() - started > 2500) return reveal();
    requestAnimationFrame(check);
  }
  requestAnimationFrame(check);
})();
