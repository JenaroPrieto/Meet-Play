import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function MisAmigos() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amigos, setAmigos] = useState([]);

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
        // 1️⃣ Obtener usuarios con los que ha jugado
        const res = await fetch(`http://localhost:3000/usuario/${user.id}/met`);
        if (!res.ok) throw new Error("No se encontró el endpoint");
        const data = await res.json();

        const usuarios = data.usuarios || {};

        // 2️⃣ Obtener datos de todos los partidos (para nombres)
        const resPartidos = await fetch("http://localhost:3000/partido");
        const dataPartidos = await resPartidos.json();

        const mapPartidos = {};
        dataPartidos.partidos.forEach((p) => {
          mapPartidos[p.id] = p.nombre;
        });

        // 3️⃣ Obtener info detallada de cada usuario
        const detalles = [];

        for (const amigoId of Object.keys(usuarios)) {
          const resU = await fetch(`http://localhost:3000/usuario/${amigoId}`);
          const info = await resU.json();

          detalles.push({
            ...info,
            partidos: usuarios[amigoId].map((id) => ({
              id,
              nombre: mapPartidos[id] || `Partido ${id}`
            }))
          });
        }

        setAmigos(detalles);
      } catch (err) {
        setError("No se pudo cargar la lista de usuarios con los que has jugado.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading)
    return (
      <div className="page-center">
        <p>Cargando jugadores...</p>
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
        <h2 style={{ marginBottom: 20 }}>Usuarios con los que has jugado</h2>

        {amigos.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No has compartido partido con otros usuarios aún.</p>
        ) : (
          <div className="matches-list">
            {amigos.map((a) => (
              <div key={a.id} className="match-card-expanded">

                {/* HEADER estilo MyMatches */}
                <div className="match-header">
                  <h3>{a.nombre}</h3>
                  <span className="estado-badge estado-abierto">jugador</span>
                </div>

                {/* DETALLES estilo MyMatches */}
                <div className="match-details">
                  <p><strong>Email:</strong> {a.email}</p>

                  {a.direccion && (
                    <p>
                      <strong>Dirección:</strong> {a.direccion}
                    </p>
                  )}

                  <p>
                    <strong>Partidos en común:</strong> {a.partidos.length}
                  </p>

                  <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                    {a.partidos.map((p) => (
                      <li key={p.id}>
                        <Link to={`/partido/${p.id}`} className="link">
                          {p.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
