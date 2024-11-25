const conexion = require('../.env/conexion');

class FormaPagoModel
{
    constructor()
    {
        this.conexion = conexion;
    }

    obtenerFormasPagos()
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                this.conexion.execute('call consulta_formaPago("")', (error, resultados) =>
                {
                    if (error) return reject(error);
                    resolve(resultados[0]);
                });
            }
            catch (error)
            {
                reject(error);
            }
        });
    }

    obtenerFormasPagosId(id)
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                this.conexion.execute('call consulta_formaPagoID(?)', 
                    [id],
                    (error, resultados) =>
                {
                    if (error) return reject(error);
                    resolve(resultados[0]);
                });
            }
            catch (error)
            {
                reject(error);
            }
        });
    }

    insertarFormaPago(forma)
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                this.conexion.execute('call agg_formaPago(?, ?)', forma, (error, resultados) =>
                {
                    if (error) return reject(error);
                    resolve(resultados[0]);
                });
            }
            catch (error)
            {
                reject(error);
            }
        });
    }

    modificarForma_Pago(forma)
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                this.conexion.execute('call modificar_formaPago(?, ?, ?, ?)', forma, (error, resultados) =>
                {
                    if (error) return reject(error);
                    resolve(resultados[0]);
                });
            }
            catch (error)
            {
                reject(error);
            }
        });
    }

    borrarForma_Pago(forma)
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                this.conexion.execute('call baja_formaPago(?)', [forma], (error, resultados) =>
                {
                    if (error) return reject(error);
                    resolve(resultados[0]);
                });
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
}

module.exports = {FormaPagoModel};