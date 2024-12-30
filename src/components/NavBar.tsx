import { FunctionComponent, useContext, useEffect, useState, } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { SiteThemeContext } from "../Context/Context";
import useUser from "../hooks/useUser";





interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = () => {
    const navigate: NavigateFunction = useNavigate()
    const { darkMode, setDarkMode } = useContext(SiteThemeContext)
    const { isBusiness, setIsBusiness, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUser()





    return (
        <>
            <div className="navlinks ">
                <nav className=" bg-light navbar text-light navbar-expand-lg  ">
                    <div className="container-fluid">
                        <NavLink to={"/"} className="navbar-brand fa-2x"><i className="fa-regular fa-id-card"></i> BCard</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to={"/about"} className="nav-link active" aria-current="page">About</NavLink>
                                </li>
                                {isLoggedIn && <li className="nav-item">
                                    <NavLink to={"/favoritecrad"} className="nav-link" >Fav Cards</NavLink>
                                </li>}
                                {isBusiness && <li className="nav-item">
                                    <NavLink to={"/mycards"} className="nav-link" >My Cards</NavLink>
                                </li>}
                                {isAdmin && <li className="nav-item">
                                    <NavLink to={"/crm"} className="nav-link">CRM</NavLink>
                                </li>}
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-secondary mx-1" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                {darkMode ? <button className="fa-solid btn text-light fa-sun" onClick={() => setDarkMode(true)
                                }></button> : <button className="fa-regular text-light btn fa-moon" onClick={() => setDarkMode(false)}></button>}
                                {isLoggedIn && <button className="btn btn-warning display-5 mx-1" onClick={() => (
                                    navigate("/"), setIsLoggedIn(false), setIsAdmin(false), setIsBusiness(false), localStorage.removeItem("token"))}>Logout</button>}
                                {!isLoggedIn && <button className="btn text-light btn-outline-success mx-1" type="submit" onClick={() => {
                                    navigate("/register")
                                }}>Register</button>}
                                {!isLoggedIn && <button className="btn text-light btn-outline-primary mx-1" type="submit" onClick={() => {
                                    navigate("/login")
                                }}>Login</button>}
                            </form>
                        </div>
                    </div>
                </nav >
            </div >
        </>
    );
}

export default NavBar;


