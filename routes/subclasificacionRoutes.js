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

routes.get('/:id',async (req,res)=>{
    try{
        const subclasificaciones = await subclasificacionModel.obtenerSubclasificacionesId(req.params.id);
        res.send(subclasificaciones);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//Id de la clasificacion a la que pertenece
routes.post('/:id', async (req, res) => {
    try {
        const { nom_subclasificacion, des_subclasificacion } = req.body;
        const resultado = await subclasificacionModel.insertarSubclasificacion(
            [
                req.params.id,
                nom_subclasificacion, 
                des_subclasificacion
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const { nom_subclasificacion, des_subclasificacion, id_clasificacion } = req.body;
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                req.params.id ||null, 
                nom_subclasificacion || null, 
                des_subclasificacion || null,
                id_clasificacion
            ]);
        if (resultado[0].mensaje === 'Subclasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.borrarSubClasificacion(req.params.id);
        if (resultado[0].mensaje === 'Subclasificación actualizada correctamente.') {
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