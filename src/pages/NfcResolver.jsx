import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

export default function NfcResolver() {
  const { tag } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const raw = (searchParams.get('tag') || tag || '').toUpperCase();

  useEffect(() => {
    if (raw.includes('PEBBLE') || raw.includes('SOS') || raw.includes('N3')) {
      navigate('/nivel/sos', { replace: true });
    } else if (raw.includes('LABERINTO') || raw.includes('ALERTA') || raw.includes('N2')) {
      navigate('/nivel/alerta', { replace: true });
    } else if (raw.includes('PULSERA') || raw.includes('PREV') || raw.includes('N1')) {
      navigate('/nivel/preventivo', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [raw, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-teal-400">
      <p role="status" aria-live="polite">Conectando objeto sensorial...</p>
    </main>
  );
}