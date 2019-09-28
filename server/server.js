const path = require('path');
const express = require('express');
const publickpath = path.join(__dirname,'../public');//server.js ro be file dakhele public miresonim(folder static)
const port = process.env.PORT || 3000;


var app = express();

app.use(express.static(publickpath));// masire foldere static ro be express midim
console.log(publickpath);//masire folder public ro mide


app.listen(port,()=>{
    console.log(`server in up on ${port}`);
})
