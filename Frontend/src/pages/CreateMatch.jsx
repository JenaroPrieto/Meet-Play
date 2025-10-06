import { useState } from 'react';

export default function CreateMatch() {
  const [deporte, setDeporte] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Simulación: “guardar” en memoria / mostrar confirmación
    setMensaje(`✅ Partido creado: ${deporte} en ${ubicacion} el ${fecha} a las ${hora}`);
    // opcional: podrías guardar en localStorage si quieres persistir al refrescar
    setDeporte(''); setUbicacion(''); setFecha(''); setHora('');
  }

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h2>Crear partido (demo)</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Deporte<br/>
            <input value={deporte} onChange={e=>setDeporte(e.target.value)} required />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Ubicación<br/>
            <input value={ubicacion} onChange={e=>setUbicacion(e.target.value)} required />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Fecha<br/>
            <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} required />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Hora<br/>
            <input type="time" value={hora} onChange={e=>setHora(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Crear partido</button>
      </form>

      {mensaje && <p style={{ marginTop: 12 }}>{mensaje}</p>}
    </div>
  );
}
