// producto.js
const conexion = require('../.env/conexion'); // Ajusta la ruta según tu estructura

class ProductoModel {
    constructor() {
        this.connection = conexion;
    }

    obtenerProductos() {
        return new Promise((resolve, reject) => {
            this.connection.execute('select * from view_productos', (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    obtenerProductosId(id) {
        return new Promise((resolve, reject) => {
            this.connection.execute('call consulta_producto_ID(?)',
                [id],
                (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    obtenerProductosCotizacion(id) {
        return new Promise((resolve, reject) => {
            this.connection.execute('call consulta_productos_cotizacion(?)', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    obtenerProductosCot() {
        return new Promise((resolve, reject) => {
            this.connection.execute('select * from view_productos_cotizacion', 
                (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados);
            })
        });
    }

    obtenerProductosOrdenTrabajo(id) {
        return new Promise((resolve, reject) => {
            this.connection.execute('call consulta_productos_cotizacion(?)', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    async insertarProducto(producto) {
        try {
            
    
            // Luego insertamos el nuevo producto con los valores proporcionados
            return new Promise((resolve, reject) => {
                this.connection.execute('call agg_producto(?,?,?,?,?,?,?,?)', producto, (error, resultados) => {
                    if (error) return reject(error);
                    resolve(resultados[0]);
                })
            });
        } catch (error) {
            throw new Error("Error al insertar el producto: " + error);
        }
    }

    modificarProducto(producto) {
        return new Promise((resolve, reject) => {
            this.connection.execute('call modificar_producto(?,?,?,?,?,?,?,?,?)', producto, (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }
    
    eliminarProducto(id) {
        return new Promise((resolve, reject) => {
            this.connection.execute('call baja_producto(?)', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }

    agregarProductoCotizacion(producto) {
        return new Promise((resolve, reject) => {
            this.connection.execute('call agg_product_cotizacion(?,?,?,?,?,?,?)', 
                producto, 
                (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }
    
}

module.exports = {ProductoModel};
