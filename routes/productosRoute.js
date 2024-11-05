const express = require('express');
const routes = express.Router();
var {ProductoModel} = require('../Models/Producto');
const productoModel = new ProductoModel();
routes.get('/', async (req, res) => {
    try {
        const productos = await productoModel.obtenerProductos();
        res.send(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/:id_clasificacion/:id_subclasificacion/:id_tpmaterial/:id_unidad/:apl_inst/:precio_sin_inst/:precio_con_inst/:observaciones', async (req, res) => {
    try {
        const resultado = await productoModel.insertarProducto(
            [
                req.params.id_clasificacion ||null, 
                req.params.id_subclasificacion || null,
                req.params.id_tpmaterial || null, 
                req.params.id_unidad || null,
                req.params.apl_inst || null, 
                req.params.precio_sin_inst || null,
                req.params.precio_con_inst || null, 
                req.params.observaciones || null
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el producto' });
    }
});

routes.put('/:id/:id_clasificacion/:id_subclasificacion/:id_tpmaterial/:id_unidad/:apl_inst/:precio_sin_inst/:precio_con_inst/:observaciones', async (req, res) => {
    try {
        const resultado = await productoModel.modificarProducto(
            [
                req.params.id ||null, 
                req.params.id_clasificacion ||null, 
                req.params.id_subclasificacion || null,
                req.params.id_tpmaterial || null, 
                req.params.id_unidad || null,
                req.params.apl_inst || null, 
                req.params.precio_sin_inst || null,
                req.params.precio_con_inst || null, 
                req.params.observaciones || null,
                1
            ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
});

routes.delete('/productos/:id/:id_clasificacion/:id_subclasificacion/:id_tpmaterial/:id_unidad/:apl_inst/:precio_sin_inst/:precio_con_inst/:observaciones', async (req, res) => {
    try {
        const resultado = await productoModel.modificarProducto(
            [
                req.params.id ||null, 
                req.params.id_clasificacion ||null, 
                req.params.id_subclasificacion || null,
                req.params.id_tpmaterial || null, 
                req.params.id_unidad || null,
                req.params.apl_inst || null, 
                req.params.precio_sin_inst || null,
                req.params.precio_con_inst || null, 
                req.params.observaciones || null,
                0
            ]);
        res.status(200).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
});


module.exports = routes;