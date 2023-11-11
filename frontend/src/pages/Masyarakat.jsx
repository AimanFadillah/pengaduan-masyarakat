import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function Masyarakat () {
    const [masyarakat,setMasyarakat] = useState([]);
    const [create,setCreate] = useState(true);
    const [id,setId] = useState(0);

    useEffect(() => {
        getData()
    },[]);

    useEffect(() => {
        if(create) hapusValue()
    },[create])

    async function getData () { 
        const result = await axios.get("http://localhost:5000/masyarakat")
        setMasyarakat(result.data);
    }

    async function closeModal () {
        const button = document.querySelector("#closeModal");
        button.click();
    }

    async function createData(e){   
        e.preventDefault();
        const data = new FormData(e.target);
        const result = await axios.post("http://localhost:5000/masyarakat",data);
        dicheck(result,e.target);
    }

    async function editData (data) {
        setCreate(false);
        setId(data.nik);
        const formCreate = document.querySelector("#formCreate");
        const inputs = formCreate.querySelectorAll("input");
        for(const input of inputs) input.setAttribute("value",data[input.name]);
    }

    async function updateData (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        data.delete("nik");
        data.delete("password");
        const result = await axios.put("http://localhost:5000/masyarakat/" + id,data);
        dicheck(result,e.target);
    }

    async function deleteData (id) {
        const result = await axios.delete(`http://localhost:5000/masyarakat/${id}`)
        getData()
    }

    function hapusValue () {
        const formCreate = document.querySelector("#formCreate");
        const inputs = formCreate.querySelectorAll("input");
        for(const input of inputs) input.removeAttribute("value");
    }

    function dicheck (result,form) {
        if(result.data.msg !== "success") return alert(result.data.msg);
        form.reset()
        closeModal()
        getData()
    }

    return <Sidebar>
        <div className="d-flex justify-content-between align-items-center">
            <h1 className=" text-dark" >Masyarakat</h1>
            <div className="">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal"  onClick={() => setCreate(true)} ><i className="bi bi-plus-lg"></i> Buat Masyarakat</button>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nik</th>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Telp</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {masyarakat.length > 0 ? 
                masyarakat.map((dt,index) => 
                    <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{dt.nik}</td>
                        <td>{dt.nama}</td>
                        <td>{dt.username}</td>
                        <td>{dt.telp}</td>
                        <td>
                            <div className="badge bg-primary me-1" onClick={() => editData(dt)} data-bs-toggle="modal" data-bs-target="#modal" >Edit</div>
                            <div className="badge bg-danger" onClick={() => confirm("yakin?") ? deleteData(dt.nik) : "" } >Hapus</div>
                        </td>
                    </tr>
                )
                : 
                    <tr  >
                        <td colSpan="7" className="text-center" >Tidak ada Data 😋</td>
                    </tr>
                }
            </tbody>
            </table>
        </div>

        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="text-dark fs-4 text-center m-0" > { create ? "Buat Masyarakat" : "Edit Masyarakat" }</h1>
                        <form id="formCreate" onSubmit={create ? createData : updateData}>
                            <div className={`mb-3 ${create ? "" : "d-none"}`}>
                                <label htmlFor="nik" className="form-label text-dark">Nik</label>
                                <input type="text" name="nik" required={create ? true : false} className="form-control" id="nik" placeholder="Masukkan nik"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label text-dark">Nama</label>
                                <input type="text" required name="nama" className="form-control" id="nama" placeholder="Masukkan nama"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label text-dark">Username</label>
                                <input type="text" required name="username" className="form-control" id="username" placeholder="Masukkan username"/>
                            </div>
                            <div className={`mb-3 ${create ? "" : "d-none"}`}>
                                <label htmlFor="Password" className="form-label text-dark">Password</label>
                                <input type="password" name="password" required={create ? true : false} className="form-control" id="Password" placeholder="Masukkan Password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telp" className="form-label text-dark">Telepon</label>
                                <input type="number" required name="telp" className="form-control" id="telp" placeholder="Masukkan telp"/>
                            </div>
                            <button className={`btn ${ create ? "btn-success" : "btn-primary"} `} style={{ width:"100%" }}  >{ create ? "Buat Masyarakat" : "Edit Masyarakat" }</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" id="closeModal" className="d-none" data-bs-dismiss="modal" data-bs-target="#modal" ></button>
    </Sidebar>
}