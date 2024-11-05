const express = require('express');
const routes = express.Router();
var {Material_ProduccionModel} = require('../Models/Material_Produccion');
const material_ProduccionModel = new Material_ProduccionModel();
routes.get('/',async (req,res)=>{
    try{
        const materiales = await material_ProduccionModel.obtenerMaterial_Produccion();
        res.send(materiales);
    
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

routes.post('/:id_material/:id_unidad/:base/:altura/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.insertarMaterial_Produccion(
            [
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.base || null,
                req.params.altura || null,
                req.params.proveedor || null
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el material' });
    }
});

routes.put('/:id/:id_material/:id_unidad/:base/:altura/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.modificarMaterial_Produccion(
            [
                req.params.id ||null,
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.base || null,
                req.params.altura || null,
                req.params.proveedor || null,
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

routes.delete('/:id/:id_material/:id_unidad/:base/:altura/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.modificarMaterial_Produccion(
            [
                req.params.id ||null,
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.base || null,
                req.params.altura || null,
                req.params.proveedor || null,
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
});

module.exports = routes;