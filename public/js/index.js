// samte client be jaye ()=>{} az function(){} estefade mikonim chon ecmascript 5 hast va hameye gooshia mishnasanesh


var socket = io();
socket.on('connect',function(){
    console.log("connected to the server");
    // // az samte cliente hala ye email mifrestim baraye server
    // socket.emit('creatEmile',{
    //      to:"info@roxo.ir",
    //      text:"hey its from client"
    // })
    // socket.emit('createmessageUSR',{
    //      from:"aminsoltani",
    //      text:"hey its from client"
    // })
})

socket.on('disconnect',function(){
    console.log('disconnect from server');
})
// socket.on('NewEmail',function(email){
//     console.log('New Email from server : ',email);
// })//baraye daryafte emil az server
socket.on('createmesseageSRV',function(message){
    console.log('Createmessage from Server',message);

    var li = $('<li></li>');// ye tage li ro migire va mirize dakhele li
    li.text(`${message.from}:${message.text}`);//"admin:welcome to the chat app"// bara bare aval ino mide be text marbot be li
    //console.log(li.text(`${message.from}:${message.text}`));
    $('#messages').append(li);
})

$('#message-form').on('submit',function(e){
   e.preventDefault();//jologiri az refresh safe

   //console.log('GGGGGGGGGGGGGGGG');
   socket.emit('createmessageUSR',{
       from:'User',
       text: $('[name=message]').val()//meghdare input ro mirize dakhele text 
   })
})