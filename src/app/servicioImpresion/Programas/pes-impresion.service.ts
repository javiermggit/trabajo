import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { ExamenFisico } from 'src/app/Modelos/Modelos';
import { Pes, ResultadoexamenPrograma } from 'src/app/Modelos/Pes';
import { PesService } from 'src/app/morbilidad/pes/pes.service';

@Injectable({
  providedIn: 'root'
})
export class PesImpresionService {

  constructor() { }

  impresionProgramaPES(esPes, Pes: Pes, examen: ExamenFisico, sexo: string, edad: number) {
    try {
      if (esPes) {
        return {
          table: {
            widths: ['30%', '20%', '30%', '20%'],
            body: this.bodyPes(Pes, examen, sexo, edad)
          },
          layout: {
            defaultBorder: true
          },
        };
      } else {
        return '';
      }
    } catch (error) {

      return '';
    }
  }

  bodyPes(pes: Pes, examen: ExamenFisico, sexo: string, edad: number) {

    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, colSpan: 4, alignment: 'center', text: 'PROGRAMA PES', bold: true }, {}, {}, {});
    body.push(titulo);

    if (pes.esSindromeMetabolico) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 4, text: 'SÍNDROME METABÓLICO' },
        {},
        {},
        {}

      ], [
        { fontSize: 8, bold: true, text: 'Fecha de Ingreso al programa' },
        { fontSize: 8, text: moment(pes.sindromeMetabolico.fechaIngreso).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Diagnóstico confirmatorio' },
        { fontSize: 8, text: pes.sindromeMetabolico.diagConfirmatorio }

      ],
        [
          { fontSize: 8, bold: true, text: 'Fecha de Confirmación del dx' },
          { fontSize: 8, text: moment(pes.sindromeMetabolico.fechaConfirmacionDx).format("DD-MM-YYYY") },
          { fontSize: 8, bold: true, text: 'Tipo de Diagnóstico' },
          { fontSize: 8, text: pes.sindromeMetabolico.tipoDiagnostico }
        ],
        [
          { fontSize: 8, bold: true, text: 'Tipo de síndrome' },
          { fontSize: 8, text: pes.sindromeMetabolico.tipoSindrome == null ? "" : pes.sindromeMetabolico.tipoSindrome.descripcion },
          { fontSize: 8, bold: true, text: 'Edad al ingreso' },
          { fontSize: 8, text: pes.sindromeMetabolico.edadIngreso }
        ],
        [
          {},
          {},
          {},
          {}
        ],
      );
    }

    if (pes.esHipertension) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 4, text: 'HIPERTENSIÓN ARTERIAL' },
        {},
        {},
        {}

      ], [
        { fontSize: 8, bold: true, text: 'Fecha de Ingreso al programa' },
        { fontSize: 8, text: moment(pes.hipertension.fechaIngreso).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Diagnóstico confirmatorio' },
        { fontSize: 8, text: pes.hipertension.diagConfirmatorio }

      ],
        [
          { fontSize: 8, bold: true, text: 'Fecha de Confirmación del dx' },
          { fontSize: 8, text: moment(pes.hipertension.fechaConfirmacionDx).format("DD-MM-YYYY") },
          { fontSize: 8, bold: true, text: 'Tipo de Hipertensión' },
          { fontSize: 8, text: pes.hipertension.tipoHipertension == null ? "" : pes.hipertension.tipoHipertension.descripcion }
        ],
        [
          { fontSize: 8, bold: true, text: 'Edad al ingreso' },
          { fontSize: 8, text: pes.hipertension.edadIngreso },
          {},
          {}
        ],
      );
    }

    if (pes.esDiabetes) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 4, text: 'DIABETES' },
        {},
        {},
        {}

      ], [
        { fontSize: 8, bold: true, text: 'Fecha de Ingreso al programa' },
        { fontSize: 8, text: moment(pes.diabetes.fechaIngreso).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Diagnóstico confirmatorio' },
        { fontSize: 8, text: pes.diabetes.diagConfirmatorio }

      ],
        [
          { fontSize: 8, bold: true, text: 'Fecha de Confirmación del dx' },
          { fontSize: 8, text: moment(pes.diabetes.fechaConfirmacionDx).format("DD-MM-YYYY") },
          { fontSize: 8, bold: true, text: 'Tipo de Diabetes' },
          { fontSize: 8, text: pes.diabetes.tipoDiabetes == null ? "" : pes.diabetes.tipoDiabetes.descripcion }
        ],
        [
          { fontSize: 8, bold: true, text: 'Edad al ingreso' },
          { fontSize: 8, text: pes.diabetes.edadIngreso },
          {},
          {}
        ],
      );
    }

    if (pes.esNefroproteccion) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 4, text: 'NEFROPROTECCIÓN' },
        {},
        {},
        {}

      ], [
        { fontSize: 8, bold: true, text: 'Fecha de Ingreso al programa' },
        { fontSize: 8, text: moment(pes.nefroproteccion.fechaIngreso).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Diagnóstico confirmatorio' },
        { fontSize: 8, text: pes.nefroproteccion.diagConfirmatorio }

      ],
        [
          { fontSize: 8, bold: true, text: 'Fecha de Confirmación del dx' },
          { fontSize: 8, text: moment(pes.nefroproteccion.fechaConfirmacionDx).format("DD-MM-YYYY") },
          { fontSize: 8, bold: true, text: 'Tipo de la ERC' },
          { fontSize: 8, text: pes.nefroproteccion.etiologiaERC == null ? "" : pes.nefroproteccion.etiologiaERC.descripcion }
        ],
        [
          { fontSize: 8, bold: true, text: 'Edad al ingreso' },
          { fontSize: 8, text: pes.nefroproteccion.edadIngreso },
          {},
          {}
        ],
      );
    }

    if (pes.resultadoPrograma != null) {
      body = this.resultadoPrograma(body, pes.resultadoPrograma, 'DATOS Y EXÁMENES DE INGRESO AL PROGRAMA');
    }

    if (pes.seguimientoResultadoPrograma != null) {
      body = this.resultadoPrograma(body, pes.seguimientoResultadoPrograma, 'DATOS Y EXÁMENES SEGUIMIENTO AL PROGRAMA');
    }

    if (pes.esEPOC) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 4, text: 'EPOC' },
        {},
        {},
        {}

      ], [
        { fontSize: 8, bold: true, text: 'Diagnóstico confirmatorio' },
        { fontSize: 8, text: pes.epoc.diagConfirmatorio },
        { fontSize: 8, bold: true, text: 'Fecha de Confirmación del dx' },
        { fontSize: 8, text: moment(pes.epoc.fechaConfirmacionDx).format("DD-MM-YYYY") }
      ],
        [
          { fontSize: 8, bold: true, text: 'Exposición Ocupacional Humo de madera' },
          { fontSize: 8, text: pes.epoc.exposicionOcupacional ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Contaminación ambiental' },
          { fontSize: 8, text: pes.epoc.contaminacionAmbiental ? 'SI' : 'NO' }
        ],
        [
          { fontSize: 8, bold: true, text: 'Exposición al humo por tiempo prolongado' },
          { fontSize: 8, text: pes.epoc.exposicionahumo ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Alcohol' },
          { fontSize: 8, text: pes.epoc.alcohol ? 'SI' : 'NO' }
        ],
        [
          { fontSize: 8, bold: true, text: 'Infecciones respiratorias en la infancia' },
          { fontSize: 8, text: pes.epoc.infeccionRespiratoriaInfancia ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Historia Familiar' },
          { fontSize: 8, text: pes.epoc.historiaFamilia ? 'SI' : 'NO' }
        ],
        [
          { fontSize: 8, bold: true, text: 'Atopia' },
          { fontSize: 8, text: pes.epoc.atopia ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Consume Cigarrillos' },
          { fontSize: 8, text: pes.epoc.consumeCigarrillos ? 'SI' : 'NO' }
        ],
        [
          { fontSize: 8, bold: true, text: 'Cuantos Cigarrillos al Día' },
          { fontSize: 8, text: pes.epoc.cuantosCigarrilosAldia ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Número de Años Fumando' },
          { fontSize: 8, text: pes.epoc.numeroDeAnosFumando }
        ],
        [
          { fontSize: 8, bold: true, text: 'Indice tabaquico' },
          { fontSize: 8, text: pes.epoc.indiceTabaquico },
          { fontSize: 8, bold: true, text: 'Riesgo de EPOC' },
          { fontSize: 8, text: pes.epoc.riesgoEPOC }
        ],
        [
          { fontSize: 8, bold: true, text: 'Ultima espirometría' },
          { fontSize: 8, text: pes.epoc.espirometrias ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Resultado espirometría' },
          { fontSize: 8, text: pes.epoc.resultadoEspirometrias }
        ],
        [
          { fontSize: 8, bold: true, text: 'Fecha espirometría' },
          { fontSize: 8, text: moment(pes.epoc.fechaEspirometrias).format("DD-MM-YYYY") },
          { fontSize: 8, bold: true, text: 'VEF1 POST Broncodilatador' },
          { fontSize: 8, text: pes.epoc.vefPost }
        ],
        [
          { fontSize: 8, bold: true, text: 'Clasificación de la gravedad de EPOC' },
          { fontSize: 8, text: pes.epoc.clasificacionGravedadEPOC },
          { fontSize: 8, bold: true, text: 'Tratamiento' },
          { fontSize: 8, text: pes.epoc.tratamiento }
        ],
        [
          { fontSize: 8, bold: true, text: 'Exacerbaciones' },
          { fontSize: 8, text: pes.epoc.esExacerbaciones ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Cuales Exacerbaciones' },
          { fontSize: 8, text: pes.epoc.exacerbaciones }
        ],
        [
          { fontSize: 8, bold: true, text: 'Recomendaciones' },
          { fontSize: 8, colSpan: 3, text: pes.epoc.observaciones },
          {},
          {}
        ],
      );
    }

    if (pes.esHipotiroidismo) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 4, text: 'Hiper/Hipotiroidismo' },
        {},
        {},
        {}

      ], [
        { fontSize: 8, bold: true, text: 'Resultado T4 Libre' },
        { fontSize: 8, text: pes.hipotiroidismo.tcuatrolibre },
        { fontSize: 8, bold: true, text: 'Resultado TSH' },
        { fontSize: 8, text: pes.hipotiroidismo.tsh }

      ],
        [
          { fontSize: 8, bold: true, text: 'Resultado T3 Libre' },
          { fontSize: 8, text: pes.hipotiroidismo.ttreslibre },
          { fontSize: 8, bold: true, text: 'Resultado T4 Total' },
          { fontSize: 8, text: pes.hipotiroidismo.tcuatrolibre }
        ],
      );
    }

    if (sexo == "F" && (edad >= 18 && edad <= 49)) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 4, text: 'PLANIFICACIÓN FAMILIAR' },
        {},
        {},
        {}

      ], [
        { fontSize: 8, bold: true, text: 'Planifica?' },
        { fontSize: 8, text: pes.planificacionFamiliar.planifica ? 'Si' : 'No' },
        { fontSize: 8, colSpan: 2, text: pes.planificacionFamiliar.planificaObser },
        {}
      ]
      );

      body.push([
        { fontSize: 8, bold: true, text: 'Métodos anticoncepción usados' },
        { fontSize: 8, text: 'Oral:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.oral ? "SI" : "NO") },
        { fontSize: 8, text: 'Inyectable:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.inyectable ? "SI" : "NO") },
        { fontSize: 8, text: 'Subdermico:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.subdermico ? "SI" : "NO") },

      ],
        [
          { fontSize: 8, text: 'D.I.U.:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.d_I_U ? "SI" : "NO") },
          { fontSize: 8, text: 'Condón:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.condon ? "SI" : "NO") },
          { fontSize: 8, text: 'Estirilación Femenina:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.esterilizacionFemenina ? "SI" : "NO") },
          { fontSize: 8, text: 'Vasectomia:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.vasectomia ? "SI" : "NO") },
        ],

        [
          { fontSize: 8, text: 'Otros:  ' + (pes.planificacionFamiliar.metodosAnticonceptivos.otros ? "SI" : "NO") },
          { fontSize: 8, colSpan: 3, text: pes.planificacionFamiliar.metodosAnticonceptivos.otros ? pes.planificacionFamiliar.cualesMetodosAnticonceptivos : "" },
          {},
          {}
        ]);
    }




    body.push([
      { fontSize: 8, bold: true, colSpan: 4, text: 'Obesidad' },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: 'IMC' },
        { fontSize: 8, text: examen.imc },
        { fontSize: 8, bold: true, text: 'Clasificación Obesidad' },
        { fontSize: 8, text: pes.obesidad != null ? pes.obesidad.clasificacion : "" }
      ]
    );

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 4, text: 'CLASIFICACIÓN DEL RIESGO POR PATOLOGIA AL FINALIZAR LA VALORACIÓN' },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Cockcroft - Gault - Estadio' },
        { fontSize: 8, text: pes.clasificacion.estadio + '-' + pes.clasificacion.estadioTFGApellido },
        { fontSize: 8, bold: true, text: 'Seguimiento al programa' },
        { fontSize: 8, text: pes.clasificacion.seguimientoPrograma },
      ],
      [
        { fontSize: 8, bold: true, text: 'TFG MDRD 4' },
        { fontSize: 8, text: pes.clasificacion.resultadoMDRD },
        { fontSize: 8, bold: true, text: 'TFG MDR / CKD-EPI' },
        { fontSize: 8, text: pes.clasificacion.resultadoCkdEpi },
      ],
      [
        { fontSize: 8, bold: true, text: 'Síndrome Metabólico' },
        { fontSize: 8, text: pes.clasificacion.sindromemetabolico },
        { fontSize: 8, bold: true, text: 'Hipertensión' },
        { fontSize: 8, text: pes.clasificacion.hipertension }
      ],
      [
        { fontSize: 8, bold: true, text: 'Diabetes' },
        { fontSize: 8, text: pes.clasificacion.diabetes },
        { fontSize: 8, bold: true, text: 'RCV' },
        { fontSize: 8, text: pes.clasificacion.rcv }
      ],
      [
        { fontSize: 8, bold: true, text: 'Glucometría' },
        { fontSize: 8, text: pes.clasificacion.glucometria ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Cuál Glucometría? ' },
        { fontSize: 8, text: pes.clasificacion.glucometriacual }
      ],
      [
        { fontSize: 8, bold: true, text: 'RCV FRAMIGHAM (%)' },
        { fontSize: 8, text: pes.clasificacion.rcvFramigham },
        { fontSize: 8, bold: true, text: 'NIVEL DE RIESGO' },
        { fontSize: 8, text: pes.clasificacion.nivelRiesgo }
      ],
      [
        { fontSize: 8, bold: true, colSpan: 4, text: 'TEST DE MORISKY-GREEN' },
        {},
        {},
        {}
      ]);
    if (pes.testMoriskGreen != null) {
      body.push([
        { fontSize: 8, colSpan: 3, bold: true, text: '¿Olvida alguna vez tomar los medicamentos para tratar su enfermedad?' },
        {},
        {},
        { fontSize: 8, text: pes.testMoriskGreen.olvidoTomarMedicamentos ? 'SI' : 'NO' },

      ],
        [
          { fontSize: 8, colSpan: 3, bold: true, text: '¿Toma los medicamentos a las horas indicadas?' },
          {},
          {},
          { fontSize: 8, text: pes.testMoriskGreen.tomaMedicamentoHoraIndicada ? 'SI' : 'NO' },

        ],
        [
          { fontSize: 8, colSpan: 3, bold: true, text: 'Cuando se encuentra bien, ¿deja de tomar la medicación?' },
          {},
          {},
          { fontSize: 8, text: pes.testMoriskGreen.sienteBienDejaTomarMedicacion ? 'SI' : 'NO' },

        ],
        [
          { fontSize: 8, colSpan: 3, bold: true, text: 'Si alguna vez le sienta mal la medicación, ¿deja usted de tomarla?' },
          {},
          {},
          { fontSize: 8, text: pes.testMoriskGreen.sienteMalDejaTomarMedicacion ? 'SI' : 'NO' },

        ]
      );
    }
    body.push([
      { fontSize: 8, bold: true, colSpan: 4, text: 'ANÁLISIS, COMENTARIOS Y RECOMENDACIONES DE SEGUIMIENTO' },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, colSpan: 4, bold: true, text: pes.comentariosFinales },
        {},
        {},
        {}
      ],
    );

    return body;
  }

  resultadoPrograma(body, resultadoPrograma: ResultadoexamenPrograma, titulo) {
    body.push([
      { fontSize: 8, bold: true, colSpan: 4, text: titulo },
      {},
      {},
      {}
    ]);

    if (resultadoPrograma.resultadoCreatinina != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Creatinina (mg/dl)' },
        { fontSize: 8, text: resultadoPrograma.resultadoCreatinina },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Creatinina' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultCreatinina).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoGlicemia != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Glicemia' },
        { fontSize: 8, text: resultadoPrograma.resultadoGlicemia },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Glicemia' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultGlicemia).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoTrigliceridos != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Triglicéridos' },
        { fontSize: 8, text: resultadoPrograma.resultadoTrigliceridos },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Triglicéridos' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultTrigliceridos).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoElectrocardiograma != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Electrocardiograma' },
        { fontSize: 8, text: resultadoPrograma.resultadoElectrocardiograma },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Electrocardiograma' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultElectrocardiograma).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoHemoglobina != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Hemoglobina glicosilada' },
        { fontSize: 8, text: resultadoPrograma.resultadoHemoglobina },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Hemoglobina glicosilada' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultHemoglobina).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoColesterolTotal != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Colesterol total' },
        { fontSize: 8, text: resultadoPrograma.resultadoColesterolTotal },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Colesterol total' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultColesterolTotal).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoPTH != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado PTH' },
        { fontSize: 8, text: resultadoPrograma.resultadoPTH },
        { fontSize: 8, bold: true, text: 'Fecha Resultado PTH' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultPTH).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoEcografiaRenal != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Ecografía renal' },
        { fontSize: 8, text: resultadoPrograma.resultadoEcografiaRenal },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Ecografía renal' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultEcografiaRenal).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoMicroAlbuminuria != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Microalbuminuria' },
        { fontSize: 8, text: resultadoPrograma.resultadoMicroAlbuminuria },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Microalbuminuria' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultMicroAlbuminuria).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoColesterolHDL != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Colesterol HDL' },
        { fontSize: 8, text: resultadoPrograma.resultadoColesterolHDL },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Colesterol HDL' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultColesterolHDL).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoProteina24H != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Proteinas en 24H' },
        { fontSize: 8, text: resultadoPrograma.resultadoProteina24H },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Proteinas en 24H' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultProteina24H).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoPotasio != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Potasio' },
        { fontSize: 8, text: resultadoPrograma.resultadoPotasio },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Potasio' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultPotasio).format("DD-MM-YYYY") }
      ]);
    }

    /*  if (resultadoPrograma.resultadoMicroAlbuminuria2 != null) {
       body.push([
         { fontSize: 8, bold: true, text: 'Resultado Microalbuminuria 2' },
         { fontSize: 8, text: resultadoPrograma.resultadoMicroAlbuminuria2 },
         { fontSize: 8, bold: true, text: 'Fecha Resultado Microalbuminuria 2' },
         { fontSize: 8, text: moment(resultadoPrograma.fechaResultMicroAlbuminuria2).format("DD-MM-YYYY") }
       ]);
     } */

    if (resultadoPrograma.resultadoColesterolLDL != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Colesterol LDL' },
        { fontSize: 8, text: resultadoPrograma.resultadoColesterolLDL },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Colesterol LDL' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultColesterolLDL).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoCreatinuria != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Creatinuria' },
        { fontSize: 8, text: resultadoPrograma.resultadoCreatinuria },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Creatinuria' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultCreatinuria).format("DD-MM-YYYY") }
      ]);
    }
    if (resultadoPrograma.resultadoFosforo != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Fósforo' },
        { fontSize: 8, text: resultadoPrograma.resultadoFosforo },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Fósforo' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultFosforo).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoAlbumina != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Albúmina' },
        { fontSize: 8, text: resultadoPrograma.resultadoAlbumina },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Albúmina' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultAlbumina).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoUroanalisis != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Uroanalisis' },
        { fontSize: 8, text: resultadoPrograma.resultadoUroanalisis },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Uroanalisis' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultUroanalisis).format("DD-MM-YYYY") }
      ]);
    }


    if (resultadoPrograma.resultadoHemograma != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Hemograma' },
        { fontSize: 8, text: resultadoPrograma.resultadoHemograma },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Hemograma' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultHemograma).format("DD-MM-YYYY") }
      ]);
    }


    if (resultadoPrograma.resultadoCalcio != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Calcio' },
        { fontSize: 8, text: resultadoPrograma.resultadoCalcio },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Calcio' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultCalcio).format("DD-MM-YYYY") }
      ]);
    }


    if (resultadoPrograma.resultadoDepuracionCreatininaEnOrina24H != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Depuracion Creatinina En Orina 24H' },
        { fontSize: 8, text: resultadoPrograma.resultadoDepuracionCreatininaEnOrina24H },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Depuracion Creatinina En Orina 24H' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultDepuracionCreatininaEnOrina24H).format("DD-MM-YYYY") }
      ]);
    }


    if (resultadoPrograma.resultadoNitrogenoUreicoSangre != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Nitrogeno Ureico Sangre' },
        { fontSize: 8, text: resultadoPrograma.resultadoNitrogenoUreicoSangre },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Nitrogeno Ureico Sangre' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultNitrogenoUreicoSangre).format("DD-MM-YYYY") }
      ]);
    }


    if (resultadoPrograma.resultadoHemoclasificacion != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado Hemoclasificacion' },
        { fontSize: 8, text: resultadoPrograma.resultadoHemoclasificacion },
        { fontSize: 8, bold: true, text: 'Fecha Resultado Hemoclasificacion' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultHemoclasificacion).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoALT != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado ALT' },
        { fontSize: 8, text: resultadoPrograma.resultadoALT },
        { fontSize: 8, bold: true, text: 'Fecha Resultado ALT' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultALT).format("DD-MM-YYYY") }
      ]);
    }

    if (resultadoPrograma.resultadoAST != null) {
      body.push([
        { fontSize: 8, bold: true, text: 'Resultado AST' },
        { fontSize: 8, text: resultadoPrograma.resultadoAST },
        { fontSize: 8, bold: true, text: 'Fecha Resultado AST' },
        { fontSize: 8, text: moment(resultadoPrograma.fechaResultAST).format("DD-MM-YYYY") }
      ]);
    }

    return body;
  }







  /*  resultadoProgramaSeguimiento(body, pes) {
     var seguimiento = pes.seguimientoResultadoPrograma;

     seguimiento.forEach(e => {

       if (e.seguimientoResultadoPrograma != null) {
         var resultadoPrograma = e.seguimientoResultadoPrograma;
         body.push([
           { fontSize: 8, bold: true, colSpan: 4, text: 'SEGUMINETO INGRESO AL PROGRAMA - FECHA CONSULTA: ' +  moment( e.fechaCreacion).format("DD-MM-YYYY")  },
           {},
           {},
           {}
         ]);

         if (resultadoPrograma.resultadoCreatinina != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Creatinina (mg/dl)' },
             { fontSize: 8, text: resultadoPrograma.resultadoCreatinina },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Creatinina' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultCreatinina).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoGlicemia != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Glicemia' },
             { fontSize: 8, text: resultadoPrograma.resultadoGlicemia },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Glicemia' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultGlicemia).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoTrigliceridos != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Triglicéridos' },
             { fontSize: 8, text: resultadoPrograma.resultadoTrigliceridos },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Triglicéridos' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultTrigliceridos).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoElectrocardiograma != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Electrocardiograma' },
             { fontSize: 8, text: resultadoPrograma.resultadoElectrocardiograma },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Electrocardiograma' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultElectrocardiograma).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoHemoglobina != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Hemoglobina glicosilada' },
             { fontSize: 8, text: resultadoPrograma.resultadoHemoglobina },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Hemoglobina glicosilada' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultHemoglobina).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoColesterolTotal != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Colesterol total' },
             { fontSize: 8, text: resultadoPrograma.resultadoColesterolTotal },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Colesterol total' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultColesterolTotal).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoPTH != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado PTH' },
             { fontSize: 8, text: resultadoPrograma.resultadoPTH },
             { fontSize: 8, bold: true, text: 'Fecha Resultado PTH' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultPTH).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoEcografiaRenal != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Ecografía renal' },
             { fontSize: 8, text: resultadoPrograma.resultadoEcografiaRenal },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Ecografía renal' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultEcografiaRenal).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoMicroAlbuminuria != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Microalbuminuria' },
             { fontSize: 8, text: resultadoPrograma.resultadoMicroAlbuminuria },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Microalbuminuria' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultMicroAlbuminuria).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoColesterolHDL != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Colesterol HDL' },
             { fontSize: 8, text: resultadoPrograma.resultadoColesterolHDL },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Colesterol HDL' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultColesterolHDL).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoProteina24H != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Proteinas en 24H' },
             { fontSize: 8, text: resultadoPrograma.resultadoProteina24H },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Proteinas en 24H' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultProteina24H).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoPotasio != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Potasio' },
             { fontSize: 8, text: resultadoPrograma.resultadoPotasio },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Potasio' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultPotasio).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoMicroAlbuminuria2 != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Microalbuminuria 2' },
             { fontSize: 8, text: resultadoPrograma.resultadoMicroAlbuminuria2 },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Microalbuminuria 2' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultMicroAlbuminuria2).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoColesterolLDL != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Colesterol LDL' },
             { fontSize: 8, text: resultadoPrograma.resultadoColesterolLDL },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Colesterol LDL' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultColesterolLDL).format("DD-MM-YYYY") }
           ]);
         }

         if (resultadoPrograma.resultadoCreatinuria != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Creatinuria' },
             { fontSize: 8, text: resultadoPrograma.resultadoCreatinuria },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Creatinuria' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultCreatinuria).format("DD-MM-YYYY") }
           ]);
         }
         if (resultadoPrograma.resultadoFosforo != null) {
           body.push([
             { fontSize: 8, bold: true, text: 'Resultado Fósforo' },
             { fontSize: 8, text: resultadoPrograma.resultadoFosforo },
             { fontSize: 8, bold: true, text: 'Fecha Resultado Fósforo' },
             { fontSize: 8, text: moment(resultadoPrograma.fechaResultFosforo).format("DD-MM-YYYY") }
           ]);
         }

       }

     });
     return body;
   } */
}
