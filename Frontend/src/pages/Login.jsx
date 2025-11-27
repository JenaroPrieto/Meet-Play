import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("storageUserChange")); // 🔥 actualizar navbar

        navigate("/partidos");
      } else {
        setError(data.message || "Email o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        ¿No tienes cuenta?{" "}
        <NavLink to="/registro" className="nav-link">
          Regístrate aquí
        </NavLink>
      </p>
    </div>
  );
}
