// Sanitizers compartidos. Mantener comportamiento idéntico a la implementación original.

export function sanitizarTerminoProfesional(value: string): string {
  return String(value ?? '')
    .replace(/[^\p{L}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
