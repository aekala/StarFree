// only allow page action if on a premium Star Advertiser article
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({ 
          pageUrl: {hostEquals: 'www.staradvertiser.com'},
          css: [".paywall-subscribe"]
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

