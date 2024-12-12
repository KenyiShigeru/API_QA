const express = require('express');
const routes = express.Router();
const {Prod_cotModel} = require('../Models/Prod_cot');
var prod_cotModel = new Prod_cotModel();
var acabCotizacionModel = new AcabCotizacionModel();
conexion = require('../.env/conexion');
routes.get('/',async (req,res)=>{
    try{
        const resultado = await prod_cotModel.obtenerProductosCot();
        res.send(resultado);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/acab_cotizacion/:id', async (req, res) => {
    try {
         const 
         {
            id_acabado,
        } = req.body;
        const resultado = await acabCotizacionModel.agregarAcabCotizacion(
            [
                req.params.id,
                id_acabado,                                
            ]
        );
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la cotización' });
    }
});

module.exports = routes;