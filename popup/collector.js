document.addEventListener("DOMContentLoaded", handleDomLoaded);

const pocketCastsUrl = "https://play.pocketcasts.com";
const pocketCastsAlias = "pc";
const youTubeUrl = "https://www.youtube.com";
const youTubeAlias = "yt";

function handleDomLoaded(e) {
    requestAllTabs()
    .then((response) => { loadedTabs(response) });
}

function requestAllTabs() {
    return Promise.all([
        requestTab(`${pocketCastsUrl}/*`),
        requestTab(`${youTubeUrl}/*`)
    ])
    .then((responses) => { return responses.flat() })
    .catch((error) => { console.log(error) });
}

function requestTab(domain) {
    return browser.tabs.query({url: domain})
    .then(
        (mediaTabs) => {
            return mediaTabs == null || mediaTabs.length === 0 ? [] : mediaTabs;
        }, () => { return [] })
    .catch(() => { return [] });
}

function loadedTabs(tabs) {
    if (tabs.length > 0) {
        setPlayersList(tabs);
    } else {
        setEmptyPopup();
    }
}

function setPlayersList (tabs) {
    const mediaListDiv = document.getElementById("media-list");

    for (let tab of tabs) {
        // Create new element
        let newMediaElement = document.createElement("div");

        // Set text content
        let content = document.createTextNode(tab.title);
        newMediaElement.appendChild(content);

        // Set CSS classes
        newMediaElement.classList.add("button", "player");
        if (tab.audible) {
            newMediaElement.classList.add("active");
        }

        // Set attributes
        newMediaElement.setAttribute("tab-id", tab.id);
        if (tab.url.includes(pocketCastsUrl)) {
            newMediaElement.setAttribute("tab-type", pocketCastsAlias);
        } else if (tab.url.includes(youTubeUrl)) {
            newMediaElement.setAttribute("tab-type", youTubeAlias);
        }

        setupClickEvent(newMediaElement);

        mediaListDiv.appendChild(newMediaElement);
    }
}

function setupClickEvent (element) {
    element.addEventListener("click", clickEvent);
}

async function clickEvent(event) {
    let tabId = Number(event.target.getAttribute("tab-id"));
    let tabType = event.target.getAttribute("tab-type");

    browser.tabs.executeScript(tabId, {file: "../PlayPauseAction.js"})
    .then(() => { event.target.classList.toggle("active") })
    .catch((error) => { console.log(error) });
}

function setEmptyPopup() {
    document.querySelector("#media-list").classList.add("hidden");
    document.querySelector("#empty-list").classList.remove("hidden");
}
