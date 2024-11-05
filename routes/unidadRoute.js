const express = require('express');
const routes = express.Router();

var {UnidadModel} = require('../Models/Unidad');
const unidadModel = new UnidadModel();
routes.get('/',async (req,res)=>{
    try{
        const unidades = await unidadModel.obtenerUnidades();
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


routes.post('/:nom_unidad/:des_unidad', async (req, res)=>{
    try{
        const resultado = await unidadModel.insertarUnidad(
            [
                req.params.nom_unidad, 
                req.params.des_unidad
            ]
        );
        res.status(201).json({message:'Agregado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al ingresar la unidad'});
    }
})

routes.put('/:id/:nom_unidad/:des_unidad', async (req, res) => {
    try {
        const resultado = await unidadModel.modificarUnidad(
            [
                req.params.id ||null, 
                req.params.nom_unidad || null, 
                req.params.des_unidad || null
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la clasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});


module.exports = routes;