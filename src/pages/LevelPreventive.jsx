import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Wind, 
  Droplets, 
  Zap, 
  Heart, 
  Volume2, 
  VolumeX, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { useHaptics } from '../hooks/useHaptics';
import { useAudioGenerator } from '../hooks/useAudioGenerator';

export default function LevelPreventive() {
  const navigate = useNavigate();
  const { patterns } = useHaptics();
  const { isPlaying, toggle432Hz, stop } = useAudioGenerator();

  // Estado del contador de cuentas (Q1: Respiración)
  const [beadsCount, setBeadsCount] = useState(0);

  // Estados de los otros 3 cuadrantes de autocuidado
  const [waterDone, setWaterDone] = useState(false);
  const [postureDone, setPostureDone] = useState(false);
  const [gratitudeDone, setGratitudeDone] = useState(false);

  // Manejo del contador táctil (Q1)
  const handleBeadTap = () => {
    patterns.TAP();
    setBeadsCount((prev) => (prev >= 10 ? 1 : prev + 1));
  };

  const handleResetBeads = (e) => {
    e.stopPropagation();
    patterns.TAP();
    setBeadsCount(0);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between p-5 max-w-md mx-auto bg-stone-950 text-stone-100 font-sans select-none">
      
      {/* 1. Header con navegación y badge de semáforo */}
      <header className="flex items-center justify-between">
        <button
          onClick={() => {
            stop();
            navigate('/');
          }}
          aria-label="Volver al semáforo"
          className="p-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-300 active:scale-95 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Nivel 1 · Autocuidado
          </span>
        </div>
        <div className="w-9" />
      </header>

      {/* 2. Banner de consigna somática amigable */}
      <div className="my-2 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-3.5 text-center">
        <p className="text-xs text-stone-300 leading-relaxed">
          Toca el cuadrante que tu cuerpo necesite hoy. 
          <span className="text-emerald-400 font-medium"> Cada pausa consciente cuenta.</span>
        </p>
      </div>

      {/* 3. Matriz Phygital de 4 Cuadrantes (2x2) */}
      <section className="grid grid-cols-2 gap-3.5 my-auto">
        
        {/* Q1: Respiración y Cuentas (Pulmones) */}
        <div
          onClick={handleBeadTap}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[145px] active:scale-[0.98] ${
            beadsCount > 0
              ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
              : 'bg-stone-900/70 border-stone-800/80 hover:border-stone-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wind size={20} />
            </div>
            {beadsCount > 0 && (
              <button 
                onClick={handleResetBeads} 
                title="Reiniciar conteo"
                className="text-stone-500 hover:text-stone-300 p-1"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-stone-50">{beadsCount}</span>
              <span className="text-xs text-stone-500 font-medium">/ 10</span>
            </div>
            <p className="text-[11px] font-medium text-stone-300 mt-0.5 leading-tight">
              {beadsCount >= 10 ? '¡Ciclo completado!' : 'Deslizar y exhalar'}
            </p>
          </div>
        </div>

        {/* Q2: Hidratación Consciente (Gota de agua) */}
        <div
          onClick={() => {
            patterns.TAP();
            setWaterDone(!waterDone);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[145px] active:scale-[0.98] ${
            waterDone
              ? 'bg-sky-950/40 border-sky-500/50 shadow-lg shadow-sky-950/20'
              : 'bg-stone-900/70 border-stone-800/80 hover:border-stone-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Droplets size={20} />
            </div>
            {waterDone && <Check size={16} className="text-sky-400" />}
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-100">Hidratación</span>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              {waterDone ? 'Agua fresca registrada.' : 'Un sorbo despacio y consciente.'}
            </p>
          </div>
        </div>

        {/* Q3: Postura y Descarga Somática (Rayo corporal) */}
        <div
          onClick={() => {
            patterns.TAP();
            setPostureDone(!postureDone);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[145px] active:scale-[0.98] ${
            postureDone
              ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-950/20'
              : 'bg-stone-900/70 border-stone-800/80 hover:border-stone-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap size={20} />
            </div>
            {postureDone && <Check size={16} className="text-amber-400" />}
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-100">Cuerpo y Postura</span>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              {postureDone ? 'Hombros y mandíbula sueltos.' : 'Baja hombros, apoya pies.'}
            </p>
          </div>
        </div>

        {/* Q4: Conexión Segura / Gratitud (Corazón / Nanai) */}
        <div
          onClick={() => {
            patterns.TAP();
            setGratitudeDone(!gratitudeDone);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[145px] active:scale-[0.98] ${
            gratitudeDone
              ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/20'
              : 'bg-stone-900/70 border-stone-800/80 hover:border-stone-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Heart size={20} />
            </div>
            {gratitudeDone && <Check size={16} className="text-rose-400" />}
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-100">Pausa Segura</span>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              {gratitudeDone ? 'Momento de respiro para ti.' : 'Una persona o idea amable.'}
            </p>
          </div>
        </div>

      </section>

      {/* 4. Footer con Ambiente Sonoro 432 Hz */}
      <footer className="pt-3 pb-2">
        <button
          onClick={toggle432Hz}
          className={`w-full py-3.5 px-4 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2.5 transition active:scale-95 ${
            isPlaying
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950/30'
              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{isPlaying ? 'Ambiente 432 Hz Activo' : 'Activar Ambiente 432 Hz'}</span>
        </button>
      </footer>

    </main>
  );
}