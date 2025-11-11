import {Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="navbar h-12">
        <h1 className="navbar-title">Mara Rondini Podóloga</h1>
        <div>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cliente"    className="nav-link">Cadastro</Link>
        </div>
      </nav>
    );
  }
  