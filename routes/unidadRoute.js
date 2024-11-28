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


routes.get('/:id',async (req,res)=>{
    try{
        const unidades = await unidadModel.obtenerUnidadesId(req.params.id);
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


routes.post('/', async (req, res)=>{
    try{
        const {nom_unidad, des_unidad} = req.body;
        const resultado = await unidadModel.insertarUnidad(
            [
                nom_unidad, 
                des_unidad
            ]
        );
        res.status(201).json({message:'Agregado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al ingresar la unidad'});
    }
})

routes.put('/:id', async (req, res) => {
    try {
        const { nom_unidad, des_unidad } = req.body;
        const resultado = await unidadModel.modificarUnidad(
            [
                req.params.id ||null, 
                nom_unidad || null, 
                des_unidad || null
            ]);
        if (resultado[0].mensaje === 'Unidad actualizada correctamente.') {
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