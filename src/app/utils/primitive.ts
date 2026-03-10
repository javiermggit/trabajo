export function safeTrim(value: any): string {
  return String(value ?? '').trim();
}

export function toNumberOrNull(value: any): number | null {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

