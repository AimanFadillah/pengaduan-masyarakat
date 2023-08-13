import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import Route from "./routes/Route.js";

const app = express()
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(express.static("public"))
app.use(Route)

app.get("/",(req,res) => res.send("Masih pake api")) 

app.listen(port,() => console.log(`serve berjalan di http://localhost:${port}`))