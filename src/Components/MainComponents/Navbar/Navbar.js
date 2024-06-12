
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./LOGO.png";
import LOGOITD from "./logoITD.png";
import info from "./Info.png";

const Navbar = () => {
  return (
    <div className="nav-container">
        <nav className="navbar">
        <Link to={"/"} style={{textDecoration: 'none'}}>
        <h1 className="navbar-logo"><i class="fa-solid fa-house"></i></h1>
        </Link>
        <img src={logo} alt="chetos" className="imagen"/>
        <img src={info} alt="chetos" className="imagen-info"/>
        <img src={LOGOITD} alt="chetos" className="imagen-escu"/>
        </nav>
    </div>
  )
} 

export default Navbar;