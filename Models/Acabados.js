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

    /*darBajaAcabado(acabado)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('', acabado, (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }*/
}

module.exports = {AcabadosModel};