var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var conexion = require('./.env/conexion');
var {ProductoModel} = require('./Models/producto');
var {UnidadModel} = require('./Models/Unidad');
const { error } = require('console');



const productoModel = new ProductoModel();
const unidadModel = new UnidadModel();
/*const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
    }*/
var app = express();

app.get('/',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));

app.get('/unidad',async (req,res)=>{
    try{
        const unidades = await unidadModel.obtenerUnidades();
        res.header("Access-Control-Allow-Origin", "*");
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/unidad/:id',async (req,res)=>{
    try{
        const unidades = await unidadModel.obtenerUnidadesPorId([req.params.id]);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/productos', async (req, res) => {
    try {
        const productos = await productoModel.obtenerProductos();
        res.header("Access-Control-Allow-Origin", "*");
        res.send(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});



app.listen("3000",()=>console.log("El servidor esta corriendo en el puerto 3000"));

/*
Clases a realizar

Clasificacion
Subclasificacion
Material
Unidad
MaterialProduccion
TipoPago
FormaPago
EstatusCobranza
TipoCliente
Proceso
TipoTrabajo
TipoVenta
Acabados
Cliente
EstadoCliente
Producto
Cotizacion
OrdenTrabajo
TrabCotizacion
AcabCotizacion
ProdCotizacion
ProcCotizacion
PagoOrdenTrabajo


*/