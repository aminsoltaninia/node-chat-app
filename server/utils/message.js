
/*

var a = moment(); zamane hale hazer : now 
var b = moment.utc();// ekhtelfe ba saate jahani
a.format();  // 2013-02-04T10:35:24-08:00
b.format();  // 2013-02-04T18:35:24+00:00
a.valueOf(); // 1360002924000  // timestamp tarikhe alan ro mide === new Date().getTime()
b.valueOf(); // 1360002924000

*/

var moment = require('moment');

var generatemessage = (from,text)=>{
   return {

    from,
    text,
    createAt: moment.valueOf()
 }
}
var generateLocationmessage= (from,latitude,longitude)=>{
   console.log("generatelocation")
   return {

    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt: moment.valueOf()
 }
}
module.exports={
   generatemessage,
   generateLocationmessage
}