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