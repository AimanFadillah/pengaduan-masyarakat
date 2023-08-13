import Petugas from "../models/PetugasModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";

class PetugasController {

    async index (req,res) {
        const data = await Petugas.findAll();
        return res.json(data);
    }

    async store (req,res) {

        const data = req.body;

        const rules = Joi.object({
            nama_petugas:Joi.required(),
            username:Joi.required(),
            password:Joi.required(),
            telp:Joi.number().required(),
            level:Joi.valid("admin","petugas").required(),
        })

        const validatedData = rules.validate(data);
        if(validatedData.error) return res.json({msg:validatedData.error.details[0].message.replace(/"/g, '')});

        bcrypt.hash(data.password,10,async (error,hasil) => {
            data.password = hasil
            await Petugas.create(data);
        });

        return res.json({msg:"success"});
    }

    async destroy (req,res) {
        const petugas = await Petugas.findOne({where:{ id_petugas:req.params.id }})

        if(!petugas) return res.json({msg:"tidak ada Petugas"});

        await Petugas.destroy({where : {id_petugas : petugas.id_petugas }});

        return res.json({msg:"success"});
    }

}

export default PetugasController;