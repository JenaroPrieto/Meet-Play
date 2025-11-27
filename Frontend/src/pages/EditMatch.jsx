import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EditMatch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [partido, setPartido] = useState(null);
  const [deportes, setDeportes] = useState([]);
  const [canchas, setCanchas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const headers = { Authorization: `Bearer ${token}` };

        // 1) cargar partido actual
        const res = await fetch(`http://localhost:3000/partido/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error();

        setPartido({
          nombre: data.nombre,
          fecha: data.fecha,
          deporte_id: data.deporte_id,
          cancha_id: data.cancha_id,
          estado: data.estado,
        });

        // 2) cargar info extendida
        const resList = await fetch("http://localhost:3000/partido", { headers });
        const dataList = await resList.json();

        setDeportes(dataList.deportes);
        setCanchas(dataList.canchas);

      } catch (e) {
        setError("Error cargando datos del partido.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setPartido({ ...partido, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/partido/${id}/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partido),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "No se pudo actualizar.");
        return;
      }

      setMsg("Cambios guardados ✔");
      setTimeout(() => navigate(`/partido/${id}`), 1200);

    } catch (e) {
      setMsg("Error guardando cambios.");
    }
  };

  if (loading)
    return (
      <div className="page-center">
        <p>Cargando...</p>
      </div>
    );

  if (error)
    return (
      <div className="page-center">
        <div className="card"><p>{error}</p></div>
      </div>
    );

  return (
    <div className="page-center">
      <div className="card" style={{ maxWidth: "700px" }}>

        <h2>Editar Partido</h2>

        {msg && <p style={{ color: "green" }}>{msg}</p>}

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={partido.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="datetime-local"
            name="fecha"
            value={new Date(partido.fecha).toISOString().slice(0, 16)}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Estado:</label>
          <select name="estado" value={partido.estado} onChange={handleChange}>
            <option value="abierto">Abierto</option>
            <option value="cerrado">Cerrado</option>
          </select>
        </div>

        <div className="form-group">
          <label>Deporte:</label>
          <select
            name="deporte_id"
            value={partido.deporte_id}
            onChange={handleChange}
          >
            {deportes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cancha:</label>
          <select
            name="cancha_id"
            value={partido.cancha_id}
            onChange={handleChange}
          >
            {canchas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre} — {c.comuna}
              </option>
            ))}
          </select>
        </div>

        <button style={{ marginTop: 20 }} onClick={saveChanges}>
          Guardar Cambios
        </button>

        <Link to={`/partido/${id}`} style={{ marginTop: 12 }} className="nav-link">
          ← Volver al partido
        </Link>
      </div>
    </div>
  );
}


