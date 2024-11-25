const express = require('express');
const routes = express.Router();
var {FormaPagoModel} = require('../Models/FormaPago');
const formaPagoModel = new FormaPagoModel();
routes.get('/', async (req, res) => {
    try {
        const fpago = await formaPagoModel.obtenerFormasPagos();
        res.send(fpago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las formas de pago' });
    }
});

routes.get('/:id', async (req, res) => {
    try {
        const fpago = await formaPagoModel.obtenerFormasPagosId(req.params.id);
        res.send(fpago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las formas de pago' });
    }
});

routes.post('/', async (req, res) => {
    try {
        const { nom_fpago, des_fpago } = req.body;
        const resultado = await formaPagoModel.insertarFormaPago(
            [
                nom_fpago, 
                des_fpago
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la forma de pago' });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const { nom_fpago, des_fpago } = req.body;
        const resultado = await formaPagoModel.modificarForma_Pago(
            [
                req.params.id ||null, 
                nom_fpago || null, 
                des_fpago || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la forma de pago' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la forma de pago' });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await formaPagoModel.borrarForma_Pago(req.params.id);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la forma de pago' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la forma de pago' });
    }
});

module.exports = routes;