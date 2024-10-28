var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var conexion = require('./.env/conexion');
var {UnidadModel, Unidad} = require('./Models/Unidad');
var {ProductoModel, Producto} = require('./Models/Producto');
var {Cliente, ClienteModel} = require('./Models/Cliente');
var {Clasificacion, ClasificacionModel} = require('./Models/Clasificacion');
const { error } = require('console');



const productoModel = new ProductoModel();
const unidadModel = new UnidadModel();
const clasificacionModel = new ClasificacionModel();
const clienteModel = new ClienteModel();
/*const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
    }*/
var app = express();
app.use(cors({origin:'*'}));
//DE AQUI PARA abajo es para las rutas
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

/*app.get('/unidad/:id',async (req,res)=>{
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
});*/

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

app.post('/unidad/:nom_unidad', async (req, res)=>{
    try{
        const resultado = await unidadModel.insertarUnidad(new Unidad(req.params.nom_unidad));
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({message:'Agregado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al ingresar la unidad'});
    }
})

//Clasificaciones
app.get('/clasificaciones',async (req,res)=>{
    try{
        const unidades = await clasificacionModel.obtenerClasificaciones();    
        res.header("Access-Control-Allow-Origin", "*");
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.put('/clasificaciones/:id/:nom_clasificacion/:des_clasificacion', async (req, res) => {
    try {
        const resultado = await clasificacionModel.modificarClasificacion([req.params.id, req.params.nom_clasificacion, req.params.des_clasificacion]);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});


//Zona de los clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await clienteModel.obtenerClientes();
        res.header("Access-Control-Allow-Origin", "*");
        res.send(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

app.post("/clientes/:nombre/:apellidopaterno/:apellidomaterno/:rutaconstancia/:rfc/:nomnegocio/:domicilio/:telWP/:telFJ/:correo/:tpCliente", async (req, res) => {
    try {
        console.log(req.params);
        const resultado = await clienteModel.insertarCliente(req.params);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el cliente' });
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