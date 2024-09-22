const conexion = require('../.env/conexion');
const {obtenerIdMax} = require('../utils/herramientas');

class Material
{
    constructor()
    {
    }
}

class MaterialModel
{
    constructor()
    {
        this.conexion =  conexion;
    }
}