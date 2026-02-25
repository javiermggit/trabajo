import { Injectable } from '@angular/core';
import { PrenatalService } from '../../prenatal/prenatal.service';
import * as moment from 'moment'
import { ExamenesDeIngresoTrimestre, Prenatal } from 'src/app/Modelos/Prenatal';

@Injectable({
  providedIn: 'root'
})
export class PrenatalImpresionService {

  constructor(
    private servicio: PrenatalService
  ) { }

  impresionPrograma(esPYP, prenatal) {
    try {
      if (esPYP) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(prenatal)
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
  body(prenatal: Prenatal) {

    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center', text: 'PROGRAMA PRENATAL', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);


    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'HISTORIA REPRODUCTIVA Y ANTECEDENTES OBSTÉTRICOS' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Edad Actual(años):' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.edadActual },
        { fontSize: 8, bold: true, text: 'Partos Vaginales:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.partosVaginales },
        { fontSize: 8, bold: true, text: 'Partos por Cesárea:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.partosCesarea },
      ],
      [
        { fontSize: 8, bold: true, text: 'Partos:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.partos },
        { fontSize: 8, bold: true, text: 'Abortos:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.abortos },
        { fontSize: 8, bold: true, text: 'Embarazo Ectópicos:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.embarazosEctopios },
      ],
      [
        { fontSize: 8, bold: true, text: 'Gravidez:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.gravidez },
        { fontSize: 8, bold: true, text: 'Nacidos Vivos:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.nacidosVivos },
        { fontSize: 8, bold: true, text: 'Nacidos Muertos:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.nacidosMuertos }
      ],
      [
        { fontSize: 8, bold: true, text: 'Viven Actualmente:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.vivenActualmente },
        { fontSize: 8, bold: true, text: 'Muertos en la Primera Semana:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.muertosPrimeraSemana },
        { fontSize: 8, bold: true, text: 'Terminación Último Embarazo' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.terminacionUltimoEmbarazo == null ? "" : moment(prenatal.hisReproductivaAntObstetricos.terminacionUltimoEmbarazo).format("DD-MM-YYYY") },

      ],
      [
        { fontSize: 8, bold: true, text: 'Embarazos Múltiples:' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.embarazosMultiples ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Nacimientos Prematuros' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.nacimientosPrematuros ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Embarazos Prolongados' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.embarazosProlongados ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Hijos con Malformaciones Congénitas' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.hijosMalformacionesCongenitas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Muertos después de la Primera Semana' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.muertosDespuesPrimeraSemana ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Nacidos con menos de 2500 g' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.nacidosMenos2500Gramos ? 'SI' : 'NO' },

      ],
      [
        { fontSize: 8, bold: true, text: 'Nacidos con más de 4000 g' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.nacidosMas4000Gramos ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Mortalidad fetal tardía o neonatal temprana' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.mortalidadFetalTardia ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Historial de Infertilidad' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.historialInfertilidad ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Hemorragia en el Postparto' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.hemorragiaPostParto ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Legrado' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.legrado ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Parto Anormal o Difícil' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.partoAnormal ? 'SI' : 'NO' },

      ],
      [
        { fontSize: 8, bold: true, text: 'Cambios de Pareja Inter-gestacionales' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.cambiosParejaIntergestionales ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Molas' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.molas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Retención Placentaria' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.retencionPlacentaria ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Ruptura Prematura de Membranas' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.ropturaPrematuraMembranas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Retardo en el Crecimiento Infra-uterino' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.retartoCrecimientoInfrauterino ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Hipertensión' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.hipertension ? 'SI' : 'NO' },

      ],
      [
        { fontSize: 8, bold: true, text: 'Preeclampsia' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.preeclampsia ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Eclampsia' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.eclampsia ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Enfermedad Renal Crónica' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.enfermedadRenalCronica ? 'SI' : 'NO' },

      ],
      [
        { fontSize: 8, bold: true, text: 'Enfermedad Cardiaca' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.enfermedadCardiaca ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Enfermedad Infecciosa Aguda' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.enfermedadInfecciosaAguda ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Enfermedad de Transmisión Sexual' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.enfermedadTransmisionSexual ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Enfermedad Autoinmune' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.enfermedadAntihimune ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Cirugía Ginecológica Previa' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.cirugiaGinecologicaPrevia ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Patrón Anormal de los ciclos Menstruales' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.patronAnormalCiclosMenstruales ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Diabetes preconcepcional' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.diabetesPreconcepcional ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Acretismo placentario' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.acretismoPlacentario  ? 'SI' : 'NO'},
        { fontSize: 8, bold: true, text: 'Enfermedad psiquiátrica' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.enfermedadPsiquiatrica ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Patología oncológica (2 años)' },
        { fontSize: 8,  text: prenatal.hisReproductivaAntObstetricos.patologiaOncologica  ? 'SI' : 'NO'},
        { fontSize: 8, bold: true, text: 'Patología oncológica activa o que amerite seguimiento' },
        { fontSize: 8,  text: prenatal.hisReproductivaAntObstetricos.patologiaOncologicaActiva  ? 'SI' : 'NO'},
        { fontSize: 8, bold: true, text: 'Abortadora recurrente (3 o más)' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.abortadoraRecurrente ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Óbito fetal' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.obitoFetal  ? 'SI' : 'NO'},
        { fontSize: 8, bold: true, text: 'Trastorno de la placentación' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.trastornoPlacentacion  ? 'SI' : 'NO'},
        { fontSize: 8, bold: true, text: 'Anemia Crónica' },
        { fontSize: 8, text: prenatal.hisReproductivaAntObstetricos.anemiaCronica  ? 'SI' : 'NO'},
      ],
      [
        { fontSize: 8, bold: true, text: 'Observaciones' },
        { fontSize: 8, colSpan: 5, text: prenatal.hisReproductivaAntObstetricos.observaciones },
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'GESTACIÓN ACTUAL' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Fecha ultima menstruación' },
        { fontSize: 8, text: prenatal.gestacionActual.fechaUltimaMenstruacion == null ? "" : moment(prenatal.gestacionActual.fechaUltimaMenstruacion).format('MM-DD-YYYY') },
        { fontSize: 8, bold: true, text: 'Confirmación de embarazo con examen clínico' },
        { fontSize: 8, text: prenatal.gestacionActual.confirmacionEmbarazoConExamenClinico ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Edad gestacional por fecha de ultima menstruación' },
        { fontSize: 8, text: prenatal.gestacionActual.edadGestacionalFechaUltimaMentruacion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Edad gestacional por ecografía obstétrica' },
        { fontSize: 8, text: prenatal.gestacionActual.edadGetacionalEcografiaObstetrica },
        { fontSize: 8, bold: true, text: 'Método anticonceptivo previo al embarazo' },
        { fontSize: 8, text: prenatal.gestacionActual.metodoAnticonceptivoPrevioEmbarazo == null ? "" : prenatal.gestacionActual.metodoAnticonceptivoPrevioEmbarazo.descripcion },
        { fontSize: 8, bold: true, text: 'Falló el método anticonceptivo' },
        { fontSize: 8, text: prenatal.gestacionActual.falloEnMetodoAnticonceptivo ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Embarazo planeado y/o programado' },
        { fontSize: 8, text: prenatal.gestacionActual.embarazoPlaneado ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Periodo intergenésico menor a 12 Meses' },
        { fontSize: 8, text: prenatal.gestacionActual.periodoIntergenesicoMenor12Meses ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Grupo sanguíneo' },
        { fontSize: 8, text: prenatal.gestacionActual.grupoSanguineo }
      ],
      [
        { fontSize: 8, bold: true, text: 'RH' },
        { fontSize: 8, text: prenatal.gestacionActual.rh },
        { fontSize: 8, bold: true, text: 'Aplicación de la vacuna contra el tétano antes del embarazo' },
        { fontSize: 8, text: prenatal.gestacionActual.apliVacunaTetanoAntesEmbarazo ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Presenta o ha presentado vomito' },
        { fontSize: 8, text: prenatal.gestacionActual.presentaVomito ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Gestante fumadora' },
        { fontSize: 8, text: prenatal.gestacionActual.gestanteFumadora },
        { fontSize: 8, bold: true, text: 'Cantidad Cigarrillos' },
        { fontSize: 8, text: prenatal.gestacionActual.cantidadCigarrillo },
        { fontSize: 8, bold: true, text: 'Consumo de spa-alcoholismo (consumo activo o en el último año)' },
        { fontSize: 8, text: prenatal.gestacionActual.gestanteConsumeAlcohol ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Gestante consume drogas' },
        { fontSize: 8, text: prenatal.gestacionActual.gestanteConsumeDrogas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Cesárea previa' },
        { fontSize: 8, text: prenatal.gestacionActual.cesariaPrevia ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Hemorragia menor a 20 semanas' },
        { fontSize: 8, text: prenatal.gestacionActual.hemorragiaMenor20Semanas ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Hemorragia mayor a 20 semanas' },
        { fontSize: 8, text: prenatal.gestacionActual.hemorragiaMayor20Semanas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Anemia' },
        { fontSize: 8, text: prenatal.gestacionActual.anemia ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Presenta o ha presentado sangrado' },
        { fontSize: 8, text: prenatal.gestacionActual.presentaSangrado ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Sintomatología infecciosa urinaria o cérvico vaginal' },
        { fontSize: 8, text: prenatal.gestacionActual.sintomatologiaInfecciosaUrinariaVaginal ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Cefaleas persistentes' },
        { fontSize: 8, text: prenatal.gestacionActual.cefaleasPersisten ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Edemas progresivos' },
        { fontSize: 8, text: prenatal.gestacionActual.edemasProgresivos ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Ruptura prematura de membranas' },
        { fontSize: 8, text: prenatal.gestacionActual.ropturaPrematuraMenbrana ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Polihidramnios' },
        { fontSize: 8, text: prenatal.gestacionActual.polihidramnios ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Crecimiento intrauterino retardado o restringido' },
        { fontSize: 8, text: prenatal.gestacionActual.crecimientoIntrauterinoRetardadoRestringido ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Incompatibilidad RH' },
        { fontSize: 8, text: prenatal.gestacionActual.incompatibilidadRH ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Edad menor o igual a 16 años' },
        { fontSize: 8, text: prenatal.gestacionActual.edadMenorIguala16 ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Edad mayor o igual a 40 años' },
        { fontSize: 8, text: prenatal.gestacionActual.edadMayorIguala40 ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Desnutrición materna (imc < 16)' },
        { fontSize: 8, text: prenatal.gestacionActual.desnutricionMaterna ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Paciente con técnica de reproducción asistida' },
        { fontSize: 8, text: prenatal.gestacionActual.tecnicaReproduccionAsistida ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Alteración del crecimiento fetal (rciu-fpeg)' },
        { fontSize: 8, text: prenatal.gestacionActual.alteracionCrecimientoFetal ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'SEGUIMIENTO Y MONITOREO AL PROGRAMA PRENATAL MADRE' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Fecha de la consulta' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.fechaConsulta == null ? "" : moment(prenatal.monitoreoProgramaPrenatalMadre.fechaConsulta).format('MM-DD-YYYY') },
        { fontSize: 8, bold: true, text: 'Semanas de gestación' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.semanasGestacion },
        { fontSize: 8, bold: true, text: 'Peso (Kg)' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.pesoEnKg }
      ],
      [
        { fontSize: 8, bold: true, text: 'Talla (Cm)' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.tallaEnCm },
        { fontSize: 8, bold: true, text: 'Índice de Masa Corporal' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.indiceMasaCorporal },
        { fontSize: 8, bold: true, text: 'Clasificación IMC/EG' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.clasificacionIMCEG }
      ],
      [
        { fontSize: 8, bold: true, text: 'Frecuencia Cardiaca' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.frecuenciaCardiaca },
        { fontSize: 8, bold: true, text: 'Frecuencia Respiratoria' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.frecuenciaRespiratoria },
        { fontSize: 8, bold: true, text: 'Pliegue Cutáneo del Tríceps' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.pliegueCutaneoDelTriceps },
      ],
      [
        { fontSize: 8, bold: true, text: 'Perímetro Braquial (mm)' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.perimetroBraquial },
        { fontSize: 8, bold: true, text: 'Examen de Mamas' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.examenDeMamas },
        { fontSize: 8, bold: true, text: 'Clasificación Edemas' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.clasificacionEdemas },
      ],
      [
        { fontSize: 8, bold: true, text: 'HTA Inducida por el Embarazo' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.hTAinducidaPorEmbarazo ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Diabetes Gestacional' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.diabetesGestacional ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Sangrado Vaginal' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.sangradoVaginal ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Contracciones Uterinas' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.contraccionesUterinas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Embarazo Múltiple' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.embarazoMultiple ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Fiebre' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.fiebre ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Prurito Palmo-Plantar' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.pruritoPalmoPlantar ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Pérdida de líquido amniótico' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.perdidaLiquidoAmniotico ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Infección de vías urinarias con 3 o más episodios durante la gestación' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.infeccionViasUrinarios ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Tensión Emocional' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.tensionEmocional ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Humor Depresivo' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.humorDepresivo ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Síntomas Neurovegetativos' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.sintomasNeurovegetativos ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Soporte Familiar' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.soporteFamiliar ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Vacuna DPT' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.vacunaDPT ? 'SUMINISTRADA' : 'NO SUMINISTRADA' },
        { fontSize: 8, bold: true, text: 'Fecha Vacuna DPT' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.fechaVacunaDPT == null ? '' : moment(prenatal.monitoreoProgramaPrenatalMadre.fechaVacunaDPT).format("DD-MM-YYYY") },
      ],
      [
        { fontSize: 8, bold: true, text: 'Vacuna Influenza' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.vacunaInfluenza ? 'SUMINISTRADA' : 'NO SUMINISTRADA' },
        { fontSize: 8, bold: true, text: 'Fecha Vacuna Influenza' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.fechaVacunaInfluenza == null ? '' : moment(prenatal.monitoreoProgramaPrenatalMadre.fechaVacunaInfluenza).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Hipertensión Arterial' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.hipertensionArterial ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Isoinmunización' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.isoinmunizacion ? 'SI' : 'NO'},
        { fontSize: 8, bold: true, text: 'Toxoplasmosis confirmada' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.toxoplasmaConfirmada ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Enfermedad de chagas confirmada' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalMadre.enfermedadChagasConfirmada ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'SEGUIMIENTO Y MONITOREO AL PROGRAMA PRENATAL FETO' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Altura Uterina' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.alturaUterina == null ? prenatal.monitoreoProgramaPrenatalFeto.altura_Uterina : prenatal.monitoreoProgramaPrenatalFeto.alturaUterina },
        { fontSize: 8, bold: true, text: 'Frecuencia Cardiaca fetal' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.frecuenciaCardiacaFetal },
        { fontSize: 8, bold: true, text: 'Monitoreo Fetal' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.monitoreoFetal }
      ],
      [
        { fontSize: 8, bold: true, text: 'Movimientos Fetales' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.movimientosFetales ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Presentación Fetal' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.preesentacionFetal == null ? "" : prenatal.monitoreoProgramaPrenatalFeto.preesentacionFetal.descripcion },
        { fontSize: 8, bold: true, text: 'Localización de la Placenta' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.localizacionPlacenta }
      ],
      [
        { fontSize: 8, bold: true, text: 'Número de Fetos' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.numeroFetos },
        { fontSize: 8, bold: true, text: 'Perdida de Líquido Amniótico' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.perdidaLiquidoAmniotico ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Amenaza de Parto Prematuro' },
        { fontSize: 8, text: prenatal.monitoreoProgramaPrenatalFeto.amenazaPartoPrematuro ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'OTRAS PATOLOGÍAS RELACIONADAS AL INGRESO DEL PROGRAMA' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'EPOC' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.enfermedadCardioPulmonarEpoc ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Artritis Reumatoide' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.artritisReumatoide ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Tiroides Alterada' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.tiroidesAlterada ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Obesidad' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.obesidad ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Enfermedad crónica descompensada' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.enfermedadCronica ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Enfermedades autoinmunes' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.enfermedadAutoimune ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Patología trombótica y/o trombofilia' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.patoligaTrombotica ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Obesidad grado 3 (IMC > 40)' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.obesidadGrado3 ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Diabetes gestacional descompensada' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.diabetesGestacional ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Preeclampsia actual' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.preeclampsiaActual ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Antecedente de preeclampsia severa temprana (Menos a 32 semanas)' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.antecedentesPreeclampsiaSevera ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Incompetencia cervical' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.incompetenciaCervical ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Perdida gestacional recurrente (3 perdidas o más)' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.perdidaGestacionalRecurrente ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Gestación gemelar monocorial o múltiple' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.gestacionGemelar ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Isoinmunización' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.isoinmunizacion ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Infección fetal' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.infeccionFetal ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Trastorno del líquido amniótico' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.transtornoLiquidoAmniotico ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Retardo en el crecimiento intrauterino' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.retardoCrecimientoIntrauterino ? 'SI' : 'NO' },
      ],
      [
        { fontSize: 8, bold: true, text: 'Epilepsia no controlada o con episodio convulsivos en el último año' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.epilesiaNoControlada ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Trombosis' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.trombosis ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Post Egreso hospitalario por COVID ' },
        { fontSize: 8, text: prenatal.otrasPatologiasRelacionadas.postEgresoHospitalarioCovid ? 'SI' : 'NO' },
      ]
    );

    if (prenatal.riesgoPsicosocial != null) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'RIESGO PSICOSOCIAL' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: 'Ansiedad Severa' },
          { fontSize: 8, text: prenatal.riesgoPsicosocial.ansiedadSevera ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: 'Soporte Social Familiar Inadecuado' },
          { fontSize: 8, text: prenatal.riesgoPsicosocial.soporteFamiliarInadecuado ? 'SI' : 'NO' },
          {},
          {}
        ])

    }

    if (prenatal.riesgoViolencia != null) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'RIESGO DE VIOLENCIA' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'DURANTE EL ÚLTIMO AÑO, ¿ha sido humillada, menospreciada, insultada o amenazada por su pareja?' },
          {},
          { fontSize: 8, text: prenatal.riesgoViolencia.ultimoAnioInsultoVerbal ? 'SI' : 'NO' },
          { fontSize: 8, colSpan: 2, bold: true, text: 'DURANTE EL ÚLTIMO AÑO, ¿fue golpeada, bofeteada, pateada, o lastimada físicamente de otra manera?' },
          {},
          { fontSize: 8, text: prenatal.riesgoViolencia.ultimoAnioMaltratoFisico ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'DESDE QUE ESTÁ EN GESTACIÓN, ¿ha sido golpeada, bofeteada, pateada, o lastimada físicamente de alguna manera?' },
          {},
          { fontSize: 8, text: prenatal.riesgoViolencia.gestacionMaltratoFisico ? 'SI' : 'NO' },
          { fontSize: 8, colSpan: 2, bold: true, text: 'DURANTE EL ÚLTIMO AÑO, ¿fue forzada a tener relaciones sexuales?' },
          {},
          { fontSize: 8, text: prenatal.riesgoViolencia.forzadaSexualmente ? 'SI' : 'NO' },
        ])
    }

    if (prenatal.riesgoDepresion != null) {

      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'RIESGO DE DEPRESIÓN' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'Durante el último mes, ¿Se ha preocupado porque con frecuencia se sentía triste, deprimida o sin esperanza?' },
          {},
          { fontSize: 8, text: prenatal.riesgoDepresion.ultimoMesTriste ? 'SI' : 'NO' },
          { fontSize: 8, colSpan: 2, bold: true, text: 'Durante el último mes, ¿Se ha preocupado porque con frecuencia sentía poco interés por realizar actividades y además no sentia que le proporcionaran placer?' },
          {},
          { fontSize: 8, text: prenatal.riesgoDepresion.ultimoMesPocoInteres ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: '¿Siente que necesita ayuda?' },
          {},
          { fontSize: 8, colSpan: 4, text: prenatal.riesgoDepresion.sienteNecesitaAyuda ? 'SI' : 'NO' },
          {},
          {},
          {},
        ])
    }
    if (prenatal.tamizajeCuagulopatias != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'TAMIZAJE CUAGULOPATIAS' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'Ha tenido sangrado menstrual abundante desde la menarquia' },
          {},
          { fontSize: 8, text: prenatal.tamizajeCuagulopatias.sangradoMenstrual ? 'SI' : 'NO' },
          { fontSize: 8, colSpan: 2, bold: true, text: 'Ha tenido algún episodio de sangrado abundante en post parto, procedimiento quirúrgico o dental?' },
          {},
          { fontSize: 8, text: prenatal.tamizajeCuagulopatias.sangradoPostParto ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'Ha tenido dos o más episodios de equimosis una o dos al mes, sangrado frecuente en las encías, antecedentes familiares de hemorragias?' },
          {},
          { fontSize: 8, colSpan: 4, text: prenatal.tamizajeCuagulopatias.sangradoEnciaHemorragias ? 'SI' : 'NO' },
          {},
          {},
          {},
        ])
    }

    if (prenatal.tamizajeChanga != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'TAMIZAJE DE CHAGAS' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'En que sitios de Colombia ha vivido o en qué paises:' },
          {},
          { fontSize: 8, text: prenatal.tamizajeChanga.sitioColombia },
          { fontSize: 8, colSpan: 2, bold: true, text: 'Antecedente de enfermedad de Changas:' },
          {},
          { fontSize: 8, text: prenatal.tamizajeChanga.antecedentesEnfChangas ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'Transfuciones sanguineas antes de 1995' },
          {},
          { fontSize: 8, text: prenatal.tamizajeChanga.transfucionesAntes ? 'SI' : 'NO' },
          {},
          {},
          {},
        ]);
    }

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'CLASIFICAIÓN DEL RIESGO AL FINALIZAR LA CONSULTA' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Puntaje de Riesgo Obstétrico' },
        { fontSize: 8, text: prenatal.clasificacionAlFinalizarConsulta.puntajeRiesgoObstetrico },
        { fontSize: 8, bold: true, text: 'Clasificación del Riesgo' },
        { fontSize: 8, text: prenatal.clasificacionAlFinalizarConsulta.clasificacionRiesgo },
        { fontSize: 8, bold: true, text: 'Observación' },
        { fontSize: 8, text: prenatal.clasificacionAlFinalizarConsulta.observacion }
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'ANÁLISIS COMENTARIOS Y RECOMENTADICONES DE SEGUIMIENTO' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Observaciones' },
        { fontSize: 8, colSpan: 5, text: prenatal.comentariosRecomendacionesSeguimiento.observacion },
        {},
        {},
        {},
        {},
      ],
    );

    if (prenatal.gestacionActual.edadGestacionalFechaUltimaMentruacion > 1) {
      body = this.resultadoPrograma(body, prenatal.examenesDeIngresoPrimerTrimestre, 'EXAMEN DE RIESGO AL PROGRAMA I TRIMESTRE');
    }
    if (prenatal.gestacionActual.edadGestacionalFechaUltimaMentruacion > 12) {
      body = this.resultadoPrograma(body, prenatal.examenesDeIngresoSegundoTrimestre, 'EXAMEN DE RIESGO AL PROGRAMA II TRIMESTRE');
    }
    if (prenatal.gestacionActual.edadGestacionalFechaUltimaMentruacion > 24) {
      body = this.resultadoPrograma(body, prenatal.examenesDeIngresoTercerTrimestre, 'EXAMEN DE RIESGO AL PROGRAMA III TRIMESTRE');
    }

    /*  graficas.forEach(item => {
       body.push(
         [
           {
             stack: [
               {
                 image: item,
                 alignment: 'center',
                 width: 400,
                 height: 250,
               }
             ],
             colSpan: 6
           },
           {},
           {},
           {},
           {},
           {}
         ]);
 
     }); */

    return body;
  }

  resultadoPrograma(body, resultado, titulo) {
    body.push([
      { fontSize: 8, bold: true, colSpan: 6, text: titulo },
      {},
      {},
      {},
      {},
      {}
    ]);

    if (resultado.resultadoHemograma != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado hemograma' }, {},
        { fontSize: 8, text: resultado.resultadoHemograma },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: resultado.fechaResultadoHemograma == null ? "" : moment(resultado.fechaResultadoHemograma).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoHematocrito != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado hematocrito' }, {},
        { fontSize: 8, text: resultado.resultadoHematocrito },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoHematocrito == null ? "" : moment(resultado.fechaResultadoHematocrito).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoVDRL != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado VDRL' }, {},
        { fontSize: 8, text: resultado.resultadoVDRL == 'POSITIVO' ? resultado.resultadoVDRL + " | Dato: " + resultado.resultadoDatoVDRL : resultado.resultadoVDRL },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoVDRL == null ? "" : moment(resultado.fechaResultadoVDRL).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoPruebaRapidaVDRL != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado prueba rápida VDRL' }, {},
        { fontSize: 8, text: resultado.resultadoPruebaRapidaVDRL == 'POSITIVO' ? resultado.resultadoPruebaRapidaVDRL + " | Dato: " + resultado.resultadoPruebaRapidaDatoVDRL : resultado.resultadoPruebaRapidaVDRL },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoPruebaRapidaVDRL == null ? "" : moment(resultado.fechaResultadoPruebaRapidaVDRL).format("DD-MM-YYYY") }
      ]);
    }
    /*  if (resultado.resultadoParcialOrina != null) {
       body.push([
         { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado parcial orina' }, {},
         { fontSize: 8, text: resultado.resultadoParcialOrina },
         { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
         { fontSize: 8, text: resultado.fechaResultadoParcialOrina == null ? "" : moment(resultado.fechaResultadoParcialOrina).format("DD-MM-YYYY") }
       ]);
     } */

    if (resultado.resultadoPruebaHBsAG != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado prueba HBsAg' }, {},
        { fontSize: 8, text: resultado.resultadoPruebaHBsAG },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoPruebaHBsAG == null ? "" : moment(resultado.fechaResultadoPruebaHBsAG).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoToxoplasmaIgG != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado toxoplasma IgG' }, {},
        { fontSize: 8, text: resultado.resultadoToxoplasmaIgG },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoToxoplasmaIgG == null ? "" : moment(resultado.fechaResultadoToxoplasmaIgG).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoCoombsIndirecto != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado coombs indirecto' }, {},
        { fontSize: 8, text: resultado.resultadoCoombsIndirecto },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoCoombsIndirecto == null ? "" : moment(resultado.fechaResultadoCoombsIndirecto).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoCitologia != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado citología' }, {},
        { fontSize: 8, text: resultado.resultadoCitologia },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoCitologia == null ? "" : moment(resultado.fechaResultadoCitologia).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoEcoObstetrica != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado Eco-Obstétrica' }, {},
        { fontSize: 8, text: resultado.resultadoEcoObstetrica },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoEcoObstetrica == null ? "" : moment(resultado.fechaResultadoEcoObstetrica).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoGlicemia > 0) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado glicemia' }, {},
        { fontSize: 8, text: resultado.resultadoGlicemia },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoGlicemia == null ? "" : moment(resultado.fechaResultadoGlicemia).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoHemoglobina != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado hemoglobina' }, {},
        { fontSize: 8, text: resultado.resultadoHemoglobina },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoHemoglobina == null ? "" : moment(resultado.fechaResultadoHemoglobina).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoVIH != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado VIH' }, {},
        { fontSize: 8, text: resultado.resultadoVIH },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoVIH == null ? "" : moment(resultado.fechaResultadoVIH).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoPruebaRapidaVDRL != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado prueba rápida VIH' }, {},
        { fontSize: 8, text: resultado.resultadoPruebaRapidaVDRL },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoPruebaRapidaVDRL == null ? "" : moment(resultado.fechaResultadoPruebaRapidaVDRL).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoUrocultivo != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado urocultivo' }, {},
        { fontSize: 8, text: resultado.resultadoUrocultivo == 'POSITIVO' ? resultado.resultadoUrocultivo + " | Dato: " + resultado.resultadoDatoUrocultivo : resultado.resultadoUrocultivo },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoUrocultivo == null ? "" : moment(resultado.fechaResultadoUrocultivo).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoTestOSullivan != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado test de O\'Sullivan' }, {},
        { fontSize: 8, text: resultado.resultadoTestOSullivan },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoTestOSullivan == null ? "" : moment(resultado.fechaResultadoTestOSullivan).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoToxoplasmaIgM != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado toxoplasma IgM' }, {},
        { fontSize: 8, text: resultado.resultadoToxoplasmaIgM },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoToxoplasmaIgM == null ? "" : moment(resultado.fechaResultadoToxoplasmaIgM).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoCurvaToleranciaGlucosa != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado tolerancia a la glucosa' }, {},
        { fontSize: 8, text: resultado.resultadoCurvaToleranciaGlucosa },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoCurvaToleranciaGlucosa == null ? "" : moment(resultado.fechaResultadoCurvaToleranciaGlucosa).format("DD-MM-YYYY") }
      ]);
    }
    if (resultado.resultadoFrotisVaginal != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado frotis vaginal' }, {},
        { fontSize: 8, text: resultado.resultadoFrotisVaginal },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoFrotisVaginal == null ? "" : moment(resultado.fechaResultadoFrotisVaginal).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoOtraEcografia != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado otra ecografía' }, {},
        { fontSize: 8, text: resultado.resultadoOtraEcografia },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoOtraEcografia == null ? "" : moment(resultado.fechaResultadoOtraEcografia).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoGlucosa != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado Glucosa' }, {},
        { fontSize: 8, text: resultado.resultadoGlucosa },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoGlucosa == null ? "" : moment(resultado.fechaResultadoGlucosa).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoGlucosaPost != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado Glucosa POST' }, {},
        { fontSize: 8, text: resultado.resultadoGlucosaPost },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoGlucosaPost == null ? "" : moment(resultado.fechaResultadoGlucosaPost).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoGlucosaPre != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado Glucosa PRE' }, {},
        { fontSize: 8, text: resultado.resultadoGlucosaPre },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoGlucosaPre == null ? "" : moment(resultado.fechaResultadoGlucosaPre).format("DD-MM-YYYY") }
      ]);
    }

    if (resultado.resultadoDatoCultivoVaginoRectal != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Resultado Vagino-Rectal' }, {},
        { fontSize: 8, text: resultado.resultadoDatoCultivoVaginoRectal },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado ' }, {},
        { fontSize: 8, text: resultado.fechaResultadoDatoCultivoVaginoRectal == null ? "" : moment(resultado.fechaResultadoDatoCultivoVaginoRectal).format("DD-MM-YYYY") }
      ]);
    }

    body.push(
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'Se realiza Pre-Test VIH' }, {},
        { fontSize: 8, text: resultado.preTestVIH ? 'SI' : 'NO' },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Se Realiza Post-Test VIH' }, {},
        { fontSize: 8, text: resultado.postTestVIH ? 'SI' : 'NO' },

      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'Firma consentimiento informado' }, {},
        { fontSize: 8, text: resultado.firmaConsentimientoInformadoPRE ? 'SI' : 'NO' },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Firma consentimiento informado' }, {},
        { fontSize: 8, text: resultado.firmaConsentimientoInformadoPost ? 'SI' : 'NO' },

      ]);


    return body;
  }

}
