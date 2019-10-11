const path = require('path');
const express = require('express');
var {generatemessage,generateLocationmessage}=require('./utils/message');
//var {generateLocationmessage}=require('./utils/message');
const socketIO = require('socket.io');
const http = require('http');

const publickpath = path.join(__dirname,'../public');//server.js ro be file dakhele public miresonim(folder static)
const port = process.env.PORT || 3000;
var {isRealString} = require('./utils/validation');
const {Users}= require('./utils/user')
var users = new Users();// az class ye class migirim 
var app = express();
/* active socket io in server*/
var server=http.createServer(app);//ba estefade az in dastor ye server baraye app ijad mikonim
//inja servere dakheli rah andazi kardim baraye app
var io = socketIO(server);// active socket io on my server

io.on('connection',(socket)=>{
    console.log(`new user connection`);

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
    

    socket.on('createmessageUSR',(message,callback)=>{
        console.log('Createmessage from client',message);
        var user = users.getUser(socket.id);
        // baraye inke toye class ham betonan payame hamo bebinan faghat
        if (user && isRealString(message.text)){
               io.to(user.room).emit('createmesseageSRV',generatemessage(message.from,message.text)); 
        }
        callback();//bad az ajraye messege mire arg dovom ke calback hast  ke baraye pak kardane matne dakhele text box hast ro ejra mikone
    })
    socket.on('createlocationMessage',(coords)=>{
        var user = users.getUser(socket.id);
        if(user){
           io.to(user.room).emit('newlocationMesage',generateLocationmessage(user.name,coords.latitude,coords.longitude));  
        }
       
    })
    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        console.log(user,' has left ');
        if(user){// age user disconnect karde bood
           io.to(user.room).emit('updateUserList',users.getUserList(user.room));
           io.to(user.room).emit('createmesseageSRV',generatemessage('admin',`${user.name} has leave`));
        }
    })
    socket.on('join',(params,callback)=>{//inja user join mishe
         if (!isRealString(params.name) || !isRealString(params.room)){
             callback('Name and room are required');
         }
         //baraye sockete monhaser be fard
         // io.to(room a).emit()
         // socket.borcast.to('rom a').emit()
         socket.join(params.room);
         // bayad faat toye ye otagh bashe
         users.removeUser(socket.id);// user ro az tamame room haii ke toosh boode remove mikonim
         users.addUser(socket.id,params.name,params.room);// user ro be otaghe jadidesh join mikonim

         io.to(params.room).emit('updateUserList', users.getUserList(params.room));//name userhaye dakhele ye room ro miibare be masiri ke emit kardim
         console.log('////////');
         socket.emit('createmesseageSRV',generatemessage('admin','welcome to the chat app'));

         socket.broadcast.to(params.room).emit('createmesseageSRV',generatemessage('admin',`${params.name} has joined`));
         callback();
    })

})
app.use(express.static(publickpath));// masire foldere static ro be express midim
console.log(publickpath);//masire folder public ro mide


server.listen(port,()=>{
    console.log(`server in up on ${port}`);
})
