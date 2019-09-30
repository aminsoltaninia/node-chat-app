// samte client be jaye ()=>{} az function(){} estefade mikonim chon ecmascript 5 hast va hameye gooshia mishnasanesh


var socket = io();
socket.on('connect',function(){
    console.log("connected to the server");
    // // az samte cliente hala ye email mifrestim baraye server
    // socket.emit('creatEmile',{
    //      to:"info@roxo.ir",
    //      text:"hey its from client"
    // })
    socket.emit('createmessageUSR',{
         from:"aminsoltani",
         text:"hey its from client"
    })
})

socket.on('disconnect',function(){
    console.log('disconnect from server');
})
// socket.on('NewEmail',function(email){
//     console.log('New Email from server : ',email);
// })//baraye daryafte emil az server
socket.on('createmesseageSRV',function(message){
    console.log('Createmessage from Server',message);
})