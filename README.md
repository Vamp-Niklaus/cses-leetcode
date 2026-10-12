# CSESCode ⚡

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Supported Browsers](https://img.shields.io/badge/Browsers-Chrome%20%7C%20Brave%20%7C%20Edge%20%7C%20Arc-blue.svg)](https://www.google.com/chrome/)
[![Language Support](https://img.shields.io/badge/Languages-C%2B%2B%20%7C%20Python%20%7C%20Java-orange.svg)](https://cses.fi/problemset/)

A modern, high-performance **LeetCode-style IDE workspace** for solving problems on the [CSES Problem Set](https://cses.fi/problemset/). 

Features embedded **Monaco Editor** (VS Code), competitive programming auto-completion snippets, automated test-case runner with free **Judge0 CE** integration, customizable judge adapters, and one-click submissions.

---

## ✨ Features

* **🖥️ Monaco Editor (VS Code Power)**: Syntax highlighting, auto-closing brackets, and custom themes for **C++**, **Python**, and **Java**.
* **💡 Offline Competitive Programming IntelliSense**:
  * Fast I/O templates (`cin.tie(NULL)`, `sys.stdin.readline`)
  * Data structures & algorithms snippets (Segment Tree, DSU, Dijkstra, Binary Exponentiation)
  * Easily toggle IntelliSense on/off with the navbar button.
* **⚡ Free Code Execution (No API Key Required)**:
  * Integrated directly with **Judge0 Community Edition** (`ce.judge0.com`) out of the box.
  * Test your code against sample cases or custom inputs before submitting.
* **🔌 Multi-Judge Fallback Chain & Custom Adapters**:
  * Connect your own private server, RapidAPI, or custom judge endpoint in the **Options** page.
  * Easily script your own adapter logic in [`adapters/custom.js`](adapters/custom.js).
  * Automatic multi-tier fallback if any judge experiences timeouts or rate limits.
* **🧪 Test-Case Runner & Verdicts**:
  * Run individual or multiple test cases with concurrency.
  * Instant feedback badges: **Accepted**, **Wrong Answer**, **Time Limit Exceeded**, or **Compile Error**.
* **🚀 1-Click CSES Submission**:
  * Automatically populates the CSES submission form and matches your chosen language version.
* **🔄 Instant Code Restore from Submissions**:
  * View your submission history under the **Submissions** tab.
  * Click the **Restore** button next to any past submission to instantly fetch and load that code back into the Monaco editor with automatic language matching.
* **🎯 Subtle Bracket Pair Highlighting**:
  * Clean, distraction-free bracket matching outlines when your cursor rests on brackets.
* **💾 Automatic Local Snapshots & Settings Persistence**:
  * Code auto-saves per problem and language.
  * Hints toggle (IntelliSense on/off), Dark/Light theme mode, and font size persist across refreshes via `localStorage`.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + '` or `Cmd + '` | **Run Test Cases** |
| `Ctrl + Enter` or `Cmd + Enter` | **Submit Code to CSES** |

---

## 📦 Free Installation Guide (Takes 30 Seconds)

You do **not** need the Chrome Web Store to install or use this extension. Follow these simple steps:

### Step 1: Download or Clone the Repository
* **Option A (Download ZIP)**: Download [**`csescode-extension.zip`**](https://github.com/Vamp-Niklaus/cses-leetcode/releases/latest/download/csescode-extension.zip) (direct download) and extract it on your computer.
* **Option B (Git Clone)**:
  ```bash
  git clone https://github.com/Vamp-Niklaus/cses-leetcode.git
  ```

### Step 2: Load into Chrome / Brave / Edge / Arc
1. Open your browser and navigate to the Extensions page:
   * **Chrome**: `chrome://extensions`
   * **Brave**: `brave://extensions`
   * **Edge**: `edge://extensions`
2. Enable **Developer mode** using the toggle in the top-right corner.
3. Click the **Load unpacked** button in the top-left corner.
4. Select the unzipped extension directory (the folder containing `manifest.json`).
5. 🎉 Done! Navigate to any problem on [CSES](https://cses.fi/problemset/) to see the LeetCode workspace live.

---

## ⚙️ Custom Judge Configuration

Want to run tests against your own local Docker container or private judge?
1. Click the extension icon in your toolbar and select **⚙️ Configure Judges (Options)**.
2. Click **+ Add Custom Judge**.
3. Choose either **Judge0** or **Custom Adapter**.
4. Enter your endpoint URL and optional API token.
5. Click **Test Connection** to verify in real-time.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: Monaco Editor, React, TypeScript, Vanilla CSS
* **Backend Integration**: Chrome Manifest V3 Service Worker, Judge0 CE REST API, Custom Modular Adapters
* **Target Site**: [CSES Problem Set](https://cses.fi/problemset/)

---

## 📜 License & Credits

* Distributed under the [MIT License](LICENSE).
* Authored & maintained by **[Vamp-Niklaus (Rakesh Kumar)](https://github.com/Vamp-Niklaus)**.
