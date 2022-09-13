const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

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
const handleMute = (error) => { 
    if(video.muted){
        video.muted = false;
    } else{
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5;
}
const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");
// EventListener
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);