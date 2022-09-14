const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainerBtn = document.getElementById("videoContainer")

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
const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(11, 19);
const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeLine.max = Math.floor(video.duration);
}
const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
}
const handleTimelineChange = (event) => {
    const {
        target: {value},
    } = event;
    video.currentTime = value;
}
const handleFullScreen = () => {
    const fullScreen = document.fullscreenElement;
    if(fullScreen){
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen";
    }else{
        // video FullScreen
        // video.requestFullscreen();
        // 버튼들까지 FullScreen에 포함
        videoContainerBtn.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    }
}
// EventListener
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange); // input 태그의 value가 바뀔 때(즉, 실시간 반영)
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);