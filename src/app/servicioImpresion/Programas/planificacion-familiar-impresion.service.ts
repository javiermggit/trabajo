import { Injectable } from '@angular/core';
//import { PlanificacionFamiliarService } from 'src/app/planificacion-familiar/planificacion-familiar.service';
import * as moment from 'moment';
import { ControlPlanificacionFamiliar, PlanificacionFamiliar } from 'src/app/Modelos/Modelos';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionFamiliarImpresionService {


  constructor() { }

  impresionPrograma(esPYP, ingresoPlanificacionReimp: PlanificacionFamiliar, ControlPlanificacionFamiliarReimp: ControlPlanificacionFamiliar) {
    try {
      if (esPYP) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(ingresoPlanificacionReimp, ControlPlanificacionFamiliarReimp)
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
  body(ingresoPlanificacionReimp: PlanificacionFamiliar, ControlPlanificacionFamiliarReimp: ControlPlanificacionFamiliar) {
    
    var body = [];
    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center', text: 'PROGRAMA PLANIFICACION FAMILIAR', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'DATOS DE INGRESO AL PROGRAMA PLANIFICACIÓN FAMILIAR' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Flujo patológico vaginal:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.flujoPatologicoVaginal },
        { fontSize: 8, bold: true, text: 'Edad inicio Relaciones sexuales' },
        { fontSize: 8, text: ingresoPlanificacionReimp.edadInicioRelacionSexual },
        { fontSize: 8, bold: true, text: 'Ha presentado ITS:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.iTS ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Relaciones sexuales con:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.relacionesSexualesCon },
        { fontSize: 8, bold: true, text: 'Ha presentado embarazos:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.embarazos ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Uso habitual de condón en las relaciones sexuales:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.usoHabitualCondon ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Ha presentado abortos:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.abortos ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Uso actual de Método Anticonceptivo:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.usoActualAnticonceptivo ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Intención o conducta sexual:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.conductaSexual }
      ],
      [
        { fontSize: 8, bold: true, text: 'Presencia de várices:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.varices ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Cefalea Permanente:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.cefalePermanente ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Vacunación DPT:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.vacunacionDPT ? "SI" : "NO" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Vacunación VPH:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.vacunacionVPH ? "SI" : "NO" },
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'SELECCIÓN DE MÉTODO ANTICONCEPTIVO Y SEGUIMIENTO DEL PROGRAMA DE PLANIFICACIÓN FAMILIAR' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Fuma cigarrillos:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.fumaCigarrillos ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: '¿Toma medicamentos para convulsiones?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.medicamentoConvulsiones ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Sufre de hipertensión arterial?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.hipertension ? "SI" : "NO" }
      ],

      [
        { fontSize: 8, bold: true, text: '¿Toma rifampicina o griseofulvina?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.rifampicinaFriseofulvina ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Amamanta a un bebé menor de 6 meses?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.amamantabebe6meses ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: '¿Cree estar embarazada?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.creeembarazadaActualmente ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Tiene una hemorragia vaginal inusual ?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.hemorragiaVaginalInusual ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: '¿Ha tenido problemas serios con sus vasos sanguíneos o con su corazón?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.problemasCorazon ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: '¿Tiene enfermedad vesicular? ¿Ictericia tomando ACH?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.enfermedadVesicular ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: '¿Tiene ictericia, cirrosis hepática, infección (hepatitis) o tumor de hígado?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.tumorHigado ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: '¿Tiene una cirugía planeada que la inmovilice más de una semana?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.cirugiaPlaneada ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: '¿Tiene jaqueca con visión borrosa?' },
        { fontSize: 8, text: ingresoPlanificacionReimp.jaquecaVisionBorrosa ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Tuvo un bebé en los últimos 21 días?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.bebeultimos21dias ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Desea tener hijos?:' },
        { fontSize: 8, text: ingresoPlanificacionReimp.deseaTenerHijos ? "SI" : "NO" },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'CONTROL PLANIFICACIÓN FAMILIAR' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Amenorrea' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.amenorrea ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Ciclos:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.ciclos },
        { fontSize: 8, bold: true, text: 'Manchado:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.manchado ? "SI" : "NO" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Sangrado:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.sangrado ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Cefalea-Mareo:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.cefaleaMareo ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Estado de lactancia:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.lactando ? "SI" : "NO" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Dolor Pélvico:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.dolorPelvico ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Dolor Mamario:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.dolorMamario ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Varices:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.varices ? "SI" : "NO" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Flujo Vaginal:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.flujoVaginal ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Cambios Estado de Animo:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.cambiosEstadoAnimo ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Manchas en la Piel:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.manchasPiel ? "SI" : "NO" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Anexos:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.anexos },
        { fontSize: 8, bold: true, text: 'Satisfacción Método Actual:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.metodoActual ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Examen de Mamas:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.mamas },
      ],
      [
        { fontSize: 8, bold: true, text: 'Examen de Cervix:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.cervix },
        { fontSize: 8, bold: true, text: 'Examen de Abdomen:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.abdomen },
        { fontSize: 8, bold: true, text: 'Examen de Utero:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.utero }
      ],
      [
        { fontSize: 8, bold: true, text: 'VDRL:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.vdrl ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Resultado VDRL:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.vdrlResultado },
        { fontSize: 8, bold: true, text: 'Infección por VPH :' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.vph ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Patología cervical :' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.patologiaCervical ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Interrupción Voluntaria del Embarazo (IVE):' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.ive },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Cambio Método:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.cambioMetodo ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Nuevo Opción:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.nuevoMetodo },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Comentarios:' },
        { fontSize: 8, colSpan: 5, text: ControlPlanificacionFamiliarReimp.comentarios },
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Se realizo Citología Vaginal:' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.realizoCitologiaVaginal ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Resultado Citología' },
        { fontSize: 8, text: ControlPlanificacionFamiliarReimp.resultadoCitologia },
        { fontSize: 8, bold: true, text: 'Fecha Citología:' },
        { fontSize: 8, text: moment(ControlPlanificacionFamiliarReimp.fechaCitologia).format('MM-DD-YYYY') },
      ],
      [
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 5, text: ControlPlanificacionFamiliarReimp.observaciones },
        {},
        {},
        {},
        {},
      ],
    );
    
    return body;
  }

}
