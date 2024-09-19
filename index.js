var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sitec2'
    }
);

/*const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
    }*/
var app = express();

app.get('/',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));

conexion.connect((error)=>error?console.log(error):console.log("Conexion correcta"));

app.listen("3000",()=>console.log("El servidor esta corriendo en el puerto 3000"));