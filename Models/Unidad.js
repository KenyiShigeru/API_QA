
const conexion = require('../.env/conexion');
const { obtenerIdMax } = require('../utils/herramientas');
class Unidad{
    constructor(nom_unidad, descripcion){
        this.nom_unidad = nom_unidad;
        this.descripcion = descripcion;
    }


}

class UnidadModel{
    constructor(){
        this.conexion = conexion;
    }

    async obtenerUnidades(){
        return new Promise((resolve, reject) => {
            this.conexion.execute('call  consulta_unidad("")', 
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

    async insertarUnidad(unidad)
    {
        try{
            return new Promise(async (resolve, reject)=>
            {
                this.conexion.execute(
                    'CALL agg_unidad(?, ?)', 
                    unidad,
                    (error, resultados) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(resultados[0]);
                    }
                );
            });
        }
        catch(error)
        {
            throw new Error("Error al insertar la unidad: " + error)
        }
    }

    async modificarUnidad(unidad)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'CALL mod_unidad(?,?,?)', 
                unidad,
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

module.exports = {Unidad, UnidadModel};