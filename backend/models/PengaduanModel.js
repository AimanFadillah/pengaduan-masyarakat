import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pengaduan = db.define("pengaduan", {
    id_pengaduan: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true,
    },
    tgl_pengaduan: DataTypes.DATE,
    nik: DataTypes.STRING,
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.STRING,
})

await Pengaduan.sync();

export default Pengaduan;