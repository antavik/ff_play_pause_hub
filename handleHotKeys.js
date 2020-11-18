browser.commands.onCommand.addListener(handleHotKeys);

function handleHotKeys(command) {
    switch (command) {
        case "play-pause":
            processCommand(playPause);
            break;
    }
}

function processCommand(command) {
    requestAllAudibleTabs()
    .then(resp => command(resp));
}

function requestAllAudibleTabs() {
    return Promise.all([audibleTabs()]).then(tabs => tabs.flat());
}

function audibleTabs() {
    return browser.tabs.query({audible: true})
    .then(
        (mediaTabs) => {
            return mediaTabs == null || mediaTabs.length === 0 ? [] : mediaTabs;
        }, () => [])
    .catch(() => {
        return [];
    });
}

function playPause(tabs) {
    if (tabs.length > 0) {
        for (let tab of tabs) {
            browser.tabs.executeScript(tab.id, { file: "./playPauseAction.js" });
        }
    }
}
