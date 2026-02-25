
export class Cervix {

    constructor() {
        this.datosTomaCitologia = new DatosTomaCitologia();
        this.resultadoCitologia = new ResultadoCitologia();
        this.resultadoColposcopia = new Colposcopia();
        this.resultadoBiopsia = new ResultadoBiopsia();
        this.resultadoGenotificacionVPH = new GenotificacionVPH();
        this.planDeCuidado = new PlanDeCuidadoCervix();
    }

    public ets: boolean;
    public citologiaAnterior: boolean;
    public fechaToma: Date;
    public ultimaCitologia: string;
    public ultimaMestruacion: Date;
    public numeroCompanerosSexuales: number;
    public presentaDispareunia: boolean;
    public presentaDolorPelvico: boolean;

    public presenciaFlujoVaginal: boolean;
    public catacteristicaFlujo: any;
    public metodoPlanificacionActual: any;
    public menopausia: boolean;
    public embarazoActual: boolean;
    public aspectoCuelloUterino: any;
    public procedimientoCuelloUterino: any;


    public validacionUltimaCitologia: boolean;
    public validacionNumeroCompanerosSexuales: boolean;
    public validacionCatacteristicaFlujo: boolean;
    public validacionMetodoPlanificacionActual: boolean;
    public validacionAspectoCuelloUterino: boolean;
    public validacionProcedimientoCuelloUterino: boolean;
    public observaciones: string;

    public datosTomaCitologia: DatosTomaCitologia;
    public resultadoCitologia: ResultadoCitologia;
    /*PENDIENTE POR COLOCAR EN LA API HC */
    public resultadoColposcopia: Colposcopia;
    public resultadoBiopsia: ResultadoBiopsia;
    public resultadoGenotificacionVPH: GenotificacionVPH;
    public planDeCuidado: PlanDeCuidadoCervix;
}


export class PlanDeCuidadoCervix {
    public pruebaTamizacion: string;
    public pruebaCitologia: string;


}

export class Colposcopia {
    // public resultado: string;


    colcospiaEs: string;
    visibleParcialmente: boolean;
    inflamacionOAtrofias: boolean;
    cervixNoVisible: boolean;

    hallazgosNormales: boolean;
    epitelioPlano: boolean;
    epitelioCilindrico: boolean;
    zonaTransformacionNormal: boolean;

    hallazgosAnormales: boolean;
    zonaTransformacion: boolean;
    fueraZonaTransformacion: boolean;
    conducto: boolean;
    epitelioAcetoblancoTenue: boolean;
    microespiculas: boolean;
    areaPositivaYodo: boolean;
    mosaicoFina: boolean;

    cambiosMayores: boolean;
    epitelioAcetoblanco: boolean;
    vasosAtipicosIV: boolean;
    vasosAtipicosV: boolean;
    areaYodoNegativa: boolean;
    mosaicoGrueso: boolean;
    punteadoGrueso: boolean;

    atrofia: boolean;
    candiloma: boolean;
    polipo: boolean;
    ectopia: boolean;
    inflamacion: boolean;
    sangradoFacil: boolean;
    erosionUlceracion: boolean;

    diagnoticoIndiceREID: boolean;
    normalLiebgVPHAtipia0_2: boolean;
    liebgLieag3_5: boolean;
    lieag6_8: boolean;
    sospechaCancer: boolean;

    aparienciaVagina: string;
    inflamacionVagina: boolean;
    atrofiaVagina: boolean;
    sospechaVPHVagina: boolean;
    sospechaNeoplasiaIntraepitelialVagina: boolean;
    sospechaCancerVagina: boolean;

    aparienciaVulva: string;
    inflamacionVulva: boolean;
    atrofiaVulva: boolean;
    sospechaVPHVulva: boolean;
    sospechaNeoplasiaIntraepitelialVulva: boolean;
    sospechaCancerVulva: boolean;
    localizadaPiel: boolean;
    localizadaMucosa: boolean;
    biopsia: boolean;





}

export class ResultadoBiopsia {
    public fechaResultado: any;
    resultadoNegativa: boolean;
    resultadoInfeccionVPHSinDisplasia: boolean;
    resultadoNICI: boolean;
    resultadoNICII: boolean;
    resultadoNICIII: boolean;
    resultadoAdenocarcinomaInSitu: boolean;
    resultadoAdenocarcinoma: boolean;
    resultadoCancerInvasor: boolean;
    resultadoEscamocelular: boolean;
    resultadoOtros: boolean;
    cualOtro: string;
    observacion: string;

}

export class GenotificacionVPH {
    public resultado: string;
    public fechaResultado: any;

}
export class DatosTomaCitologia {
    public resultadoCitologiAnterior: string;
    public medioTomaMuestra: any;
    public numeroPlaca: number;
    public estadoVacunacionVPH: any;
    public validacionMedioTomaMuestra: boolean;
    public validacionNumeroPlaca: boolean;
    public validacionEstadoVacunacionVPH: boolean;

}

export class ResultadoCitologia {
    public fechaResultado: Date;
    public calidadMuestra: any;
    public clasificacionMuestra: any;
    public anormalidadCelulasEscamosas: any;
    public anormalidadCelulasGlandularesSinEspecificar: any;
    public anormalidadCelulasGlandularesEspecificadas: any;
    public otrosHallazgosNoNeoplasicos: any;
    public microorganismos: any;
    public finalizacionTratamiento: boolean = false;
    public requiereColposcopia: boolean;
    public fechaColposcopia: Date;
    public requiereBiopsia: boolean;
    public fechaBiopsia: Date;
    public requiereConsultaGinecologo: boolean;
    public tratamientoGinecologo: string;

    public continuaEsquema: string;
    public observaciones: string;
    public recomendaciones: string;
    public lectorResultados: string;


    public validacionCalidadMuestra: boolean;
    public validacionClasificacionMuestra: boolean;
    public validacionAnormalidadCelulasEscamosas: boolean;
    public validacionAnormalidadCelulasGlandularesSinEspecificar: boolean;
    public validacionAnormalidadCelulasGlandularesEspecificadas: boolean;
    public validacionOtrosHallazgosNoNeoplasicos: boolean;
    public validacionMicroorganismos: boolean;
    public validacionContinuaEsquema: boolean;
}