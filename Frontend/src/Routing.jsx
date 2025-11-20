import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import App from './App';
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateMatch from './pages/CreateMatch';
import MatchesList from './pages/MatchesList';
import Profile from "./pages/Profile";
import MyMatches from "./pages/MyMatches";



function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/crear" element={<CreateMatch />} />
          <Route path="/partidos" element={<MatchesList />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/mis-partidos" element={<MyMatches />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
