console.log("Welcome to Retrify");

// Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Aap Ki Ankho Mein Kuch [Kishore Kumar Release]", filePath: "songs/1.mp3", coverPath: "covers/12.jpg"},
    {songName: "Abhi Na Jaao Chhod Kar [Md.Rafi - Asha Bhosle]", filePath: "songs/2.mp3", coverPath: "covers/14.jpg"},
    {songName: "Ajeeb Dastan Hai Yeh [Lata Mangeshkar]", filePath: "songs/3.mp3", coverPath: "covers/13.jpg"},
    {songName: "Chookar Mere Mann Ko [Kishore Kumar Release]", filePath: "songs/4.mp3", coverPath: "covers/12.jpg"},
    {songName: "Hothon Se Chhu Lo Tum [Jagjit Singh]", filePath: "songs/5.mp3", coverPath: "covers/11.jpg"},
    {songName: "Kabhi Kabhi Mere Dil Mein [Lata & Mukesh]", filePath: "songs/6.mp3", coverPath: "covers/13.jpg"},
    {songName: "Lag Jaa Gale [Lata Mangeshkar]", filePath: "songs/7.mp3", coverPath: "covers/13.jpg"},
    {songName: "Us Mod Se Shuroo Karen [Jagjit Singh - Chitra Singh]", filePath: "songs/8.mp3", coverPath: "covers/11.jpg"},
    {songName: "Hoshwalon Ko Khabar Kya [Jagjit Singh]", filePath: "songs/9.mp3", coverPath: "covers/11.jpg"},
    {songName: "Tera Mujhse [Kishore Kumar]", filePath: "songs/10.mp3", coverPath: "covers/12.jpg"},
]

console.log("Songs array:", songs);

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    console.log(`Loaded song item ${i}:`, songs[i]);
});
 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        console.log("Playing audio:", audioElement.src);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        console.log("Paused audio:", audioElement.src);
    }
});

audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
    console.log("Time update - progress:", progress);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    console.log("Progress bar changed - new time:", audioElement.currentTime);
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
    console.log("Reset all play buttons to play state.");
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        console.log("Playing song:", songs[songIndex]);
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    console.log("Next song:", songs[songIndex]);
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    console.log("Previous song:", songs[songIndex]);
});
