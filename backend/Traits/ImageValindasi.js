import {v4} from "uuid";
import path from "path";

function ImageValindasi (req,namaGambar,letak = "images",allowedType = [".jpg",".jpeg",".png"],size = 5000000) {

    let foto;

    try{
        foto = req.files[namaGambar]  
    }catch (e) {
        return {status:"danger",value:"Tidak ada Gambar"}
    }

    const ext = path.extname(foto.name);
    const fileSize = foto.data.length;
    const fileName = v4() + ext;
    const url = `${req.protocol}://${req.get("host")}/${letak}/${fileName}`

    if(!allowedType.includes(ext.toLocaleLowerCase())){return {status:"danger",value:"Yang Diupload bukan gambar"}}
    if(fileSize > size){ return {status:"danger",value:"Gambar maksimal 5 mb"}}

    foto.mv(`./public/${letak}/${fileName}/`)

    return {
        status:"success",
        value:{
            url:url,
            fileName:fileName,
        }
    }
}

export default ImageValindasi;