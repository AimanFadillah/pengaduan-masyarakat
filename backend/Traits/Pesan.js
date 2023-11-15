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
        console.log(pesan);
        return  { "msg": pesan, "status": "danger" };
    }
}

export default Pesan;