// Copies the prebuilt extension plus the static preview into dist/ for hosting.
// Does not rebuild or transform any extension file.
import { cpSync, rmSync, mkdirSync, existsSync, copyFileSync } from "node:fs";

const OUT = "dist";
const ENTRIES = [
  "adapters", "assets", "icons", "src", "preview",
  "manifest.json", "offscreen.html", "offscreen.js", "sandbox.html",
  "service-worker-loader.js", "LICENSE", "README.md",
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const entry of ENTRIES) {
  if (existsSync(entry)) cpSync(entry, `${OUT}/${entry}`, { recursive: true });
}
// Static hosting has no server rewrites: serve the preview at / and as the fallback page.
copyFileSync("preview/workspace.html", `${OUT}/index.html`);
copyFileSync("preview/workspace.html", `${OUT}/404.html`);
console.log("dist/ ready");
