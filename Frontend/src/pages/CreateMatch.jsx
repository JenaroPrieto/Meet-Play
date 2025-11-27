import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateMatch() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [deporteId, setDeporteId] = useState("");
  const [canchaId, setCanchaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const [canchas, setCanchas] = useState([]);

  // 🔹 Cargar usuario y token
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🔹 Cargar lista de canchas
  useEffect(() => {
    const loadCanchas = async () => {
      try {
        const res = await fetch("http://localhost:3000/partido");
        const data = await res.json();

        if (res.ok && data.canchas) {
          setCanchas(data.canchas);
        }
      } catch (err) {
        console.error("Error cargando canchas:", err);
      }
    };

    loadCanchas();
  }, []);

  // 🔹 Enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      setError("Debes iniciar sesión para crear un partido.");
      return;
    }

    const datetime = new Date(`${fecha}T${hora}`);

    try {
      const res = await fetch("http://localhost:3000/partido/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          fecha: datetime,
          creador_id: user.id,
          deporte_id: parseInt(deporteId),
          cancha_id: parseInt(canchaId),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ Partido creado con éxito: ${data.nombre}`);
        setError("");
        setNombre("");
        setDeporteId("");
        setCanchaId("");
        setFecha("");
        setHora("");
      } else {
        setError(data.message || "Error al crear el partido");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2>Crear Partido</h2>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: 12 }}>
            <label>Nombre del partido</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Pichanga nocturna"
              required
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>ID del deporte</label>
            <input
              type="number"
              value={deporteId}
              onChange={(e) => setDeporteId(e.target.value)}
              placeholder="Ej: 1 (Fútbol)"
              required
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Cancha</label>
            <select
              value={canchaId}
              onChange={(e) => setCanchaId(e.target.value)}
              required
            >
              <option value="">Selecciona una cancha</option>
              {canchas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} — {c.comuna}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Hora</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>

          <button type="submit">Crear partido</button>
        </form>

        {mensaje && <p style={{ marginTop: 16, color: "green" }}>{mensaje}</p>}
        {error && <p style={{ marginTop: 16, color: "red" }}>{error}</p>}
      </div>

      <div className="back-home">
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
}
