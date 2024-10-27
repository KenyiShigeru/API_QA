
const conexion = require('../.env/conexion');
const { obtenerIdMax } = require('../utils/herramientas');
class Unidad{
    constructor(nom_unidad){
        this.nom_unidad = nom_unidad;
    }


}

class UnidadModel{
    constructor(){
        this.conexion = conexion;
    }

    async obtenerUnidades(){
        return new Promise((resolve, reject) => {
            this.conexion.execute('call  obtener_unidades', 
                (error, resultados) => {
                    if (error)
                    {
                        return reject(error);
                    }
                    resolve(resultados[0]);//Se agrega ese parametro de cero
                    //Por que si no me arroja datos de información de los campos
            })
        });
    }

    obtenerUnidadesPorId(id)
    {
        return new Promise((resolve, reject) => {
            let consultita = 'SELECT nom_unidad FROM unidad where id_unidad = ?';
            this.conexion.query(consultita,id, (error, resultados) => {
                if (error) {
                    return reject(error);
                };
                resolve(resultados);
            });
        });
    }

    async insertarUnidad(unidad)
    {
        try{
            return new Promise(async (resolve, reject)=>
            {
                let data = {
                    id_unidad: await obtenerIdMax('unidad'),
                    nom_unidad: unidad.nom_unidad
                };
                this.conexion.query(
                    'insert into unidad set ?',
                    data, (error, resultado) =>
                    {
                        if(error){
                            return reject(error)
                        }
                        resolve(resultado.insertId);
                    }
                )
            });
        }
        catch(error)
        {
            throw new Error("Error al insertar la unidad: " + error)
        }
    }
}

module.exports = {Unidad, UnidadModel};