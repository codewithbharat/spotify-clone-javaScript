let songIndex = 0;
let audioELement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById("MasterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
]

songItems.forEach((element , i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});


//audioELement.play();

// handel play/ pause click

masterPlay.addEventListener('click', ()=>{
    console.log("clicked");
    if(audioELement.paused || audioELement.currentTime<=0){
        audioELement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    }
    else{
        audioELement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

// Lisetn to Events
audioELement.addEventListener('timeupdate', () => {
    // update seekbar

    progress = parseInt((audioELement.currentTime / audioELement.duration)* 100);
    myProgressbar.value = progress;
});

myProgressbar.addEventListener('change', () => {
  audioELement.currentTime = (myProgressbar.value * audioELement.duration) / 100;
});



const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        masterSongName.innerHTML =songs[songIndex].songName;
        audioELement.src = `songs/${songIndex}.mp3`;
        audioELement.currentTime = 0;
        audioELement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        document.getElementsByClassName("songName").innerText 
    });
});

document.getElementById("next").addEventListener('click', () => {
    if(songIndex>6) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    masterSongName.innerHTML =songs[songIndex].songName;
    audioELement.src = `songs/${songIndex}.mp3`;
    audioELement.currentTime = 0;
    audioELement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});

document.getElementById("previous").addEventListener('click', () => {
    if(songIndex<=0) {
        songIndex = 6;
    } else {
        songIndex -= 1;
    }
    masterSongName.innerHTML =songs[songIndex].songName;
    audioELement.src = `songs/${songIndex}.mp3`;
    audioELement.currentTime = 0;
    audioELement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});