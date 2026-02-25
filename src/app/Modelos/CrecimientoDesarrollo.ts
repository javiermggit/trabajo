import { AsistenciaEscolar, BaseList, BaseListTamizajeMental, Ecomapa, Familiograma, TamizajeSaludBucal } from "./Adolescencia";
import { ValoracionDelDesarrollo } from "./Joven";

export class CrecimientoDesarrollo {
    public primeraInfancia: boolean;
    public infancia: boolean;

    public antecedentesPerinatales: AntecedentesPerinatales;
    public patologiasRecienNacido: PatologiasRecienNacido;
    public informacionPsicosocial: InformacionPsicosocial;
    public seguimientoPrograma: SeguimientoPrograma;
    public tamizajeAnemia: TamizajeAnemia;
    public patronesCrecimiento: PatronesCrecimiento;
    public seguimientoEscalaAbreviadaDesarrollo: SeguimientoEscalaAbreviadaDesarrollo;

    //public proximoControl: ProximoControl;
    public comentariosRecomendacionesSeguimiento: ComentariosRecomendacionesSeguimiento;
    //public recomendacionCursoVida: ComentariosRecomendacionesSeguimiento;
    public certificado: CertificadoMedico;

    public edadCorregida: number;
    public aie3: any;
    public aie3Complete: Array<any> = [];
    public aiepi: AIAPIS;
    public vale: any;
    public valeComplete: Array<any> = [];
    public mchat: any;
    public lactancia: any;
    public lactanciaPreguntas: lactanciaCuestionario;
    public familiograma: Familiograma;
    public ecomapa: Ecomapa;

    public apgar: Array<BaseList>;
    public apgarComplete: Array<BaseList>;

    public tamizajeSaludMental: Array<BaseListTamizajeMental>;
    public tamizajeSaludMentalComplete: Array<BaseListTamizajeMental>;


    public interpretacionTamizajeSaludMental: string;
    public tamizajeSaludBucal: TamizajeSaludBucal;
    // public tamizajeAlimentacion: TamizajeAlimentacion;

    public rutinasHabitos: RutinasHabitosSaludables;
    public valoracionSaludSexual: ValoracionSaludSexual;
    public valoracionDelDesarrollo: ValoracionDelDesarrollo;
    public asistenciaEscolar: AsistenciaEscolar;
    //listGraficasBase: Array<any>;
}

export class PlanDeCuidadoCrecimientoDesarrollo {
    public tamizajeAuditivo: boolean;
    public promocionApoyoLatancia: boolean;
    public saludBucal: boolean;
    public desparasitacionIntestinal: boolean;
    public antecedentesBajoPeso: boolean;
    public fortificacionCaseraMicronutrientes: boolean;
    public suplementacionHierro: boolean;
    public vitaminaA: boolean;
    public ameritaPruebaHemoglobina: boolean;
    public esquemaVacunacionCompleta: boolean;
    public educacionGrupal: boolean;
    public realizoPruebaHemoglobina: boolean;
    public vacunoTexoide: boolean;
    public papilomaHumano: boolean;

}
/* 
export class TamizajeAlimentacion {
    public recibioLiquido: boolean;
    public obserRecibioLiquido: string;

    public recibioLecheFormula: boolean;
    public obserRecibioLecheFormula: string;

    public recibioLecheAnimal: boolean;
    public obserRecibioLecheAnimal: string;

    public recibioOtroTipoAlimento: boolean;
    public obserRecibioOtroTipoAlimento: string;


    public cuantasVecesAlDiaCome: string;
    public cuantasfrutayVerduraComeAlDia: string;
    public cuantasCarbohidratoyProteinaComeAlDia: string;
    public cuantasChatarraComeAlDia: string;
    public cualEsLaComidaImportante: string;
    public tieneLugarFijoAlimentacion: string;
    public cuandoElNinoNoCome: string;
    public queAlimentoUsaComoPremioOCastigo: string;
}
 */
export class RutinasHabitosSaludables {
    public patronDeSuenio: string;
    public cuantasVecesSeBania: string;
    public cuantasVecesAlDiaCambiaPanial: string;
    cuantasVecesComeAlDia: string;
    comoAzucarConsumo: string;
    queComioEn24H: string;
    cuantasVecesAldiaJuega: string;
    realizaAlgunDeporte: string;
    comoEsElPatronSuenio: string;
    habitoIntestinal: string;
    usaInternetRedesSociales: boolean;
}


export class TamizajeAnemia {
    tieneHemoglobina: boolean;
    hemoglobina: string;
    fechaHemoglobina: Date;
    edadHemoglobina: number;

    tieneHematocrito: boolean;
    hematocrito: string;
    fechaHematocrito: Date;
    edadHematocrito: number;

}

export class CertificadoMedico {
    public tieneCertificado: boolean = false;
    public certificadoHtml: string = "Agudeza visual<br><br>Agudeza auditiva<br><br>Examen general";
}

export class lactanciaCuestionario {
    public curvaCrecimientoAscendente: boolean = false;
    public recibeLactanciaMaterna: boolean = false;
    public comidasEspesas: boolean = false;
    public alimentosOrigenAnimal: boolean = false;
    public productosLacteos: boolean = false;
    public legumbresSecasNuecesSemillas: boolean = false;
    public vegetales: boolean = false;
    public numeroSuficienteComidas: boolean = false;
    public cantidadAlimentosApropiada: boolean = false;
    public madreAyudaAlimentacion: boolean = false;
    public suplementacionVitaminas: boolean = false;
    public estaEnfermo: boolean = false;

    public curvaCrecimientoAscendenteComentario: string = "";
    public recibeLactanciaMaternaComentario: string = "";
    public comidasEspesasComentario: string = "";
    public alimentosOrigenAnimalComentario: string = "";
    public productosLacteosComentario: string = "";
    public legumbresSecasNuecesSemillasComentario: string = "";
    public vegetalesComentario: string = "";
    public numeroSuficienteComidasComentario: string = "";
    public cantidadAlimentosApropiadaComentario: string = "";
    public madreAyudaAlimentacionComentario: string = "";
    public suplementacionVitaminasComentario: string = "";
    public estaEnfermoComentario: string = "";
}

export class AntecedentesPerinatales {
    public embarazoDeseado: boolean;
    public terminacionEmbarazo: any;
    public lugarParto: any;
    public complicacionesParto: boolean = false;
    public profesionalParto: any;
    public posicionParto: any;
    public episiotomia: boolean = false;
    public desgarro: boolean = false;
    public placenta: any;
    public anestesia: any;
    public transfusionSanguinea: boolean = false;
    //public suministroAntibiotico: boolean = false;
    public pesoRNNacer: number;
    //public validacionPesoRNNacer: boolean = false;
    public perimetroCefalico: number;
    // public pliegueCutaneoSubescapular: number;
    // public validacionPerimetroCefalico: boolean;
    public longitud: number;
    // public validacionLongitud: boolean;
    public edadGestacional: number;
    //  public validacionEdadGestacional: boolean;
    public apgar1Min: number;
    public apgar5Min: number;
    public reanimacion: any;
    public tomaTSH: boolean = false;
    public ubicacionTomaTSH: any;
    // public valorTSH: number;
    public valor_TSH: number;
    //  public validacionValorTSH: boolean = false;
    public vacunaHepatitisB: boolean = false;
    public alteracionBilirrubina: boolean = false;
    public toxoplasmaIGM: number;
    //  public validacionToxoplasmaIGM: boolean = false;
    public tamizajeAuditivo: boolean = false;
    public tamizajeVisual: boolean = false;
    public tamizajeErroresInaptos: boolean = false;
    public tamizajeCardiopatiaCongenita: boolean = false;
    public antecedentesMadreBajoPeso: boolean = false;


    /*   validacionTerminacionEmbarazo: boolean;
      validacionLugarParto: boolean;
      validacionProfesionalParto: boolean;
      validacionPosicionParto: boolean;
      validacionPlacenta: boolean;
      validacionAnestesia: boolean;
      validacionApgar1Min: boolean;
      validacionApgar5Min: boolean;
      validacionReanimacion: boolean;
      validacionUbicacionTomaTSH: boolean; */

}
export class PatologiasRecienNacido {
    public respiratorias: boolean;
    public malformaciones: boolean;
    public obstruccionViaAereaSuperior: boolean;
    public cardiovasculares: boolean;
    public infecciosas: boolean;
    public metabolicas: boolean;
    public hematologicas: boolean;
    public neurologicas: boolean;

}
export class InformacionPsicosocial {
    public edadMadre: number;
    // public validacionEdadMadre: boolean;
    public nivelEducativoMadre: any;
    public ocupacionMadre: any;
    public ausenciaMuerteMadre: boolean;
    public edadPadre: number;
    // public validacionEdadPadre: boolean;
    public nivelEducativoPadre: any;
    public ocupacionPadre: any;
    public ausenciaMuertePadre: boolean;
    public numeroHermanos: number;
    // public validacionNumeroHermanos: boolean;
    public elRNViveCon: any;
    public condicionesSocieconomicas: any;
    public condicionesVivienda: any;
    public observaciones: string;

    /*  validacionNivelEducativoMadre: boolean;
     validacionOcupacionMadre: boolean;
     validacionNivelEducativoPadre: boolean;
     validacionOcupacionPadre: boolean;
     validacionElRNViveCon: boolean;
     validacionCondicionesSocieconomicas: boolean;
     validacionCondicionesVivienda: boolean; */

}

export class SeguimientoPrograma {
    public edadActual: number;
    /*** @property {number} edadActual daada en meses */
    public edadActualMeses: number;
    public edadActualDias: number;
    public edadActualSemanas: number;

    public rangoEdad: number;
    /*** @property {number} pesoActual daada en Kg */
    public pesoActual: number;
    public talla: number;
    public imc: string;
    public perimetroCefalico: number;

    public tipoAlimentacion: any;
    public promocionApoyoLatancia: boolean = false;

    public tamisajeAgudezaVisual: any;
    public tamisajeAuditivo: any;

    public signosMaltratoFisico: boolean = false;
    public menarca: boolean = false;

    public tamisajeErroresInaptos: any;
    public tamisajeCardiopatiaCongenita: any;

    public desparasitacionIntestinal: boolean = false;
    public fortificacionCaseraMicronutrientes: boolean = false;

    public suplementacionHierro: boolean = false;
    public vitaminaA: boolean = false;

    public vacunoTexoide: boolean = false;
    public papilomaHumano: boolean = false;

    public esquemaVacunacion: boolean = false;
    public obserEsquemaVacunacion: string;

    public observaciones: string;
}

export class LactanciaMaterna {
    public tieneLaBocaAbierta: string;
    public resultadoTieneLaBocaAbierta: boolean = false;

    public mentonTocaSeno: string;
    public resultadoMentonTocaSeno: boolean = false;

    public labioInferioVolteado: string;
    public resultadoLabioInferioVolteado: boolean = false;

    public seVeMasAreolaPorArriba: string;
    public resultadoSeVeMasAreolaPorArriba: boolean = false;

    public cabezaCuerpoNinoDerechoAlDeLaMadre: string;
    public resultadoCabezaCuerpoNinoDerechoAlDeLaMadre: boolean = false;

    public cuerpoDelNinoFrenteAlDeLaMadre: string;
    public resultadoCuerpoDelNinoFrenteAlDeLaMadre: boolean = false;

    public madreSostieneElCuerpoDelNino: string;
    public resultadoMadreSostieneElCuerpoDelNino: boolean = false;

    public succionIneficaz: string;
    public resultadoSuccionIneficaz: boolean = false;
}

export class PatronesCrecimiento {
    public tallaParaEdad: string;
    public pesoParaTalla: string;
    public perimetroCefalico: string;
    public iMCParaEdad: string;
    public pesoParaEdad: string;
}
export class SeguimientoEscalaAbreviadaDesarrollo {
    public motricidadGruesa: string;
    public motricidadFinoadactiva: string;
    public audicionLenguaje: string;
    public personalSocial: string;

}
export class AIEPI {
    public observaciones: string;

}
export class ProximoControl {
    public medicoGeneral: Date;
    public enfermeraJefe: Date;
    public pediatra: Date;
    public odontologia: Date;
    public nutricionista: Date;
    public psicologo: Date;
    public educacionGrupalAgenteEducativo: Date;

}

export class ComentariosRecomendacionesSeguimiento {
    public observacion: string;
}

export class RespuestaGrafica {
    grafica: Grafica;
    interpretacion: string;
}
export class Grafica {
    public title: string;
    public type: string;
    public columnNames: string[];
    public data: Array<number>[];
    public options: {
        backgroundColor: string,
        hAxis: {
            title: string
        },
        vAxis: {
            title: string,
        },
        colors: string[];
        series: {
            curveType: string;
            visibleInLegend: boolean;
            pointShape: string;
            pointSize: number;
            lineDashStyle: number[]
        }[]
    }
}

export class GraficaHistorico {
    public title: string;
    public type: string;
    public columnNames: string[];
    public data: any;
    public options: {
        backgroundColor: string,
        hAxis: {
            title: string
        },
        vAxis: {
            title: string,
        },
        colors: string[];
        series: {
            curveType: string;
            visibleInLegend: boolean;
            pointShape: string;
            pointSize: number;
            lineDashStyle: number[]
        }[]
    }
}


export class AIAPIS {
    public datosMarcardos: Array<number> = [];
    public datosMarcardosComplete: Array<any> = [];
    public recomendaciones: AiapiRecomendacion;
}

export class datosMarcardos {
    public padre: number;
    public hijos: Array<number> = [];
}

export class AiapiRecomendacion {
    public signoAlarma: string;
    public desarrollo: string;
    public buenTrato: string;
    public generales: string;
}


export class ValoracionSaludSexual {
    public signosViolenciaFisicaSexual: boolean = false;
    public mutilacionGenitalFemenina: boolean = false;
    public matrimonioInfantilForzoso: boolean = false;
    public criptorquidia: boolean = false;
    public EpiOhipospadias: boolean = false;
    public sinequiasVulvares: boolean = false;
    public niniosIntersexuales: boolean = false;

}
