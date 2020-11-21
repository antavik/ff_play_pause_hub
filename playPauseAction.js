function playPauseAction() {
    var playPauseButtons = document.querySelectorAll('[class^="AnimatedPlayButtonstyled"], [class^="ytp-play-button"]');
    playPauseButtons[playPauseButtons.length - 1].click();
}