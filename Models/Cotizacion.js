const conexion = require('../.env/conexion');


class CotizacionModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerCotizaciones()
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_cotizacion("")', (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            })
        });
    }

    obtenerCotizacionesId(id)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_cotizacion_ID(?)', 
                [id],
                (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            })
        });
    }

    async insertarCotizacion(cotizacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call agg.cotizacion(?,?,?,?,?,?,?,?,?,?)', cotizacion, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            }
            );
        });
    }

    async modificarCotizacion(cotizacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call modificar_cotizaciones(?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)', cotizacion, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            }
            );
        });
    }

    async borrarCotizacion(cotizacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('update cotizacion set eliminacion = 0 where id_cotizacion = ?', cotizacion, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            }
            );
        });
    }

}

module.exports = {CotizacionModel};