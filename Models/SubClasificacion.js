const conexion = require('../.env/conexion');
const {obtenerIdMax} = require('../utils/herramientas');
class Subclasificacion
{
    constructor(nom_subclasificacion)
    {
        this.nom_subclasificacion = nom_subclasificacion;
    }
}

class SubclasificacionModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerSubclasificaciones()
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_subclasificacion("")', 
                (error, resultados) => {
                if (error) {    
                    return reject(error);
                }    
                resolve(resultados[0]); 
            })
        });
    }

    async insertarSubclasificacion(subclasificacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'CALL agg_subclasificacion(?, ?)', 
                subclasificacion,
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultados[0]);
                }
            )
        });
    }


    async modificarSubclasificacion(subclasificacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'CALL modificar_subclasificaciones(?, ?, ?, ?)', 
                subclasificacion,
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultados[0]);
                }
            )
        });
    }

}

module.exports = {Subclasificacion, SubclasificacionModel};