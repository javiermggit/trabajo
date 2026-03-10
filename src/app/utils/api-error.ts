export function resolveApiErrorMessage(error: any, fallback: string = 'Ocurrió un error'): string {
  const candidate =
    error?.error?.mensaje ??
    error?.error?.error ??
    error?.mensaje ??
    error?.error ??
    error?.message ??
    error?.statusText ??
    fallback;

  const text = String(candidate ?? '').trim();
  return text || fallback;
}

