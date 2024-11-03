const conexion = require('../.env/conexion');

class Cotizacion
{
    constructor(idCotizacion, id_cliente, idtipoVenta, 
        subTotal, iva, total, fechaVigencia, estatus)
    {
        this.idCotizacion = idCotizacion;
        this.id_cliente = id_cliente;
        this.idtipoVenta = idtipoVenta;
        this.subTotal = subTotal;
        this.iva = iva;
        this.total = total;
        this.fechaVigencia = fechaVigencia;
        this.estatus = estatus;
    }

}

class CotizacionModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerCotizaciones()
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_cotizacion("")', (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            })
        });
    }

    async insertarCotizacion(cotizacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call agg.cotizacion(?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)', cotizacion, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            }
            );
        });
    }

    async modificarCotizacion(cotizacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call modificar_cotizaciones(?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)', cotizacion, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            }
            );
        });
    }

}

module.exports = {Cotizacion, CotizacionModel};