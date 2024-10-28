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
            let consultita = 'SELECT * FROM subclasificaciones';
            this.conexion.query(consultita, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados);
            });
        });
    }

    async insertarSubclasificacion(subclasificacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'CALL agg_subclasificacion(?)', 
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
            this.conexion.query('UPDATE subclasificaciones SET ? WHERE id_subclasificacion = ?', [subclasificacion, subclasificacion.id_subclasificacion], (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados);
            });
        });
    }

}

module.exports = {Subclasificacion, SubclasificacionModel};