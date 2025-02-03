console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar");
let img = document.getElementById("img1");
let masterSongName = document.getElementById('masterSongName');
let masterSongImage = document.getElementById('img1');
let songItemContainer = document.querySelector(".songItemContainer");
let volumeSlider = document.getElementById("volumeSlider");
let muteBtn = document.getElementById("muteBtn");
let shuffleBtn = document.getElementById('shuffleBtn');
let loopBtn = document.getElementById('loopBtn');
let lastVolume = 1;
let isLooping = false;
let isShuffling = false;

let songs = [
    { songname: "Raat ki Rani", filePath: "1.mp3", coverPath: "1.jpeg" },
    { songname: "W", filePath: "2.mp3", coverPath: "2.png" },
    { songname: "Champions", filePath: "3.mp3", coverPath: "3.png" },
    { songname: "I Dont Miss That Life", filePath: "4.mp3", coverPath: "4.png" },
    { songname: "Naam Kaam Sheher", filePath: "5.mp3", coverPath: "5.png" },
    { songname: "Swah!", filePath: "6.mp3", coverPath: "6.png" },
    { songname: "Red", filePath: "7.mp3", coverPath: "7.jpeg" },
    { songname: "Round 3", filePath: "8.mp3", coverPath: "8.jpeg" }
];

// Fade-in 
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".fade-in").forEach((el) => el.classList.add("show"));
});

// Dynamically create song items
songs.forEach((song, index) => {
    const songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${index + 1}">
        <span class="songName">${song.songname}</span>
        <span class="songlistplay">
            <span class="timestamp">03:00 <i id="${index}" class="far songItemPlay fa-play-circle"></i></span>
        </span>
    `;
    songItemContainer.appendChild(songItem);
});

// reset all play buttons
const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

//shuffle 
shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
});

//loop 
loopBtn.addEventListener('click', () => {
    isLooping = !isLooping;
    loopBtn.classList.toggle('active', isLooping);
});

// Play song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songname;
    masterSongImage.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    img.style.opacity = 1;
    makeAllPlays();
};

// Handle Play/Pause for master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        img.style.opacity = 0;
        makeAllPlays();
    }
});

//Progress updates
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle play for individual songs
document.querySelectorAll(".songItemPlay").forEach((element) => {
    element.addEventListener("click", (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            makeAllPlays();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            img.style.opacity = 0;
        } else {
            songIndex = clickedIndex;
            playSong();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
        }
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    if (isShuffling) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    playSong();
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
});

// Auto-play next song when the current song ends
audioElement.addEventListener('ended', () => {
    if (isLooping) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        document.getElementById('next').click(); // Triggers next song event
    }
});

//volume slider
volumeSlider.addEventListener("input", () => {
    audioElement.volume = volumeSlider.value;
    if (audioElement.volume === 0) {
        muteBtn.classList.remove("fa-volume-up");
        muteBtn.classList.add("fa-volume-mute");
    } else {
        muteBtn.classList.remove("fa-volume-mute");
        muteBtn.classList.add("fa-volume-up");
    }
});

// Mute/unmute functionality
muteBtn.addEventListener("click", () => {
    if (audioElement.volume > 0) {
        lastVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeSlider.value = 0;
        muteBtn.classList.remove("fa-volume-up");
        muteBtn.classList.add("fa-volume-mute");
    } else {
        audioElement.volume = lastVolume;
        volumeSlider.value = lastVolume;
        muteBtn.classList.remove("fa-volume-mute");
        muteBtn.classList.add("fa-volume-up");
    }
});

//keyboard keys
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case " ": //spacebar for play and pause
            event.preventDefault(); // prevent scrolling 
            masterPlay.click();
            break;
        case "ArrowRight": //next song
            event.preventDefault();
            document.getElementById("next").click();
            break;
        case "ArrowLeft": //previous song
            event.preventDefault();
            document.getElementById("previous").click();
            break;
        case "ArrowUp": //volume up
            if (audioElement.volume < 1) {
                audioElement.volume = Math.min(audioElement.volume + 0.1, 1);
                volumeSlider.value = audioElement.volume
            }
            break;
        case "ArrowDown": //volume down
            if (audioElement.volume > 0) {
                audioElement.volume = Math.max(audioElement.volume - 0.1, 0);
                volumeSlider.value = audioElement.volume
            }
            break;
        case "s": //shuffle
            shuffleBtn.click();
            break;
        case "l": //loop
            loopBtn.click();
            break;
    }
});
