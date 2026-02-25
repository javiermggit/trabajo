import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { SaludMental } from 'src/app/Modelos/SaludMental';
//import { SaludMentalService } from '../../salud-mental/salud-mental.service';

@Injectable({
  providedIn: 'root'
})
export class SaludMentalImpresionService {


  constructor(
    //private servicio: SaludMentalService
  ) { }

  impresionPrograma(esPYP, saludMental) {
    try {
      if (esPYP) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(saludMental)
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
  body(saludMental: SaludMental) {
    
    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center', text: 'PROGRAMA SALUD MENTAL', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);

    if (saludMental.antecedentesEnfermedadMental != null && saludMental.contactoInicial != null && saludMental.aparienciaGeneral != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'EVOLUCIÓN DE INGRESO' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Tiene Antecedentes familiares de Enfermedad Mental:' },
          { fontSize: 8, text: saludMental.antecedentesEnfermedadMental ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Parentesco del antecedente familiar:' },
          { fontSize: 8, text: saludMental.parentescoAntecedenteFamiliar.nombre },
          { fontSize: 8, bold: true, text: 'Contacto inicial:' },
          { fontSize: 8, text: saludMental.contactoInicial }
        ],
        [
          { fontSize: 8, bold: true, text: 'Apariencia general:' },
          { fontSize: 8, text: saludMental.aparienciaGeneral },
          { fontSize: 8, bold: true, text: 'Conducta durante la entrevista:' },
          { fontSize: 8, text: saludMental.conductaDuranteEntrevista },
          { fontSize: 8, bold: true, text: 'Pertinencia de la apariencia y conducta:' },
          { fontSize: 8, text: saludMental.pertenciaAparienciaYConducta }
        ],
        [
          { fontSize: 8, bold: true, text: 'Relación con el entrevistador:' },
          { fontSize: 8, text: saludMental.relacionConElEntrevistador },
          { fontSize: 8, bold: true, text: 'Disposición e interés para comunicarse:' },
          { fontSize: 8, text: saludMental.disposicionInteres },
          { fontSize: 8, bold: true, text: 'Flujo general del lenguaje:' },
          { fontSize: 8, text: saludMental.flujoGeneralLenguage }
        ],
        [
          { fontSize: 8, bold: true, text: 'Alteraciones del lenguaje tartamudeo, mutismo, verborrea, etc:' },
          { fontSize: 8, text: saludMental.alteracionesDelLenguaje },
          { fontSize: 8, bold: true, text: 'Tono y contenido del discurso:' },
          { fontSize: 8, text: saludMental.tonoYcontedidoDelLenguaje },
          { fontSize: 8, bold: true, text: 'Relación entre comunicaciones verbales y no verbales:' },
          { fontSize: 8, text: saludMental.relacionVerbalesYnoVerbales }
        ],
        [
          { fontSize: 8, bold: true, text: 'Alteraciones del pensamiento:' },
          { fontSize: 8, text: saludMental.alteracionesDelPensamiento },
          { fontSize: 8, bold: true, text: 'Dificultades motoras:' },
          { fontSize: 8, text: saludMental.dificultadesMotoras },
          { fontSize: 8, bold: true, text: 'Estado de ánimo general:' },
          { fontSize: 8, text: saludMental.estadoGeneralAnimo }
        ],
        [
          { fontSize: 8, bold: true, text: 'Verbalizaciones sobre su estado de ánimo:' },
          { fontSize: 8, text: saludMental.verbalizacionesEstadoAnimo },
          { fontSize: 8, bold: true, text: 'Creencias y expectativas sobre la intervención:' },
          { fontSize: 8, text: saludMental.creenciasSobrelaintervencion },
          { fontSize: 8, bold: true, text: 'Consciencia de la problemática:' },
          { fontSize: 8, text: saludMental.conscienciaDelaProblematica }
        ],
        [
          { fontSize: 8, bold: true, text: 'Ideas sobre las causas del problema:' },
          { fontSize: 8, text: saludMental.ideasSobrelaCausaDelProblema },
          { fontSize: 8, bold: true, text: 'Ideas sobre las posibles soluciones al problema:' },
          { fontSize: 8, text: saludMental.ideaSobbreSolucionProblema },
          {},
          {}
        ]);
    } else {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'DESCRIPCIÓN Y COMPORTAMIENTOS GENERALES' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: '¿Cómo pasa el día?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.comoPasaElDia },
          { fontSize: 8, bold: true, text: '¿Cómo son sus hábitos alimenticios?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.habitosAlimenticio },
          { fontSize: 8, bold: true, text: '¿Cómo es su higiene general?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.higieneGeneral }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Cómo es su vestimenta?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.vestimenta },
          { fontSize: 8, bold: true, text: '¿Está relajado o inquieto?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.relajadoInquieto },
          { fontSize: 8, bold: true, text: '¿Cuál otro?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.otroRelajadoinquieto }
        ],
        [
          { fontSize: 8, bold: true, text: 'Sus actitudes y movimientos ¿tienen una intención o significado?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.actitudesMovimientos ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cuáles?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.cualesMovimientos },
          { fontSize: 8, bold: true, text: '¿Cursa con actitud exagerada, teatral o minimizador?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.actitudExageradaTeatral ? 'SI' : 'NO' }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Sus gestos, expresiones motoras y niveles de actividad son espontáneos?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.gestosExpresionesMotores ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cursa con movimientos involuntarios (temblores, tics, movimientos, otros)?' },
          { fontSize: 8, text: saludMental.comportamientoGenerales.movimientosInvoluntarios ? 'SI' : 'NO' },
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Observación' },
          { fontSize: 8, colSpan: 5, text: saludMental.comportamientoGenerales.observacion },
          {},
          {},
          {},
          {}
        ],
      );
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'LENGUAJE' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: '¿Dice mucho o poco?' },
          { fontSize: 8, text: saludMental.lenguajes.queTantoDice },
          { fontSize: 8, bold: true, text: '¿Habla de forma espontánea o por el contrario solo responde a preguntas?' },
          { fontSize: 8, text: saludMental.lenguajes.formaDeHablar },
          { fontSize: 8, bold: true, text: '¿Habla de manera rápida, ansiosa, sin interrupciones o con repentinos silencios?' },
          { fontSize: 8, text: saludMental.lenguajes.maneraDeHablar }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Cambia de tema con frecuencia?' },
          { fontSize: 8, text: saludMental.lenguajes.cambiaTemaConFrecuencia ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Utiliza de forma adecuada las reglas gramaticales y sintácticas?' },
          { fontSize: 8, text: saludMental.lenguajes.reglasGramaticalesSintacticas ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Cursa con mutismo?' },
          { fontSize: 8, text: saludMental.lenguajes.cursaMutismo ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Cursa con trastornos del ritmo del lenguaje?' },
          { fontSize: 8, text: saludMental.lenguajes.cursaTrastornosRitmoLenguaje },
          { fontSize: 8, bold: true, text: '¿Cursa con trastornos de la articulación del lenguaje?' },
          { fontSize: 8, text: saludMental.lenguajes.cursaTrastornosArticulacionLenguaje },
          {},
          {}
        ],

        [
          { fontSize: 8, bold: true, text: 'Observación' },
          { fontSize: 8, colSpan: 5, text: saludMental.lenguajes.observacion },
          {},
          {},
          {},
          {}
        ]);



      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'ESTADO DE ÁNIMO' },
        {},
        {},
        {},
        {},
        {}
      ],

        [
          { fontSize: 8, bold: true, text: '¿Cómo se siente el día de hoy?' },
          { fontSize: 8, text: saludMental.estadoAnimo.comoSeSienteHoy },
          { fontSize: 8, bold: true, text: '¿Cómo se siente consigo mismo?' },
          { fontSize: 8, text: saludMental.estadoAnimo.comoSeSienteConsigoMismo },
          { fontSize: 8, bold: true, text: '¿Cómo es su estado de ánimo?' },
          { fontSize: 8, text: saludMental.estadoAnimo.estadoAnimo }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Cómo es su humor?' },
          { fontSize: 8, text: saludMental.estadoAnimo.comoEsSuHumor },
          { fontSize: 8, bold: true, text: '¿Llora usted sin motivo?' },
          { fontSize: 8, text: saludMental.estadoAnimo.lloraSinMotivo ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Tiene dificultad para conciliar el sueño?' },
          { fontSize: 8, text: saludMental.estadoAnimo.dificultadParaConciliarSueno ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Cuándo lo concilia duerme de manera adecuada?' },
          { fontSize: 8, text: saludMental.estadoAnimo.duermeManeraAdecuada ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Despierta a mitad de la noche, después de haber dormido algunas horas y le cuesta conciliar el sueño?' },
          { fontSize: 8, text: saludMental.estadoAnimo.despiertaNoche ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Ha tenido pérdida del lívido?' },
          { fontSize: 8, text: saludMental.estadoAnimo.perdidaLivido ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Ha tenido pérdida del apetito frecuentemente?' },
          { fontSize: 8, text: saludMental.estadoAnimo.perdidaApetitoFrecuentemente ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Ha perdido el interés y de la capacidad de disfrutar de las cosas?' },
          { fontSize: 8, text: saludMental.estadoAnimo.hePerdidoInteresDisfrutar ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Ha tenido pensamientos suicidas?' },
          { fontSize: 8, text: saludMental.estadoAnimo.pensamientoSuicidas ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Lo ha intentado en alguna ocasión o tiene algún plan?' },
          { fontSize: 8, text: saludMental.estadoAnimo.haIntentadoOTienPlan ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Qué planes tiene actualmente y qué le impide llevarlos a cabo?' },
          { fontSize: 8, text: saludMental.estadoAnimo.planesQueImpideLlevarloaCabo },
          { fontSize: 8, bold: true, text: '¿Piensa que la vida no vale la pena ser vivida?' },
          { fontSize: 8, text: saludMental.estadoAnimo.piensaQueLaVidaNoVale ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: 'Observación' },
          { fontSize: 8, colSpan: 5, text: saludMental.estadoAnimo.observacion },
          {},
          {},
          {},
          {}
        ]
      );

      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'CONTENIDO DEL PENSAMIENTO' },
        {},
        {},
        {},
        {},
        {}
      ],

        [
          { fontSize: 8, bold: true, text: '¿Cuáles son sus principales preocupaciones?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.principalesPreocupaciones },
          { fontSize: 8, bold: true, text: '¿Está usted preocupado con su situación vital?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.preocupadoSituacionVital ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Está usted preocupado por su pasado o futuro?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.preocupadoPasadoFuturo ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Está usted preocupado por su seguridad personal o la de otro?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.preocupadoSeguridadPersonal ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Tiene alguna fobia?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.tieneFobia ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Se siente amenazado con lo que rodea?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.sienteAmenazado ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Lo que te rodea atenta contra tu salud o vida?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.sientesAmenazadoContraSalud ? 'Si' : 'No' },
          { fontSize: 8, bold: true, text: '¿Siente que sus pensamientos o sentimientos son controlados por fuerzas externas?' },
          { fontSize: 8, text: saludMental.contenidoPensamiento.pensamientosControlados ? 'Si' : 'No' },
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Observación' },
          { fontSize: 8, colSpan: 5, text: saludMental.contenidoPensamiento.observacion },
          {},
          {},
          {},
          {}
        ]
      );


      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'RENDIMIENTO COGNITIVOS' },
        {},
        {},
        {},
        {},
        {}
      ],

        [
          { fontSize: 8, bold: true, text: 'Grado de activación del sistema nervioso' },
          { fontSize: 8, text: saludMental.rendimientoCognitivos.gradoActivacionSistemaNervioso },
          { fontSize: 8, bold: true, text: '¿Cuál otro?' },
          { fontSize: 8, text: saludMental.rendimientoCognitivos.otroComoSeEncuentra },
          { fontSize: 8, bold: true, text: '¿Paciente se encuentra ubicado en tiempo, espacio y lugar ?' },
          { fontSize: 8, text: saludMental.rendimientoCognitivos.pacienteSeEncuentraUbicado }
        ],
        /*    [
             { fontSize: 8, bold: true, text: '¿Hora, día y Año?' },
             { fontSize: 8, text: saludMental.rendimientoCognitivos.horaDiaAnio },
             { fontSize: 8, bold: true, text: '¿Qué día fue ayer?' },
             { fontSize: 8, text: saludMental.rendimientoCognitivos.diaFueAyer },
             { fontSize: 8, bold: true, text: '¿Cuánto es 13 + 3?' },
             { fontSize: 8, text: saludMental.rendimientoCognitivos.cuantoEs }
           ], */
        [
          /* { fontSize: 8, bold: true, text: '¿Realiza usted ejercicios mentales como: crucigrama, sopa de letras, sudoku, ¿entre otros?' },
          { fontSize: 8, text: saludMental.rendimientoCognitivos.ejerciciosMentales ? 'Si': 'No' },
          { fontSize: 8, bold: true, text: '¿Ha sentido falta de concentración o memoria?' },
          { fontSize: 8, text: saludMental.rendimientoCognitivos.faltaConcentracion ? 'Si': 'No' }, */
          { fontSize: 8, bold: true, text: '¿Cómo  es el rendimiento cognitivo del paciente?' },
          { fontSize: 8, text: saludMental.rendimientoCognitivos.rendimientoCognitivo ? 'Si' : 'No' },
          {}, {},
          { fontSize: 8, bold: true, text: '¿Usted es consciente de cuidar su salud con hábitos saludables?' },
          { fontSize: 8, text: saludMental.rendimientoCognitivos.esConcienteCuidarSalud ? 'Si' : 'No' }
        ],
        [
          { fontSize: 8, bold: true, text: 'Observación' },
          { fontSize: 8, colSpan: 5, text: saludMental.rendimientoCognitivos.observacion },
          {},
          {},
          {},
          {}
        ]
      );

      body.push([
        { fontSize: 8, bold: true, colSpan: 6, text: 'VALORACIÓN DEL PROPIO PACIENTE Y SU	PERSPECTIVA' },
        {},
        {},
        {},
        {},
        {}
      ],

        [
          { fontSize: 8, colSpan: 6, text: saludMental.valoracionPaciente.observacion },
          {},
          {},
          {},
          {},
          {}
        ]
      );
    }



    body.push([
      { fontSize: 8, bold: true, colSpan: 6, text: 'SEGUIMINETO AL PROGRAMA DE SALUD MENTAL' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: 'Medicamentos suministrados para el trastorno:' },
        { fontSize: 8, text: saludMental.medicamentosParaElTrastorno },
        { fontSize: 8, bold: true, text: 'Ha tenido Visita Domiciliaria:' },
        { fontSize: 8, text: saludMental.visitaDomiciliaria ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Se Brindo Orientación a la Familia sobre todo el Proceso:' },
        { fontSize: 8, text: saludMental.orientacionFamilia ? "SI" : "NO" }
      ],
      [
        { fontSize: 8, bold: true, text: 'Ha tenido Hospitalización desde su ultima consulta:' },
        { fontSize: 8, text: saludMental.hospitalizacionUltimaConsulta ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Diagnóstico' },
        { fontSize: 8, text: saludMental.diagnosticoUltimaHospitalizacion },
        { fontSize: 8, bold: true, text: 'Fecha Hospitalización:' },
        { fontSize: 8, text: saludMental.fechaultimaHospitalizacion }
      ],
      [
        { fontSize: 8, bold: true, text: 'Clasificación del Tipo de Trastorno de salud Mental:' },
        { fontSize: 8, text: saludMental.trastornoDeSaludMental == null ? "" : saludMental.trastornoDeSaludMental.descripcion },
        { fontSize: 8, bold: true, text: 'Novedad del seguimiento:' },
        { fontSize: 8, text: saludMental.novedadSeguimiento },
        { fontSize: 8, bold: true, text: 'Comentario:' },
        { fontSize: 8, text: saludMental.comentario },
      ],

    );




    return body;
  }

}
