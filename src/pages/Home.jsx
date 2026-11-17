import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Activity, HeartPulse, Sparkles } from 'lucide-react';
import { useHaptics } from '../hooks/useHaptics';

export default function Home() {
  const navigate = useNavigate();
  const { patterns } = useHaptics();

  const handleSelectLevel = (path) => {
    patterns.TAP();
    navigate(path);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto">
      <header className="pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest uppercase text-teal-400">
            Soma Grounding
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
            Offline Ready
          </span>
        </div>
        <h1 className="text-2xl font-bold mt-4 text-slate-50 leading-tight">
          ¿Cómo está tu cuerpo en este momento?
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Elige un nivel o acerca tu objeto sensorial NFC.
        </p>
      </header>

      <section aria-label="Semáforo de regulación somática" className="space-y-4 my-6">
        {/* NIVEL 1: PREVENTIVO */}
        <button
          onClick={() => handleSelectLevel('/nivel/preventivo')}
          className="w-full text-left p-5 rounded-2xl bg-emerald-950/50 border-2 border-emerald-500/40 hover:border-emerald-400 active:scale-[0.98] transition flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300">
            <ShieldCheck size={28} aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Nivel 1 · Pulsera de Cuentas
            </span>
            <h2 className="text-lg font-semibold text-slate-50">Calma y Autocuidado</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Mantener equilibrio, pausa consciente y hábitos.
            </p>
          </div>
        </button>

        {/* NIVEL 2: ALERTA */}
        <button
          onClick={() => handleSelectLevel('/nivel/alerta')}
          className="w-full text-left p-5 rounded-2xl bg-amber-950/50 border-2 border-amber-500/40 hover:border-amber-400 active:scale-[0.98] transition flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300">
            <Activity size={28} aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Nivel 2 · Laberinto Táctil
            </span>
            <h2 className="text-lg font-semibold text-slate-50">Estrés o Rumiación</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Bajar revoluciones, respiración 4-7-8 y foco.
            </p>
          </div>
        </button>

        {/* NIVEL 3: SOS CRISIS */}
        <button
          onClick={() => handleSelectLevel('/nivel/sos')}
          className="w-full text-left p-5 rounded-2xl bg-rose-950/60 border-2 border-rose-500/60 hover:border-rose-400 active:scale-[0.98] transition flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300">
            <HeartPulse size={28} aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Nivel 3 · Pebble TPE / Frío
            </span>
            <h2 className="text-lg font-semibold text-slate-50">Contención SOS</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Anclaje inmediato, vibración rítmica y tono 432 Hz.
            </p>
          </div>
        </button>
      </section>

      <footer className="pb-4">
        <button
          onClick={() => handleSelectLevel('/quiz')}
          className="w-full py-3.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition"
        >
          <Sparkles size={16} className="text-teal-400" />
          No estoy seguro, ayúdame a elegir (30 seg)
        </button>
      </footer>
    </main>
  );
}