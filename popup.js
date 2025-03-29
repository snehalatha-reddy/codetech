document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ type: "getTimeSpent" }, (response) => {
      document.getElementById("report").innerHTML = JSON.stringify(response, null, 2);
    });
  
    document.getElementById("block").addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let url = new URL(tabs[0].url);
        chrome.storage.sync.get("blockedSites", ({ blockedSites }) => {
          blockedSites = blockedSites || [];
          blockedSites.push(url.hostname);
          chrome.storage.sync.set({ blockedSites });
        });
      });
    });
  });
  