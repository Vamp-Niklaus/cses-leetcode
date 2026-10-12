// Workspace layout integration
// Handles top navigation bar and problem pane header

const ICONS = {
  task: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  submit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  results: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  statistics: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  tests: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`
};

function ensureLayoutStyles() {
  const styleId = "csescode-layout-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    #csescode-top-nav {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin: 0 auto;
      padding: 0 12px;
      min-width: 0;
      flex: 1 1 auto;
      max-width: 620px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    #csescode-top-nav::-webkit-scrollbar {
      display: none;
    }
    .csescode-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: rgba(255, 255, 255, 0.72) !important;
      text-decoration: none !important;
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      line-height: 1.4;
      white-space: nowrap;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      outline: none;
    }
    .csescode-nav-btn:hover {
      color: #ffffff !important;
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
    .csescode-nav-btn.active {
      color: #ffffff !important;
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.25);
      font-weight: 600;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    }
    .csescode-nav-btn svg {
      opacity: 0.85;
      flex-shrink: 0;
    }
    .csescode-nav-btn:hover svg,
    .csescode-nav-btn.active svg {
      opacity: 1;
    }
    .csescode-nav-btn.csescode-nav-tests {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }
    .csescode-nav-btn.csescode-nav-tests:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .csescode-nav-btn.csescode-nav-tests.console-open {
      background: rgba(59, 130, 246, 0.25);
      border-color: rgba(59, 130, 246, 0.5);
      color: #93c5fd !important;
      font-weight: 600;
    }
    .csescode-nav-btn.csescode-nav-tests.console-open svg {
      opacity: 1;
      stroke: #93c5fd;
    }
    .csescode-problem-header {
      margin-bottom: 20px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
    }
    .csescode-course-breadcrumb {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: var(--color-fg-muted, #8b949e);
      margin-bottom: 8px;
    }
    .csescode-course-breadcrumb a {
      color: var(--color-fg-muted, #8b949e);
      text-decoration: none;
      transition: color 0.12s ease;
    }
    .csescode-course-breadcrumb a:hover {
      color: var(--color-accent, #58a6ff);
      text-decoration: underline;
    }
    .csescode-course-breadcrumb span {
      opacity: 0.5;
    }
    .csescode-problem-title {
      font-size: 22px;
      font-weight: 700;
      line-height: 1.3;
      margin: 0;
      color: var(--color-fg, inherit);
      letter-spacing: -0.015em;
    }
    @media (max-width: 768px) {
      #csescode-top-nav {
        gap: 3px;
        padding: 0 4px;
      }
      .csescode-nav-btn {
        padding: 4px 8px;
        font-size: 12px;
      }
    }
  `;
  (document.head || document.documentElement).appendChild(style);
}

export function mountTopNavigation(meta, problemNode) {
  const header = document.querySelector(".header > div");
  const controls = header?.querySelector(".controls");
  if (!meta || !header) return;

  ensureLayoutStyles();

  // Remove any previously mounted top navigation to avoid duplicates
  document.getElementById("csescode-top-nav")?.remove();

  const nav = document.createElement("nav");
  nav.id = "csescode-top-nav";
  nav.setAttribute("aria-label", "Problem Navigation");

  const links = [...(meta.navLinks || [])];

  for (const item of links) {
    const key = item.label.trim().toLowerCase();
    const icon = ICONS[key] || ICONS.task;
    const a = document.createElement("a");
    a.href = item.href;
    const isActive = item.current || key === "task";
    a.className = "csescode-nav-btn" + (isActive ? " active" : "");
    if (isActive) a.setAttribute("aria-current", "page");
    a.innerHTML = `${icon}<span>${item.label}</span>`;
    nav.appendChild(a);
  }

  // Tests toggle button
  const testsBtn = document.createElement("button");
  testsBtn.type = "button";
  testsBtn.id = "csescode-tests-nav-btn";
  testsBtn.className = "csescode-nav-btn csescode-nav-tests";
  testsBtn.title = "Toggle test cases panel (Ctrl + ')";
  testsBtn.innerHTML = `${ICONS.tests}<span>Tests</span>`;
  testsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("csescode:open-tests"));
  });
  nav.appendChild(testsBtn);

  // Sync open state with Tests button
  window.addEventListener("csescode:console-state", (e) => {
    if (e.detail && typeof e.detail.open === "boolean") {
      testsBtn.classList.toggle("console-open", e.detail.open);
    }
  });

  if (controls) {
    header.insertBefore(nav, controls);
  } else {
    header.appendChild(nav);
  }
  meta.headerMounted = true;

  // Prepend clean problem title and course breadcrumb into problemNode
  if (problemNode && meta.title && !problemNode.querySelector(".csescode-problem-header")) {
    const ph = document.createElement("div");
    ph.className = "csescode-problem-header";

    if (meta.courseLabel && meta.courseHref) {
      const bc = document.createElement("div");
      bc.className = "csescode-course-breadcrumb";
      bc.innerHTML = `<a href="${meta.courseHref}">${meta.courseLabel}</a><span aria-hidden="true">/</span>`;
      ph.appendChild(bc);
    }

    const titleEl = document.createElement("h1");
    titleEl.className = "csescode-problem-title";
    titleEl.textContent = meta.title;
    ph.appendChild(titleEl);

    problemNode.prepend(ph);
  }
}
