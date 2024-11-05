const express = require('express');
const routes = express.Router();
var {ClasificacionModel} = require('../Models/Clasificacion');
const clasificacionModel = new ClasificacionModel();
routes.get('/',async (req,res)=>{
    try{
        const unidades = await clasificacionModel.obtenerClasificaciones();    
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


routes.post('/', async (req, res) => {
    try {
        const { nom_clasificacion, des_clasificacion } = req.body;
        const resultado = await clasificacionModel.insertarClasificacion(
            [
                nom_clasificacion, 
                des_clasificacion
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});


routes.put('/', async (req, res) => {
    try {
        const { id,nom_clasificacion, des_clasificacion } = req.body;
        const resultado = await clasificacionModel.modificarClasificacion(
            [
                id,
                nom_clasificacion, 
                des_clasificacion,
                1
            ]);
        res.status(200).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

routes.delete('/', async (req, res) => {
    try {
        const { id, nom_clasificacion, des_clasificacion } = req.body;
        const resultado = await clasificacionModel.modificarClasificacion(
            [
                id,
                nom_clasificacion,
                des_clasificacion,
                0
            ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

module.exports = routes;