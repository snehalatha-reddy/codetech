let timeSpent = {};
let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (activeTab) {
    const time = (Date.now() - startTime) / 1000; // Time in seconds
    if (timeSpent[activeTab]) timeSpent[activeTab] += time;
    else timeSpent[activeTab] = time;
  }

  let tab = await chrome.tabs.get(activeInfo.tabId);
  activeTab = new URL(tab.url).hostname;
  startTime = Date.now();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getTimeSpent") {
    sendResponse(timeSpent);
  }
});

setInterval(() => {
  fetch("http://localhost:5000/saveData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(timeSpent)
  });
}, 60000);
