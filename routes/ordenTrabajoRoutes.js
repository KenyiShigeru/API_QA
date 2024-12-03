const app = require('express');
const router = app.Router();
var {Orden_Trabajo} = require('../Models/Orden_Trabajo');
const Orden_TrabajoModel = new Orden_Trabajo();
var {crearPDF} = require('../libs/pdfkt');
const fs = require('fs');
const PDFDocument = require('pdfkit');

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

//Modulo para imprimir la orden de trabajo
router.get("/imprimir/:id", async (req, res) => {
    try {
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=orden_trabajo_${req.params.id}.pdf`
        });

        const doc = new PDFDocument();
        const ordenes = await Orden_TrabajoModel.imprimirOrden(req.params.id);
        doc.pipe(stream);
        doc.fontSize(12).text('Orden de trabajo' , { align: 'center' });
        doc.text(`Fecha de emisión: ${ordenes.fechaEmision}`, { align: 'center' });
        doc.text(`Nombre del cliente: ${ordenes.nombreCliente}`, { align: 'center' });
        //Nombre del negocio
        //Correo del cliente
        //Productos debe ser un arreglo de objetos
        ordenes.productos.forEach(producto => {
            doc.text(`Nombre del producto: ${producto.nombreProducto}`);
            doc.text(`Descripción: ${producto.descripcion}`);
            doc.text(`Base: ${producto.base}`);
            doc.text(`Altura: ${producto.altura}`);
            doc.text(`Medida: ${producto.medida}`);
        });
        //Total metros cuadrados
        //Total venta
        //Anticipo
        //Saldo
        doc.end();

        //console.log(ordenes);

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error al generar el PDF' });
        }
    }
});



module.exports = router;