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