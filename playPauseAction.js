async function playPauseAction() {
    var playPauseElement = document.querySelector('video, audio');

    if (playPauseElement.paused) {
        await playPauseElement.play();
    } else {
        await playPauseElement.pause();
    }
}