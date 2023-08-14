import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Masyarakat = db.define("masyarakat",{
    nik:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    nama:DataTypes.STRING,
    username:DataTypes.STRING,
    password:DataTypes.STRING,
    telp:DataTypes.STRING,
},{freezeTableName:true})

await Masyarakat.sync();

export default Masyarakat;