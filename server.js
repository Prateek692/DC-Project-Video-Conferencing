const express=require('express');
const app=express();
const server=require('http').Server(app);       // Server which we would run
const {v4:uuidv4}=require('uuid');              //Importing uuid version v4
app.set('view engine','ejs');                   //App's view engine set to ejs
app.use(express.static('public'));              //To serve static files to ejs




app.get('/', (req,res)=>{                       //Root URL where app is kept
    res.redirect(`/${uuidv4()}`);               //This is main route. When server runs, uuid is auto generated and redirect the app to it. 
}
)  

app.get('/:room',(req,res)=>{                   // ${uuidv4()} is accepted here as uuidv4()=room and is redirected here.
    res.render('room',{roomId:req.params.room});//2nd parameter passes RoomId to room.ejs
})



server.listen(3030); //Localhost port would be 3030