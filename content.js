chrome.storage.sync.get("blockedSites", ({ blockedSites }) => {
    let hostname = window.location.hostname;
    if (blockedSites.includes(hostname)) {
      document.body.innerHTML = `<div style="color: red; text-align: center; font-size: 20px; padding: 20px;">
        ⚠ This site is blocked to improve productivity.
      </div>`;
    }
  });
  