const conexion = require('../.env/conexion');

class EstatusCobranzaModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerEstatusCobranza()
    {
        try
        {
            this.conexion.execute('call obtener_estatusCobranza', (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        }
        catch (error)
        {
            reject(error);
        }
    }

    insertarEstatusCobranza(estatusCobranza)
    {
        try
        {
            this.conexion.execute('call agg_estatusCobranza(?, ?)', estatusCobranza, (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        }
        catch (error)
        {
            reject(error);
        }
    }

    modificarEstatusCobranza(estatusCobranza)
    {
        try
        {
            this.conexion.execute('call modificar_estatusCobranza(?, ?, ?)', estatusCobranza, (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        }
        catch (error)
        {
            reject(error);
        }
    }
}

module.exports = {EstatusCobranzaModel};