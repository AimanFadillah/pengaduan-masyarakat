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
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || {level:"masyarakat"})

  useEffect(() => {
    middleware()
  },[]);

  async function middleware () {
    const response = await axios.get("http://localhost:5000",{withCredentials:true});
    if(response.data !== "success" || !localStorage.getItem("user")) {
      if(localStorage.getItem("user")) localStorage.removeItem("user");
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
        <Route path="/pengaduan" element={<Pengaduan />} />
        {user.level === "petugas" || user.level === "admin" ? 
          <Route path="/tanggapan" element={<Tanggapan />} />
          : undefined
        }
        {user.level === "admin" ? 
        <>
          <Route path="/masyarakat" element={<Masyarakat/>} />
          <Route path="/petugas" element={<Petugas />} />
        </>  
        : undefined
        }
      </Routes>
    </BrowserRouter>
    : <Login/>
  )
}

export default App
