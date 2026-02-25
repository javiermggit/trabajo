import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ValeService } from 'src/app/crecimiento-desarrollo/vale/vale.service';
import { Adolescencia } from 'src/app/Modelos/Adolescencia';
import { ParametroService } from 'src/app/parametros/parametro.service';

@Injectable({
  providedIn: 'root'
})
export class AdolescenciaImpresionService {

  constructor(
    private par: ParametroService) { }

  impresionPrograma(esPYP, datosusuarios, adoles: Adolescencia, listadoPregHijoPadre) {
    try {
      if (esPYP) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(datosusuarios, adoles, listadoPregHijoPadre)
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

  body(datosusuarios, ado: Adolescencia, listadoPregHijoPadre) {

    var body = [];
    var titulo = [];


    titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center',fillColor: '#e8e6e6', text: 'PROGRAMA ADOLESCENCIA', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);

    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'ANTECEDENTES GENERALES' },
        {},
        {},
        {},
        {},
        {}
      ]
    )

    if (ado.antecedentes.personales) {
      body.push([
        { fontSize: 8, text: 'Personales' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.personalesObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.medicos) {
      body.push([
        { fontSize: 8, text: 'Médicos' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.medicosObservacion },
        {},
        {},
        {},
        {}
      ]);
    }


    if (ado.antecedentes.cirugias) {
      body.push([
        { fontSize: 8, text: 'Cirugías' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.cirugiasObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.alergias) {
      body.push([
        { fontSize: 8, text: 'Alergias' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.alergiasObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.vacunacion) {
      body.push([
        { fontSize: 8, text: 'Vacunación' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.vacunacionObservacion },
        {},
        {},
        {},
        {}
      ]);

      body.push([
        { fontSize: 8, text: 'DPT' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.dpt ? "Si" : "No" },
        {},
        {},
        {},
        {}
      ]);
      body.push([
        { fontSize: 8, text: 'VPH' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.vph ? "Si" : "No" },
        {},
        {},
        {},
        {}
      ]);
    }


    if (ado.antecedentes.discapacidades) {
      body.push([
        { fontSize: 8, text: 'Discapacidades' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.discapacidadesObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.problemasAuditivos) {
      body.push([
        { fontSize: 8, text: 'Problemas auditivos y sensoriales' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.problemasAuditivosObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.familiares) {
      body.push([
        { fontSize: 8, text: 'Familiares' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.familiaresObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.hospitalizaciones) {
      body.push([
        { fontSize: 8, text: 'Hospitalizaciones' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.hospitalizacionesObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.toxicologicos) {
      body.push([
        { fontSize: 8, text: 'Toxicológicos' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.toxicologicosObservacion },
        {},
        {},
        {},
        {}
      ]);
    }


    if (ado.antecedentes.traumatologicos) {
      body.push([
        { fontSize: 8, text: 'Traumatológicos' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.traumatologicosObservacion },
        {},
        {},
        {},
        {}
      ]);
    }


    if (ado.antecedentes.higieneOral) {
      body.push([
        { fontSize: 8, text: 'Higiene oral' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.higieneOralFecha != null ? moment(ado.antecedentes.higieneOralFecha).format("DD-MM-YYYY") : "" },
        {},
        {},
        {},
        {}
      ]);
    }


    if (ado.antecedentes.conciliacionMedica) {
      body.push([
        { fontSize: 8, text: 'Conciliación medicamentosa' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.conciliacionMedicaObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (ado.antecedentes.desarrolloPuberalGinePsico) {
      body.push([
        { fontSize: 8, text: 'Desarrollo puberal, ginecológicos y psicosociales' },
        { fontSize: 8, colSpan: 5, text: ado.antecedentes.desarrolloPuberalGinePsicoObservacion },
        {},
        {},
        {},
        {}
      ]);
    }

    if (datosusuarios.sexo == 'F') {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'ANTECEDENTES GINECO-OBSTETRICO' },
        {},
        {},
        {},
        {},
        {}
      ], [
        { fontSize: 8, bold: true, text: 'Menarca (Edad)' },
        { fontSize: 8, text: ado.antecedentesGinecoObstetricos.menarcaEdad },
        { fontSize: 8, bold: true, text: 'Inicio de Relaciones Sexuales' },
        { fontSize: 8, text: ado.antecedentesGinecoObstetricos.inicioRelacionesSexuales ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Ciclos Menstruales' },
        { fontSize: 8, text: ado.antecedentesGinecoObstetricos.tipoDeCiclosMenstruales }
      ],
        [
          { fontSize: 8, bold: true, text: 'Número de Compañeros Sexuales' },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.numeroCompraneroSexuales },
          { fontSize: 8, bold: true, text: 'Fecha Último Periodo' },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.fechaUltimaRegla != null ? moment(ado.antecedentesGinecoObstetricos.fechaUltimaRegla).format('MM-DD-YYYY') : "" },
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Infección por transmisión sexual ' },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.enfermedadTransmision ? "SI" : "NO" },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.enfermedadTransmisionObser },
          { fontSize: 8, bold: true, text: 'Planificación Familiar' },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.planificacionFamiliar ? "SI" : "NO" },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.planificacionFamiliarObser },
        ],
        [
          { fontSize: 8, bold: true, text: 'Citología Vaginal Realizada' },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.citologiaVaginalRealizada ? "SI" : "NO" },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.citologiaVaginalRealizadaObser },
          {},
          {},
          {}

        ],
        [
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, text: ado.antecedentesGinecoObstetricos.observaciones },
          {},
          {},
          {},
          {}
        ],
      )
    }


    if (datosusuarios.sexo == 'M') {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'ANTECEDENTES ANDROLÓGICOS' },
        {},
        {},
        {},
        {},
        {}
      ], [
        { fontSize: 8, bold: true, text: 'Espermarquia' },
        { fontSize: 8, text: ado.antecedentesAndrologicos.espermarquia ? "SI" : "NO" },
        { fontSize: 8, colSpan: 2, text: ado.antecedentesAndrologicos.espermarquiaObser },
        {},
        { fontSize: 8, bold: true, text: 'Inicio de Relaciones Sexuales' },
        { fontSize: 8, text: ado.antecedentesAndrologicos.inicioRelacionesSexuales },
      ],
        [
          { fontSize: 8, bold: true, text: 'Infección por transmisión sexual' },
          { fontSize: 8, text: ado.antecedentesAndrologicos.enfermedadTransmision ? "SI" : "NO" },
          { fontSize: 8, colSpan: 2, text: ado.antecedentesAndrologicos.enfermedadTransmisionObser },
          {},
          { fontSize: 8, bold: true, text: 'Número de Compañeros Sexuales' },
          { fontSize: 8, text: ado.antecedentesAndrologicos.numeroCompanerosSexuales },
        ],
        [
          { fontSize: 8, bold: true, text: 'Planificación Familiar' },
          { fontSize: 8, text: ado.antecedentesAndrologicos.planificacionFamiliar ? "SI" : "NO" },
          { fontSize: 8, colSpan: 4, text: ado.antecedentesAndrologicos.planificacionFamiliarObser },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, colSpan: 5, text: ado.antecedentesAndrologicos.observaciones },
          {},
          {},
          {},
          {}
        ]
      )
    }
    if (ado.factoresDeriesgoParaOrigenDiabetes != null) {
      body.push([
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'FACTORES DE RIESGO PARA ORIGEN DE DIABETES O RIESGO CARDIOVASCULAR' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: '¿La circunferencia de su cintura, colocando el metro entre el borde infereior de las costillas y el borde superior de la pelvis mida?' },
          { fontSize: 8, text: ado.factoresDeriesgoParaOrigenDiabetes.circunferencia },
          { fontSize: 8, bold: true, text: '¿Generalmente hace 30 minutos diarios de actividad física en el trabajo y/o durante su tiempo libre?' },
          { fontSize: 8, text: ado.factoresDeriesgoParaOrigenDiabetes.actividadFisica },
          { fontSize: 8, bold: true, text: '¿Cuántas veces come vegetales o frutas?' },
          { fontSize: 8, text: ado.factoresDeriesgoParaOrigenDiabetes.comeVegetales }
        ],
        [
          { fontSize: 8, bold: true, text: '¿Toma medicamentos anti-hipertensivos regularmente?' },
          { fontSize: 8, text: ado.factoresDeriesgoParaOrigenDiabetes.antihipertensivos },
          { fontSize: 8, bold: true, text: '¿Le han encontrado alta glucosa en la sangre (Hiperglucemia)?' },
          { fontSize: 8, text: ado.factoresDeriesgoParaOrigenDiabetes.glucosaSangre },
          { fontSize: 8, bold: true, text: '¿Tiene miembros de su núcleo familiar o parientes, diagnosticados con diabetes (Tipo 1 o Tipo 2)?' },
          { fontSize: 8, text: ado.factoresDeriesgoParaOrigenDiabetes.FamiliarDiabetico }
        ],
        [
          { fontSize: 8, bold: true, text: 'Resultado final de riesgo Diabetes' },
          { fontSize: 8, text: ado.factoresDeriesgoParaOrigenDiabetes.resultados },
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, colSpan: 3, text: ado.factoresDeriesgoParaOrigenDiabetes.observaciones },
          {},
          {}
        ])
    }


    if (ado.asistenciaEscolar != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'ASISTENCIA ESCOLAR' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Asistencia Escolar' },
          { fontSize: 8, colSpan: 2, text: ado.asistenciaEscolar.asistenciaEscolar },
          {},
          { fontSize: 8, bold: true, text: 'Repitencia escolar' },
          { fontSize: 8, colSpan: 2, text: ado.asistenciaEscolar.repitenciaEscolar },
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'Relaciones interpersonales' },
          { fontSize: 8, colSpan: 2, text: ado.asistenciaEscolar.relacionesInterpersonales },
          {},
          { fontSize: 8, bold: true, text: 'Desempeño academico' },
          { fontSize: 8, colSpan: 2, text: ado.asistenciaEscolar.desempenoAcademico },
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'Comportamiento generales' },
          { fontSize: 8, colSpan: 5, text: ado.asistenciaEscolar.comportamientosGenerales },
          {},
          {},
          {},
          {},
        ]);
    }
    /**EXAMENES */
    body.push([
      { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf',text: 'EXAMENES' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: 'Hemoglobina' },
        { fontSize: 8, text: ado.examenes.hemoglobina },
        { fontSize: 8, text: ado.examenes.fechaHemoglobina != null ? moment(ado.examenes.fechaHemoglobina).format("DD-MM-YYYY") : "" },
        { fontSize: 8, bold: true, text: 'Hematocrito' },
        { fontSize: 8, text: ado.examenes.hematocrito },
        { fontSize: 8, text: ado.examenes.fechaHematocrito != null ? moment(ado.examenes.fechaHematocrito).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Prueba rápida treponémica' },
        { fontSize: 8, text: ado.examenes.pruebaTreponemica },
        { fontSize: 8, text: ado.examenes.fechaPruebaTreponemica != null ? moment(ado.examenes.fechaPruebaTreponemica).format("DD-MM-YYYY") : "" },
        { fontSize: 8, bold: true, text: 'Prueba rápida para VIH' },
        { fontSize: 8, text: ado.examenes.pruebaVIH },
        { fontSize: 8, text: ado.examenes.fechaPruebaVIH != null ? moment(ado.examenes.fechaPruebaVIH).format("DD-MM-YYYY") : "" },
      ],
      [
        { fontSize: 8, bold: true, text: 'Prueba de embarazo' },
        { fontSize: 8, text: ado.examenes.pruebaEmbarazo },
        { fontSize: 8, text: ado.examenes.fechaPruebaEmbarazo != null ? moment(ado.examenes.fechaPruebaEmbarazo).format("DD-MM-YYYY") : "" },
        {},
        {},
        {},
      ], [
      { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'VALORACIÓN NUTRICIONAL' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: 'IMC' },
        { fontSize: 8, colSpan: 2, text: ado.valoracionNutricional.imc },
        {},
        { fontSize: 8, bold: true, text: 'Clasificación' },
        { fontSize: 8, colSpan: 2, text: ado.valoracionNutricional.clasificacion },
        {},
      ]);

    if (ado.sexualidad != null) {
      var orientacion = this.par.ListadoOrientacionSexual.filter(x => x.id == ado.sexualidad.orientacionSexual);
      body.push([
        { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'DERECHOS SEXUALES Y REPRODUCTIVOS' },
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
          { fontSize: 8, colSpan: 2, text: ado.sexualidad.identidadGenero },
          {},
        ]);


      if (ado.sexualidad.usoMetodosAnticonceptivos && datosusuarios.sexo == 'F') {
        body.push([
          { fontSize: 8, bold: true, text: 'Métodos anticoncepción usados' },
          { fontSize: 8, text: 'Oral:' + (ado.sexualidad.metodosAnticonceptivos.oral ? "SI" : "NO") },
          { fontSize: 8, text: 'Inyectable:' + (ado.sexualidad.metodosAnticonceptivos.inyectable ? "SI" : "NO") },
          { fontSize: 8, text: 'Subdermico:' + (ado.sexualidad.metodosAnticonceptivos.subdermico ? "SI" : "NO") },
          { fontSize: 8, text: 'D.I.U.:' + (ado.sexualidad.metodosAnticonceptivos.d_I_U ? "SI" : "NO") },
          { fontSize: 8, text: 'Condón:' + (ado.sexualidad.metodosAnticonceptivos.condon ? "SI" : "NO") },
        ],
          [
            { fontSize: 8, text: 'Estirilación Femenina' + (ado.sexualidad.metodosAnticonceptivos.esterilizacionFemenina ? "SI" : "NO") },
            { fontSize: 8, text: 'Vasectomia' + (ado.sexualidad.metodosAnticonceptivos.vasectomia ? "SI" : "NO") },
            { fontSize: 8, text: 'Otros' + (ado.sexualidad.metodosAnticonceptivos.otros ? "SI" : "NO") },
            { fontSize: 8, colSpan: 3, text: ado.sexualidad.metodosAnticonceptivos.otros ? ado.sexualidad.cualesMetodosAnticonceptivos : "" },
            {},
            {},
          ],
          [
            { fontSize: 8, bold: true, text: 'Si ha tenido dificultades durante las relaciones sexuales' },
            { fontSize: 8, text: ado.sexualidad.tenidoDificultadesRelaciones ? "SI" : "NO" },
            { fontSize: 8, colSpan: 4, text: ado.sexualidad.tenidoDificultadesRelaciones ? ado.sexualidad.cualesTenidoDificultadesRelaciones : "" },
            { fontSize: 8, bold: true, text: 'Ha interrumpido voluntariamente un embarazo' },
            { fontSize: 8, text: ado.sexualidad.interrupcionVoluntariaEmbarazo ? "SI" : "NO" },
            { fontSize: 8, colSpan: 4, text: ado.sexualidad.interrupcionVoluntariaEmbarazo ? ado.sexualidad.interrupcionVoluntariaEmbarazoObser : "" },
          ]);
      }

      if (ado.sexualidad.usaPreservativo && datosusuarios.sexo == 'M') {
        body.push([
          { fontSize: 8, bold: true, text: 'Usa Preservativo' },
          { fontSize: 8, text: ado.sexualidad.usaPreservativo ? "SI" : "NO" },
          {},
          {},
          {},
          {},
        ],
          [
            { fontSize: 8, bold: true, text: 'Si ha tenido dificultades durante las relaciones sexuales' },
            { fontSize: 8, text: ado.sexualidad.tenidoDificultadesRelaciones ? "SI" : "NO" },
            { fontSize: 8, colSpan: 4, text: ado.sexualidad.tenidoDificultadesRelaciones ? ado.sexualidad.cualesTenidoDificultadesRelaciones : "" },
            {},
            {},
            {},
          ]);
      }


      body.push(
        [
          { fontSize: 8, bold: true, text: 'Desea tener hijo' },
          { fontSize: 8, colSpan: 2, text: ado.sexualidad.deseaTenerHijos ? "SI" : "NO" },
          {},
          { fontSize: 8, bold: true, text: 'Violencia contra la mujer y/o violencia de género' },
          { fontSize: 8, colSpan: 2, text: ado.sexualidad.violenciaContraMujer ? "SI" : "NO" },

          {},
        ]);
    }

    /** TAMIZAJE DE TANNER*/
    body.push([
      { fontSize: 8, bold: true, colSpan: 6,fillColor: '#cfcfcf', text: 'TAMIZAJE DE TANNER' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, colSpan: 6, text: ado.valoracionDelDesarrollo.estadioObserv },
        {},
        {},
        {},
        {},
        {},
      ]);

  

    if (ado.familiograma != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf',text: 'FAMILIOGRAMA' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Papá' },
          { fontSize: 8, text: ado.familiograma.papa ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Mamá' },
          { fontSize: 8, text: ado.familiograma.mama ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Materno' },
          { fontSize: 8, text: ado.familiograma.abueloMaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Abuela Materna' },
          { fontSize: 8, text: ado.familiograma.abuelaMaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuela Paterna' },
          { fontSize: 8, text: ado.familiograma.abuelaPaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Paterno' },
          { fontSize: 8, text: ado.familiograma.abueloPaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Hermanas' },
          { fontSize: 8, text: ado.familiograma.hermanas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Hermanos' },
          { fontSize: 8, text: ado.familiograma.hermanos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Tíos' },
          { fontSize: 8, text: ado.familiograma.tios ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Tías' },
          { fontSize: 8, text: ado.familiograma.tias ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primos' },
          { fontSize: 8, text: ado.familiograma.primos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primas' },
          { fontSize: 8, text: ado.familiograma.primas ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Mascotas' },
          { fontSize: 8, text: ado.familiograma.mascotas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuáles mascotas?' },
          { fontSize: 8, colSpan: 3, text: ado.familiograma.cualesMascotas },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: ado.familiograma.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: ado.familiograma.observacion },
          {},
          {},
        ]);
    }


    if (ado.ecomapa != null) {
      body.push(
        [
          { fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'ECOMAPA' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Iglesias' },
          { fontSize: 8, text: ado.ecomapa.iglesia ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Colegios' },
          { fontSize: 8, text: ado.ecomapa.colegios ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Universidades' },
          { fontSize: 8, text: ado.ecomapa.universidades ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Salud' },
          { fontSize: 8, text: ado.ecomapa.centroMedicos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Trabajo' },
          { fontSize: 8, text: ado.ecomapa.trabajo ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Amigos' },
          { fontSize: 8, text: ado.ecomapa.amigos ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: ado.ecomapa.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: ado.ecomapa.observacion },
          {},
          {},
        ],
      )
    }
    if (ado.apgarComplete != null) {
      if (ado.apgarComplete.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'APGAR' }, {}, {}, {}, {}, {}]);
        var puntajeTotal = 0;

        ado.apgarComplete.forEach(j => {
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

    if (ado.tamizajeSaludMentalComplete != null) {
      if (ado.tamizajeSaludMentalComplete.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'TAMIZAJE SALUD MENTAL' }, {}, {}, {}, {}, {}]);
        ado.tamizajeSaludMentalComplete.forEach(j => {
          body.push([{ fontSize: 8, colSpan: 4, text: j.pregunta },
            {},
            {},
            {},
            { fontSize: 8, colSpan: 2, text: j.respuesta  ? "SI" : "NO" },
            {}]);
        });

        body.push([{ fontSize: 8, text: "Interpretación" },
        { fontSize: 8, colSpan: 5, text: ado.interpretacionTamizajeSaludMental == null ? "" : ado.interpretacionTamizajeSaludMental },
        {},
        {},
        {},
        {}]);
      }
    }

    if (ado.tamizajeSaludBucal != null) {
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
          { fontSize: 8, text: ado.tamizajeSaludBucal.dolor ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene movilidad en sus dientes?' },
          { fontSize: 8, text: ado.tamizajeSaludBucal.movilidad ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene dificultad para masticar?' },
          { fontSize: 8, text: ado.tamizajeSaludBucal.dificultadmasticar ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, text: '¿Le sangran las encías?' },
          { fontSize: 8, text: ado.tamizajeSaludBucal.sangranEncias ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cepilla usted sus dientes después de cada comida?' },
          { fontSize: 8, text: ado.tamizajeSaludBucal.cepillaDiente ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cuántas veces cepilla usted sus dientes en el día?' },
          { fontSize: 8, text: ado.tamizajeSaludBucal.cuantasVecesCepilla ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, colSpan: 3, text: '¿Cuándo fue la última vez que fue valorado por un Odontólogo?' },
          {},
          {},
          { fontSize: 8, text: ado.tamizajeSaludBucal.cuandoValoradoOdontologo },
          { fontSize: 8, text: ado.tamizajeSaludBucal.tiempoValoradoOdontologo },
          {},
        ],
      );
    }


    body.push([
      { fontSize: 8, bold: true, colSpan: 6, text: 'ANÁLISIS COMENTARIOS Y RECOMENDACIONES DE SEGUIMIENTO' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: ado.comentariosRecomendacionesSeguimiento },
        {},
        {},
        {},
        {},
        {},
      ]
    );


    return body;
  }
}
