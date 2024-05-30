

// const selectedSong=document.getElementById('selectedSong');
const playPauseBtn=document.getElementById('playPauseBtn');
const playIcon='<i class="fas fa-play"></i>';
const pauseIcon='<i class="fas fa-pause"></i>';
let isPlaying=true;
const songProgress=document.getElementById('songProgress');
let sliderProgress;
let songMinutes=0;
let songSeconds=0;
let songImage;
// let songImage='../assets/varahai.png';
const playerSongImage=document.getElementById('playerSongImage');
// let songName_='Varag NadhiKarai';
let songName_;
const songName=document.getElementById('songName');
// let songArtist='Shankar Mahadevan';
let songArtist;
let songDuration;
// let songAlbum='Sangamam';
// let songYear='2023';
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
// let songPopUpImage='../assets/varahaipopup.png'
// let songPopUpImage;
// const songId = 'm87B0ulgN64';
let songId=localStorage.getItem('songId');
console.log("songId: "+songId);
if(songId===null){
    songId='m87B0ulgN64';
}
console.log("songId: "+songId);
const nextSongBtn=document.getElementById('nextSongBtn');
let nextClickCounter=0;
const previousSongBtn=document.getElementById('previousSongBtn');
const videoPlayer=document.getElementById('videoPlayer');
let videoUrl;
const videoController=document.getElementById('videoController');
let newSongId;
const songList=document.getElementById('songList');



async function fetchMusicData(songId) {
    let url = `https://youtube-music-api3.p.rapidapi.com/v2/next?id=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '33c431b604msh6e6d5181f112eeep19ae7cjsnf5c1fdd3ef0b',
            'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchVideo(songId) {
    let url = `https://yt-api.p.rapidapi.com/dl?id=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7a6694efccmshbf3595fdaf4c2fep1ac0e1jsn8225601fbcde',
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}


// Call fetchMusicData with the desired songId as soon as the page loads
window.onload = function() {
  
    fetchMusicData(songId)
        .then(data => {
            if (data) {
                console.log(data);
                // Handle the data here
                songImage = data.nextItems[0].thumbnail;
                // console.log("songImage: "+songImage);
                songName_=data.nextItems[0].title;
                // console.log("title: "+songName_);
                songArtist=data.nextItems[0].author;
                songDuration=data.nextItems[0].duration;
                // console.log("views: "+songViews);
                playerSongImage.src=songImage;
                songName.innerHTML=songName_;
                songOtherDetails.innerHTML=songArtist+" "+circleIcon+" "+songDuration;
                popUpImage.src=songImage;
                // console.log("songImage: "+songImage);

                for(let i=0;i<50;i++){
                const newSongId=data.nextItems[i].videoId;    
                const newSongImage=data.nextItems[i].thumbnail;
                const newSongName=data.nextItems[i].title;
                const newSongOtherDetails=data.nextItems[i].author+" "+circleIcon+" "+data.nextItems[i].duration;
                const newClickCounter=i;
                const newListItem = document.createElement("li");
                newListItem.id="newListItem";
                newListItem.classList.add("position-relative");
                const songListDetailsDiv=document.createElement("div");
                songListDetailsDiv.id="songListDetailsDiv";
                songListDetailsDiv.classList.add("d-flex", "flex-row", "flex-wrap", "align-items-center", "justify-content-center", "m-0", "p-2");
                songListDetailsDiv.style.color="white";
                // Create and append the image element
                const songListImage = document.createElement("img");
                songListImage.id = "songListImage";
                songListImage.classList.add("me-3");
                songListImage.alt = "songListImage";
                songListImage.style.height='40px';
                songListImage.style.borderRadius='2px';
                songListImage.src=data.nextItems[i].thumbnail;
                songListDetailsDiv.appendChild(songListImage);
                // newListItem.appendChild(songListImage);
                const songListTextDetails = document.createElement("div");
                songListTextDetails.id = "songListTextDetails";
                songListTextDetails.classList.add("d-flex", "flex-column", "flex-wrap", "p-0", "m-0", "me-2");
                // newListItem.appendChild(songListTextDetails);
                songListDetailsDiv.appendChild(songListTextDetails);


                // Create and append the label elements for song name and other details
                const songListName = document.createElement("label");
                songListName.id = "songListName";
                songListName.innerHTML=data.nextItems[i].title;
                songListTextDetails.appendChild(songListName);

                const songListOtherDetails = document.createElement("label");
                songListOtherDetails.id = "songListOtherDetails";
                songListOtherDetails.innerHTML=data.nextItems[i].author+" "+circleIcon+" "+data.nextItems[i].duration;
                songListTextDetails.appendChild(songListOtherDetails);

                // Append the new list item to the list
                newListItem.appendChild(songListDetailsDiv);
                const playPauseOverlay=document.createElement("div");
                playPauseOverlay.id="playPauseOverlay";
                playPauseOverlay.innerHTML=playIcon;
                newListItem.appendChild(playPauseOverlay);
                songList.appendChild(newListItem);

                newListItem.addEventListener('mouseenter',()=>{
                    newListItem.style.backgroundColor='grey';
                    playPauseOverlay.style.opacity='1'
                    newListItem.style.cursor='pointer'
                })
                newListItem.addEventListener('mouseleave',()=>{
                    newListItem.style.backgroundColor='';
                    playPauseOverlay.style.opacity=''
                    newListItem.style.cursor=''
                })
                playPauseOverlay.addEventListener('click',()=>{
                    // localStorage.setItem('songId', newSongId);
                    // location.reload(true);
                    nextClickCounter=newClickCounter;
                    playerSongImage.src=newSongImage;
                    songName.innerHTML=newSongName;
                    songOtherDetails.innerHTML=newSongOtherDetails;
                    popUpImage.src=newSongImage;
                    async function fetchVideo(newSongId) {
                        let url = `https://yt-api.p.rapidapi.com/dl?id=${newSongId}`;
                        const options = {
                            method: 'GET',
                            headers: {
                                'x-rapidapi-key': '7a6694efccmshbf3595fdaf4c2fep1ac0e1jsn8225601fbcde',
                                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
                            }
                        };
                    
                        try {
                            const response = await fetch(url, options);
                            const result = await response.json();
                            // console.log(result);
                            return result;
                        } catch (error) {
                            console.error(error);
                            return null;
                        }
                    }
            
                    fetchVideo(newSongId)
                    .then(data => {
                        if (data) {
                            // console.log(data);
                            // console.log(newSongId);
                            videoUrl = data.formats[0].url;
                            // console.log(videoUrl);
                            videoPlayer.src=videoUrl;
                            videoPlayer.parentElement.load();
                            // playPauseBtn.style.color='red';
                        } else {
                            console.log("Failed to fetch music data.");
                        }
                    });
                })
                }

               

                nextSongBtn.addEventListener('click',()=>{
                    // playPauseBtn.style.color="white";
                    // console.log("songId before updating: "+songId);
                    playPauseBtn.innerHTML=playIcon;
                    nextClickCounter++;
                    // console.log(nextClickCounter);
                    songImage = data.nextItems[nextClickCounter].thumbnail;
                    // console.log("songImage: "+songImage);
                    songName_=data.nextItems[nextClickCounter].title;
                    // console.log("title: "+songName_);
                    songArtist=data.nextItems[nextClickCounter].author;
                    songDuration=data.nextItems[nextClickCounter].duration;
                    newSongId=data.nextItems[nextClickCounter].videoId;
                    // console.log("newSongId assigned: "+newSongId);
                    // console.log("views: "+songViews);
                    playerSongImage.src=songImage;
                    songName.innerHTML=songName_;
                    songOtherDetails.innerHTML=songArtist+" "+circleIcon+" "+songDuration;
                    popUpImage.src=songImage;
                    async function fetchVideo(newSongId) {
                        let url = `https://yt-api.p.rapidapi.com/dl?id=${newSongId}`;
                        const options = {
                            method: 'GET',
                            headers: {
                                'x-rapidapi-key': '7a6694efccmshbf3595fdaf4c2fep1ac0e1jsn8225601fbcde',
                                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
                            }
                        };
                    
                        try {
                            const response = await fetch(url, options);
                            const result = await response.json();
                            // console.log(result);
                            return result;
                        } catch (error) {
                            console.error(error);
                            return null;
                        }
                    }
            
                    fetchVideo(newSongId)
                    .then(data => {
                        if (data) {
                            // console.log(data);
                            // console.log(newSongId);
                            videoUrl = data.formats[0].url;
                            // console.log(videoUrl);
                            videoPlayer.src=videoUrl;
                            videoPlayer.parentElement.load();
                            // playPauseBtn.style.color='red';
                        } else {
                            console.log("Failed to fetch music data.");
                        }
                    });
                })

                previousSongBtn.addEventListener('click',()=>{
                    // playPauseBtn.style.color="white";
                    // console.log("songId before updating: "+songId);
                    playPauseBtn.innerHTML=playIcon;
                    nextClickCounter--;
                    // console.log(nextClickCounter);
                    songImage = data.nextItems[nextClickCounter].thumbnail;
                    // console.log("songImage: "+songImage);
                    songName_=data.nextItems[nextClickCounter].title;
                    // console.log("title: "+songName_);
                    songArtist=data.nextItems[nextClickCounter].author;
                    songDuration=data.nextItems[nextClickCounter].duration;
                    newSongId=data.nextItems[nextClickCounter].videoId;
                    // console.log("newSongId assigned: "+newSongId);
                    // console.log("views: "+songViews);
                    playerSongImage.src=songImage;
                    songName.innerHTML=songName_;
                    songOtherDetails.innerHTML=songArtist+" "+circleIcon+" "+songDuration;
                    popUpImage.src=songImage;
                    async function fetchVideo(newSongId) {
                        let url = `https://yt-api.p.rapidapi.com/dl?id=${newSongId}`;
                        const options = {
                            method: 'GET',
                            headers: {
                                'x-rapidapi-key': '7a6694efccmshbf3595fdaf4c2fep1ac0e1jsn8225601fbcde',
                                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
                            }
                        };
                    
                        try {
                            const response = await fetch(url, options);
                            const result = await response.json();
                            // console.log(result);
                            return result;
                        } catch (error) {
                            console.error(error);
                            return null;
                        }
                    }
            
                    fetchVideo(newSongId)
                    .then(data => {
                        if (data) {
                            // console.log(data);
                            // console.log(newSongId);
                            videoUrl = data.formats[0].url;
                            // console.log(videoUrl);
                            videoPlayer.src=videoUrl;
                            videoPlayer.parentElement.load();
                            // playPauseBtn.style.color='red';
                        } else {
                            console.log("Failed to fetch music data.");
                        }
                    });
                })
            } else {
                console.log("Failed to fetch music data.");
            }
        });

        fetchVideo(songId)
        .then(data => {
            if (data) {
                // console.log(data);
           
                videoUrl = data.formats[0].url;
                // console.log(videoUrl);
                videoPlayer.src=videoUrl;
                videoPlayer.parentElement.load();
                // playPauseBtn.style.color='red';

                // add new code under 

                




            } else {
                console.log("Failed to fetch music data.");
            }
        });

        playPauseBtn.addEventListener("click",togglePlayPause);
        function togglePlayPause(){
            // playPauseBtn.style.color='white';
            if(videoController.paused){
                videoController.play();
                clearInterval(sliderProgress);  
                sliderprogress = setInterval(() => {
                    var currTime = Math.floor(videoController.currentTime);  //round down to nearest integer
                    var percentageComplete = Math.floor((currTime / videoController.duration) * 100);
                    songProgress.value = percentageComplete;
                            // console.log(percentageComplete);
                    songMinutes=Math.floor(currTime/60);
                    songSeconds=Math.floor(currTime%60);
                    document.getElementById('selectedSongTime').innerHTML=songMinutes+":"+songSeconds;
                }, 1000);
                playPauseBtn.innerHTML=pauseIcon;
            }
            else{
                videoController.pause();
                playPauseBtn.innerHTML=playIcon;
            }
        }

        songProgress.addEventListener('input',()=>{
            let songTime=(((videoController.duration)*(videoController.value)) / 100);
            videoController.currentTime=songTime;
            clearInterval(sliderProgress);  
            })
            
        
        popUpBtn.addEventListener('click',()=>{
            if(popUpDiv.style.visibility==='visible'){
                popUpDiv.style.visibility='hidden';
                popUpBtn.innerHTML=popUpIcon;
            }
            else{
                popUpDiv.style.visibility='visible';
                popUpBtn.innerHTML=popDownIcon;

            }
        })
        
        volumeBtn.addEventListener('click',()=>{
            if(videoController.volume===0){
                videoController.volume=1;
                volumeBtn.innerHTML=volumeIcon;
            }
            else{
                videoController.volume=0;
                volumeBtn.innerHTML=muteIcon;
            }
        })



        
        
        

};

