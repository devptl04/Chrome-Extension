chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getLinks') {
        chrome.storage.sync.get({ links: {} }, (data) => {
            sendResponse(data.links);
        });
        return true; // Keep the message channel open for sendResponse
    }
});
