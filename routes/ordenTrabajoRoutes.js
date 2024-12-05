const app = require('express');
const router = app.Router();
var {Orden_Trabajo} = require('../Models/Orden_Trabajo');
const Orden_TrabajoModel = new Orden_Trabajo();
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

        // Encabezado
        doc.fontSize(12).text('Orden de Trabajo', { align: 'center' });
        doc.fontSize(10).text(`Fecha de emisión: ${ordenes.fechaEmision}`, { align: 'center' });
        doc.text(`Nombre del cliente: ${ordenes.nombreCliente}`, { align: 'center' });
        doc.text(`Negocio: ${ordenes.nombreNegocio}`, { align: 'center' });
        doc.moveDown(1);

        // Posición inicial y ancho de columnas
        const tableStartY = 150;
        let yPosition = tableStartY;

        // Encabezados de la tabla
        doc.fontSize(10).text('Cantidad', 50, yPosition);
        doc.text('Descripción del trabajo', 110, yPosition);
        doc.text('Base', 320, yPosition);
        doc.text('Altura', 370, yPosition);
        doc.text('Total m2', 420, yPosition);
        doc.text('Precio', 480, yPosition,{ width: 40, align: 'left', lineBreak: true });
        doc.text('Acabados', 530, yPosition,{ align: 'center', lineBreak: false });

        yPosition += 20; // Mover la posición vertical para las filas

        // Línea horizontal debajo de encabezados
        doc.moveTo(50, yPosition - 5).lineTo(575, yPosition - 5).stroke();
        let contar = 0;
        // Agregar productos a la tabla
        ordenes.productos.forEach((producto) => {
            doc.text(`${producto.cantidad}`, 50, yPosition);
            
            // Texto de descripción ajustado con un ancho fijo
            doc.text(
                `${producto.nombreProducto} - ${producto.descripcion}`,
                110, 
                yPosition, 
                { width: 200, align: 'left', lineBreak: true }
            );

            doc.text(producto.base, 320, yPosition);
            doc.text(producto.altura, 370, yPosition);
            doc.text(producto.medida, 420, yPosition);
            doc.text(`$${producto.total}`, 470, yPosition, { width: 50, align: 'left' });
            contar+= producto.total;
            const totalAcabados = producto.acabados;
            doc.text(producto.acabados, 530, yPosition, { width: 50,align: 'left' });
            const palabras = totalAcabados.split(',').map(p => p.trim()); // Separa por comas y elimina espacios
            const totalPalabras = palabras.length>=4? (palabras.length-3)*10 +5: 0;
            yPosition += 40+totalPalabras; // Aumentar el espacio entre filas
        });

        // Línea final debajo de la tabla
        doc.moveTo(50, yPosition - 5).lineTo(575, yPosition - 5).stroke();


        // Información de costos en una sola línea
        doc.fontSize(10).text(
            `Total m2: ${ordenes.totalMetrosCuadrados}`,
            400,
            yPosition,
            { align: 'left' }
        );
        yPosition += 20;
        doc.moveTo(50, yPosition - 5).lineTo(575, yPosition - 5).stroke();
        doc.text(
            `Total neto: $${parseFloat(ordenes.totalVenta-ordenes.totalVenta*0.16).toFixed(2)}    IVA: $${parseFloat(ordenes.totalVenta*0.16).toFixed(2)}    Total: $${parseFloat(ordenes.totalVenta).toFixed(2)}`,
            320,
            yPosition,
            { align: 'right' }
        );
        
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