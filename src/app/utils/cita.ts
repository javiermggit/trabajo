export function resolveCitaId(rowOrId: any): string | number | null {
  if (rowOrId === undefined || rowOrId === null) return null;
  if (typeof rowOrId === 'string' || typeof rowOrId === 'number') return rowOrId;

  const candidate =
    rowOrId?.citaId ??
    rowOrId?.citaID ??
    rowOrId?.CitaId ??
    rowOrId?.CitaID ??
    rowOrId?.citaIdCode ??
    rowOrId?.consultaId ??
    rowOrId?.consultaID ??
    rowOrId?.ConsultaId ??
    rowOrId?.ConsultaID ??
    rowOrId?.id ??
    rowOrId?.Id ??
    rowOrId?.turnoId ??
    rowOrId?.TurnoId ??
    rowOrId?.turnoID ??
    rowOrId?.TurnoID ??
    null;

  if (candidate === undefined || candidate === null || candidate === '') return null;
  return candidate;
}

