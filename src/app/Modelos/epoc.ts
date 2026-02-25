export class epocHc {
  public antecedentesGenerales: AntecedentesGenerales;
  public examenFisico: ExamenFisicoEpoc;
  public paraclinicosAyudasDiagnosticas: ParaclinicosAyudasDiagnosticas;
  public herramientasEvaluacionGravedad: HerramientasEvaluacionGravedad
  public indiceComorbilidad: IndiceComorbilidad;
  public resultados: Resultados;
}

export class AntecedentesGenerales {
  public indiceTabaquico: number;
  public exposicionOcupacional: Boolean;
  public exposicionOcupacionalObservacion: string;
  public contaminacionAmbiental: Boolean;
  public contaminacionAmbienteObservacion: string
  public exposicionHumo: Boolean;
  public exposicionHumoObservacion: string
  public alcohol: Boolean;
  public alcoholObservacion: string
  public infeccionesResporatoriasInfancia: Boolean;
  public infeccionesResporatoriasInfanciaObservacion: string
  public atopia: Boolean;
  public atopiaObservacion: string
  public historiaFamiliarEpoc: Boolean;
  public historiaFamiliarEpocObservacion: string
  public tos: Boolean;
  public tosObservacion: string
  public antecedentesTuberculosis: Boolean;
  public antecedentesTuberculosisObservacion: string
  public vacunaNeumococo: Boolean;
  public aacunaNeumococoObservacion: string
  public vacunaInfluenza: Boolean;
  public vacunaInfluenzaObservacion: string
  public vacunaCovid19: Boolean;
  public vacunaCovid19Observacion: string
  public espectoraciones: Boolean;
  public espectoracionesObservacion: string
  public disnea: Boolean;
  public disneaObservacion: string
  public usoInhaladores: Boolean;
  public usoInhaladoresObservacion: string
}

export class ExamenFisicoEpoc {
  public peso: number
  public talla: number
  public imc: number
  public oximetriaDePulso: number
}

export class ParaclinicosAyudasDiagnosticas {
  public gasesArterialesPH: string;
  public gasesArterialesFechaPH: Date;
  public gasesArterialesPO2: string;
  public gasesArterialesFechaPO2: Date;
  public gasesArterialesPCO2: string;
  public gasesArterialesFechaPCO2: Date;
  public bk1: string
  public fechabk1: Date
  public bk2: string
  public fechabk2: Date
  public bk3: string
  public fechabk3: Date
  public bk1cultivo: string
  public fechabk1cultivo: Date
  public bk2cultivo: string
  public fechabk2cultivo: Date
  public bk3cultivo: string
  public fechabk3cultivo: Date
  public toraxatrapamientoAereo: boolean;
  public toraxhorizontalizacionConstillas: boolean;
  public toraxdesplazamientoHemidiafragma: boolean;
  public toraxnodulos: boolean;
  public toraxinfiltradoIntersticial: boolean;
  public toraxbullasEnfitematosas: boolean;
  public toraxmasaPulmonar: boolean;
  public toraxotro: boolean;
  public toraxobservacion: string;
  public espirometriaSw: boolean
  public espirometriaFecha: Date
  public espirometria: string
}


export class HerramientasEvaluacionGravedad {
  public broncodilatador: number;
  public clasificacionGravedadEPOC: string;
  public exacerbaciones: string;
  public mmrc: number;
  public cat: Cat;
  public resultadoCat: string;


}

export class Cat {
  public tos: number;
  public flema: number;
  public opresionPecho: number;
  public pendiente: number;
  public limitacionDomestica: number;
  public afeccionPulmonar: number;
  public dormir: number;
  public energia: number;
}

export class IndiceComorbilidad {
  public cancer: boolean;
  public ansiedad: boolean;
  public todoCancer: boolean;
  public cirrosis: boolean;
  public fibrilacion: boolean;
  public diabetes: boolean;
  public fibrosis: boolean;
  public insuficiencia: boolean;
  public ulcera: boolean;
  public enfermedad: boolean;
  public resultado: number;
  public interpretacion: string;
}

export class Resultados {
  public clasificacionPorSintomas: string;
  public clasificacionPorSeveridad: string;
  public clasificacionPorSeveridadInterpretacion: string;
  public resultadoBodex: string;
  public tratamientoFinal: string;
}