import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { Aie3Service } from 'src/app/crecimiento-desarrollo/AIE3/aie3.service';
import { CrecimientoDesarrolloService } from 'src/app/crecimiento-desarrollo/crecimiento-desarrollo.service';
import { AiepiService } from 'src/app/crecimiento-desarrollo/AIEPI/aiepi.service';
import { CrecimientoDesarrollo } from 'src/app/Modelos/CrecimientoDesarrollo';
import { ValeService } from 'src/app/crecimiento-desarrollo/vale/vale.service';
import { LactanciaService } from 'src/app/crecimiento-desarrollo/Lactancia/lactancia.service';
import { ListadoPreguntas } from 'src/app/Modelos/HCUnificado';
@Injectable({
  providedIn: 'root'
})
export class CrecimientoDesarrolloImpresionService {

  constructor(public ead: Aie3Service,
    public aiepi: AiepiService,
    public vale: ValeService,
    public lactancia: LactanciaService,
    public cdServicio: CrecimientoDesarrolloService) { }

  impresionProgramaCD(esCD, examenFisico, CDHC: CrecimientoDesarrollo, listadoPregHijoPadre, edadMeses, completa = false) {

    try {
      if (esCD) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(examenFisico, CDHC, listadoPregHijoPadre, edadMeses, completa)
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

  body(examenFisico, CDHC: CrecimientoDesarrollo, listadoPregHijoPadre: ListadoPreguntas, edadMeses, completa) {

    var cd = CDHC;
    var body = [];
    var titulo = [];
    if (!CDHC.primeraInfancia && !CDHC.infancia) {
      if (edadMeses < 60) {
        CDHC.primeraInfancia = true;
      } else {
        CDHC.infancia = true;
      }
    }


    if (CDHC.primeraInfancia) {
      titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center',fillColor: '#e8e6e6', text: 'PROGRAMA PRIMERA INFANCIA', bold: true }, {}, {}, {}, {}, {});
    } else {
      titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center',fillColor: '#e8e6e6', text: 'PROGRAMA INFANCIA', bold: true }, {}, {}, {}, {}, {});
    }

    body.push(titulo)

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'ANTECEDENTES PERINATALES' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Embarazo deseado:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.embarazoDeseado ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Terminación del embarazo:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.terminacionEmbarazo == null ? "" : cd.antecedentesPerinatales.terminacionEmbarazo.descripcion },
        { fontSize: 8, bold: true, text: 'Lugar donde se tuvo el parto:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.lugarParto == null ? "" : cd.antecedentesPerinatales.lugarParto.descripcion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Complicaciones durante el parto:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.complicacionesParto ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Profesional que atendió el parto:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.profesionalParto == null ? "" : cd.antecedentesPerinatales.profesionalParto.descripcion },
        { fontSize: 8, bold: true, text: 'Posición del parto:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.posicionParto == null ? "" : cd.antecedentesPerinatales.posicionParto.descripcion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Episiotomía:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.episiotomia ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Desgarro:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.desgarro ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Placenta:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.placenta == null ? "" : cd.antecedentesPerinatales.placenta.descripcion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Anestesia:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.anestesia == null ? "" : cd.antecedentesPerinatales.anestesia.descripcion },
        { fontSize: 8, bold: true, text: 'Transfusión sanguínea:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.transfusionSanguinea ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Peso del RN al nacer (g):' },
        { fontSize: 8, text: cd.antecedentesPerinatales.pesoRNNacer },
      ],
      [
        { fontSize: 8, bold: true, text: 'Perimetro Cefalico' },
        { fontSize: 8, text: cd.antecedentesPerinatales.perimetroCefalico },
        { fontSize: 8, bold: true, text: 'Longitud (cm):' },
        { fontSize: 8, text: cd.antecedentesPerinatales.longitud },
        { fontSize: 8, bold: true, text: 'Edad gestacional (semanas):' },
        { fontSize: 8, text: cd.antecedentesPerinatales.edadGestacional },
      ],
      [
        { fontSize: 8, bold: true, text: 'Apgar a los 1 min:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.apgar1Min },
        { fontSize: 8, bold: true, text: 'Apgar a los 5 min:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.apgar5Min },
        { fontSize: 8, bold: true, text: 'Reanimación:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.reanimacion == null ? "" : cd.antecedentesPerinatales.reanimacion.descripcion },
      ],
      [
        { fontSize: 8, bold: true, text: 'Toma de TSH:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.tomaTSH ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Ubicación de la toma TSH:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.ubicacionTomaTSH == null ? "" : cd.antecedentesPerinatales.ubicacionTomaTSH.descripcion },
        { fontSize: 8, bold: true, text: 'Valor TSH:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.valor_TSH }
      ],
      [
        { fontSize: 8, bold: true, text: 'Vacuna hepatitis b:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.vacunaHepatitisB ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Alteración de la bilirrubina:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.alteracionBilirrubina ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Toxoplasma IGM:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.toxoplasmaIGM },
      ])

    if (CDHC.infancia) {
      body.push([
        { fontSize: 8, bold: true, text: 'Tamizaje auditivo:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.tamizajeAuditivo ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Tamizaje agudeza visual:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.tamizajeVisual ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Tamizaje de errores inaptos del metabolismo:' },
        { fontSize: 8, text: cd.antecedentesPerinatales.tamizajeErroresInaptos ? "SI" : "NO" }
      ],
        [
          { fontSize: 8, bold: true, text: 'Tamizaje de cardiopatía congénita:' },
          { fontSize: 8, text: cd.antecedentesPerinatales.tamizajeCardiopatiaCongenita ? "SI" : "NO" },
          {},
          {},
          {},
          {}
        ])
    }


    body.push([
      { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'PATOLOGÍAS DEL RECIÉN NACIDO' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: 'Respiratorias:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.respiratorias ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Malformaciones:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.malformaciones ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Obstrucción vía aérea superior:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.obstruccionViaAereaSuperior ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Cardiovasculares:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.cardiovasculares ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Infecciosas:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.infecciosas ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Metabólicas:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.metabolicas ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Hematológicas:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.hematologicas ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Neurologicas:' },
        { fontSize: 8, text: cd.patologiasRecienNacido.neurologicas ? "SI" : "NO" },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'INFORMACIÓN PSICOSOCIAL' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Edad de la madre (años):' },
        { fontSize: 8, text: cd.informacionPsicosocial.edadMadre },
        { fontSize: 8, bold: true, text: 'Nivel educativo de la madre:' },
        { fontSize: 8, text: cd.informacionPsicosocial.nivelEducativoMadre == null ? "" : cd.informacionPsicosocial.nivelEducativoMadre.descripcion },
        { fontSize: 8, bold: true, text: 'Ocupación de la madre:' },
        { fontSize: 8, text: cd.informacionPsicosocial.ocupacionMadre == null ? "" : cd.informacionPsicosocial.ocupacionMadre.descripcion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Ausencia o muerte de la madre:' },
        { fontSize: 8, text: cd.informacionPsicosocial.ausenciaMuerteMadre ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Edad del padre (años):' },
        { fontSize: 8, text: cd.informacionPsicosocial.edadPadre },
        { fontSize: 8, bold: true, text: 'Nivel educativo del padre:' },
        { fontSize: 8, text: cd.informacionPsicosocial.nivelEducativoPadre == null ? "" : cd.informacionPsicosocial.nivelEducativoPadre.descripcion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Ocupación del padre:' },
        { fontSize: 8, text: cd.informacionPsicosocial.ocupacionPadre == null ? "" : cd.informacionPsicosocial.ocupacionPadre.descripcion },
        { fontSize: 8, bold: true, text: 'Ausencia o muerte del padre:' },
        { fontSize: 8, text: cd.informacionPsicosocial.ausenciaMuertePadre ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Número de hermanos:' },
        { fontSize: 8, text: cd.informacionPsicosocial.numeroHermanos },
      ],
      [
        { fontSize: 8, bold: true, text: 'El RN vive con:' },
        { fontSize: 8, text: cd.informacionPsicosocial.elRNViveCon == null ? "" : cd.informacionPsicosocial.elRNViveCon.descripcion },
        { fontSize: 8, bold: true, text: 'Condiciones socioeconómicas:' },
        { fontSize: 8, text: cd.informacionPsicosocial.condicionesSocieconomicas == null ? "" : cd.informacionPsicosocial.condicionesSocieconomicas.descripcion },
        { fontSize: 8, bold: true, text: 'Condiciones de vivienda:' },
        { fontSize: 8, text: cd.informacionPsicosocial.condicionesVivienda == null ? "" : cd.informacionPsicosocial.condicionesVivienda.descripcion },
      ],
      [
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 5, text: cd.informacionPsicosocial.observaciones },
        {},
        {},
        {},
        {}
      ])


    body.push([
      { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'SEGUIMIENTO AL PROGRAMA' },
      {},
      {},
      {},
      {},
      {}
    ], [
      { fontSize: 8, bold: true, text: 'Edad actual (Años-Meses):' },
      { fontSize: 8, text: cd.seguimientoPrograma.edadActual },
      { fontSize: 8, text: cd.seguimientoPrograma.edadActualMeses == undefined ? edadMeses : cd.seguimientoPrograma.edadActualMeses },
      {},
      { fontSize: 8, bold: true, text: 'Perímetro Cefálico' },
      { fontSize: 8, text: cd.seguimientoPrograma.perimetroCefalico },
    ],
      [
        { fontSize: 8, bold: true, text: 'Peso actual (kg):' },
        { fontSize: 8, text: examenFisico.peso },
        { fontSize: 8, bold: true, text: 'Talla (cm):' },
        { fontSize: 8, text: examenFisico.talla },
        { fontSize: 8, bold: true, text: 'IMC:' },
        { fontSize: 8, text: examenFisico.imc }
      ])


    if (CDHC.primeraInfancia) {
      body.push(
        [
          { fontSize: 8, bold: true, text: 'Tipo de alimentación:' },
          { fontSize: 8, text: cd.seguimientoPrograma.tipoAlimentacion == null ? "" : cd.seguimientoPrograma.tipoAlimentacion.descripcion },
          { fontSize: 8, bold: true, text: 'Tamizaje de agudeza visual:' },
          { fontSize: 8, text: cd.seguimientoPrograma.tamisajeAgudezaVisual == null ? "" : cd.seguimientoPrograma.tamisajeAgudezaVisual.descripcion },
          { fontSize: 8, bold: true, text: 'Tamizaje auditivo:' },
          { fontSize: 8, text: cd.seguimientoPrograma.tamisajeAuditivo == null ? "" : cd.seguimientoPrograma.tamisajeAuditivo.descripcion }
        ],
        [
          { fontSize: 8, bold: true, text: 'Tamizaje de errores inaptos del metabolismo:' },
          { fontSize: 8, text: cd.seguimientoPrograma.tamisajeErroresInaptos == null ? "" : cd.seguimientoPrograma.tamisajeErroresInaptos.descripcion },
          { fontSize: 8, bold: true, text: 'Tamizaje de cardiopatía congénita:' },
          { fontSize: 8, text: cd.seguimientoPrograma.tamisajeAgudezaVisual == null ? "" : cd.seguimientoPrograma.tamisajeAgudezaVisual.descripcion },
          { fontSize: 8, bold: true, text: 'Signos de maltrato físico:' },
          { fontSize: 8, text: cd.seguimientoPrograma.signosMaltratoFisico ? "SI" : "NO" }
        ])
    } else {
      body.push(
        [
          { fontSize: 8, bold: true, text: 'Menarca:' },
          { fontSize: 8, text: cd.seguimientoPrograma.menarca ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Signos de maltrato físico:' },
          { fontSize: 8, text: cd.seguimientoPrograma.signosMaltratoFisico ? "SI" : "NO" },
          {}, {}
        ])
    }

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 2, text: 'Esquema de vacunación completa para la edad:' },
        {},
        { fontSize: 8, text: cd.seguimientoPrograma.esquemaVacunacion ? "SI" : "NO" },
        { fontSize: 8, bold: true, colSpan: 3, text: cd.seguimientoPrograma.obserEsquemaVacunacion },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 5, text: cd.seguimientoPrograma.observaciones },
        {},
        {},
        {},
        {}
      ]);


    if (CDHC.infancia) {
      if (cd.valoracionDelDesarrollo != null) {
        body.push([
          { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'TAMIZAJE DE TANNER' },
          {},
          {},
          {},
          {},
          {}
        ],
          [
            { fontSize: 8, colSpan: 6, text: cd.valoracionDelDesarrollo.estadioObserv },
            {},
            {},
            {},
            {},
            {},
          ]);
      }

      if (cd.asistenciaEscolar != null) {
        body.push(
          [
            { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf',text: 'ASISTENCIA ESCOLAR' },
            {},
            {},
            {},
            {},
            {}
          ],
          [
            { fontSize: 8, bold: true, text: 'Asistencia Escolar' },
            { fontSize: 8, colSpan: 2, text: cd.asistenciaEscolar.asistenciaEscolar },
            {},
            { fontSize: 8, bold: true, text: 'Repitencia escolar' },
            { fontSize: 8, colSpan: 2, text: cd.asistenciaEscolar.repitenciaEscolar },
            {},
          ],
          [
            { fontSize: 8, bold: true, text: 'Relaciones interpersonales' },
            { fontSize: 8, colSpan: 2, text: cd.asistenciaEscolar.relacionesInterpersonales },
            {},
            { fontSize: 8, bold: true, text: 'Desempeño academico' },
            { fontSize: 8, colSpan: 2, text: cd.asistenciaEscolar.desempenoAcademico },
            {},
          ],
          [
            { fontSize: 8, bold: true, text: 'Comportamiento generales' },
            { fontSize: 8, colSpan: 5, text: cd.asistenciaEscolar.comportamientosGenerales },
            {},
            {},
            {},
            {},
          ]);
      }
    }

    if (cd.familiograma != null) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'FAMILIOGRAMA' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: 'Papá' },
          { fontSize: 8, text: cd.familiograma.papa ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Mamá' },
          { fontSize: 8, text: cd.familiograma.mama ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Materno' },
          { fontSize: 8, text: cd.familiograma.abueloMaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Abuela Materna' },
          { fontSize: 8, text: cd.familiograma.abuelaMaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuela Paterna' },
          { fontSize: 8, text: cd.familiograma.abuelaPaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Paterno' },
          { fontSize: 8, text: cd.familiograma.abueloPaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Hermanas' },
          { fontSize: 8, text: cd.familiograma.hermanas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Hermanos' },
          { fontSize: 8, text: cd.familiograma.hermanos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Tíos' },
          { fontSize: 8, text: cd.familiograma.tios ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Tías' },
          { fontSize: 8, text: cd.familiograma.tias ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primos' },
          { fontSize: 8, text: cd.familiograma.primos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primas' },
          { fontSize: 8, text: cd.familiograma.primas ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Mascotas' },
          { fontSize: 8, text: cd.familiograma.mascotas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuáles mascotas?' },
          { fontSize: 8, colSpan: 3, text: cd.familiograma.cualesMascotas },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: cd.familiograma.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: cd.familiograma.observacion },
          {},
          {},
        ]);
    }

    if (cd.ecomapa != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'ECOMAPA' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Iglesias' },
          { fontSize: 8, text: cd.ecomapa.iglesia ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Colegios' },
          { fontSize: 8, text: cd.ecomapa.colegios ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Universidades' },
          { fontSize: 8, text: cd.ecomapa.universidades ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Salud' },
          { fontSize: 8, text: cd.ecomapa.centroMedicos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Trabajo' },
          { fontSize: 8, text: cd.ecomapa.trabajo ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Amigos' },
          { fontSize: 8, text: cd.ecomapa.amigos ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: cd.ecomapa.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: cd.ecomapa.observacion },
          {},
          {},
        ],
      )
    }

    if (cd.apgarComplete != null) {
      if (cd.apgarComplete.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'APGAR' }, {}, {}, {}, {}, {}]);
        var puntajeTotal = 0;
        cd.apgarComplete.forEach(j => {
          body.push([{ fontSize: 8, colSpan: 4, text: j.pregunta },
            {},
            {},
            {},
            { fontSize: 8, colSpan: 2, text: j.respuestaDescripcion },
           
            {}]);

          puntajeTotal = puntajeTotal + j.respuesta;
        });

        /*INTERPRETACIÓN */
        var interpretacion = "";

        if (puntajeTotal <= 9) {
          interpretacion = "Disfunción severa"
        } else if (puntajeTotal >= 10 && puntajeTotal <= 12) {
          interpretacion = "Disfunción moderada"
        } else if (puntajeTotal >= 13 && puntajeTotal <= 16) {
          interpretacion = "Disfunción leve"
        } else if (puntajeTotal >= 17 && puntajeTotal <= 20) {
          interpretacion = "Normal"
        }

        body.push([{ fontSize: 8, text: "Interpretación" },
        { fontSize: 8, colSpan: 5, text: interpretacion },
        {},
        {},
        {},
        {}]);

      }
    }

    if (cd.infancia) {
    
      if (cd.tamizajeSaludMentalComplete != null) {
        if (cd.tamizajeSaludMentalComplete.length > 0) {
          body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'TAMIZAJE SALUD MENTAL' }, {}, {}, {}, {}, {}]);
          cd.tamizajeSaludMentalComplete.forEach(j => {
            body.push([{ fontSize: 8, colSpan: 4, text: j.pregunta },
            {},
            {},
            {},
            { fontSize: 8, colSpan: 2, text: j.respuesta  ? "SI" : "NO" },
            {}]);
          });
  
          body.push([{ fontSize: 8, text: "Interpretación" },
          { fontSize: 8, colSpan: 5, text: cd.interpretacionTamizajeSaludMental == null ? "" : cd.interpretacionTamizajeSaludMental },
          {},
          {},
          {},
          {}]);
        }
      }
    }


    if (cd.tamizajeSaludBucal != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'TAMIZAJE SALUD BUCAL' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: '¿Ha tenido dolor en los dientes?' },
          { fontSize: 8, text: cd.tamizajeSaludBucal.dolor ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene movilidad en sus dientes?' },
          { fontSize: 8, text: cd.tamizajeSaludBucal.movilidad ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene dificultad para masticar?' },
          { fontSize: 8, text: cd.tamizajeSaludBucal.dificultadmasticar ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, text: '¿Le sangran las encías?' },
          { fontSize: 8, text: cd.tamizajeSaludBucal.sangranEncias ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cepilla usted sus dientes después de cada comida?' },
          { fontSize: 8, text: cd.tamizajeSaludBucal.cepillaDiente ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cuántas veces cepilla usted sus dientes en el día?' },
          { fontSize: 8, text: cd.tamizajeSaludBucal.cuantasVecesCepilla ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, colSpan: 3, text: '¿Cuándo fue la última vez que fue valorado por un Odontólogo?' },
          {},
          {},
          { fontSize: 8, text: cd.tamizajeSaludBucal.cuandoValoradoOdontologo },
          { fontSize: 8, text: cd.tamizajeSaludBucal.tiempoValoradoOdontologo },
          {},
        ],
      );
    }


    if (cd.primeraInfancia) {
      if (cd.rutinasHabitos != null) {
        body.push(
          [
            { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf',text: 'RUTINAS DEL NIÑO' },
            {},
            {},
            {},
            {},
            {}
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cómo es el patrón del sueño del niño?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.patronDeSuenio },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cuántas veces se baña el niño al día?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.cuantasVecesSeBania },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cuántas veces al día cambia de pañal el niño?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.cuantasVecesAlDiaCambiaPanial },
            {},
            {},
            {},
          ])
      }

    } else {
      if (cd.rutinasHabitos != null) {
        body.push(
          [
            { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'RUTINAS Y HÁBITOS SALUDABLES' },
            {},
            {},
            {},
            {},
            {}
          ])
        body.push(
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cuántas veces al día come?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.cuantasVecesComeAlDia },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cómo es el consumo de azúcar y sal?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.comoAzucarConsumo },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Que comió en las últimas 24 horas ?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.queComioEn24H },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cuantas veces al día juega el niño?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.cuantasVecesAldiaJuega },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿El niño realiza algún deporte ?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.realizaAlgunDeporte },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cómo  es el patrón del sueño ?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.comoEsElPatronSuenio },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Cómo  es el Habito intestinal y urinario ?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.habitoIntestinal },
            {},
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, colSpan: 2, text: '¿Usa el niño internet o redes sociales?' },
            {},
            { fontSize: 8, colSpan: 4, text: cd.rutinasHabitos.usaInternetRedesSociales ? 'SI' : 'NO' },
            {},
            {},
            {},
          ])
      }
    }

    if (cd.primeraInfancia && cd.valoracionSaludSexual != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf',text: 'VALORACIÓN DE LA SALUD SEXUAL' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Signos de violencia física y sexual:' },
          { fontSize: 8, text: cd.valoracionSaludSexual.signosViolenciaFisicaSexual ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Mutilación genital femenina:' },
          { fontSize: 8, text: cd.valoracionSaludSexual.mutilacionGenitalFemenina ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Matrimonio infantil forzoso:' },
          { fontSize: 8, text: cd.valoracionSaludSexual.matrimonioInfantilForzoso ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, text: 'Criptorquidia:' },
          { fontSize: 8, text: cd.valoracionSaludSexual.criptorquidia ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Epispadias o hipospadias:' },
          { fontSize: 8, text: cd.valoracionSaludSexual.EpiOhipospadias ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Sinequias vulvares:' },
          { fontSize: 8, text: cd.valoracionSaludSexual.sinequiasVulvares ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, text: 'Niños y niñas intersexuales:' },
          { fontSize: 8, text: cd.valoracionSaludSexual.niniosIntersexuales ? 'SI' : 'NO' },
          {},
          {},
          {},
          {},
        ])
    }

    if (cd.tamizajeAnemia != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'TAMIZAJE PARA ANEMIA' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Hemoglobina' },
          { fontSize: 8, text: cd.tamizajeAnemia.tieneHemoglobina ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Resultado' },
          { fontSize: 8, text: cd.tamizajeAnemia.hemoglobina },
          { fontSize: 8, bold: true, text: 'Fecha' },
          { fontSize: 8, text: cd.tamizajeAnemia.fechaHemoglobina },
        ],
        [
          { fontSize: 8, bold: true, text: 'Hematocrito' },
          { fontSize: 8, text: cd.tamizajeAnemia.tieneHematocrito ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Resultado' },
          { fontSize: 8, text: cd.tamizajeAnemia.hematocrito },
          { fontSize: 8, bold: true, text: 'Fecha' },
          { fontSize: 8, text: cd.tamizajeAnemia.fechaHematocrito },
        ],
      );
    }

    /**interpretacion graficas patrones de crecimiento */
    if (cd.primeraInfancia) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'PATRONES DE CRECIMIENTO' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Talla para la edad:' },
          { fontSize: 8, text: cd.patronesCrecimiento.tallaParaEdad },
          { fontSize: 8, bold: true, text: 'Peso para la talla:' },
          { fontSize: 8, text: cd.patronesCrecimiento.pesoParaTalla },
          { fontSize: 8, bold: true, text: 'IMC para la edad:' },
          { fontSize: 8, text: cd.patronesCrecimiento.iMCParaEdad }
        ],

        [
          { fontSize: 8, bold: true, text: 'Perímetro cefálico:' },
          { fontSize: 8, text: cd.patronesCrecimiento.perimetroCefalico },
          { fontSize: 8, bold: true, text: 'Peso para la edad:' },
          { fontSize: 8, text: cd.patronesCrecimiento.pesoParaEdad },
          {},
          {}
        ]);
    } else {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'PATRONES DE CRECIMIENTO' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Talla para la edad:' },
          { fontSize: 8, text: cd.patronesCrecimiento.tallaParaEdad },
          { fontSize: 8, bold: true, text: 'IMC para la edad:' },
          { fontSize: 8, text: cd.patronesCrecimiento.iMCParaEdad },
          {}, {}
        ]);
    }


    if (CDHC.valeComplete) {
      body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'VALE' }, {}, {}, {}, {}, {}]);
      CDHC.valeComplete.forEach(primerPadre => {
        let respuestaPadre = 'NO';
        if (primerPadre.esMarcado) {
          respuestaPadre = 'SI';
        }
        body.push([{ fontSize: 8, bold: true, colSpan: 5, text: primerPadre.descripcion }, {}, {}, {}, {}, { fontSize: 8, text: respuestaPadre }]);
      });
    } else if (this.vale.datosAll.length > 0) {
      this.vale.datosAll = this.vale.datosAll.sort((a, b) => a.padre.idTipo - b.padre.idTipo)
      body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'VALE' }, {}, {}, {}, {}, {}]);
      body.push([{ fontSize: 8, bold: true, colSpan: 4, text: 'Descripcion' }, {}, {}, {}, { fontSize: 8, bold: true, text: 'Respuesta' }, { fontSize: 8, bold: true, text: 'Meses' }]);
      this.vale.datosAll.forEach(x => {
        var id = false;
        CDHC.vale.forEach(e => {
          if (x.padre.id == e) {
            id = true;
          }
        });

        var respuesta = 'NO';
        if (id) {
          respuesta = 'SI';
        }

        var valor = x.padre.idTipo.toString();

        var respuestas = [];
        respuestas.push({ fontSize: 8, colSpan: 4, text: x.padre.descripcion }, {}, {}, {},
          { fontSize: 8, text: respuesta },
          { fontSize: 8, text: valor }
        );
        body.push(respuestas);
      })
    }

    if (cd.aie3Complete) {
      body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ESCALA ABREVIADA DEL DESARROLLO 3' }, {}, {}, {}, {}, {}]);
      cd.aie3Complete.forEach(primerPadre => {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#eae6e6', text: primerPadre.descripcion }, {}, {}, {}, {}, {}]);
        primerPadre.hijos.forEach(hijo => {

          hijo.hijos.forEach(hijo2 => {

            let respuestaHijo = 'NO';
            if (hijo2.hijos[0].esMarcado) {
              respuestaHijo = 'SI';
            }
            body.push([{ fontSize: 8, bold: false, colSpan: 5, text: hijo2.descripcion }, {}, {}, {}, {}, { fontSize: 8, text: respuestaHijo }]);
          })


        })
      });
    } else if (this.ead.datos.length > 0 /*&& cd.aie3.length > 0*/) {
      body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ESCALA ABREVIADA DEL DESARROLLO 3' }, {}, {}, {}, {}, {}]);
      this.ead.datos.forEach(x => {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, text: x.padre == null ? "" : x.padre.descripcion }, {}, {}, {}, {}, {}]);
        x.hijos.forEach(z => {
          z.hijos.forEach(y => {
            var id = false;
            cd.aie3.forEach(e => {
              y.hijos.forEach(w => {
                if (w.padre.id == e) {
                  id = true;
                }
              });
            });

            var respuestas = [];
            respuestas.push(
              { fontSize: 8, colSpan: 5, text: y.padre == null ? "" : y.padre.descripcion },
              {}, {}, {}, {},
              { fontSize: 8, text: id ? "SI" : "NO" });
            body.push(respuestas);
          });
        });
      });
    }



    if (cd.aiepi.datosMarcardosComplete) {
      body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ESTRATEGIA AIEPI PARA NIÑOS DE DOS MESES A CINCO AÑOS' }, {}, {}, {}, {}, {}]);
      cd.aiepi.datosMarcardosComplete.forEach(primerPadre => {
        let respuestaPadre = 'NO';
        if (primerPadre.esMarcado) {
          respuestaPadre = 'SI';
        }
        body.push([{ fontSize: 8, bold: true, colSpan: 5, fillColor: '#eae6e6', text: primerPadre.descripcion }, {}, {}, {}, {}, { fontSize: 8, fillColor: '#eae6e6', text: respuestaPadre }]);
        primerPadre.hijos.forEach(hijo => {
          let respuestaHijo = 'NO';
          if (hijo.esMarcado) {
            respuestaHijo = 'SI';
          }
          body.push([{ fontSize: 8, bold: false, colSpan: 5, text: hijo.descripcion }, {}, {}, {}, {}, { fontSize: 8, text: respuestaHijo }]);
        })
      });
    } else if (this.aiepi.datos.length > 0 /*&& cd.aiepi.datosMarcardos.length > 0*/) {
      body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ESTRATEGIA AIEPI PARA NIÑOS DE DOS MESES A CINCO AÑOS' }, {}, {}, {}, {}, {}]);
      this.aiepi.datos.forEach(x => {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, text: x.padre == null ? "" : x.padre.descripcion }, {}, {}, {}, {}, {}]);
        x.hijos.forEach(z => {
          var hijo = cd.aiepi.datosMarcardos.filter(e => z.padre.id == e);
          var respuesta = 'NO';
          if (hijo.length != 0) {
            respuesta = 'SI';
          }
          var respuestas = [];
          respuestas.push({ fontSize: 8, colSpan: 5, text: z.padre == null ? "" : z.padre.descripcion }, {}, {}, {}, {},
            { fontSize: 8, text: respuesta });
          body.push(respuestas);
        });
      });
    }



    body.push([
      { fontSize: 8, colSpan: 6, text: 'Signos de alarma:\n' + cd.aiepi.recomendaciones.signoAlarma },
      {},
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, colSpan: 6, text: 'Recomendaciones para el desarrollo:\n' + cd.aiepi.recomendaciones.desarrollo },
      {},
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, colSpan: 6, text: 'Recomendaciones de buen trato:\n' + cd.aiepi.recomendaciones.buenTrato },
      {},
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, colSpan: 6, text: 'Recomendaciones Generales:\n' + cd.aiepi.recomendaciones.generales },
      {},
      {},
      {},
      {},
      {},
    ]);

    /**CHAT */
    /*  if (completa && listadoPregHijoPadre.MChat != null) {
       if (listadoPregHijoPadre.MChat.length > 0) {
         body.push([{ fontSize: 8, bold: true, colSpan: 6, text: 'MCHAT (Solo respuestas SI)' }, {}, {}, {}, {}, {}]);
         listadoPregHijoPadre.MChat.forEach(j => {
           var valor = cd.mchat.filter(x => x == j.padre.id);
           if (valor.length != 0) {
             body.push([{ fontSize: 8, colSpan: 6, text: j.padre.descripcion }, {}, {}, {}, {}, {}]);
           }
         });
       }
     } */

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'ANÁLISIS COMENTARIOS Y RECOMENDACIONES DE SEGUIMIENTO' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 5, text: cd.comentariosRecomendacionesSeguimiento.observacion },
        {},
        {},
        {},
        {}
      ],
    );

    return body;
  }

}
