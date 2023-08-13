import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pengaduan from "./PengaduanModel.js";
import Petugas from "./PetugasModel.js";

const {DataTypes} = Sequelize;

const Tanggapan = db.define("tanggapan",{
    id_tanggapan:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey:true,
    },
    tgl_tanggapan:DataTypes.DATE,
    tanggapan:DataTypes.TEXT,
})

Tanggapan.belongsTo(Pengaduan,{
    foreignKey:"id_pengaduan",
    onDelete:"CASCADE"
})

Pengaduan.hasMany(Tanggapan, {
    foreignKey: "id_pengaduan"
})

Tanggapan.belongsTo(Petugas,{
    foreignKey:"id_petugas",
})

Petugas.hasMany(Tanggapan,{
    foreignKey:"id_petugas"
})

await Tanggapan.sync();



export default Tanggapan;