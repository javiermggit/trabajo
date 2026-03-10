// Heurística para corregir cadenas UTF-8 mal interpretadas como Latin1/Win-1252.
// Mantener implementación idéntica a la usada en `VistahcComponent` para evitar cambios de comportamiento.
export function maybeFixMojibake(value: any): string {
  const text = String(value ?? '');
  if (!text) return text;

  const looksBroken = /Ãƒ.|Ã‚.|Ã¢[â‚¬â„¢â€œâ€â€“â€”]/.test(text);
  if (!looksBroken) return text;

  const win1252Map: Record<number, number> = {
    0x20ac: 0x80, // â‚¬
    0x201a: 0x82, // â€š
    0x0192: 0x83, // Æ’
    0x201e: 0x84, // â€ž
    0x2026: 0x85, // â€¦
    0x2020: 0x86, // â€ 
    0x2021: 0x87, // â€¡
    0x02c6: 0x88, // Ë†
    0x2030: 0x89, // â€°
    0x0160: 0x8a, // Å 
    0x2039: 0x8b, // â€¹
    0x0152: 0x8c, // Å’
    0x017d: 0x8e, // Å½
    0x2018: 0x91, // â€˜
    0x2019: 0x92, // â€™
    0x201c: 0x93, // â€œ
    0x201d: 0x94, // â€
    0x2022: 0x95, // â€¢
    0x2013: 0x96, // â€“
    0x2014: 0x97, // â—
    0x02dc: 0x98, // Ëœ
    0x2122: 0x99, // â„¢
    0x0161: 0x9a, // Å¡
    0x203a: 0x9b, // â€º
    0x0153: 0x9c, // Å“
    0x017e: 0x9e, // Å¾
    0x0178: 0x9f, // Å¸
  };

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
    if (/Ãƒ.|Ã‚.|Ã¢[â‚¬â„¢â€œâ€â€“â€”]/.test(fixed)) return text;
    return fixed;
  } catch {
    return text;
  }
}

