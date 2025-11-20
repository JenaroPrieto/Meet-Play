import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // 🔥 Cargar usuario y escuchar cambios globales (login/logout)
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser(); // cargar al entrar

    window.addEventListener("storageUserChange", updateUser);

    return () => {
      window.removeEventListener("storageUserChange", updateUser);
    };
  }, []);

  // 🔥 Cerrar menú al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("storageUserChange")); // 🔥 Actualizar navbar

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button
          type="button"
          className="logo-btn"
          onClick={() => navigate("/")}
          aria-label="Ir a la página principal"
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img src="/Logo_M&P.jpg" alt="Meet & Play" className="nav-logo" />
          <span className="brand">Meet & Play</span>
        </button>
      </div>

      <div className="nav-right">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Principal
        </NavLink>

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

        {/* SI NO hay usuario → botón login */}
        {!user ? (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Iniciar Sesión
          </NavLink>
        ) : (
          /* SI hay usuario → menú perfil */
          <div className="profile-menu-wrapper" ref={menuRef}>
            <button className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="profile-icon">👤</span> {user.nombre}
            </button>

            {menuOpen && (
              <div className="profile-dropdown">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/perfil");
                    setMenuOpen(false);
                  }}
                >
                  Ver Perfil
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/mis-partidos");
                    setMenuOpen(false);
                  }}
                >
                  Mis Partidos
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/mis-amigos");
                    setMenuOpen(false);
                  }}
                >
                  Usuarios con los que he jugado
                </button>

                <button className="dropdown-item logout" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
