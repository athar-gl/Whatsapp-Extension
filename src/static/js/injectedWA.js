const getChatModule = (e) =>
    e.default && e.default.Chat && e.default.Msg ? e.default : null;

const getChatModels = (result) => result.Chat.models || result.Chat._models;
const getMsgModels = (chatModel) =>
    chatModel.msgs.models || chatModel.msgs._models;
const ID_KEY = "__x_id";
const CHAT_TITLE = "__x_formattedTitle";
const FROM_USER = "__x_from";
const TO_USER = "__x_to";
const MSG_TYPE = "__x_type";
const SENT_TIME = "__x_t";
const MSG_BODY = "__x_body";

document.addEventListener("to_injected_get_data", function (e) {
    try {
        const chunk = window.webpackChunkwhatsapp_web_client;
        let chatsHistory = [];

        const fillMsgs = (datas) => {
            chatsHistory.unshift(...datas);
        };

        const exportData = (chatModels) => {
            const chatData = chatModels
                .map((chatModel) => {
                    const user = chatModel[ID_KEY].user;
                    const userName = chatModel[CHAT_TITLE].replaceAll("/", "").replaceAll(
                        "\\",
                        ""
                    );

                    const msgsChat = chatsHistory.filter(
                        (msg) => msg[FROM_USER].user == user || msg[TO_USER].user == user
                    );

                    const msgs = msgsChat.map((msg) => {
                        const curMsgTime = new Date(msg[SENT_TIME] * 1000).toLocaleString();
                        return {
                            Time: curMsgTime,
                            MessageBody: msg[MSG_BODY],
                            UserPhone: msg[FROM_USER].user,
                            ToUserPhone: msg[TO_USER].user,
                            MediaType: "",
                            MediaLink: "",
                        };
                    });

                    return {data: msgs, user, userName};
                })
                .filter((chat) => chat.data.length > 0);

            if (chatData.length > 0) {
                chrome.storage.local.set({chatData: chatData}, () => {
                    console.log('Data stored:', chatData);
                });
                // document.dispatchEvent(
                //   new CustomEvent("downloadData", {
                //     detail: {
                //       chatData,
                //     },
                //   })
                // );
            } else {
                alert("No chat data to process!");
            }
        };

        const callback = async (result, loadEarlierMsgs, resolve) => {
            const models = getChatModels(result);

            const loadMsgs = async (chatModel) => {
                try {
                    const s = getMsgModels(chatModel);
                    if (s.length > 0) {
                        fillMsgs(s);
                        let t = true;
                        while (t) {
                            t = await loadAllMsgs(chatModel);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            };

            const loadAllMsgs = async (chatModel) => {
                const t = await loadEarlierMsgs(chatModel);

                if (t && t.length > 0) {
                    fillMsgs(t);
                    return true;
                }
                return false;
            };

            const loadsChats = models.map((model) => loadMsgs(model));
            await Promise.all(loadsChats);
            exportData(models);
            resolve(0);
        };

        chunk?.push([
            [""],
            {},
            function (e) {
                let result = [];
                for (let item in e.m) {
                    result.push(e(item));
                }
                const load = result.find((item) => {
                    if (item && typeof item === "object" && item.loadEarlierMsgs) {
                        return true;
                    }
                    return false;
                });
                (async function () {
                    const callbackArrays = result.map((item) => {
                        if (item && typeof item === "object") {
                            const foundedChat = getChatModule(item);
                            if (foundedChat) {
                                return new Promise((resolve) =>
                                    callback(foundedChat, load.loadEarlierMsgs, resolve)
                                );
                            }
                        }
                    });

                    await Promise.all(callbackArrays);
                })();
            },
        ]);
    } catch (e) {
        console.log("Exception in addEventListener", e);
    }
});
