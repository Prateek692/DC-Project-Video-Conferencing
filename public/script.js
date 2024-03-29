const socket = io('/'); //imported socket.io
const videoGrid=document.getElementById('video-grid');   //video grid div
const myVideo=document.createElement('video');    //Video element
myVideo.muted=true;

// var peer=new Peer(undefined, {               //Peer
//     path: '/peerjs',
//     host: '/',
//     port: '3030'
// });

var peer=new Peer(); //Made empty declaration for peer as video wasn't displaying in that case from other user

let myVideoStream;   //A promise where if video and audio is present, then video stream is successfully provided.
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream =>{
    myVideoStream=stream;
    addVideoStream(myVideo,stream);

    peer.on('call',call => {            //User receiving video call from another user
        call.answer(stream)
        const video=document.createElement('video')
        call.on('stream',userVideoStream => {
            addVideoStream(video,userVideoStream)
        })
    })

    socket.on('user-connected',(userId) => {      //COnnecting to user
        ConnecToNewUser(userId,stream)
    })
})

peer.on('open',id => {
    console.log(id);
    socket.emit('join-room',ROOM_ID,id);
})

const ConnecToNewUser = (userId,stream) =>{            //Adding video stream to connected user by calling user
    const call= peer.call(userId,stream)
    const video=document.createElement('video')
    call.on('stream',userVideoStream => {
        addVideoStream(video,userVideoStream)
    })
}

const addVideoStream = (video,stream) => { //Function to append user video to stream
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}
let text= $("input")                            //Using jquery to fetch typed message in text message box
$("html").keypress((e) => {
    if(e.which==13 &&text.val().length!=0){     //If enter is pressed and text length is not zero
        socket.emit('message',text.val());
        text.val('')
    }
})

socket.on('createMessage',message => {
    $('ul').append('<li class="message"><b>User</b><br/>',message,'</li>')
    scrollToBottom()    //Would always scroll the chatbox to bottom incase of overflow
})

const scrollToBottom = () => {
    let d=$('.main__chat__window');
    d.scrollTop(d.prop("scrollHeight"));
}

const muteUnmute = () => {
    const enabled= myVideoStream.getAudioTracks()[0].enabled;
    if(enabled){
        myVideoStream.getAudioTracks()[0].enabled=false;
        setUnmuteButton();
    }
    else{
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled=true;
    }
}

const setMuteButton = () => {
    const html = `
    <i class="fa-solid fa-microphone"></i>
    <span>Mute</span>
    `
    document.querySelector('.main__mute__button').innerHTML=html;
}
const setUnmuteButton = () => {
    const html = `
    <i class="unmute fa-solid fa-microphone-slash"></i>
    <span>Unmute</span>
    `
    document.querySelector('.main__mute__button').innerHTML=html;
}
const playStop = () => {
    let enabled=myVideoStream.getVideoTracks()[0].enabled;
    if(enabled){
        myVideoStream.getVideoTracks()[0].enabled=false;
        setPlayVideo()
    }
    else{
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled=true;
    }
}

const setStopVideo = () => {
    const html=`
    <i class="fa-solid fa-video"></i>
    <span>Stop Video</span>
    `
    document.querySelector('.main__video__button').innerHTML=html;
}
const setPlayVideo = () => {
    const html=`
    <i class="stop fa-solid fa-video-slash"></i>
    <span>Play Video</span>
    `
    document.querySelector('.main__video__button').innerHTML=html;
}