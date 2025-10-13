import { Link } from "react-router-dom";

export default function App() {
  return (
    <section className="landing">
      <div className="landing-card">
        <h1>Meet & Play</h1>
        <p>Únete a eventos deportivos anónimos de cualquier deporte, cerca de ti.</p>
        <div className="cta-row">
          <Link to="/partidos" className="btn btn-primary">Partidos Disponibles</Link>
          <Link to="/crear" className="btn btn-secondary">Crear Partido</Link>
        </div>
      </div>
    </section>
  );
}

