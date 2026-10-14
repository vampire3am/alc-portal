export const estimateIeltsBand = (correct: number, total: number): number | null => {
  if (total <= 0 || correct < 0) return null;

  const ratio = Math.min(correct, total) / total;
  if (ratio >= 0.9) return 9;
  if (ratio >= 0.8) return 8;
  if (ratio >= 0.7) return 7;
  if (ratio >= 0.6) return 6.5;
  if (ratio >= 0.5) return 6;
  if (ratio >= 0.4) return 5.5;
  return 5;
};

export const formatCountdown = (seconds: number): string => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
};
