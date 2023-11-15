import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function Petugas () {
    const [petugas,setPetugas] = useState([]);
    const [create,setCreate] = useState(true);
    const [id,setId] = useState(0);

    useEffect(() => {
        getData()
    },[]);

    useEffect(() => {
        if(create) hapusValue()
    },[create])

    async function getData () { 
        const result = await axios.get("http://localhost:5000/petugas")
        setPetugas(result.data);
    }

    async function createData(e){   
        e.preventDefault();
        const data = new FormData(e.target);
        const result = await axios.post("http://localhost:5000/petugas",data);
        dicheck(result,e.target);
    }

    async function editData (data) {
        setCreate(false);
        setId(data.id_petugas);
        const formCreate = document.querySelector("#formCreate");
        const inputs = formCreate.querySelectorAll("input");
        for(const input of inputs) input.setAttribute("value",data[input.name]);
    }

    async function updateData (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        data.delete("password");
        data.delete("confPassword");
        const result = await axios.put("http://localhost:5000/petugas/" + id,data);
        dicheck(result,e.target);
    }

    async function deleteData (id) {
        const result = await axios.delete(`http://localhost:5000/petugas/${id}`)
        getData()
    }

    function hapusValue () {
        const formCreate = document.querySelector("#formCreate");
        const inputs = formCreate.querySelectorAll("input");
        for(const input of inputs) input.removeAttribute("value");
    }

    function closeModal () {
        const button = document.querySelector("#closeModal");
        button.click();
    }

    function dicheck (result,form) {
        if(result.data.msg !== "success") return alert(result.data.msg);
        form.reset()
        closeModal()
        getData()
    }


    return <Sidebar>
       <div className="d-flex justify-content-between align-items-center">
            <h1 className=" text-dark" >Petugas</h1>
            <div className="">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal"  onClick={() => setCreate(true)} ><i className="bi bi-plus-lg"></i> Buat Petugas</button>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table mt-3" >
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Usernama</th>
                    <th>Telp</th>
                    <th>Level</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {petugas.length > 0 ? 
                petugas.map((dt,index) => 
                    <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{dt.nama_petugas}</td>
                        <td>{dt.username}</td>
                        <td>{dt.level}</td>
                        <td>{dt.telp}</td>
                        <td>
                            <div className="badge bg-primary me-1" onClick={() => editData(dt)} data-bs-toggle="modal" data-bs-target="#modal" >Edit</div>
                            <div className="badge bg-danger" onClick={() => confirm("yakin?") ? deleteData(dt.id_petugas) : "" } >Hapus</div>
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
                        <h1 className="text-dark fs-4 text-center m-0" > { create ? "Buat Petugas" : "Edit Petugas" }</h1>
                        <form id="formCreate" onSubmit={create ? createData : updateData}>
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label text-dark">Nama</label>
                                <input type="text" name="nama_petugas" required className="form-control" id="nama" placeholder="Masukkan Nama"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label text-dark">Username</label>
                                <input type="text" name="username" required className="form-control" id="username" placeholder="Masukkan Username"/>
                            </div>
                            <div className={create ? "mb-3" : "d-none"}>
                                <label htmlFor="password" className="form-label text-dark">Password</label>
                                <input type="password" name="password" required={create ? true : false} className="form-control" id="password" placeholder="Masukkan Password"/>
                            </div>
                            <div className={create ? "mb-3" : "d-none"}>
                                <label htmlFor="confPassword" className="form-label text-dark">Konfirmasi Password</label>
                                <input type="confPassword" name="confPassword" required={create ? true : false} className="form-control" id="confPassword" placeholder="Masukkan Konfirmasi Password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telp" className="form-label text-dark">Telepon</label>
                                <input type="telp" name="telp" required className="form-control" id="telp" placeholder="Masukkan Telepon"/>
                            </div>
                            <button className={`btn ${ create ? "btn-success" : "btn-primary"} `} style={{ width:"100%" }}  >{ create ? "Buat Petugas" : "Edit Petugas" }</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" id="closeModal" className="d-none" data-bs-dismiss="modal" data-bs-target="#modal" ></button>
    </Sidebar>
}