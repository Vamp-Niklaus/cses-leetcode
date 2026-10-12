// Only the local preview loads this shim; the real extension uses native APIs.
history.replaceState(null, "", "/problemset/task/1071/");
const storage = {
  async get(key) {
    try { return { [key]: JSON.parse(localStorage.getItem(key) ?? "null") }; }
    catch { return {}; }
  },
  async set(values) {
    for (const [key, value] of Object.entries(values)) localStorage.setItem(key, JSON.stringify(value));
  },
  async remove(key) { localStorage.removeItem(key); },
};
window.chrome = {
  runtime: {
    getURL: (path) => new URL(`/${path}`, location.origin).href,
    sendMessage: async () => { throw new Error("Code execution requires the installed extension on CSES."); },
  },
  storage: { local: storage, sync: storage, onChanged: { addListener() {}, removeListener() {} } },
};
await import("/assets/index.tsx-tWGCF9KQ.js");