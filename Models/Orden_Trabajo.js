const conexion = require('../.env/conexion');
class Orden_Trabajo
{
    constructor()
    {
        this.conexion = conexion;
    }

    async obtenerOrdenesTrabajo() {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_ordentrabajo("")',
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }

    async obtenerOrdenesTrabajoId(id) {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_ordentrabajo_ID(?)',[id],
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }

    async obtenerOrdenesTrabajoPagadas(id) {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_pagoOrdenTrabajo(?)',[id],
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }
}

module.exports = {Orden_Trabajo};