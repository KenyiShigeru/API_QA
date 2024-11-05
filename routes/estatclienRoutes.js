const express = require('express');
const routes = express.Router();
var {EstadoClienteModel} = require('../Models/EstadoCliente');
const estadoClienteModel = new EstadoClienteModel();
routes.get('/', async (req, res) =>  {
    try {
        const estatus = await estadoClienteModel.obtenerestadosClientes();
        res.send(estatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los estatus' });
    }
});

routes.post('/', async (req, res) => {
    try {
        const { nom_estatus, des_estatus } = req.body;
        const resultado = await estatusModel.insertarEstatus(
            [
                nom_estatus, 
                des_estatus
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el estatus' });
    }
});

routes.put('/', async (req, res) => {
    try {
        const { id, nom_estatus, des_estatus } = req.body;
        const resultado = await estatusModel.modificarEstatus(
            [
                id ||null,
                nom_estatus,
                des_estatus
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el estatus' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estatus' });
    }
});

module.exports = routes;