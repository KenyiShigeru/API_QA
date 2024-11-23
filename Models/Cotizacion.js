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


    async insertarCotizacion(cotizacion) {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'call agg_cotizacion(?,?,?,?,?,?,?,?,?,?)',
                cotizacion,
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
    
                    // Ejecutamos una segunda consulta para obtener el último ID
                    this.conexion.execute(
                        'SELECT id_cotizacion FROM cotizacion ORDER BY id_cotizacion DESC LIMIT 1;',
                        (error, resultados) => {
                            if (error) {
                                return reject(error);
                            }
    
                            const idCotizacion = resultados[0].id_cotizacion;
                            resolve(idCotizacion);
                        }
                    );
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