const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = Number(volumeValue);

// handler
const handlePlayClick = () => {
    if(video.paused){ // paused <- html의 video태그의 기본함수
        // playBtn.innerText = "Pause";
        video.play();
    }else{
        // playBtn.innerText = "Play";
        video.pause();
    }
    // playBtn.innerText =  video.paused ? "Play" : "Pause";
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};
const handleMute = (event) => { 
    if(video.muted){
        video.muted = false;
    } else{
        video.muted = true;
    }
    // muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
};
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
};
const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(14, 19);
const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeLine.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
    const {
        target: {value},
    } = event;
    video.currentTime = value;
};
const handleFullScreen = () => {
    const fullScreen = document.fullscreenElement;
    if(fullScreen){
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    }else{
        // video FullScreen
        // video.requestFullscreen();
        // 버튼들까지 FullScreen에 포함
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
};
const hideControls = () => videoControls.classList.remove("showing");
const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout); // setTimeout 함수의 동작을 취소한다.
        controlsTimeout = null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};
const handleSpaceDown = (event) => {
    console.log("keydown Event", event);
    const {keyCode} = event;
    if(keyCode === 32){
        if(video.paused){
            video.play();
        }else{
            video.pause();
        }
        playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
    }
};
const handleEnded = () => {
    // fetch()를 이용하여 api에 요청 보내기
    const {videoid} = videoContainer.dataset;
    fetch(`/api/videos/${videoid}/view`,{
        method:"POST",
    }); 
};
// EventListener
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange); // input 태그의 value가 바뀔 때(즉, 실시간 반영)
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeLine.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("click", handlePlayClick);
window.addEventListener("keydown", handleSpaceDown);