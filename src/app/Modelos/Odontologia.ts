import { CitasImpresion } from './Medico';
import { HC, Especialidad, VMDiagnosticoOdontologico, VMCup, Profesional } from './Modelos';


export class HCOdontologia extends HC {
  public citaId: string;
  public antecedenteOdontologico: AntecedenteOdontologico;
  public Especialidad: Especialidad;
  public Diagnosticos: VMDiagnosticoOdontologico[];
  public indicadoresCOP: Indice;
  public indicadoresCEO: IndiceCEO;
  public esControl: boolean = false;
  public esPrimeravez: boolean = false;
  public esTelesalud: boolean = false;
  public esUltimaVersion: boolean = false;
  public esUrgencia: boolean = false;

  citaImpresion: CitasImpresion;
}


export class VMOdontologiaOdontograma {
  public evolucion: Array<Evolucion> | undefined;
  public odontograma: Odontogramas | undefined  ;
  public odontologia: HCOdontologia | undefined;
  public indicadorPlaca: Indicadorplaca | undefined;
}


export class AntecedenteOdontologico {
  public habitosHigieneOral: HabitosHigieneOral | undefined;
  public examenEstomatologico: ExamenEstomatologico;
  public examenOclusal: ExamenOclusal;
  public habitoOral: HabitoOral;
  public examenPulpar: ExamenPulpar;
  public examenPeriodontal: ExamenPeriodontal;

  constructor() {
    this.examenEstomatologico = new ExamenEstomatologico();
    this.examenOclusal = new ExamenOclusal();
    this.habitoOral = new HabitoOral();
    this.examenPulpar = new ExamenPulpar();
    this.examenPeriodontal = new ExamenPeriodontal();
  }
}

export class Indice {
  sano: number = 0;
  cariadoNoCavitacional: number = 0;
  cariado: number = 0;
  obsturado: number = 0;
  perdido: number = 0;
  extraidoOrtodoncia: number = 0;
  totalDienteBoca: number = 0;
  total: string;
}

export class IndiceCEO {
  sano: number = 0;
  cariadoNoCavitacional: number = 0;
  cariado: number = 0;
  obsturado: number = 0;
  exfoliado: number = 0;
  extraidoOrtodoncia: number = 0;
  totalDienteBoca: number = 0;
  total: string | undefined;
}


export class ExamenEstomatologico {
  public atm: boolean = false;
  public observacionAtm: string | undefined;

  public lineaMediaFacial: string = "SIMETRICA";
  public observacionLineaMediaFacial: string | undefined;

  public surcosVestibulares: boolean = false;
  public observacionSurcosVestibulares: string | undefined;

  public labioSuperior: boolean = false;
  public observacionLabioSuperior: string | undefined ;

  public labioInferior: boolean = false;
  public observacionLabioInferior: string | undefined;

  public frenilloLabialSuperior: boolean = false;
  public observacionFrenilloLabialSuperior: string | undefined;

  public frenilloLabialInferior: boolean = false;
  public observacionFrenilloLabialInferior: string | undefined;

  public comisuras: boolean = false;
  public observacionComisuras: string | undefined;

  public carrillo: boolean = false;
  public observacionCarrillo: string | undefined;

  public paladarDuro: boolean = false;
  public observacionPaladarDuro: string | undefined;

  public uvula: boolean = false;
  public observacionUvula: string | undefined;

  public pisoBoca: boolean = false;
  public observacionPisoBoca: string | undefined; 

  public frenilloLingual: boolean = false;
  public observacionFrenilloLingual: string | undefined;

  public lengua: boolean = false;
  public observacionLengua: string | undefined;

  public sistemaLinfatico: boolean = false;
  public observacionSistemaLinfatico: string | undefined;

  public mucosaOral: boolean = false;
  public observacionMucosaOral: string | undefined;

}

export class ExamenOclusal {
  public edentulo: boolean = false;
  public observacionEdentulo: string | undefined;

  public tipoDentision: string | undefined;
  public observacionTipoDentision: string | undefined;

  public clasificacionAngle: string | undefined;
  public observacionAngle: string | undefined;

  public lineaMDental: boolean = false;
  public observacionLineaDental: string | undefined;

  public mordidaCruzada: boolean = false;
  public observacionMordidaCruzada: string | undefined;

  public arcoDental: boolean = false;
  public observacionArcoDental: string | undefined;

  public dienteIncluido: boolean = false;
  public observacionDienteIncluido: string | undefined; 


  public edentuloParcialTotal: string | undefined;
  public observacionPacialTotal: string | undefined;

  public perfil: string | undefined;
  public  observacionPerfil: string | undefined;

  public mordida: string | undefined;
  public observacionMordida: string | undefined;

  public dolorMuscular: boolean = false;
  public observacionDolorMuscular: string | undefined;


  public dienteImpactado: boolean = false;
  public observacionDienteImpactado: string | undefined;

  public supernumerario: boolean = false;
  public observacionSupernumerario: string | undefined;

  public crecimientoDesarrollo: boolean = false;
  public observacionCrecimientoDesarrollo: string | undefined;

  public otros: string | undefined;

}

export class HabitoOral {
  public respiradorOral: boolean = false;
  public observacionRespiradorOral: string | undefined;
  public succionDigital: boolean = false;
  public observacionSuccionDigital: string | undefined;
  public biberon: boolean = false;
  public observacionBiberon: string | undefined;
  public bruxismo: boolean = false;
  public observacionBruxismo: string | undefined;
  public lenguaProtactil: boolean = false;
  public observacionLenguaProtactil: string | undefined;
  public queilofagia: boolean = false;
  public observacionQueilofagia: string | undefined;
  public succionDedo: boolean = false;
  public observacionSuccionDedo: string | undefined;
  public tetero: boolean = false;
  public observacionTetero: string | undefined;
  public fumador: boolean = false;
  public observacionFumador: string | undefined;
  public onicofagia: boolean = false;
  public observacionOnicofagia: string | undefined;
  public succionLabial: boolean = false;
  public observacionSuccionLabial: string | undefined;

  public otros: string | undefined;
}

export class HabitosHigieneOral {

  public usoSedaDentalDia: boolean = true;
  public numeroUsoSedaDentalDia: string = "0";
  public metaSedaDentalDia: string= "0";

  public cepilladoDia: boolean = true;
  public numeroCepilladoDia: string = "0";
  public metaCepilladoDia: string = "0";

  public usaCremaDentalFluoral: boolean = true;
  public recomendacionUsaCremaDentalFluoral: string | undefined;

  public usoEnjuageBucal: boolean = true;
  public numeroUsoEnjuageBucal: string = "0";
  public metaUsoEnjuageBucal: string = "0";
}


export class ExamenPulpar {
  public alteracionVitalidad: boolean = false;
  public observacionAlteracionVitalidad: string | undefined;
  public dolorPercusion: boolean = false;
  public observacionDolorPercusion: string | undefined;
  public movilidadDental: boolean = false;
  public observacionMovilidadDental: string | undefined;
  public sensibilidad: boolean = false;
  public observacionSensibilidad: string | undefined;
  public fistula: boolean = false;
  public observacionFistula: string | undefined;
  public dienteTratado: boolean = false;
  public observacionDienteTratado: string | undefined;
  public cambioColor: boolean = false;
  public observacionCambioColor: string | undefined;

  public otros: string | undefined;
}

/*
export class ExamenDentariosOclusion {
  public cambioForma: boolean = false;
  public observacionCambioForma: string;
  public cambioTamano: boolean = false;
  public observacionCambioTamano: string;
  public cambioNumero: boolean = false;
  public observacionCambioNumero: string;

  public cambioPosicion: boolean = false;
  public observacionCambioPosicion: string;
  public impactados: boolean = false;
  public observacionImpactados: string;
  public otros: string;
  public observaciones: string;
}
 */
export class ExamenPeriodontal {
  public calculos: boolean = false;
  public observacionCalculos: string | undefined;
  public inflamacionGingival: boolean = false;
  public observacionInflamacionGingival: string | undefined;
  public movilidad: boolean = false;
  public observacionMovilidad: string | undefined;
  public perdidaOsea: boolean = false;
  public observacionPerdidaOsea: string | undefined;
  public sangrado: boolean = false;
  public observacionSangrado: string | undefined;
  public observaciones: string | undefined;
}


export class Odontogramas {
  public citaId: string | undefined;  
  public esPrimeraVez: boolean = false;
  public observacion: string | undefined;
  public odontograma: Odontograma | undefined;
  public imagen: string | undefined; 
}


export class Indicadorplaca {
  public citaId: string | undefined;
  public fechaCreacion: string | undefined;
  public esPrimeraVez: boolean =false;
  public observacion: string | undefined;
  public odontograma: Array<Odontograma> | undefined;
  public imagen: string | undefined;

  constructor() {
    this.odontograma = new Array<Odontograma>();
  }
}

export class Odontograma {
  public dientes: Diente[]  | undefined;
  public indicador: string | undefined;
}

export class Diente {
  public id: number | undefined;
  public hallazgos: Hallazgos[] | undefined;
}

export class Hallazgos {
  public evento: string | undefined;
  public cara: number | undefined;
  public estado: string | undefined;
  public diagnostico: string | undefined;
}

export class Evolucion {
  public fecha: string | undefined;
  public diente: number | undefined;
  public cara: number | undefined;
  public evento: string | undefined;
  public diagnostico: VMDiagnosticoOdontologico | undefined;
  public cup: VMCup | undefined;
  public observacion: string | undefined;
  public profesional: any;
  public cantidad: number = 1;
}


export class indiceCOPCEO {
  diente: number=0;
  indiceCOP: Indicador | undefined;
  indiceCEO: Indicador ;

}

export class Indicador {
  cariado: number;
  cariadoN: number;
  sano: number;
  obsturado: number;
  perdido: number;
  total: number;
}