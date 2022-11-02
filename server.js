const express=require('express');
const app=express();
// Server which we would run
const server=require('http').Server(app);

app.get('/', (req,res)=>{
    res.status(200).send("Hello World");
}
)  //Root URL where app is kept




server.listen(3030); //Localhost port would be 3030