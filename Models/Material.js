const conexion = require('../.env/conexion');
const {obtenerIdMax} = require('../utils/herramientas');

class Material
{
    constructor(nombreMaterial)
    {
        this.nombreMaterial = nombreMaterial;
    }
}

class MaterialModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    //Crea un nuevo Material
    insertarMaterial(material)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call agg_material(?, ?)', material, (error, resultados) =>
            {
                if (error)  
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    //Obtiene todos los materiales
    obtenerMateriales()
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call consulta_material("")', (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    obtenerMaterialesId(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call consulta_material_ID(?)', 
                [id],
                (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    //Modifica un material
    modificarMaterial(material)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call modificar_material(?, ?, ?)', material, (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }

    //Elimina un material
    borrarMaterial(material)
    {
        return new Promise((resolve, reject) =>
        {
            this.conexion.execute('call baja_material(?)', [material], (error, resultados) =>
            {
                if (error)
                {
                    return reject(error);
                }
                resolve(resultados[0]);
            });
        });
    }
}

module.exports = {Material, MaterialModel};