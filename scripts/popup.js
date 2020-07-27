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
    let article = "";
    let articleDOMChildren = document.getElementById("hsa-paywall-content").children;
    for (let i = 0; i < articleDOMChildren.length; i++) {
        article += articleDOMChildren.item(i).innerHTML + "<br><br>";
    }
    renderArticle(article);              
}

function renderArticle(article) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.extension.getBackgroundPage().console.log(article);  
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: "document.getElementById(\"hsa-paywall-overlay\").innerHTML = \"" + article + "\""
            }
        )
        });
}

function onWindowLoad() {
    getDOM();
}

window.onload = onWindowLoad();