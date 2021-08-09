// UI
const musiccontainer = document.getElementById('music-container');

const title = document.getElementById('title'),
    progresscontainer = document.getElementById('progress-container'),
    progress = document.getElementById('progress');

const audio= document.getElementById('audio');

const cover = document.getElementById('cover');

const prevbtn = document.getElementById('prev'),
    playbtn = document.getElementById('play'),
    nextbtn = document.getElementById('next');

let songindex = 0;

// song title
const songs = ['sample1','sample2','sample3'];

// console.log(songs[songindex]);

loadsong(songs[songindex]);

function loadsong(music){
    // console.log('hay');
    // console.log(music);

    title.innerText = music;
    audio.src = `music/${music}.mp3`;
    cover.src = `img/${music}.jpg`;
}

// Event Lister for play/pause
playbtn.addEventListener('click',()=>{
    // console.log('hay');
    const isplaying = musiccontainer.classList.contains('play');

    if(isplaying){
        pausesong();
    }else{
        playsong();
    }
});

// Play Song
function  playsong(){
    musiccontainer.classList.add('play');

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause Song
function pausesong(){
    musiccontainer.classList.remove('play');

    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();

}

//Change song
prevbtn.addEventListener('click',previoussong);
nextbtn.addEventListener('click',nextsong);

//Previous Song
function previoussong(){
    songindex--;
    // console.log(songindex);

    if(songindex < 0){
        songindex = songs.length - 1;
    }

    loadsong(songs[songindex]);
    playsong();
}

//Next Song
function nextsong(){
    songindex++;
    // console.log(songindex);

    if(songindex > songs.length-1){
        songindex = 0;
    }

    loadsong(songs[songindex]);
    playsong();
}

//Update progress
function updateprogress(e){
    // console.log('hay');
    //console.log(audio.currentTime);
    // console.log(audio.duration);

    //Method 1
    // const progresspercent = (audio.currentTime/audio.duration) * 100;
    // console.log(progresspercent);
    // progress.style.width = `${progresspercent}%`;

    // Event Call
    // console.log(this);
    // console.log(e.target);
    // console.log(e.srcElement);

    // Method 2
    // const currenttime = e.target.currentTime;
    // const duration = e.target.duration;
    // const progresspercent = (currenttime / duration) *100;
    // progress.style.width = `${progresspercent}%`;

    //Method 3
    // const {currentTime} = e.target;
    // const {duration} = e.target;
    // const progresspercent = (currentTime / duration)*100;
    // progress.style.width = `${progresspercent}%`;

    //Method 4
    const {currentTime, duration} = e.target;
    const progresspercent = (currentTime / duration)*100;
    progress.style.width = `${progresspercent}%`;

}

// Time Play and Stop Update
audio.addEventListener('timeupdate',updateprogress);


//Click On Progress Bar
progresscontainer.addEventListener('click',setprogress);


//Set Progress Bar
function setprogress(e){
    // console.log('hay');
    // console.log(e.target);

    const width = e.target.clientWidth;
    //console.log(width);

    const clickx = e.offsetX;
    // console.log(clickx);

    const duration = audio.duration;
    // console.log(duration);

    audio.currentTime = (clickx / width) *duration;
}


//Song End
audio.addEventListener('ended',nextsong);