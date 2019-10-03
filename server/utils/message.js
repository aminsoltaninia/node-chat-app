

var generatemessage = (from,text)=>{
   return {

    from,
    text,
    createAt:new Date().getTime()
 }
}
module.exports={generatemessage}