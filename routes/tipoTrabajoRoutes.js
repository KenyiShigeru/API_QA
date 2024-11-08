const express = require('express');
const routes = express.Router();
var {TipoTrabajoModel} = require('../Models/TipoTrabajo');
const tipoTrabajoModel = new TipoTrabajoModel();
routes.get('/',async (req,res)=>{
    try{
        const tiposTrabajo = await tipoTrabajoModel.obtenerTiposTrabajo();
        res.send(tiposTrabajo);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/', async (req, res) => {
    try {
        const { nom_tipotrabajo, des_tipotrabajo } = req.body;
        const resultado = await tipoTrabajoModel.insertarTipoTrabajo(
            [
                nom_tipotrabajo, 
                des_tipotrabajo
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de trabajo' });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const { nom_tipotrabajo, des_tipotrabajo } = req.body;
        const resultado = await tipoTrabajoModel.modificarTipoTrabajo(
            [
                req.params.id ||null, 
                nom_tipotrabajo || null, 
                des_tipotrabajo || null,
                1
            ]);
        if (resultado[0].mensaje === 'Tipo de trabajo actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de trabajo' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de trabajo' });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const { nom_tipotrabajo, des_tipotrabajo } = req.body;
        const resultado = await tipoTrabajoModel.modificarTipoTrabajo(
            [
                req.params.id ||null, 
                nom_tipotrabajo || null, 
                des_tipotrabajo || null,
                0
            ]);
        if (resultado[0].mensaje === 'Tipo de trabajo actualizado correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de trabajo' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de trabajo' });
    }
});

module.exports = routes;