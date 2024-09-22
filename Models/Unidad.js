const { resolve } = require('path');
const conexion = require('../.env/conexion');
const { rejects } = require('assert');
const { obtenerIdMax } = require('../utils/herramientas');
const { error } = require('console');
class Unidad{
    constructor(nom_unidad){
        this.nom_unidad = nom_unidad;
    }


}

class UnidadModel{
    constructor(){
        this.conexion = conexion;
    }

    obtenerUnidades(){
        return new Promise((resolve, reject) => {
            let consultita = 'SELECT * FROM unidad';
            this.conexion.query(consultita, (error, resultados) => {
                if (error) {
                    return reject(error);
                };
                resolve(resultados);
            });
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