import { MetodoPlanificacion } from "./Adolescencia";

export class Pes {
   hipertension: Hipertension;
   diabetes: Diabetes;
   nefroproteccion: Nefroproteccion;
   sindromeMetabolico: SindromeMetabolico;
   /*SE AGREGO NUEVO */
   epoc: EPOC;
   hipotiroidismo: Hipotiroidismo;
   obesidad: Obesidad;

   resultadoPrograma: ResultadoexamenPrograma;
   seguimientoResultadoPrograma: ResultadoexamenPrograma;
   clasificacion: clasificacionPatologica;
   antecedentes: antecedentes;

   public riesgoCardiovascular: string = "";

   public comentariosFinales: string;
   public esDiabetes: boolean;
   public esNefroproteccion: boolean;
   public esHipertension: boolean;
   public esSindromeMetabolico: boolean;
   public esHipotiroidismo: boolean = false;
   public esEPOC: boolean = false;
   public datosReferenciaTFG: DatosReferenciaTFG;
   public testMoriskGreen: TestMoriskGreen;
   public planificacionFamiliar: PlanificacionFamiliar;
   public antecedentesRelacionados:AntecedentesRelacionadas;
  
   
}

export class PlanificacionFamiliar {
   constructor() {
      this.metodosAnticonceptivos = new MetodoPlanificacion;
    }
   planifica: boolean = false;
   planificaObser: string = '';
   usoMetodosAnticonceptivos: boolean = false;
   metodosAnticonceptivos: MetodoPlanificacion;
   cualesMetodosAnticonceptivos: string = '';
}



export class TestMoriskGreen {
   olvidoTomarMedicamentos: boolean = false;
   tomaMedicamentoHoraIndicada: boolean = false;
   sienteBienDejaTomarMedicacion: boolean = false;
   sienteMalDejaTomarMedicacion: boolean = false;
}

export class AntecedentesRelacionadas {
   public EsIECA: boolean = false;
   public EsIECAConoceFecha: boolean = false;
   public EsIECAFecha:  Date;
   public EsARAII: boolean = false;
   public EsARAIIConoceFecha: boolean = false;
   public EsARAIIFecha:  Date;
   public EsTerapiaNoDialiticaEstadioRenal5: boolean = false;
   public EsTerapiaNoDialiticaEstadioRenal5ConoceFecha: boolean = false;
   public EsTerapiaNoDialiticaEstadioRenal5Fecha:  Date;
   public EsTransplanteRenal: boolean = false;
   public EsTransplanteRenalConoceFecha: boolean = false;
   public EsTransplanteRenalFecha:  Date;
   public EsHemodialisisAntecedentes: boolean = false;
   public EsHemodialisisAntecedentesConoceFecha: boolean = false;
   public EsHemodialisisAntecedentesFecha:  Date;
}

export class DatosReferenciaTFG {
   public sexo: number = 0;
   public talla: number = 0;
   public peso: number = 0;
   public edad: number = 0;
   public afroAmericano: boolean = false;
   public creatinine: number = 0;
   public creatinineUnidad: any;
   public resultadoCG: any;
   public resultadoMDRD: any;
   public resultadoCkdEpi: any;
}

export class ResultadoexamenPrograma {

   public resultadoHemograma: string;
   public fechaResultHemograma: Date;
   public alertResultHemograma: string;
   public resultadoGlicemia: string;
   public alertresultadoGlicemia: string;
   public fechaResultGlicemia: Date;


   public resultadoHemoglobina: string;
   public alertresultadoHemoglobina: string;
   public fechaResultHemoglobina: Date;
   public resultadoColesterolTotal: string;
   public alertresultadoColesterolTotal: string;
   public fechaResultColesterolTotal: Date;

   public resultadoColesterolHDL: string;
   public alertresultadoColesterolHDL: string;
   public fechaResultColesterolHDL: Date;
   public resultadoColesterolLDL: string;
   public alertresultadoColesterolLDL: string;
   public fechaResultColesterolLDL: Date;

   public resultadoTrigliceridos: string;
   public alertresultadoTrigliceridos: string;
   public fechaResultTrigliceridos: Date;
   public resultadoUroanalisis: string;
   public alertresultadoUroanalisis: string;
   public fechaResultUroanalisis: Date;

   public resultadoCreatinina: string;
   public alertresultadoCreatinina: string;
   public fechaResultCreatinina: Date;
   public resultadoCreatinuria: string;
   public alertresultadoCreatinuria: string;
   public fechaResultCreatinuria: Date;

   public resultadoMicroAlbuminuria: string;
   public alertresultadoMicroAlbuminuria: string;
   public fechaResultMicroAlbuminuria: Date;
   public fechaResultMicroAlbuminuriaCreatinuria: Date;
   public resultadoMicroAlbuminuriaCreatinuria: string;
   
   public resultadoPTH: string;
   public alertresultadoPTH: string;
   public fechaResultPTH: Date;

   public resultadoFosforo: string;
   public alertresultadoFosforo: string;
   public fechaResultFosforo: Date;
   public resultadoAlbumina: string;
   public alertresultadoAlbumina: string;
   public fechaResultAlbumina: Date;

   public resultadoCalcio: string;
   public alertresultadoCalcio: string;
   public fechaResultCalcio: Date;
   public resultadoPotasio: string;
   public alertresultadoPotasio: string;
   public fechaResultPotasio: Date;

   public resultadoProteina24H: string;
   public alertresultadoProteina24H: string;
   public fechaResultProteina24H: Date;
   public resultadoDepuracionCreatininaEnOrina24H: string;
   public alertresultadoDepuracionCreatininaEnOrina24H: string;
   public fechaResultDepuracionCreatininaEnOrina24H: Date;


   public resultadoNitrogenoUreicoSangre: string;
   public alertresultadoNitrogenoUreicoSangre: string;
   public fechaResultNitrogenoUreicoSangre: Date;
   public resultadoHemoclasificacion: string;
   public alertresultadoHemoclasificacion: string;
   public fechaResultHemoclasificacion: Date;

   public resultadoElectrocardiograma: string;
   public alertresultadoElectrocardiograma: string;
   public fechaResultElectrocardiograma: Date;
   public resultadoEcografiaRenal: string;
   public alertresultadoEcografiaRenal: string;
   public fechaResultEcografiaRenal: Date;

   public resultadoALT: string;
   public alertresultadoALT: string;
   public fechaResultALT: Date;
   public resultadoAST: string;
   public alertresultadoAST: string;
   public fechaResultAST: Date;


   /*    public resultadoMicroAlbuminuria2: string;
   public fechaResultMicroAlbuminuria2: Date;

   public resultadoCloro: string;
   public fechaResultCloro: Date;

   public resultadoSodio: string;
   public fechaResultSodio: Date;

   public resultadoMagnesio: string;
   public fechaResultMagnesio: Date; */
}


export class antecedentes {

   public lesionOrgBlancoCorazon: string;
   public idLesionOrgBlancoCorazon: number = 0;
   public obserLesionOrgBlancoCorazon: string;

   public lesionOrgBlancoVision: string;
   public idLesionOrgBlancoVision: number = 0;
   public obserLesionOrgBlancoVision: string;

   public lesionOrgCerebroVascular: string;
   public idLesionOrgCerebroVascular: number = 0;
   public retinopatia: string;
   public idRetinopatia: number = 0;

   public lesionOrgVascular: string;
   public idLesionOrgVascular: number = 0;
   public pieDiabetico: string;
   public obsPieDiabetico: string;
   public idPieDiabetico: number = 0;
   public obsRetinopatia: string;

   public obsLesionOrgVascular: string;
   public obsLesionOrgCerebroVascular: string;

   public lesionOrgBlancoRenal: string;
   public idLesionOrgBlancoRenal: number = 0;
   public obsLesionOrgBlancoRenal: string;
   public fallaCardiaca: string;
   public idFallaCardiaca: number = 0;
   public obsFallaCardiaca: string;

}

export class clasificacionPatologica {
   /*SE AGREGO */
   public hipertension: string;
   public sindromemetabolico: string;
   public diabetes: string;
   public glucometria: boolean = false;
   public glucometriacual: string;
   public rcv: string;
   public estadio: number = 0;
   public seguimientoPrograma: string;
   /*SE AGREGO NUEVO */
   public estadioTFGApellido: string;
   public rcvFramigham: string;
   public nivelRiesgo: string;


   public resultadoMDRD: any;
   public resultadoCkdEpi: any;


}

export class SindromeMetabolico {
   public fechaIngreso: Date;
   public diagConfirmatorio: string;
   public diagnosticoConfirmatorio: VMDiagConfirmatorio;
   public fechaConfirmacionDx: Date;
   public anioConfirmacionDx: string;
   public tipoDiagnostico: string;
   public tipoSindrome: any;
   public edadIngreso: number;
   public tasaFilGlomerular: number = 0;
   public factores: FactoresSindrome = new FactoresSindrome();
   public validacionTipoSindrome: boolean;
   public validacionTipoDiagnostico: boolean;
   public validacionFechaIngreso: boolean;
   public validacionDiagConfirmatorio: boolean;
   public validacionEdadIngreso: boolean;
   public validacionTasaFilGlomerular: boolean;
   public validacionFechaConfirmacionDx: boolean;
   constructor() {
      this.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
   }
}

export class FactoresSindrome {
   obesidadAbdominal: boolean = false;
   hipertrigliceridemia: boolean = false;
   colesterolHDLBajo: boolean = false;
   presionSanguineaAlta: boolean = false;
   glucosaAlta: boolean = false;
}



export class Hipertension {
   public fechaIngreso: Date;
   public diagConfirmatorio: string = "";
   public diagnosticoConfirmatorio: VMDiagConfirmatorio;
   public fechaConfirmacionDx: Date;
   public anioConfirmacionDx: string;
   public tipoHipertension: any;
   public edadIngreso: number;
   public tasaFilGlomerular: number = 0;

   constructor() {
      this.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
   }

   public validacionTipoHipertension: boolean;
   public validacionFechaIngreso: boolean;
   public validacionDiagConfirmatorio: boolean;
   public validacionFechaConfirmacionDx: boolean;
   public validacionEdadIngreso: boolean;
   public validacionTasaFilGlomerular: boolean;

}

export class Diabetes {
   public fechaIngreso: Date;
   public diagConfirmatorio: string;
   public diagnosticoConfirmatorio: VMDiagConfirmatorio;
   public fechaConfirmacionDx: Date;
   public anioConfirmacionDx: string;
   public tipoDiabetes: any;
   public clasificacionDiabetes: any;
   public edadIngreso: number;
   public tasaFilGlomerular: number = 0;

   constructor() {
      this.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
   }
   public validacionTipoDiabetes: boolean;
   public validacionFechaIngreso: boolean;
   public validacionDiagConfirmatorio: boolean;
   public validacionFechaConfirmacionDx: boolean;
   public validacionEdadIngreso: boolean;
   public validacionTasaFilGlomerular: boolean;
}

//NEFROPROTECCION
export class Nefroproteccion {
   public fechaIngreso: Date;
   public diagConfirmatorio: string;
   public diagnosticoConfirmatorio: VMDiagConfirmatorio;
   public fechaConfirmacionDx: Date;
   public anioConfirmacionDx: string;
   public etiologiaERC: any;
   public edadIngreso: number;
   public tasaFilGlomerular: number = 0;
   constructor() {
      this.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
   }
   public validacionEtiologiaERC: boolean;

   public validacionFechaIngreso: boolean;
   public validacionDiagConfirmatorio: boolean;
   public validacionFechaConfirmacionDx: boolean;
   public validacionEdadIngreso: boolean;
   public validacionTasaFilGlomerular: boolean;
}

/*SE AGREGO NUEVO */
export class EPOC {
   public diagConfirmatorio: string;
   public fechaConfirmacionDx: Date;
   public exposicionOcupacional: boolean = false;
   public contaminacionAmbiental: boolean = false;
   public exposicionahumo: boolean = false;
   public alcohol: boolean = false;
   public infeccionRespiratoriaInfancia: boolean = false;
   public historiaFamilia: boolean = false;
   public atopia: boolean = false;
   public consumeCigarrillos: boolean = false;
   public cuantosCigarrilosAldia: number = 0;
   public numeroDeAnosFumando: number = 0;
   public indiceTabaquico: string;
   public riesgoEPOC: string
   public espirometrias: boolean = false;
   public resultadoEspirometrias: string
   public fechaEspirometrias: Date
   public vefPost: number
   public clasificacionGravedadEPOC: string
   public tratamiento: string
   public esExacerbaciones: boolean = false;
   public exacerbaciones: string
   public observaciones: string
}

export class Hipotiroidismo {

   public tcuatrolibre: string;
   public tsh: string;
   public ttreslibre: string;
   public tcuatrototal: string;
}

export class Obesidad {
   public imc: string;
   public clasificacion: string;
}

export class puntajeFramingham {
   public id: number;
   public tipo: string;
   public sexo: string;
   public edadInicio: number;
   public edadFin: number;
   public puntos: number;
   public valorInicio: string;
   public valorFin: string;
   public esFumador: boolean;
   public conTratamiento: boolean;
   public fechaCreacion: Date;
   public Estado: string;
}

export class IsResultadoexamenPrograma {

   public isresultadoHemograma: boolean;
   public isfechaResultHemograma: boolean;

   public isresultadoCalcio: boolean;
   public isfechaResultCalcio: boolean;

   public isresultadoDepuracionCreatininaEnOrina24H: boolean;
   public isfechaResultDepuracionCreatininaEnOrina24H: boolean;

   public isresultadoNitrogenoUreicoSangre: boolean;
   public isfechaResultNitrogenoUreicoSangre: boolean;
   public isresultadoHemoclasificacion: boolean;
   public isfechaResultHemoclasificacion: boolean;

   public isresultadoALT: boolean;
   public isfechaResultALT: boolean;
   public isresultadoAST: boolean;
   public isfechaResultAST: boolean;

   public isresultadoCreatinina: boolean;
   public isfechaResultCreatinina: boolean;

   public isresultadoGlicemia: boolean;
   public isfechaResultGlicemia: boolean;

   public isresultadoTrigliceridos: boolean;
   public isfechaResultTrigliceridos: boolean;

   public isresultadoElectrocardiograma: boolean;
   public isfechaResultElectrocardiograma: boolean;

   public isresultadoHemoglobina: boolean;
   public isfechaResultHemoglobina: boolean;

   public isresultadoColesterolTotal: boolean;
   public isfechaResultColesterolTotal: boolean;

   public isresultadoPTH: boolean;
   public isfechaResultPTH: boolean;

   public isresultadoEcografiaRenal: boolean;
   public isfechaResultEcografiaRenal: boolean;

   public isresultadoMicroAlbuminuria: boolean;
   public isfechaResultMicroAlbuminuria: boolean;

   public isresultadoMicroAlbuminuriaCreatinuria: boolean;
 

   public isresultadoColesterolHDL: boolean;
   public isfechaResultColesterolHDL: boolean;

   public isresultadoProteina24H: boolean;
   public isfechaResultProteina24H: boolean;

   public isresultadoPotasio: boolean;
   public isfechaResultPotasio: boolean;

   public isresultadoColesterolLDL: boolean;
   public isfechaResultColesterolLDL: boolean;

   public isresultadoCreatinuria: boolean;
   public isfechaResultCreatinuria: boolean;

   public isresultadoFosforo: boolean;
   public isfechaResultFosforo: boolean;


   public isresultadoAlbumina: boolean;
   public isfechaResultAlbumina: boolean;

   public isresultadoUroanalisis: boolean;
   public isfechaResultUroanalisis: boolean;


}

export class VMHistoricoPes {
   estadio: string;
   tasaFiltracionGlomerural: string;
   fechaUltimaConsulta: Date;
   nombreProfesional: string;
   talla: string;
   peso: string;
   imc: string;
   fechaPesoTalla: Date;
   presionSistolica: string;
   presionDiastolica: string;
   fechaPresion: Date;
   creatinina: string;
   fechaCreatinina: Date;
   hemoglobina: string;
   fechaHemoglobina: Date;
   resultadoMDRD: any;
   resultadoCkdEpi: any;
}

export class ParExamenes {
   examen: string;
   valor1: number;
   valor2: number;
   edad: number;
   sexo: string;
   tipo: string;
}

export class VMDiagConfirmatorio {
   public id: number;
   public codigo: string;
   public descripcion: string;
}
