export type HistoriaClinicaCorreoHtmlParams = {
  tipoTexto: string;
  paciente: string;
  medico: string;
  especialidad: string;
  fechaTexto: string;
  linkPdf: string;
};

// Mantener HTML idéntico a `ReimpresionComponent.construirHtmlCorreo` para no cambiar el comportamiento.
export function buildHistoriaClinicaCorreoHtml(params: HistoriaClinicaCorreoHtmlParams): string {
  const tipoTexto = params?.tipoTexto ?? '';
  const paciente = params?.paciente ?? '';
  const medico = params?.medico ?? '';
  const especialidad = params?.especialidad ?? '';
  const fecha = params?.fechaTexto ?? '';
  const linkPdf = params?.linkPdf ?? '';

  return `<div style="font-family:Segoe UI,Arial,sans-serif;color:#1f2937;">
      <h3 style="margin:0 0 10px;">Historia Clínica ${tipoTexto}</h3>
      <p style="margin:0 0 8px;">Paciente: ${paciente}</p>
      <p style="margin:0 0 8px;">Médico: ${medico}</p>
      <p style="margin:0 0 8px;">Especialidad: ${especialidad}</p>
      <p style="margin:0 0 12px;">Fecha: ${fecha}</p>
      <a href="${linkPdf}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;padding:8px 14px;background:#2d6cdf;color:#fff;text-decoration:none;border-radius:6px;">
         Descargar historia clínica
      </a>
    </div>`;
}

