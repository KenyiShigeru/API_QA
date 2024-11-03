const conexion = require('../.env/conexion');
const {obtenerIdMax} = require('../utils/herramientas');

class Material_Produccion
{
    constructor(id_tpmaterial,nom_material_produccion, medida_material, proveedor)
    {

        this.id_tpmaterial = id_tpmaterial;
        this.nom_material_produccion = nom_material_produccion;
        this.medida_material = medida_material;
        this.proveedor = proveedor;
    }
}

class Material_ProduccionModel 
{

    constructor() 
    {
        this.connection = conexion;
    }

    obtenerMaterial_Produccion()
    {
        return new Promise((resolve, reject) => {
            this.connection.query('call consulta_material_produccion("")', (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }

    insertarMaterial_Produccion(material_produccion)
    {
        try{
            return new Promise(async (resolve, reject)=>
            {
                this.conexion.execute(
                    'CALL agg_material_produccion(?, ?, ?, ?, ?)', 
                    material_produccion,
                    (error, resultados) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(resultados[0]);
                    }
                );
            });
        }
        catch(error)
        {
            throw new Error("Error al insertar la unidad: " + error)
        }
    }

    modificarMaterial_Produccion(material_produccion)
    {
        return new Promise((resolve, reject) => {
            this.connection.execute('call mod_mat_prod(?,?,?,?,?,?,?)', material_produccion, (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado[0]);
            });
        });
    }

    /*obtenerMaterial_ProduccionPorId(id)
    {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Material_Produccion WHERE id_tpmaterial = ?', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0] || null);
            });
        });
    }*/

    obtenerMedidaMaterial(id)
    {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT medida_material FROM Material_Produccion WHERE id_tpmaterial = ?', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0] || null);
            });
        });
    }

    obtenerProveedores(id)
    {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT proveedor FROM Material_Produccion WHERE id_tpmaterial = ?', [id], (error, resultados) => {
                if (error) return reject(error);
                resolve(resultados[0] || null);
            });
        });
    }


}

module.exports = {Material_Produccion, Material_ProduccionModel}; // Exportamos el modelo Material_ProduccionModel