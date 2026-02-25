import { Injectable } from '@angular/core';
import moment from 'moment';
import { HabitosGestionRiesgo, ResultadoApoyoDX, ResultadoLaboratorio, ResultadoImagenologia, Profesional, RevisionSistema, ExamenFisico, VMPaciente, HCMorbilidad, Acompañante } from '../Modelos/Modelos';
import { examenPruebaRapida } from 'src/app/Modelos/Procedimiento';
import { ReimpresionService } from '../../app/mf/main/reimpresion/reimpresion.service';
@Injectable({
  providedIn: 'root'
})
export class ImpresionGeneralService {

  constructor(
    private reimpresion: ReimpresionService
  ) { }
  fechahoy = new Date().toISOString().substring(0, 10);

  datosHC(hc, cita, profesional: Profesional) {

    try {
      return {
        table: {
          widths: ['40%', '30%', '30%'],
          body: [
            [
              { fontSize: 8, colSpan: 2, bold: true, text: 'Medico que atendió' }, {},
              { fontSize: 8, bold: true, text: 'Registro Medico' },
            ],
            [
              { fontSize: 8, colSpan: 2, text: profesional.nombres + ' ' + profesional.apellidos }, {},
              { fontSize: 8, text: profesional.registroMedico == null ? " " : profesional.registroMedico },
            ],
            [
              { fontSize: 8, bold: true, text: 'Fecha apertura Historia' },
              { fontSize: 8, bold: true, text: 'Fecha cierre Historia' },
              { fontSize: 8, bold: true, text: 'Fecha impresión' },
            ],
            [
              { fontSize: 8, text: cita.horaApertura == null || cita.horaApertura == "" ? moment(hc.fechaCreacion).format("DD-MM-YYYY") : cita.horaApertura },
              { fontSize: 8, text: cita.horaCierre == null || cita.horaCierre == "" ? moment(hc.fechaCreacion).format("DD-MM-YYYY") : cita.horaCierre },
              { fontSize: 8, text: moment(this.fechahoy).format("DD-MM-YYYY") },
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  datosPaciente(du, datePipe) {
    try {
      return {
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [
            [
              { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 4, text: 'DATOS DEL PACIENTE' },
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, bold: true, colSpan: 2, text: 'Nombre: ' + du.DatosUsuario.nombre + ' ' + du.DatosUsuario.primer_Apellido + ' ' + du.DatosUsuario.segundo_Apellido },
              {},
              { fontSize: 8, bold: true, text: 'Identificación: ' + du.DatosUsuario.tipo_Identificacion + " " + du.DatosUsuario.identificacion },
              { fontSize: 8, bold: true, text: 'Fecha nacimiento: ' + datePipe.transform(du.DatosUsuario.fecha_Nacimiento, 'dd/MM/yyyy') },
            ],
            [
              { fontSize: 8, bold: true, text: 'Dirección: ' + (du.DatosUsuario.direccion == null ? "" : du.DatosUsuario.direccion) },
              { fontSize: 8, bold: true, text: 'Teléfono: ' + (du.DatosUsuario.telefono == null ? "" : du.DatosUsuario.telefono) },
              { fontSize: 8, bold: true, text: 'Celular: ' + (du.DatosUsuario.celular == null ? "" : du.DatosUsuario.celular) },
              { fontSize: 8, bold: true, text: 'Correo: ' + (du.DatosUsuario.correo == null ? "" : du.DatosUsuario.correo) },
            ],


          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  datosPacienteUni(du: VMPaciente, datePipe) {

    try {
      return {
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [
            [
              { fontSize: 8, bold: true, colSpan: 4, fillColor: '#cfcfcf', text: 'DATOS DEL PACIENTE' },
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, bold: true, colSpan: 2, text: 'Nombre: ' + du.nombre + ' ' + du.primer_Apellido + ' ' + du.segundo_Apellido },
              {},
              { fontSize: 8, bold: true, text: 'Identificación: ' + du.tipo_Identificacion + " " + du.identificacion },
              { fontSize: 8, bold: true, text: 'Fecha nacimiento: ' + datePipe.transform(du.fecha_Nacimiento, 'dd/MM/yyyy') },
            ],
            [
              { fontSize: 8, bold: true, text: 'Dirección: ' + (du.direccion == null ? "" : du.direccion) },
              { fontSize: 8, bold: true, text: 'Teléfono: ' + (du.telefono == null ? "" : du.telefono) },
              { fontSize: 8, bold: true, text: 'Celular: ' + (du.celular == null ? "" : du.celular) },
              { fontSize: 8, bold: true, text: 'Correo: ' + (du.correo == null ? "" : du.correo) },
            ],
            [
              { fontSize: 8, bold: true, text: 'Edad: ' + (du.edad == null ? "" : du.edad) },
              { fontSize: 8, bold: true, text: 'Sexo: ' + (du.sexo == null ? "" : du.sexo) },
              { fontSize: 8, bold: true, text: 'Estado Civil: ' + (du.estadoCivil == null ? "" : du.estadoCivil) },
              { fontSize: 8, bold: true, text: 'Ocupación: ' + (du.ocupacion == null ? "" : du.ocupacion) },
            ],
            [
              { fontSize: 8, colSpan: 2, bold: true, text: 'Lugar de Residencia: ' + (du.municipioResidenciad == null ? "" : du.municipioResidenciad) },
              {},
              { fontSize: 8, colSpan: 2, bold: true, text: 'Etnia: ' + (du.etnia == null ? "" : du.etnia) },
              {},
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  acompanantes(acompanante: Acompañante) {
    try {
      return {
        table: {
          widths: ['20%', '20%', '15%', '15%', '15%', '15%'],
          body: [
            [
              { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ACOMPAÑANTE DEL PACIENTE' },
              {}, {}, {}, {}, {},
            ],
            [
              { fontSize: 8, bold: true, text: 'Nombre acompañante:' },
              { fontSize: 8, text: acompanante.nombre },
              { fontSize: 8, bold: true, text: 'Teléfono:' },
              { fontSize: 8, text: acompanante.telefono },
              { fontSize: 8, bold: true, text: 'Parentesco:' },
              { fontSize: 8, text: acompanante.parentesco == null ? "" : acompanante.parentesco.descripcion },
            ],
            [
              { fontSize: 8, bold: true, text: 'Nombre Responsable:' },
              { fontSize: 8, text: acompanante.responsable },
              { fontSize: 8, bold: true, text: 'Teléfono:' },
              { fontSize: 8, text: acompanante.celular },
              { fontSize: 8, bold: true, text: 'Categoría:' },
              { fontSize: 8, text: acompanante.categoria == null ? "" : acompanante.categoria.descripcion },
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  motivoConsulta(motivo, ultimaEnfermedad) {
    try {
      return {
        table: {
          widths: ['20%', '80%'],
          body: [
            [
              { fontSize: 8, bold: true, colSpan: 2, fillColor: '#cfcfcf', text: 'MOTIVO CONSULTA' },
              {},

            ],
            [
              { fontSize: 8, bold: true, text: 'Motivo de consulta:' },
              { fontSize: 8, text: motivo },

            ],
            [
              { fontSize: 8, bold: true, text: 'Enfermedad actual:' },
              { fontSize: 8, text: ultimaEnfermedad },
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  habitosGestionRiesgo(habitos: HabitosGestionRiesgo) {
    try {
      return {
        table: {
          widths: ['35%', '15%', '35%', '15%'],
          body: [
            [
              { fontSize: 8, colSpan: 4, bold: true, fillColor: '#cfcfcf', text: 'HÁBITOS SALUDABLES' },
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, text: 'Hábitos Saludables:' },
              { fontSize: 8, text: habitos.observacionHabitosSaludables },
              { fontSize: 8, text: 'Consumo de alimentos Ricos en fibra:' },
              { fontSize: 8, text: habitos.consumoAlimentosRicosFibra ? "SI" : "NO" },
            ],
            [
              { fontSize: 8, text: 'Bajo consumo de sal:' },
              { fontSize: 8, text: habitos.bajoConsumoSal ? "SI" : "NO" },
              { fontSize: 8, text: 'Peso adecuado para la talla:' },
              { fontSize: 8, text: habitos.pesoAdecuadoTalla ? "SI" : "NO" },
            ],
            [
              { fontSize: 8, text: 'Toma medicamentos antihipertensivos:' },
              { fontSize: 8, text: habitos.medicamentoAntiHipertensivos ? "SI" : "NO" },
              { fontSize: 8, text: 'Toma de agua' },
              { fontSize: 8, text: habitos.tomaAgua ? "SI" : "NO" },
            ],
            [
              { fontSize: 8, text: 'Realiza mínimo 30(min) de actividad física durante el día:' },
              { fontSize: 8, text: habitos.ejercicioPermanente ? "SI" : "NO" },
              { fontSize: 8, text: '¿Consume vegetales o frutas diariamente?:' },
              { fontSize: 8, text: habitos.buenosHabitosAalimenticios ? "SI" : "NO" },
            ],
            [
              { fontSize: 8, text: 'Bajo Consumo de grasas:' },
              { fontSize: 8, text: habitos.bajoConsumoGrasas ? "SI" : "NO" },
              { fontSize: 8, text: 'Horas de sueño adecuadas (8H):' },
              { fontSize: 8, text: habitos.horasSuenoAdecuadas ? "SI" : "NO" },
            ],
            [
              { fontSize: 8, text: 'Ha tenido eventos de azúcar alta sangre? (hiperglucemia):' },
              { fontSize: 8, text: habitos.azucarAlta ? "SI" : "NO" },
              {},
              {},
            ],
            [
              { fontSize: 8, colSpan: 4, bold: true, fillColor: '#cfcfcf', text: 'HÁBITOS NO SALUDABLES' },
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, text: 'Sustancias Psicoactivas:' },
              { fontSize: 8, text: habitos.sustanciasPsicoactivas ? "SI" : "NO" },
              { fontSize: 8, colSpan: 2, text: habitos.observacionSustanciasPsicoactivas },
              {},
            ], [
              { fontSize: 8, text: 'Alcohol:' },
              { fontSize: 8, text: habitos.alcohol ? "SI" : "NO" },
              { fontSize: 8, colSpan: 2, text: habitos.observacionAlcohol },
              {},
            ], [
              { fontSize: 8, text: 'Frecuencia (Alcohol)' },
              { fontSize: 8, text: habitos.frecuenciaAlcohol },
              { fontSize: 8, colSpan: 2, text: habitos.periodoAlcohol },
              {},
            ],
            [
              { fontSize: 8, text: 'Fumador:' },
              { fontSize: 8, text: habitos.fumador },
              { fontSize: 8, colSpan: 2, text: habitos.observacionFumador },
              {},
            ], [
              { fontSize: 8, text: 'Cuantos Cigarrillos al Día' },
              { fontSize: 8, text: habitos.frecuenciaFumadorDias },
              { fontSize: 8, text: 'Cuantos Cigarrillos al Años' },
              { fontSize: 8, text: habitos.frecuenciaFumadorAnios },
            ], [
              { fontSize: 8, text: 'Indice tabaquicoa' },
              { fontSize: 8, text: habitos.indiceTabaquico },
              { fontSize: 8, text: 'Riesgo EPOC' },
              { fontSize: 8, text: habitos.riesgoEPOC },
            ], [
              { fontSize: 8, text: 'Estrés:' },
              { fontSize: 8, text: habitos.estres ? "SI" : "NO" },
              { fontSize: 8, colSpan: 2, text: habitos.observacionEstres },
              {},
            ], [
              { fontSize: 8, text: 'Otros' },
              { fontSize: 8, text: habitos.habitoOtros ? "SI" : "NO" },
              { fontSize: 8, colSpan: 2, text: habitos.observacionHabitoOtros },
              {},
            ],
            [
              { fontSize: 8, text: 'Sedentarismo' },
              { fontSize: 8, text: habitos.sedentarismo ? "SI" : "NO" },
              { fontSize: 8, colSpan: 2, text: habitos.observSedentarismo == null ? "" : habitos.observSedentarismo },
              {},
            ],
            [
              { fontSize: 8, colSpan: 4, bold: true, fillColor: '#cfcfcf', text: 'GESTIÓN DE RIESGO' },
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, text: 'Mujer o menor víctima del maltrato:' },
              { fontSize: 8, text: habitos.victimaMaltrato ? "SI" : "NO" },
              { fontSize: 8, text: 'Víctima de violencia sexual:' },
              { fontSize: 8, text: habitos.victimaViolenciaSexual ? "SI" : "NO" },
            ],
            [
              { fontSize: 8, text: 'Sintomático respiratorio:' },
              { fontSize: 8, text: habitos.sintomaticoRespiratorio ? "SI" : "NO" },
              { fontSize: 8, text: 'Identificación de Discapacidad:' },
              { fontSize: 8, text: habitos.discapacidad },
            ],
            [
              { fontSize: 8, text: 'Sangre oculta en heces:' },
              { fontSize: 8, text: habitos.sangreOcultaEnHeces },
              { fontSize: 8, text: 'Pre-test de VIH:' },
              { fontSize: 8, text: habitos.preTestVIH ? "SI" : "NO" },
            ],
            [
              { fontSize: 8, text: 'Post-test de VIH:' },
              { fontSize: 8, text: habitos.postTestVIH ? "SI" : "NO" },
              {},
              {},
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  revisionPorSistema(RevisionSistema: RevisionSistema) {
    try {
      return {
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [
            [
              { fontSize: 8, colSpan: 4, bold: true, fillColor: '#cfcfcf', text: 'REVISIÓN POR SISTEMA' },
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, text: 'Piel y faneras' },
              { fontSize: 8, text: RevisionSistema.pielYAnexos == null ? "" : RevisionSistema.pielYAnexos },
              { fontSize: 8, text: 'Oído:' },
              { fontSize: 8, text: RevisionSistema.oido == null ? "" : RevisionSistema.oido },
            ],
            [
              { fontSize: 8, text: 'Boca' },
              { fontSize: 8, text: RevisionSistema.boca == null ? "" : RevisionSistema.boca },
              { fontSize: 8, text: 'Sistema Respiratorio' },
              { fontSize: 8, text: RevisionSistema.respiratorio == null ? "" : RevisionSistema.respiratorio },
            ],
            [
              { fontSize: 8, text: 'Sistemas Genital/urinario' },
              { fontSize: 8, text: RevisionSistema.genitalUrinario == null ? "" : RevisionSistema.genitalUrinario },
              { fontSize: 8, text: 'Sistema Endocrino' },
              { fontSize: 8, text: RevisionSistema.endocrino == null ? "" : RevisionSistema.endocrino },
            ], [
              { fontSize: 8, text: 'Sistema Hematopoyético' },
              { fontSize: 8, text: RevisionSistema.hematopoyetico == null ? "" : RevisionSistema.hematopoyetico },
              { fontSize: 8, text: 'Ojos' },
              { fontSize: 8, text: RevisionSistema.ojos == null ? "" : RevisionSistema.ojos },
            ], [
              { fontSize: 8, text: 'Nariz' },
              { fontSize: 8, text: RevisionSistema.nariz == null ? "" : RevisionSistema.nariz },
              { fontSize: 8, text: 'Sistema Cardiovascular' },
              { fontSize: 8, text: RevisionSistema.cardiovascular == null ? "" : RevisionSistema.cardiovascular },
            ], [
              { fontSize: 8, text: 'Sistema Gastro Intestinal' },
              { fontSize: 8, text: RevisionSistema.gastroIntestinal == null ? "" : RevisionSistema.gastroIntestinal },
              { fontSize: 8, text: 'Sistema Músculo/esqueleto' },
              { fontSize: 8, text: RevisionSistema.musculoEsqueleto == null ? "" : RevisionSistema.musculoEsqueleto },
            ], [
              { fontSize: 8, text: 'Sistemas Nervioso' },
              { fontSize: 8, text: RevisionSistema.nervioso == null ? "" : RevisionSistema.nervioso },
              { fontSize: 8, text: 'Sistema Linfático' },
              { fontSize: 8, text: RevisionSistema.linfatico == null ? "" : RevisionSistema.linfatico },
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  examenFisicoU(examenFisico: ExamenFisico) {
    try {
      return {
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [
            [
              { fontSize: 8, colSpan: 4, bold: true, fillColor: '#cfcfcf', text: 'EXAMEN FÍSICO' },
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, text: 'T.A:' },
              { fontSize: 8, text: examenFisico.presionSistolica + " - " + examenFisico.presionDiastolica },
              { fontSize: 8, text: 'Frecuencia Cardiaca:' },
              { fontSize: 8, text: examenFisico.pulso },
            ],
            [
              { fontSize: 8, text: 'Frecuencia respiratoria:' },
              { fontSize: 8, text: examenFisico.frecuenciaRespiratoria },
              { fontSize: 8, text: 'Temperatura:' },
              { fontSize: 8, text: examenFisico.temperatura },
            ],
            [
              { fontSize: 8, text: 'Peso (Kg):' },
              { fontSize: 8, text: examenFisico.peso },
              { fontSize: 8, text: 'Talla (cm):' },
              { fontSize: 8, text: examenFisico.talla },
            ],
            [
              { fontSize: 8, text: 'IMC:' },
              { fontSize: 8, text: examenFisico.imc },
              { fontSize: 8, text: 'Circunferencia abdominal (cm):' },
              { fontSize: 8, text: examenFisico.circunferenciaAbdominal },
            ],
            [
              { fontSize: 8, text: 'Perímetro Cefálico (cm):' },
              { fontSize: 8, text: examenFisico.perimetroCefalico },
              { fontSize: 8, text: 'Perímetro Braquial (cm):' },
              { fontSize: 8, text: examenFisico.perimetroBraquial },
            ],
            [
              { fontSize: 8, text: 'Pliegue Cutáneo Subescapular (mm):' },
              { fontSize: 8, text: examenFisico.pliegueCutaneoSubescapular },
              { fontSize: 8, text: 'Pliegue Cutáneo del Tríceps (mm):' },
              { fontSize: 8, text: examenFisico.pliegueCutaneoTriceps },
            ],
            [
              { fontSize: 8, text: 'Piel y faneras:' },
              { fontSize: 8, text: examenFisico.piel },
              { fontSize: 8, text: 'Cabeza:' },
              { fontSize: 8, text: examenFisico.cabeza },
            ],
            [
              { fontSize: 8, text: 'Cuello:' },
              { fontSize: 8, text: examenFisico.cuello },
              { fontSize: 8, text: 'Ojos:' },
              { fontSize: 8, text: examenFisico.ojos },
            ],
            [
              { fontSize: 8, text: 'Nariz:' },
              { fontSize: 8, text: examenFisico.nariz },
              { fontSize: 8, text: 'Boca:' },
              { fontSize: 8, text: examenFisico.boca },
            ],
            [
              { fontSize: 8, text: 'Oídos:' },
              { fontSize: 8, text: examenFisico.oidos },
              { fontSize: 8, text: 'Tórax:' },
              { fontSize: 8, text: examenFisico.torax },
            ],
            [
              { fontSize: 8, text: 'Abdomen:' },
              { fontSize: 8, text: examenFisico.abdomen },
              { fontSize: 8, text: 'Genito/Urinario:' },
              { fontSize: 8, text: examenFisico.genitoUrinario },
            ],
            [
              { fontSize: 8, text: 'Músculo/Esquelético:' },
              { fontSize: 8, text: examenFisico.musculoEsqueletico },
              { fontSize: 8, text: 'Neurológico:' },
              { fontSize: 8, text: examenFisico.neurologico },
            ],
            [
              { fontSize: 8, text: 'Vascular Periférico:' },
              { fontSize: 8, text: examenFisico.vascularPeriferico },
              {},
              {},
            ]

          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  analisisyplan(analisisYplan) {
    try {
      return {
        table: {
          widths: ['100%'],
          body: [
            [
              { fontSize: 8, bold: true, fillColor: '#cfcfcf', text: 'IMPRESIÓN DIAGNOSTICO' },
            ],
            [
              { fontSize: 8, bold: true, text: 'Análisis y Plan:' },
            ],
            [
              { fontSize: 8, text: analisisYplan },
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  impresionDiagnostico(impresion) {

    try {
      return {
        table: {
          widths: ['20%', '20%', '60%'],
          body: this.impresionDiagnostica(impresion)
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  finalidadConsulta(diagnosticos) {
    try {
      return {
        table: {
          widths: ['20%', '80%'],
          body: [
            [
              { fontSize: 8, bold: true, text: 'Tipo diagnóstico principal:' },
              { fontSize: 8, text: diagnosticos.tipoDiagnosticoPpal.descripcion },
            ],
            [
              { fontSize: 8, bold: true, text: 'Finalidad de consulta:' },
              { fontSize: 8, text: diagnosticos.finalidadConsulta.descripcion },
            ],
            [
              { fontSize: 8, bold: true, text: 'Causa externa:' },
              { fontSize: 8, text: diagnosticos.causaExterna.nombre },
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  impresionDiagnostica(diagnosticos) {

    var body = [];
    try {
      if (diagnosticos.length > 0) {
        var encabezado = [];

        encabezado.push(
          { fontSize: 8, text: '¿Principal?', bold: true },
          { fontSize: 8, text: 'Cod', bold: true },
          { fontSize: 8, text: 'Descripción', bold: true });

        body.push(encabezado);

        diagnosticos.forEach(e => {
          var impresion = [];
          impresion.push(
            { fontSize: 8, text: e.dx ? "SI" : "NO" },
            { fontSize: 8, text: e.codigo },
            { fontSize: 8, text: e.descripcion }
          );
          body.push(impresion);
        });
      }
    } catch (error) {

    }
    return body;
  }

  tablaIncapacidad(incapacidad) {
    try {
      if (incapacidad.desDiagnostico != "") {
        return {
          table: {
            widths: ['20%', '30%', '20%', '30%'],
            body: [
              [
                { fontSize: 8, colSpan: 4, bold: true, fillColor: '#cfcfcf', text: 'INCAPACIDAD' },
                {},
                {},
                {},
              ],
              [
                { fontSize: 8, bold: true, text: 'Diagnóstico:' },
                { fontSize: 8, text: incapacidad.desDiagnostico },
                { fontSize: 8, bold: true, text: 'Fecha Incapacidad:' },
                { fontSize: 8, text: incapacidad.fechaIncapacidad == null ? '' : moment(incapacidad.fechaIncapacidad).format("DD-MM-YYYY") },
              ],
              [
                { fontSize: 8, bold: true, text: 'Número Días:' },
                { fontSize: 8, text: incapacidad.numeroDias },
                { fontSize: 8, bold: true, text: 'Fecha Final:' },
                { fontSize: 8, text: incapacidad.fechaFinal == null ? '' : moment(incapacidad.fechaFinal).format("DD-MM-YYYY") },
              ],
              [
                { fontSize: 8, bold: true, text: 'Observación' },
                { fontSize: 8, colSpan: 3, text: incapacidad.observacion },
                {},
                {},
              ],
            ]
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

  tablaMedicamento(medicamento) {
    try {
      if (medicamento.medicamentos != null) {
        if (medicamento.medicamentos.length > 0) {
          return {
            table: {
              widths: ['10%', '40%', '30%', '10%', '10%'],
              body: this.medicamento(medicamento)
            }, layout: {
              defaultBorder: true
            },
          };
        } else {
          return '';
        }
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
  }

  medicamento(medicamento) {
    var body = [];
    var encabezado = [];
    var titulo = [];

    titulo.push(
      { fontSize: 8, bold: true, colSpan: 5, fillColor: '#cfcfcf', text: 'MEDICAMENTO' },
      {},
      {},
      {},
      {});

    body.push(titulo);

    encabezado.push(
      { fontSize: 8, text: 'Código' },
      { fontSize: 8, text: 'Nombre' },
      { fontSize: 8, text: 'Dosificación' },
      { fontSize: 8, text: 'Cantidad' },
      { fontSize: 8, text: 'Días TTO' });

    body.push(encabezado);

    var pf: Boolean = false;
    if (medicamento.medicamentos.length > 0) {
      medicamento.medicamentos.forEach(e => {
        var medicamentos = [];
        medicamentos.push(
          { fontSize: 8, text: e.medicamento.id },
          { fontSize: 8, text: e.medicamento.descripcion },
          { fontSize: 8, text: e.dosificacion },
          { fontSize: 8, text: e.cantidad },
          { fontSize: 8, text: e.dias }
        );
        body.push(medicamentos);
        if (e.pf) {
          pf = true;
        }
      });

      if (pf) {
        var posfechado = [];

        posfechado.push(
          { fontSize: 8, text: 'P-F' },
          { fontSize: 8, text: 'Fecha Inicio: ' + (medicamento.fechaInicioPF == null ? '' : moment(medicamento.fechaInicioPF).format("DD-MM-YYYY")) },
          { fontSize: 8, text: 'Fecha Fin: ' + (medicamento.fechaFinPF == null ? '' : moment(medicamento.fechaFinPF).format("DD-MM-YYYY")) },
          { fontSize: 8, colSpan: 2, text: 'Número de meses:' + medicamento.numeroMeses },
          {});

        body.push(posfechado);
      }

    }
    return body;

  }

  tablaOdenamiento(ListadoOrdenamiento) {
    try {
      if (ListadoOrdenamiento.length > 0) {
        return {
          table: {
            widths: ['10%', '40%', '10%', '30%', '10%'],
            body: this.ordenamiento(ListadoOrdenamiento)
          }, layout: {
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

  ordenamiento(ListadoOrdenamiento) {

    var body = [];
    var encabezado = [];
    var titulo = [];

    titulo.push(
      { fontSize: 8, bold: true, colSpan: 5, fillColor: '#cfcfcf', text: 'ORDENAMIENTO' },
      {},
      {},
      {},
      {});

    body.push(titulo);

    encabezado.push(
      { fontSize: 8, text: 'Código' },
      { fontSize: 8, text: 'Nombre' },
      { fontSize: 8, text: 'Cantidad' },
      { fontSize: 8, text: 'Nota' },
      { fontSize: 8, text: 'Tipo' });

    body.push(encabezado);
    if (ListadoOrdenamiento.length > 0) {
      ListadoOrdenamiento.forEach(e => {
        var ordenamiento = [];
        ordenamiento.push(
          { fontSize: 8, text: e.cup.codigo },
          { fontSize: 8, text: e.cup.descripcion },
          { fontSize: 8, text: e.cup.cantidad },
          { fontSize: 8, text: e.nota },
          { fontSize: 8, text: e.tipo }
        );
        body.push(ordenamiento);
      });
    }
    return body;

  }

  tablaNotaAdministrativa(nota) {
    try {
      if (nota.length > 0) {
        return {
          table: {
            widths: ['15%', '20%', '30%', '15%', '10%', '10%'],
            body: this.notaAdministrativa(nota)
          }, layout: {
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

  notaAdministrativa(nota) {

    var body = [];
    var encabezado = [];
    var titulo = [];

    titulo.push(
      { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'NOTAS ADMINISTRATIVAS' },
      {},
      {},
      {},
      {},
      {});

    body.push(titulo);

    encabezado.push(
      { fontSize: 8, text: 'DIAGNOSTICO' },
      { fontSize: 8, text: 'NOTA' },
      { fontSize: 8, text: 'ORDENAMIENTOS' },
      { fontSize: 8, text: 'MEDICO' },
      { fontSize: 8, text: 'ESPECIALIDAD' },
      { fontSize: 8, text: 'FECHA CREACIÓN' });

    body.push(encabezado);

    if (nota.length > 0) {
      nota.forEach(e => {
        var cups = "";
        var i = 0;
        e.cup.forEach(x => {
          if (i == 0) {
            cups = x.descripcion;
          } else {
            cups = x.descripcion + "," + cups;
          }
          i++;
        });
        var notas = [];
        var fecha = e.fechaCreacion == null ? '' : moment(e.fechaCreacion).format("DD-MM-YYYY");
        notas.push(
          { fontSize: 8, text: e.diagnostico[0].descripcion },
          { fontSize: 8, text: e.nota },
          { fontSize: 8, text: cups },
          { fontSize: 8, text: e.medico },
          { fontSize: 8, text: e.especialidad },
          { fontSize: 8, text: fecha }
        );
        body.push(notas);
      });
    }
    return body;
  }

  tabla(listado, metodo) {
    try {
      if (listado.length > 0) {
        return {
          table: {
            widths: ['35%', '65%'],
            body: metodo
          }, layout: {
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

  antecedentesQuirurgicos(anteQuirurgico) {
    var body = [];

    var titulo = [];
    var encabezado = [];
    titulo.push({ fontSize: 8, colSpan: 2, fillColor: '#e8e6e6', text: '\nANTECEDENTES QUIRÚRGICOS', bold: true }, {});
    body.push(titulo);
    encabezado.push(
      { fontSize: 8, text: 'DESCRIPCIÓN' },
      { fontSize: 8, text: 'FECHA' });
    body.push(encabezado);

    if (anteQuirurgico.length > 0) {
      anteQuirurgico.forEach(e => {
        var quirurgico = [];
        quirurgico.push(
          { fontSize: 8, text: e.descripcion },
          { fontSize: 8, text: e.fecha == null ? '' : moment(e.fecha).format("DD-MM-YYYY") }
        );
        body.push(quirurgico);
      });
    }
    return body;
  }

  antecedentesTraumatologicos(antetraumaticos) {

    var body = [];
    var titulo = [];
    var encabezado = [];
    titulo.push({ fontSize: 8, colSpan: 2, fillColor: '#e8e6e6', text: '\nANTECEDENTES TRAUMATOLÓGICOS', bold: true }, {});
    body.push(titulo);
    encabezado.push(
      { fontSize: 8, text: 'DESCRIPCIÓN' },
      { fontSize: 8, text: 'FECHA' });
    body.push(encabezado);
    if (antetraumaticos.length > 0) {
      antetraumaticos.forEach(e => {
        var traumaticos = [];
        traumaticos.push(
          { fontSize: 8, text: e.descripcion },
          { fontSize: 8, text: e.fecha == null ? '' : moment(e.fecha).format("DD-MM-YYYY") }
        );
        body.push(traumaticos);
      });
    }
    return body;
  }

  antecedentesTranfusiones(anttransfusioness) {

    var body = [];
    var titulo = [];
    var encabezado = [];
    titulo.push({ fontSize: 8, colSpan: 2, fillColor: '#e8e6e6', text: '\nANTECEDENTES TRASFUSIONES SANGUÍNEAS', bold: true }, {});
    body.push(titulo);
    encabezado.push(
      { fontSize: 8, text: 'DESCRIPCIÓN' },
      { fontSize: 8, text: 'FECHA' });
    body.push(encabezado);

    if (anttransfusioness.length > 0) {
      anttransfusioness.forEach(e => {
        var transfusiones = [];
        transfusiones.push(
          { fontSize: 8, text: e.descripcion },
          { fontSize: 8, text: e.fecha == null ? '' : moment(e.fecha).format("DD-MM-YYYY") }
        );
        body.push(transfusiones);
      });
    }
    return body;
  }

  antecedentesAlergicos(antalergicos) {

    var body = [];
    var titulo = [];
    var encabezado = [];
    titulo.push({ fontSize: 8, colSpan: 2, fillColor: '#e8e6e6', text: '\nANTECEDENTES ALÉRGICOS', bold: true }, {});
    body.push(titulo);
    encabezado.push(
      { fontSize: 8, text: 'DESCRIPCIÓN' },
      { fontSize: 8, text: 'FECHA' });
    body.push(encabezado);

    antalergicos.forEach(e => {
      var alergicos = [];
      alergicos.push(
        { fontSize: 8, text: e.descripcion },
        { fontSize: 8, text: e.fecha == null ? '' : moment(e.fecha).format("DD-MM-YYYY") }
      );
      body.push(alergicos);
    });
    return body;
  }

  antecedentesFarmacologicos(antfarmacologicos) {

    var body = [];
    var titulo = [];
    var encabezado = [];
    titulo.push({ fontSize: 8, colSpan: 2, fillColor: '#e8e6e6', text: '\nANTECEDENTES FARMACOLÓGICOS', bold: true }, {});
    body.push(titulo);
    encabezado.push(
      { fontSize: 8, text: 'DESCRIPCIÓN' },
      { fontSize: 8, text: 'FECHA' });
    body.push(encabezado);
    antfarmacologicos.forEach(e => {
      var farmacologicos = [];
      farmacologicos.push(
        { fontSize: 8, text: e.descripcion },
        { fontSize: 8, text: e.fecha == null ? '' : moment(e.fecha).format("DD-MM-YYYY") }
      );
      body.push(farmacologicos);
    });
    return body;
  }

  antecedentesPatologicos(antecedentePatologicos) {
    try {
      return {
        table: {
          widths: ['30%', '5%', '65%'],
          body: this.antePatologicos(antecedentePatologicos),

        },
        layout: {
          defaultBorder: true
        },
      };

    } catch (error) {
      return '';
    }
  }

  antePatologicos(antecedentePatologicos) {
    var body = [];

    var titulo = [];
    var titulog = [];
    titulog.push({ fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', text: 'ANTECEDENTES ', bold: true }, {}, {});
    body.push(titulog);


    titulo.push({ fontSize: 8, colSpan: 3, text: 'ANTECEDENTES PATOLÓGICOS', bold: true }, {}, {});
    body.push(titulo);

    var arritmias = [];
    //if (antecedentePatologicos.arritmias) {
    arritmias.push({ fontSize: 8, text: 'Arritmias:  ' },
      { fontSize: 8, text: (antecedentePatologicos.arritmias ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionArritmias });

    body.push(arritmias);
    // }

    var autoinmunes = [];
    //  if (antecedentePatologicos.autoinmunes) {
    autoinmunes.push({ fontSize: 8, text: 'Autoinmunes:  ' },
      { fontSize: 8, text: (antecedentePatologicos.autoinmunes ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionAutoinmunes });

    body.push(autoinmunes);
    //  }

    var cancer = [];
    // if (antecedentePatologicos.cancer) {
    cancer.push({ fontSize: 8, text: 'Cáncer:  ' },
      { fontSize: 8, text: (antecedentePatologicos.cancer ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionCancer });

    body.push(cancer);
    //   }

    var ecv = [];
    //  if (antecedentePatologicos.ecv) {
    ecv.push({ fontSize: 8, text: 'Enfermedad Cardiovascular:  ' },
      { fontSize: 8, text: (antecedentePatologicos.ecv ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionECV });

    body.push(ecv);
    // }
    /* ECV */
    var infartoMiocardio = [];
    //  if (antecedentePatologicos.ecv && antecedentePatologicos.infartoMiocardio) {
    infartoMiocardio.push({ fontSize: 8, text: 'Infarto de miocardio:  ' },
      { fontSize: 8, text: (antecedentePatologicos.infartoMiocardio ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsinfartoMiocardio });

    body.push(infartoMiocardio);
    //  }

    var insuficienciaCardiaca = [];
    //  if (antecedentePatologicos.ecv && antecedentePatologicos.insuficienciaCardiaca) {
    insuficienciaCardiaca.push({ fontSize: 8, text: 'Insuficiencia cardiaca:  ' },
      { fontSize: 8, text: (antecedentePatologicos.insuficienciaCardiaca ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionInsuficienciaCardiaca });

    body.push(insuficienciaCardiaca);
    // }

    var emergenciaHipertensiva = [];
    // if (antecedentePatologicos.ecv && antecedentePatologicos.emergenciaHipertensiva) {
    emergenciaHipertensiva.push({ fontSize: 8, text: 'Emergencia hipertensiva:  ' },
      { fontSize: 8, text: (antecedentePatologicos.emergenciaHipertensiva ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsEmergenciaHipertensiva });

    body.push(emergenciaHipertensiva);
    //  }

    var tromboembolismoPulmunar = [];
    // if (antecedentePatologicos.ecv && antecedentePatologicos.tromboembolismoPulmunar) {
    tromboembolismoPulmunar.push({ fontSize: 8, text: 'Tromboembolismo pulmonar:  ' },
      { fontSize: 8, text: (antecedentePatologicos.tromboembolismoPulmunar ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsTromboembolismoPulmunar });

    body.push(tromboembolismoPulmunar);
    //}
    var sindromeAortico = [];
    //  if (antecedentePatologicos.ecv && antecedentePatologicos.sindromeAortico) {
    sindromeAortico.push({ fontSize: 8, text: 'Síndrome aórtico:  ' },
      { fontSize: 8, text: (antecedentePatologicos.sindromeAortico ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsSindromeAortico });

    body.push(sindromeAortico);
    // }
    var sincope = [];
    //  if (antecedentePatologicos.ecv && antecedentePatologicos.sincope) {
    sincope.push({ fontSize: 8, text: 'Sincope:  ' },
      { fontSize: 8, text: (antecedentePatologicos.sincope ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsSincope });

    body.push(sincope);
    //  }

    var diabetes = [];
    //  if (antecedentePatologicos.diabetes) {
    diabetes.push({ fontSize: 8, text: 'Diabetes:  ' },
      { fontSize: 8, text: (antecedentePatologicos.diabetes ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionDiabetes });

    body.push(diabetes);
    //  }

    var hipoglicemia = [];
    //  if (antecedentePatologicos.hipoglicemia) {
    hipoglicemia.push({ fontSize: 8, text: 'Hipoglicemia:  ' },
      { fontSize: 8, text: (antecedentePatologicos.hipoglicemia ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionHipoglicemia });

    body.push(hipoglicemia);
    //   }

    var hipertension = [];
    //  if (antecedentePatologicos.hipertension) {
    hipertension.push({ fontSize: 8, text: 'Hipertensión:  ' },
      { fontSize: 8, text: (antecedentePatologicos.hipertension ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionHipertension });

    body.push(hipertension);
    //   }

    var internaciones = [];
    //  if (antecedentePatologicos.internaciones) {
    internaciones.push({ fontSize: 8, text: 'Internaciones:  ' },
      { fontSize: 8, text: (antecedentePatologicos.internaciones ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionInternaciones });

    body.push(internaciones);
    //  }

    var valvulopatias = [];
    //   if (antecedentePatologicos.valvulopatias) {
    valvulopatias.push({ fontSize: 8, text: 'Valvulopatías:  ' },
      { fontSize: 8, text: (antecedentePatologicos.valvulopatias ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionValvulopatias });

    body.push(valvulopatias);
    // }

    var infeccioso = [];
    // if (antecedentePatologicos.infeccioso) {
    infeccioso.push({ fontSize: 8, text: 'Infeccioso:  ' },
      { fontSize: 8, text: (antecedentePatologicos.infeccioso ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionInfeccioso });

    body.push(infeccioso);
    // }

    var transtornosGastrointestinales = [];
    // if (antecedentePatologicos.transtornosGastrointestinales) {
    transtornosGastrointestinales.push({ fontSize: 8, text: 'Trastornos Gastrointestinales:  ' },
      { fontSize: 8, text: (antecedentePatologicos.transtornosGastrointestinales ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionTranstornosGastrointestinales });

    body.push(transtornosGastrointestinales);
    // }

    var transtornosHormonales = [];
    // if (antecedentePatologicos.transtornosHormonales) {
    transtornosHormonales.push({ fontSize: 8, text: 'Trastornos Hormonales:  ' },
      { fontSize: 8, text: (antecedentePatologicos.transtornosHormonales ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionTranstornosHormonales });

    body.push(transtornosHormonales);
    // }

    var transtornosNeuronales = [];
    // if (antecedentePatologicos.transtornosNeuronales) {
    transtornosNeuronales.push({ fontSize: 8, text: 'Trastornos Neuronales:  ' },
      { fontSize: 8, text: (antecedentePatologicos.transtornosNeuronales ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionTranstornosNeuronales });

    body.push(transtornosNeuronales);
    // }

    var EPOC = [];
    // if (antecedentePatologicos.EPOC) {
    EPOC.push({ fontSize: 8, text: 'Enfermedad Pulmonar obstructiva crónica EPOC:  ' },
      { fontSize: 8, text: (antecedentePatologicos.EPOC ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsEPOC });

    body.push(EPOC);
    // }

    var artritisReumatoide = [];
    //  if (antecedentePatologicos.artritisReumatoide) {
    artritisReumatoide.push({ fontSize: 8, text: 'Artritis Reumatoide:  ' },
      { fontSize: 8, text: (antecedentePatologicos.artritisReumatoide ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsartritisReumatoide });

    body.push(artritisReumatoide);
    //  }

    var enfermedadVision = [];
    //  if (antecedentePatologicos.enfermedadVision) {
    enfermedadVision.push({ fontSize: 8, text: 'Enfermedad de Visión:  ' },
      { fontSize: 8, text: (antecedentePatologicos.enfermedadVision ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsEnfermedadVision });

    body.push(enfermedadVision);
    //   }

    var cataratas = [];
    // if (antecedentePatologicos.enfermedadVision && antecedentePatologicos.cataratas) {
    cataratas.push({ fontSize: 8, text: 'Cataratas:  ' },
      { fontSize: 8, text: (antecedentePatologicos.cataratas ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obscataratas });

    body.push(cataratas);
    //  }
    var desprendimientoRetina = [];
    //  if (antecedentePatologicos.enfermedadVision && antecedentePatologicos.desprendimientoRetina) {
    desprendimientoRetina.push({ fontSize: 8, text: 'Desprendimiento de retina:  ' },
      { fontSize: 8, text: (antecedentePatologicos.desprendimientoRetina ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsdesprendimientoRetina });

    body.push(desprendimientoRetina);
    //  }
    var glaucoma = [];
    //  if (antecedentePatologicos.enfermedadVision && antecedentePatologicos.glaucoma) {
    glaucoma.push({ fontSize: 8, text: 'Glaucoma:  ' },
      { fontSize: 8, text: (antecedentePatologicos.glaucoma ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsGlaucoma });

    body.push(glaucoma);
    //  }
    var retinopatiaDiabetica = [];
    //  if (antecedentePatologicos.enfermedadVision && antecedentePatologicos.retinopatiaDiabetica) {
    retinopatiaDiabetica.push({ fontSize: 8, text: 'Retinopatía diabética:  ' },
      { fontSize: 8, text: (antecedentePatologicos.retinopatiaDiabetica ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsretinopatiaDiabetica });

    body.push(retinopatiaDiabetica);
    //  }
    var ojoSeco = [];
    //  if (antecedentePatologicos.enfermedadVision && antecedentePatologicos.ojoSeco) {
    ojoSeco.push({ fontSize: 8, text: 'Ojo seco:  ' },
      { fontSize: 8, text: (antecedentePatologicos.ojoSeco ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsojoSeco });

    body.push(ojoSeco);
    //  }

    var enfermedadCerebroVascular = [];
    //  if (antecedentePatologicos.enfermedadCerebroVascular) {
    enfermedadCerebroVascular.push({ fontSize: 8, text: 'Enfermedad cerebro vascular:  ' },
      { fontSize: 8, text: (antecedentePatologicos.enfermedadCerebroVascular ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsenfermedadCerebroVascular });

    body.push(enfermedadCerebroVascular);
    //   }

    var eventoTrombotio = [];
    //  if (antecedentePatologicos.enfermedadCerebroVascular && antecedentePatologicos.eventoTrombotio) {
    eventoTrombotio.push({ fontSize: 8, text: 'Evento trombótico:  ' },
      { fontSize: 8, text: (antecedentePatologicos.eventoTrombotio ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsEventoTrombotio });

    body.push(eventoTrombotio);
    // }
    var eventoembolico = [];
    //  if (antecedentePatologicos.enfermedadCerebroVascular && antecedentePatologicos.eventoembolico) {
    eventoembolico.push({ fontSize: 8, text: 'Evento Embólico:  ' },
      { fontSize: 8, text: (antecedentePatologicos.eventoembolico ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obseventoembolico });

    body.push(eventoembolico);
    //   }
    var eventoHemorragico = [];
    //  if (antecedentePatologicos.enfermedadCerebroVascular && antecedentePatologicos.eventoHemorragico) {
    eventoHemorragico.push({ fontSize: 8, text: 'Evento Hemorrágico:  ' },
      { fontSize: 8, text: (antecedentePatologicos.eventoHemorragico ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obseventoHemorragic });

    body.push(eventoHemorragico);
    //  }


    var eventoVascular = [];
    // if (antecedentePatologicos.eventoVascular) {
    eventoVascular.push({ fontSize: 8, text: 'Enfermedad Vascular:  ' },
      { fontSize: 8, text: (antecedentePatologicos.eventoVascular ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obseventoVascular });
    body.push(eventoVascular);
    //   }

    var obstruccionesArteriales = [];
    //  if (antecedentePatologicos.eventoVascular && antecedentePatologicos.obstruccionesArteriales) {
    obstruccionesArteriales.push({ fontSize: 8, text: 'Obstrucciones Arteriales:  ' },
      { fontSize: 8, text: (antecedentePatologicos.obstruccionesArteriales ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsObstruccionesArteriales });

    body.push(obstruccionesArteriales);
    // }
    var aneurismasaorticos = [];
    // if (antecedentePatologicos.eventoVascular && antecedentePatologicos.aneurismasaorticos) {
    aneurismasaorticos.push({ fontSize: 8, text: 'Aneurismas aórticos:  ' },
      { fontSize: 8, text: (antecedentePatologicos.aneurismasaorticos ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsaneurismasaorticos });

    body.push(aneurismasaorticos);
    //  }
    var enfermedadBuerger = [];
    //  if (antecedentePatologicos.eventoVascular && antecedentePatologicos.enfermedadBuerger) {
    enfermedadBuerger.push({ fontSize: 8, text: 'Enfermedad de Buerger:  ' },
      { fontSize: 8, text: (antecedentePatologicos.enfermedadBuerger ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsenfermedadBuerger });

    body.push(enfermedadBuerger);
    //}
    var fenomenoRaynaud = [];
    //  if (antecedentePatologicos.eventoVascular && antecedentePatologicos.fenomenoRaynaud) {
    fenomenoRaynaud.push({ fontSize: 8, text: 'Fenómeno de Raynaud:  ' },
      { fontSize: 8, text: (antecedentePatologicos.fenomenoRaynaud ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsfenomenoRaynaud });

    body.push(fenomenoRaynaud);
    // }
    var coagulosSanguineos = [];
    //  if (antecedentePatologicos.eventoVascular && antecedentePatologicos.coagulosSanguineos) {
    coagulosSanguineos.push({ fontSize: 8, text: 'Coágulo Sanguíneos venosos:  ' },
      { fontSize: 8, text: (antecedentePatologicos.coagulosSanguineos ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obscoagulosSanguineos });

    body.push(coagulosSanguineos);
    //   }
    var emboliaPulmonar = [];
    //  if (antecedentePatologicos.eventoVascular && antecedentePatologicos.emboliaPulmonar) {
    emboliaPulmonar.push({ fontSize: 8, text: 'Embolia Pulmonar:  ' },
      { fontSize: 8, text: (antecedentePatologicos.emboliaPulmonar ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsemboliaPulmonar });

    body.push(emboliaPulmonar);
    //  }
    var flebitis = [];
    //  if (antecedentePatologicos.eventoVascular && antecedentePatologicos.flebitis) {
    flebitis.push({ fontSize: 8, text: 'Flebitis:  ' },
      { fontSize: 8, text: (antecedentePatologicos.flebitis ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsflebitis });

    body.push(flebitis);
    // }


    var enfermedadRenal = [];
    //  if (antecedentePatologicos.enfermedadRenal) {
    enfermedadRenal.push({ fontSize: 8, text: 'Enfermedad Renal:  ' },
      { fontSize: 8, text: (antecedentePatologicos.enfermedadRenal ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsenfermedadRenal });

    body.push(enfermedadRenal);
    // }

    var insuficienciaRenalAguda = [];
    // if (antecedentePatologicos.enfermedadRenal && antecedentePatologicos.insuficienciaRenalAguda) {
    insuficienciaRenalAguda.push({ fontSize: 8, text: 'Insuficiencia renal aguda:  ' },
      { fontSize: 8, text: (antecedentePatologicos.insuficienciaRenalAguda ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsinsuficienciaRenalAguda });

    body.push(insuficienciaRenalAguda);
    // }
    var danorenalAgudo = [];
    //if (antecedentePatologicos.enfermedadRenal && antecedentePatologicos.danorenalAgudo) {
    danorenalAgudo.push({ fontSize: 8, text: 'Daño renal agudo:  ' },
      { fontSize: 8, text: (antecedentePatologicos.danorenalAgudo ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsdanorenalAgudo });

    body.push(danorenalAgudo);
    //}
    var insuficienciaRenalcronica = [];
    //if (antecedentePatologicos.enfermedadRenal && antecedentePatologicos.insuficienciaRenalcronica) {
    insuficienciaRenalcronica.push({ fontSize: 8, text: 'Insuficiencia renal crónica:  ' },
      { fontSize: 8, text: (antecedentePatologicos.insuficienciaRenalcronica ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsinsuficienciaRenalcronica });

    body.push(insuficienciaRenalcronica);
    //}

    var otros = [];
    //if (antecedentePatologicos.otros) {
    otros.push({ fontSize: 8, text: 'Otros:  ' },
      { fontSize: 8, text: (antecedentePatologicos.otros ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionOtros });

    body.push(otros);
    //}

    return body;
  }


  antecedentesPatologicosOdontolgocis(antecedentePatologicos) {
    try {
      return {
        table: {
          widths: ['30%', '5%', '65%'],
          body: this.antePatologicosOdonto(antecedentePatologicos),

        },
        layout: {
          defaultBorder: true
        },
      };

    } catch (error) {
      return '';
    }
  }

  antePatologicosOdonto(antecedentePatologicos) {
    var body = [];

    var titulo = [];
    var titulog = [];
    titulog.push({ fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', text: 'ANTECEDENTES ', bold: true }, {}, {});
    body.push(titulog);


    titulo.push({ fontSize: 8, colSpan: 3, text: 'ANTECEDENTES PATOLÓGICOS', bold: true }, {}, {});
    body.push(titulo);

    var cancer = [];
    cancer.push({ fontSize: 8, text: 'Cáncer:  ' },
      { fontSize: 8, text: (antecedentePatologicos.cancer ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionCancer });

    body.push(cancer);

    var diabetes = [];
    diabetes.push({ fontSize: 8, text: 'Diabetes:  ' },
      { fontSize: 8, text: (antecedentePatologicos.diabetes ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionDiabetes });

    body.push(diabetes);

    var infeccioso = [];
    infeccioso.push({ fontSize: 8, text: 'Infeccioso:  ' },
      { fontSize: 8, text: (antecedentePatologicos.infeccioso ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionInfeccioso });

    body.push(infeccioso);

    var autoinmunes = [];
    autoinmunes.push({ fontSize: 8, text: 'Autoinmunes:  ' },
      { fontSize: 8, text: (antecedentePatologicos.autoinmunes ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionAutoinmunes });

    body.push(autoinmunes);

    var ecv = [];
    ecv.push({ fontSize: 8, text: 'Enfermedad Cardiovascular:  ' },
      { fontSize: 8, text: (antecedentePatologicos.ecv ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionECV });

    body.push(ecv);

    var hipertension = [];
    hipertension.push({ fontSize: 8, text: 'Hipertensión:  ' },
      { fontSize: 8, text: (antecedentePatologicos.hipertension ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionHipertension });

    body.push(hipertension);

    var enfermedadRenal = [];
    enfermedadRenal.push({ fontSize: 8, text: 'Enfermedad Renal:  ' },
      { fontSize: 8, text: (antecedentePatologicos.enfermedadRenal ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.obsenfermedadRenal });

    body.push(enfermedadRenal);

    var otros = [];
    otros.push({ fontSize: 8, text: 'Otros:  ' },
      { fontSize: 8, text: (antecedentePatologicos.otros ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedentePatologicos.observacionOtros });

    body.push(otros);

    return body;
  }

  tablaGinoObstetrico(sexo, antecedenteGinecoObstetrico) {
    try {
      if (sexo == 'F') {
        return {
          table: {
            widths: ['20%', '20%', '30%', '30%'],
            body: this.antecedentesgineco(antecedenteGinecoObstetrico),
          }, layout: {
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

  antecedentesgineco(antecedenteGinecoObstetrico) {

    var body = [];
    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 4, fillColor: '#e8e6e6', text: '\nANTECEDENTES GINO-OBSTÉTRICOS', bold: true }, {}, {}, {});
    body.push(titulo);

    var menarca = [];
    if (antecedenteGinecoObstetrico.menarca) {
      menarca.push(
        { fontSize: 8, text: 'Menarquía  ' },
        { fontSize: 8, text: (antecedenteGinecoObstetrico.menarca ? 'SI' : 'NO') },
        { fontSize: 8, text: antecedenteGinecoObstetrico.observacionMenarca },
        { fontSize: 8, text: antecedenteGinecoObstetrico.fechaMenarca });

      body.push(menarca);
    }

    var ciclosMenstruales = [];
    ciclosMenstruales.push(
      { fontSize: 8, text: 'Ciclos Menstruales' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.ciclosMenstruales },
      { fontSize: 8, text: 'FUM' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.fum == null ? '' : moment(antecedenteGinecoObstetrico.fum).format("DD-MM-YYYY") });

    body.push(ciclosMenstruales);

    var menopausia = [];
    if (antecedenteGinecoObstetrico.menopausia) {
      menopausia.push(
        { fontSize: 8, text: 'Menopausia' },
        { fontSize: 8, text: antecedenteGinecoObstetrico.menopausia ? 'SI' : 'NO' },
        { fontSize: 8, text: antecedenteGinecoObstetrico.observacionMenopausia },
        { fontSize: 8, text: antecedenteGinecoObstetrico.fechanMenopausia });

      body.push(menopausia);
    }

    var ets = [];
    if (antecedenteGinecoObstetrico.ets) {
      ets.push(
        { fontSize: 8, text: 'ETS' },
        { fontSize: 8, text: antecedenteGinecoObstetrico.ets ? 'SI' : 'NO' },
        { fontSize: 8, colSpan: 2, text: antecedenteGinecoObstetrico.observacionETS }, {});

      body.push(ets);
    }

    var autoExamenMama = [];
    if (antecedenteGinecoObstetrico.autoExamenMama) {
      autoExamenMama.push(
        { fontSize: 8, text: 'Autoexamen de mama' },
        { fontSize: 8, colSpan: 3, text: antecedenteGinecoObstetrico.autoExamenMama ? 'SI' : 'NO' },
        {}, {});

      body.push(autoExamenMama);
    }

    var inicioRelacionesSexuales = [];
    if (antecedenteGinecoObstetrico.inicioRelacionesSexuales) {
      inicioRelacionesSexuales.push(
        { fontSize: 8, text: 'Inicio de Relaciones Sexuales' },
        { fontSize: 8, colSpan: 3, text: antecedenteGinecoObstetrico.inicioRelacionesSexuales ? 'SI' : 'NO' },
        { fontSize: 8, colSpan: 2, text: antecedenteGinecoObstetrico.observacionInicioRelacionesSexuales }, {});

      body.push(inicioRelacionesSexuales);
    }

    var actividadSexual = [];
    if (antecedenteGinecoObstetrico.actividadSexual == "true") {
      actividadSexual.push(
        { fontSize: 8, text: 'Actividad Sexual' },
        { fontSize: 8, text: 'SI' },
        { fontSize: 8, text: 'Número de compañeros' },
        { fontSize: 8, text: antecedenteGinecoObstetrico.numeroCompaneros });

      body.push(actividadSexual);
    }

    var metodo = [];
    metodo.push(
      { fontSize: 8, text: 'Método de Planificación' },
      { fontSize: 8, colSpan: 3, text: (antecedenteGinecoObstetrico.ninguno ? 'Ninguno' : (antecedenteGinecoObstetrico.oral ? 'Oral, ' : '') + (antecedenteGinecoObstetrico.inyectable ? 'Inyectable, ' : '') + (antecedenteGinecoObstetrico.subdermico ? 'Subdérmico, ' : '') + (antecedenteGinecoObstetrico.d_I_U ? 'D.I.U,' : '') + (antecedenteGinecoObstetrico.condon ? 'Condón, ' : '') + (antecedenteGinecoObstetrico.esterilizacionFemenina ? 'Esterilización Femenina, ' : '') + (antecedenteGinecoObstetrico.vasectomia ? 'Vasectomía, ' : '') + (antecedenteGinecoObstetrico.otros ? 'Otros' : '')) },
      {},
      {});

    body.push(metodo);



    var gravidez = [];
    gravidez.push(
      { fontSize: 8, text: 'Gravidez' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.gravidez },
      { fontSize: 8, text: 'Partos' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.partos });

    body.push(gravidez);

    var vaginales = [];
    vaginales.push(
      { fontSize: 8, text: 'Vaginales' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.vaginales },
      { fontSize: 8, text: 'Cesáreas' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.cesareas });

    body.push(vaginales);

    var nacidos = [];
    nacidos.push(
      { fontSize: 8, text: 'Nacidos Vivos' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.nacidosVivos },
      { fontSize: 8, text: 'Nacidos Muertos' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.nacidosMuertos });

    body.push(nacidos);

    var ectopicos = [];
    ectopicos.push(
      { fontSize: 8, text: 'Ectópicos' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.ectopicos },
      { fontSize: 8, text: 'FUP' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.fup == null ? '' : moment(antecedenteGinecoObstetrico.fup).format("DD-MM-YYYY") });

    body.push(ectopicos);


    var gemelar = [];
    gemelar.push(
      { fontSize: 8, text: 'Gemelar' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.gemelar },
      { fontSize: 8, text: '' },
      { fontSize: 8, text: '' });

    body.push(gemelar);


    var patologias = [];
    patologias.push(
      { fontSize: 8, text: 'Patologías Relacionadas con el Embarazo' },
      { fontSize: 8, colSpan: 3, text: (antecedenteGinecoObstetrico.hemorragia_1 ? 'Hemorragia 1, ' : '') + (antecedenteGinecoObstetrico.hemorragia_2 ? 'Hemorragia 2, ' : '') + (antecedenteGinecoObstetrico.hemorragia_3 ? 'Hemorragia 3, ' : '') + (antecedenteGinecoObstetrico.preeclampsia ? 'Preeclampsia, ' : '') + (antecedenteGinecoObstetrico.eclampsia ? 'Eclampsia, ' : '') },
      {},
      {});

    body.push(patologias);


    var otros = [];
    otros.push(
      { fontSize: 8, text: 'Otros' },
      { fontSize: 8, text: antecedenteGinecoObstetrico.otrosPat ? 'SI' : 'NO' },
      { fontSize: 8, colSpan: 2, text: antecedenteGinecoObstetrico.observacionOtrosPat },
      {});

    body.push(otros);


    var observacion = [];
    observacion.push(
      { fontSize: 8, text: 'Observación' },
      { fontSize: 8, colSpan: 2, text: antecedenteGinecoObstetrico.observacion },
      {},
      {});

    body.push(observacion);


    return body;
  }

  antecedentesFamiliares(antecedenteFamiliar) {
    try {
      return {
        table: {
          widths: ['30%', '10%', '60%'],
          body: this.antecFamiliares(antecedenteFamiliar),

        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  antecFamiliares(antecedenteFamiliar) {
    var body = [];

    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 3, fillColor: '#e8e6e6',text: 'ANTECEDENTES FAMILIARES', bold: true }, {}, {});
    body.push(titulo);

    var hipertension = [];
    //  if (antecedenteFamiliar.hipertension) {
    hipertension.push(
      { fontSize: 8, text: 'Hipertensión' },
      { fontSize: 8, text: (antecedenteFamiliar.hipertension ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionHipertension });
    body.push(hipertension);
    //  }

    var cancerProstata = [];
    // if (antecedenteFamiliar.cancerProstata) {
    cancerProstata.push(
      { fontSize: 8, text: 'Cáncer de Próstata' },
      { fontSize: 8, text: (antecedenteFamiliar.cancerProstata ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionCancerProstata });

    body.push(cancerProstata);
    //  }

    var diabetes = [];
    // if (antecedenteFamiliar.diabetes) {
    diabetes.push(
      { fontSize: 8, text: 'Diabetes' },
      { fontSize: 8, text: (antecedenteFamiliar.diabetes ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionDiabetes });

    body.push(diabetes);
    // }

    var cancerColon = [];
    //  if (antecedenteFamiliar.cancerColon) {
    cancerColon.push(
      { fontSize: 8, text: 'Cáncer de Colón' },
      { fontSize: 8, text: (antecedenteFamiliar.cancerColon ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionCancerColon });

    body.push(cancerColon);
    // }

    var cardiovasculares = [];
    //  if (antecedenteFamiliar.cardiovasculares) {
    cardiovasculares.push(
      { fontSize: 8, text: 'Cardiovasculares' },
      { fontSize: 8, text: (antecedenteFamiliar.cardiovasculares ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionCardiovasculares });

    body.push(cardiovasculares);
    /// }

    var cancerPulmon = [];
    // if (antecedenteFamiliar.cancerPulmon) {
    cancerPulmon.push(
      { fontSize: 8, text: 'Cáncer de Pulmón' },
      { fontSize: 8, text: (antecedenteFamiliar.cancerPulmon ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionCancerPulmon });

    body.push(cancerPulmon);
    // }

    var cancerMama = [];
    //  if (antecedenteFamiliar.cancerMama) {
    cancerMama.push(
      { fontSize: 8, text: 'Cáncer de Mama' },
      { fontSize: 8, text: (antecedenteFamiliar.cancerMama ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionCancerMama });

    body.push(cancerMama);
    //   }

    var otroTipoCancer = [];
    // if (antecedenteFamiliar.otroTipoCancer) {
    otroTipoCancer.push(
      { fontSize: 8, text: 'Otro Tipo de Cáncer' },
      { fontSize: 8, text: (antecedenteFamiliar.otroTipoCancer ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionOtroTipoCancer });

    body.push(otroTipoCancer);
    // }

    var otroAntecedente = [];
    otroAntecedente.push(
      { fontSize: 8, text: 'Otros Antecedentes:' },
      { fontSize: 8, colSpan: 2, text: antecedenteFamiliar.observacionOtro },
      {}
    );

    body.push(otroAntecedente);


    return body;
  }

  antecedentesFamiliaresOdonto(antecedenteFamiliar) {
    try {
      return {
        table: {
          widths: ['30%', '10%', '60%'],
          body: this.antecFamiliaresOdont(antecedenteFamiliar),

        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  antecFamiliaresOdont(antecedenteFamiliar) {
    var body = [];

    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 3,fillColor: '#e8e6e6', text: 'ANTECEDENTES FAMILIARES', bold: true }, {}, {});
    body.push(titulo);

    var hipertension = [];
    hipertension.push(
      { fontSize: 8, text: 'Hipertensión' },
      { fontSize: 8, text: (antecedenteFamiliar.hipertension ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionHipertension });
    body.push(hipertension);


    var diabetes = [];
    diabetes.push(
      { fontSize: 8, text: 'Diabetes' },
      { fontSize: 8, text: (antecedenteFamiliar.diabetes ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionDiabetes });

    body.push(diabetes);



    var cardiovasculares = [];
    cardiovasculares.push(
      { fontSize: 8, text: 'Cardiovasculares' },
      { fontSize: 8, text: (antecedenteFamiliar.cardiovasculares ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionCardiovasculares });

    body.push(cardiovasculares);




    var otroTipoCancer = [];
    otroTipoCancer.push(
      { fontSize: 8, text: 'Cáncer' },
      { fontSize: 8, text: (antecedenteFamiliar.otroTipoCancer ? 'SI' : 'NO') },
      { fontSize: 8, text: antecedenteFamiliar.observacionOtroTipoCancer });

    body.push(otroTipoCancer);


    return body;
  }

  tablaParaclinicos(resultadoApoyoDX, resultadoImagenologia, resultadoLaboratorio) {
    try {
      if (resultadoApoyoDX.length != 0 || resultadoImagenologia.length != 0 || resultadoLaboratorio.length != 0) {
        return {
          table: {
            widths: ['15%', '25%', '20%', '20%', '20%'],
            body: this.resultadoParaclinicos(resultadoApoyoDX, resultadoImagenologia, resultadoLaboratorio)
          }, layout: {
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

  resultadoParaclinicos(resultadoApoyoDX: ResultadoApoyoDX[], resultadoImagenologia: ResultadoImagenologia[], resultadoLaboratorio: ResultadoLaboratorio[]) {

    var body = [];
    var encabezado = [];
    var titulo = [];


    titulo.push(
      { fontSize: 8, bold: true, colSpan: 5, fillColor: '#cfcfcf', text: 'PARACLINICOS' },
      {},
      {},
      {});

    body.push(titulo);

    encabezado.push(
      { fontSize: 8, text: 'CODIGO' },
      { fontSize: 8, text: 'CUP' },
      { fontSize: 8, text: 'RESULTADO' },
      { fontSize: 8, text: 'DESCRIPCIÓN' },
      { fontSize: 8, text: 'FECHA' });

    body.push(encabezado);

    if (resultadoApoyoDX.length > 0) {
      resultadoApoyoDX.forEach(e => {
        var fecha = e.fechaResultado == null ? '' : moment(e.fechaResultado).format("DD-MM-YYYY");
        body.push([{ fontSize: 8, text: e.cup.codigo },
        { fontSize: 8, text: e.cup.descripcion },
        { fontSize: 8, text: "" },
        { fontSize: 8, text: e.descripcionResultado },
        { fontSize: 8, text: fecha }]);
      });
    }

    if (resultadoImagenologia.length > 0) {
      resultadoImagenologia.forEach(e => {
        var fecha = e.fechaResultado == null ? '' : moment(e.fechaResultado).format("DD-MM-YYYY");
        body.push([{ fontSize: 8, text: e.cup.codigo },
        { fontSize: 8, text: e.cup.descripcion },
        { fontSize: 8, text: e.resultado },
        { fontSize: 8, text: e.descripcionResultado },
        { fontSize: 8, text: fecha }]);
      });
    }

    if (resultadoLaboratorio.length > 0) {
      resultadoLaboratorio.forEach(e => {
        var fecha = e.fechaResultado == null ? '' : moment(e.fechaResultado).format("DD-MM-YYYY");
        body.push([{ fontSize: 8, text: e.cup.codigo },
        { fontSize: 8, text: e.cup.descripcion },
        { fontSize: 8, text: e.resultado },
        { fontSize: 8, text: e.descripcionResultado },
        { fontSize: 8, text: fecha }]);
      });
    }



    return body;
  }

  datosHCUnificado(HC) {

    var body = [];


    body.push(
      [
        { fontSize: 8, bold: true, text: 'Medico que atendió' },
        { fontSize: 8, bold: true, text: 'Registro Medico' },
        { fontSize: 8, bold: true, text: 'Especialidad' },
      ],
      [
        { fontSize: 8, text: HC.profesional.nombres + ' ' + HC.profesional.apellidos },
        { fontSize: 8, text: HC.profesional.registroMedico == null ? " " : HC.profesional.registroMedico },
        { fontSize: 8, text: HC.especialidad['descripcion'] },

      ]
    )

    if (this.reimpresion.datoAsociado != undefined && this.reimpresion.datoAsociado != null) {
      body.push(
        [
          { fontSize: 8, bold: true, text: 'Profesional Asociado' },
          { fontSize: 8, bold: true, text: 'Registro Medico' },
          { fontSize: 8, bold: true, text: 'Especialidad' },
        ],
        [
          { fontSize: 8, text: this.reimpresion.datoAsociado.nombre },
          { fontSize: 8, text: this.reimpresion.datoAsociado.registroMedico },
          { fontSize: 8, text: this.reimpresion.datoAsociado.especialidad },
        ]
      )
    }

    body.push(
      [
        { fontSize: 8, bold: true, text: 'Fecha apertura' },
        { fontSize: 8, bold: true, text: 'Fecha cierre' },
        { fontSize: 8, bold: true, text: 'Fecha impresión' },
      ],
      [
        { fontSize: 8, text: HC.citaImpresion == null ? moment(HC.fechaCreacion).format("DD-MM-YYYY") : HC.citaImpresion.horaApertura == null || HC.citaImpresion.horaApertura == "" ? moment(HC.fechaCreacion).format("DD-MM-YYYY") : HC.citaImpresion.horaApertura },
        { fontSize: 8, text: HC.citaImpresion == null ? moment(HC.fechaCreacion).format("DD-MM-YYYY") : HC.citaImpresion.horaCierre == null || HC.citaImpresion.horaCierre == "" ? moment(HC.fechaCreacion).format("DD-MM-YYYY") : HC.citaImpresion.horaCierre },
        { fontSize: 8, text: moment(this.fechahoy).format("DD-MM-YYYY") },
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Sede:' + HC.sede['descripcion'] }
      ]
    )

    try {
      return {
        table: {
          widths: ['40%', '30%', '30%'],
          body: body
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  listadoOrdenamiento(ordenamiento) {

    var body = [];
    try {
      if (ordenamiento.length > 0) {
        var encabezado = [];
        encabezado.push(
          { fontSize: 8, text: 'Código', bold: true },
          { fontSize: 8, text: 'Nombre', bold: true },
          { fontSize: 8, text: 'Fecha', bold: true },
          { fontSize: 8, text: 'Realizado', bold: true });

        body.push(encabezado);

        ordenamiento.forEach(e => {
          var impresion = [];
          impresion.push(
            { fontSize: 8, text: e.codigo },
            { fontSize: 8, text: e.descrpcion },
            { fontSize: 8, text: moment(e.fechaCreacion).format("DD-MM-YYYY") },
            { fontSize: 8, text: e.realizado ? "SI" : "NO" }
          );
          body.push(impresion);
        });
      }
    } catch (error) {

    }
    return body;
  }

  impresionDiagnosticaProcedimiento(diagnosticos) {

    var body = [];
    try {
      if (diagnosticos.length > 0) {
        var encabezado = [];

        encabezado.push(
          { fontSize: 8, text: '¿Principal?', bold: true },
          { fontSize: 8, text: 'Codigo', bold: true },
          { fontSize: 8, text: 'Diagnóstico', bold: true });

        body.push(encabezado);

        diagnosticos.forEach(e => {
          var impresion = [];
          impresion.push(
            { fontSize: 8, text: e.dx ? "SI" : "NO" },
            { fontSize: 8, text: e.codigo },
            { fontSize: 8, text: e.descripcion }
          );
          body.push(impresion);
        });
      } else {
        var encabezado = [];
        encabezado.push(
          { fontSize: 8, text: '¿Principal?', bold: true },
          { fontSize: 8, text: 'Codigo', bold: true },
          { fontSize: 8, text: 'Diagnóstico', bold: true });
        body.push(encabezado);

      }
    } catch (error) {
      var encabezado = [];
      encabezado.push(
        { fontSize: 8, text: '¿Principal?', bold: true },
        { fontSize: 8, text: 'Codigo', bold: true },
        { fontSize: 8, text: 'Diagnóstico', bold: true });
      body.push(encabezado);

    }
    return body;
  }

  tablaExamen(prueba: examenPruebaRapida) {

    var bodyVar = this.pruebaResultado(prueba);
    try {
      if (bodyVar.length > 0) {
        return {
          table: {
            widths: ['30%', '10%', '20%', '10%', '20%', '10%'],
            body: bodyVar
          }, layout: {
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

  pruebaResultado(prueba: examenPruebaRapida) {
    var body = [];
    if (prueba != null) {
      if (prueba.resultadoVIH != null && prueba.resultadoVIH != "" && prueba.resultadoVIH != "SIN DATOS") {
        body.push([
          { fontSize: 8, bold: true, text: 'Resultado prueba rápida VIH:' },
          { fontSize: 8, text: prueba.resultadoVIH },
          { fontSize: 8, bold: true, text: 'Fecha resultado:' },
          { fontSize: 8, text: moment(prueba.fechaResultadoVIH).format("DD-MM-YYYY") },
          { fontSize: 8, bold: true, text: 'Lote:' },
          { fontSize: 8, text: prueba.loteVIH },
        ]);
      }

      if (prueba.resultadoSifilis != null && prueba.resultadoSifilis != "" && prueba.resultadoSifilis != "SIN DATOS") {
        body.push([
          { fontSize: 8, bold: true, text: 'Resultado prueba rápida Sífilis:' },
          { fontSize: 8, text: prueba.resultadoSifilis },
          { fontSize: 8, bold: true, text: 'Fecha resultado:' },
          { fontSize: 8, text: moment(prueba.fechaResultadoSifilis).format("DD-MM-YYYY") },
          { fontSize: 8, bold: true, text: 'Lote:' },
          { fontSize: 8, text: prueba.loteSifilis },
        ]);
      }
    }


    return body;
  }


  antecedentesEstomatologico(examenEstologicos) {
    var body = [];
    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', text: '\nEXAMEN ESTOMATOLOGICO', bold: true }, {}, {});
    body.push(titulo);

    var atm = [];
    atm.push(
      { fontSize: 8, text: 'ATM' },
      { fontSize: 8, text: (examenEstologicos.atm ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionAtm });
    body.push(atm);

    var lineaMediaFacial = [];
    lineaMediaFacial.push(
      { fontSize: 8, text: 'Linea media facial' },
      { fontSize: 8, text: examenEstologicos.lineaMediaFacial },
      { fontSize: 8, text: examenEstologicos.observacionLineaMediaFacial });

    body.push(lineaMediaFacial);

    var surcosVestibulares = [];
    surcosVestibulares.push(
      { fontSize: 8, text: 'Surcos vestibulares' },
      { fontSize: 8, text: (examenEstologicos.surcosVestibulares ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionSurcosVestibulares });

    body.push(surcosVestibulares);

    var labioSuperior = [];
    labioSuperior.push(
      { fontSize: 8, text: 'Labio superior' },
      { fontSize: 8, text: (examenEstologicos.labioSuperior ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionLabioSuperior });

    body.push(labioSuperior);

    var labioInferior = [];
    labioInferior.push(
      { fontSize: 8, text: 'Labio inferior' },
      { fontSize: 8, text: (examenEstologicos.labioInferior ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionLabioInferior });

    body.push(labioInferior);

    var frenilloLabialSuperior = [];
    frenilloLabialSuperior.push(
      { fontSize: 8, text: 'Frenillo labial superior' },
      { fontSize: 8, text: (examenEstologicos.frenilloLabialSuperior ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionFrenilloLabialSuperior });

    body.push(frenilloLabialSuperior);

    var frenilloLabialInferior = [];
    frenilloLabialInferior.push(
      { fontSize: 8, text: 'Frenillo labial inferior' },
      { fontSize: 8, text: (examenEstologicos.frenilloLabialInferior ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionFrenilloLabialInferior });

    body.push(frenilloLabialInferior);

    var comisuras = [];
    comisuras.push(
      { fontSize: 8, text: 'Comisuras' },
      { fontSize: 8, text: (examenEstologicos.comisuras ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionComisuras });

    body.push(comisuras);

    var carrillo = [];
    carrillo.push(
      { fontSize: 8, text: 'Carrillo' },
      { fontSize: 8, text: (examenEstologicos.carrillo ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionCarrillo });

    body.push();

    var paladarDuro = [];
    paladarDuro.push(
      { fontSize: 8, text: 'Paladar duro' },
      { fontSize: 8, text: (examenEstologicos.paladarDuro ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionPaladarDuro });

    body.push(paladarDuro);

    var uvula = [];
    uvula.push(
      { fontSize: 8, text: 'Úvula' },
      { fontSize: 8, text: (examenEstologicos.uvula ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionUvula });

    body.push(uvula);

    var pisoBoca = [];
    pisoBoca.push(
      { fontSize: 8, text: 'Piso boca' },
      { fontSize: 8, text: (examenEstologicos.pisoBoca ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionPisoBoca });

    body.push(pisoBoca);

    var frenilloLingual = [];
    frenilloLingual.push(
      { fontSize: 8, text: 'Frenillo lingual' },
      { fontSize: 8, text: (examenEstologicos.frenilloLingual ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionFrenilloLingual });

    body.push(frenilloLingual);

    var lengua = [];
    lengua.push(
      { fontSize: 8, text: 'Lengua' },
      { fontSize: 8, text: (examenEstologicos.lengua ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionLengua });

    body.push(lengua);

    var sistemaLinfatico = [];
    sistemaLinfatico.push(
      { fontSize: 8, text: 'Sistema linfático' },
      { fontSize: 8, text: (examenEstologicos.sistemaLinfatico ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionSistemaLinfatico });

    body.push(sistemaLinfatico);

    var mucosaOral = [];
    mucosaOral.push(
      { fontSize: 8, text: 'Mucosa oral' },
      { fontSize: 8, text: (examenEstologicos.mucosaOral ? 'SI' : 'NO') },
      { fontSize: 8, text: examenEstologicos.observacionMucosaOral });

    body.push(mucosaOral);

    return body;
  }

  antecedentesOclusal(examenOclusal) {
    var body = [];

    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', text: '\nEXAMEN OCLUSAL', bold: true }, {}, {});
    body.push(titulo);

    var edentulo = [];
    edentulo.push(
      { fontSize: 8, text: 'Edentulo' },
      { fontSize: 8, text: (examenOclusal.edentulo ? 'SI' : 'NO') },
      { fontSize: 8, text: examenOclusal.observacionEdentulo });
    body.push(edentulo);

    var clasificacionAngle = [];
    clasificacionAngle.push(
      { fontSize: 8, text: 'Clasificación Angle' },
      { fontSize: 8, text: examenOclusal.clasificacionAngle },
      { fontSize: 8, text: examenOclusal.observacionAngle });
    body.push(clasificacionAngle);

    var lineaMDental = [];
    lineaMDental.push(
      { fontSize: 8, text: 'Linea Media Dental' },
      { fontSize: 8, text: examenOclusal.lineaMDental ? 'SI' : 'NO' },
      { fontSize: 8, text: examenOclusal.observacionLineaDental });
    body.push(lineaMDental);

    var mordidaCruzada = [];
    mordidaCruzada.push(
      { fontSize: 8, text: 'Mordida Cruzada' },
      { fontSize: 8, text: examenOclusal.mordidaCruzada ? 'SI' : 'NO' },
      { fontSize: 8, text: examenOclusal.observacionMordidaCruzada });
    body.push(mordidaCruzada);

    var arcoDental = [];
    arcoDental.push(
      { fontSize: 8, text: 'Arco dental' },
      { fontSize: 8, text: examenOclusal.arcoDental ? 'SI' : 'NO' },
      { fontSize: 8, text: examenOclusal.observacionArcoDental });
    body.push(arcoDental);

    var dienteIncluido = [];
    dienteIncluido.push(
      { fontSize: 8, text: 'Diente Incluido' },
      { fontSize: 8, text: examenOclusal.dienteIncluido ? 'SI' : 'NO' },
      { fontSize: 8, text: examenOclusal.observacionDienteIncluido });
    body.push(dienteIncluido);

    var edentuloParcialTotal = [];
    edentuloParcialTotal.push(
      { fontSize: 8, text: 'Tipo Edentulo:' },
      { fontSize: 8, text: examenOclusal.edentuloParcialTotal },
      { fontSize: 8, text: examenOclusal.observacionPacialTotal });
    body.push(edentuloParcialTotal);

    var tipoDentision = [];
    tipoDentision.push(
      { fontSize: 8, text: 'Tipo Dentición:' },
      { fontSize: 8, text: examenOclusal.tipoDentision },
      { fontSize: 8, text: examenOclusal.observacionTipoDentision });
    body.push(tipoDentision);

    var perfil = [];
    perfil.push(
      { fontSize: 8, text: 'Perfil' },
      { fontSize: 8, text: examenOclusal.perfil },
      { fontSize: 8, text: examenOclusal.observacionPerfil });
    body.push(perfil);


    var mordida = [];
    mordida.push(
      { fontSize: 8, text: 'Mordida' },
      { fontSize: 8, text: examenOclusal.mordida },
      { fontSize: 8, text: examenOclusal.observacionMordida });
    body.push(mordida);

    var dienteImpactado = [];
    dienteImpactado.push(
      { fontSize: 8, text: 'Diente Impactado' },
      { fontSize: 8, text: examenOclusal.dienteImpactado ? 'SI' : 'NO' },
      { fontSize: 8, text: examenOclusal.observacionDienteImpactado });
    body.push(dienteImpactado);

    var supernumerario = [];
    supernumerario.push(
      { fontSize: 8, text: 'Supernumerario' },
      { fontSize: 8, text: examenOclusal.supernumerario ? 'SI' : 'NO' },
      { fontSize: 8, text: examenOclusal.observacionSupernumerario });
    body.push(supernumerario);


    var crecimientoDesarrollo = [];
    crecimientoDesarrollo.push(
      { fontSize: 8, text: 'Crecimiento desarrollo' },
      { fontSize: 8, text: examenOclusal.crecimientoDesarrollo ? 'SI' : 'NO' },
      { fontSize: 8, text: examenOclusal.observacionCrecimientoDesarrollo });
    body.push(crecimientoDesarrollo);

    var otros = [];
    otros.push(
      { fontSize: 8, text: 'Otros' },
      { fontSize: 8, colSpan: 2, text: examenOclusal.otros },
      {});
    body.push(otros);
    return body;
  }

  antecedentesHabitoOral(habitoOral) {
    var body = [];
    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', text: '\nHÁBITO ORAL', bold: true }, {}, {});
    body.push(titulo);

    var respiradorOral = [];
    respiradorOral.push(
      { fontSize: 8, text: 'Respirador oral' },
      { fontSize: 8, text: (habitoOral.respiradorOral ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionRespiradorOral });
    body.push(respiradorOral);

    var succionDigital = [];
    succionDigital.push(
      { fontSize: 8, text: 'Succión digital' },
      { fontSize: 8, text: (habitoOral.succionDigital ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionSuccionDigital });
    body.push(succionDigital);


    var biberon = [];
    biberon.push(
      { fontSize: 8, text: 'Biberon' },
      { fontSize: 8, text: (habitoOral.biberon ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionBiberon });
    body.push(biberon);

    var bruxismo = [];
    bruxismo.push(
      { fontSize: 8, text: 'Bruxismo' },
      { fontSize: 8, text: (habitoOral.bruxismo ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionBruxismo });
    body.push(bruxismo);

    var lenguaProtactil = [];
    lenguaProtactil.push(
      { fontSize: 8, text: 'Lengua protráctil' },
      { fontSize: 8, text: (habitoOral.lenguaProtactil ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionLenguaProtactil });
    body.push(lenguaProtactil);

    var queilofagia = [];
    queilofagia.push(
      { fontSize: 8, text: 'Queilofagia' },
      { fontSize: 8, text: (habitoOral.queilofagia ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionQueilofagia });
    body.push(queilofagia);

    var succionDedo = [];
    succionDedo.push(
      { fontSize: 8, text: 'Succión dedo' },
      { fontSize: 8, text: (habitoOral.succionDedo ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionSuccionDedo });
    body.push(succionDedo);


    var tetero = [];
    tetero.push(
      { fontSize: 8, text: 'Tetero' },
      { fontSize: 8, text: (habitoOral.tetero ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionTetero });
    body.push(tetero);

    var fumador = [];
    fumador.push(
      { fontSize: 8, text: 'Fumador' },
      { fontSize: 8, text: (habitoOral.fumador ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionFumador });
    body.push(fumador);

    var onicofagia = [];
    onicofagia.push(
      { fontSize: 8, text: 'Onicofagia' },
      { fontSize: 8, text: (habitoOral.onicofagia ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionOnicofagia });
    body.push(onicofagia);


    var succionLabial = [];
    succionLabial.push(
      { fontSize: 8, text: 'Succión labial' },
      { fontSize: 8, text: (habitoOral.succionLabial ? 'SI' : 'NO') },
      { fontSize: 8, text: habitoOral.observacionSuccionLabial });
    body.push(succionLabial);

    var otros = [];
    otros.push(
      { fontSize: 8, text: 'Otros' },
      { fontSize: 8, colSpan: 2, text: habitoOral.otros },
      {});
    body.push(otros);

    return body;
  }

  antecedentesHabitosHigieneOral(habitosHigieneOral) {
    var body = [];
    var titulo = [];
    titulo.push(
      { fontSize: 8, colSpan: 4, fillColor: '#cfcfcf', text: '\nHÁBITOS DE HIGINE ORAL', bold: true },
      {},
      {},
      {});
    body.push(titulo);

    var usoSedaDentalDia = [];
    usoSedaDentalDia.push(
      { fontSize: 8, text: '' },
      { fontSize: 8, text: '' },
      { fontSize: 8, text: '¿Cuantas veces al dia?' },
      { fontSize: 8, text: '¿Meta?' });
    body.push(usoSedaDentalDia);

    var usoSedaDentalDia = [];
    usoSedaDentalDia.push(
      { fontSize: 8, text: '¿Uso de seda dental?' },
      { fontSize: 8, text: (habitosHigieneOral.usoSedaDentalDia ? 'SI' : 'NO') },
      { fontSize: 8, text: habitosHigieneOral.numeroUsoSedaDentalDia },
      { fontSize: 8, text: habitosHigieneOral.metaSedaDentalDia });
    body.push(usoSedaDentalDia);

    var cepilladoDia = [];
    cepilladoDia.push(
      { fontSize: 8, text: '¿Cepilla sus dientes?' },
      { fontSize: 8, text: (habitosHigieneOral.cepilladoDia ? 'SI' : 'NO') },
      { fontSize: 8, text: habitosHigieneOral.numeroCepilladoDia },
      { fontSize: 8, text: habitosHigieneOral.metaCepilladoDia });
    body.push(cepilladoDia);


    var usaCremaDentalFluoral = [];
    usaCremaDentalFluoral.push(
      { fontSize: 8, text: '¿Usa crema dental con fluor?' },
      { fontSize: 8, text: (habitosHigieneOral.usaCremaDentalFluoral ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 2, text: 'Recomendaciones:' + habitosHigieneOral.recomendacionUsaCremaDentalFluoral },
      {});
    body.push(usaCremaDentalFluoral);


    var usoEnjuageBucal = [];
    usoEnjuageBucal.push(
      { fontSize: 8, text: 'Uso de enjuague bucal' },
      { fontSize: 8, text: (habitosHigieneOral.usoEnjuageBucal ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 2, text: habitosHigieneOral.numeroUsoEnjuageBucal },
      {});
    body.push(usoEnjuageBucal);

    return body;
  }

  antecedentesPulpar(examenPulpar) {
    var body = [];

    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', text: '\nEXAMEN PULPAR', bold: true }, {}, {});
    body.push(titulo);

    var alteracionVitalidad = [];
    alteracionVitalidad.push(
      { fontSize: 8, text: 'Alteración vitalidad' },
      { fontSize: 8, text: (examenPulpar.alteracionVitalidad ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPulpar.observacionAlteracionVitalidad });
    body.push(alteracionVitalidad);

    var sensibilidad = [];
    sensibilidad.push(
      { fontSize: 8, text: 'Sensibilidad' },
      { fontSize: 8, text: (examenPulpar.sensibilidad ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPulpar.observacionSensibilidad });
    body.push(sensibilidad);


    var dolorPercusion = [];
    dolorPercusion.push(
      { fontSize: 8, text: 'Dolor percusión' },
      { fontSize: 8, text: (examenPulpar.dolorPercusion ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPulpar.observacionDolorPercusion });
    body.push(dolorPercusion);

    var cambioColor = [];
    cambioColor.push(
      { fontSize: 8, text: 'Cambio color' },
      { fontSize: 8, text: (examenPulpar.cambioColor ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPulpar.observacionCambioColor });
    body.push(cambioColor);

    var fistula = [];
    fistula.push(
      { fontSize: 8, text: 'Fistula' },
      { fontSize: 8, text: (examenPulpar.fistula ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPulpar.observacionFistula });
    body.push(fistula);

    var dienteTratado = [];
    dienteTratado.push(
      { fontSize: 8, text: 'Diente tratado endodonticamente' },
      { fontSize: 8, text: (examenPulpar.dienteTratado ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPulpar.observacionDienteTratado });
    body.push(dienteTratado);

    var otros = [];
    otros.push(
      { fontSize: 8, text: 'Otros' },
      { fontSize: 8, colSpan: 2, text: examenPulpar.otros },
      {});
    body.push(otros);
    return body;
  }

  antecedentesPeriodontal(examenPeriodontal) {
    var body = [];
    var titulo = [];
    titulo.push({ fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', text: '\nEXAMEN PERIODONTAL', bold: true }, {}, {});
    body.push(titulo);

    var calculos = [];
    calculos.push(
      { fontSize: 8, text: 'Cálculo Dental' },
      { fontSize: 8, text: (examenPeriodontal.calculos ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPeriodontal.observacionCalculos });
    body.push(calculos);


    var inflamacionGingival = [];
    inflamacionGingival.push(
      { fontSize: 8, text: 'Inflamación gingival' },
      { fontSize: 8, text: (examenPeriodontal.inflamacionGingival ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPeriodontal.observacionInflamacionGingival });
    body.push(inflamacionGingival);

    var movilidad = [];
    movilidad.push(
      { fontSize: 8, text: 'Movilidad Dental' },
      { fontSize: 8, text: (examenPeriodontal.movilidad ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPeriodontal.observacionMovilidad });
    body.push(movilidad);

    var perdidaOsea = [];
    perdidaOsea.push(
      { fontSize: 8, text: 'Perdida osea' },
      { fontSize: 8, text: (examenPeriodontal.perdidaOsea ? 'SI' : 'NO') },
      { fontSize: 8, text: examenPeriodontal.observacionPerdidaOsea });
    body.push(perdidaOsea);

    var observaciones = [];
    observaciones.push(
      { fontSize: 8, text: 'Observaciones' },
      { fontSize: 8, colSpan: 2, text: examenPeriodontal.observaciones },
      {});
    body.push(observaciones);
    return body;
  }

  tablaOdenamientoOdontologia(ordenamiento) {
    if (ordenamiento.length > 0) {
      return {
        table: {
          widths: ['5%', '35%', '35%', '20%', '5%'],
          body: this.ordenamientoOdontologia(ordenamiento)
        }, layout: {
          defaultBorder: true
        },
      };
    } else {
      return '';
    }
  }

  ordenamientoOdontologia(ordenamiento) {
    var body = [];
    var encabezado = [];
    var titulo = [];

    titulo.push(
      { fontSize: 8, bold: true, colSpan: 5, fillColor: '#cfcfcf', text: 'ORDENAMIENTO' },
      {},
      {},
      {},
      {});

    body.push(titulo);

    encabezado.push(
      { fontSize: 8, text: 'Diente' },
      { fontSize: 8, text: 'DX' },
      { fontSize: 8, text: 'Cups' },
      { fontSize: 8, text: 'Observación' },
      { fontSize: 8, text: 'Cant.' });

    body.push(encabezado);

    if (ordenamiento.length > 0) {
      ordenamiento.forEach(e => {
        
        var ordenamiento = [];
        ordenamiento.push(
          { fontSize: 8, text: e.diente },
          { fontSize: 8, text: e.diagnostico == null ? "" : e.diagnostico.codigo + " | " + e.diagnostico.diagnostico },
          { fontSize: 8, text: e.cup.codigo + " | " + e.cup.descripcion },
          { fontSize: 8, text: e.nota },
          { fontSize: 8, text: e.cup.cantidad }
        );
        body.push(ordenamiento);
      });
    }
    return body;
  }


  impresionDiagnosticoOdontologica(diagnostico) {
    try {
      return {
        table: {
          widths: ['10%', '10%', '10%', '40%', '30%'],
          body: this.impresionDiagnosticaOdontologia(diagnostico)
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

  impresionDiagnosticaOdontologia(diagnostico) {
    var body = [];
    if (diagnostico.length > 0) {
      var encabezado = [];

      encabezado.push(
        { fontSize: 8, text: '¿Principal?', bold: true },
        { fontSize: 8, text: 'Diente', bold: true },
        { fontSize: 8, text: 'Cod', bold: true },
        { fontSize: 8, text: 'Descripción', bold: true },
        { fontSize: 8, text: 'Observación', bold: true });

      body.push(encabezado);

      diagnostico.forEach(e => {
        var impresion = [];
        impresion.push(
          { fontSize: 8, text: e.dx ? "SI" : "NO" },
          { fontSize: 8, text: e.diente },
          { fontSize: 8, text: e.codigo },
          { fontSize: 8, text: e.descripcion },
          { fontSize: 8, text: e.observaciones }
        );
        body.push(impresion);
      });
    }
    return body;
  }

  odontogramaOdontologia(diente, imagen) {
    if (diente.dientes.length == 0 || imagen == "" || imagen == undefined) {
      return '';
    } else {
      return {
        table: {
          widths: ['100%'],
          body: [
            [
              {
                fontSize: 8,
                bold: true, fillColor: '#cfcfcf',
                text: '\nODONTOGRAMA\n',
              }
            ],
            [
              {
                stack: [
                  {
                    image: imagen,
                    alignment: 'center',
                    width: 550,
                    height: 350,
                  }
                ]
              }
            ],
          ]
        },
        layout: {
          defaultBorder: false
        },
      };
    }
  }

  indicadorPlacaOdontologia(diente, imagen) {

    if (diente.length == 0 || imagen == "" || imagen == undefined) {
      return '';
    } else {
      return {
        table: {
          widths: ['100%'],
          body: [
            [
              {
                fontSize: 8,
                bold: true, fillColor: '#cfcfcf',
                text: '\nINDICADOR PLACA\n',
              }
            ],
            [
              {
                stack: [
                  {
                    image: imagen,
                    alignment: 'center',
                    width: 550,
                    height: 350,
                  }
                ]
              }
            ],
          ]
        },
        layout: {
          defaultBorder: false
        },
      };
    }
  }

  tablaEvolucion(evolucion) {
    if (evolucion.length > 0) {
      return {
        table: {
          widths: ['5%', '20%', '35%', '10%', '30%'],
          body: this.evolucion(evolucion)
        }, layout: {
          defaultBorder: true
        },
      };
    } else {
      return '';
    }
  }

  evolucion(evolucion) {
    var body = [];
    var encabezado = [];
    var titulo = [];

    titulo.push(
      { fontSize: 8, bold: true, colSpan: 5, fillColor: '#cfcfcf', text: 'EVOLUCION' },
      {},
      {},
      {},
      {});

    body.push(titulo);

    encabezado.push(
      { fontSize: 8, text: 'Diente' },
      { fontSize: 8, text: 'DX' },
      { fontSize: 8, text: 'Cups' },
      { fontSize: 8, text: 'Cant.' },
      { fontSize: 8, text: 'Medico' });

    body.push(encabezado);

    evolucion.forEach(e => {
      body.push(
        [
          { fontSize: 8, text: e.diente },
          { fontSize: 8, text: e.diagnostico == null ? "" : (e.diagnostico.codigo == null ? "" : e.diagnostico.codigo + " | ") + e.diagnostico.descripcion },
          { fontSize: 8, text: e.cup.codigo == null ? '' : e.cup.codigo + " | " + e.cup.descripcion },
          { fontSize: 8, text: e.cantidad },
          { fontSize: 8, text: e.profesional.nombres + e.profesional.apellidos }],
        [
          { fontSize: 8, colSpan: 5, text: e.observacion },
          {},
          {}, {}, {},
        ]);
    });
    return body;

  }

  agudezaVisual(hc: HCMorbilidad) {

    try {
      return {
        table: {
          widths: ['40%', '30%', '30%'],
          body: [
            [
              { fontSize: 8, colSpan: 3, fillColor: '#cfcfcf', bold: true, text: 'AGUDEZA VISUAL Y AUDITIVA' },
              {},
              {},
            ],
            [
              { fontSize: 8, bold: true, text: 'Diagnóstico Visual' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.visualDiagnosticoId == 67 ? 'EXAMEN DE OJOS Y DE LA VISIÓN Z010' : '' },
              {}
            ],
            [
              { fontSize: 8, text: 'Comentarios Agudeza Visual:' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.descripcionVisual },
              {}
            ],
            [
              { fontSize: 8, bold: true, text: 'Ojo Derecho:' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.ojoDerecho },
              {}
            ],
            [
              { fontSize: 8, bold: true, text: 'Ojo Izquierdo:' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.ojoIzquierdo },
              {}
            ],
            [
              { fontSize: 8, bold: true, text: 'Observaciones de Alteraciones:' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.observacionesAlteraciones },
              {}
            ],
            [
              { fontSize: 8, bold: true, text: 'Diagnóstico Oido' },
              { fontSize: 8, colSpan: 2, bold: true, fillColor: '#cfcfcf', text: hc.visualDiagnosticoId == 66 ? 'EXAMEN DE OÍDOS Y DE LA AUDICIÓN Z011' : '' },
              {}
            ],
            [
              { fontSize: 8, text: 'Otoscopia :' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.otoscopia ? "SI" : "NO" },
              {}
            ],
            [
              { fontSize: 8, bold: true, text: 'Otoscopia oído derecho:' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.otoscopiaOidoDerecho },
              {}
            ],
            [
              { fontSize: 8, bold: true, text: 'Otoscopia oído Izquierdo:' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.otoscopiaOidoIzquierdo },
              {}
            ],
            [
              { fontSize: 8, bold: true, text: 'Observaciones de Alteraciones:' },
              { fontSize: 8, colSpan: 2, bold: true, text: hc.observacionesAlteracionesOido },
              {}
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      };
    } catch (error) {
      return '';
    }
  }

}
