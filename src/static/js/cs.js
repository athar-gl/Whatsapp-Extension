function inject_script(script_name) {
    var s = document.createElement("script");
    s.src = chrome.runtime.getURL(script_name);
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

inject_script("js/moment-with-locales.js");
inject_script("js/progressBar.js");
inject_script("js/injectedWA.js");

chrome.runtime.onMessage.addListener(function (
    request_msg,
    sender,
    sendResponse
) {
    if (request_msg.key === "get_data") {
        chrome.storage.local.get(null, function (items) {
            document.dispatchEvent(
                new CustomEvent("to_injected_get_data", {
                    detail: items,
                })
            );
        });
        sendResponse();
    }
});
