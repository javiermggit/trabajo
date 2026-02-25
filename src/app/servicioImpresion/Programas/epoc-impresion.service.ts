import { Injectable } from '@angular/core';
import * as moment from 'moment';
//import { EpocService } from 'src/app/epoc/epoc.service';
import { epocHc } from 'src/app/Modelos/epoc';

@Injectable({
  providedIn: 'root'
})
export class EpocImpresionService {

  constructor() { }


  impresionPrograma(datosusuarios, epocServices: epocHc) {
    try {
      return {
        table: {
          widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
          body: this.body(datosusuarios, epocServices)
        },
        layout: {
          defaultBorder: true
        },
      };

    } catch (error) {
      return '';
    }
  }


  body(datosusuarios, epoc: epocHc) {

    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center',fillColor: '#e8e6e6', text: 'PROGRAMA EPOC', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'ANTECEDENTES GENERALES' },
        {},
        {},
        {},
        {},
        {}
      ])

    body.push([
      { fontSize: 8, text: 'Indice tabaquico' },
      { fontSize: 8, colSpan: 5, text: epoc.antecedentesGenerales.indiceTabaquico },
      {},
      {},
      {},
      {}
    ]);

    if (epoc.antecedentesGenerales.exposicionOcupacional) {
      body.push([
        { fontSize: 8, text: 'Exposición Ocupacional (Humo de madera)' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.exposicionOcupacional ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.exposicionOcupacionalObservacion },
        {},
        {},
        {}
      ]);
    }


    if (epoc.antecedentesGenerales.exposicionHumo) {
      body.push([
        { fontSize: 8, text: 'Exposición al humo' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.exposicionHumo ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.exposicionHumoObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.infeccionesResporatoriasInfancia) {
      body.push([
        { fontSize: 8, text: 'Infecciones respiratorias en la infancia' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.infeccionesResporatoriasInfancia ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.infeccionesResporatoriasInfanciaObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.historiaFamiliarEpoc) {
      body.push([
        { fontSize: 8, text: ' Historia Familiar' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.historiaFamiliarEpoc ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.historiaFamiliarEpocObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.atopia) {
      body.push([
        { fontSize: 8, text: 'Atopia' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.atopia ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.atopiaObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.vacunaCovid19) {
      body.push([
        { fontSize: 8, text: 'Vacuna de covid-19' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.vacunaCovid19 ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.vacunaCovid19Observacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.espectoraciones) {
      body.push([
        { fontSize: 8, text: 'Espectoraciones' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.espectoraciones ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.espectoracionesObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.contaminacionAmbiental) {
      body.push([
        { fontSize: 8, text: 'Contaminación ambiental' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.contaminacionAmbiental ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.contaminacionAmbienteObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.alcohol) {
      body.push([
        { fontSize: 8, text: 'Alcohol' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.alcohol ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.alcoholObservacion },
        {},
        {},
        {}
      ]);
    }


    if (epoc.antecedentesGenerales.tos) {
      body.push([
        { fontSize: 8, text: 'Tos' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.tos ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.tosObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.antecedentesTuberculosis) {
      body.push([
        { fontSize: 8, text: 'Antecedentes de tubercolosis' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.antecedentesTuberculosis ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.antecedentesTuberculosisObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.vacunaNeumococo) {
      body.push([
        { fontSize: 8, text: 'Vacuna de neumococo' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.vacunaNeumococo ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.aacunaNeumococoObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.vacunaInfluenza) {
      body.push([
        { fontSize: 8, text: 'Vacuna influenza' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.vacunaInfluenza ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.vacunaInfluenzaObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.disnea) {
      body.push([
        { fontSize: 8, text: 'Disnea' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.disnea ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.disneaObservacion },
        {},
        {},
        {}
      ]);
    }

    if (epoc.antecedentesGenerales.usoInhaladores) {
      body.push([
        { fontSize: 8, text: 'Uso de inhaladores' },
        { fontSize: 8, text: (epoc.antecedentesGenerales.usoInhaladores ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: epoc.antecedentesGenerales.usoInhaladoresObservacion },
        {},
        {},
        {}
      ]);
    }

    body.push([
      { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'EXAMEN FISICO' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: 'Peso' },
        { fontSize: 8, text: epoc.examenFisico.peso },
        { fontSize: 8, bold: true, text: 'Talla' },
        { fontSize: 8, text: epoc.examenFisico.talla },
        { fontSize: 8, bold: true, text: 'IMC' },
        { fontSize: 8, text: epoc.examenFisico.imc }
      ], [
      { fontSize: 8, bold: true, text: 'Oximetria de pulso' },
      { fontSize: 8, colSpan: 5, text: epoc.examenFisico.oximetriaDePulso },
      {},
      {},
      {},
      {}
    ], [
      { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf',text: 'PARACLINICOS Y AYUDAS DIAGNOSTICAS' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: 'Gases arteriales PH' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.gasesArterialesPH },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Gases arteriales PH' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.gasesArterialesFechaPH != null ? moment(epoc.paraclinicosAyudasDiagnosticas.gasesArterialesFechaPH).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Gases arteriales PO2' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.gasesArterialesPO2 },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Gases arteriales PO2' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.gasesArterialesFechaPO2 != null ? moment(epoc.paraclinicosAyudasDiagnosticas.gasesArterialesFechaPO2).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Gases arteriales PCO2' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.gasesArterialesPCO2 },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Gases arteriales PCO2' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.gasesArterialesFechaPCO2 != null ? moment(epoc.paraclinicosAyudasDiagnosticas.gasesArterialesFechaPCO2).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Basiloscopia BK-1' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.bk1 },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Basiloscopia BK-1' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.fechabk1 != null ? moment(epoc.paraclinicosAyudasDiagnosticas.fechabk1).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Basiloscopia BK-2' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.bk2 },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Basiloscopia BK-2' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.fechabk2 != null ? moment(epoc.paraclinicosAyudasDiagnosticas.fechabk2).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Basiloscopia BK-3' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.bk3 },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Basiloscopia BK-3' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.fechabk3 != null ? moment(epoc.paraclinicosAyudasDiagnosticas.fechabk3).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Basiloscopia BK-1 cultivo' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.bk1cultivo },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Basiloscopia BK-1 cultivo' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.fechabk1cultivo != null ? moment(epoc.paraclinicosAyudasDiagnosticas.fechabk1cultivo).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Basiloscopia BK-2 cultivo' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.bk2cultivo },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Basiloscopia BK-2 cultivo' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.fechabk2cultivo != null ? moment(epoc.paraclinicosAyudasDiagnosticas.fechabk2cultivo).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Basiloscopia BK-3 cultivo' },
        { fontSize: 8, colSpan: 3, text: epoc.paraclinicosAyudasDiagnosticas.bk3cultivo },
        {},
        {},
        { fontSize: 8, bold: true, text: 'Fecha Basiloscopia BK-3 cultivo' },
        { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.fechabk3cultivo != null ? moment(epoc.paraclinicosAyudasDiagnosticas.fechabk3cultivo).format("DD-MM-YYYY") : "" },
      ]
    );
    //Torax

    body.push([
      { fontSize: 8, bold: true, text: 'Espirometria' },
      { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.espirometriaSw ? 'SI' : 'NO' },
      { fontSize: 8, bold: true, text: 'Espirometria' },
      { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.espirometria },
      { fontSize: 8, bold: true, text: 'Fecha Espirometria' },
      { fontSize: 8, text: epoc.paraclinicosAyudasDiagnosticas.espirometriaFecha != null ? moment(epoc.paraclinicosAyudasDiagnosticas.espirometriaFecha).format("DD-MM-YYYY") : "" },
    ]);

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'HERRAMIENTAS DE EVALUACION PARA GRAVEDAD DE EPOC' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'VEF1 POST Broncodilatador ' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.broncodilatador + ' %' },
        { fontSize: 8, colSpan: 2, text: epoc.herramientasEvaluacionGravedad.clasificacionGravedadEPOC },
        {},
        { fontSize: 8, bold: true, text: 'Exacerbaciones en el ultimo año ' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.exacerbaciones },
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Escala modificada de disnea del medical research council (mMRC) ' },
        {},
        {},
        { fontSize: 8, colSpan: 3, text: epoc.herramientasEvaluacionGravedad.mmrc },
        {},
        {},
      ],
      [
        { fontSize: 8, colSpan: 6, bold: true, text: 'COPD Assessment Test - CAT' },
        {},
        {},
        {},
        {},
        {},
      ],
      [
        { fontSize: 8, bold: true, text: 'Nivel Tos' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.tos },
        { fontSize: 8, bold: true, text: 'Nivel Flema' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.flema },
        { fontSize: 8, bold: true, text: 'Siento Opresión en el pecho' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.opresionPecho },
      ],
      [
        { fontSize: 8, bold: true, text: 'Nivel de falta de aire cuando sube pendientes' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.pendiente },
        { fontSize: 8, bold: true, text: 'No me siento limitado para realizar actividades domesticas' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.limitacionDomestica },
        { fontSize: 8, bold: true, text: 'Me siento seguro al salir de casa a pesar de la afeccion pulmonar que tengo' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.afeccionPulmonar },
      ],
      [
        { fontSize: 8, bold: true, text: 'Duermo sin problemas' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.dormir },
        { fontSize: 8, bold: true, text: 'Tengo mucha energia' },
        { fontSize: 8, text: epoc.herramientasEvaluacionGravedad.cat.energia },
        {},
        {},
      ],
      [
        { fontSize: 8, bold: true, text: 'Resultado' },
        { fontSize: 8, colSpan: 5, text: epoc.herramientasEvaluacionGravedad.resultadoCat },
        {},
        {},
        {},
        {},
      ],
      [
        { fontSize: 8, bold: true, text: 'Resultado CLASIFICACION POR SINTOMAS' },
        { fontSize: 8, text: epoc.resultados.clasificacionPorSintomas },
        { fontSize: 8, bold: true, text: 'Resultado CLASIFICACION DE SEVERIDAD' },
        { fontSize: 8, text: epoc.resultados.clasificacionPorSeveridad },
        { fontSize: 8, colSpan: 2, text: epoc.resultados.clasificacionPorSeveridadInterpretacion },
        {},
      ], [
      { fontSize: 8, bold: true, colSpan: 6, text: 'IDENTIFICACION DE COMORBILIDADES Y SU PRONOSTICO (Indice combolidad de cotex)' },
      {},
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, bold: true, text: ' Cancer de pulmon, exogafo, pancreas y mama' },
      { fontSize: 8, text: epoc.indiceComorbilidad.cancer ? 'Si' : 'No' },
      { fontSize: 8, bold: true, text: 'Ansiedad' },
      { fontSize: 8, text: epoc.indiceComorbilidad.ansiedad ? 'Si' : 'No' },
      { fontSize: 8, bold: true, text: 'Todos los otros tipos de cancer' },
      { fontSize: 8, text: epoc.indiceComorbilidad.todoCancer ? 'Si' : 'No' },
    ], [
      { fontSize: 8, bold: true, text: 'Cirrosis hepatica' },
      { fontSize: 8, text: epoc.indiceComorbilidad.cirrosis ? 'Si' : 'No' },
      { fontSize: 8, bold: true, text: 'Fibrilación auricular / aleteo' },
      { fontSize: 8, text: epoc.indiceComorbilidad.fibrilacion ? 'Si' : 'No' },
      { fontSize: 8, bold: true, text: 'Diabetes con neuropatia' },
      { fontSize: 8, text: epoc.indiceComorbilidad.diabetes ? 'Si' : 'No' },
    ], [
      { fontSize: 8, bold: true, text: ' Fibrosis pulmonar' },
      { fontSize: 8, text: epoc.indiceComorbilidad.fibrosis ? 'Si' : 'No' },
      { fontSize: 8, bold: true, text: 'Insuficiencia cardiaca congestiva' },
      { fontSize: 8, text: epoc.indiceComorbilidad.insuficiencia ? 'Si' : 'No' },
      { fontSize: 8, bold: true, text: ' Ulcera gastrica duodenal' },
      { fontSize: 8, text: epoc.indiceComorbilidad.ulcera ? 'Si' : 'No' },
    ], [
      { fontSize: 8, bold: true, text: ' Enfermedad coronaria' },
      { fontSize: 8, text: epoc.indiceComorbilidad.enfermedad ? 'Si' : 'No' },
      { fontSize: 8, bold: true, text: 'Resultado' },
      { fontSize: 8, text: epoc.indiceComorbilidad.resultado },
      { fontSize: 8, colSpan: 2, text: epoc.indiceComorbilidad.interpretacion },
      {},
    ], [
      { fontSize: 8, bold: true, text: 'INDICE DE BODEX - Resultado Bodex' },
      { fontSize: 8, colSpan: 5, text: epoc.resultados.resultadoBodex },
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, bold: true, text: 'TRATAMIENTO' },
      { fontSize: 8, colSpan: 5, text: epoc.resultados.tratamientoFinal },
      {},
      {},
      {},
      {},
    ])


    return body;
  }
}
