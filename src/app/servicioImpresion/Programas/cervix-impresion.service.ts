import { Injectable } from '@angular/core';
import { CervixService } from '../../cervix/cervix.service';
import * as moment from 'moment';
import { Cervix } from 'src/app/Modelos/Cervix';

@Injectable({
  providedIn: 'root'
})
export class CervixImpresionService {

  constructor(
    private cervix: CervixService
  ) { }

  public impresionPrograma(esPYP, cervix: Cervix) {

    try {
      if (esPYP) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(cervix)
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

  body(cervix: Cervix) {
    
    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, colSpan: 6,fillColor: '#e8e6e6', alignment: 'center', text: 'PROGRAMA CERVIX', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);
    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'DATOS DE INGRESO' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Ha tenido ETS:' },
        { fontSize: 8, text: cervix.ets ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Fecha de toma:' },
        { fontSize: 8, text: cervix.fechaToma == null ? '' : moment(cervix.fechaToma).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Fecha de ultima mestruación:' },
        { fontSize: 8, text: cervix.ultimaMestruacion == null ? '' : moment(cervix.ultimaMestruacion).format("DD-MM-YYYY") }
      ],
      [
        { fontSize: 8, bold: true, text: 'Presenta Dispareunia:' },
        { fontSize: 8, text: cervix.presentaDispareunia ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Presencia de Flujo Vaginal:' },
        { fontSize: 8, text: cervix.presenciaFlujoVaginal ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Método de planificación Actual:' },
        { fontSize: 8, text: cervix.metodoPlanificacionActual == null ? "" : cervix.metodoPlanificacionActual.descripcion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Embarazo actual:' },
        { fontSize: 8, text: cervix.embarazoActual ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Procedimientos anteriores en el cuello uterino:' },
        { fontSize: 8, text: cervix.procedimientoCuelloUterino == null ? "" : cervix.procedimientoCuelloUterino.descripcion },
        { fontSize: 8, bold: true, text: 'Tiene una citologia anterior:' },
        { fontSize: 8, text: cervix.citologiaAnterior ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Ultima Citología:' },
        { fontSize: 8, text: cervix.ultimaCitologia },
        { fontSize: 8, bold: true, text: 'Número de compañeros sexuales:' },
        { fontSize: 8, text: cervix.numeroCompanerosSexuales },
        { fontSize: 8, bold: true, text: 'Presenta Dolor pélvico:' },
        { fontSize: 8, text: cervix.presentaDolorPelvico ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Caracteristica del Flujo:' },
        { fontSize: 8, text: cervix.catacteristicaFlujo == null ? "" : cervix.catacteristicaFlujo.descripcion },
        { fontSize: 8, bold: true, text: 'Menopausia:' },
        { fontSize: 8, text: cervix.menopausia ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Aspecto del cuello uterino:' },
        { fontSize: 8, text: cervix.aspectoCuelloUterino == null ? "" : cervix.aspectoCuelloUterino.descripcion }
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'DATOS DE LA TOMA DE LA CITOLOGIA' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Resultado de citología anterior:' },
        { fontSize: 8, text: cervix.datosTomaCitologia.resultadoCitologiAnterior },
        { fontSize: 8, bold: true, text: 'Medio con que se toma la muestra:' },
        { fontSize: 8, text: cervix.datosTomaCitologia.medioTomaMuestra == null ? "" : cervix.datosTomaCitologia.medioTomaMuestra.descripcion },
        { fontSize: 8, bold: true, text: 'Número de Placa:' },
        { fontSize: 8, text: cervix.datosTomaCitologia.numeroPlaca }
      ],
      [
        { fontSize: 8, bold: true, text: 'Estado de Vacunacion VPH:' },
        { fontSize: 8, text: cervix.datosTomaCitologia.estadoVacunacionVPH == null ? "" : cervix.datosTomaCitologia.estadoVacunacionVPH.descripcion },
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf',text: 'RESULTADO DE LA CITOLOGIA' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Fecha del resultado:' },
        { fontSize: 8, text: cervix.resultadoCitologia.fechaResultado == null ? '' : moment(cervix.resultadoCitologia.fechaResultado).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Calidad de la muestra:' },
        { fontSize: 8, text: cervix.resultadoCitologia.calidadMuestra == null ? "" : cervix.resultadoCitologia.calidadMuestra.descripcion },
        { fontSize: 8, bold: true, text: 'Clasificación de la muestra:' },
        { fontSize: 8, text: cervix.resultadoCitologia.clasificacionMuestra == null ? "" : cervix.resultadoCitologia.clasificacionMuestra.descripcion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Anormalidad de células escamosas:' },
        { fontSize: 8, text: cervix.resultadoCitologia.anormalidadCelulasEscamosas == null ? "" : cervix.resultadoCitologia.anormalidadCelulasEscamosas.descripcion },
        { fontSize: 8, bold: true, text: 'Anormalidad de células glandulares sin especificar (AGC-NOS):' },
        { fontSize: 8, text: cervix.resultadoCitologia.anormalidadCelulasGlandularesSinEspecificar == null ? "" : cervix.resultadoCitologia.anormalidadCelulasGlandularesSinEspecificar.descripcion },
        { fontSize: 8, bold: true, text: 'Anormalidad de células glandulares especificas (Atípicas):' },
        { fontSize: 8, text: cervix.resultadoCitologia.anormalidadCelulasGlandularesEspecificadas == null ? "" : cervix.resultadoCitologia.anormalidadCelulasGlandularesEspecificadas.descripcion }
      ],

      [
        { fontSize: 8, bold: true, text: 'Microrganismos:' },
        { fontSize: 8, text: cervix.resultadoCitologia.microorganismos == null ? "" : cervix.resultadoCitologia.microorganismos.descripcion },
        { fontSize: 8, bold: true, text: 'Otros Hallazgos no neoplasicos:' },
        { fontSize: 8, text: cervix.resultadoCitologia.otrosHallazgosNoNeoplasicos == null ? "" : cervix.resultadoCitologia.otrosHallazgosNoNeoplasicos.descripcion },
        { fontSize: 8, bold: true, text: 'Requiere Colposcopia:' },
        { fontSize: 8, text: cervix.resultadoCitologia.requiereColposcopia ? "SI" : "NO" },

      ],

      [
        { fontSize: 8, bold: true, text: 'Fecha Colposcopia:' },
        { fontSize: 8, text: cervix.resultadoCitologia.fechaColposcopia == null ? '' : moment(cervix.resultadoCitologia.fechaColposcopia).format("DD-MM-YYYY") },
        { fontSize: 8, bold: true, text: 'Requiere Biopsia:' },
        { fontSize: 8, text: cervix.resultadoCitologia.requiereBiopsia ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Fecha Biopsia:' },
        { fontSize: 8, text: cervix.resultadoCitologia.fechaBiopsia == null ? '' : moment(cervix.resultadoCitologia.fechaBiopsia).format("DD-MM-YYYY") },

      ],
      [
        { fontSize: 8, bold: true, text: 'Requiere Consulta con Ginecólogo:' },
        { fontSize: 8, text: cervix.resultadoCitologia.requiereConsultaGinecologo ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Tratamiento Ginecólogo:' },
        { fontSize: 8, text: cervix.resultadoCitologia.tratamientoGinecologo == null ? "" : cervix.resultadoCitologia.tratamientoGinecologo },
        { fontSize: 8, bold: true, text: 'Continua en esquema:' },
        { fontSize: 8, text: cervix.resultadoCitologia.continuaEsquema == null ? "" : cervix.resultadoCitologia.continuaEsquema },
      ],
      [
        { fontSize: 8, bold: true, text: 'Finalización de tratamiento:' },
        { fontSize: 8, text: cervix.resultadoCitologia.finalizacionTratamiento ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Lector de resultados:' },
        { fontSize: 8, text: cervix.resultadoCitologia.lectorResultados },
        {},
        {},
      ],
      [
        { fontSize: 8, bold: true, text: 'observaciones:' },
        { fontSize: 8, colSpan: 5, text: cervix.resultadoCitologia.observaciones == null ? "" : cervix.resultadoCitologia.observaciones },
        {},
        {},
        {},
        {}
      ],
    );


    /*   [
      { fontSize: 8, bold: true, text: '' },
      { fontSize: 8, text: cervix. },
      { fontSize: 8, bold: true, text: '' },
      { fontSize: 8, text: cervix. },
      { fontSize: 8, bold: true, text: '' },
      { fontSize: 8, text: cervix. }
    ],*/

    return body;
  }

}
