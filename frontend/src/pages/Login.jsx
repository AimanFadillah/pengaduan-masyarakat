import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login () {
    const [type,setType] = useState("masyarakat");
    const [register,setRegister] = useState(false);

    async function loginPetugas (e) {
        e.preventDefault()
        const data = new FormData(e.target);
        const response = await axios.post(`http://localhost:5000/login?type=${type}`,data,{withCredentials:true})
        if(response.data.status !== "success") return alert(response.data.msg);
        response.data.msg.nik ? response.data.msg.level = "masyarakat" : undefined
        localStorage.setItem("user",JSON.stringify(response.data.msg));
        window.location.href = "/"
    }

    async function registerMasyarakat (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const response = await axios.post("http://localhost:5000/masyarakat",data)
        if(response.data.msg !== "success") return alert(response.data.msg);
        setRegister(false);
        e.target.reset();
    }

    return <>
        <div className="container" style={{ marginTop:"30px" }} >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={register ? registerMasyarakat: loginPetugas}>
                        {!register ? 
                        <div className="bg-dasar p-3 rounded shadow">
                            <h1 className="text-center" >Login</h1>
                            <div className="btn-group my-3 shadow" style={{ width:"100%" }}  >
                                <button type="button" onClick={() => setType("masyarakat")} className={`btn ${type === "masyarakat" ? "btn-primary" : "btn-light" }`}>Masyarakat</button>
                                <button type="button" onClick={() => setType("petugas")} className={`btn ${type === "petugas" ? "btn-primary" : "btn-light" }`}>Petugas</button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">{type === "petugas" ? "Nama" : "Nik"}</label>
                                <input type="text" required name="name" className="form-control" id="nama" placeholder={`Masukkan ${type === "petugas" ? "Nama" : "Nik"}`}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input type="password" required name="password" className="form-control" id="Password" placeholder="Masukkan Password"/>
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-success shadow" style={{ width:"100%" }} >Masuk</button>
                            </div>
                            <div className={`text-center mt-3 ${type == "masyarakat" ? "" : "d-none"} `}>
                                <h6>Jika Belum Punya akun bisa <span className="text-info" onClick={() => setRegister(true)} >Register</span></h6>
                            </div>
                        </div>
                        :
                        <div className="bg-dasar p-3 rounded shadow">
                            <h1 className="text-center" >Register</h1>
                            <div className="mb-3">
                                <label htmlFor="nik" className="form-label">Nik</label>
                                <input type="number" required name="nik" className="form-control" id="nik" placeholder="Masukkan nik"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">Nama</label>
                                <input type="text" required name="nama" className="form-control" id="nama" placeholder="Masukkan nama"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" required name="username" className="form-control" id="username" placeholder="Masukkan username"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" required name="password" className="form-control" id="password" placeholder="Masukkan password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telp" className="form-label">Telp</label>
                                <input type="text" required name="telp" className="form-control" id="telp" placeholder="Masukkan telp"/>
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-success shadow" style={{ width:"100%" }} >Masuk</button>
                            </div>
                            <div className={`text-center mt-3 ${type == "masyarakat" ? "" : "d-none"} `}>
                                <h6>Kalau sudah punya akun <span className="text-info" onClick={() => setRegister(false)} >Login</span></h6>
                            </div>
                        </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    </>
}