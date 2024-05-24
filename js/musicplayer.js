

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
// selectedSong.muted=true;
window.addEventListener('load', () => {
    selectedSong.play().catch(error => {
        console.error('Autoplay failed:', error);
    });
    clearInterval(sliderProgress);  
    sliderprogress = setInterval(() => {
        var currTime = Math.floor(selectedSong.currentTime);  //round down to nearest integer
        var percentageComplete = Math.floor((currTime / selectedSong.duration) * 100);
        songProgress.value = percentageComplete;
        songMinutes=Math.floor(currTime/60);
        songSeconds=Math.floor(currTime%60);
        document.getElementById('selectedSongTime').innerHTML=songMinutes+":"+songSeconds;
    }, 1000);
});

playerSongImage.src=songImage;
songName.innerHTML=songName_;
songOtherDetails.innerHTML=songArtist+" "+circleIcon+" "+songAlbum+" "+circleIcon+" "+songYear;

songProgress.addEventListener('input',()=>{
    let songTime=(((selectedSong.duration)*(songProgress.value)) / 100);
    selectedSong.currentTime=songTime;
    clearInterval(sliderProgress);  
  })


playPauseBtn.addEventListener("click",togglePlayPause);
function togglePlayPause(){
    if(selectedSong.paused){
        selectedSong.play();
    }
    else{
        selectedSong.pause();
    }
    if(isPlaying){
        playPauseBtn.innerHTML=pauseIcon;
    }
    else{
        playPauseBtn.innerHTML=playIcon;
    }
    isPlaying=!isPlaying;

}

