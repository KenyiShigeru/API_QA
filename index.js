var express = require('express');
var cors = require('cors');
var {UnidadModel, Unidad} = require('./Models/Unidad');
var {ProductoModel, Producto} = require('./Models/Producto');
var {Cliente, ClienteModel} = require('./Models/Cliente');
var {Clasificacion, ClasificacionModel} = require('./Models/Clasificacion');
var {SubclasificacionModel} = require('./Models/SubClasificacion');
var {MaterialModel} = require('./Models/Material');
var {Material_Produccion, Material_ProduccionModel} = require('./Models/Material_Produccion');


const productoModel = new ProductoModel();
const unidadModel = new UnidadModel();
const clasificacionModel = new ClasificacionModel();
const clienteModel = new ClienteModel();
const subclasificacionModel = new SubclasificacionModel();
const materialModel = new MaterialModel();
const material_ProduccionModel = new Material_ProduccionModel();
/*const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
    }*/
var app = express();
app.use(cors({origin:'*'}));
//DE AQUI PARA abajo es para las rutas
app.get('/',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));


//Zona de las unidades
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


app.post('/unidad/:nom_unidad/:des_unidad', async (req, res)=>{
    try{
        const resultado = await unidadModel.insertarUnidad(
            [
                req.params.nom_unidad, 
                req.params.des_unidad
            ]
        );
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({message:'Agregado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al ingresar la unidad'});
    }
})

app.put('/unidad/:id/:nom_unidad/:des_unidad', async (req, res) => {
    try {
        const resultado = await unidadModel.modificarUnidad(
            [
                req.params.id ||null, 
                req.params.nom_unidad || null, 
                req.params.des_unidad || null
            ]);
        res.header("Access-Control-Allow-Origin", "*");
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la clasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

//Zona de los materiales para produccion
app.get('/matprod',async (req,res)=>{
    try{
        const materiales = await material_ProduccionModel.obtenerMaterial_Produccion();
        res.header("Access-Control-Allow-Origin", "*");
        res.send(materiales);
    
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

app.post('/matprod/:id_material/:id_unidad/:medida_material/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.insertarMaterial_Produccion(
            [
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.medida_material || null, 
                req.params.proveedor || null
            ]);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el material' });
    }
});

app.put('/matprod/:id/:id_material/:id_unidad/:medida_material/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.modificarMaterial_Produccion(
            [
                req.params.id ||null,
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.medida_material || null, 
                req.params.proveedor || null
            ]);
        res.header("Access-Control-Allow-Origin", "*");
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
});



//Zona de los productos
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

app.post("/clientes/:nombre/:apellidopaterno/:apellidomaterno/:rutaconstancia/:rfc/:nomnegocio/:domicilio/:telWP/:telFJ/:correo/:tpCliente", 
    async (req, res) => {
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

app.put("/clientes/:id/:nombre/:apellidopaterno/:apellidomaterno/:rutaconstancia/:rfc/:nomnegocio/:domicilio/:telWP/:telFJ/:correo/:tpCliente", 
    async (req, res) => {
    try {
        const resultado = await clienteModel.modificarCliente(req.params);
        res.header("Access-Control-Allow-Origin", "*");
        //La respuesta de la base de datos es un array con un objeto que tiene un mensaje por eso se toma el primer elemento
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el cliente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

//Zona de las subclasificaciones
app.get('/subclasificaciones',async (req,res)=>{
    try{
        const subclasificaciones = await subclasificacionModel.obtenerSubclasificaciones();
        res.header("Access-Control-Allow-Origin", "*");
        res.send(subclasificaciones);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/subclasificaciones/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.insertarSubclasificacion(
            [
                req.params.nom_subclasificacion, 
                req.params.des_subclasificacion
            ]);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

app.put('/subclasificaciones/:id/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                req.params.id ||null, 
                req.params.nom_subclasificacion || null, 
                req.params.des_subclasificacion || null
            ]);
        res.header("Access-Control-Allow-Origin", "*");
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});

//Zona de los materiales
app.get('/materiales',async (req,res)=>{
    try{
        const unidades = await materialModel.obtenerMateriales();
        res.header("Access-Control-Allow-Origin", "*");
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/materiales/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.insertarMaterial(
            [
                req.params.nom_material, 
                req.params.des_material
            ]);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

app.put('/materiales/:id/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.modificarMaterial(
            [
                req.params.id ||null, 
                req.params.nom_material || null, 
                req.params.des_material || null
            ]);
        res.header("Access-Control-Allow-Origin", "*");
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
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