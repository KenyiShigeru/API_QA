app.get('/tipocliente',async (req,res)=>{
    try{
        const tiposCliente = await tipoClienteModel.obtenerTiposClientes();
        res.send(tiposCliente);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/tipocliente/:nom_tipocliente/:des_tipocliente', async (req, res) => {
    try {
        const resultado = await tipoClienteModel.insertarTipoCliente(
            [
                req.params.nom_tipocliente, 
                req.params.des_tipocliente
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de cliente' });
    }
});

app.put('/tipocliente/:id/:nom_tipocliente/:des_tipocliente', async (req, res) => {
    try {
        const resultado = await tipoClienteModel.modificarTipoPago(
            [
                req.params.id ||null, 
                req.params.nom_tipocliente || null, 
                req.params.des_tipocliente || null
            ]);
        if (resultado[0].mensaje === 'Tipo de cliente actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de cliente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de cliente' });
    }
});