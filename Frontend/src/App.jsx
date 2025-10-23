import { Link } from "react-router-dom";

export default function App() {
  return (
    <section className="landing">
      <div className="landing-card">
        <h1>
          {/* Usa el mismo logo del navbar (en /public) */}
          <img
            src="/Logo_M&P.jpg"   /* o reemplaza por /logo-pin.png si usas el nuevo ícono */
            alt=""                /* alt vacío para no repetir el texto del h1 */
            className="logo-inline"
            width={40}
            height={40}
            loading="eager"
            decoding="async"
          />
          {" "}Meet & Play
        </h1>

        <p>Únete a eventos deportivos anónimos de cualquier deporte, cerca de ti.</p>
        <div className="cta-row">
          <Link to="/partidos" className="btn btn-primary">Partidos Disponibles</Link>
          <Link to="/crear" className="btn btn-secondary">Crear Partido</Link>
        </div>
      </div>
    </section>
  );
}
