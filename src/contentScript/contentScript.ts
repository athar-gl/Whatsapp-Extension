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

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "ping") {
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

            const contentObjects = [];
            let currentContentObject = null;

            // Iterate through each div with class 'focusable-list-item'
            const elements = targetDiv.querySelectorAll('div.focusable-list-item, span.selectable-text.copyable-text');
            elements.forEach(element => {
                if (element.classList.contains('focusable-list-item')) {
                    // If the element is a focusable div, create a new content object
                    if (currentContentObject) {
                        contentObjects.push(currentContentObject);
                    }

                    const headerText = element.textContent.trim();
                    currentContentObject = {
                        name: headerText,
                        content: []
                    };
                } else {
                    // If the element is not a focusable div, add its content to the current content object
                    if (currentContentObject) {
                        currentContentObject.content.push(element.textContent.trim());
                    }
                }
            });

            // Add the last content object after the loop
            if (currentContentObject) {
                contentObjects.push(currentContentObject);
            }

            // Sending the response (assuming sendResponse is a function)
            const [response] = await Promise.all([sendResponse({
                success: true,
                message: "Message received in content script.",
                content: contentObjects
            })]);


            return 1;
        }
    }

});

