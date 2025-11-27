import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyMatches() {
  const navigate = useNavigate();
  const [userMatches, setUserMatches] = useState([]);
  const [allData, setAllData] = useState(null); // datos de /partido
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchData = async () => {
      try {
        // 🔹 1. Obtener los partidos del usuario
        const resMy = await fetch(
          `http://localhost:3000/usuario/${user.id}/partido`
        );
        const dataMy = await resMy.json();
        if (!resMy.ok) throw new Error();

        const mis = dataMy.partidos || [];

        // 🔹 2. Obtener todos los partidos disponibles (para datos extendidos)
        const headers = { Authorization: `Bearer ${token}` };

        const resAll = await fetch("http://localhost:3000/partido", { headers });


        const dataAll = await resAll.json();
        if (!resAll.ok) throw new Error();

        setAllData(dataAll);

        // 🔹 3. Fusionar datos
        const partidosCompletos = mis
          .map((m) => {
            const p = dataAll.partidos.find((x) => x.id === m.id);
            if (!p) return null;

            const deporte = dataAll.deportes.find((d) => d.id === p.deporte_id);
            const cancha = dataAll.canchas.find((c) => c.id === p.cancha_id);

            return {
              ...p,
              deporte: deporte?.nombre || "Desconocido",
              max_participantes: deporte?.max_participantes || null,
              cancha: cancha?.nombre || "Desconocida",
              direccion: cancha?.direccion || "",
              comuna: cancha?.comuna || "",
              distancia: cancha?.distancia || null,
            };
          })
          .filter(Boolean);

        setUserMatches(partidosCompletos);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar tus partidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading)
    return (
      <div className="page-center">
        <p>Cargando tus partidos...</p>
      </div>
    );

  if (error)
    return (
      <div className="page-center">
        <div className="card">
          <p className="error">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="page-center">
      <div className="card" style={{ maxWidth: "800px" }}>
        <h2 style={{ marginBottom: "20px" }}>Mis Partidos</h2>

        {userMatches.length === 0 ? (
          <p style={{ opacity: 0.75 }}>No participas en ningún partido aún.</p>
        ) : (
          <div className="matches-list">
            {userMatches.map((p) => (
              <div key={p.id} className="match-card-expanded">

                <div className="match-header">
                  <h3>{p.nombre}</h3>
                  <span className={`estado-badge estado-${p.estado}`}>
                    {p.estado}
                  </span>
                </div>

                <div className="match-details">
                  <p><strong>Deporte:</strong> {p.deporte}</p>
                  <p><strong>Cancha:</strong> {p.cancha}</p>
                  <p><strong>Dirección:</strong> {p.direccion} ({p.comuna})</p>

                  <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(p.fecha).toLocaleString("es-CL")}
                  </p>

                  <p><strong>Participantes:</strong> {p.participantes}</p>

                  {p.max_participantes && (
                    <p><strong>Cupo máximo:</strong> {p.max_participantes}</p>
                  )}

                  {p.distancia && (
                    <p>
                      <strong>Distancia:</strong> {p.distancia.toFixed(1)} km
                    </p>
                  )}

                  <p><strong>Creador ID:</strong> {p.creador_id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
