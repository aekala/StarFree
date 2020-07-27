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
    article = article.replace(/"/g, "\\\"");    // escape quotes so they don't cause syntax problems when changing the HTML 
    chrome.extension.getBackgroundPage().console.log(article);  
    renderArticle(article);              
}

function renderArticle(article) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: "document.getElementById(\"hsa-paywall-overlay\").innerHTML = \"" + article + "\""
            }
        )
        });
}

function onWindowLoad() {
    chrome.pageAction.onClicked.addListener(function(tab) {
        getDOM();    
    });
}

window.onload = onWindowLoad();