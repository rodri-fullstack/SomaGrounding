import { useCallback, useEffect, useRef, useState } from 'react';

export const useAudioGenerator = () => {
  const ctxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const stopTimerRef = useRef(null);
  const startingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    const osc = oscRef.current;
    const gain = gainRef.current;
    oscRef.current = null;
    gainRef.current = null;
    startingRef.current = false;
    setIsPlaying(false);

    if (!osc) return;

    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }

    try {
      if (gain && ctxRef.current) {
        const now = ctxRef.current.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
      }

      stopTimerRef.current = setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
          gain?.disconnect();
        } catch {
          // El oscilador ya fue detenido
        } finally {
          stopTimerRef.current = null;
        }
      }, 320);
    } catch {
      try {
        osc.stop();
        osc.disconnect();
        gain?.disconnect();
      } catch {
        // Sin acción pendiente
      }
    }
  }, []);

  const toggle432Hz = useCallback(async () => {
    if (isPlaying || oscRef.current) {
      stop();
      return;
    }

    if (startingRef.current) return;
    startingRef.current = true;

    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!ctxRef.current) ctxRef.current = new AudioCtx();
      if (ctxRef.current.state === 'suspended') {
        await ctxRef.current.resume();
      }

      const now = ctxRef.current.currentTime;
      const osc = ctxRef.current.createOscillator();
      const gain = ctxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 1.2);

      osc.connect(gain);
      gain.connect(ctxRef.current.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } finally {
      startingRef.current = false;
    }
  }, [isPlaying, stop]);

  useEffect(() => {
    return () => {
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
      try {
        oscRef.current?.stop();
        oscRef.current?.disconnect();
        gainRef.current?.disconnect();
      } catch {
        // Limpieza silenciosa al desmontar
      }
      oscRef.current = null;
      gainRef.current = null;
    };
  }, []);

  return { isPlaying, toggle432Hz, stop };
};