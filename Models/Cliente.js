const conexion = require('../.env/conexion');


class Cliente
{
    constructor(nom_cliente, apPaterno, apMaterno, tpCliente
        , cons_fiscal, rfc_cliente, nombreNegocio, domcilio, telefonowp, telefonofijo, email,tipoCliente)
    {
        this.nom_cliente = nom_cliente;
        this.apPaterno = apPaterno;
        this.apMaterno = apMaterno;
        this.tpCliente = tpCliente;
        this.cons_fiscal = cons_fiscal;
        this.rfc_cliente = rfc_cliente;
        this.nombreNegocio = nombreNegocio;
        this.domcilio = domcilio;
        this.telefonowp = telefonowp;
        this.telefonofijo = telefonofijo;
        this.email = email;
        this.tipoCliente = tipoCliente;
    }
}

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
                'CALL agg_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                [
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
                    cliente.tpCliente,
                    0
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

    // Obtiene todos los clientes

    async obtenerClientes() {
        return new Promise((resolve, reject) => {
            this.conexion.execute('call obtenerClientes',
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

    //Elimina el cliente
}

module.exports = {Cliente, ClienteModel};