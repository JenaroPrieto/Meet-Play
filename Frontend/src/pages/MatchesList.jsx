import { useState } from 'react';
import { Link } from 'react-router-dom';

const PARTIDOS_MOCK = [
  {
    id: 1,
    nombre: 'Fútbol amistoso',
    deporte: 'Fútbol',
    fecha: '2025-10-10',
    hora: '19:00',
    direccion: 'Cancha Lo Castillo',
    cupos: 10,
    inscritos: 3,
  },
  {
    id: 2,
    nombre: 'Basket 3x3',
    deporte: 'Básquetbol',
    fecha: '2025-10-12',
    hora: '17:30',
    direccion: 'Plaza Ñuñoa',
    cupos: 6,
    inscritos: 5,
  },
];

export default function MatchesList() {
  const [partidos, setPartidos] = useState(PARTIDOS_MOCK);
  const [msg, setMsg] = useState('');

  function unirse(id) {
    setPartidos((prev) =>
      prev.map((p) =>
        p.id === id && p.inscritos < p.cupos
          ? { ...p, inscritos: p.inscritos + 1 }
          : p
      )
    );
    setMsg('✅ Te uniste (demo).');
    setTimeout(() => setMsg(''), 1500);
  }

  return (
    <div className="page-center">
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
        <h2>Partidos Disponibles</h2>
        {msg && <p>{msg}</p>}
        {partidos.length === 0 && <p>No hay partidos todavía.</p>}

        <div className="matches-container">
          {partidos.map((p) => (
            <div key={p.id} className="match-card">
              <div className="match-title">{p.nombre}</div>
              <div className="match-meta">
                <strong>Deporte:</strong> {p.deporte}<br />
                <strong>Fecha:</strong> {p.fecha}<br />
                <strong>Hora:</strong> {p.hora}<br />
                <strong>Dirección:</strong> {p.direccion}<br />
                <strong>Cupos:</strong> {p.inscritos}/{p.cupos}
              </div>
              <button
                onClick={() => unirse(p.id)}
                disabled={p.inscritos >= p.cupos}
              >
                {p.inscritos >= p.cupos ? 'Completo' : 'Unirse'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="back-home">
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
}


