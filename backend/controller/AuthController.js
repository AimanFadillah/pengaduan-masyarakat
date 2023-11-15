import Petugas from "../models/PetugasModel.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import Pesan from "../Traits/Pesan.js";

class AuthController {

    static index(req, res) {
        const { login } = req.cookies;
        if(login){
            return res.redirect("/")
        }
        return res.render("login")
    }

    static verifikasi(req, res, next) {
        const { login } = req.cookies;
        if (login) {
            jwt.verify(login, process.env.JWT_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie("login");
                    return res.redirect("/login");
                };
                req.id = decoded.id;
                next()
            })
        } else {
            res.clearCookie("login");
            return res.redirect("/login");
        }
    }


    static async login(req, res) {
        const data = req.body;
        const rules = Joi.object({
            name: Joi.required(),
            password: Joi.required(),
        });

        const validatedData = rules.validate(data)
        if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

        const petugas = await Petugas.findOne({ where: { nama_petugas: data.name } })
        if (!petugas) return res.json({ msg: "Name atau Password salah",status:"danger" });

        const match = await bcrypt.compare(data.password, petugas.password);
        if (!match) return res.json({ msg: "Name atau Password salah",status:"danger" })

        const id = petugas.id_petugas;
        const token = jwt.sign({ id: id }, process.env.JWT_TOKEN, {
            expiresIn: "1d",
        })
        res.cookie("login", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        return res.json(Pesan.pesanSuccess());
    }

    static async logout (req,res){
        res.clearCookie("login");
        return res.redirect("/login");
    }

}

export default AuthController; 