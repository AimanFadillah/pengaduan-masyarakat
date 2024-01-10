import Petugas from "../models/PetugasModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import Pesan from "../Traits/Pesan.js";

class PetugasController {

    static async index (req,res) {
        const data = await Petugas.findAll({where:{level:"petugas"}});
        return res.json(data);
    }

    static async register (req,res){
        return res.render("registrasi")
    }

    static async store (req,res) {
        const data = req.body;

        const rules = Joi.object({
            nama_petugas:Joi.required(),
            username:Joi.required(),
            password:Joi.required(),
            confPassword:Joi.required(),
            telp:Joi.number().required(),
        })

        const validatedData = rules.validate(data);
        if(validatedData.error) return res.json(Pesan.pesanValidasi(validatedData.error));

        if(data.password !== data.confPassword) return res.json(Pesan.pesanError("Konfirmasi Password Salah"))

        data.level = "petugas";

        try{
            data.password = bcrypt.hashSync(data.password,10)
            await Petugas.create(data);
        }catch(e){
            return res.json(Pesan.pesanError("Nama sudah digunakan"))
        }
        
        return res.json(Pesan.pesanSuccess());
    }

    static async update (req,res) {
        const data = req.body;

        const rules = Joi.object({
            nama_petugas:Joi.required(),
            username:Joi.required(),
            telp:Joi.number().required(),
        })

        const validatedData = rules.validate(data);
        if(validatedData.error) return res.json(Pesan.pesanValidasi(validatedData.error));

        if(data.password !== data.confPassword) return res.json(Pesan.pesanError("Konfirmasi Password Salah"))

        try{
            await Petugas.update(data,{where:{ id_petugas:req.params.id}})
        }catch(e){
            return res.json(Pesan.pesanError("Nama sudah digunakan"))
        }
        
        return res.json(Pesan.pesanSuccess());
    }

    static async destroy (req,res) {
        const petugas = await Petugas.findOne({where:{ id_petugas:req.params.id }})

        if(!petugas) return res.json({msg:"tidak ada Petugas"});

        await Petugas.destroy({where : {id_petugas : petugas.id_petugas }});

        return res.json({msg:"success"});
    }

}

export default PetugasController;