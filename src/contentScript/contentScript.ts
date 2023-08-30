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

function getContentFun() {

    const targetDivId = "main"; // Change this to your desired div's id
    const targetDiv = document.getElementById(targetDivId);
    const contentSections = [];
    let headerText = null;

    if (targetDiv) {
        const firstHeader = targetDiv.querySelector('header');

        // Exclude specific <span> elements with a title attribute
        const excludedSpans = firstHeader.querySelectorAll('span[title]');

        excludedSpans.forEach(span => {
            span.textContent = ''; // Clear the text content of these spans
        });

        headerText = firstHeader.textContent.trim();


        //const focusableDivs = targetDiv.querySelectorAll('div.focusable-list-item');
        //const copyableDivs = targetDiv.querySelectorAll('span.selectable-text.copyable-text span');

        const elements = targetDiv.querySelectorAll('div.focusable-list-item[tabindex="-1"], span.selectable-text.copyable-text');

        elements.forEach(element => {
            if (element.tagName === 'DIV' &&
                element.classList.contains('focusable-list-item') &&
                element.getAttribute('tabindex') === '-1') {

                const contentObject = {
                    name: element.textContent.trim(),
                    content: null
                };

                contentSections.push(contentObject);
            } else {
                const lastContentObject = contentSections[contentSections.length - 1];
                if (lastContentObject) {
                    if (lastContentObject.content === null) {
                        lastContentObject.content = []; // Initialize the content array if null
                    }
                    lastContentObject.content.push(element.textContent.trim());
                }
            }
        });

        const contentObject = {
            [headerText]: contentSections
        };

        console.log(contentObject)
        return 1;
    }
}

setInterval(getContentFun, 4000)

