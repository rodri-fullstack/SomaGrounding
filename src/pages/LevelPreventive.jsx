import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wind, Eye } from 'lucide-react';
import { useHaptics } from '../hooks/useHaptics';

const STEPS_54321 = [
  { count: 5, label: '5 cosas que puedes VER a tu alrededor' },
  { count: 4, label: '4 texturas que puedes TOCAR (recorre tu laberinto)' },
  { count: 3, label: '3 sonidos cercanos o lejanos que puedes ESCUCHAR' },
  { count: 2, label: '2 aromas que puedes OLER en el ambiente' },
  { count: 1, label: '1 sensación de apoyo en tus pies o manos' },
];

export default function LevelAlert() {
  const navigate = useNavigate();
  const { patterns, stop } = useHaptics();
  const [mode, setMode] = useState('BREATH'); // 'BREATH' | 'GROUNDING'
  const [phase, setPhase] = useState('INHALA (4s)');
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (mode !== 'BREATH') {
      stop();
      return;
    }

    let active = true;
    let holdTimer = null;
    let exhaleTimer = null;

    const cycle = () => {
      if (!active) return;
      setPhase('INHALA (4s)');
      patterns.INHALE();

      clearTimeout(holdTimer);
      clearTimeout(exhaleTimer);

      holdTimer = setTimeout(() => {
        if (!active) return;
        setPhase('SOSTÉN (7s)');
        patterns.HOLD();
      }, 4000);

      exhaleTimer = setTimeout(() => {
        if (!active) return;
        setPhase('EXHALA (8s)');
        patterns.EXHALE();
      }, 11000);
    };

    cycle();
    const timer = setInterval(cycle, 19000);
    return () => {
      active = false;
      clearInterval(timer);
      clearTimeout(holdTimer);
      clearTimeout(exhaleTimer);
      stop();
    };
  }, [mode, patterns, stop]);

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto bg-slate-950">
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            stop();
            navigate('/');
          }}
          aria-label="Volver al semáforo"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Nivel 2 · Alerta y Foco
        </span>
        <div className="w-9" aria-hidden="true" />
      </header>

      {/* Selector de herramienta */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 mt-4">
        <button
          type="button"
          aria-pressed={mode === 'BREATH'}
          onClick={() => setMode('BREATH')}
          className={`py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
            mode === 'BREATH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
          }`}
        >
          <Wind size={15} aria-hidden="true" /> Respiración 4-7-8
        </button>
        <button
          type="button"
          aria-pressed={mode === 'GROUNDING'}
          onClick={() => setMode('GROUNDING')}
          className={`py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
            mode === 'GROUNDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
          }`}
        >
          <Eye size={15} aria-hidden="true" /> Guía 5-4-3-2-1
        </button>
      </div>

      <section className="my-auto text-center space-y-6">
        <p className="text-sm text-slate-300 bg-amber-950/40 border border-amber-500/30 rounded-xl p-3">
          Recorre los surcos de tu <strong>laberinto táctil</strong> con la yema del pulgar mientras sigues el ritmo.
        </p>

        {mode === 'BREATH' ? (
          <div className="flex items-center justify-center h-60">
            <div
              className={`rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center transition-all ease-in-out ${
                phase.startsWith('INHALA')
                  ? 'w-52 h-52 duration-[4000ms]'
                  : phase.startsWith('SOSTÉN')
                  ? 'w-52 h-52 duration-1000'
                  : 'w-32 h-32 duration-[8000ms]'
              }`}
            >
              <span role="status" aria-live="polite" className="text-base font-bold text-amber-200">
                {phase}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4">
            <span className="inline-block text-4xl font-bold text-amber-400">
              {STEPS_54321[stepIdx].count}
            </span>
            <p className="text-base text-slate-100 font-medium">
              {STEPS_54321[stepIdx].label}
            </p>
            <button
              type="button"
              onClick={() => {
                patterns.TAP();
                setStepIdx((prev) => (prev + 1) % STEPS_54321.length);
              }}
              className="w-full py-3 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {stepIdx === STEPS_54321.length - 1 ? 'Reiniciar recorrido' : 'Siguiente sentido'}
            </button>
          </div>
        )}
      </section>

      <footer className="pb-4 text-center">
        <button
          type="button"
          onClick={() => navigate('/nivel/sos')}
          className="text-xs text-rose-400 underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded"
        >
          Si la intensidad sube, pasar directo a Contención SOS
        </button>
      </footer>
    </main>
  );
}