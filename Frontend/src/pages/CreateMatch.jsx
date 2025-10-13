import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateMatch() {
  const [deporte, setDeporte] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setMensaje(`✅ Partido creado: ${deporte} en ${ubicacion} el ${fecha} a las ${hora}`);
    setDeporte('');
    setUbicacion('');
    setFecha('');
    setHora('');
  }

  return (
    <div className="page-center">
      <div className="card">
        <h2>Crear Partido</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Deporte</label>
            <input
              value={deporte}
              onChange={(e) => setDeporte(e.target.value)}
              placeholder="Ej: Fútbol"
              required
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Ubicación</label>
            <input
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder="Ej: Estadio Nacional"
              required
            />
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

        {mensaje && <p style={{ marginTop: 16 }}>{mensaje}</p>}
      </div>

      <div className="back-home">
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
}


