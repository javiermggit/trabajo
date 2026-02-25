import { PatronesCrecimiento } from "./CrecimientoDesarrollo";
import { AntecedentesAndrologicos, AntecedentesGinecoObstetricos, FactoresDeriesgoParaOrigenDiabetes, ValoracionDelDesarrollo } from "./Joven";

export class Adolescencia {
  public antecedentes: Antecedentes;
  public antecedentesGinecoObstetricos: AntecedentesGinecoObstetricos;
  public antecedentesAndrologicos: AntecedentesAndrologicos;
  public examenes: Examenes;
  public sexualidad: Sexualidad;
  public valoracionNutricional: ValoracionNutricional;
  public valoracionDelDesarrollo: ValoracionDelDesarrollo;
  public asistenciaEscolar: AsistenciaEscolar;
  public familiograma: Familiograma;
  public ecomapa: Ecomapa;

  public apgar: Array<BaseList>;
  public apgarComplete: Array<BaseList>;

  public tamizajeSaludMental: Array<BaseListTamizajeMental>;
  public tamizajeSaludMentalComplete: Array<BaseListTamizajeMental>;

  public interpretacionTamizajeSaludMental: string;
  public tamizajeSaludBucal: TamizajeSaludBucal;
  public planDeCuidado: PlanDeCuidadoAdolescencia;
  public comentariosRecomendacionesSeguimiento: string;
  public factoresDeriesgoParaOrigenDiabetes: FactoresDeriesgoParaOrigenDiabetes;

  public patronesCrecimiento: PatronesCrecimiento;
}

export class PlanDeCuidadoAdolescencia {
  public saludBucal: boolean;
  public educacionGrupal: boolean;
  public realizoPruebaHemoglobina: boolean;
  public vacunoTexoide: boolean;
  public papilomaHumano: boolean;
  public citologiaVagina: boolean;
  public ameritaCitologiaVagina: boolean;
  public planificacion: boolean;
  public incluirProgramaPlanificacion: boolean;

}


export class ValoracionNutricional {
  imc: string;
  clasificacion: string;
}

export class Ecomapa {
  public iglesia: boolean = false;
  public colegios: boolean = false;
  public universidades: boolean = false;
  public centroMedicos: boolean = false;
  public trabajo: boolean = false;
  public amigos: boolean = false;
  public otros: boolean = false;
  public observacion: string = "";
}


export class Familiograma {
  public papa: boolean = false;
  public mama: boolean = false;
  public hermanos: boolean = false;
  public hermanas: boolean = false;
  public abuelaMaterna: boolean = false;
  public abueloMaterno: boolean = false;
  public abuelaPaterna: boolean = false;
  public abueloPaterno: boolean = false;
  public tios: boolean = false;
  public tias: boolean = false;
  public primos: boolean = false;
  public primas: boolean = false;
  public hijos: boolean = false;
  public hijas: boolean = false;
  public esposoa: boolean = false;
  public nietos: boolean = false;
  public nietas: boolean = false;
  public mascotas: boolean = false;
  public otros: boolean = false;
  public cualesMascotas: string = "";
  public observacion: string = "";
}

export class AsistenciaEscolar {
  public asistenciaEscolar: string;
  public desempenoAcademico: string;
  public repitenciaEscolar: string;
  public descripcionRepitencia: string;
  public comportamientosGenerales: string;
  public relacionesInterpersonales: string;
  public educacionGrupal: boolean = false;
}

export class BaseList {
  public id: number
  public respuesta: number
  public pregunta: string
  public respuestaDescripcion: string

}

export class BaseListTamizajeMental {
  public id: number
  public respuesta: boolean = false;
  public pregunta: string;
}

export class TamizajeSaludBucal {
  public dolor: boolean = false;
  public movilidad: boolean = false;
  public dificultadmasticar: boolean = false;
  public sangranEncias: boolean = false;
  public cepillaDiente: boolean = true;
  public cuantasVecesCepilla: number = 0;
  public cuandoValoradoOdontologo: number = 0;
  public tiempoValoradoOdontologo: string = "Días";
}


export class Sexualidad {

  constructor() {
    this.metodosAnticonceptivos = new MetodoPlanificacion;
  }
  orientacionSexual: number;
  identidadGenero: string;
  inicioRelacionesSexuales: boolean = false;
  numeroCompaneros: number = 0;
  usoMetodosAnticonceptivos: boolean = false;
  cualesMetodosAnticonceptivos: string;
  metodosAnticonceptivos: MetodoPlanificacion;
  tenidoDificultadesRelaciones: boolean = false;
  cualesTenidoDificultadesRelaciones: string;
  violenciaContraMujer: boolean = false;
  public usaPreservativo: boolean = false;
  public deseaTenerHijos: boolean = false;
  public interrupcionVoluntariaEmbarazo: boolean = false;
  public interrupcionVoluntariaEmbarazoObser: string;

}


export class MetodoPlanificacion {
  public oral: boolean;
  public inyectable: boolean;
  public subdermico: boolean;
  public d_I_U: boolean;
  public condon: boolean;
  public esterilizacionFemenina: boolean;
  public vasectomia: boolean;
  public otros: boolean;

}

export class Examenes {
  tieneHemoglobina: boolean = false;
  hemoglobina: string;
  fechaHemoglobina: Date;
  edadHemoglobina:number;

  tieneHematocrito: boolean = false;
  hematocrito: string;
  fechaHematocrito: Date;
  edadHematocrito:number;

  tienePruebaTreponemica:  boolean = false;
  pruebaTreponemica: string;
  fechaPruebaTreponemica: Date;

  tienePruebaVIH: boolean = false;
  pruebaVIH: string;
  fechaPruebaVIH: Date;

  pruebaEmbarazo: string;
  fechaPruebaEmbarazo: Date;


}

export class Antecedentes {
  public personales: boolean = false;
  public personalesObservacion: string = "";

  public familiares: boolean = false;
  public familiaresObservacion: string = "";

  public medicos: boolean = false;
  public medicosObservacion: string = "";

  public hospitalizaciones: boolean = false;
  public hospitalizacionesObservacion: string = "";

  public cirugias: boolean = false;
  public cirugiasObservacion: string = "";

  public toxicologicos: boolean = false;
  public toxicologicosObservacion: string = "";

  public alergias: boolean = false;
  public alergiasObservacion: string = "";

  public traumatologicos: boolean = false;
  public traumatologicosObservacion: string = "";

  public vacunacion: boolean = false;
  public vacunacionObservacion: string = "";

  public vph: boolean = false;
  public dpt: boolean = false;
  public influenza: boolean = false;


  public higieneOral: boolean = false;
  public higieneOralFecha: Date;

  public discapacidades: boolean = false;
  public discapacidadesObservacion: string = "";

  public conciliacionMedica: boolean = false;
  public conciliacionMedicaObservacion: string = "";

  public problemasAuditivos: boolean = false;
  public problemasAuditivosObservacion: string = "";

  public desarrolloPuberalGinePsico: boolean = false;
  public desarrolloPuberalGinePsicoObservacion: string = "";

  public perteneceProgramaRiesgocardiovascular: boolean = false;
  public perteneceProgramaRiesgocardiovascularObservacion: string = "";

  public pruebaRapidaHepatitisC: boolean = false;
  public pruebaRapidaHepatitisCObservacion: string = "";
}

export class VMApgar {
  public familiograma: Familiograma;
  public ecomapa: Ecomapa;
  public apgar: Array<BaseList>;
  public apgarComplete: Array<BaseList>;
  public fechaCreacion: Date;
}