const path = require('path');
const express = require('express');

const socketIO = require('socket.io');
const http = require('http');

const publickpath = path.join(__dirname,'../public');//server.js ro be file dakhele public miresonim(folder static)
const port = process.env.PORT || 3000;


var app = express();
/* active socket io in server*/
var server=http.createServer(app);//ba estefade az in dastor ye server baraye app ijad mikonim
//inja servere dakheli rah andazi kardim baraye app
var io = socketIO(server);// active socket io on my server

io.on('connection',(socket)=>{
    console.log('new user connection');



    socket.on('disconnect',()=>{
        console.log("User was disconnected");
    })
})
app.use(express.static(publickpath));// masire foldere static ro be express midim
console.log(publickpath);//masire folder public ro mide


server.listen(port,()=>{
    console.log(`server in up on ${port}`);
})
