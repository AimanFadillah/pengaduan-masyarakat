import express from "express";
import MasyarakatController from "../controller/MasyarakatController.js";
import PengaduanController from "../controller/PengaduanController.js";
import PetugasController from "../controller/PetugasController.js";
import TanggapanController from "../controller/TanggapanController.js";
import AuthController from "../controller/AuthController.js";

const Route = express.Router()

Route.get("/",AuthController.verifikasi,(req,res) => res.render("beranda"));
Route.get("/login",AuthController.index)
Route.get("/logout",AuthController.logout)
Route.post("/login",AuthController.login)
Route.get("/registrasi",PetugasController.index)
Route.post("/registrasi",PetugasController.store)

// Route.get("/masyarakat",MasyarakatController.index);
// Route.post("/masyarakat",MasyarakatController.store);
// Route.put("/masyarakat/:id/",MasyarakatController.update);
// Route.delete("/masyarakat/:id/",MasyarakatController.destroy);

// Route.get("/pengaduan",PengaduanController.index); 
// Route.post("/pengaduan",PengaduanController.store); 
// Route.put("/pengaduan/:id/",PengaduanController.update);
// Route.delete("/pengaduan/:id/",PengaduanController.destroy);

// Route.get("/registrasi",PetugasController.index);
// Route.post("/petugas",PetugasController.store);
// Route.delete("/petugas/:id/",PetugasController.destroy);

// Route.get("/tanggapan",TanggapanController.index);
// Route.post("/tanggapan",TanggapanController.store);
// Route.put("/tanggapan/:id/",TanggapanController.update);
// Route.delete("/tanggapan/:id/",TanggapanController.destroy);

export default Route;