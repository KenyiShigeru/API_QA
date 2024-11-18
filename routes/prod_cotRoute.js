const express = require('express');
const routes = express.Router();
const {Prod_cotModel} = require('../Models/Prod_cot');
var prod_cotModel = new Prod_cotModel();
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

module.exports = routes;