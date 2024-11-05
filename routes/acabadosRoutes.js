const express = require('express');
const router = express.Router();
var {AcabadosModel} = require('../Models/Acabados');
const acabadosModel = new AcabadosModel();

//Zona de los acabados
router.get('/',async (req,res)=>{
    try{
        const acabados = await acabadosModel.obtenerAcabados();
        res.send(acabados);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


router.post('/acabados/:nom_acabados/:des_acabados', async (req, res)=>{
    try{
        const resultado = await acabadosModel.insertarAcabado(
            [ 
                req.params.nom_acabados, 
                req.params.des_acabados
            ]
        );
        res.status(201).json({message:'Agregado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al ingresar el acabado'});
    }
});

//

router.put('/acabados/:id/:nom_acabados/:des_acabados', async (req, res)=>{
    try{
        const resultado = await acabadosModel.modificarAcabado(
            [
                req.params.id, 
                req.params.nom_acabados, 
                req.params.des_acabados,
                1
            ]
        );
        res.status(201).json({message:'Modificado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al modificar el acabado'});
    }
});

router.delete('/acabados/:id/:nom_acabados/:des_acabados', async (req, res)=>{
    try{
        const resultado = await acabadosModel.modificarAcabado(
            [
                req.params.id, 
                req.params.nom_acabados, 
                req.params.des_acabados,
                0
            ]
        );
        res.status(200).json({message:'Modificado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al modificar el acabado'});
    }
});

module.exports = router;