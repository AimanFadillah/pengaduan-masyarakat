import Petugas from "../models/PetugasModel.js";
import Masyarakat from "../models/MasyarakatModel.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import Pesan from "../Traits/Pesan.js";

class AuthController {

    static async index (req,res) {
        return res.json(req.user);
    }

    static check (req,res,next) {
        const status = AuthController.verifikasi2(req,res,true);
        if(status !== "success") return res.sendStatus(404);
        return next();
    }

    static verifikasi(req,res) {
        if (req.cookies.login) {
            jwt.verify(req.cookies.login, process.env.JWT_TOKEN, (err, decoded) => {
                if(err) {
                    res.clearCookie("login")
                    return res.json("danger")
                }
                req.user = decoded.user;
                return res.json("success")
            })
        }else {
            return res.json("danger");
        }
    }

    static verifikasi2(req,res) {
        let status = "danger";
        if (req.cookies.login) {
            jwt.verify(req.cookies.login, process.env.JWT_TOKEN, (err, decoded) => {
                if(err) {
                    res.clearCookie("login")
                    return status = "danger"
                }
                req.user = decoded.user;
                return status = "success"
            })
            return status;
        }else {
            return status;
        }
    }


    static async login(req, res) {
        const data = req.body;

        const rules = Joi.object({
            name: Joi.required(),
            password: Joi.required(),
        });

        const validatedData = rules.validate(data)
        if (validatedData.error) return res.json(Pesan.pesanValidasi(validatedData.error));

        const petugas = req.query.type === "masyarakat" ? await Masyarakat.findOne({ where: { nik: data.name } }) : await Petugas.findOne({ where: { nama_petugas: data.name } })
        if (!petugas) return res.json(Pesan.pesanError("Name atau password salah"));

        const match = await bcrypt.compare(data.password, petugas.password);
        if (!match) return res.json(Pesan.pesanError("Name atau password salah"))

        const token = jwt.sign({ user:petugas }, process.env.JWT_TOKEN,{expiresIn: "1d"})
        
        res.cookie("login",token,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        
        return res.json(Pesan.pesanSuccess(petugas));
    }

    static async logout (req,res){
        res.clearCookie("login");
        return res.json(Pesan.pesanSuccess);
    }

}

export default AuthController; 