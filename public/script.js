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

let myVideoStream   //A promise where if video and audio is present, then video stream is successfully provided.
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