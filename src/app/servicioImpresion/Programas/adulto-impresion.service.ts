import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { FactoresDeRiesgoPsicosocial } from 'src/app/Modelos/Joven';
import { AdultoHC } from 'src/app/Modelos/Modelos';
import { ParametroService } from 'src/app/parametros/parametro.service';

@Injectable({
  providedIn: 'root'
})
export class AdultoImpresionService {

  constructor(
    public par: ParametroService
  ) { }

  impresionPrograma(titulo, esPYP, adultoHC, listadultoPregHijoPadre, datosusuarios, esAdulto: boolean, esFumador: boolean, presionSistolica: number) {

    try {
      if (esPYP) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(titulo, adultoHC, listadultoPregHijoPadre, datosusuarios, esAdulto, esFumador, presionSistolica)
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

  body(tituloName, adulto: AdultoHC, listadultoPregHijoPadre, datosusuarios, esAdulto: boolean, esFumador: boolean, presionSistolica: number) {


    if (adulto.factoresDeRiesgoPsicosocial == null) {
      adulto.factoresDeRiesgoPsicosocial = new FactoresDeRiesgoPsicosocial();
    }

    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, colSpan: 6, fillColor: '#e8e6e6', alignment: 'center', text: tituloName, bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ANTECEDENTES GENERALES' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Personales' },
        { fontSize: 8, text: adulto.antecedentes.personales ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.personalesObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Médicos' },
        { fontSize: 8, text: adulto.antecedentes.medicos ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.medicosObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Cirugías' },
        { fontSize: 8, text: adulto.antecedentes.cirugias ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.cirugiasObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Alergias' },
        { fontSize: 8, text: adulto.antecedentes.alergias ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.alergiasObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Vacunación' },
        { fontSize: 8, text: adulto.antecedentes.vacunacion ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.vacunacionObservacion },
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'DPT' },

      { fontSize: 8, colSpan: 5, text: adulto.antecedentes.dpt ? "Si" : "No" },
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'VPH' },
        { fontSize: 8, colSpan: 5, text: adulto.antecedentes.vph ? "Si" : "No" },
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Discapacidades' },
        { fontSize: 8, text: adulto.antecedentes.discapacidades ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.discapacidadesObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Problemas auditivos y sensoriales' },
        { fontSize: 8, text: adulto.antecedentes.problemasAuditivos ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.problemasAuditivosObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Familiares' },
        { fontSize: 8, text: adulto.antecedentes.familiares ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.familiaresObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Hospitalizaciones' },
        { fontSize: 8, text: adulto.antecedentes.hospitalizaciones ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.hospitalizacionesObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Toxicológicos' },
        { fontSize: 8, text: adulto.antecedentes.toxicologicos ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.toxicologicosObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Traumatológicos' },
        { fontSize: 8, text: adulto.antecedentes.traumatologicos ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.traumatologicosObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Higiene oral' },
        { fontSize: 8, text: adulto.antecedentes.higieneOral ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.higieneOralFecha != null ? moment(adulto.antecedentes.higieneOralFecha).format("DD-MM-YYYY") : "" },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Conciliación medicamentosa' },
        { fontSize: 8, text: adulto.antecedentes.conciliacionMedica ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.conciliacionMedicaObservacion },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Desarrollo puberal, ginecológicos y psicosociales' },
        { fontSize: 8, text: adulto.antecedentes.desarrolloPuberalGinePsico ? "Si" : "No" },
        { fontSize: 8, colSpan: 4, text: adulto.antecedentes.desarrolloPuberalGinePsicoObservacion },
        {},
        {},
        {}
      ]

    )

    if (datosusuarios.sexo == 'F' && esAdulto) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ANTECEDENTES GINECO-OBSTETRICO' },
        {},
        {},
        {},
        {},
        {}
      ], [
        { fontSize: 8, bold: true, text: 'Menarca (Edad)' },
        { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.menarcaEdad },
        { fontSize: 8, bold: true, text: 'Inicio de Relaciones Sexuales' },
        { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.inicioRelacionesSexuales ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Ciclos Menstruales' },
        { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.tipoDeCiclosMenstruales }
      ],
        [
          { fontSize: 8, bold: true, text: 'Número de Compañeros Sexuales' },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.numeroCompraneroSexuales },
          { fontSize: 8, bold: true, text: 'Fecha Último Periodo' },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.fechaUltimaRegla != null ? moment(adulto.antecedentesGinecoObstetricos.fechaUltimaRegla).format('MM-DD-YYYY') : "" },
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Infección por transmisión sexual ' },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.enfermedadTransmision ? "SI" : "NO" },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.enfermedadTransmisionObser },
          { fontSize: 8, bold: true, text: 'Planificación Familiar' },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.planificacionFamiliar ? "SI" : "NO" },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.planificacionFamiliarObser },
        ],
        [
          { fontSize: 8, bold: true, text: 'Citología Vaginal Realizada' },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.citologiaVaginalRealizada ? "SI" : "NO" },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.citologiaVaginalRealizadaObser },
          {},
          {},
          {}

        ],
        [
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, text: adulto.antecedentesGinecoObstetricos.observaciones },
          {},
          {},
          {},
          {}
        ],
      )
    }

    if (datosusuarios.sexo == 'M' && esAdulto) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ANTECEDENTES ANDROLÓGICOS' },
        {},
        {},
        {},
        {},
        {}
      ], [
        { fontSize: 8, bold: true, text: 'Espermarquia' },
        { fontSize: 8, text: adulto.antecedentesAndrologicos.espermarquia ? "SI" : "NO" },
        { fontSize: 8, colSpan: 2, text: adulto.antecedentesAndrologicos.espermarquiaObser },
        {},
        { fontSize: 8, bold: true, text: 'Inicio de Relaciones Sexuales' },
        { fontSize: 8, text: adulto.antecedentesAndrologicos.inicioRelacionesSexuales ? "SI" : "NO" },
      ],
        [
          { fontSize: 8, bold: true, text: 'Infección por transmisión sexual' },
          { fontSize: 8, text: adulto.antecedentesAndrologicos.enfermedadTransmision ? "SI" : "NO" },
          { fontSize: 8, colSpan: 2, text: adulto.antecedentesAndrologicos.enfermedadTransmisionObser },
          {},
          { fontSize: 8, bold: true, text: 'Número de Compañeros Sexuales' },
          { fontSize: 8, text: adulto.antecedentesAndrologicos.numeroCompanerosSexuales },
        ],
        [
          { fontSize: 8, bold: true, text: 'Planificación Familiar' },
          { fontSize: 8, text: adulto.antecedentesAndrologicos.planificacionFamiliar ? "SI" : "NO" },
          { fontSize: 8, colSpan: 4, text: adulto.antecedentesAndrologicos.planificacionFamiliarObser },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, colSpan: 5, text: adulto.antecedentesAndrologicos.observaciones },
          {},
          {},
          {},
          {}
        ]
      )
    }

    if (adulto.factoresDeriesgoParaOrigenDiabetes != null) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'FACTORES DE RIESGO PARA ORIGEN DE DIABETES O RIESGO CARDIOVASCULAR' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: '¿La circunferencia de su cintura, colocando el metro entre el borde infereior de las costillas y el borde superior de la pelvis mida?' },
          { fontSize: 8, text: adulto.factoresDeriesgoParaOrigenDiabetes.circunferencia },
          { fontSize: 8, bold: true, text: '¿Generalmente hace 30 minutos diarios de actividad física en el trabajo y/o durante su tiempo libre?' },
          { fontSize: 8, text: adulto.factoresDeriesgoParaOrigenDiabetes.actividadFisica },
          { fontSize: 8, bold: true, text: '¿Cuántas veces come vegetales o frutas?' },
          { fontSize: 8, text: adulto.factoresDeriesgoParaOrigenDiabetes.comeVegetales }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Toma medicamentos anti-hipertensivos regularmente?' },
          { fontSize: 8, text: adulto.factoresDeriesgoParaOrigenDiabetes.antihipertensivos },
          { fontSize: 8, bold: true, text: '¿Le han encontrado alta glucosa en la sangre (Hiperglucemia)?' },
          { fontSize: 8, text: adulto.factoresDeriesgoParaOrigenDiabetes.glucosaSangre },
          { fontSize: 8, bold: true, text: '¿Tiene miembros de su núcleo familiar o parientes, diagnosticados con diabetes (Tipo 1 o Tipo 2)?' },
          { fontSize: 8, text: adulto.factoresDeriesgoParaOrigenDiabetes.FamiliarDiabetico }
        ],
        [
          { fontSize: 8, bold: true, text: 'Resultado final de riesgo Diabetes' },
          { fontSize: 8, text: adulto.factoresDeriesgoParaOrigenDiabetes.resultados },
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, colSpan: 3, text: adulto.factoresDeriesgoParaOrigenDiabetes.observaciones },
          {},
          {}
        ])
    }

    if (adulto.sexualidad != null && esAdulto) {
      var orientacion = this.par.ListadoOrientacionSexual.filter(x => x.id == adulto.sexualidad.orientacionSexual);
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'DERECHOS SEXUALES Y REPRODUCTIVOS' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: 'Orientación Sexual' },
          { fontSize: 8, colSpan: 2, text: orientacion.length == 0 ? "" : orientacion[0].descripcion },
          {},
          { fontSize: 8, bold: true, text: 'Identidad de género' },
          { fontSize: 8, colSpan: 2, text: adulto.sexualidad.identidadGenero },
          {},
        ]);


      if (adulto.sexualidad.usoMetodosAnticonceptivos && datosusuarios.sexo == 'F') {
        body.push([
          { fontSize: 8, bold: true, text: 'Métodos anticoncepción usados' },
          { fontSize: 8, text: 'Oral:' + (adulto.sexualidad.metodosAnticonceptivos.oral ? "SI" : "NO") },
          { fontSize: 8, text: 'Inyectable:' + (adulto.sexualidad.metodosAnticonceptivos.inyectable ? "SI" : "NO") },
          { fontSize: 8, text: 'Subdermico:' + (adulto.sexualidad.metodosAnticonceptivos.subdermico ? "SI" : "NO") },
          { fontSize: 8, text: 'D.I.U.:' + (adulto.sexualidad.metodosAnticonceptivos.d_I_U ? "SI" : "NO") },
          { fontSize: 8, text: 'Condón:' + (adulto.sexualidad.metodosAnticonceptivos.condon ? "SI" : "NO") },
        ],
          [
            { fontSize: 8, text: 'Estirilación Femenina' + (adulto.sexualidad.metodosAnticonceptivos.esterilizacionFemenina ? "SI" : "NO") },
            { fontSize: 8, text: 'Vasectomia' + (adulto.sexualidad.metodosAnticonceptivos.vasectomia ? "SI" : "NO") },
            { fontSize: 8, text: 'Otros' + (adulto.sexualidad.metodosAnticonceptivos.otros ? "SI" : "NO") },
            { fontSize: 8, colSpan: 3, text: adulto.sexualidad.metodosAnticonceptivos.otros ? adulto.sexualidad.cualesMetodosAnticonceptivos : "" },
            {},
            {},
          ], [
          { fontSize: 8, bold: true, text: 'Si ha tenido dificultades durante las relaciones sexuales' },
          { fontSize: 8, text: adulto.sexualidad.tenidoDificultadesRelaciones ? "SI" : "NO" },
          { fontSize: 8, colSpan: 4, text: adulto.sexualidad.tenidoDificultadesRelaciones ? adulto.sexualidad.cualesTenidoDificultadesRelaciones : "" },
          { fontSize: 8, bold: true, text: 'Ha interrumpido voluntariamente un embarazo' },
          { fontSize: 8, text: adulto.sexualidad.interrupcionVoluntariaEmbarazo ? "SI" : "NO" },
          { fontSize: 8, colSpan: 4, text: adulto.sexualidad.interrupcionVoluntariaEmbarazo ? adulto.sexualidad.interrupcionVoluntariaEmbarazoObser : "" },
        ]);
      }

      if (adulto.sexualidad.usaPreservativo && datosusuarios.sexo == 'M') {
        body.push([
          { fontSize: 8, bold: true, text: 'Usa Preservativo' },
          { fontSize: 8, text: adulto.sexualidad.usaPreservativo ? "SI" : "NO" },
          {},
          {},
          {},
          {},
        ],
          [
            { fontSize: 8, bold: true, text: 'Si ha tenido dificultades durante las relaciones sexuales' },
            { fontSize: 8, text: adulto.sexualidad.tenidoDificultadesRelaciones ? "SI" : "NO" },
            { fontSize: 8, colSpan: 4, text: adulto.sexualidad.tenidoDificultadesRelaciones ? adulto.sexualidad.cualesTenidoDificultadesRelaciones : "" },
            {},
            {},
            {},
          ]);
      }


      body.push(
        [
          { fontSize: 8, bold: true, text: 'Desea tener hijo' },
          { fontSize: 8, text: adulto.sexualidad.deseaTenerHijos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Violencia contra la mujer y/o violencia de género' },
          { fontSize: 8, text: adulto.sexualidad.violenciaContraMujer ? "SI" : "NO" },
          {},
          {},
        ]);
    }

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'FACTORES DE RIESGO PSICOSOCIAL' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Con Quien Vive' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.conQuienVive },
        { fontSize: 8, bold: true, text: 'El Apoyo Afectivo es Dadulto Por' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.apoyoEfectivoEsDadoPor },
        { fontSize: 8, bold: true, text: 'El Apoyo Económico es Dadulto Por' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.apoyoEconomicoEsDadoPor },
      ],
      [
        { fontSize: 8, bold: true, text: 'Ocupación de la Madre' },
        { fontSize: 8, colSpan: 2, text: adulto.factoresDeRiesgoPsicosocial.ocupacionMadre == null ? "" : adulto.factoresDeRiesgoPsicosocial.ocupacionMadre.descripcion },
        {},
        { fontSize: 8, bold: true, text: 'Ocupación del Padre' },
        { fontSize: 8, colSpan: 2, text: adulto.factoresDeRiesgoPsicosocial.ocupacionPadre == null ? "" : adulto.factoresDeRiesgoPsicosocial.ocupacionPadre.descripcion },
        {},
      ],
      [
        { fontSize: 8, bold: true, text: 'La Autoridad en la Casa Esta Dada Por' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.autoridadEnCasaEsDadapor },
        { fontSize: 8, bold: true, text: 'Tiene Antecedentes Judiciales' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.tieneAntecedentesJudiciales ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Tiene un Proyecto de Vida' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.tieneUnProyectoDeVida ? "SI" : "NO" },

      ],
      [
        { fontSize: 8, bold: true, text: 'Tipo de Personalidad' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.tipoDePersonalidad },
        { fontSize: 8, bold: true, text: 'Tiene Hobbies y Aficiones' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.tieneHobbiesYaficiones ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Síntomas Neurovegetativos de Angustia' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.sintomasNeurovegetativosDeAngustia },
      ],
      [
        { fontSize: 8, bold: true, text: 'Tiene o ha Tenido Ideas Suicidas' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.tieneOhaTenidoIdeasSuicidad ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Tiene o ha Tenido Miedos Intensos' },
        { fontSize: 8, text: adulto.factoresDeRiesgoPsicosocial.tieneOhaTenidoMiedosIntensos ? "SI" : "NO" },
        {},
        {},
      ],
      [
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 5, text: adulto.factoresDeRiesgoPsicosocial.observaciones },
        {},
        {},
        {},
        {},
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'PARACLÍNICOS' },
        {},
        {},
        {},
        {},
        {}
      ]
    );

    if (adulto.paraclinicos.fechaResultadoglicemiaBasal != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Glicemia basal' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.glicemiaBasal },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadoglicemiaBasal == null ? '' : moment(adulto.paraclinicos.fechaResultadoglicemiaBasal).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.colesterolAltaDensidad != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Colesterol de Alta densidad HDL 90.3.8.15' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.colesterolAltaDensidad },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadocolesterolAltaDensidad == null ? '' : moment(adulto.paraclinicos.fechaResultadocolesterolAltaDensidad).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.colesterolBajaDensidad != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Colesterol de baja densidad LDL 90.3.8.16' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.colesterolBajaDensidad },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadocolesterolBajaDensidad == null ? '' : moment(adulto.paraclinicos.fechaResultadocolesterolBajaDensidad).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.colesterolTotal != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Colesterol total 90.3.8.18' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.colesterolTotal },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' },
        {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadocolesterolTotal == null ? '' : moment(adulto.paraclinicos.fechaResultadocolesterolTotal).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.triglicerios != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Triglicéridos 90.3.8.73' }, {},
        { fontSize: 8, text: adulto.paraclinicos.triglicerios },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadotriglicerios == null ? '' : moment(adulto.paraclinicos.fechaResultadotriglicerios).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.creatinina != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Creatinina' }, {},
        { fontSize: 8, text: adulto.paraclinicos.creatinina },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadocreatinina == null ? '' : moment(adulto.paraclinicos.fechaResultadocreatinina).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.uroanalisis != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Uroanálisis con sedimento y densidad urinaria' }, {},
        { fontSize: 8, text: adulto.paraclinicos.uroanalisis },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadouroanalisis == null ? '' : moment(adulto.paraclinicos.fechaResultadouroanalisis).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.profilaxisYRemocionDePlacaVac != null) {
      body.push([
        { fontSize: 8, colSpan: 2, bold: true, text: 'Profilaxis y remoción de placa bacteriana' }, {},
        { fontSize: 8, text: adulto.paraclinicos.profilaxisYRemocionDePlacaVac },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadoprofilaxisYRemocionDePlacaVac == null ? '' : moment(adulto.paraclinicos.fechaResultadoprofilaxisYRemocionDePlacaVac).format("DD-MM-YYYY") }
      ]);
    }
    if (adulto.paraclinicos.tienePSA) {
      body.push([
        { fontSize: 8, bold: true, text: 'PSA' },
        { fontSize: 8, colSpan: 2, text: adulto.paraclinicos.psa }, {},
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadoPSA == null ? '' : moment(adulto.paraclinicos.fechaResultadoPSA).format("DD-MM-YYYY") }
      ]);
    }
    if (adulto.paraclinicos.tieneSaludBucal) {
      body.push([
        { fontSize: 8, bold: true, text: 'Salud Bucal' },
        { fontSize: 8, colSpan: 2, text: adulto.paraclinicos.saludBucal }, {},
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: adulto.paraclinicos.fechaConsultaSaludBucal == null ? '' : moment(adulto.paraclinicos.fechaConsultaSaludBucal).format("DD-MM-YYYY") }
      ]);
    }

    if (adulto.paraclinicos.examenMamografia) {
      body.push([
        { fontSize: 8, bold: true, text: 'Examen Mamografia' },
        { fontSize: 8, colSpan: 2, text: adulto.paraclinicos.mamografia }, {},
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: adulto.paraclinicos.fechaResultadoExamenMamografia == null ? '' : moment(adulto.paraclinicos.fechaResultadoExamenMamografia).format("DD-MM-YYYY") }
      ]);
    }

    body.push([
      { fontSize: 8, bold: true, text: 'Se Realizo Examen Rectal' },
      { fontSize: 8, text: adulto.paraclinicos.examenRectal ? 'SI' : 'NO' },
      { fontSize: 8, colSpan: 4, text: adulto.paraclinicos.rectal },
      {},
      {},
      {}
    ]);


    if (adulto.familiograma != null) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'FAMILIOGRAMA' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: 'Papá' },
          { fontSize: 8, text: adulto.familiograma.papa ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Mamá' },
          { fontSize: 8, text: adulto.familiograma.mama ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Materno' },
          { fontSize: 8, text: adulto.familiograma.abueloMaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Abuela Materna' },
          { fontSize: 8, text: adulto.familiograma.abuelaMaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuela Paterna' },
          { fontSize: 8, text: adulto.familiograma.abuelaPaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Paterno' },
          { fontSize: 8, text: adulto.familiograma.abueloPaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Hermanas' },
          { fontSize: 8, text: adulto.familiograma.hermanas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Hermanos' },
          { fontSize: 8, text: adulto.familiograma.hermanos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Tíos' },
          { fontSize: 8, text: adulto.familiograma.tios ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Tías' },
          { fontSize: 8, text: adulto.familiograma.tias ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primos' },
          { fontSize: 8, text: adulto.familiograma.primos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primas' },
          { fontSize: 8, text: adulto.familiograma.primas ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'hijos' },
          { fontSize: 8, text: adulto.familiograma.hijos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'hijas' },
          { fontSize: 8, text: adulto.familiograma.hijas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Esposo(a)' },
          { fontSize: 8, text: adulto.familiograma.esposoa ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'nietos' },
          { fontSize: 8, text: adulto.familiograma.nietos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'nietas' },
          { fontSize: 8, text: adulto.familiograma.nietas ? "SI" : "NO" },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'Mascotas' },
          { fontSize: 8, text: adulto.familiograma.mascotas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuáles mascotas?' },
          { fontSize: 8, colSpan: 3, text: adulto.familiograma.cualesMascotas },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: adulto.familiograma.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: adulto.familiograma.observacion },
          {},
          {},
        ]);
    }

    if (adulto.ecomapa != null) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ECOMAPA' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: 'Iglesias' },
          { fontSize: 8, text: adulto.ecomapa.iglesia ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Colegios' },
          { fontSize: 8, text: adulto.ecomapa.colegios ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Universidades' },
          { fontSize: 8, text: adulto.ecomapa.universidades ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Salud' },
          { fontSize: 8, text: adulto.ecomapa.centroMedicos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Trabajo' },
          { fontSize: 8, text: adulto.ecomapa.trabajo ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Amigos' },
          { fontSize: 8, text: adulto.ecomapa.amigos ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: adulto.ecomapa.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: adulto.ecomapa.observacion },
          {},
          {},
        ])
    }



    if (adulto.apgarComplete != null) {
      if (adulto.apgarComplete.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'APGAR' }, {}, {}, {}, {}, {}]);

        var puntajeTotal = 0;
        adulto.apgarComplete.forEach(j => {
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


    if (adulto.tamizajeSaludMentalComplete != null) {
      if (adulto.tamizajeSaludMentalComplete.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'TAMIZAJE SALUD MENTAL' }, {}, {}, {}, {}, {}]);
        adulto.tamizajeSaludMentalComplete.forEach(j => {
          body.push([{ fontSize: 8, colSpan: 4, text: j.pregunta },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: j.respuesta ? "SI" : "NO" },
          {}]);
        });

        body.push([{ fontSize: 8, text: "Interpretación" },
        { fontSize: 8, colSpan: 5, text: adulto.interpretacionTamizajeSaludMental == null ? "" : adulto.interpretacionTamizajeSaludMental },
        {},
        {},
        {},
        {}]);
      }
    }

    if (adulto.tamizajeSaludBucal != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'TAMIZAJE SALUD BUCAL' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: '¿Ha tenido dolor en los dientes?' },
          { fontSize: 8, text: adulto.tamizajeSaludBucal.dolor ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene movilidad en sus dientes?' },
          { fontSize: 8, text: adulto.tamizajeSaludBucal.movilidad ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene dificultad para masticar?' },
          { fontSize: 8, text: adulto.tamizajeSaludBucal.dificultadmasticar ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, text: '¿Le sangran las encías?' },
          { fontSize: 8, text: adulto.tamizajeSaludBucal.sangranEncias ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cepilla usted sus dientes después de cada comida?' },
          { fontSize: 8, text: adulto.tamizajeSaludBucal.cepillaDiente ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cuántas veces cepilla usted sus dientes en el día?' },
          { fontSize: 8, text: adulto.tamizajeSaludBucal.cuantasVecesCepilla ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, colSpan: 3, text: '¿Cuándo fue la última vez que fue valorado por un Odontólogo?' },
          {},
          {},
          { fontSize: 8, text: adulto.tamizajeSaludBucal.cuandoValoradoOdontologo },
          { fontSize: 8, text: adulto.tamizajeSaludBucal.tiempoValoradoOdontologo },
          {},
        ],
      );
    }


    if (adulto.rcvFramigham != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'CÁLCULO DE FRAMINGAN' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, bold: true, text: 'RCV FRAMIGHAM (%)' },
          {},
          { fontSize: 8, text: adulto.rcvFramigham },
          { fontSize: 8, bold: true, colSpan: 2, text: 'NIVEL DE RIESGO' },
          {},
          { fontSize: 8, text: adulto.nivelRiesgo },
        ]
      );
    }




    if (adulto.indiceBarthelComplete != null && !esAdulto) {
      if (adulto.indiceBarthelComplete.indice.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'INSTRUMENTO ÍNDICE DE BARTHEL' }, {}, {}, {}, {}, {}]);
        adulto.indiceBarthelComplete.indice.forEach(j => {
          body.push([{ fontSize: 8, colSpan: 2, text: j.pregunta },
          {},
          { fontSize: 8, colSpan: 4, text: j.referencia + " " + j.respuestaDescripcion },
          {},
          {},
          {}]);
        });

        body.push([{ fontSize: 8, text: "Interpretación" },
        { fontSize: 8, colSpan: 5, text: adulto.indiceBarthelComplete.interpretacion == null ? "" : adulto.indiceBarthelComplete.interpretacion },
        {},
        {},
        {},
        {}]);
      }
    }


    if (adulto.testLindaFried != null && !esAdulto) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'INSTRUMENTO TEST LINDA FRIED' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '1. PÉRDIDA INVOLUNTARIA DE PESO' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, colSpan: 3, text: '¿En el último año, usted ha perdido más de 5 kg de peso, sin intensión?' },
          {},

          {},
          { fontSize: 8, text: adulto.testLindaFried.perdidaPeso5kg ? "SI" : "NO" },
          { fontSize: 8, colSpan: 2, text: adulto.testLindaFried.obserPerdidaPeso5kg },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 3, text: 'En los últimos 3 meses ha perdido peso sin intención' },
          {},

          {},
          { fontSize: 8, text: adulto.testLindaFried.perdidaPeso3Meses ? "SI" : "NO" },
          { fontSize: 8, colSpan: 2, text: adulto.testLindaFried.obserPerdidaPeso3Meses },
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'índice de masa corporal (Kg/m2)' },
          { fontSize: 8, text: adulto.testLindaFried.imc },
          { fontSize: 8, bold: true, text: 'Calculo de índice de masa corporal ¿El cálculo de IMC es igual o inferior a 21 Kg/m2?' },
          { fontSize: 8, text: adulto.testLindaFried.calculoIMC ? "SI" : "NO" },
          { fontSize: 8, colSpan: 2, text: adulto.testLindaFried.obserCalculoIMC },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '2. BAJA ACTIVIDAD' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: '¿Hace usted ejercicio frecuente de manera vigorosa?' },
          {},
          { fontSize: 8, text: adulto.testLindaFried.haceEjercicioFrecuentemente ? "SI" : "NO" },
          { fontSize: 8, colSpan: 3, text: adulto.testLindaFried.obserHaceEjercicioFrecuentemente },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: '¿Camina largas distancias de manera frecuente?' },
          {},
          { fontSize: 8, text: adulto.testLindaFried.caminaLargasDistancia ? "SI" : "NO" },
          { fontSize: 8, colSpan: 3, text: adulto.testLindaFried.obserCaminaLargasDistancia },
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 2, text: '¿Camina cortas distancias de manera frecuente?' },
          {},
          { fontSize: 8, text: adulto.testLindaFried.caminaCortasDistancia ? "SI" : "NO" },
          { fontSize: 8, colSpan: 3, text: adulto.testLindaFried.obserCaminaCortasDistancia },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '3. AUTORREPORTE DE CANSANCIO FÍSICO (FÁTIGA O AGOTAMIENTO)' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: '¿Siente usted que vive cansado/a todo el tiempo?' },
          {},
          { fontSize: 8, text: adulto.testLindaFried.viveCansado ? "SI" : "NO" },
          { fontSize: 8, colSpan: 3, text: adulto.testLindaFried.obserViveCansado },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '4. LA DISMINUCIÓN DE LA FUERZA DE AGARRE' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: 'Se mide la fuerza muscular prensil de la mano y el antebrazo con dinamómetro' },
          {},
          { fontSize: 8, colSpan: 4, text: adulto.testLindaFried.fuerzaMuscular },
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 2, text: '¿La medición se encuentra en un rango de 0 a 15kg?' },
          {},
          { fontSize: 8, text: adulto.testLindaFried.medicionFuerzaMuscular ? "SI" : "NO" },
          { fontSize: 8, colSpan: 3, text: adulto.testLindaFried.obserMedicionFuerzaMuscular },
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'La persona camina a ritmo habitual cuatro metros. El trayecto debe medirse centímetros (cinta métrica) y el tiempo en segundos (cronometro). En este ítem se realizan dos mediciones dejando un intervalo de un minuto entre ellas y se consigna la medida más alta.' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testLindaFried.valocidadObtenida },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: '¿La velocidad obtenida es menor o igual a 0.8 m/seg?' },
          {},
          { fontSize: 8, text: adulto.testLindaFried.caminaRitmoHabitual ? "SI" : "NO" },
          { fontSize: 8, colSpan: 3, text: adulto.testLindaFried.obserCaminaRitmoHabitual },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: 'Interpretación' },
          {},
          { fontSize: 8, colSpan: 4, text: adulto.testLindaFried.interpretacion },
          {},
          {},
          {},
        ],
      );
    }

    if (adulto.testMinimental != null && !esAdulto) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'INSTRUMENTO MINIMENTAL' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '1. ORIENTACIÓN' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga en qué Año Estamos ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.anioEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga en qué Mes Estamos ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.mesEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga en qué Día Estamos ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.diaEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga la Fecha de hoy (día de la semana) ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.fechaHoyEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga la Hora ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.horaEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga en qué País Estamos ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.paisEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga en qué Ciudad Estamos ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.ciudadEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga en qué Departamento Estamos ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.departamentoEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Diga en qué Piso/barrio/vereda Estamos ¿El paciente respondio adecuadamente?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.barrioEnElQueEstamosCorrectamente ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '2. MEMORIA' },
          {},
          {},
          {},
          {},
          {}
        ],

        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'Diga las siguientes palabras CASA, MESA, ÁRBOL Un segundo por cada una. Luego pida a la persona que las repita. Si en un primer intento no logra repetir las palabras, repítalas hasta que la persona las registre' },
          {},
          {},
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente repitio adecuadamente la palabra CASA?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.repitioPalabraCasa ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente repitio adecuadamente la palabra MESA?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.repitioPalabraMesa ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente repitio adecuadamente la palabra ÁRBOL?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.repitioPalabraArbol ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Anote el número de ensayos requeridos' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.numeroVecesEnsayos },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '3. ATENCIÓN Y CÁLCULO' },
          {},
          {},
          {},
          {},
          {}
        ],

        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'Reste 100 - 7 en forma sucesiva durante 5 veces. Respuesta correcta: 93-86-79-72-65. En el caso que la persona no sepa restar utilizar la siguiente alternativa: Decir los meses del año al revés: Diciembre, noviembre, octubre, septiembre, agosto.' },
          {},
          {},
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente dijo el número 93 o el mes diciembre de forma correcta?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.primerNumeroRestaoMes ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente dijo el número 86 o el mes noviembre de forma correcta?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.segundoNumeroRestaoMes ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente dijo el número 79 o el mes octubre de forma correcta?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.terceroNumeroRestaoMes ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente dijo el número 72 o el mes septiembre de forma correcta?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.cuartoNumeroRestaoMes ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente dijo el número 65 o el mes agosto de forma correcta?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.quintoNumeroRestaoMes ? "SI" : "NO" },
          {},
        ],


        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '4. EVOCACIÓN' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'De las palabras anteriormente mencionadas(CASA, MESA, ÁRBOL), diga las palabras que recuerde' },
          {},
          {},
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente recordó adecuadamente la palabra CASA?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.recordoPalabraCasa ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente recordó adecuadamente la palabra MESA?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.recordoPalabraMesa ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente recordó adecuadamente la palabra ÁRBOL?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.recordoPalabraArbol ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#f2eded', text: '5. LENGUAJE' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'Mostrar un lápiz y un reloj y preguntar el nombre de los objetos (Denominación)' },
          {},
          {},
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente dijo el nombre del primer objeto (lápiz)?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.dijoNombrePrimerObjeto ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente dijo el nombre del segundo objeto (reloj)?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.dijoNombreSegundoObjeto ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'Hay que pedir que repita la siguiente frase: En el trigal había cinco perros' },
          {},
          {},
          {},
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente repitio correctamente la frase?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.repitioFraseCorrectamente ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'Comprensión obedecer una orden en tres etapas: A continuación, le voy a dar una orden, escúchela toda y realícela: Tome esta hoja de papel con su mano derecha, dóblela por la mitad y póngala en el piso.' },
          {},
          {},
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente realizo la primera orden de forma correcta (Tome esta hoja de papel con su mano derecha)?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.primeraOrden ? "SI" : "NO" },
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente realizo la segunda orden de forma correcta (dóblela por la mitad)?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.segundaOrden ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente realizo la tercera orden de forma correcta (póngala en el piso)?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.terceraOrden ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'Para las siguientes dos órdenes utilice una tarjeta u hoja de papel que contenga la frase:"cierre sus ojos" ' },
          {},
          {},
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Indique: Hay que pedir que lea y ejecute lo que dice la frase que contiene la tarjeta. (Lectura). ¿El paciente leyo la frase de forma correcta?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.leerFraseCorrectamente ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Hay que pedir que escriba la frase que contiene la tarjeta. (Escritura) ¿El paciente escribio correctamente la frase?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.escribirFraseCorrectamente ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 6, text: 'Indique a la persona que copie el siguiente diseño (dos pentágonos cruzados en un ángulo) (Dibujo):' },
          {},
          {},
          {},
          {},
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 4, text: '¿El paciente realizo de forma correcta el dibujo?' },
          {},
          {},
          {},
          { fontSize: 8, colSpan: 2, text: adulto.testMinimental.dibujoPentagonoCorrectamente ? "SI" : "NO" },
          {},
        ],

        [
          { fontSize: 8, bold: true, colSpan: 2, text: 'Interpretación' },
          {},
          { fontSize: 8, colSpan: 4, text: adulto.testMinimental.interpretacion },
          {},
          {},
          {},
        ],
      );
    }

    body.push([
      { fontSize: 8, colSpan: 6, bold: true, fillColor: '#cfcfcf', text: 'ANÁLISIS, COMENTARIOS Y RECOMENDACIONES DE SEGUIMIENTO' },
      {},
      {},
      {},
      {},
      {},
    ],
      [
        { fontSize: 8, bold: true, text: 'Observación:' },
        { fontSize: 8, colSpan: 5, bold: true, text: adulto.observaciones },
        {},
        {},
        {},
        {},
      ],
    );




    return body;
  }


}
