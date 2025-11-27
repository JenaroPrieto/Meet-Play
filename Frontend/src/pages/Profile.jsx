import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");

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

        // Inicializamos form para edición
        setForm({
          nombre: dataUser.nombre || "",
          email: dataUser.email || "",
          direccion: dataUser.direccion || "",
          latitud: dataUser.latitud || "",
          longitud: dataUser.longitud || "",
          contrasena: "",
          nueva_contrasena: "",
        });

      } catch (err) {
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // --------------------------
  //         HANDLERS
  // --------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/usuario/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Error al actualizar el perfil");
        return;
      }

      setUserInfo(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("storageUserChange")); // actualizar navbar

      setMsg("Perfil actualizado exitosamente.");
      setEditMode(false);

    } catch (err) {
      setMsg("Error al conectar con el servidor.");
    }
  };

  // --------------------------
  //         LOADING / ERROR
  // --------------------------

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

  // --------------------------
  //         RENDER
  // --------------------------

  return (
    <div className="page-center" style={{ gap: "32px" }}>

      {/* TARJETA PRINCIPAL */}
      <div className="card profile-card">

        <div className="profile-avatar">
          <span>👤</span>
        </div>

        {!editMode ? (
          <>
            <h2 className="profile-name">{userInfo.nombre}</h2>

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

            <button
              className="profile-edit-btn"
              onClick={() => setEditMode(true)}
            >
              ✏️ Editar Perfil
            </button>
          </>
        ) : (
          /* ---------------- MODO EDICIÓN ---------------- */
          <form onSubmit={guardarCambios} className="edit-form">

            <h2 className="profile-name">Editar Perfil</h2>

            <label>Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Dirección</label>
            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
            />

            <label>Latitud</label>
            <input
              type="number"
              step="any"
              name="latitud"
              value={form.latitud}
              onChange={handleChange}
            />

            <label>Longitud</label>
            <input
              type="number"
              step="any"
              name="longitud"
              value={form.longitud}
              onChange={handleChange}
            />

            {/* Cambiar contraseña opcional */}
            <label>Contraseña actual (solo si quieres cambiarla)</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
            />

            <label>Nueva contraseña</label>
            <input
              type="password"
              name="nueva_contrasena"
              value={form.nueva_contrasena}
              onChange={handleChange}
            />

            {msg && <p style={{ marginTop: 8, color: "green" }}>{msg}</p>}

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button type="submit">Guardar cambios</button>
              <button
                type="button"
                className="logout"
                onClick={() => setEditMode(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      {/* TARJETA DE PARTIDOS */}
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
