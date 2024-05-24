

const selectedSong=document.getElementById('selectedSong');
const playPauseBtn=document.getElementById('playPauseBtn');
const playIcon='<i class="fas fa-play"></i>';
const pauseIcon='<i class="fas fa-pause"></i>';
let isPlaying=true;
const songProgress=document.getElementById('songProgress');
let sliderProgress;
let songMinutes=0;
let songSeconds=0;
let songImage='../assets/varahai.png';
const playerSongImage=document.getElementById('playerSongImage');
let songName_='Varag NadhiKarai';
const songName=document.getElementById('songName');
let songArtist='Shankar Mahadevan';
let songAlbum='Sangamam';
let songYear='2023';
const songOtherDetails=document.getElementById('songOtherDetails');
const circleIcon='<i class="fas fa-circle fa-xs"></i>';
const popUpBtn=document.getElementById('popUpBtn');
const popUpDiv=document.getElementById('popUpDiv');
const popUpIcon='<i class="fas fa-caret-up"></i>';
const popDownIcon='<i class="fas fa-caret-down"></i>';
const muteIcon='<i class="fas fa-volume-mute"></i>';
const volumeIcon='<i class="fas fa-volume-up"></i>';
const volumeBtn=document.getElementById('volumeBtn');
const popUpImage=document.getElementById('popUpImage');
let songPopUpImage='../assets/varahaipopup.png'

playPauseBtn.addEventListener("click",togglePlayPause);
function togglePlayPause(){
    if(selectedSong.paused){
        selectedSong.play();
        clearInterval(sliderProgress);  
        sliderprogress = setInterval(() => {
            var currTime = Math.floor(selectedSong.currentTime);  //round down to nearest integer
            var percentageComplete = Math.floor((currTime / selectedSong.duration) * 100);
            songProgress.value = percentageComplete;
            console.log(percentageComplete);
            songMinutes=Math.floor(currTime/60);
            songSeconds=Math.floor(currTime%60);
            document.getElementById('selectedSongTime').innerHTML=songMinutes+":"+songSeconds;
        }, 1000);
        playPauseBtn.innerHTML=pauseIcon;
    }
    else{
        selectedSong.pause();
        playPauseBtn.innerHTML=playIcon;
    }
}

playerSongImage.src=songImage;
songName.innerHTML=songName_;
songOtherDetails.innerHTML=songArtist+" "+circleIcon+" "+songAlbum+" "+circleIcon+" "+songYear;

songProgress.addEventListener('input',()=>{
    let songTime=(((selectedSong.duration)*(songProgress.value)) / 100);
    selectedSong.currentTime=songTime;
    clearInterval(sliderProgress);  
  })

popUpBtn.addEventListener('click',()=>{
    if(popUpDiv.style.display==='block'){
        popUpDiv.style.display='none';
        popUpBtn.innerHTML=popUpIcon;
    }
    else{
        popUpDiv.style.display='block';
        popUpBtn.innerHTML=popDownIcon;
    }
})

volumeBtn.addEventListener('click',()=>{
    if(selectedSong.volume===0){
        selectedSong.volume=1;
        volumeBtn.innerHTML=volumeIcon;
    }
    else{
        selectedSong.volume=0;
        volumeBtn.innerHTML=muteIcon;
    }
})

popUpImage.src=songPopUpImage;