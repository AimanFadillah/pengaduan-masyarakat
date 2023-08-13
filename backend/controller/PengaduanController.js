import Pengaduan from "../models/PengaduanModel.js";
import Joi from "joi";
import ImageValindasi from "../Traits/ImageValindasi.js";
import fs from "fs";

class PengaduanController {

    static rules = {
        tgl_pengaduan : Joi.date().required(),
        nik : Joi.required(),
        isi_laporan : Joi.required(),
        status:Joi.required().valid("proses","selesai","0"), 
    };

    async index (req,res) {
        const data = await Pengaduan.findAll();
        return res.json(data);
    }

    async store (req,res){  

        const data = req.body;

        const rules = Joi.object(PengaduanController.rules)
        
        const ValidatedData = rules.validate(data);
        if(ValidatedData.error) return res.json({errors:ValidatedData.error.details[0].message.replace(/"/g, '')});

        const image = ImageValindasi(req,"foto") 

        if(image.status === "danger") return res.json({errors:image.value})
        
        data.url = image.value.url;
        data.foto = image.value.fileName;

        await Pengaduan.create(data);

        return res.json({msg:"success"}); 
    }

    async update (req,res) {
        const pengaduan = await Pengaduan.findOne({ where: { id_pengaduan:req.params.id } });

        const data = req.body;

        const rules = Joi.object(PengaduanController.rules); 

        const ValidatedData = rules.validate(data); 
        if(ValidatedData.error) return res.json({errors:ValidatedData.error.details[0].message.replace(/"/g, '')});

        let image;

        if(req.files){
            image = ImageValindasi(req,"foto");
            if(image.status === "danger") return res.json({errors:image.value})
            fs.unlinkSync(`./public/images/${pengaduan.foto}`)
            data.url = image.value.url;
            data.foto = image.value.fileName;
        }

        await Pengaduan.update(data,{where : { id_pengaduan:pengaduan.id_pengaduan }})

        return res.json({msg:"success"});
    }

    async destroy (req,res) {
        const pengaduan = await Pengaduan.findOne({ where : { id_pengaduan:req.params.id } })

        if(!pengaduan) return res.json({errors:"Tidak ada Data"});

        fs.unlinkSync(`./public/images/${pengaduan.foto}`)

        await Pengaduan.destroy({ where:{ id_pengaduan:pengaduan.id_pengaduan } });

        return res.json({msg:"success"})
    }

}


export default PengaduanController; 