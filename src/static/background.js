chrome.runtime.onInstalled.addListener(() => {
    // Register the service worker
    navigator.serviceWorker.register('/background-service-worker.js');
});
