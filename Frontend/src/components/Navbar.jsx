import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

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

        {!user ? (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Iniciar Sesión
          </NavLink>
        ) : (
          <>
            <span className="nav-user">👋 {user.nombre}</span>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}


