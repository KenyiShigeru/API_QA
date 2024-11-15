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

router.get("/:id", async (req, res) => {
    try {
        const ordenes = await Orden_TrabajoModel.obtenerOrdenesTrabajoId(req.params.id);
        res.send(ordenes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las ordenes de trabajo' });
    }
});


router.get("/abonos/:id", async (req, res) => {
    try {
        const ordenes = await Orden_TrabajoModel.obtenerOrdenesTrabajoPagadas(req.params.id);
        res.send(ordenes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las ordenes de trabajo' });
    }
});

//El id proviene de la tabla cotizaciones que es la llave foranea
router.post("/:id",async (req, res) => 
    {
        try
        {
            const { correo, personalaceptado } = req.body;
            const resultado = await Orden_TrabajoModel.agregarOrdenTrabajo(
                [
                    req.params.id,
                    correo,
                    personalaceptado
                ]);
            res.status(201).json({message:'Agregado con exito'});
        }
        catch(error)
        {
            console.error(error);
            res.status(500).json({ error: 'Error al insertar la orden de trabajo' });
        }
    }
);

module.exports = router;