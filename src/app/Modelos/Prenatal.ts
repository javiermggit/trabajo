
export class Prenatal {
    constructor() {
        this.hisReproductivaAntObstetricos = new HisReproductivaAntObstetricos();
        this.gestacionActual = new GestacionActual();
        this.examenesDeIngresoPrimerTrimestre = new ExamenesDeIngresoTrimestre();
        this.examenesDeIngresoSegundoTrimestre = new ExamenesDeIngresoTrimestre();
        this.examenesDeIngresoTercerTrimestre = new ExamenesDeIngresoTrimestre();
        this.monitoreoProgramaPrenatalMadre = new MonitoreoProgramaPrenatalMadre();
        this.monitoreoProgramaPrenatalFeto = new MonitoreoProgramaPrenatalFeto();
        this.otrasPatologiasRelacionadas = new OtrasPatologiasRelacionadas();
        this.clasificacionAlFinalizarConsulta = new ClasificacionAlFinalizarConsulta();
        this.riesgoPsicosocial = new RiesgoPsicosocial();
        this.riesgoViolencia = new RiesgoViolencia();
        this.riesgoDepresion = new RiesgoDepresion();
        this.tamizajeCuagulopatias = new TamizajeCuagulopatias();
        this.tamizajeChanga = new TamizajeChanga();
        this.proximoControlSegunRiesgo = new ProximoControlSegunRiesgo();
        this.comentariosRecomendacionesSeguimiento = new ComentariosRecomendacionesSeguimiento();
        this.planDeCuidado = new PlanDeCuidadoPrenatal();
    }

    public hisReproductivaAntObstetricos: HisReproductivaAntObstetricos;
    public gestacionActual: GestacionActual;
    public examenesDeIngresoPrimerTrimestre: ExamenesDeIngresoTrimestre;
    public examenesDeIngresoSegundoTrimestre: ExamenesDeIngresoTrimestre;
    public examenesDeIngresoTercerTrimestre: ExamenesDeIngresoTrimestre;
    public monitoreoProgramaPrenatalMadre: MonitoreoProgramaPrenatalMadre;
    public monitoreoProgramaPrenatalFeto: MonitoreoProgramaPrenatalFeto;
    public otrasPatologiasRelacionadas: OtrasPatologiasRelacionadas;
    public riesgoPsicosocial: RiesgoPsicosocial;
    public riesgoViolencia: RiesgoViolencia;
    public riesgoDepresion: RiesgoDepresion;
    public tamizajeCuagulopatias: TamizajeCuagulopatias;
    public tamizajeChanga: TamizajeChanga;

    public clasificacionAlFinalizarConsulta: ClasificacionAlFinalizarConsulta;
    public proximoControlSegunRiesgo: ProximoControlSegunRiesgo;
    public comentariosRecomendacionesSeguimiento: ComentariosRecomendacionesSeguimiento;
    public planDeCuidado: PlanDeCuidadoPrenatal;

    listGraficasBase: Array<any>;
}

export class PlanDeCuidadoPrenatal {
    public acidoFolico: boolean;
    public suplementacionCalcio: boolean;
    public suplementacionHierro: boolean;
    public vacunoToxoide: boolean;
    public influenzaEstacional: boolean;
    public tetanoDifteriaTos: boolean;
    public obserTetanoDifteriaTos: string;
    public asistenciaPuntal: boolean;
    public tipoInasistenciaPuntal: string;
    public infeccionGeohelmintos: boolean;


}

export class HisReproductivaAntObstetricos {
    public edadActual: number;
    public gravidez: number = 0;
    public partos: number = 0;
    public partosVaginales: number = 0;
    public partosCesarea: number = 0;
    public abortos: number = 0;
    public embarazosEctopios: number = 0;
    public nacidosVivos: number = 0;
    public nacidosMuertos: number = 0;
    public vivenActualmente: number = 0;
    public muertosPrimeraSemana: number = 0;
    public embarazosMultiples: boolean;
    public nacimientosPrematuros: boolean;
    public embarazosProlongados: boolean;
    public hijosMalformacionesCongenitas: boolean;
    public muertosDespuesPrimeraSemana: boolean;
    public nacidosMenos2500Gramos: boolean;
    public nacidosMas4000Gramos: boolean;
    public terminacionUltimoEmbarazo: Date;
    public mortalidadFetalTardia: boolean;

    public historialInfertilidad: boolean;
    public hemorragiaPostParto: boolean;
    public legrado: boolean;
    public partoAnormal: boolean;
    public cambiosParejaIntergestionales: boolean;
    public molas: boolean;
    public retencionPlacentaria: boolean;
    public ropturaPrematuraMembranas: boolean;
    public retartoCrecimientoInfrauterino: boolean;
    public hipertension: boolean;
    public preeclampsia: boolean;
    public eclampsia: boolean;
    public enfermedadRenalCronica: boolean;
    public diabetesMellitus: boolean;
   
    public diabetesPreconcepcional: boolean;


    public enfermedadCardiaca: boolean;
    public enfermedadInfecciosaAguda: boolean;
    public enfermedadTransmisionSexual: boolean;
    public enfermedadAntihimune: boolean;
    public cirugiaGinecologicaPrevia: boolean;
    public patronAnormalCiclosMenstruales: boolean;

     /*AGREGAR API */
     public acretismoPlacentario: boolean;
     public enfermedadPsiquiatrica: boolean;
     public patologiaOncologicaActiva: boolean;
     public patologiaOncologica: boolean;
     public abortadoraRecurrente: boolean;
     public obitoFetal: boolean;
     public trastornoPlacentacion: boolean;
     public anemiaCronica: boolean;

     
    public observaciones: string = "";

}
export class GestacionActual {
    public fechaUltimaMenstruacion: Date;
    public fechaEcografiaObstetrica: Date;
    public fechaProbableParto: Date;
    public confirmacionEmbarazoConExamenClinico: boolean;
    public edadGestacionalFechaUltimaMentruacion: number = 0;
    public edadGetacionalEcografiaObstetrica: number = 0;
    public metodoAnticonceptivoPrevioEmbarazo: any;
    public falloEnMetodoAnticonceptivo: boolean;
    public embarazoPlaneado: boolean;
    public periodoIntergenesicoMenor12Meses: boolean;
    public grupoSanguineo: string;
    public rh: string;
    public apliVacunaTetanoAntesEmbarazo: boolean;
    public presentaAminorrea: boolean;
    public presentaVomito: boolean;
    public gestanteFumadora: string;
    public cantidadCigarrillo: number = 0;
    public gestanteConsumeAlcohol: boolean;
    public gestanteConsumeDrogas: boolean;
    public cesariaPrevia: boolean;
    public hemorragiaMenor20Semanas: boolean;
    public hemorragiaMayor20Semanas: boolean;
    public anemia: boolean;
    public presentaSangrado: boolean;
    public sintomatologiaInfecciosaUrinariaVaginal: boolean;
    public cefaleasPersisten: boolean;
    public edemasProgresivos: boolean;
    public ropturaPrematuraMenbrana: boolean;
    public polihidramnios: boolean;
    public crecimientoIntrauterinoRetardadoRestringido: boolean;
    public incompatibilidadRH: boolean;


    public edadMenorIguala16: boolean;
    public edadMayorIguala40: boolean;
    public desnutricionMaterna: boolean;
    public tecnicaReproduccionAsistida: boolean;

    public alteracionCrecimientoFetal: boolean;



    public observaciones: string = "";
}

export class ExamenesDeIngresoTrimestre {
    public resultadoHemograma: string;
    public fechaResultadoHemograma: Date;
    public resultadoGlicemia: number;
    public fechaResultadoGlicemia: Date;
    public resultadoHematocrito: string;
    public alertresultadoHematocrito: string;
    public fechaResultadoHematocrito: Date;
    public resultadoHemoglobina: string;
    public alertresultadoHemoglobina: string;
    public fechaResultadoHemoglobina: Date;
    public resultadoVDRL: string;
    public alertresultadoVDRL: string;
    public resultadoDatoVDRL: string;
    public fechaResultadoVDRL: Date;
    public resultadoVIH: string;
    public fechaResultadoVIH: Date;
    public resultadoPruebaRapidaVDRL: string;
    public resultadoPruebaRapidaDatoVDRL: string;
    public fechaResultadoPruebaRapidaVDRL: Date;
    public resultadoPruebaRapidaVIH: string;
    public fechaResultadoPruebaRapidaVIH: Date;
    public resultadoParcialOrina: string;
    public fechaResultadoParcialOrina: Date;
    public resultadoUrocultivo: string;
    public resultadoDatoUrocultivo: string;


    public fechaResultadoUrocultivo: Date;
    public resultadoPruebaHBsAG: string;
    public fechaResultadoPruebaHBsAG: Date;
    public resultadoTestOSullivan: string;
    public fechaResultadoTestOSullivan: Date;
    public resultadoToxoplasmaIgG: string;
    public alertresultadoToxoplasmaIgG: string;
    public fechaResultadoToxoplasmaIgG: Date;
    public resultadoToxoplasmaIgM: string;
    public alertresultadoToxoplasmaIgM: string;
    public fechaResultadoToxoplasmaIgM: Date;
    public resultadoCoombsIndirecto: string;
    public fechaResultadoCoombsIndirecto: Date;
    public resultadoCurvaToleranciaGlucosa: string;
    public fechaResultadoCurvaToleranciaGlucosa: Date;
    public resultadoCitologia: string;
    public fechaResultadoCitologia: Date;
    public resultadoFrotisVaginal: string;
    public fechaResultadoFrotisVaginal: Date;
    public resultadoEcoObstetrica: string;
    public fechaResultadoEcoObstetrica: Date;
    public resultadoOtraEcografia: string;
    public fechaResultadoOtraEcografia: Date;

    public resultadoGlucosa: string;
    public alertresultadoGlucosa: string;
    public fechaResultadoGlucosa: Date;

    public resultadoGlucosaPre: string;
    public alertresultadoGlucosaPre: string;
    public fechaResultadoGlucosaPre: Date;

    public resultadoGlucosaPost: string;
    public alertresultadoGlucosaPost: string;
    public fechaResultadoGlucosaPost: Date;

    public resultadoCultivoVaginoRectal: string;
    public resultadoDatoCultivoVaginoRectal: string;
    public fechaResultadoDatoCultivoVaginoRectal: Date;

    public preTestVIH: boolean;
    public firmaConsentimientoInformadoPRE: boolean;
    public postTestVIH: boolean;
    public firmaConsentimientoInformadoPost: boolean;
}


export class MonitoreoProgramaPrenatalMadre {

    public fechaConsulta: any;
    public semanasGestacion: number;
    public pesoEnKg: number;
    public tallaEnCm: number;
    public indiceMasaCorporal: number = 0;
    public clasificacionIMCEG: string;
    public tensionArterial: string;
    public frecuenciaCardiaca: number = 0;
    public frecuenciaRespiratoria: number = 0;
    public circunferenciaAbdominalCm: number = 0;
    public perimetroBraquial: number;
    public pliegueCutaneoDelTriceps: any;
    public valoracionCuelloUterino: string;
    public clasificacionEdemas: string;
    public examenDeMamas: string;
    public hTAinducidaPorEmbarazo: boolean;
    public diabetesGestacional: boolean;
    public sangradoVaginal: boolean;
    public contraccionesUterinas: boolean;
    public embarazoMultiple: boolean;
    public fiebre: boolean;
    public pruritoPalmoPlantar: boolean;
    public perdidaLiquidoAmniotico: boolean;
    public infeccionViasUrinarios: boolean;
    public tensionEmocional: boolean;
    public humorDepresivo: boolean;
    public sintomasNeurovegetativos: boolean;
    public soporteFamiliar: boolean;
    public hipertensionArterial: boolean;
    isoinmunizacion: boolean;
    public vacunaDPT: boolean;
    public fechaVacunaDPT: Date;
    public vacunaInfluenza: boolean;
    public fechaVacunaInfluenza: Date;

    public toxoplasmaConfirmada: boolean;
    public enfermedadChagasConfirmada: boolean;

}

export class MonitoreoProgramaPrenatalFeto {
    public alturaUterina: number;
    public altura_Uterina: number;
    public frecuenciaCardiacaFetal: number = 0;
    public monitoreoFetal: string = "";
    public movimientosFetales: boolean;
    public preesentacionFetal: any;
    public localizacionPlacenta: string = "";
    public numeroFetos: number;
    public perdidaLiquidoAmniotico: boolean;
    public amenazaPartoPrematuro: boolean;
    public malformacionFetalConfirmada: boolean;
    
}

export class OtrasPatologiasRelacionadas {
    public enfermedadCardioPulmonarEpoc: boolean;
    public artritisReumatoide: boolean;
    public tiroidesAlterada: boolean;
    public obesidad: boolean;
    public enfermedadCronica: boolean;
    public enfermedadAutoimune: boolean;
    public patoligaTrombotica: boolean;
    public obesidadGrado3: boolean;
    public diabetesGestacional: boolean;
    public preeclampsiaActual: boolean;
    public antecedentesPreeclampsiaSevera: boolean;
    public incompetenciaCervical: boolean;
    public perdidaGestacionalRecurrente: boolean;
    public gestacionGemelar: boolean;
    public isoinmunizacion: boolean;
    public infeccionFetal: boolean;
    public transtornoLiquidoAmniotico: boolean;
    public retardoCrecimientoIntrauterino: boolean;
    public epilesiaNoControlada: boolean;
    public trombosis: boolean;
    public postEgresoHospitalarioCovid: boolean;



}

export class ClasificacionAlFinalizarConsulta {
    public puntajeRiesgoObstetrico: number;
    public clsificacionesRiesgoObstetricoEnfermedadAsociada: string;
    public clasificacionRiesgo: string;
    public observacion: string;
}

export class ProximoControlSegunRiesgo {
    public medicoGeneral: any;
    public enfermeraJefe: any;
    public ginecologo: any;
    public odontologia: any;
    public nutricionista: any;
    public psicologo: any;
    public educaciongrupalAgenteEdicativo: any;
}

export class ComentariosRecomendacionesSeguimiento {
    public observacion: string;
}

export class RiesgoPsicosocial {
    public ansiedadSevera: boolean;
    public soporteFamiliarInadecuado: boolean;
}

export class RiesgoViolencia {
    public ultimoAnioInsultoVerbal: boolean;
    public ultimoAnioMaltratoFisico: boolean;
    public gestacionMaltratoFisico: boolean;
    public forzadaSexualmente: boolean;
}

export class RiesgoDepresion {
    public ultimoMesTriste: boolean;
    public ultimoMesPocoInteres: boolean;
    public sienteNecesitaAyuda: boolean;
}

export class TamizajeCuagulopatias {
    public sangradoMenstrual: boolean;
    public sangradoPostParto: boolean;
    public sangradoEnciaHemorragias: boolean;
}

export class TamizajeChanga {
    public sitioColombia: string;
    public antecedentesEnfChangas: boolean;
    public transfucionesAntes: boolean;
}