import express from "express";
import fileUpload from "express-fileupload";
import Route from "./routes/Route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express()
const port = 5000;

dotenv.config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"))
app.use(cookieParser());
app.use(Route)

app.listen(port, () => console.log(`serve berjalan di http://localhost:${port}`))

