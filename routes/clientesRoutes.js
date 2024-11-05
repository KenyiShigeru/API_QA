const express = require('express');
const routes = express.Router();
var {ClienteModel} = require('../Models/Cliente');
const clienteModel = new ClienteModel();
routes.get('/', async (req, res) => {
    try {
        const clientes = await clienteModel.obtenerClientes();
        res.send(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

routes.post("/", 
    async (req, res) => {
    try {
        const {
            nombre,
            apellidopaterno,
            apellidomaterno,
            rutaconstancia,
            rfc,
            nomnegocio,
            domicilio,
            telWP,
            telFJ,
            correo,
            tpCliente
        } = req.body;
        //console.log(req.params);
        const resultado = await clienteModel.insertarCliente(
            [
                nombre,
                apellidopaterno,
                apellidomaterno,
                rutaconstancia,
                rfc,
                nomnegocio,
                domicilio,
                telWP,
                telFJ,
                correo,
                tpCliente
            ]
        );
        //console.log(resultado.id_cliente);
        res.status(201).json({"message":resultado.id_registrado});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el cliente' });
    }
});

routes.put("/", 
    async (req, res) => {
    try {
        const {
            id,
            nombre,
            apellidopaterno,
            apellidomaterno,
            rutaconstancia,
            rfc,
            nomnegocio,
            domicilio,
            telWP,
            telFJ,
            correo,
            tpCliente
        } = req.body;
        const resultado = await clienteModel.modificarCliente(
            [
                id,
                nombre,
                apellidopaterno,
                apellidomaterno,
                rutaconstancia,
                rfc,
                nomnegocio,
                domicilio,
                telWP,
                telFJ,
                correo,
                tpCliente
            ]
        );
        //La respuesta de la base de datos es un array con un objeto que tiene un mensaje por eso se toma el primer elemento
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el cliente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

module.exports = routes;