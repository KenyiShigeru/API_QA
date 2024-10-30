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
            this.conexion.execute('call obtener_procesos', (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    

}

module.exports = {Proceso, ProcesoModel};