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
            let consultita = 'SELECT * FROM Proceso';
            this.conexion.query(consultita, (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados);
            });
        });
    }

    obtenerProcesosPorID(id)
    {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Proceso WHERE id_proceso = ?', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0] || null);
            });
        });
    }


}