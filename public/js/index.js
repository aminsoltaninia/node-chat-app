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
   var message = $('[name=message]');
   //console.log('GGGGGGGGGGGGGGGG');
   socket.emit('createmessageUSR',{
       from:'User',
       text: message.val()//meghdare input ro mirize dakhele text 
   },function(){
       message.val('');//khali mikone value message ro 
  })//baraye pak kardane text boxe chat
});


var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your Browser');
    }
    locationButton.attr('disabled','disabled').text('Sending Location ...');//baes mishe vaghti send mikonim gereftane location ro dockmash gheire faal she
    navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position);
        locationButton.removeAttr('disabled').text('Send Location') ;
        socket.emit('createlocationMessage',{
            latitude: position.coords.latitude,//az adrese dakhele console ke mide migirim inaro
            longitude:position.coords.longitude
        })
       
    },function(){
        
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send Location') ;
    });
})
//for newlocationmesage
socket.on('newlocationMesage',function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');

    li.text(`${message.from} : `);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
})