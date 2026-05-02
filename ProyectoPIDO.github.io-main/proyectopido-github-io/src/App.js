import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Intercambio from './pages/Intercambio';
import HistorialTransacciones from './pages/HistorialTransacciones';
import Enviar from './pages/Enviar';

function App() {
  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas principales */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/intercambio" element={<Intercambio />} />
        <Route path="/historial" element={<HistorialTransacciones />} />
        <Route path="/enviar" element={<Enviar />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
