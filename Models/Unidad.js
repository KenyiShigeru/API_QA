const conexion = require('../.env/conexion');
class Unidad{
    constructor(nom_unidad){
        this.nom_unidad 
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

    obtenerUnidadesPorId(id){
        return new Promise((resolve, reject) => {
            let identificador = parseInt(id);
            let consultita = 'SELECT nom_unidad FROM unidad where id_unidad = ?';
            this.conexion.query(consultita,id, (error, resultados) => {
                if (error) {
                    return reject(error);
                };
                resolve(resultados);
            });
        });
    }
}

module.exports = {Unidad, UnidadModel};