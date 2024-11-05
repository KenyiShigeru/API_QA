const express = require('express');
const routes = express.Router();
var {ProcesoModel} = require('../Models/Proceso');
const procesoModel = new ProcesoModel();
routes.get('/',async (req,res)=>{
    try{
        const procesos = await procesoModel.obtenerProcesos();
        res.send(procesos);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/:nom_proceso', async (req, res) => {
    try {
        const resultado = await procesoModel.agregarProceso(
            [
                req.params.nom_proceso
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

routes.put('/:id/:nom_proceso', async (req, res) => {
    try {
        const resultado = await procesoModel.modificarProceso(
            [
                req.params.id ||null, 
                req.params.nom_proceso || null,
                1
            ]);
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

routes.delete('/:id/:nom_proceso', async (req, res) => {
    try {
        const resultado = await procesoModel.modificarProceso(
            [
                req.params.id ||null, 
                req.params.nom_proceso || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
})

module.exports = routes;