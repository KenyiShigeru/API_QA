const express = require('express');
const routes = express.Router();
var {CotizacionModel} = require('../Models/Cotizacion');
const cotizacionModel = new CotizacionModel();
routes.get('/', async (req, res) => {
    try {
        const cotizaciones = await cotizacionModel.obtenerCotizaciones();
        res.send(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las cotizaciones' });
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
            estatus,
            facturar,
            personal,
            observaciones
        } = req.body;
        const resultado = await cotizacionModel.insertarCotizacion([
            idCliente,
            idtpVenta,
            subtotal,
            iva,
            total,
            fechavigencia,
            estatus,
            facturar,
            personal,
            observaciones,
            0
        ]);
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
            estatus,
            facturar,
            personal,
            observaciones
        } = req.body;
        const resultado = await cotizacionModel.modificarCotizacion([
            req.params.id,
            idCliente,
            idtpVenta,
            subtotal,
            iva,
            total,
            fechavigencia,
            estatus,
            facturar,
            personal,
            observaciones,
            1
    ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cotización' });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await cotizacionModel.borrarCotizacion([
            req.params.id,
            0
    ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cotización' });
    }
});

module.exports = routes;