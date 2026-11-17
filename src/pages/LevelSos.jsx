import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, PhoneCall, Smartphone } from 'lucide-react';
import { useHaptics } from '../hooks/useHaptics';
import { useAudioGenerator } from '../hooks/useAudioGenerator';

export default function LevelSos() {
  const navigate = useNavigate();
  const { isSupported, patterns, stop: stopHaptics } = useHaptics();
  const { isPlaying, toggle432Hz, stop: stopAudio } = useAudioGenerator();
  const [phase, setPhase] = useState('INHALA'); // INHALA (4s) -> EXHALA (6s)

  useEffect(() => {
    let active = true;

    const runCycle = () => {
      if (!active) return;
      setPhase('INHALA');
      patterns.INHALE();

      setTimeout(() => {
        if (!active) return;
        setPhase('EXHALA');
        patterns.EXHALE();
      }, 4000);
    };

    runCycle();
    const interval = setInterval(runCycle, 10000);

    return () => {
      active = false;
      clearInterval(interval);
      stopHaptics();
      stopAudio();
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto bg-slate-950">
      <header className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          aria-label="Volver al semáforo"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
          Nivel 3 · Contención SOS
        </span>
        <div className="w-9" />
      </header>

      {/* Instrucción Somática Pebble TPE / Choque Térmico */}
      <section className="text-center space-y-6 my-auto">
        <p className="text-sm text-slate-300 bg-rose-950/40 border border-rose-500/30 rounded-xl p-3">
          Presiona tu <strong>Pebble TPE</strong> o apoya la <strong>placa fría</strong> en tu muñeca. Estás a salvo.
        </p>

        {/* Círculo Respiratorio Sincronizado */}
        <div className="relative flex items-center justify-center h-64">
          <div
            className={`rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center transition-all ease-in-out ${
              phase === 'INHALA' ? 'w-56 h-56 duration-[4000ms]' : 'w-32 h-32 duration-[6000ms]'
            }`}
          >
            <span
              role="status"
              aria-live="assertive"
              className="text-xl font-bold tracking-widest text-rose-200"
            >
              {phase}
            </span>
          </div>
        </div>

        {/* Controles Sensoriales */}
        <div className="flex justify-center gap-3">
          <button
            onClick={toggle432Hz}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition ${
              isPlaying
                ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            {isPlaying ? 'Tono 432 Hz Activo' : 'Activar Tono 432 Hz'}
          </button>

          {isSupported && (
            <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <Smartphone size={16} className="text-rose-400" />
              Háptica ON
            </div>
          )}
        </div>
      </section>

      {/* Red de Apoyo Directa (Fono 4141) */}
      <footer className="pb-4">
        <a
          href="tel:4141"
          className="w-full py-4 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition"
        >
          <PhoneCall size={18} />
          Llamar a Línea de Prevención (4141)
        </a>
      </footer>
    </main>
  );
}