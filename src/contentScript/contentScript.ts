// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "ping") {
//         // Do some processing here if needed
//         // Send a success response
//          const targetDivId = "main"; // Change this to your desired div's id
//
//         const targetDiv = document.getElementById(targetDivId);
//         const pageContent = targetDiv ? targetDiv.textContent : null;
//         sendResponse({ success: true, message: "Message received in content script.", content: pageContent });
//     }
// });
import $ from './../../code.jquery.min.js'


// contentScript.ts

// contentScript.js

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "ping") {
//         const targetDivId = "main"; // Change this to your desired div's id
//
//         const targetDiv = document.getElementById(targetDivId);
//         let headerText = null;
//
//         if (targetDiv) {
//             const firstHeader = targetDiv.querySelector('header');
//             if (firstHeader) {
//                 // Exclude specific <span> elements with a title attribute
//                 const excludedSpans = firstHeader.querySelectorAll('span[title]');
//
//                 excludedSpans.forEach(span => {
//                     span.textContent = ''; // Clear the text content of these spans
//                 });
//
//                 headerText = firstHeader.textContent.trim();
//             }
//         }
//
//         sendResponse({ success: true, message: "Message received in content script.", content: headerText });
//     }
// });

// contentScript.js

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "ping") {
//         const targetDivId = "main"; // Change this to your desired div's id
//
//         const targetDiv = document.getElementById(targetDivId);
//         const contentSections = [];
//         let headerText = null;
//
//         if (targetDiv) {
//             const firstHeader = targetDiv.querySelector('header');
//             // Exclude specific <span> elements with a title attribute
//             const excludedSpans = firstHeader.querySelectorAll('span[title]');
//
//             excludedSpans.forEach(span => {
//                 span.textContent = ''; // Clear the text content of these spans
//             });
//
//             headerText = firstHeader.textContent.trim();
//
//             // Select and extract text content from desired divs
//             const focusableDivs = targetDiv.querySelectorAll('div.focusable-list-item');
//             const copyableDivs = targetDiv.querySelectorAll('span.selectable-text.copyable-text');
//
//             focusableDivs.forEach(div => {
//                 contentSections.push(div.textContent.trim());
//             });
//         }
//
//         const contentObject = {
//             [headerText]: contentSections
//         };
//
//         sendResponse({ success: true, message: "Message received in content script.", content: contentObject });
//         return 1;
//     }
// });


// const storedMainObject = JSON.parse(localStorage.getItem('chatData'));
//
// if (!storedMainObject) {
//     const mainObject = {
//         usersData: []
//     };
//
//     localStorage.setItem('chatData', JSON.stringify(mainObject));
// }
//
// console.log(storedMainObject)

const targetDivId = "main";
const targetDiv = document.getElementById(targetDivId);


// function getContentFun() {
//     const contentSections = [];
//     let headerText = null;
//
//     if (targetDiv) {
//         const firstHeader = targetDiv.querySelector('header');
//
//         // Exclude specific <span> elements with a title attribute
//         const excludedSpans = firstHeader.querySelectorAll('span[title]');
//
//         excludedSpans.forEach(span => {
//             span.textContent = ''; // Clear the text content of these spans
//         });
//
//         headerText = firstHeader.textContent.trim();
//
//
//         //const focusableDivs = targetDiv.querySelectorAll('div.focusable-list-item');
//         //const copyableDivs = targetDiv.querySelectorAll('span.selectable-text.copyable-text span');
//
//         const elements = targetDiv.querySelectorAll('div.focusable-list-item[tabindex="-1"], span.selectable-text.copyable-text');
//
//         elements.forEach(element => {
//             if (element.tagName === 'DIV' &&
//                 element.classList.contains('focusable-list-item') &&
//                 element.getAttribute('tabindex') === '-1') {
//
//                 const contentObject = {
//                     name: element.textContent.trim(),
//                     content: null
//                 };
//
//                 contentSections.push(contentObject);
//             } else {
//                 const lastContentObject = contentSections[contentSections.length - 1];
//                 if (lastContentObject) {
//                     if (lastContentObject.content === null) {
//                         lastContentObject.content = []; // Initialize the content array if null
//                     }
//                     lastContentObject.content.push(element.textContent.trim());
//                 }
//             }
//         });
//
//         const contentObject = {
//             [headerText]: contentSections
//         };
//
//         console.log(contentObject)
//     }
// }

// setInterval(getContentFun, 4000)


// =========================================================================

// const scrollStep = 100;
// let currentScroll = 0;
//
// let usersNameArray = [];
// chrome.storage.local.get(['usersData'], (result) => {
//     usersNameArray = result.usersData || [];
// });
//
// function scrollAndCheck(element) {
//     currentScroll += scrollStep;
//     element.scrollTo(0, currentScroll);
//
//     setTimeout(() => {
//         const isScrolledToBottom = element.scrollHeight - element.clientHeight <= element.scrollTop;
//
//         if (!isScrolledToBottom) {
//             const users = element.querySelectorAll('div[role="gridcell"][aria-colindex="2"]');
//
//             users.forEach(user => {
//                 const firstDiv = user.querySelector('div:first-child');
//                 if (firstDiv) {
//                     const userName = firstDiv.textContent.trim();
//                     if (!usersNameArray.some(obj => obj.userName === userName)) {
//                         user.click();
//                         usersNameArray.push({
//                             userName,
//                             is_excluded: false,
//                             last_sync: new Date().toLocaleString(),
//                             content: `Custom content for ${userName}`
//                         });
//
//                         console.log("New user added:", userName);
//                     }
//                 }
//             });
//
//             scrollAndCheck(element);
//         } else {
//             console.log("Reached the bottom or no more scrolling possible.");
//
//             chrome.storage.local.set({usersData: usersNameArray}, () => {
//                 console.log('Data stored:', usersNameArray);
//             });
//             return 1;
//         }
//     }, 100);
// }
//
// let checkIfMainExist = setInterval(() => {
//     const targetSideDiv = document.querySelector('div[aria-label="Chat list"]');
//
//     if (targetSideDiv) {
//         clearInterval(checkIfMainExist);
//         const isScroll = document.getElementById("pane-side");
//         scrollAndCheck(isScroll);
//     }
// }, 4000);

//#######################################Click #######

const scrollStep = 20;
let currentScroll = 0;
let usersNameArray = [];

function scrollAndCheck(element) {
    currentScroll += scrollStep;
    element.scrollTo(0, currentScroll);

    setTimeout(() => {
        const isScrolledToBottom = element.scrollHeight - element.clientHeight <= element.scrollTop;

        if (!isScrolledToBottom) {
            const users = element.querySelectorAll('div[role="listitem"]');

            let userIndex = 0;

            function processNextUser() {
                if (userIndex < users.length) {
                    const user = users[userIndex];

                    if (user) {
                        setTimeout(() => {
                            // Do something after clicking and waiting for 5 seconds
                            // let usersText = user.querySelector('div[role="gridcell"][aria-colindex="2"]');
                            // console.log("Clicked on user and waited for 5 seconds:", usersText.textContent.trim());
                            user.click();

                            setTimeout(() => {
                                console.log("Clicked on the first user:", user.innerHTML);
                            }, 1000); // Wait 1 second after clicking

                            userIndex++;
                            processNextUser();
                        }, 5000);
                    } else {
                        userIndex++;
                        processNextUser();
                    }
                } else {
                    scrollAndCheck(element);
                }
            }

            processNextUser();
        } else {
            console.log("Reached the bottom or no more scrolling possible.");

            chrome.storage.local.set({usersData: usersNameArray}, () => {
                console.log('Data stored:', usersNameArray);
            });
        }
    }, 100);
}

let checkIfMainExist = setInterval(() => {
    const targetSideDiv = document.querySelector('div[aria-label="Chat list"]');

    if (targetSideDiv) {
        clearInterval(checkIfMainExist);
        const isScroll = document.getElementById("pane-side");
        // scrollAndCheck(isScroll);

        // Get the first list item element
        // const firstListItem = document.querySelector('[role="listitem"]');
        const targetJqueryDiv = $('div[role="listitem"]').first();

        targetJqueryDiv.attr('id','firstItem');
        $('#firstItem').css({border: "2px solid"})

        // Function to simulate a mouse click on a specific element
        function simulateMouseClick(element) {
            const event = document.createEvent('MouseEvent');
            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            element.dispatchEvent(event);
        }

        // Function to simulate mouse movement and click
        function simulateMouseMovementAndClick() {
            const targetElement = $('#firstItem'); // Replace with your target div selector

            if (targetElement.length === 0) {
                console.log('Target element not found.');
                return;
            }

            // Simulate mouse movement to the target element
            const offset = targetElement.offset();
            const event = $.Event('mousemove', { clientX: offset.left, clientY: offset.top });
            $('body').trigger(event);

            // Simulate a mouse click on the target element
            simulateMouseClick(targetElement[0]);
        }

        simulateMouseMovementAndClick();
    }
}, 4000);
