import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import App from './App';
import CreateMatch from './pages/CreateMatch';
import MatchesList from './pages/MatchesList';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/crear" element={<CreateMatch />} />
          <Route path="/partidos" element={<MatchesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
