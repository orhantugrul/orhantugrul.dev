/** 222000 → "3:42" */
export function clock(ms: number): string {
  const seconds = Math.round(ms / 1000);
  const ss = String(seconds % 60).padStart(2, "0");
  if (seconds < 3600) return `${Math.floor(seconds / 60)}:${ss}`;
  const mm = String(Math.floor(seconds / 60) % 60).padStart(2, "0");
  return `${Math.floor(seconds / 3600)}:${mm}:${ss}`;
}

/** Total running time, the way a record sleeve prints it: "58 min", "1 h 52 min". */
export function runtime(lengths: number[]): string {
  const minutes = Math.round(lengths.reduce((t, ms) => t + ms, 0) / 60_000);
  return minutes < 60
    ? `${minutes} min`
    : `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}
