import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login () {


    async function loginPetugas (e) {
        e.preventDefault()
        const data = new FormData(e.target);
        const response = await axios.post("http://localhost:5000/login",data,{withCredentials:true})
        if(response.data.status !== "success") return alert(response.data.msg);
        window.location.href = "/"
    }

    return <>
        <div className="container" style={{ marginTop:"120px" }} >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={loginPetugas}>
                    <div className="bg-dasar p-3 rounded shadow">
                        <h1 className="text-center" >Login</h1>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama</label>
                            <input type="text" required name="name" className="form-control" id="nama" placeholder="Masukkan nama"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input type="password" required name="password" className="form-control" id="Password" placeholder="Masukkan Password"/>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-success shadow" style={{ width:"100%" }} >Masuk</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}