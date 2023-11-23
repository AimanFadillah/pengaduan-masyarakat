import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login () {
    const [type,setType] = useState("masyarakat");

    async function loginPetugas (e) {
        e.preventDefault()
        const data = new FormData(e.target);
        const response = await axios.post(`http://localhost:5000/login?type=${type}`,data,{withCredentials:true})
        if(response.data.status !== "success") return alert(response.data.msg);
        response.data.msg.nik ? response.data.msg.level = "masyarakat" : undefined
        localStorage.setItem("user",JSON.stringify(response.data.msg));
        window.location.href = "/"
    }

    return <>
        <div className="container" style={{ marginTop:"100px" }} >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    
                    <form onSubmit={loginPetugas}>
                    <div className="bg-dasar p-3 rounded shadow">
                        <h1 className="text-center" >Login</h1>
                        <div className="btn-group my-3 shadow" style={{ width:"100%" }}  >
                            <button type="button" onClick={() => setType("masyarakat")} className={`btn ${type === "masyarakat" ? "btn-primary" : "btn-light" }`}>Masyarakat</button>
                            <button type="button" onClick={() => setType("petugas")} className={`btn ${type === "petugas" ? "btn-primary" : "btn-light" }`}>Petugas</button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">{type === "petugas" ? "Nama" : "Nik"}</label>
                            <input type="text" required name="name" className="form-control" id="nama" placeholder="Masukkan nama"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input type="password" required name="password" className="form-control" id="Password" placeholder="Masukkan Password"/>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-success shadow" style={{ width:"100%" }} >Masuk</button>
                        </div>
                        <div className={`text-center mt-3 ${type == "masyarakat" ? "" : "d-none"} `}>
                            <h6>Jika Belum Punya akun bisa <span className="text-info" >Register</span></h6>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}