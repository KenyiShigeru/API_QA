app.get('/estatuscliente', async (req, res) =>  {
    try {
        const estatus = await estadoClienteModel.obtenerestadosClientes();
        res.send(estatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los estatus' });
    }
});

app.post('/estatuscliente/:nom_estatus/:des_estatus', async (req, res) => {
    try {
        const resultado = await estatusModel.insertarEstatus(
            [
                req.params.nom_estatus, 
                req.params.des_estatus
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el estatus' });
    }
});

app.put('/estatuscliente/:id/:nom_estatus/:des_estatus', async (req, res) => {
    try {
        const resultado = await estatusModel.modificarEstatus(
            [
                req.params.id ||null, 
                req.params.nom_estatus || null, 
                req.params.des_estatus || null
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el estatus' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estatus' });
    }
});