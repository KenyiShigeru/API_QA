const conexion = require('../.env/conexion');

class TipoPagoModel
{
    constructor()
    {
        this.conexion = conexion;
    }

    obtenerTiposPagos()
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call consulta_tipoPago("")', (error, resultados) =>
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
            this.conexion.execute('call modificar_tipoPago(?, ?, ?, ?)', tipo, (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }

    eliminarTipoPago(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('update tipopago set alta_tpago = 0 where id_tpago = ?', [id], (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }
}

module.exports = {TipoPagoModel};