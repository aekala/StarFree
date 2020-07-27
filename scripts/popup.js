function getDOM() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.get(tabs[0].id, function(currentTab) {
            let url = currentTab.url;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = "document";
            xhr.onload = function() {
                getStarAdvertiserArticle(xhr.response)
            }
            xhr.send();
        });
    });
}

function getStarAdvertiserArticle(document) {
    let article = document.getElementById("hsa-paywall-content").innerHTML;
    chrome.extension.getBackgroundPage().console.log(document.getElementById("hsa-paywall-content").innerHTML);  
    renderArticle();              
}

function renderArticle(article) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.insertCSS(
            tabs[0].id,
            {
                code: "#hsa-paywall-overlay { display: none }"
            }
        )
        });
}

function onWindowLoad() {
    getDOM();
}

window.onload = onWindowLoad();