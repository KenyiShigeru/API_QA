const conexion = require('../.env/conexion');

class TipoTrabajoModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerTiposTrabajo()
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call consulta_tipoTrabajo("")', (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    insertarTipoTrabajo(tipo)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call agg_tipoTrabajo(?, ?)', [tipo], (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    modificarTipoTrabajo(tipo)
    {
            return new Promise((resolve, reject) =>
            {
                this.conexion.execute('call modificar_tipoTrabajo(?, ?, ?, ?)', tipo, (error, resultados) =>
                {
                    if (error)
                    {
                        return reject(error);
                    }
                    resolve(resultados[0]);
                });
            });
    }

    eliminarTipoTrabajo(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('update tipotrabajo set alta_tpTrabajo = 0 where id_tpTrabajo = ?', [id], (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }
}

module.exports = {TipoTrabajoModel};