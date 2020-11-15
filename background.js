const URL = "https://play.pocketcasts.com/";

var action_tab;

// browser.browserAction.onClicked.addListener(clickExtendionButtonToPlayPause);


function clickExtendionButtonToPlayPause() {
    if (action_tab === undefined) {
        browser.windows.getAll({ populate: true }, getTabsAndExecuteScript);
    } else {
        executePlayPauseScript(action_tab);
    }
}

function getTabsAndExecuteScript(windows) {
    const tabs = getRequestedTabs(windows, URL);

    if (tabs.length) {
        executePlayPauseScript(tabs[0]);  // Get first tab
    }
}

function getRequestedTabs(windows, url) {
    var requested_tabs = [];

    for (var i = 0; i < windows.length; i++) {
        for (var j = 0; j < windows[i].tabs.length; j++) {
            if (windows[i].tabs[j].url.includes(url)) {
                requested_tabs.push(windows[i].tabs[j]);
            }
        }
    }

    return requested_tabs;
}

function executePlayPauseScript(action_tab) {
    browser.tabs.executeScript(action_tab.id, { file: "./play_pause.js" });
}
