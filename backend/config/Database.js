import { Sequelize } from "sequelize";

const db = new Sequelize("pengaduan_masyarakat","root","",{
    host:"localhost",
    dialect:"mysql",
})

export default db;