import { BaseList, BaseListTamizajeMental, Ecomapa, Familiograma, Sexualidad, TamizajeSaludBucal } from "./Adolescencia";

export class Joven {
    constructor() {
        this.antecedentesPatologicosPersonales = new AntecedentesPatologicosPersonales();
        this.antecedentesInmunologicos = new AntecedentesInmunologicos();
        this.antecedentesGinecoObstetricos = new AntecedentesGinecoObstetricos();
        this.antecedentesAndrologicos = new AntecedentesAndrologicos();
        this.antecedentesFamiliaresRelevantes = new AntecedentesFamiliaresRelevantes();
        this.factoresDeriesgoParaOrigenDiabetes = new FactoresDeriesgoParaOrigenDiabetes();
        this.factoresDeRiesgoCompartamentales = new FactoresDeRiesgoCompartamentales();
        this.factoresProtectoresBuneosHabitosAlimenticios = new FactoresProtectoresBuneosHabitosAlimenticios;
        this.factoresDeRiesgoPsicosocial = new FactoresDeRiesgoPsicosocial();
        this.sexualidad = new Sexualidad();
        this.valoracionDelDesarrollo = new ValoracionDelDesarrollo();
        this.tamisajesDeValoracion = new TamisajesDeValoracion();
        this.paraclinicos = new Paraclinicos();
        this.proximoControlSegunRiesgo = new ProximoControlSegunRiesgo();
        this.evolucionMedicaDiagnostica = new EvolucionMedicaDiagnostica();
        this.tamizajeSaludBucal = new TamizajeSaludBucal();

    }

    public antecedentesPatologicosPersonales: AntecedentesPatologicosPersonales;
    public antecedentesInmunologicos: AntecedentesInmunologicos;
    public antecedentesGinecoObstetricos: AntecedentesGinecoObstetricos;
    public antecedentesAndrologicos: AntecedentesAndrologicos;
    public antecedentesFamiliaresRelevantes: AntecedentesFamiliaresRelevantes;
    public factoresDeriesgoParaOrigenDiabetes: FactoresDeriesgoParaOrigenDiabetes;
    public factoresDeRiesgoCompartamentales: FactoresDeRiesgoCompartamentales;
    public factoresProtectoresBuneosHabitosAlimenticios: FactoresProtectoresBuneosHabitosAlimenticios;
    public factoresDeRiesgoPsicosocial: FactoresDeRiesgoPsicosocial;
    public sexualidad: Sexualidad;
    //public examenFisico: ExamenFisico;
    public valoracionDelDesarrollo: ValoracionDelDesarrollo;
    public tamisajesDeValoracion: TamisajesDeValoracion;
    public paraclinicos: Paraclinicos;
    public proximoControlSegunRiesgo: ProximoControlSegunRiesgo;
    public evolucionMedicaDiagnostica: EvolucionMedicaDiagnostica;
    public observacion: string;
    public familiograma: Familiograma;
    public ecomapa: Ecomapa;
    public apgar: Array<BaseList>;
    public apgarComplete: Array<BaseList>;

    public tamizajeSaludMental: Array<BaseListTamizajeMental>;
    public tamizajeSaludMentalComplete: Array<BaseListTamizajeMental>;
    public interpretacionTamizajeSaludMental: string;
    public tamizajeSaludBucal: TamizajeSaludBucal;
}

export class AntecedentesPatologicosPersonales {
    public varicela: boolean = false;
    public varicelaObser: string;
    public sarampion: boolean = false;
    public sarampionObser: string;
    public rubiola: boolean = false;
    public rubiolaObser: string;
    public artritisJuvenil: boolean = false;
    public artritisJuvenilObser: string;
    public diabetes: boolean = false;
    public diabetesObser: string;
    public fracturas: boolean = false;
    public fracturasObser: string;
    public fiebreReumatica: boolean = false;
    public fiebreReumaticaObser: string;
    public hospitalizaciones: boolean = false;
    public hospitalizacionesObser: string;
    public alergicos: boolean = false;
    public alergicosObser: string;
    public quirurgicos: boolean = false;
    public quirurgicosObser: string;
    public recibioEsquemaVacunacion: boolean = false;
    public recibioEsquemaVacunacionObser: string;

    public alteracionesSensorial: boolean = false;
    public alteracionesSensorialObser: string;

    public problemasVisuales: boolean = false;
    public problemasVisualesObser: string;

    public enfermedadesMentales: boolean = false;
    public enfermedadesMentalesObser: string;

    public concilacionMedica: boolean = false;
    public concilacionMedicaObser: string;

    public discapadidades: boolean = false;
    public discapadidadesObser: string;

    public enfermedadLaboral: boolean = false;
    public enfermedadLaboralObser: string;

    public saludOral: boolean = false;
    public saludOralObser: string;


}
export class AntecedentesInmunologicos {
    public recibioRefuerzosDepuesde5Anos: boolean = false;
    public recibioRefuerzosDepuesde5AnosObser: string;
    public toxoideTetanicoDifterico: boolean = false;
    public toxoideTetanicoDiftericoObser: string;
    public rubeola: boolean = false;
    public rubeolaObser: string;
    public sarampion: boolean = false;
    public sarampionObser: string;
    public observaciones: string;
}
export class AntecedentesGinecoObstetricos {
    public menarcaEdad: number;
    public inicioRelacionesSexuales: boolean = false;
    public tipoDeCiclosMenstruales: string;
    public numeroCompraneroSexuales: number = 0;
    public fechaUltimaRegla: Date;
    public haTenidoITS: boolean = false;
    public haTenidoITSObser: string;
    public planificacionFamiliar: boolean = false;
    public incluirProgramaPlanificacionFamiliar: boolean = false;
    public planificacionFamiliarObser: string;
    public citologiaVaginalRealizada: boolean = false;
    public citologiaVaginalRealizadaObser: string;

    public enfermedadTransmision: boolean = false;
    public enfermedadTransmisionObser: string;
    public relacionesSinProteccion: boolean = false;

    public observaciones: string;


}

export class AntecedentesAndrologicos {
    public espermarquia: boolean = false;
    public espermarquiaObser: string;
    public inicioRelacionesSexuales: boolean = false;
    public haTenidoITS: boolean = false;
    public haTenidoITSObser: string;
    public numeroCompanerosSexuales: number = 0;
    public planificacionFamiliar: boolean = false;
    public incluirProgramaPlanificacionFamiliar: boolean = false;
    public planificacionFamiliarObser: string;
    public enfermedadTransmision: boolean = false;
    public enfermedadTransmisionObser: string;
    public relacionesSinProteccion: boolean = false;

    public observaciones: string;
}
export class AntecedentesFamiliaresRelevantes {
    public hta: boolean = false;
    public htaObser: string;
    public enfermedadCoronaria: boolean = false;
    public enfermedadCoronariaObser: string;
    public nefropatias: boolean = false;
    public nefropatiasObser: string;
    public obesidad: boolean = false;
    public obesidadObser: string;
    public enfermedadCardiovascular: boolean = false;
    public enfermedadCardiovascularObser: string;
    public muerteFamiliaresMenoresDe60PorIAM_ECV: boolean = false;
    public muerteFamiliaresMenoresDe60PorIAM_ECVObser: string;
    public dislipidemias: boolean = false;
    public dislipidemiasObser: string;
    public diabetes: boolean = false;
    public diabetesObser: string;
    public enfermedadMental: boolean = false;
    public enfermedadMentalObser: string;
    public cancer: boolean = false;
    public cancerObser: string;
    public hematologicos: boolean = false;
    public hematologicosObser: string;
    public otros: boolean = false;
    public observaciones: string;
}

export class FactoresDeriesgoParaOrigenDiabetes {

    public circunferencia: string;
    public actividadFisica: string;

    public comeVegetales: string;
    public antihipertensivos: string;

    public glucosaSangre: string;
    public FamiliarDiabetico: string;
    public resultados: string;
    public puntaje: number;
    public observaciones: string;




    /*  public yemaHuevo: string;
     public cremaDeLeche: string;
     public comidadRapidas: string;
     public fritanga: string;
     public pielDePollo: string;
     public lecheYQuesoConGrasa: string;
     public tocino: string;
     public heladoDeCrema: string;
     public carnesGordas: string;
     public viceras: string;
     public carnesFrias: string;
     public mantequilla: string;
     public fritos: string;
     public chicharron: string;
     public ponqueConCrema: string;
     public observaciones: string; */
}
export class FactoresDeRiesgoCompartamentales {
    /*   public actividadFisica: boolean = false;
      public numeroDeHorasDia: number = 0;
      public numeroDeHorasSemana: number = 0; */
    public deporteQuePractica: string = "";
    public consumoDeLicor: boolean = false;
    public nivelDeConsumoLicor: string;
    public numeroDeVecesQueConsumeLicor: number;
    public tipoDeLicorQueConsume: string;
    public consumeCigarrillos: boolean = false;
    public cuantosCigarrilosAldia: number = 0;
    public numeroDeAnosFumando: number = 0;
    public tipoDeFumador: string;
    public consumeSustanciasPsicoActivas: boolean = false;
    public numeroDeVecesQueConsumeSustancias: number;
    public numeroDeAnosConsumiendoSustancias: number;
    public tipoDeSustancia: string;
    public riesgoEPOC: string;
    public observaciones: string;

}
export class FactoresProtectoresBuneosHabitosAlimenticios {
    public consumoFibraSaludable: boolean = false;
    public consumoFibraInsoluble: boolean = false;
    public consumoMicronutrientes: boolean = false;
    public consumoLeguminosas: boolean = false;
    public consumoFrutas: boolean = false;
    public consumoVerduras: boolean = false;
    public consumoAgua: boolean = false;
    public consumoDiataBajaEnSal: boolean = false;
    public observaciones: string;
}
export class FactoresDeRiesgoPsicosocial {
    public conQuienVive: string = "";
    public apoyoEfectivoEsDadoPor: string = "";
    public apoyoEconomicoEsDadoPor: string = "";
    public autoridadEnCasaEsDadapor: string = "";
    public ocupacionPadre: any = {};
    public ocupacionMadre: any = {};
    public tieneAntecedentesJudiciales: boolean = false;
    public tieneUnProyectoDeVida: boolean = false;
    public tipoDePersonalidad: string = "";
    public tieneHobbiesYaficiones: boolean = false;
    public sintomasNeurovegetativosDeAngustia: string = "";
    public tieneOhaTenidoIdeasSuicidad: boolean = false;
    public tieneOhaTenidoMiedosIntensos: boolean = false;
    public educacionGrupalSalud: boolean = false;
    public observaciones: string = "";
}

export class ValoracionDelDesarrollo {
    public estadio: string;
    public estadioObserv: string;
}
export class TamisajesDeValoracion {
    public ojoDerecho: string;
    public ojoDerechoOtro: string;
    public ojoIzquierdo: string;
    public ojoIzquierdoOtro: string;
    public oidoDerecho: string;
    public oidoIzquierdo: string;
    public observaciones: string;
}
export class Paraclinicos {
    public hgbHto: string;
    public fechaResultadoHgbHto: Date;
    public hdl: string;
    public fechaResultadoHdl: Date;
    public vdrl: string;
    public fechaResultadoVdrl: Date;
    public hiv: string;
    public fechaResultadoHiv: Date;
    public pruebaTreponemica: string;
    public fechaTreponemica: Date;
    public pruebaVih: string;
    public fechaVih: Date;
    public pruebaEmbarazo: string;
    public fechaPruebaEmbarazo: Date;
    public tieneHepatitis: boolean;
    public hepatitis: string;

    hemograma: string;
    fechaHemograma: Date;

    public glicemiaBasal: string = "";
    public fechaResultadoglicemiaBasal: Date;


    public glucosaEnSuero: string = "";
    public fechaglucosaEnSuero: Date;

    hemoglobinaGlicosilada: string;
    fechaHemoglobinaGlicosilada: Date;

    colesterolLDL: string;
    fechaColesterolLDL: Date;

    colesterolTotal: string;
    fechaColesterolTotal: Date;

    trigliceridos: string;
    fechaTrigliceridos: Date;

    uroanalisis: string;
    fechaUroanalisis: Date;

    creatinina: string;
    fechaCreatinina: Date;

    creatininaEnOrina: string;
    fechaCreatininaEnOrina: Date;

    microalbuminuria: string;
    fechaMicroalbuminuria: Date;


    public colesterolMuyBajaDensidad: string = "";
    public fechaResultadocolesterolMuyBajaDensidad: Date;

}
export class EvolucionMedicaDiagnostica {

    public factoresDeRiesgoBiologico: FactoresDeRiesgoBiologico;
    public planDeManejo: PlanDeManejo;
    public riesgoPsicosocial: boolean = false;
    public jovenSano: boolean = false;
    public observaciones: string;
    constructor() {
        this.factoresDeRiesgoBiologico = new FactoresDeRiesgoBiologico();
        this.planDeManejo = new PlanDeManejo();
    }

}
export class PlanDeManejo {
    public sano: boolean = false;
    public sinPatologia: boolean = false;
    public presentaPatologia: boolean = false;
    public educacionAdultoJoven: boolean = false;
}
export class FactoresDeRiesgoBiologico {
    public bajoPeso: boolean = false;
    public sobrePeso: boolean = false;
    public obesidad: boolean = false;
    public hiperlipidemia: boolean = false;
    public tabaquismo: boolean = false;
    public sedentarismo: boolean = false;
    public herenciaDeHtA: boolean = false;
    public acidoUrico: boolean = false;
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


export class alertCupsTamizaje {
    hemograma: boolean = false;
    glicemiaBasal: boolean = false;
    hemoglobinaGlicosilada: boolean = false;
    colesterolHDL: boolean = false;
    colesterolLDL: boolean = false;
    colesterolTotal: boolean = false;
    trigliceridos: boolean = false;
    uroanalisis: boolean = false;
    creatinina: boolean = false;
    creatininaEnOrina: boolean = false;
    microalbuminuria: boolean = false;
    colesterolVLDL: boolean = false;
}