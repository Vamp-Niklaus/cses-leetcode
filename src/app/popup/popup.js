document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('open-settings-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('src/app/options/index.html'));
      }
    });
  }
});
