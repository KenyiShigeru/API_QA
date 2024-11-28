const express = require('express');
const routes = express.Router();
var {ProcesoModel} = require('../Models/Proceso');
const procesoModel = new ProcesoModel();
routes.get('/',async (req,res)=>{
    try{
        const procesos = await procesoModel.obtenerProcesos();
        res.send(procesos);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.get('/:id',async (req,res)=>{
    try{
        const procesos = await procesoModel.obtenerProcesosId(req.params.id);
        res.send(procesos);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


//Aqui se manda el id de la cotizacion para obtener los procesos que se le asignaron
routes.get('/cotizacion/:id', async (req, res) => {
    try {
        const proceso = await procesoModel.obtenerProcesosCotizacion(req.params.id);
        res.send(proceso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar' });
    }
});

//Aqui se manda el id de la cotizacion para obtener los procesos que se le asignaron
routes.post('/cotizacion/:id', async (req, res) => {
    try {
        const { id_proceso } = req.body;
        const proceso = await procesoModel.agregarProcesoCotizacion([req.params.id, id_proceso]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar' });
    }
});

routes.post('/', async (req, res) => {
    try {
        const { nom_proceso, desc_proceso } = req.body;
        const resultado = await procesoModel.agregarProceso(
            [
                nom_proceso,
                desc_proceso
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

routes.put('/:id', async (req, res) => {
    try {
        const { nom_proceso, descripcion } = req.body;
        const resultado = await procesoModel.modificarProceso(
            [
                req.params.id ||null, 
                nom_proceso || null,
                descripcion || null
            ]);
        if (resultado[0].mensaje === 'Proceso actualizado correctamente.') {
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
        const resultado = await procesoModel.eliminarProceso(req.params.id);
        if (resultado[0].mensaje === 'Proceso actualizada correctamente.') {
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