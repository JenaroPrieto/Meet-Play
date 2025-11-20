import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    const u = JSON.parse(storedUser);

    const fetchData = async () => {
      try {
        const resUser = await fetch(`http://localhost:3000/usuario/${u.id}`);
        const dataUser = await resUser.json();

        if (!resUser.ok) throw new Error();

        setUserInfo(dataUser);

        const resParts = await fetch(
          `http://localhost:3000/usuario/${u.id}/partido`
        );
        const dataParts = await resParts.json();

        if (!resParts.ok) throw new Error();

        setPartidos(dataParts.partidos || []);
      } catch (err) {
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading)
    return (
      <div className="page-center">
        <p>Cargando perfil...</p>
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
    <div className="page-center" style={{ gap: "32px" }}>

      {/* ──────────────── TARJETA PRINCIPAL ──────────────── */}
      <div className="card profile-card">

        {/* Avatar circular */}
        <div className="profile-avatar">
          <span>👤</span>
        </div>

        {/* Nombre grande */}
        <h2 className="profile-name">{userInfo.nombre}</h2>

        {/* Info en 2 columnas */}
        <div className="profile-info-grid">
          <div>
            <p className="label">Email</p>
            <p className="value">{userInfo.email}</p>
          </div>

          {userInfo.direccion && (
            <div>
              <p className="label">Dirección</p>
              <p className="value">{userInfo.direccion}</p>
            </div>
          )}

          {(userInfo.latitud || userInfo.longitud) && (
            <div>
              <p className="label">Coordenadas</p>
              <p className="value">
                {userInfo.latitud}, {userInfo.longitud}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ──────────────── TARJETA DE PARTIDOS ──────────────── */}
      <div className="card" style={{ maxWidth: "700px" }}>
        <h2 style={{ marginBottom: "20px" }}>Mis Partidos</h2>

        {partidos.length === 0 ? (
          <p style={{ opacity: 0.7 }}>Todavía no participas en ningún partido.</p>
        ) : (
          <div className="timeline">
            {partidos.map((p) => (
              <div key={p.id} className="timeline-item">
                <div className="dot" />
                <div>
                  <p className="timeline-title">{p.nombre}</p>
                  <p className="timeline-date">
                    {new Date(p.fecha).toLocaleString("es-CL")}
                  </p>
                  <p className="timeline-status">Estado: {p.estado}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
