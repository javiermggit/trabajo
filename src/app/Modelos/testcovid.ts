
export class TestCovid_Log {
  Id: number;
  Tipo_identificacion: string;
  Identificacion: string;
  NombrePaciente: string;
  Correo: string;
  Celular: string;
  Telefono: string;
  Eps: string;
  Calificaciontotal: number;
  Ip: string;
  UsuarioAtencion: number;
  html: String;
  Preguntas: Array<TestCovid_Log_Detalle>;
  Contrato: String;
  Origen: String;
}

export class TestCovid_Log_Detalle {
  Pregunta: string;
  Respuesta: string;
  puntaje: number;
  sw: boolean;
  modelo: string;
}