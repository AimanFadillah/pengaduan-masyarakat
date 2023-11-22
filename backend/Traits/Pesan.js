class Pesan {
    static pesanSuccess(msg = "success") {
        return { "msg": msg, "status": "success" };
    }

    static pesanError(msg) {
        return { "msg": msg, "status": "danger" };
    }

    static pesanValidasi (error) {
        return {"msg":error.details[0].message.replace(/"/g, ''),"status":"danger"}
    }

    static pesanModel (error) {
        const pesan = error;
        return  { "msg": pesan, "status": "danger" };
    }

    static bodyNull (body = {}) {
        const keys = Object.keys(body);
        let check = false;

        keys.forEach(key => {
            if(body[key] === "") return check = `${key} tidak memiliki isi`;
        });

        return check;
    }

    static valindasiData (rules,body){
        let pesan = false;
        const validatedData = Joi.object(rules).validate(body);
        if(!body) return pesan = "Tidak ada data";
        if(validatedData.error) return pesan = Valindasi.pesanValidasi(validatedData);
        if(Valindasi.bodyNull(body)) return pesan = Valindasi.bodyRequired(body);
        return pesan;
    }
}

export default Pesan;