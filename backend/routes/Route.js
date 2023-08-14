import express from "express";
import MasyarakatController from "../controller/MasyarakatController.js";
import PengaduanController from "../controller/PengaduanController.js";
import PetugasController from "../controller/PetugasController.js";
import TanggapanController from "../controller/TanggapanController.js";

const Route = express.Router()

Route.get("/",new MasyarakatController().index); 

Route.get("/masyarakat",new MasyarakatController().index);
Route.post("/masyarakat",new MasyarakatController().store);
Route.put("/masyarakat/:id/",new MasyarakatController().update);
Route.delete("/masyarakat/:id/",new MasyarakatController().destroy);

Route.get("/pengaduan",new PengaduanController().index); 
Route.post("/pengaduan",new PengaduanController().store); 
Route.put("/pengaduan/:id/",new PengaduanController().update);
Route.delete("/pengaduan/:id/",new PengaduanController().destroy);

Route.get("/petugas",new PetugasController().index);
Route.post("/petugas",new PetugasController().store);
Route.delete("/petugas/:id/",new PetugasController().destroy);

Route.get("/tanggapan",new TanggapanController().index);
Route.post("/tanggapan",new TanggapanController().store);
Route.put("/tanggapan/:id/",new TanggapanController().update);
Route.delete("/tanggapan/:id/",new TanggapanController().destroy);

export default Route;