const conexion = require("../.env/conexion");

class Proceso
{
    constructor(nombreProceso)
    {
        this.nombreProceso = nombreProceso;
    }

    toArray()
    {
        return Object.values(this);
    }
}

class ProcesoModel
{
    constructor()
    {
        this.conexion = conexion;
    }

    obtenerProcesos()
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_proceso("")', (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    obtenerProcesosId(id)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_proceso_ID(?)', 
                [id],
                (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    agregarProcesoCotizacion(proceso)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call agg_proc_cotizacion(?, ?)', proceso, (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    obtenerProcesosCotizacion(id)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_proc_cotizacion(?)',[id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    agregarProceso(proceso)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call agg_proceso(?, ?)', proceso, (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    modificarProceso(proceso)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call modificar_proceso(?, ?, ?)', proceso, (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    eliminarProceso(id)
    {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call baja_proceso(?)', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

}

module.exports = {Proceso, ProcesoModel};