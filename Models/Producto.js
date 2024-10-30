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
            this.connection.execute('call obtener_productos', (error, resultados) => {
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
            this.connection.execute('call modificar_productos(?,?,?,?,?,?,?,?,?)', producto, (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            })
        });
    }
    
    
}

module.exports = { Producto, ProductoModel };
