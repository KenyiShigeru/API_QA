const conexion = require('../.env/conexion');

class TipoClienteModel
{
    constructor()
    {
        this.conexion = conexion;
    }

    obtenerTiposClientes()
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call consulta_tpCliente("")', (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }

    insertarTipoPago(tipo)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call agg_tipoPago(?, ?)', tipo, (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }

    modificarTipoPago(tipo)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call modificar_tipoPago(?, ?, ?)', tipo, (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }
}

module.exports = {TipoClienteModel};