const conexion = require('../.env/conexion');
class AcabCotizacionModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerAcabCotizacion(id)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_acab_cotizacion(?)',[id], (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            })
        });
    }

    agregarAcabCotizacion(acab_cotizacion)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call agg_acab_cotizacion(?,?)', acab_cotizacion, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados[0]);
            }
            );
        });
    }
}

module.exports = {AcabCotizacionModel};