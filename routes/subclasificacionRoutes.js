const express = require('express');
const routes = express.Router();
var {SubclasificacionModel} = require('../Models/SubClasificacion');
const subclasificacionModel = new SubclasificacionModel();
routes.get('/',async (req,res)=>{
    try{
        const subclasificaciones = await subclasificacionModel.obtenerSubclasificaciones();
        res.send(subclasificaciones);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


routes.post('/', async (req, res) => {
    try {
        const { nom_subclasificacion, des_subclasificacion } = req.body;
        const resultado = await subclasificacionModel.insertarSubclasificacion(
            [
                nom_subclasificacion, 
                des_subclasificacion
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

routes.put('/', async (req, res) => {
    try {
        const { id, nom_subclasificacion, des_subclasificacion } = req.body;
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                id ||null, 
                nom_subclasificacion || null, 
                des_subclasificacion || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});

routes.put('/', async (req, res) => {
    try {
        const { id, nom_subclasificacion, des_subclasificacion } = req.body;
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                id ||null, 
                nom_subclasificacion || null, 
                des_subclasificacion || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});


module.exports = routes