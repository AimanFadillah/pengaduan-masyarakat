import Petugas from "../models/PetugasModel.js";
import Joi from "joi";

class PetugasController {

    async index (req,res) {
        const data = await Petugas.findAll();
        return res.json(data);
    }

    async store (req,res) {

        const data = req.body;

        const rules = Joi.object(
            
        )

    }


}

export default PetugasController;