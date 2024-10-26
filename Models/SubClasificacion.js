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
        try
        {
            let nuevoId = await obtenerIdMax('subclasificaciones');
            return new Promise((resolve, reject) => {
                this.conexion.query('INSERT INTO subclasificaciones SET ?', 
                    {
                        id_subclasificacion: nuevoId, 
                        nom_subclasificacion: subclasificacion.nom_subclasificacion
                    }, (error, resultado) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultado.insertId);
                });
            });
        }
        catch (error)
        {
            throw new Error("Error al insertar la subclasificación: " + error);
        }
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

module.exports = {Subclasificacion, SubclasificacionModel}