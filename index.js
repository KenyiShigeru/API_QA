var express = require('express');
var cors = require('cors');
const acabadosRoutes = require('./routes/acabadosRoutes');





var {UnidadModel, Unidad} = require('./Models/Unidad');
var {ProductoModel, Producto} = require('./Models/Producto');
var {ClienteModel} = require('./Models/Cliente');
var {Clasificacion, ClasificacionModel} = require('./Models/Clasificacion');
var {SubclasificacionModel} = require('./Models/SubClasificacion');
var {MaterialModel} = require('./Models/Material');
var {Material_Produccion, Material_ProduccionModel} = require('./Models/Material_Produccion');
var {CotizacionModel} = require('./Models/Cotizacion');
var {EstatusCobranzaModel} =  require('./Models/EstatusCobranza');
var {FormaPagoModel} = require('./Models/FormaPago');
var {TipoPagoModel} = require('./Models/TipoPago');
var {TipoTrabajoModel} = require('./Models/TipoTrabajo');
var {TipoVentaModel} = require('./Models/TipoVenta');
var {ProcesoModel} = require('./Models/Proceso');
var {TipoClienteModel} = require('./Models/TipoCliente');
var {EstadoClienteModel} = require('./Models/EstadoCliente');



const productoModel = new ProductoModel();
const procesoModel = new ProcesoModel();
const unidadModel = new UnidadModel();
const clasificacionModel = new ClasificacionModel();
const clienteModel = new ClienteModel();
const subclasificacionModel = new SubclasificacionModel();
const materialModel = new MaterialModel();
const material_ProduccionModel = new Material_ProduccionModel();
const cotizacionModel = new CotizacionModel();
const estatusModel = new EstatusCobranzaModel();
const formaPagoModel = new FormaPagoModel();
const tipoPagoModel = new TipoPagoModel();
const tipoTrabajoModel = new TipoTrabajoModel();
const tipoVentaModel = new TipoVentaModel();
const tipoClienteModel = new TipoClienteModel();
const estadoClienteModel = new EstadoClienteModel();

/*const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
    }*/
var app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
//DE AQUI PARA abajo es para las rutas
app.get('/',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));

app.use("/acabados",acabadosRoutes);

app.use('/clasificaciones', );
//Zona de las clasificaciones

//Zona de los clientes


//Zona de las cotizaciones

//Zona de los estatus de cobranza

//Zona de los estatus del cliente


//Zona de las formas de pago

//Zona de los materiales de produccion


//Zona de los materiales


//Zona de los procesos

//Zona de los productos


//Zona de las subclasificaciones


//Zona de los tipos de cliente


//Zona de los tipos de pago

        
//Zona de los tipos de trabajo


//Zona de los tipos de venta

//Zona de las unidades


app.listen("3000",()=>console.log("El servidor esta corriendo en el puerto 3000"));