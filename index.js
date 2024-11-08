var express = require('express');
var cors = require('cors');
const acabadosRoutes = require('./routes/acabadosRoutes');
const clasificacionesRoutes = require('./routes/clasificacionesRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const cotizacionesRoutes = require('./routes/cotizacionesRoutes');
const estatusClienteRoutes = require('./routes/estatclienRoutes');
const estatusCobranzaRoutes = require('./routes/estatusRoutes');
const formaspagoRoutes = require('./routes/formpagoRoutes');
const materialesRoutes = require('./routes/materialesRoutes');
const materialProduccionRoutes = require('./routes/matprodRoutes');
const procesosRoutes = require('./routes/procesosRoute');
const productosRoutes = require('./routes/productosRoute');
const subclasificacionesRoutes = require('./routes/subclasificacionRoutes');
const tipoClienteRoutes = require('./routes/tipoclienteRoutes');
const tipoPagoRoutes = require('./routes/tipoPagoRoutes');
const tipoTrabajosRoutes = require('./routes/tipotrabajoRoutes');
const tipoVentasRoutes = require('./routes/tipoventaRoutes');
const unidadesRoutes = require('./routes/unidadRoute');

var app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.json());
//DE AQUI PARA abajo es para las rutas
app.get('/',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));

//Zona de los acabados
app.use('/acabados',acabadosRoutes);

//Zona de las clasificaciones
app.use('/clasificaciones', clasificacionesRoutes);

//Zona de los clientes
app.use('/clientes',clientesRoutes);

//Zona de las cotizaciones
app.use('/cotizaciones',cotizacionesRoutes);

//Zona de los estatus de cobranza
app.use('/estatuscobranza',estatusCobranzaRoutes);

//Zona de los estatus del cliente
app.use('/estatuscliente',estatusClienteRoutes);

//Zona de las formas de pago
app.use('/formaspago',formaspagoRoutes);

//Zona de los materiales de produccion
app.use('/materialesproduccion',materialProduccionRoutes);

//Zona de los materiales
app.use('/materiales',materialesRoutes);

//Zona de los procesos
app.use('/procesos',procesosRoutes);

//Zona de los productos
app.use('/producto',productosRoutes);

//Zona de las subclasificaciones
app.use('/subclasificaciones',subclasificacionesRoutes);

//Zona de los tipos de cliente
app.use('/tipocliente',tipoClienteRoutes);

//Zona de los tipos de pago
app.use('/tipopago',tipoPagoRoutes);
        
//Zona de los tipos de trabajo
app.use('/tipotrabajo',tipoTrabajosRoutes);

//Zona de los tipos de venta
app.use('/tipoventa',tipoVentasRoutes);

//Zona de las unidades
app.use('/unidades',unidadesRoutes);

app.listen("3000",()=>console.log("El servidor esta corriendo en el puerto 3000"));