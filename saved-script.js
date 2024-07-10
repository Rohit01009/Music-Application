let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('list'));

let songs = [
    {songName: "Kyo kisi ko(Tere Naam) - Udit Narayan", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg"},
    {songName: "Chaleya - Arjit Singh", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg"},
    {songName: "Baatein Ye Kabhi Na - Arjit Singh", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg"},
    {songName: "Get Ready To Fight - Siddharth Basrur", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpg"},
    {songName: "Desi Kaalastar - Honey Singh", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg"},
    {songName: "Mai Agar Kahoon - Sonu Nigam", filePath: "/songs/6.mp3", coverPath: "/covers/6.jpg"},
    {songName: "Mi-Amor - Sharn X Bohemia", filePath: "/songs/7.mp3", coverPath: "/covers/7.jpg"},
    {songName: "Love Dose - Honey Singh", filePath: "/songs/8.mp3", coverPath: "/covers/8.jpg"},
    {songName: "Soulmate - Jassie Gill", filePath: "/songs/9.mp3", coverPath: "/covers/9.jpg"},
    {songName: "Fully faltu - pagalWorld.com", filePath: "/songs/10.mp3", coverPath: "/covers/10.jpg"},
    {songName: "3 Peg - Sharry Mann", filePath: "/songs/11.mp3", coverPath: "/covers/3 peg.jpg"},
    {songName: "Dope Shope - Honey Singh", filePath: "/songs/12.mp3", coverPath: "/covers/dope shope.jpg"},
    {songName: "Tinku jiya - pagalWorld.com", filePath: "/songs/13.mp3", coverPath: "/covers/tinku jiya.jpg"},
    {songName: "Kya Loge Tum - B Praak", filePath: "/songs/14.mp3", coverPath: "/covers/kya loge tum.jpg"},
]
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

function shuffle() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    songIndex = randomIndex;
    playShuffledSong();
}

function playShuffledSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    makeAllPlays();
    songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.remove('fa-play-circle');
    songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.add('fa-pause-circle');
}
