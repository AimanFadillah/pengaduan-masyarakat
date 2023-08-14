import Masyarakat from "../models/MasyarakatModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";

class MasyarakatController {
    async index(req, res) {
        const data = await Masyarakat.findAll();
        return res.json(data);
    }

    async store(req, res) {
        const data = req.body;

        const rules = Joi.object({
            nik: Joi.required(),
            nama: Joi.required(),
            username: Joi.required(),
            password: Joi.required(),
            telp: Joi.number().required(),
        });

        const validatedData = rules.validate(data);
        if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

        if((data.nik).includes(" ")){
            return res.json({msg:"Nik tidak boleh ada space"})
        }

        const hasil = await bcrypt.hash(data.password, 10)

        try {
            data.password = hasil;
            await Masyarakat.create(data);
        } catch (e) {
            return res.json({ msg: "Nik tidak unique" })
        }

        return res.json({ msg: "success" });
    }

    async update(req, res) {
        const data = req.body;
        const masyarakat = await Masyarakat.findOne({ where: { nik: req.params.id } })

        if (!masyarakat) return res.json({ msg: "Tidak ada masyarakat" });

        const rules = Joi.object({
            nama:Joi.required(),
            username:Joi.required(),
            telp:Joi.required(),
        });

        const validatedData = rules.validate(data);
        if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

        await Masyarakat.update(data,{where:{nik:masyarakat.nik}});

        return res.json({msg:"success"});
    }

    async destroy(req, res) {
        const masyarakat = await Masyarakat.findOne({ where: { nik: req.params.id } });

        if (!masyarakat) return res.json({ msg: "Tidak ada masyarakat" });

        await Masyarakat.destroy({ where: { nik: masyarakat.nik } });

        return res.json({ msg: "success" });
    }

}

export default MasyarakatController;

