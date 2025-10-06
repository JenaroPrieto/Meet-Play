import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CreateMatch from './pages/CreateMatch';
import MatchesList from './pages/MatchesList';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal (por ahora App, podría ser Home más adelante) */}
        <Route path="/" element={<App />} />

        {/* Tu pantalla para crear partidos */}
        <Route path="/crear" element={<CreateMatch />} />

        {/* Tu pantalla para ver/unirse a partidos */}
        <Route path="/partidos" element={<MatchesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
