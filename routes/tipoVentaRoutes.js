const express = require('express');
const routes = express.Router();
var {TipoVentaModel} = require('../Models/TipoVenta');
const tipoVentaModel = new TipoVentaModel();
routes.get('/',async (req,res)=>{
    try{
        const tiposVenta = await tipoVentaModel.obtenerTiposVentas();
        res.send(tiposVenta);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/', async (req, res) => {
    try {
        const { nom_tipos_venta, des_tipos_venta } = req.body;
        const resultado = await tipoVentaModel.insertarTipoVenta(
            [
                nom_tipos_venta, 
                des_tipos_venta
            ]);
        res.status(201).json({message:'Agregado con exito'});
        res.send(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de venta' });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const {  nom_tipos_venta, des_tipos_venta } = req.body;
        const resultado = await tipoVentaModel.modificarTipoVenta(
            [
                req.params.id ||null, 
                nom_tipos_venta || null, 
                des_tipos_venta || null,
                1
            ]);
        if (resultado[0].mensaje === 'Tipo de venta actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de venta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de venta' });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await tipoVentaModel.eliminarTipoVenta(req.params.id);
        if (resultado[0].mensaje === 'Tipo de venta actualizado correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de venta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de venta' });
    }
});

module.exports = routes;