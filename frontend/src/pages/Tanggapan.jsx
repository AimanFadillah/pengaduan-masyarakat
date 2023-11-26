import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function Tanggapan () {
    const [tanggapan,setTanggapan] = useState([]);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [pengaduan,setPengaduan] = useState([]);
    const [create,setCreate] = useState(true);
    const [id,setId] = useState(0);

    useEffect(() => {
        getData(setTanggapan,"http://localhost:5000/tanggapan")
        getData(setPengaduan,"http://localhost:5000/pengaduan")
    },[]);

    useEffect(() => {
        if(create) hapusValue()
    },[create])

    async function getData (set,link) { 
        const result = await axios.get(link,{withCredentials:true})
        set(result.data);
    }

    async function createData(e){   
        e.preventDefault();
        const data = new FormData(e.target);
        data.append("id_petugas",user.id_petugas )
        const result = await axios.post("http://localhost:5000/tanggapan",data);
        dicheck(result,e.target);
    }

    async function editData (data) {
        setCreate(false);
        setId(data.id_tanggapan);
        const formCreate = document.querySelector("#formCreate");
        const inputs = formCreate.querySelectorAll("input");
        const options = formCreate.querySelectorAll("option");
        for(const input of inputs) input.type === "date" ? input.setAttribute("value",(data[input.name].split("T"))[0]) : input.setAttribute("value",data[input.name])
        for(const option of options) option.value === data.id_pengaduan || option.value === data.id_petugas ? option.selected = true : undefined;
    }

    async function updateData (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const result = await axios.put("http://localhost:5000/tanggapan/" + id,data);
        dicheck(result,e.target);
    }

    async function deleteData (id) {
        const result = await axios.delete(`http://localhost:5000/tanggapan/${id}`)
        getData(setTanggapan,"http://localhost:5000/tanggapan")
    }

    function hapusValue () {
        const formCreate = document.querySelector("#formCreate");
        const inputs = formCreate.querySelectorAll("input");
        const options = formCreate.querySelectorAll("option");
        for(const input of inputs) input.removeAttribute("value");
        for(const option of options) option.removeAttribute("selected")
    }

    function closeModal () {
        const button = document.querySelector("#closeModal");
        button.click();
    }

    function dicheck (result,form) {
        if(result.data.msg !== "success") return alert(result.data.msg);
        form.reset()
        closeModal()
        getData(setTanggapan,"http://localhost:5000/tanggapan")
    }

    return <Sidebar>
        <div className="d-flex justify-content-between align-items-center">
            <h1 className=" text-dark" >Tanggapan</h1>
            <div className="">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal"  onClick={() => setCreate(true)} ><i className="bi bi-plus-lg"></i> Buat Petugas</button>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table mt-3" >
            <thead>
                <tr>
                    <th>No</th>
                    <th>Tanggapan</th>
                    <th>Pengaduan</th>
                    <th>Petugas</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tanggapan.length > 0 ? 
                tanggapan.map((dt,index) => 
                    <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{dt.tanggapan}</td>
                        <td>{dt.pengaduan ? dt.pengaduan.isi_laporan : "Tidak ada"}</td>
                        <td>{dt.petuga ? dt.petuga.nama_petugas : "Tidak ada"}</td>
                        <td>
                            <div className="badge bg-primary me-1" onClick={() => editData(dt)} data-bs-toggle="modal" data-bs-target="#modal" >Edit</div>
                            <div className="badge bg-danger" onClick={() => confirm("yakin?") ? deleteData(dt.id_tanggapan) : "" } >Hapus</div>
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
                        <h1 className="text-dark fs-4 text-center m-0" > { create ? "Buat Tanggapan" : "Edit Tanggapan" }</h1>
                        <form id="formCreate" onSubmit={create ? createData : updateData}>
                            <div className="mb-3">
                                <label htmlFor="pengaduan" className="form-label text-dark">Pengaduan</label>
                                <select name="id_pengaduan" id="pengaduan" className="form-select" required>
                                    <option value="" className="text-dark" >Pilih Pengaduan</option>
                                    {pengaduan.map((dt,index) => 
                                        <option key={index} value={dt.id_pengaduan} className="text-dark" >{dt.isi_laporan}</option>
                                    )}
                                </select>
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="petugas" className="form-label text-dark">Petugas</label>
                                <select name="id_petugas" id="petugas" className="form-select" required>
                                    <option value="" className="text-dark" >Pilih petugas</option>
                                    {petugas.map((dt,index) => 
                                        <option key={index} value={dt.id_petugas} className="text-dark" >{dt.nama_petugas}</option>
                                    )}
                                </select>
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="Tanggapan" className="form-label text-dark">Tanggapan</label>
                                <input type="text" name="tanggapan" className="form-control" id="Tanggapan" placeholder="Masukkan Tanggapan"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tgl_tanggapan" className="form-label text-dark">Tanggal Tanggapan</label>
                                <input type="date" name="tgl_tanggapan" className="form-control" id="tgl_tanggapan" placeholder="Masukkan tgl_tanggapan"/>
                            </div>
                            <button className={`btn ${ create ? "btn-success" : "btn-primary"} `} style={{ width:"100%" }}  >{ create ? "Buat Tanggapan" : "Edit Tanggapan" }</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" id="closeModal" className="d-none" data-bs-dismiss="modal" data-bs-target="#modal" ></button>

    </Sidebar>
}