const mysql = require('mysql');

datosConexion = 
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qualityart'
};

const connection = mysql.createConnection(datosConexion);

function conectar(error){
    if(error){
        console.error('Error al conectar a la base de datos',error);
        return;
    }
    console.log('Conexion a la base de datos creada correctamente');
}

connection.connect(conectar);

module.exports = connection;