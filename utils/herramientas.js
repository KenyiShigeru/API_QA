const conexion = require('../.env/conexion');
async function obtenerIdMax(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT MAX(id_' + tabla + ') as maxId FROM ' + tabla, (error, resultado) => {
            if (error) {
                return reject(error); // Rechazamos la promesa si hay un error
            }

            // Calculamos el nuevo ID
            let nuevoId;
            if (resultado[0].maxId === null) {
                nuevoId = 1; // Si no hay registros, el nuevo ID es 1
            } else {
                nuevoId = parseInt(resultado[0].maxId) + 1;
            }

            resolve(nuevoId); // Resolvemos la promesa con el nuevo ID
        });
    });
}

module.exports = {obtenerIdMax}
