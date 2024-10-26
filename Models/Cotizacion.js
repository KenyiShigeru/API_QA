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
            let consultita = 'SELECT * FROM cotizaciones';
            this.conexion.query(consultita, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados);
            });
        });
    }

    async insertarCotizacion(cotizacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.query('INSERT INTO cotizaciones SET ?', 
                cotizacion, (error, resultado) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultado.insertId);
            });
        });
    }
}

module.exports = {Cotizacion, CotizacionModel};