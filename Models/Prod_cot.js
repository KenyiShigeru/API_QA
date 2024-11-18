const conexion = require("../.env/conexion");
class Prod_cotModel {
    constructor() {
        this.conexion = conexion;
    }
    obtenerProductosCot() {
        return new Promise((resolve, reject) => {
            this.conexion.execute('select * from prod_cotizacion', (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }
}
module.exports = {Prod_cotModel};