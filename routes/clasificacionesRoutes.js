app.get('/clasificaciones',async (req,res)=>{
    try{
        const unidades = await clasificacionModel.obtenerClasificaciones();    
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/clasificaciones/:nom_clasificacion/:des_clasificacion', async (req, res) => {
    try {
        const resultado = await clasificacionModel.insertarClasificacion(
            [
                req.params.nom_clasificacion, 
                req.params.des_clasificacion
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});


app.put('/clasificaciones/:id/:nom_clasificacion/:des_clasificacion', async (req, res) => {
    try {
        const resultado = await clasificacionModel.modificarClasificacion(
            [
                req.params.id, 
                req.params.nom_clasificacion, 
                req.params.des_clasificacion,
                1
            ]);
        res.status(200).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

app.delete('/clasificaciones/:id/:nom_clasificacion/:des_clasificacion', async (req, res) => {
    try {
        const resultado = await clasificacionModel.modificarClasificacion(
            [
                req.params.id, 
                req.params.nom_clasificacion, 
                req.params.des_clasificacion,
                0
            ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

