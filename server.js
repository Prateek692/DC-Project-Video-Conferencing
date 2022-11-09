const express=require('express');
const app=express();
const server=require('http').Server(app);       // Server which we would run
const io= require('socket.io')(server);          //Importing socket.io
const {v4:uuidv4}=require('uuid');              //Importing uuid version v4
const {ExpressPeerServer}=require('peer');      //Functionality of Peer working together with Express 
const peerServer=ExpressPeerServer(server,{
    debug:true
});
app.set('view engine','ejs');                   //App's view engine set to ejs
app.use(express.static('public'));              //To serve static files to ejs

app.use('/peerjs',peerServer);


app.get('/', (req,res)=>{                       //Root URL where app is kept
    res.redirect(`/${uuidv4()}`);               //This is main route. When server runs, uuid is auto generated and redirect the app to it. 
}
)  

app.get('/:room',(req,res)=>{                   // ${uuidv4()} is accepted here as uuidv4()=room and is redirected here.
    res.render('room',{roomId:req.params.room});//2nd parameter passes RoomId to room.ejs
})

io.on('connection',socket => {                  //Socket action when the user joins the room
    socket.on('join-room',(roomId,userId)=>{
        // console.log("joined the room");
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',userId); //Acknowledges that user has successfully joined the room
        socket.on('message',message => {
            io.to(roomId).emit('createMessage',message)
        })
    
    })
})

server.listen(process.env.PORT||3030); //Localhost port would be 3030