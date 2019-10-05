const path = require('path');
const express = require('express');
var {generatemessage,generateLocationmessage}=require('./utils/message');
//var {generateLocationmessage}=require('./utils/message');
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

    //  //ferestadane ye email be carbar az serever
    //  socket.emit('NewEmail',{
    //     form:"aminsoltani@gmail.com",
    //     text:"hi email from server",
    //     createAt:123
    // })
    // socket.emit('createmesseageSRV',{
    //     form:"leilaorooji",
    //     text:"hi email from server",
    //     createAt:123
    // })
    // // daryafte email az client
    // socket.on('creatEmile',(email)=>{
    //    console.log('Creat email from user: ',email);
    // })
    socket.emit('createmesseageSRV',generatemessage('admin','welcome to the chat app'));

    socket.broadcast.emit('createmesseageSRV',generatemessage('admin','new user joined'));

    socket.on('createmessageUSR',(message,callback)=>{
        console.log('Createmessage from client',message);

        io.emit('createmesseageSRV',generatemessage(message.from,message.text)); 
    //    socket.broadcast.emit('createmesseageSRV',{// data ersal mikonim
    //             from: message.from,// message ro az client migire
    //             text: message.text,
    //             createAt: new Date().getTime()        
    //             // in baes mishe ke client vaghti vared mishe vorode khodesho nabine vali aghiye bebinan
       
       
    //         })
        callback();//bad az ajraye messege mire arg dovom ke calback hast  ke baraye pak kardane matne dakhele text box hast ro ejra mikone
    })
    socket.on('createlocationMessage',(coords)=>{
       io.emit('newlocationMesage',generateLocationmessage('admin',coords.latitude,coords.longitude));
    })
    socket.on('disconnect',()=>{
        console.log("User was disconnected");
    })
 

})
app.use(express.static(publickpath));// masire foldere static ro be express midim
console.log(publickpath);//masire folder public ro mide


server.listen(port,()=>{
    console.log(`server in up on ${port}`);
})
