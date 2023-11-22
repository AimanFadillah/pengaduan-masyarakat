import Petugas from "../models/PetugasModel.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import Pesan from "../Traits/Pesan.js";

class AuthController {

     static verifikasi(req, res, next) {
            if (req.cookies.login) {
            jwt.verify(req.cookies.login, process.env.JWT_TOKEN, (err, decoded) => {
                if(err) {
                    res.clearCookie("login")
                    return res.json("danger");
                }
                req.id = decoded.id;
                return res.json("success");
            })
        }else res.json("danger");
    }


    static async login(req, res) {
        const data = req.body;

        const rules = Joi.object({
            name: Joi.required(),
            password: Joi.required(),
        });

        const validatedData = rules.validate(data)
        if (validatedData.error) return res.json(Pesan.pesanValidasi(validatedData.error));

        const petugas = await Petugas.findOne({ where: { nama_petugas: data.name } })
        if (!petugas) return res.json(Pesan.pesanError("Name atau password salah"));

        const match = await bcrypt.compare(data.password, petugas.password);
        if (!match) return res.json(Pesan.pesanError("Name atau password salah"))

        const id = petugas.id_petugas;
        const token = jwt.sign({ id: id }, process.env.JWT_TOKEN, {
            expiresIn: "1d",
        })
        
        res.cookie("login",token,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        
        return res.json(Pesan.pesanSuccess());
    }

    static async logout (req,res){
        res.clearCookie("login");
        return res.json(Pesan.pesanSuccess);
    }

}

export default AuthController; 