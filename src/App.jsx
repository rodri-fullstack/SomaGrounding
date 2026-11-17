import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LevelPreventive from './pages/LevelPreventive';
import LevelAlert from './pages/LevelAlert';
import LevelSos from './pages/LevelSos';
import QuizPage from './pages/QuizPage';
import NfcResolver from './pages/NfcResolver';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nivel/preventivo" element={<LevelPreventive />} />
        <Route path="/nivel/alerta" element={<LevelAlert />} />
        <Route path="/nivel/sos" element={<LevelSos />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/nfc/:tag" element={<NfcResolver />} />
        <Route path="/nfc" element={<NfcResolver />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}