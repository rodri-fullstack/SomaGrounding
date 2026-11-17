import { useCallback, useMemo } from 'react';

export const useHaptics = () => {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const vibrate = useCallback(
    (pattern) => {
      if (!isSupported) return;
      try {
        navigator.vibrate(pattern);
      } catch {
        // Fallo silencioso en navegadores con políticas restrictivas
      }
    },
    [isSupported]
  );

  const patterns = useMemo(
    () => ({
      INHALE: () => vibrate(80),
      HOLD: () => vibrate(40),
      EXHALE: () => vibrate([100, 60, 150]),
      SOS_HEARTBEAT: () => vibrate([120, 100, 120, 700]),
      TAP: () => vibrate(35),
    }),
    [vibrate]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    try {
      navigator.vibrate(0);
    } catch {
      // Fallo silencioso
    }
  }, [isSupported]);

  return { isSupported, patterns, stop };
};