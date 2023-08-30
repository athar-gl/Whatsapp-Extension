// background.js

function sendMessageToContentScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
            return;
        }

        const activeTab = tabs[0];
        if (!activeTab) {
            console.log("No active tab found.");
            return;
        }

        if (activeTab.url.startsWith("https://web.whatsapp.com/")) {
            chrome.tabs.sendMessage(activeTab.id, { action: "ping" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError);
                    return;
                }

                if (response && response.success) {
                    console.log(response.content);
                }
            });
        }
    });
}

// Send a message every 4 seconds
// setInterval(sendMessageToContentScript, 4000);
