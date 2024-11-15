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

routes.get('/:id',async (req,res)=>{
    try{
        const unidades = await clasificacionModel.obtenerClasificacionesId(req.params.id);    
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


routes.put('/:id', async (req, res) => {
    try {
        const { nom_clasificacion, des_clasificacion } = req.body;
        const resultado = await clasificacionModel.modificarClasificacion(
            [
                req.params.id,
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

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await clasificacionModel.borrarClasificacion(req.params.id);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

module.exports = routes;