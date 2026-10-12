import { executeWithAdapter, DUMMY_ADAPTER_TEMPLATE } from "/adapters/index.js";

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

const MAX_TOTAL_JUDGES = 3;
const STORAGE_KEY = "leetify:judges";

let currentJudges = [];
let editingJudgeId = null;

// DOM Elements - Main Page
const judgesContainer = document.getElementById("judges-container");
const judgeCountBadge = document.getElementById("judge-count");
const btnAddJudge = document.getElementById("btn-add-judge");
const btnReset = document.getElementById("btn-reset");
const btnBack = document.getElementById("btn-back");

// DOM Elements - Add/Edit Modal
const modal = document.getElementById("judge-modal");
const modalTitle = document.getElementById("modal-title");
const judgeForm = document.getElementById("judge-form");
const btnModalClose = document.getElementById("btn-modal-close");
const btnModalTest = document.getElementById("btn-modal-test");
const modalTestStatus = document.getElementById("modal-test-status");

const inputName = document.getElementById("judge-name");
const selectType = document.getElementById("judge-type");
const inputUrl = document.getElementById("judge-url");
const inputKey = document.getElementById("judge-key");
const inputHost = document.getElementById("judge-host");
const groupHost = document.getElementById("group-host");
const groupAdapterCode = document.getElementById("group-adapter-code");
const inputAdapterCode = document.getElementById("judge-adapter-code");
const btnResetCode = document.getElementById("btn-reset-code");

// DOM Elements - Documentation Modal
const docsModal = document.getElementById("docs-modal");
const btnOpenDocs = document.getElementById("btn-open-docs");
const btnDocsClose = document.getElementById("btn-docs-close");
const btnDocsCloseBottom = document.getElementById("btn-docs-close-bottom");

function updateTypeVisibility() {
  if (selectType.value === "custom") {
    groupHost.style.display = "none";
    groupAdapterCode.style.display = "flex";
    if (!inputAdapterCode.value.trim()) {
      inputAdapterCode.value = DUMMY_ADAPTER_TEMPLATE;
    }
  } else {
    groupHost.style.display = "flex";
    groupAdapterCode.style.display = "none";
  }
}

selectType.addEventListener("change", updateTypeVisibility);

if (btnResetCode) {
  btnResetCode.addEventListener("click", () => {
    inputAdapterCode.value = DUMMY_ADAPTER_TEMPLATE;
  });
}

// Storage Helpers
async function loadJudges() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (res) => {
      const stored = res[STORAGE_KEY];
      if (Array.isArray(stored) && stored.length > 0) {
        const hasDefault = stored.some((j) => j.id === "judge0-ce" || j.isDefault);
        if (!hasDefault) {
          resolve([...DEFAULT_JUDGES, ...stored].slice(0, MAX_TOTAL_JUDGES));
        } else {
          resolve(stored.slice(0, MAX_TOTAL_JUDGES));
        }
      } else {
        resolve(DEFAULT_JUDGES);
      }
    });
  });
}

async function saveJudges(judges) {
  currentJudges = judges;
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: judges }, () => {
      renderJudges();
      resolve();
    });
  });
}

// Live Probe / Test Connection using the actual Adapter
async function testJudgeConnection(judge) {
  const start = Date.now();
  const rawUrl = (judge.url || "").trim();
  if (!rawUrl) {
    return { ok: false, message: "URL is empty" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const outcome = await executeWithAdapter(judge, {
      url: rawUrl,
      apiKey: judge.apiKey,
      apiHost: judge.apiHost,
      language: "cpp",
      code: "#include <iostream>\nint main(){ std::cout << 42; return 0; }",
      stdin: "",
      timeoutMs: 10000,
      signal: controller.signal,
    });

    const elapsed = Date.now() - start;

    if (outcome && outcome.kind === "ok") {
      const out = (outcome.result?.output || "").trim();
      if (out === "42" || out.includes("42")) {
        return { ok: true, message: `Online & Verified (${elapsed}ms)` };
      }
      return { ok: true, message: `Responded in ${elapsed}ms: "${out.slice(0, 30)}"` };
    }

    if (outcome && outcome.kind === "rate-limited") {
      return { ok: false, message: `Rate-limited (HTTP 429) in ${elapsed}ms` };
    }
    if (outcome && outcome.kind === "timeout") {
      return { ok: false, message: `Timed out (>10s)` };
    }
    return { ok: false, message: `Server error / unreachable (${elapsed}ms)` };
  } catch (err) {
    if (controller.signal.aborted) {
      return { ok: false, message: "Connection timed out (>12s)" };
    }
    return { ok: false, message: err.message || "Failed to reach endpoint" };
  } finally {
    clearTimeout(timer);
  }
}

// Rendering
function renderJudges() {
  judgesContainer.innerHTML = "";

  const customCount = currentJudges.filter((j) => !j.isDefault).length;
  judgeCountBadge.textContent = `${currentJudges.length} / ${MAX_TOTAL_JUDGES} Judges`;

  if (currentJudges.length >= MAX_TOTAL_JUDGES || customCount >= 2) {
    btnAddJudge.disabled = true;
    btnAddJudge.title = "Maximum 3 judges allowed (1 default + 2 custom)";
  } else {
    btnAddJudge.disabled = false;
    btnAddJudge.title = "Add custom judge";
  }

  currentJudges.forEach((judge, index) => {
    const card = document.createElement("div");
    card.className = `judge-card ${judge.isDefault ? "default-preset" : ""}`;

    const priorityClass = index === 0 ? "priority-1" : index === 1 ? "priority-2" : "priority-3";
    const priorityLabel = index === 0 ? "1st Choice (Primary)" : index === 1 ? "2nd Choice (Fallback)" : "3rd Choice (Fallback)";
    const adapterType = judge.type || "judge0";

    card.innerHTML = `
      <div class="card-top">
        <div class="card-title-group">
          <span class="priority-pill ${priorityClass}">#${index + 1} • ${priorityLabel}</span>
          <span class="judge-name">${escapeHtml(judge.name)}</span>
          <span class="adapter-badge">${escapeHtml(adapterType.toUpperCase())}</span>
          ${judge.isDefault ? '<span class="tag-readonly">🔒 System Preset (Read-Only)</span>' : ""}
        </div>
        <div class="card-actions">
          <button class="btn btn-secondary btn-sm btn-move-up" title="Move Up" ${index === 0 ? "disabled" : ""}>↑</button>
          <button class="btn btn-secondary btn-sm btn-move-down" title="Move Down" ${index === currentJudges.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn btn-secondary btn-sm btn-test-card" title="Test Connection">🧪 Test</button>
          ${!judge.isDefault ? `
            <button class="btn btn-secondary btn-sm btn-edit-card" title="Edit">✏️ Edit</button>
            <button class="btn btn-danger btn-sm btn-delete-card" title="Delete">🗑️</button>
          ` : ""}
        </div>
      </div>
      <div class="card-details">
        <div class="detail-item">
          <span class="detail-label">Endpoint URL</span>
          <span class="detail-value" title="${escapeHtml(judge.url)}">${escapeHtml(judge.url)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Adapter Protocol</span>
          <span class="detail-value">${escapeHtml(adapterType === "custom" ? "Custom In-Editor Script" : "Standard Judge0 API")}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">API Key</span>
          <span class="detail-value">${judge.apiKey ? "••••••••••••••••" : '<span style="color:var(--text-muted);">(None required)</span>'}</span>
        </div>
        ${judge.apiHost ? `
        <div class="detail-item">
          <span class="detail-label">RapidAPI Host</span>
          <span class="detail-value">${escapeHtml(judge.apiHost)}</span>
        </div>` : ""}
      </div>
      <div class="card-test-status test-status" style="display: none;"></div>
    `;

    const btnUp = card.querySelector(".btn-move-up");
    const btnDown = card.querySelector(".btn-move-down");
    const btnTest = card.querySelector(".btn-test-card");
    const btnEdit = card.querySelector(".btn-edit-card");
    const btnDelete = card.querySelector(".btn-delete-card");
    const statusDiv = card.querySelector(".card-test-status");

    btnUp.addEventListener("click", () => moveJudge(index, -1));
    btnDown.addEventListener("click", () => moveJudge(index, 1));

    btnTest.addEventListener("click", async () => {
      btnTest.disabled = true;
      statusDiv.style.display = "flex";
      statusDiv.className = "test-status testing";
      statusDiv.innerHTML = "<span>⏳ Testing connection via adapter...</span>";

      const res = await testJudgeConnection(judge);
      btnTest.disabled = false;
      statusDiv.className = `test-status ${res.ok ? "success" : "error"}`;
      statusDiv.innerHTML = `<span>${res.ok ? "✓" : "✗"} ${escapeHtml(res.message)}</span>`;
    });

    if (btnEdit) {
      btnEdit.addEventListener("click", () => openEditModal(judge));
    }
    if (btnDelete) {
      btnDelete.addEventListener("click", () => deleteJudge(judge.id));
    }

    judgesContainer.appendChild(card);
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function moveJudge(fromIndex, offset) {
  const toIndex = fromIndex + offset;
  if (toIndex < 0 || toIndex >= currentJudges.length) return;

  const updated = [...currentJudges];
  const [moved] = updated.splice(fromIndex, 1);
  updated.splice(toIndex, 0, moved);
  saveJudges(updated);
}

function deleteJudge(judgeId) {
  const judge = currentJudges.find((j) => j.id === judgeId);
  if (!judge || judge.isDefault) return;

  if (confirm(`Are you sure you want to delete "${judge.name}"?`)) {
    const updated = currentJudges.filter((j) => j.id !== judgeId);
    saveJudges(updated);
  }
}

// Add/Edit Modal
function openAddModal() {
  editingJudgeId = null;
  modalTitle.textContent = "Add Custom Judge";
  inputName.value = "";
  selectType.value = "judge0";
  inputUrl.value = "";
  inputKey.value = "";
  inputHost.value = "";
  inputAdapterCode.value = DUMMY_ADAPTER_TEMPLATE;
  updateTypeVisibility();
  modalTestStatus.style.display = "none";
  modal.classList.add("open");
  inputName.focus();
}

function openEditModal(judge) {
  if (judge.isDefault) return;
  editingJudgeId = judge.id;
  modalTitle.textContent = `Edit "${judge.name}"`;
  inputName.value = judge.name || "";
  selectType.value = judge.type || "judge0";
  inputUrl.value = judge.url || "";
  inputKey.value = judge.apiKey || "";
  inputHost.value = judge.apiHost || "";
  inputAdapterCode.value = judge.adapterCode || DUMMY_ADAPTER_TEMPLATE;
  updateTypeVisibility();
  modalTestStatus.style.display = "none";
  modal.classList.add("open");
  inputName.focus();
}

function closeModal() {
  modal.classList.remove("open");
  editingJudgeId = null;
}

// Documentation Modal
function openDocsModal() {
  docsModal.classList.add("open");
}

function closeDocsModal() {
  docsModal.classList.remove("open");
}

// Form Submit
judgeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = inputName.value.trim();
  const type = selectType.value;
  const url = inputUrl.value.trim();
  const apiKey = inputKey.value.trim();
  const apiHost = inputHost.value.trim();
  const adapterCode = type === "custom" ? (inputAdapterCode.value.trim() || DUMMY_ADAPTER_TEMPLATE) : "";

  if (!name || !url) return;

  if (editingJudgeId) {
    const updated = currentJudges.map((j) => {
      if (j.id === editingJudgeId) {
        return { ...j, name, type, url, apiKey, apiHost, adapterCode };
      }
      return j;
    });
    saveJudges(updated);
  } else {
    if (currentJudges.length >= MAX_TOTAL_JUDGES) {
      alert("Maximum of 3 judges reached.");
      return;
    }
    const newJudge = {
      id: crypto.randomUUID(),
      name,
      type,
      url,
      apiKey,
      apiHost,
      adapterCode,
      isDefault: false,
      enabled: true,
    };
    saveJudges([...currentJudges, newJudge]);
  }

  closeModal();
});

// Modal Test Button
btnModalTest.addEventListener("click", async () => {
  const url = inputUrl.value.trim();
  if (!url) {
    alert("Please enter an endpoint URL first.");
    return;
  }

  modalTestStatus.style.display = "flex";
  modalTestStatus.className = "test-status testing";
  modalTestStatus.innerHTML = "<span>⏳ Testing connection via adapter...</span>";
  btnModalTest.disabled = true;

  const tempJudge = {
    type: selectType.value,
    url,
    apiKey: inputKey.value.trim(),
    apiHost: inputHost.value.trim(),
    adapterCode: inputAdapterCode.value.trim() || DUMMY_ADAPTER_TEMPLATE,
  };

  const res = await testJudgeConnection(tempJudge);
  btnModalTest.disabled = false;
  modalTestStatus.className = `test-status ${res.ok ? "success" : "error"}`;
  modalTestStatus.innerHTML = `<span>${res.ok ? "✓" : "✗"} ${escapeHtml(res.message)}</span>`;
});

// Button Handlers
btnAddJudge.addEventListener("click", openAddModal);
btnModalClose.addEventListener("click", closeModal);

btnOpenDocs.addEventListener("click", openDocsModal);
btnDocsClose.addEventListener("click", closeDocsModal);
btnDocsCloseBottom.addEventListener("click", closeDocsModal);

// Close modals when clicking backdrop
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
docsModal.addEventListener("click", (e) => {
  if (e.target === docsModal) closeDocsModal();
});

// Close modals on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeDocsModal();
  }
});

// Close button
btnBack.addEventListener("click", () => {
  if (chrome.tabs && chrome.tabs.getCurrent) {
    chrome.tabs.getCurrent((tab) => {
      if (tab && tab.id) {
        chrome.tabs.remove(tab.id);
      } else {
        window.close();
      }
    });
  } else {
    window.close();
  }
});

// Reset Button
btnReset.addEventListener("click", () => {
  if (confirm("Reset judges configuration back to default (Judge0 CE only)?")) {
    saveJudges(DEFAULT_JUDGES);
  }
});

// Initialize
loadJudges().then((judges) => {
  currentJudges = judges;
  renderJudges();
});
