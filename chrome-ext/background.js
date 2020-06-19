
chrome.runtime.onInstalled.addListener( () => {
  chrome.storage.sync.set({color: "test"}, () => {
    console.log("test");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.netflix.com'}
          }),

          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.hulu.com'}
          })
        ],

        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
