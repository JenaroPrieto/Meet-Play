import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PartidoMapa() {
  const [partidos, setPartidos] = useState([]);

  // ⭐ Coordenadas iniciales: Macul, Santiago
  const [selectedCoords, setSelectedCoords] = useState({
    lat: -33.4975,
    lng: -70.5996
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔥 Key desde .env
  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await fetch("http://localhost:3000/partido", { headers });
        const data = await res.json();

        if (!res.ok) throw new Error("Error al cargar partidos");

        const pFull = data.partidos.map((p) => {
          const cancha = data.canchas.find((c) => c.id === p.cancha_id);

          return {
            ...p,
            deporte: data.deportes.find((d) => d.id === p.deporte_id)?.nombre,
            canchaData: cancha,
            direccion: cancha?.direccion,
            comuna: cancha?.comuna,
            latitud: cancha ? Number(cancha.latitud) : null,
            longitud: cancha ? Number(cancha.longitud) : null,
          };
        });

        setPartidos(pFull);
      } catch (err) {
        console.error(err);
        setError("Error al cargar partidos");
      }
    };

    loadData();
  }, []);

  // -----------------------
  //  UNIRSE AL PARTIDO
  // -----------------------
  const unirse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await fetch(`http://localhost:3000/partido/${id}/unirse`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.exito) {
        setMsg("Te uniste al partido 👍");

        setPartidos((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, usuario_participa: true } : p
          )
        );
      } else {
        setMsg(data.message || "No se pudo unir");
      }

      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error(err);
      setMsg("Error al unirse");
    }
  };

  // -----------------------
  //      RENDER
  // -----------------------
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      
      {/* -------------------------
           LISTA DE PARTIDOS
      -------------------------- */}
      <div
        style={{
          width: "40%",
          overflowY: "auto",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Partidos y Ubicación</h2>

        {msg && <p>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="matches-container">
          {partidos.map((p) => (
            <div key={p.id} className="match-card">

              {/* CLICK → mueve el mapa Y PONE PIN */}
              <div
                onClick={() =>
                  setSelectedCoords({
                    lat: p.latitud || -33.4975,
                    lng: p.longitud || -70.5996,
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="match-title">{p.nombre}</div>

                <div className="match-meta">
                  <strong>Deporte:</strong> {p.deporte} <br />
                  <strong>Cancha:</strong> {p.canchaData?.nombre} <br />
                  <strong>Dirección:</strong> {p.direccion} ({p.comuna}) <br />
                  <strong>Fecha:</strong>{" "}
                  {new Date(p.fecha).toLocaleString("es-CL")} <br />
                  <strong>Participantes:</strong> {p.participantes} <br />
                  <strong>Estado:</strong> {p.estado}
                </div>
              </div>

              {/* BOTONES */}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
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

                <Link to={`/partido/${p.id}`} className="nav-link">
                  Ver detalles →
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* -------------------------
              MAPA
      -------------------------- */}
      <div style={{ flexGrow: 1, height: "100%" }}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&q=${selectedCoords.lat},${selectedCoords.lng}&zoom=15`}
        ></iframe>
      </div>
    </div>
  );
}
