import { useState } from 'react';

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
    setPartidos(prev =>
      prev.map(p =>
        p.id === id && p.inscritos < p.cupos
          ? { ...p, inscritos: p.inscritos + 1 }
          : p
      )
    );
    setMsg('✅ Te uniste (demo).');
    setTimeout(() => setMsg(''), 1500);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Partidos disponibles (demo)</h2>
      {msg && <p>{msg}</p>}
      {partidos.length === 0 && <p>No hay partidos todavía.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {partidos.map(p => (
          <li key={p.id} style={{ border: '1px solid #ddd', marginBottom: 8, padding: 8 }}>
            <div><b>{p.nombre}</b></div>
            <div><b>Deporte:</b> {p.deporte}</div>
            <div><b>Fecha:</b> {p.fecha} — <b>Hora:</b> {p.hora}</div>
            <div><b>Dirección:</b> {p.direccion}</div>
            <div><b>Cupos:</b> {p.inscritos}/{p.cupos}</div>
            <button
              onClick={() => unirse(p.id)}
              disabled={p.inscritos >= p.cupos}
              style={{ marginTop: 6 }}
            >
              {p.inscritos >= p.cupos ? 'Completo' : 'Unirse'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
