app.get('/tipoventa',async (req,res)=>{
    try{
        const tiposVenta = await tipoVentaModel.obtenerTiposVentas();
        res.send(tiposVenta);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/tipoventa/:nom_tipos_venta/:des_tipos_venta', async (req, res) => {
    try {
        const resultado = await tipoVentaModel.insertarTipoVenta(
            [
                req.params.nom_tipos_venta, 
                req.params.des_tipos_venta
            ]);
        res.status(201).json({message:'Agregado con exito'});
        res.send(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de venta' });
    }
});

app.put('/tipoventa/:id/:nom_tipos_venta/:des_tipos_venta', async (req, res) => {
    try {
        const resultado = await tipoVentaModel.modificarTipoVenta(
            [
                req.params.id ||null, 
                req.params.nom_tipos_venta || null, 
                req.params.des_tipos_venta || null,
                1
            ]);
        if (resultado[0].mensaje === 'Tipo de venta actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de venta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de venta' });
    }
});

app.delete('/tipoventa/:id/:nom_tipos_venta/:des_tipos_venta', async (req, res) => {
    try {
        const resultado = await tipoVentaModel.modificarTipoVenta(
            [
                req.params.id ||null, 
                req.params.nom_tipos_venta || null, 
                req.params.des_tipos_venta || null,
                0
            ]);
        if (resultado[0].mensaje === 'Tipo de venta actualizado correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de venta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de venta' });
    }
});
