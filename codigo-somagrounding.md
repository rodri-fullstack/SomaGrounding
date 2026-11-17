]633;E;{   for f in package.json vite.config.js index.html public/manifest.json public/sw.js $(find src -type f \\( -name "*.js" -o -name "*.jsx" -o -name "*.css" \\))\x3b do     [ -f "$f" ] && echo -e "\\n\\n## Archivo: $f\\n\\`\\`\\`" && cat "$f" && echo -e "\\n\\`\\`\\`"\x3b   done\x3b } > codigo-somagrounding.md;67dd84a2-6dd0-4b01-9d89-803fe62632b9]633;C

## Archivo: package.json
```
{
  "name": "somagrounding",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "idb": "^8.0.4",
    "lucide-react": "^1.72.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-router-dom": "^7.18.5"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.5",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.90.0",
    "tailwindcss": "^4.3.5",
    "vite": "^8.3.6"
  }
}

```


## Archivo: vite.config.js
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```


## Archivo: index.html
```
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Soma Grounding</title>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#0d9488" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Soma Grounding" />
  </head>
  <body class="bg-slate-950 text-slate-50 antialiased selection:bg-teal-500/30">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```


## Archivo: public/manifest.json
```
{
  "short_name": "Soma Grounding",
  "name": "Soma Grounding - Autorregulación Somática",
  "description": "Plataforma phygital de autorregulación somática vía NFC",
  "icons": [
    {
      "src": "/vite.svg",
      "type": "image/svg+xml",
      "sizes": "192x192 512x512",
      "purpose": "any maskable"
    }
  ],
  "start_url": "/?source=pwa",
  "background_color": "#020617",
  "theme_color": "#0d9488",
  "display": "standalone",
  "orientation": "portrait"
}
```


## Archivo: public/sw.js
```
const CACHE_NAME = 'soma-grounding-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});
```


## Archivo: src/App.css
```
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```


## Archivo: src/App.jsx
```
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LevelPreventive from './pages/LevelPreventive';
import LevelAlert from './pages/LevelAlert';
import LevelSos from './pages/LevelSos';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nivel/preventivo" element={<LevelPreventive />} />
        <Route path="/nivel/alerta" element={<LevelAlert />} />
        <Route path="/nivel/sos" element={<LevelSos />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```


## Archivo: src/hooks/useAudioGenerator.js
```
import { useRef, useState } from 'react';

export const useAudioGenerator = () => {
  const ctxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle432Hz = async () => {
    if (isPlaying) {
      stop();
      return;
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!ctxRef.current) ctxRef.current = new AudioCtx();
    if (ctxRef.current.state === 'suspended') await ctxRef.current.resume();

    const osc = ctxRef.current.createOscillator();
    const gain = ctxRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, ctxRef.current.currentTime);

    gain.gain.setValueAtTime(0, ctxRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctxRef.current.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctxRef.current.destination);
    osc.start();

    oscRef.current = osc;
    gainRef.current = gain;
    setIsPlaying(true);
  };

  const stop = () => {
    try {
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.3);
      }
      setTimeout(() => {
        oscRef.current?.stop();
        oscRef.current?.disconnect();
        setIsPlaying(false);
      }, 320);
    } catch {
      setIsPlaying(false);
    }
  };

  return { isPlaying, toggle432Hz, stop };
};
```


## Archivo: src/hooks/useHaptics.js
```
export const useHaptics = () => {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const vibrate = (pattern) => {
    if (!isSupported) return;
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Fallo silencioso en navegadores con políticas restrictivas
    }
  };

  const patterns = {
    INHALE: () => vibrate(80),
    HOLD: () => vibrate(40),
    EXHALE: () => vibrate([100, 60, 150]),
    SOS_HEARTBEAT: () => vibrate([120, 100, 120, 700]),
    TAP: () => vibrate(35),
  };

  const stop = () => {
    if (isSupported) navigator.vibrate(0);
  };

  return { isSupported, patterns, stop };
};
```


## Archivo: src/index.css
```
@import "tailwindcss";
```


## Archivo: src/main.jsx
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```


## Archivo: src/pages/Home.jsx
```
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
```


## Archivo: src/pages/LevelAlert.jsx
```
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
    const cycle = () => {
      if (!active) return;
      setPhase('INHALA (4s)');
      patterns.INHALE();

      setTimeout(() => {
        if (!active) return;
        setPhase('SOSTÉN (7s)');
        patterns.HOLD();
      }, 4000);

      setTimeout(() => {
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
      stop();
    };
  }, [mode]);

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto bg-slate-950">
      <header className="flex items-center justify-between">
        <button
          onClick={() => {
            stop();
            navigate('/');
          }}
          aria-label="Volver al semáforo"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Nivel 2 · Alerta y Foco
        </span>
        <div className="w-9" />
      </header>

      {/* Selector de herramienta */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 mt-4">
        <button
          onClick={() => setMode('BREATH')}
          className={`py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
            mode === 'BREATH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
          }`}
        >
          <Wind size={15} /> Respiración 4-7-8
        </button>
        <button
          onClick={() => setMode('GROUNDING')}
          className={`py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
            mode === 'GROUNDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
          }`}
        >
          <Eye size={15} /> Guía 5-4-3-2-1
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
                  ? 'w-52 h-52 duration-4000'
                  : phase.startsWith('SOSTÉN')
                  ? 'w-52 h-52 duration-1000'
                  : 'w-32 h-32 duration-8000'
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
              onClick={() => {
                patterns.TAP();
                setStepIdx((prev) => (prev + 1) % STEPS_54321.length);
              }}
              className="w-full py-3 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 text-sm font-semibold"
            >
              {stepIdx === STEPS_54321.length - 1 ? 'Reiniciar recorrido' : 'Siguiente sentido'}
            </button>
          </div>
        )}
      </section>

      <footer className="pb-4 text-center">
        <button
          onClick={() => navigate('/nivel/sos')}
          className="text-xs text-rose-400 underline underline-offset-4"
        >
          Si la intensidad sube, pasar directo a Contención SOS
        </button>
      </footer>
    </main>
  );
}
```


## Archivo: src/pages/LevelPreventive.jsx
```
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
```


## Archivo: src/pages/LevelSos.jsx
```
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
```


## Archivo: src/pages/NfcResolver.jsx
```
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
```


## Archivo: src/pages/QuizPage.jsx
```
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useHaptics } from '../hooks/useHaptics';

const QUESTIONS = [
  {
    q: '¿Cómo sientes tu respiración y pecho ahora?',
    options: [
      { text: 'Tranquila y fluida', pts: 1 },
      { text: 'Acelerada o con tensión', pts: 2 },
      { text: 'Muy agitada o con presión', pts: 3 },
    ],
  },
  {
    q: '¿Cómo está el ritmo de tus pensamientos?',
    options: [
      { text: 'Enfocados o en calma', pts: 1 },
      { text: 'Dando vueltas sin parar', pts: 2 },
      { text: 'Desbordados o bloqueados', pts: 3 },
    ],
  },
  {
    q: '¿Qué necesita tu cuerpo en este instante?',
    options: [
      { text: 'Mantener mi equilibrio diario', pts: 1 },
      { text: 'Bajar revoluciones y enfocarme', pts: 2 },
      { text: 'Anclarme y contenerme ahora', pts: 3 },
    ],
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const { patterns } = useHaptics();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (pts) => {
    patterns.TAP();
    const total = score + pts;
    if (index < QUESTIONS.length - 1) {
      setScore(total);
      setIndex(index + 1);
    } else {
      if (total >= 8) navigate('/nivel/sos');
      else if (total >= 5) navigate('/nivel/alerta');
      else navigate('/nivel/preventivo');
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto bg-slate-950">
      <header className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          aria-label="Volver"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-semibold text-teal-400">
          Paso {index + 1} de {QUESTIONS.length}
        </span>
        <div className="w-9" />
      </header>

      <section className="space-y-6 my-auto">
        <h1 className="text-xl font-bold text-slate-50 leading-snug">
          {QUESTIONS[index].q}
        </h1>
        <div className="space-y-3">
          {QUESTIONS[index].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt.pts)}
              className="w-full p-4 text-left rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-400 text-slate-100 text-sm font-medium transition active:scale-[0.98]"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </section>

      <div className="h-4" />
    </main>
  );
}

```
