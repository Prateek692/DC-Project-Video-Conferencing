const express=require('express');
const app=express();
// Server which we would run
const server=require('http').Server(app);
app.set('view engine','ejs');                   //App's view engine set to ejs
app.get('/', (req,res)=>{
    res.render('room');
}
)  //Root URL where app is kept


server.listen(3030); //Localhost port would be 3030