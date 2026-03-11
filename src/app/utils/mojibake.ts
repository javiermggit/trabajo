// Heurística para corregir cadenas UTF-8 mal interpretadas como Latin1/Win-1252.
// Idempotente y conservadora: solo actúa si detecta patrones de "mojibake" comunes.
export function maybeFixMojibake(value: any): string {
  const text = String(value ?? '');
  if (!text) return text;

  // Patrones típicos (muy frecuentes en ES):
  // - "AVENDAÃ‘O" (Ñ) => "Ã‘" (Ã + ‘)
  // - "MUÃ‘OZ" (ñ)    => "Ã±" (Ã + ±)
  // - "GARCÃ­A" (í)   => "Ã­" (Ã + soft hyphen)
  // - "Â¿" / "Â¡"
  const looksBroken = /Ã(?:[¡©±³º¼\u00AD]|[‘’“”])|Â[¡¿]|Ãƒ|Ã¢|â€|â€™/.test(text);
  if (!looksBroken) return text;

  const win1252Map: Record<number, number> = {
    0x20ac: 0x80, // €
    0x201a: 0x82, // ‚
    0x0192: 0x83, // ƒ
    0x201e: 0x84, // „
    0x2026: 0x85, // …
    0x2020: 0x86, // †
    0x2021: 0x87, // ‡
    0x02c6: 0x88, // ˆ
    0x2030: 0x89, // ‰
    0x0160: 0x8a, // Š
    0x2039: 0x8b, // ‹
    0x0152: 0x8c, // Œ
    0x017d: 0x8e, // Ž
    0x2018: 0x91, // ‘
    0x2019: 0x92, // ’
    0x201c: 0x93, // “
    0x201d: 0x94, // ”
    0x2022: 0x95, // •
    0x2013: 0x96, // –
    0x2014: 0x97, // —
    0x02dc: 0x98, // ˜
    0x2122: 0x99, // ™
    0x0161: 0x9a, // š
    0x203a: 0x9b, // ›
    0x0153: 0x9c, // œ
    0x017e: 0x9e, // ž
    0x0178: 0x9f, // Ÿ
  };

  // Re-encodar la string a bytes 0-255 (win1252/latin1) y decodificar como UTF-8.
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    const codePoint = text.charCodeAt(i);
    if (codePoint <= 0xff) {
      bytes[i] = codePoint;
      continue;
    }
    const mapped = win1252Map[codePoint];
    if (mapped === undefined) {
      return text;
    }
    bytes[i] = mapped;
  }

  try {
    const fixed = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    // Solo aplicar si realmente mejora (reduce patrones rotos).
    if (/Ã(?:[¡©±³º¼\u00AD]|[‘’“”])|Â[¡¿]|Ãƒ|Ã¢|â€|â€™/.test(fixed)) return text;
    return fixed;
  } catch {
    return text;
  }
}
