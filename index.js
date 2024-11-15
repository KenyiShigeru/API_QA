var express = require('express');
var cors = require('cors');
var morgan = require('morgan');

const acabadosRoutes = require('./routes/acabadosRoutes');
const clasificacionesRoutes = require('./routes/clasificacionesRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const cotizacionesRoutes = require('./routes/cotizacionesRoutes');
const estatusCobranzaRoutes = require('./routes/estatusRoutes');
const formaspagoRoutes = require('./routes/formpagoRoutes');
const materialesRoutes = require('./routes/materialesRoutes');
const ordenTrabajoRoutes = require('./routes/ordenTrabajoRoutes');
const procesosRoutes = require('./routes/procesosRoute');
const productosRoutes = require('./routes/productosRoute');
const subclasificacionesRoutes = require('./routes/subclasificacionRoutes');
const tipoClienteRoutes = require('./routes/tipoclienteRoutes');
const tipoPagoRoutes = require('./routes/tipoPagoRoutes');
const tipoVentasRoutes = require('./routes/tipoventaRoutes');
const unidadesRoutes = require('./routes/unidadRoute');

var app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(morgan('dev'));

app.use(express.json());
//DE AQUI PARA abajo es para las rutas
app.get('/api',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));

//Zona de los acabados
app.use('/api/acabados',acabadosRoutes);

//Zona de las clasificaciones
app.use('/api/clasificaciones', clasificacionesRoutes);

//Zona de los clientes
app.use('/api/clientes',clientesRoutes);

//Zona de las cotizaciones
app.use('/api/cotizaciones',cotizacionesRoutes);

//Zona de los estatus de cobranza
app.use('/api/estatuscobranza',estatusCobranzaRoutes);

//Zona de las formas de pago
app.use('/api/formaspago',formaspagoRoutes);

//Zona de los materiales
app.use('/api/materiales',materialesRoutes);

//Zona de las ordene de trabajo
app.use('/api/ordentrabajo',ordenTrabajoRoutes);

//Zona de los procesos
app.use('/api/procesos',procesosRoutes);

//Zona de los productos
app.use('/api/producto',productosRoutes);

//Zona de las subclasificaciones
app.use('/api/subclasificaciones',subclasificacionesRoutes);

//Zona de los tipos de cliente
app.use('/api/tipocliente',tipoClienteRoutes);

//Zona de los tipos de pago
app.use('/api/tipopago',tipoPagoRoutes);

//Zona de los tipos de venta
app.use('/api/tipoventa',tipoVentasRoutes);

//Zona de las unidades
app.use('/api/unidades',unidadesRoutes);

app.listen("3000",()=>console.log("El servidor esta corriendo en el puerto 3000"));