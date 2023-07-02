

const e = require("express");
const tarifModel =require("./tarif-model");


async function validateTarifId (req,res,next){
    try{
        const existTarif = await tarifModel.idyeGöreTarifGetir(req.param.id);
        if(!existTarif){
            res.status(404).json({message:"Tarif yok"})
        }else{
            req.existTarif = existTarif;
            next();
        }
    }catch(error){
        next(error);
    }
}


module.exports={
    validateTarifId

}