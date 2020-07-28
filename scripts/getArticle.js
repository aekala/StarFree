// create and send an XMLHttpRequest to get the page source of the article
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

// get the article text and format it to prepare it for insertion into the webpage
function getStarAdvertiserArticle(document) {
    let article = "";
    let articleDOMChildren = document.getElementById("hsa-paywall-content").children;
    for (let i = 0; i < articleDOMChildren.length; i++) {
        article += articleDOMChildren.item(i).innerHTML + "<br><br>";
    }
    article = article.replace(/"/g, "\\\"");    // escape quotes so they don't cause syntax problems when changing the HTML 
    renderArticle(article);              
}

// replace the HTML content of the paywall div section with the article text (removes the paywall)
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

// activate the extension by clicking on the icon in the Google Chrome toolbar
function onWindowLoad() {
    chrome.pageAction.onClicked.addListener(function(tab) {
        getDOM();    
    });
}

window.onload = onWindowLoad();