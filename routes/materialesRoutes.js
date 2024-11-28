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

routes.get('/:id',async (req,res)=>{
    try{
        const unidades = await materialModel.obtenerMaterialesId(req.params.id);
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
        const { nom_material, des_material } = req.body;
        const resultado = await materialModel.insertarMaterial(
            [
                nom_material, 
                des_material
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const {nom_material, des_material } = req.body;
        const resultado = await materialModel.modificarMaterial(
            [
                req.params.id ||null, 
                nom_material || null, 
                des_material || null
            ]);
        if (resultado[0].mensaje === 'Material actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await materialModel.borrarMaterial(req.params.id);
        if (resultado[0].mensaje === 'Material actualizado correctamente.') {
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