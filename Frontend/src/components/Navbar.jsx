import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/Logo_M&P.jpg" alt="Meet & Play" className="nav-logo" />
        <span className="brand">Meet & Play</span>
      </div>

      <div className="nav-right">
        <NavLink
          to="/partidos"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Partidos Disponibles
        </NavLink>
        <NavLink
          to="/crear"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Crear Partido
        </NavLink>
      </div>
    </nav>
  );
}

