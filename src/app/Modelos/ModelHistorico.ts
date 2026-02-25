import { DatosTomaCitologia } from "./Cervix";
import { Especialidad } from "./Medico";
import { Profesional } from "./Modelos";

export class HistoricoAtencionPrimaria {
  motivo: string;
  ultimaEnfermedad: string;
  fechaCreacion: Date;
  profesional: Profesional;
  especialidad: Especialidad;
}

export class VMDatoMuestraCitologia {
  consultaId: number;
  datosTomaCitologia: DatosTomaCitologia;
  profesional: VMProfesionalEspecialidad;
}

export class VMProfesionalEspecialidad {
  profesional: string;
  especialidad: string;
 
}