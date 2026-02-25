import { Diagnostico, Parentesco } from './Modelos';

export class SaludMental {
    antecedentesEnfermedadMental: boolean = false;
    parentescoAntecedenteFamiliar: Parentesco;
    contactoInicial: string;
    aparienciaGeneral: string;
    conductaDuranteEntrevista: string;
    pertenciaAparienciaYConducta: string;
    relacionConElEntrevistador: string;
    disposicionInteres: string;
    flujoGeneralLenguage: string;
    alteracionesDelLenguaje: string;
    tonoYcontedidoDelLenguaje: string;
    relacionVerbalesYnoVerbales: string;
    alteracionesDelPensamiento: string;
    dificultadesMotoras: string;
    estadoGeneralAnimo: string;
    verbalizacionesEstadoAnimo: string;
    creenciasSobrelaintervencion: string;
    conscienciaDelaProblematica: string;
    ideasSobrelaCausaDelProblema: string;
    ideaSobbreSolucionProblema: string;
    medicamentosParaElTrastorno: string;
    visitaDomiciliaria: boolean = false;
    orientacionFamilia: boolean = false;
    hospitalizacionUltimaConsulta: boolean = false;
    fechaultimaHospitalizacion: string;
    diagnosticoUltimaHospitalizacion: Diagnostico;
    trastornoDeSaludMental: tipoTrastornoSaludMental;
    novedadSeguimiento: NovedadSeguimiento;
    comentario: string

    comportamientoGenerales: ComportamientoGenerales
    lenguajes: Lenguaje
    estadoAnimo: EstadoAnimo
    contenidoPensamiento: ContenidoPensamiento
    rendimientoCognitivos: RendimientoCognitivos
    valoracionPaciente: ValoracionPaciente

    constructor() {
        this.diagnosticoUltimaHospitalizacion = new Diagnostico();
        this.trastornoDeSaludMental= new tipoTrastornoSaludMental();
        this.novedadSeguimiento= new NovedadSeguimiento();

        this.comportamientoGenerales= new ComportamientoGenerales()
        this.lenguajes= new Lenguaje()
        this.estadoAnimo= new EstadoAnimo()
        this.contenidoPensamiento= new ContenidoPensamiento()
        this.rendimientoCognitivos= new RendimientoCognitivos()
        this.valoracionPaciente= new ValoracionPaciente()

    }

}

export class tipoTrastornoSaludMental {
    descripcion: string;
    estado: string;
}

export class NovedadSeguimiento {
    descripcion: string;
    estado: string;
}


export class ComportamientoGenerales {
    comoPasaElDia: string;
    habitosAlimenticio: string;
    higieneGeneral: string;
    vestimenta: string;
    relajadoInquieto: string;
    otroRelajadoinquieto: string;
    actitudesMovimientos: boolean = false;
    cualesMovimientos: string;
    movimientosInvoluntarios: boolean = false;
    actitudExageradaTeatral: string;
    gestosExpresionesMotores: boolean = false;
    observacion: string;
}


export class Lenguaje {
    queTantoDice: string;
    formaDeHablar: string;
    maneraDeHablar: string;
    cambiaTemaConFrecuencia: boolean = false;
    reglasGramaticalesSintacticas: boolean = false;
    cursaMutismo: boolean = false;
    cursaTrastornosRitmoLenguaje: string;
    cursaTrastornosArticulacionLenguaje: string;
    observacion: string;
}

export class EstadoAnimo {
    comoSeSienteHoy: string;
    comoSeSienteConsigoMismo: string;
    estadoAnimo: string;
    comoEsSuHumor: string;
    lloraSinMotivo: boolean = false;
    dificultadParaConciliarSueno: boolean = false;
    duermeManeraAdecuada: boolean = false;
    despiertaNoche: boolean = false;
    perdidaLivido: boolean = false;
    perdidaApetitoFrecuentemente: boolean = false;
    hePerdidoInteresDisfrutar: boolean = false;
    pensamientoSuicidas: boolean = false;
    haIntentadoOTienPlan: boolean = false;
    planesQueImpideLlevarloaCabo: string;
    piensaQueLaVidaNoVale: boolean = false;
    observacion: string;

}


export class ContenidoPensamiento {
    principalesPreocupaciones: string;
    preocupadoSituacionVital: boolean = false;
    preocupadoPasadoFuturo: boolean = false;
    preocupadoSeguridadPersonal: boolean = false;
    tieneFobia: boolean = false;
    sienteAmenazado: boolean = false;
    sientesAmenazadoContraSalud: boolean = false;
    pensamientosControlados: boolean = false;
    observacion: string;


}

export class RendimientoCognitivos {
    gradoActivacionSistemaNervioso: string;
    otroComoSeEncuentra: string;
    pacienteSeEncuentraUbicado: boolean;
    rendimientoCognitivo: string;
    /*  lugarDondeEsta: string;
     horaDiaAnio: string;
     diaFueAyer: string;
     cuantoEs: string; 
     ejerciciosMentales: boolean = false;
     faltaConcentracion: boolean = false;*/
    esConcienteCuidarSalud: boolean = false;
    observacion: string;

}

export class ValoracionPaciente {
    observacion: string;
}