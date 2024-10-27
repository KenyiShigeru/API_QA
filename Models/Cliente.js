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
    insertarCliente(cliente) 
    {
        return new Promise((resolve, reject) => {
            
            this.conexion.execute(
                'CALL agg_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', // Nombre del procedimiento y parámetros
                [
                    cliente.nom_cliente,
                    cliente.apPaterno,
                    cliente.apMaterno,
                    cliente.tpCliente,
                    cliente.cons_fiscal,
                    cliente.rfc_cliente,
                    cliente.nombreNegocio,
                    cliente.domcilio,
                    cliente.telefonowp,
                    cliente.telefonofijo,
                    cliente.email,
                    cliente.tipoCliente
                ],
                (error, results) => {
                    if (error) {
                        console.error('Error al ejecutar el procedimiento almacenado:', error);
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }

    // Obtiene todos los clientes
    
    //Modifica el cliente

    //Elimina el cliente
}

module.exports = {Cliente, ClienteModel};