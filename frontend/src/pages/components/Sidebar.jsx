import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar(props) {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || {level:"danger"});

    async function logout () {
        const response = await axios.get("http://localhost:5000/logout",{withCredentials:true})
        window.location.href = "/";
    }

    return (
        <>
            <header
                className="navbar sticky-top bg-dasar flex-md-nowrap p-1 shadow" 
                data-bs-theme="dark"
            >
                <Link
                    className="navbar text-decoration-none fw-bold col-md-3 me-0 px-3 fs-5 text-white"
                    href="/"
                >
                    Pengaduan Masyarakat 
                </Link>

                <ul className="navbar-nav flex-row d-md-none">
                    <li className="nav-item text-nowrap">
                        <button
                            className="nav-link px-3 text-white"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-list fs-3"></i>
                        </button>
                    </li>
                </ul>

                <div id="navbarSearch" className="navbar-search w-100 collapse">
                    <input
                        className="form-control w-100 rounded-0 border-0"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar col-md-3 col-lg-2 p-0 bg-dark ">
                        <div
                            className="offcanvas-md offcanvas-end bg-dark"
                            tabIndex="-1"
                            id="sidebarMenu"
                            aria-labelledby="sidebarMenuLabel"
                        >
                            <div className="offcanvas-header">
                                <h5
                                    className="offcanvas-title" 
                                    id="sidebarMenuLabel"
                                >
                                </h5>
                                <div
                                style={{ cursor:"pointer" }}
                                    className="bi bi-x-lg fs-5"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                ></div>
                            </div>
                            
                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                <ul className="nav flex-column">
                                    <li className={`nav-item ${user.level === "admin" ? "" : "d-none" }`}> 
                                        <Link
                                            className={`nav-link d-flex gap-2 ${ window.location.href.includes("beranda") ? "text-light" : undefined }` }
                                            aria-current="page"
                                            to="/beranda"
                                        >
                                            <i className="bi bi-bar-chart-fill"></i>Dashboard
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${user.level === "admin" ? "" : "d-none" }`}>
                                        <Link
                                            className={`nav-link d-flex gap-2 ${ window.location.href.includes("masyarakat") ? "text-light" : undefined }`}
                                            to="/masyarakat"
                                        >
                                            <i className="bi bi-person-fill"></i>
                                            Masyarakat
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${user.level === "admin" || user.level === "masyarakat" ? "" : "d-none" }`}>
                                        <Link
                                            className={`nav-link d-flex gap-2 ${ window.location.href.includes("pengaduan") ? "text-light" : undefined }`}
                                            href="#"
                                            to="/pengaduan"
                                        >
                                            <i className="bi bi-box-seam-fill"></i>
                                            Pengaduan
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${user.level === "admin" ? "" : "d-none" }`}>
                                        <Link
                                            className={`nav-link d-flex gap-2 ${ window.location.href.includes("petugas") ? "text-light" : undefined }`}
                                            to="/petugas"
                                        >
                                            <i className="bi bi-people-fill"></i>
                                            Petugas
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${user.level === "petugas" ? "" : "d-none" }`}>
                                        <Link
                                            className={`nav-link d-flex gap-2 ${ window.location.href.includes("tanggapan") ? "text-light" : undefined }`}
                                            to="/tanggapan"
                                        >
                                            <i className    ="bi bi-chat-right-text-fill"></i>
                                            Tanggapan
                                        </Link>
                                    </li>
                                </ul>

                                <hr className="my-3" />
                                
                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link d-flex gap-2"
                                            onClick={logout}
                                        >
                                            <i className="bi bi-box-arrow-left fs-6"></i>
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <main className={`col-md-9 text-dark ms-sm-auto col-lg-10 px-md-4 mt-3 ${props.className}`} style={{ marginBottom:"500px" }} >
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}