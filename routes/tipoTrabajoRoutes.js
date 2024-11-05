app.get('/tipotrabajo',async (req,res)=>{
    try{
        const tiposTrabajo = await tipoTrabajoModel.obtenerTiposTrabajo();
        res.send(tiposTrabajo);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/tipotrabajo/:nom_tipotrabajo/:des_tipotrabajo', async (req, res) => {
    try {
        const resultado = await tipoTrabajoModel.insertarTipoTrabajo(
            [
                req.params.nom_tipotrabajo, 
                req.params.des_tipotrabajo
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de trabajo' });
    }
});

app.put('/tipotrabajo/:id/:nom_tipotrabajo/:des_tipotrabajo', async (req, res) => {
    try {
        const resultado = await tipoTrabajoModel.modificarTipoTrabajo(
            [
                req.params.id ||null, 
                req.params.nom_tipotrabajo || null, 
                req.params.des_tipotrabajo || null,
                1
            ]);
        if (resultado[0].mensaje === 'Tipo de trabajo actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de trabajo' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de trabajo' });
    }
});

app.delete('/tipotrabajo/:id/:nom_tipotrabajo/:des_tipotrabajo', async (req, res) => {
    try {
        const resultado = await tipoTrabajoModel.modificarTipoTrabajo(
            [
                req.params.id ||null, 
                req.params.nom_tipotrabajo || null, 
                req.params.des_tipotrabajo || null,
                0
            ]);
        if (resultado[0].mensaje === 'Tipo de trabajo actualizado correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de trabajo' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de trabajo' });
    }
});