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

    
}