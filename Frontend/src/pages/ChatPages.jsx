import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function ChatPage() {
  const { partidoId } = useParams();
  const [chat, setChat] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const mensajesRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  // Auto-scroll abajo
  const scrollBottom = () => {
    setTimeout(() => {
      if (mensajesRef.current) {
        mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
      }
    }, 100);
  };

  // Cargar mensajes
  const loadChat = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/chat/partido/${partidoId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(token);
      const data = await res.json();
      if (!res.ok) throw new Error();

      setChat(data.chat);
      setMensajes(data.mensajes);
      setLoading(false);
      scrollBottom();

    } catch (err) {
      setError("No puedes acceder al chat (¿participas en el partido?).");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return navigate("/login");

    loadChat();

    // Polling cada 2s
    const interval = setInterval(loadChat, 2000);

    return () => clearInterval(interval);
  }, [navigate, token]);

  // Enviar mensaje
  const enviarMensaje = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const res = await fetch(
      `http://localhost:3000/chat/${chat.id}/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contenido: input }),
      }
    );

    const data = await res.json();
    if (!res.ok) return;

    setInput("");
    setMensajes((prev) => [...prev, data.mensaje]);
    scrollBottom();
  };

  // Loading / Error
  if (loading)
    return (
      <div className="page-center">
        <p>Cargando chat...</p>
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
  //         UI CHAT
  // --------------------------

  return (
    <div className="page-center">
      <div className="card" style={{ width: "100%", maxWidth: "800px" }}>
        <h2>Chat del Partido #{partidoId}</h2>

        <Link to={`/partido/${partidoId}`} className="nav-link" style={{ marginBottom: 10 }}>
          ← Volver al partido
        </Link>

        {/* Área de mensajes */}
        <div
          ref={mensajesRef}
          style={{
            height: "400px",
            overflowY: "auto",
            padding: "10px",
            background: "#f8f8f8",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #ddd",
          }}
        >
          {mensajes.length === 0 && (
            <p style={{ opacity: 0.6 }}>No hay mensajes aún...</p>
          )}

          {mensajes.map((m) => {
            const soyYo = m.usuario_id === user.id;

            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: soyYo ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    background: soyYo ? "#007bff" : "#e6e6e6",
                    color: soyYo ? "white" : "black",
                  }}
                >
                  {!soyYo && (
                    <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>
                      Usuario {m.usuario_id}
                    </p>
                  )}
                  <p style={{ margin: 0 }}>{m.contenido}</p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 10,
                      opacity: 0.6,
                      textAlign: "right",
                    }}
                  >
                    {new Date(m.fecha_envio).toLocaleTimeString("es-CL")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FORMULARIO DE MENSAJE */}
        <form onSubmit={enviarMensaje} style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}
