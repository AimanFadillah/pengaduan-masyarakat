import {BrowserRouter,Routes,Route} from "react-router-dom"
import Beranda from "./pages/Beranda"
import Pengaduan from "./pages/Pengaduan"
import Tanggapan from "./pages/Tanggapan"
import Petugas from "./pages/Petugas"
import Masyarakat from "./pages/Masyarakat"


function App() {

  return (
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
  )
}

export default App
