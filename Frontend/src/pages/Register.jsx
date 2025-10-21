import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    direccion: "",
    latitud: "",
    longitud: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/usuario/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/partidos");
      } else {
        setError(data.message || "Error al registrarse");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="contrasena"
          type="password"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          required
        />
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
        />
        <input
          name="latitud"
          type="number"
          step="any"
          placeholder="Latitud (opcional)"
          value={form.latitud}
          onChange={handleChange}
        />
        <input
          name="longitud"
          type="number"
          step="any"
          placeholder="Longitud (opcional)"
          value={form.longitud}
          onChange={handleChange}
        />
        <button type="submit">Crear cuenta</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        ¿Ya tienes cuenta?{" "}
        <NavLink to="/login" className="nav-link">
          Inicia sesión aquí
        </NavLink>
      </p>
    </div>
  );
}


