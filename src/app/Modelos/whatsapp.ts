export interface EnviarPlantillaGupshup {
  from: string;
  to: string;
  templete: {
    id: string;
    params: string[];
  };
}

export interface EnviarPlantillaCorreo {
  correo: string;
  htmlBody: string;
  asunto: string;
  tipoCorreo: string;
  consecutivoAsociado: number;
}

export interface UploadHCResponse {
  isError: boolean;
  mensaje: string;
  link: string;
}
