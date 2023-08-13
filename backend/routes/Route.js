import express from "express";
import MasyarakatController from "../controller/MasyarakatController.js";
import PengaduanController from "../controller/PengaduanController.js";
import PetugasController from "../controller/PetugasController.js";

const Route = express.Router()

Route.get("/",new MasyarakatController().index);  

Route.get("/pengaduan",new PengaduanController().index); 
Route.post("/pengaduan",new PengaduanController().store); 
Route.put("/pengaduan/:id/",new PengaduanController().update);
Route.delete("/pengaduan/:id/",new PengaduanController().destroy);

Route.get("/petugas",new PetugasController().index);

export default Route;