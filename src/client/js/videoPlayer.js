const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5;
video.volume = Number(volumeValue);

// handler
const handlePlayClick = (e) => {
    if(video.paused){ // paused <- html의 video태그의 기본함수
        // playBtn.innerText = "Pause";
        video.play();
    }else{
        // playBtn.innerText = "Play";
        video.pause();
    }
    playBtn.innerText =  video.paused ? "Play" : "Pause";
}
const handleMute = (event) => { 
    if(video.muted){
        video.muted = false;
    } else{
        video.muted = true;
    }
    // console.log(vieo.muted);
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
}
const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");
const handleVolumeChange = (event) => {
    const {
        target:{
            value
        }
    } = event;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
    if(Number(volumeValue) === 0){
        muteBtn.innerText = "Unmute";
        video.muted = true;
    }else{
        video.muted = false;
        muteBtn.innerText = "Mute";
    }

    
}
const handleLoadedMetadata = () => {
    totalTime.innerText = Math.floor(video.duration);
}
const handleTimeUpdate = () =>{
    currentTime.innerText = Math.floor(video.currentTime);
    // console.log(video.currentTime);
}
// EventListener
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange); // input 태그의 value가 바뀔 때(즉, 실시간 반영)
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);