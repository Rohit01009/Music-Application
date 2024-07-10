var currentSong = null;

function playPause(songId) {
    var audio = document.getElementById(songId);

    if (audio !== currentSong) {
        if (currentSong !== null) {
            currentSong.pause();
            currentSong.classList.remove('playing');
        }

        audio.play();
        audio.classList.add('playing');
        currentSong = audio;
    } else {
        if (audio.paused) {
            audio.play();
            audio.classList.add('playing');
        } else {
            audio.pause();
            audio.classList.remove('playing');
            currentSong = null;
        }
    }
}