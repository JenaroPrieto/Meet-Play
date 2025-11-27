import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [partido, setPartido] = useState(null);
  const [deporte, setDeporte] = useState(null);
  const [cancha, setCancha] = useState(null);
  const [participa, setParticipa] = useState(false);

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1️⃣ Obtener partido específico
        const res = await fetch(`http://localhost:3000/partido/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error();

        setPartido(data);

        // 2️⃣ Obtener info extendida (deportes y canchas)
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const resList = await fetch("http://localhost:3000/partido", { headers });
        const dataList = await resList.json();

        if (!resList.ok) throw new Error();

        const dep = dataList.deportes.find((d) => d.id === data.deporte_id);
        const can = dataList.canchas.find((c) => c.id === data.cancha_id);

        setDeporte(dep || null);
        setCancha(can || null);

        // 3️⃣ Detectar si participas
        if (token) {
          const user = JSON.parse(localStorage.getItem("user"));
          const mis = await fetch(`http://localhost:3000/usuario/${user.id}/partido`);
          const dataMis = await mis.json();

          if (dataMis.partidos.some((p) => p.id === data.id)) {
            setParticipa(true);
          }
        }

      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el partido.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ------------------------
  //     UNIRSE AL PARTIDO
  // ------------------------

  const unirse = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const res = await fetch(`http://localhost:3000/partido/${id}/unirse`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (data.exito) {
      setParticipa(true);
      setMsg("Te uniste al partido 🎉");
    } else {
      setMsg(data.message || "No se pudo unir");
    }
  };

  // ------------------------
  //     SALIR DEL PARTIDO
  // ------------------------

  const salir = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(
      `http://localhost:3000/partido/${id}/salir?usuario_id=${user.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (data.exito) {
      setParticipa(false);
      setMsg("Saliste del partido.");
    } else {
      setMsg(data.message || "No se pudo salir");
    }
  };

  // ------------------------
  //         LOADING
  // ------------------------

  if (loading)
    return (
      <div className="page-center">
        <p>Cargando partido...</p>
      </div>
    );

  if (error)
    return (
      <div className="page-center">
        <div className="card">
          <p>{error}</p>
        </div>
      </div>
    );

  // ------------------------
  //         UI
  // ------------------------

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const esCreador = user && partido.creador_id === user.id;

  return (
    <div className="page-center">
      <div className="card" style={{ maxWidth: "800px" }}>
        
        <div className="match-header">
          <h2>{partido.nombre}</h2>
          <span className={`estado-badge estado-${partido.estado}`}>
            {partido.estado}
          </span>
        </div>

        <div className="match-details" style={{ marginTop: 16 }}>

          <p><strong>Deporte:</strong> {deporte?.nombre}</p>
          <p><strong>Cancha:</strong> {cancha?.nombre}</p>
          <p><strong>Dirección:</strong> {cancha?.direccion} ({cancha?.comuna})</p>

          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(partido.fecha).toLocaleString("es-CL")}
          </p>

          <p><strong>Creador ID:</strong> {partido.creador_id}</p>

          {deporte?.max_participantes && (
            <p><strong>Cupos:</strong> {deporte.max_participantes}</p>
          )}
        </div>

        {/* MENSAJES */}
        {msg && <p style={{ marginTop: 10, color: "green" }}>{msg}</p>}

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>

          {/* BOTÓN UNIRSE */}
          {!participa && partido.estado === "abierto" && (
            <button onClick={unirse}>Unirse</button>
          )}

          {/* BOTÓN SALIR */}
          {participa && (
            <button className="logout" onClick={salir}>
              Salir del partido
            </button>
          )}

          {/* EDITAR PARTIDO */}
          {esCreador && (
            <Link to={`/partido/${id}/editar`} className="nav-link">
              ✏️ Editar
            </Link>
          )}

          {/* LINK AL CHAT (lo haremos luego) */}
          {participa && (
            <Link to={`/chat/${id}`} className="nav-link">
              💬 Ver Chat
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
