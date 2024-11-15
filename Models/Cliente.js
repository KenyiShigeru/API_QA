const conexion = require('../.env/conexion');

class ClienteModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    // Crea un cliente mediante el procedimiento almacenado
    async insertarCliente(cliente) 
    {
        
        return new Promise((resolve, reject) => {
            
            this.conexion.execute(
                'CALL agg_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                cliente,
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    //console.log(results[0][0].id_registrado);
                    resolve(results[0][0]);
                }
            );
        });
    }

    // Obtiene todos los clientes

    async obtenerClientes() {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_cliente("")',
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }

    async obtenerClientesId(id) {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call consulta_cliente_ID(?)',
                [id],
                (error, results) =>{
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            )
        });
    }
    
    //Modifica el cliente
    async modificarCliente(cliente) {
        return new Promise((resolve, reject) => {
            this.conexion.execute(
                'CALL modificar_clientes(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', 
                [
                    cliente.id,
                    cliente.nombre,
                    cliente.apellidopaterno,
                    cliente.apellidomaterno,
                    cliente.rutaconstancia,
                    cliente.rfc,
                    cliente.nomnegocio,
                    cliente.domicilio,
                    cliente.telWP,
                    cliente.telFJ,
                    cliente.correo,
                    cliente.tpCliente
                ],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            );
        });
    }

    //Elimina el cliente
}

module.exports = {ClienteModel};