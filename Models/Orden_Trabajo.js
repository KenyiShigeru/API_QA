const conexion = require('../.env/conexion');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { console } = require('inspector');

class Orden_Trabajo
{
    constructor()
    {
        this.conexion = conexion;
    }

    async obtenerOrdenesTrabajo() {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_ordentrabajo("")',
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }

    async obtenerOrdenesTrabajoId(id) {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_ordentrabajo_ID(?)',[id],
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }

    async obtenerOrdenesTrabajoPagadas(id) {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_pagoOrdenTrabajo(?)',[id],
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }

    async agregarOrdenTrabajo(datos) {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call agg_ordenTrabajo(?,?,?)',datos,
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }
    

    async imprimirOrden(id) {
        try {
            const ordenResult = await conexion.promise().query(`
                select * from view_ordentrabajo where id_ordentrabajo = ?;
                call consulta_Prod_ordenTrabajo(?);
                call consultar_proc_OrdenTrabajo(?);
            `, [id, id, id]);
            const orden = ordenResult[0][0]; // Primer resultado de la consulta de la orden
            const productos = ordenResult[0][1]; // Resultados de la consulta del procedimiento
            let total = 0;
            const detallesProductos = productos.map((prod) => {
                total += prod.m2;
                return {
                    cantidad: prod.cantidad,
                    nombreProducto: prod.nom_subclasificacion,
                    descripcion: prod.Descripcion,
                    base: prod.base,
                    altura: prod.altura,
                    medida: prod.m2,
                    acabados: prod.Acabados,
                    total: prod.precio_Uni
                };
            });
            const totalVenta = parseFloat(orden[0]['Total Venta']);
            const subtotal = parseFloat(orden[0].subTotal);
            const iva = parseFloat(orden[0].iva);
            const anticipo = parseFloat(orden[0].totalPagado);

            var {fechaEmision} = orden[0];
            const nuevaFecha = new Date(fechaEmision);
            const fecha = nuevaFecha.getDate() + '/' + (nuevaFecha.getMonth() + 1) + '/' + nuevaFecha.getFullYear();
    
            const genralidades = {
                fechaEmision: fecha,
                nombreCliente: orden[0]['Nombre Completo'],
                nombreNegocio: orden[0].nom_negocio,
                correoCliente: orden[0].correo_pers,
                productos: detallesProductos,
                totalMetrosCuadrados: total,
                totalVenta: totalVenta,
                subtotal: subtotal,
                iva: iva,
                anticipo: anticipo,
                saldo: totalVenta - anticipo
            };
            return new Promise((resolve, reject) => {
                resolve(genralidades);
            });
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return JSON.stringify({ error: 'Error al obtener los datos' });
        }
    }

    
    
}

module.exports = {Orden_Trabajo};

