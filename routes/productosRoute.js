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

//Otro get para ver que productos estan asignados a una cotizacion
routes.get('/cotizacion/:id', async (req, res) => {
    try {
        const productos = await productoModel.obtenerProductosCotizacion(req.params.id);
        res.send(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.get('/ordenTrabajo/:id', async (req, res) => {
    try {
        const productos = await productoModel.obtenerProductosOrdenTrabajo(req.params.id);
        res.send(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/', async (req, res) => {
    try {
        const
        {  
            id_subclasificacion, 
            id_tpmaterial, 
            id_unidad, 
            apl_inst, 
            precio_sin_inst, 
            precio_con_inst, 
            observaciones,
            nombredescriptivoProducto
        } = req.body;
        const resultado = await productoModel.insertarProducto(
            [ 
                id_subclasificacion || null,
                id_tpmaterial || null, 
                id_unidad || null,
                apl_inst || null, 
                precio_sin_inst || null,
                precio_con_inst || null, 
                observaciones || null,
                nombredescriptivoProducto || null,
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el producto' });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const 
        {  
            id_clasificacion, 
            id_subclasificacion, 
            id_material, 
            id_unidad, 
            apl_inst, 
            precio_sin_inst, 
            precio_con_inst, 
            observaciones 
        } = req.body;
        const resultado = await productoModel.modificarProducto(
            [
                req.params.id ||null, 
                id_clasificacion ||null, 
                id_subclasificacion || null,
                id_material || null, 
                id_unidad || null,
                apl_inst || null, 
                precio_sin_inst || null,
                precio_con_inst || null, 
                observaciones || null,
                1
            ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
});

routes.delete('/:id', async (req, res) => {
    try {
        const resultado = await productoModel.eliminarProducto(req.params.id);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
});


module.exports = routes;