const videoGrid=document.getElementById('video-grid');   //video grid div
const myVideo=document.createElement('video');    //Video element
myVideo.muted=true;


let myVideoStream   //A promise where if video and audio is present, then video stream is successfully provided.
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream =>{
    myVideoStream=stream;
    addVideoStream(myVideo,stream);
})


const addVideoStream = (video,stream) => { //Function to append user video to stream
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}