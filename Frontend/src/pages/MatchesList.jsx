import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MatchesList() {
  const [partidos, setPartidos] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const res = await fetch("http://localhost:3000/partido", { headers });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error al cargar partidos");
        }

        // Combinar partidos con datos de deportes y canchas
        const partidosCompletos = data.partidos.map((p) => ({
          ...p,
          deporte:
            data.deportes.find((d) => d.id === p.deporte_id)?.nombre || "N/A",
          cancha:
            data.canchas.find((c) => c.id === p.cancha_id)?.nombre || "N/A",
          direccion:
            data.canchas.find((c) => c.id === p.cancha_id)?.direccion || "",
          comuna:
            data.canchas.find((c) => c.id === p.cancha_id)?.comuna || "",
          distancia:
            data.canchas.find((c) => c.id === p.cancha_id)?.distancia || null,
        }));

        setPartidos(partidosCompletos);
      } catch (err) {
        console.error(err);
        setError("Error al cargar partidos");
      }
    };

    fetchPartidos();
  }, []);

  const unirse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(`http://localhost:3000/partido/${id}/unirse`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.succes) {
        setPartidos((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, usuario_participa: true } : p
          )
        );
        setMsg("✅ Te uniste al partido.");
      } else {
        setMsg(`⚠️ ${data.message || "No se pudo unir al partido"}`);
      }

      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error(err);
      setMsg("❌ Error al unirse al partido.");
    }
  };

  return (
    <div className="page-center">
      <div style={{ width: "100%", maxWidth: "900px", textAlign: "center" }}>
        <h2>Partidos Disponibles</h2>
        {msg && <p>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {partidos.length === 0 && !error && <p>No hay partidos disponibles.</p>}

        <div className="matches-container">
          {partidos.map((p) => (
            <div key={p.id} className="match-card">
              <div className="match-title">{p.nombre}</div>
              <div className="match-meta">
                <strong>Deporte:</strong> {p.deporte} <br />
                <strong>Cancha:</strong> {p.cancha} <br />
                <strong>Dirección:</strong> {p.direccion} ({p.comuna})<br />
                <strong>Fecha:</strong>{" "}
                {new Date(p.fecha).toLocaleString("es-CL")} <br />
                <strong>Participantes:</strong> {p.participantes} <br />
                {p.distancia && (
                  <>
                    <strong>Distancia:</strong> {p.distancia.toFixed(1)} km
                    <br />
                  </>
                )}
                <strong>Estado:</strong> {p.estado}
              </div>

              <button
                onClick={() => unirse(p.id)}
                disabled={p.usuario_participa || p.estado === "cerrado"}
              >
                {p.usuario_participa
                  ? "Ya participas"
                  : p.estado === "cerrado"
                  ? "Cerrado"
                  : "Unirse"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="back-home">
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
}



