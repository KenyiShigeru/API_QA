const conexion = require('../.env/conexion');

class AcabadosModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerAcabados()
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call consulta_acabado("")', (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    obtenerAcabadosId(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call consulta_acabado_ID(?)', 
                [id],
                (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    insertarAcabado(acabado)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call agg_acabado(?, ?)', acabado, (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    modificarAcabado(acabado)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call modificar_acabado(?,?, ?,?)', acabado, (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    eliminarAcabado(acabado)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call baja_acabado(?)', [acabado], (error, resultados) =>
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

module.exports = {AcabadosModel};