console.log("Welcome to Spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar");
let img = document.getElementById("img1");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');
let masterSongImage = document.getElementById('img1');
let songItemContainer = document.querySelector(".songItemContainer");

let songs = [
    {songname: "Raat ki Rani", filePath: "1.mp3", coverPath: "1.jpeg"},
    {songname: "W", filePath: "2.mp3", coverPath: "2.png"},
    {songname: "Champions", filePath: "3.mp3", coverPath: "3.png"},
    {songname: "I Dont Miss That Life", filePath: "4.mp3", coverPath: "4.png"},
    {songname: "Naam Kaam Sheher", filePath: "5.mp3", coverPath: "5.png"},
    {songname: "Swah!", filePath: "6.mp3", coverPath: "6.png"},
    {songname: "Red", filePath: "7.mp3", coverPath: "7.jpeg"},
    {songname: "Round 3", filePath: "8.mp3", coverPath: "8.jpeg"},
];

// Add song items dynamically
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})

// Handle Play/Pause for master play
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // Start playing
        audioElement.src = `${songIndex + 1}.mp3`; // Correct path
        audioElement.play().then(() => {
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            img.style.opacity = 1;
            masterSongName.innerText = songs[songIndex].songname;
            masterSongImage.src = songs[songIndex].coverPath;
        }).catch((error) => {
            console.error('Error playing audio:', error);  // Catch any errors
        });
    } else {
        // Pause
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        img.style.opacity = 0;
    }
});

// Listen to progress updates
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// Handle individual song play
document.querySelectorAll(".songItemPlay").forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songname;
        masterSongImage.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        img.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    });
});
songs.forEach((song, index) => {
    const songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerHTML = `<img src="${song.coverPath}" alt="${index + 1}>
        <span class="songName">${song.songname}</span>
        <span class="songlistplay">
            <span class="timestamp">03:00 <i id="${index}" class="far songItemPlay fa-play-circle"></i></span>
        </span>
    `;
    songItemContainer.appendChild(songItem);
});

// Next song functionality
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songname;
    masterSongImage.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    img.style.opacity = 1;
});

// Previous song functionality
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songname;
    masterSongImage.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    img.style.opacity = 1;
});

// after song ended
audioElement.addEventListener('ended', ()=>{
   songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songname;
    masterSongImage.src = songs[songIndex].coverPath;

    //reset song progress
    audioElement.currentTime = 0;
    audioElement.play();

    //update play pause button
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    img.style.opacity = 1;
});
