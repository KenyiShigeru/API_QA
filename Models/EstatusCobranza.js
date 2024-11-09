const conexion = require('../.env/conexion');

class EstatusCobranzaModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerEstatusCobranza()
    {
       return new Promise((resolve, reject) =>
       {
           this.conexion.execute('call consulta_estatusCobranza("")', (error, resultados) =>
           {
               if (error) return reject(error);
               resolve(resultados[0]);
           });
       });
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
            this.conexion.execute('call modificar_estatusCobranza(?, ?, ?, ?)', estatusCobranza, (error, resultados) =>
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

    borrarEstatusCobranza(estatusCobranza)
    {
        try
        {
            this.conexion.execute('update estatuscobranza set alta_estcobranza = 0 where id_estcobranza = ?', [estatusCobranza], (error, resultados) =>
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