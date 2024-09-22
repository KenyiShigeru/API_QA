const conexion = require('../.env/conexion');

class Clasificacion{
    constructor(nom_clasificacion)
    {
        this.nom_clasificacion = nom_clasificacion;
    }
}

class ClasificacionModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerClasificaciones()
    {

    }

    obtenerClasificacionesPorId()
    {

    }

    async insertarClasificacion(clasificacion)
    {

    }
}

module.exports = {Clasificacion, ClasificacionModel}