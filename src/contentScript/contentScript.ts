const scrollStep = 100;
let currentScroll = 0;
let usersNameArray = []; // Initialize as an array of objects

function scrollAndCheck(element) {
    currentScroll += scrollStep;
    element.scrollTo(0, currentScroll);

    setTimeout(() => {
        const scrollTimeout = setTimeout(() => {
            const isScrolledToBottom = element.scrollHeight - element.clientHeight <= element.scrollTop;
            clearTimeout(scrollTimeout);

            if (!isScrolledToBottom) {
                const users = element.querySelectorAll('div[role="gridcell"][aria-colindex="2"]');

                users.forEach(function (user) {
                    const firstDiv = user.querySelector('div:first-child');
                    if (firstDiv) {
                        const userName = firstDiv.textContent.trim();
                        if (!usersNameArray.some(obj => obj.userName === userName)) {
                            usersNameArray.push({
                                userName,
                                content: `Custom content for ${userName}` // Add custom content here
                            });

                            console.log("New user added:", userName);
                        }
                    }
                });

                scrollAndCheck(element);
            } else {
                console.log("Reached the bottom or no more scrolling possible.");
                // Update local storage with the new items
                chrome.storage.local.set({usersData: usersNameArray}, () => {
                    console.log('Data stored:', usersNameArray);
                });
            }
        }, 100);
    }, 100);
}

let checkIfMainExist = setInterval(() => {
    const targetSideDiv = document.querySelector(`div[aria-label="Chat list"]`);

    if (targetSideDiv) {
        clearInterval(checkIfMainExist);

        const isScroll = document.getElementById("pane-side");
        scrollAndCheck(isScroll);
    }
}, 4000);
