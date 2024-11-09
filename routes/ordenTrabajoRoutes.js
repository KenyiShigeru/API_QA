const app = require('express');
const router = app.Router();
var {Orden_Trabajo} = require('../Models/Orden_Trabajo');
const Orden_TrabajoModel = new Orden_Trabajo();

router.get("/", async (req, res) => {
    try {
        const ordenes = await Orden_TrabajoModel.obtenerOrdenesTrabajo();
        res.send(ordenes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las ordenes de trabajo' });
    }
});

module.exports = router;