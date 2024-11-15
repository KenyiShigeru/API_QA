const conexion = require('../.env/conexion');

class TipoVentaModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerTiposVentas()
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_tipoVenta("")', (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    obtenerTiposVentasId(id)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_tipoVenta("")', 
                [id],
                (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    insertarTipoVenta(tipo)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call agg_tipoVenta(?, ?)', tipo, (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    modificarTipoVenta(tipo)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call modificar_tipoVenta(?, ?, ?, ?)', tipo, (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    eliminarTipoVenta(id)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call baja_tipoVenta(?)', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }
}

module.exports = {TipoVentaModel};