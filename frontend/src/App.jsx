import {BrowserRouter,Routes,Route} from "react-router-dom"
import Beranda from "./pages/Beranda"
import Pengaduan from "./pages/Pengaduan"
import Tanggapan from "./pages/Tanggapan"
import Petugas from "./pages/Petugas"
import Masyarakat from "./pages/Masyarakat"
import { useEffect, useState } from "react"
import axios from "axios"
import Login from "./pages/Login"

function setUrl (url) {
  window.history.pushState("","",url)
}

function App() {
  const [check,setCheck] = useState("success");

  useEffect(() => {
    middleware()
  },[]);

  async function middleware () {
    const response = await axios.get("http://localhost:5000",{withCredentials:true});
    if(response.data !== "success") {
      setCheck("danger");
      setUrl("/login");
    }
  }
  
  return (
    check === "success" ?
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda/>} />
        <Route path="/beranda" element={<Beranda/>} />
        <Route path="/masyarakat" element={<Masyarakat/>} />
        <Route path="/pengaduan" element={<Pengaduan />} />
        <Route path="/petugas" element={<Petugas />} />
        <Route path="/tanggapan" element={<Tanggapan />} />
      </Routes>
    </BrowserRouter>
    : <Login/>
  )
}

export default App
