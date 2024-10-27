const mysql = require('mysql2');

datosConexion = 
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const connection = mysql.createPool(datosConexion);

connection.getConnection((error, connection) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release(); // Liberar la conexión una vez realizada la prueba
});

module.exports = connection;