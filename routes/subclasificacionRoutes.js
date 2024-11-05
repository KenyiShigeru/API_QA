app.get('/subclasificaciones',async (req,res)=>{
    try{
        const subclasificaciones = await subclasificacionModel.obtenerSubclasificaciones();
        res.send(subclasificaciones);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/subclasificaciones/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.insertarSubclasificacion(
            [
                req.params.nom_subclasificacion, 
                req.params.des_subclasificacion
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

app.put('/subclasificaciones/:id/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                req.params.id ||null, 
                req.params.nom_subclasificacion || null, 
                req.params.des_subclasificacion || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});

app.put('/subclasificaciones/:id/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                req.params.id ||null, 
                req.params.nom_subclasificacion || null, 
                req.params.des_subclasificacion || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});