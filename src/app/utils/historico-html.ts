import { escapeHtml } from 'src/app/utils/string';

function formatHistoricoDate(value: any): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return escapeHtml(String(value));
  return d.toLocaleDateString('es-CO');
}

// Mantener HTML idéntico al generado por `VistahcComponent` para evitar cambios visuales.
export function buildHistoricoHtml(citas: any[]): string {
  const rows = (citas ?? []).map((cita: any) => {
    const fecha = formatHistoricoDate(cita?.fechaCita);
    const profesional = escapeHtml(cita?.nombreProfesional ?? '');
    const asistio = cita?.asistioCita ? 'Sí' : 'No';
    const asistioClass = cita?.asistioCita ? '' : ' style="color:#dc2626;font-weight:600;"';
    const especialidad = escapeHtml(cita?.especialidad ?? '');
    const programa = escapeHtml(cita?.programa ?? '');

    return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${fecha}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${profesional}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;"${asistioClass}>${asistio}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${especialidad}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${programa}</td>
        </tr>
      `;
  }).join('');

  return `
      <div style="max-height:420px;overflow:auto;text-align:left;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Fecha</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Profesional</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Asistió</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Especialidad</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Programa</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
}

