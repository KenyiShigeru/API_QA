const express = require('express');
const routes = express.Router();
var {CotizacionModel} = require('../Models/Cotizacion');
var {AcabCotizacionModel} = require('../Models/Acab_Cotizacion');
var {ProductoModel} = require('../Models/Producto');
const cotizacionModel = new CotizacionModel();
const acabCotizacionModel = new AcabCotizacionModel();
const producto = new ProductoModel();
routes.get('/', async (req, res) => {
    try {
        const cotizaciones = await cotizacionModel.obtenerCotizaciones();
        res.send(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las cotizaciones' });
    }
});

routes.get('/:id', async (req, res) => {
    try {
        const cotizaciones = await cotizacionModel.obtenerCotizacionesId(req.params.id);
        res.send(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las cotizaciones' });
    }
});

routes.get('/acabado/:id', async (req, res) => {
    try {
        const cotizacion = await acabCotizacionModel.obtenerAcabCotizacion(req.params.id);
        res.send(cotizacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la cotización' });
    }
});

routes.post('/', async (req, res) => {
    try {
         const 
         {
            idCliente,
            idtpVenta,
            subtotal,
            iva,
            total,
            fechavigencia,
            facturar,
            personal,
            observaciones,
            correo_del_personal
        } = req.body;
        const resultado = await cotizacionModel.insertarCotizacion(
            [
                idCliente,
                idtpVenta,
                subtotal,
                iva,
                total,
                fechavigencia,
                facturar,
                personal,
                observaciones,
                correo_del_personal                                
            ]
        );
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la cotización' });
    }
});


/*La ruta de producto es para identificar los productos que se van a agregar a la cotizacion
y el id es el id de la cotizacion*/
routes.post('/producto/:id', async (req, res) => {
    try {
         const 
         {
            idProducto,
            cantidad,
            base,
            altura,
            precioUnitario,
            importe
        } = req.body;
        const resultado = await producto.agregarProductoCotizacion(
            [
                req.params.id,
                idProducto,
                cantidad,
                base, 
                altura,
                precioUnitario,
                importe                                 
            ]
        );
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la cotización' });
    }
});



routes.put('/:id', async (req, res) => {
    try {
        const 
         {
            idCliente,
            idtpVenta,
            subtotal,
            iva,
            total,
            fechavigencia,
            facturar,
            personal,
            observaciones,
            fechaemision,
            correo_del_personal
        } = req.body;
        const resultado = await cotizacionModel.modificarCotizacion([
            req.params.id,
            idCliente,
            idtpVenta,
            subtotal,
            iva,
            total,
            fechavigencia,
            facturar,
            personal,
            observaciones,
            fechaemision,
            correo_del_personal                              
        ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cotización' });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await cotizacionModel.borrarCotizacion(req.params.id);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cotización' });
    }
});

routes.post('/acabados/:id', 
    async (req, res) => 
        {
            try {
                const 
                {
                    idProducto_cot,
                    idAcabado,
                } = req.body;
                const resultado = await acabCotizacionModel.agregarAcabCotizacion([
                    idProducto_cot,
                    idAcabado
                ]);
                res.status(201).json({message:'Agregado con exito'});
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al insertar la cotización' });
            }
        }
);

module.exports = routes;