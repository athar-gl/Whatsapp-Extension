var openSettings = function () {
    chrome.runtime.openOptionsPage();
};

var downloadChat = function (type) {
    chrome.storage.local.set({
        save_media: false, // Disable media saving
        export_type: "JSON",
        is_skip_msg: false,
        is_background: false,
        download_type: type,
    }).then(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    key: "get_data",
                },
                null
            );
        });
    });
};

var setUp = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;
        console.log(tabs[0].url);
        if (!url) {
            document.getElementById("oops-box").style.display = "";
        } else {
            document.getElementById("main-box").style.display = "";
        }
    });

    chrome.storage.local.get(null, function (items) {
        // Handle storage settings (removed date/time logic)
        // document.getElementById("media_cb").checked = items.save_media;

        if (document.getElementById("download_all") != null) {
            document
                .getElementById("download_all")
                .addEventListener("click", downloadChat.bind(this, "all"));
        }
    });
};

document.addEventListener("DOMContentLoaded", setUp);
