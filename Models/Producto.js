// producto.js
const conexion = require('../.env/conexion'); // Ajusta la ruta según tu estructura
const obtenerId = require('../utils/herramientas')

//No tiene el id porque debe ser identity
class Producto {
    constructor(id_clasificacion, id_subclasificacion, id_tpMaterial, id_unidad, apl_inst, precio1_sin_s, precio2_con_s, precio3_sin_c, precio4_con_c, observaciones) {
        this.id_clasificacion = id_clasificacion;
        this.id_subclasificacion = id_subclasificacion;
        this.id_tpMaterial = id_tpMaterial;
        this.id_unidad = id_unidad;
        this.apl_inst = apl_inst;
        this.precio1_sin_s = precio1_sin_s;
        this.precio2_con_s = precio2_con_s;
        this.precio3_sin_c = precio3_sin_c;
        this.precio4_con_c = precio4_con_c;
        this.observaciones = observaciones;
    }
}

class ProductoModel {
    constructor() {
        this.connection = conexion;
    }

    obtenerProductos() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Producto', (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados);
            });
        });
    }

    obtenerProductoPorId(id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Producto WHERE id_Producto = ?', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0] || null);
            });
        });
    }

    async insertarProducto(producto) {
        try {
            // Obtenemos el nuevo ID utilizando await
            let nuevoId = await obtenerId.obtenerIdMax('producto');
    
            // Luego insertamos el nuevo producto con los valores proporcionados
            return new Promise((resolve, reject) => {
                this.connection.query(
                    'INSERT INTO Producto ' +
                    '(id_Producto, id_clasificacion, id_subclasificacion, id_tpMaterial, ' +
                    'id_unidad, apl_inst, precio1_sin_s, precio2_con_s, ' +
                    'precio3_sin_c, precio4_con_c, observaciones) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                    nuevoId,  // Aquí insertamos el nuevo ID
                    producto.id_clasificacion,
                    producto.id_subclasificacion,
                    producto.id_tpMaterial,
                    producto.id_unidad,
                    producto.apl_inst,
                    producto.precio1_sin_s,
                    producto.precio2_con_s,
                    producto.precio3_sin_c,
                    producto.precio4_con_c,
                    producto.observaciones
                ], (error, resultado) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultado.insertId); // Devolvemos el id insertado
                });
            });
        } catch (error) {
            throw new Error("Error al insertar el producto: " + error);
        }
    }
    
    
}

module.exports = { Producto, ProductoModel };
