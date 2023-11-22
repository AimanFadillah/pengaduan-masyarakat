import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function Pengaduan () {
    const [pengaduan,setPengaduan] = useState([]);
    const [create,setCreate] = useState(true);
    const [show,setShow] = useState({});
    const [preview,setPreview] = useState();
    const [id,setId] = useState(0);

    useEffect(() => {
        getData()
    },[]);

    useEffect(() => {
        if(create) hapusValue()
    },[create])
    
    async function getData () { 
        const result = await axios.get("http://localhost:5000/pengaduan")
        setPengaduan(result.data);
    }

    async function createData(e){   
        e.preventDefault();
        const data = new FormData(e.target);
        const result = await axios.post("http://localhost:5000/pengaduan",data);
        dicheck(result,e.target);
    }

    async function editData (data) {
        setCreate(false);
        setId(data.id_pengaduan);
        setPreview(data.url);
        const formCreate = document.querySelector("#formCreate");
        const inputs = formCreate.querySelectorAll("input");
        const options = formCreate.querySelectorAll("option");
        for(const input of inputs) input.type === "date" ? input.setAttribute("value",(data[input.name].split("T"))[0]) : input.setAttribute("value",data[input.name])
        for(const option of options) option.value === data.status ? option.selected : undefined
    }

    async function updateData (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const result = await axios.put("http://localhost:5000/pengaduan/" + id,data);
        dicheck(result,e.target);
    }

    async function deleteData (id) {
        const result = await axios.delete(`http://localhost:5000/pengaduan/${id}`)
        getData()
    }

    function previewImage (e) {
        if(!e.target.files[0]) return failedCheck();

        const img = e.target.files[0];
        const imgType = img.type;
        const imgSize = img.size;
        const izinType = ["jpg","jpeg","png"];
        const imgObjeck = new Image()

        if(!izinType.includes(imgType.split("/")[1])){
            alert("Invalid image file type");
            failedCheck()
            return false;
        }

        if(imgSize > 3 * 1024 * 1024 ){
            alert("Image file size is too large. Maximum 5MB")
            failedCheck()
            return false;
        }

        imgObjeck.src = URL.createObjectURL(img);
        imgObjeck.onload = () => {
            const check = imgObjeck.width < 100 || imgObjeck.height < 100 ? false : true;
            if(!check){
                alert("Invalid image dimensions. Minimum 100x100 pixels.")
                failedCheck()
                return false;
            }else{
                setPreview(URL.createObjectURL(e.target.files[0]))
            }
        }

        function failedCheck (){
            setPreview()
            e.target.value = null
        }
    }

    function hapusValue () {
        setPreview()
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
        getData()
    }

    return <Sidebar>
        <div className="d-flex justify-content-between align-items-center">
            <h1 className=" text-dark" >Pengaduan</h1>
            <div className="">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal"  onClick={() => setCreate(true)} ><i className="bi bi-plus-lg"></i> Buat Pengaduan</button>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table mt-3" >
            <thead>
                <tr>
                    <th>No</th>
                    <th>Laporan</th>
                    <th>Nik</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {pengaduan.length > 0 ? 
                pengaduan.map((dt,index) => 
                    <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{dt.isi_laporan}</td>
                        <td>{dt.nik}</td>
                        <td>{dt.status}</td>
                        <td>
                            <div className="badge bg-success me-1" onClick={() => setShow(dt)} data-bs-toggle="modal" data-bs-target="#show" >Show</div>
                            <div className="badge bg-primary me-1" onClick={() => editData(dt)} data-bs-toggle="modal" data-bs-target="#modal" >Edit</div>
                            <div className="badge bg-danger" onClick={() => confirm("yakin?") ? deleteData(dt.id_pengaduan) : "" } >Hapus</div>
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
                        <h1 className="text-dark fs-4 text-center m-0" > { create ? "Buat Pengaduan" : "Edit Pengaduan" }</h1>
                        <form id="formCreate" onSubmit={create ? createData : updateData}>
                            <div className="my-3">
                                {preview ? <img src={preview} alt="preview"  className="img-thumbnail" accept="image/*" /> : ""}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="foto" className="form-label text-dark">Foto</label>
                                <input type="file" onChange={previewImage} required={create ? true : false} name="foto" className="form-control" id="foto" placeholder="Masukkan Foto"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nik" className="form-label text-dark">Nik</label>
                                <input type="number" required name="nik" className="form-control" id="nik" placeholder="Masukkan Nik"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tgl_pengaduan" className="form-label text-dark">Tanggal Pengaduan</label>
                                <input type="date" required name="tgl_pengaduan" className="form-control" id="tgl_pengaduan" placeholder="Masukkan Tanggal Pengaduan"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="isi_laporan" className="form-label text-dark">Isi laporan</label>
                                <input type="text" required name="isi_laporan" className="form-control" id="isi_laporan" placeholder="Masukkan Isi laporan"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label text-dark">Status</label>
                                <select name="status" id="status" className="form-select" >
                                    <option value="0" className="text-dark" >Belum ada proses</option>
                                    <option value="proses" className="text-dark">Proses</option>
                                    <option value="selesai" className="text-dark">Selesai</option>
                                </select>
                            </div>
                            <button className={`btn ${ create ? "btn-success" : "btn-primary"} `} style={{ width:"100%" }}  >{ create ? "Buat Pengaduan" : "Edit Pengaduan" }</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="text-dark fs-4 text-center m-0" >Show Detail</h1>
                        <div className="my-3">
                            <img src={show.url} alt="preview" className="img-thumbnail" accept="image/*" />
                        </div>
                        <div className="my-3">
                            <table>
                                <tr>
                                    <td className="text-dark fw-bold" >Isi Laporan</td>
                                    <td className="text-dark" >: {show.isi_laporan}</td>
                                </tr>
                                <tr>
                                    <td className="text-dark fw-bold" >Nik</td>
                                    <td className="text-dark" >: {show.nik}</td>
                                </tr>
                                <tr>
                                    <td className="text-dark fw-bold" >status</td>
                                    <td className="text-dark" >: {show.status}</td>
                                </tr>
                                <tr>
                                    <td className="text-dark fw-bold" >Tanggal Pengaduan</td>
                                    <td className="text-dark" >: {show.tgl_pengaduan}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" id="closeModal" className="d-none" data-bs-dismiss="modal" data-bs-target="#modal" ></button>

    </Sidebar>
}