app.get('/clientes', async (req, res) => {
    try {
        const clientes = await clienteModel.obtenerClientes();
        res.send(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

app.post("/clientes/:nombre/:apellidopaterno/:apellidomaterno/:rutaconstancia/:rfc/:nomnegocio/:domicilio/:telWP/:telFJ/:correo/:tpCliente", 
    async (req, res) => {
    try {
        //console.log(req.params);
        const resultado = await clienteModel.insertarCliente(req.params);
        //console.log(resultado.id_cliente);
        res.status(201).json({"message":resultado.id_registrado});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el cliente' });
    }
});

app.put("/clientes/:id/:nombre/:apellidopaterno/:apellidomaterno/:rutaconstancia/:rfc/:nomnegocio/:domicilio/:telWP/:telFJ/:correo/:tpCliente", 
    async (req, res) => {
    try {
        const resultado = await clienteModel.modificarCliente(req.params);
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
