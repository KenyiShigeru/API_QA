var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var conexion = require('./.env/conexion');

/*const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
    }*/
var app = express();

app.get('/',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));

app.get

app.listen("3000",()=>console.log("El servidor esta corriendo en el puerto 3000"));