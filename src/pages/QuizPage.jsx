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
