const express = require('express');
const router = express.Router();
var {AcabadosModel} = require('../Models/Acabados');
const acabadosModel = new AcabadosModel();


// Zona de los acabados
router.get('/', async (req, res) => {
    try {
        const acabados = await acabadosModel.obtenerAcabados();
        res.send(acabados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta POST para agregar un nuevo acabado usando req.body
router.post('/', async (req, res) => {
    try {
        const { nom_acabados, des_acabados } = req.body;
        const resultado = await acabadosModel.insertarAcabado([nom_acabados, des_acabados]);
        res.status(201).json({ message: 'Agregado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al ingresar el acabado' });
    }
});

// Ruta PUT para modificar un acabado usando req.body
router.put('/:id', async (req, res) => {
    try {
        
        const {nom_acabados, des_acabados } = req.body;
        const resultado = await acabadosModel.modificarAcabado([req.params.id, nom_acabados, des_acabados, 1]);
        res.status(200).json({ message: 'Modificado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al modificar el acabado' });
    }
});

// Ruta DELETE para "eliminar" un acabado usando req.body
router.delete('/:id', async (req, res) => {
    try {
        const resultado = await acabadosModel.eliminarAcabado(req.params.id);
        res.status(200).json({ message: 'Modificado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al modificar el acabado' });
    }
});

module.exports = router;
