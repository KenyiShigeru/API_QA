const conexion = require('../.env/conexion');

class Clasificacion{
    constructor(nom_clasificacion, des_clasificacion)
    {
        this.nom_clasificacion = nom_clasificacion;
        this.des_clasificacion = des_clasificacion;
    }
}

class ClasificacionModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    async obtenerClasificaciones()
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call  consulta_clasificacion("")', 
                (error, resultados) => {
                    if (error)
                    {
                        return reject(error);
                    }
                    resolve(resultados[0]);
            })
        });
    }


    async insertarClasificacion(clasificacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'CALL agg_clasificacion(?, ?)', 
                clasificacion,
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultados[0]);
                }
            );
        });
    }

    async modificarClasificacion(clasificacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'CALL modificar_clasificaciones(?, ?, ?, ?)', 
                clasificacion,
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultados[0]);
                }
            );
        });
    }
}

module.exports = {Clasificacion, ClasificacionModel}