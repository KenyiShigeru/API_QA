const express = require('express');
const routes = express.Router();
var {MaterialModel} = require('../Models/Material');
const materialModel = new MaterialModel();
routes.get('/',async (req,res)=>{
    try{
        const unidades = await materialModel.obtenerMateriales();
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.insertarMaterial(
            [
                req.params.nom_material, 
                req.params.des_material
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

routes.put('/:id/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.modificarMaterial(
            [
                req.params.id ||null, 
                req.params.nom_material || null, 
                req.params.des_material || null,
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

routes.delete('/:id/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.modificarMaterial(
            [
                req.params.id ||null, 
                req.params.nom_material || null, 
                req.params.des_material || null,
                0
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

module.exports = routes;