let selectedMood = "";
  let selectedLanguage = "";

  function selectMood(mood) {
    selectedMood = mood;
    hideElement('mood-container');
    showElement('language-container');
  }

  function selectLanguage(language) {
    selectedLanguage = language;
    hideElement('language-container');
    showElement('playlist-container');
    showElement('audioPlayer');
    showPlaylist();
  }

  function showPlaylist() {
    const playlistId = `${selectedMood.toLowerCase()}-${selectedLanguage.toLowerCase()}`;
    const playlist = document.getElementById(playlistId);
    if (playlist) {
      playlist.style.display = 'block';
    }
  }

  function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = 'none';
    }
  }

  function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = 'flex';
    }
  }

  let currentAudio = null;

  function playPause(playlistId, songUrl) {
    const playlist = document.getElementById(playlistId);
    const audioElement = new Audio(songUrl);

    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
    }

    if (currentAudio !== audioElement) {
      audioElement.play();
      currentAudio = audioElement;
    } else {
      currentAudio = null;
    }

    audioElement.addEventListener('ended', function () {
      currentAudio = null;
    });
  }