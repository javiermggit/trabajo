import { CitasImpresion } from "./Medico";
import { Acompañante, AntecedenteFamiliar, AntecedenteGinecoObstetrico, AntecedentePatologicos, Cup, DiagnosticoPrincipal, Especialidad, Profesional, Sede, VMAntecedente, VMDiagnostico, VMPaciente } from "./Modelos";

export class HCAnestesiologia  {
  citaId: string;
  consultaId: number;
  fechaCreacion: string;
  profesional: Profesional;
  especialidad: Especialidad;
  sede: Sede;
  datosUsuario: VMPaciente;
  acompanante: Acompañante;
  motivo: string;
  ultimaEnfermedad: string;
  resultadoLaboratorio?: any[] = [];
  resultadoImagenologia?: any[] = [];
  resultadoApoyoDX?: any[] = [];
  analisisYplan: string;
  diagnosticos: VMDiagnostico[];
  diagnosticoPrincipal: DiagnosticoPrincipal;
  incapacidad?: any;
  certificadoAislamiento?: any;
  certificadoReintegro?: any;
  valoracionPrequirurgica: ValoracionPrequirurgica;
  recomendacionesMedicas: string;
  citaImpresion: CitasImpresion;
  antecedenteFamiliar: AntecedenteFamiliar;
  antecedenteGinecoObstetrico: AntecedenteGinecoObstetrico;
  antecedentePatologicos: AntecedentePatologicos;
  quirurgicos: VMAntecedente[];
  traumaticos: any[];
  transfusiones: any[];
  alergicos: VMAntecedente[];
  farmacologicos: VMAntecedente[];
  medicamento?: any;
  listadoOrdenamientos: any[];
}

export class ValoracionPrequirurgica {
  radicacion?: any;
  interpretacionAyudaDx: InterpretacionAyudaDx;
  examenesFisicosSignosVitales: ExamenesFisicosSignosVitales;
  valoracionClinica: ValoracionClinica[];
  estados: Estados;
  definicionRiesgo: DefinicionRiesgo;
}

export class DefinicionRiesgo {
  clasificacionASA: ClasificacionASA;
  categoriaRiesgo: ClasificacionASA;
  clasificacionViaAerea: ClasificacionASA;
  riesgoTromboembolismo: ClasificacionASA;
  clasificacionViabilidad: ClasificacionASA;
  destinoCirugia: ClasificacionASA;
  justificacionDestino: string;
  procedimientosViables: Viabilidad[];
  observacion: string;
}

export class Estados {
  nutricional: string;
  observacionNutricional: string;
  pulmonar: string;
  observacionPulmonar: string;
}

export class ValoracionClinica {
  id: number;
  descripcion: string;
  hijos: Hijo[];
  observacion: string;
}

export class InterpretacionAyudaDx {
  protombina: number;
  protombinaFecha?: any;
  glicemia: number;
  glicemiaFecha?: any;
  tpt: number;
  tptFecha?: any;
  creatinina?: any;
  creatininaFecha?: any;
  hemograma: string;
  hemogramaFecha?: any;
  electrocardiograma: string;
  electrocardiogramaFecha?: any;
  radiografiaTorax?: any;
  radiografiaToraxFecha?: any;
  tsh?: any;
  tshFecha?: any;
  otrosExamenes?: any;
}

export class ExamenesFisicosSignosVitales {
  peso: number;
  talla: number;
  imc: number;
  taSistolica?: any;
  taDiastolica?: any;
  frecuenciaRespiratoria?: any;
  frecuenciaCardiaca?: any;
  saturacionOxigeno?: any;
  temperatura?: any;
}

export class Hijo {
  id: number;
  pregunta: string;
  respuesta: boolean;
}

export class ClasificacionASA {
  id: number;
  descripcion: string;
  otros: string;
}

export class Viabilidad {
  procedimiento: Cup;
  viable: boolean;
}
