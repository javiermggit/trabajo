export class Mama {
    inicioMenarcaAntes11: boolean = false;
    edadInicioMenarcaAntes11: number;

    primerEmbarazoApartir40: boolean = false;
    edadPrimerEmbarazoApartir40: number;

    inicioMenopausiaDespues54: boolean = false;
    edadInicioMenopausiaDespues54: number;

    aFCancerMama: boolean = false;
    gradoConsangAFCancerMama: String;

    aFCancerPulmon: boolean = false;
    gradoConsangAFCancerPulmon: String;

    aFCancerProstota: boolean = false;
    gradoConsangAFProstota: String;

    aFCancerOtro: boolean = false;
    gradoConsangAFOtro: String;

    exposicionRIAdolecencia: boolean = false;
    edadExposicionRIAdolecencia: number;

    haTenidoEBenignaPrevia: boolean = false;
    edadEBenignaPrevia: number;

    aumentoIMCDespuesMenopausia: boolean = false;
    terapiaReemplazoHormonalMayor5: boolean = false;
    cualterapiaReemplazoHormonalMayor5: String;

    portadoraMutacionGeneticaConocida: boolean = false
    cualPortadoraMutacionGeneticaConocida: String;

    haTenidoRadioterapiaSPToraxMenor30: boolean = false;
    cualHaTenidoRadioterapiaSPToraxMenor30: String;

    riesgoTranscursoMayor30: boolean = false;
    cualRiesgoTranscursoMayor30: String;

    biopsiaMamariasMuestreAtipias: boolean = false;
    resultadoBiopsiaMamariasMuestreAtipias: String;

    diagnosticoHistologicoNeoplasiaLobulillar: boolean = false;
    cualDiagnosticoHistologicoNeoplasiaLobulillar: String;

    densidadMamariaMayor75: String;
    observacionDensidadMamariaMayor75: String;

    clasificacionRiesgo: String;
    observacionClasificacionRiesgo: String;

    nodulaciones: boolean = false;
    observacionNodulaciones: String;

    masapalpable: boolean = false;
    observacionMasapalpable: String;

    telorrea: boolean = false;
    observacionTelorrea: String;

    mamografia: Mamografia = new Mamografia();
    ecografia: Ecografia = new Ecografia();
    biopsia: Biopsia = new Biopsia();
    resultadovph: string;

    haSidoDiagnosticaCancer: boolean = false;
    tipoCancerMama: TipoCancerMama = new TipoCancerMama();
    tratamientoCancer: string;
    recomendacionesCancer: string;

    manejoReciboPaciente: ManejoRecibePaciente = new ManejoRecibePaciente();
    seguimientoPaciente: SeguimientoPaciente = new SeguimientoPaciente();

    observacionycomentarios: string;
    observacionDiagnosticolobulillo: string;
    planDeCuidado: PlanDeCuidadoMama = new PlanDeCuidadoMama();;

}
export class PlanDeCuidadoMama {
    recomendaciones: string;
}

export class Mamografia {
    fechaOrdenMamografia: String;
    fechaTomaMamografia: String;
    fechaResultado: String;
    resultado: String;
    comentario: String;
}

export class Ecografia {
    fechaOrdenEcografia: String;
    fechaTomaEcografia: String;
    fechaResultado: String;
    resultado: String;
    comentario: String;
}

export class Biopsia {
    fechaOrdenBiopsia: String;
    fechaTomaBiopsia: String;
    tipoBiopsia: String;
    fechaResultado: String;
    resultado: String;
    comentario: String;
}

export class VPH {
    resultado: String;
}
export class ManejoRecibePaciente {
    id: number;
    descripcion: String;
    estado: String;
}

export class SeguimientoPaciente {
    id: number;
    descripcion: String;
    estado: String;
}

export class TipoCancerMama {
    id: number;
    descripcion: String;
    estado: String;
}