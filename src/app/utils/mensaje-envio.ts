export type MensajeEnvioHistoriaClinicaParams = {
  tipoTexto: string;
  medico: string;
  especialidad: string;
  fechaTexto: string;
  linkPdf?: string;
};

// Mantener el mensaje idéntico al construido en `ReimpresionComponent.construirMensajeEnvio`.
export function buildMensajeEnvioHistoriaClinica(params: MensajeEnvioHistoriaClinicaParams): string {
  const tipoTexto = params?.tipoTexto ?? '';
  const medico = params?.medico ?? 'N/A';
  const especialidad = params?.especialidad ?? 'N/A';
  const fecha = params?.fechaTexto ?? 'N/A';
  const linkTexto = params?.linkPdf ? `\nEnlace: ${params.linkPdf}` : '';
  return `Adjunto Historia Clínica ${tipoTexto}.\nMédico: ${medico}\nEspecialidad: ${especialidad}\nFecha: ${fecha}${linkTexto}`;
}

