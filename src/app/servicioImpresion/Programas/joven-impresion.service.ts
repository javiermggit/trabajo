import { Injectable } from '@angular/core';
import { JovenService } from 'src/app/joven/joven.service';
import * as moment from 'moment';
import { Joven } from 'src/app/Modelos/Joven';
import { ParametroService } from 'src/app/parametros/parametro.service';

@Injectable({
  providedIn: 'root'
})
export class JovenImpresionService {
  constructor(public servicio: JovenService,
    public par: ParametroService) { }

  impresionPrograma(esPYP, datosusuarios, jovenser, listadoPregHijoPadre) {
    try {
      if (esPYP) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(datosusuarios, jovenser, listadoPregHijoPadre)
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
  body(datosusuarios, JoverSer: Joven, listadoPregHijoPadre) {
    
    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, fillColor: '#e8e6e6', colSpan: 6, alignment: 'center', text: 'PROGRAMA JOVEN', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);

    body.push([
      { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'ANTECEDENTES PATOLÓGICOS PERSONALES' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Varicela ' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.varicela ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.varicelaObser },
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'Sarampión ' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.sarampion ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.sarampionObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Rubiola ' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.rubiola ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.rubiolaObser },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Artritis Juvenil ' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.artritisJuvenil ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.artritisJuvenilObser },
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'Diabetes' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.diabetes ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.diabetesObser },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Fracturas' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.fracturas ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.fracturasObser },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Fiebre Reumática' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.fiebreReumatica ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.fiebreReumaticaObser },
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'Hospitalizaciones' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.hospitalizaciones ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.hospitalizacionesObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Alérgicos' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.alergicos ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.alergicosObser },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Quirúrgicos' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.quirurgicos ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.quirurgicosObser },
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'Recibió Esquema Completo de Vacunación' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.recibioEsquemaVacunacion ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.recibioEsquemaVacunacionObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Alteraciones sensoriales' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.alteracionesSensorial ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.alteracionesSensorialObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Problemas visuales' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.problemasVisuales ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.problemasVisualesObser },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Enfermedades Mentales' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.enfermedadLaboral ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.enfermedadLaboralObser },
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'Conciliación medicamentosa' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.concilacionMedica ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.concilacionMedicaObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Discapacidades' },
      { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.discapadidades ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.discapadidadesObser },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Enfermedad laboral' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.enfermedadLaboral ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.enfermedadLaboralObser },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, text: 'Salud oral' },
        { fontSize: 8, text: (JoverSer.antecedentesPatologicosPersonales.saludOral ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesPatologicosPersonales.saludOralObser },
        {},
        {},
        {}
      ]);


    body.push([
      { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'ANTECEDENTES INMUNOLOGICOS' },
      {},
      {},
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Recibió Refuerzos Después de los 5 Años' },
      { fontSize: 8, text: (JoverSer.antecedentesInmunologicos.recibioRefuerzosDepuesde5Anos ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesInmunologicos.recibioRefuerzosDepuesde5AnosObser },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Toxoide Tetánico Diftérico' },
        { fontSize: 8, text: (JoverSer.antecedentesInmunologicos.toxoideTetanicoDifterico ? 'SI' : 'NO') },
        { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesInmunologicos.toxoideTetanicoDiftericoObser },
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'Rubeola' },
      { fontSize: 8, text: (JoverSer.antecedentesInmunologicos.rubeola ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesInmunologicos.rubeolaObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Sarampión' },
      { fontSize: 8, text: (JoverSer.antecedentesInmunologicos.sarampion ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesInmunologicos.sarampionObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Observaciones' },
      { fontSize: 8, colSpan: 5, text: JoverSer.antecedentesInmunologicos.observaciones },
      {},
      {},
      {},
      {}
    ]);

    if (datosusuarios.sexo == 'F') {
      body.push([
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'ANTECEDENTES GINECO-OBSTETRICO' },
        {},
        {},
        {},
        {},
        {}
      ], [
        { fontSize: 8, bold: true, text: 'Menarca (Edad)' },
        { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.menarcaEdad },
        { fontSize: 8, bold: true, text: 'Inicio de Relaciones Sexuales' },
        { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.inicioRelacionesSexuales ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Ciclos Menstruales' },
        { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.tipoDeCiclosMenstruales }
      ],
        [
          { fontSize: 8, bold: true, text: 'Número de Compañeros Sexuales' },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.numeroCompraneroSexuales },
          { fontSize: 8, bold: true, text: 'Fecha Último Periodo' },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.fechaUltimaRegla != null ? moment(JoverSer.antecedentesGinecoObstetricos.fechaUltimaRegla).format('MM-DD-YYYY') : "" },
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Infección por transmisión sexual ' },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.enfermedadTransmision ? "SI" : "NO" },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.enfermedadTransmisionObser },
          { fontSize: 8, bold: true, text: 'Planificación Familiar' },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.planificacionFamiliar ? "SI" : "NO" },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.planificacionFamiliarObser },
        ],
        [
          { fontSize: 8, bold: true, text: 'Citología Vaginal Realizada' },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.citologiaVaginalRealizada ? "SI" : "NO" },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.citologiaVaginalRealizadaObser },
          {},
          {},
          {}

        ],
        [
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, text: JoverSer.antecedentesGinecoObstetricos.observaciones },
          {},
          {},
          {},
          {}
        ],
      )
    }


    if (datosusuarios.sexo == 'M') {
      body.push([
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'ANTECEDENTES ANDROLÓGICOS' },
        {},
        {},
        {},
        {},
        {}
      ], [
        { fontSize: 8, bold: true, text: 'Espermarquia' },
        { fontSize: 8, text: JoverSer.antecedentesAndrologicos.espermarquia ? "SI" : "NO" },
        { fontSize: 8, colSpan: 2, text: JoverSer.antecedentesAndrologicos.espermarquiaObser },
        {},
        { fontSize: 8, bold: true, text: 'Inicio de Relaciones Sexuales' },
        { fontSize: 8, text: JoverSer.antecedentesAndrologicos.inicioRelacionesSexuales },
      ],
        [
          { fontSize: 8, bold: true, text: 'Infección por transmisión sexual' },
          { fontSize: 8, text: JoverSer.antecedentesAndrologicos.enfermedadTransmision ? "SI" : "NO" },
          { fontSize: 8, colSpan: 2, text: JoverSer.antecedentesAndrologicos.enfermedadTransmisionObser },
          {},
          { fontSize: 8, bold: true, text: 'Número de Compañeros Sexuales' },
          { fontSize: 8, text: JoverSer.antecedentesAndrologicos.numeroCompanerosSexuales },
        ],
        [
          { fontSize: 8, bold: true, text: 'Planificación Familiar' },
          { fontSize: 8, text: JoverSer.antecedentesAndrologicos.planificacionFamiliar ? "SI" : "NO" },
          { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesAndrologicos.planificacionFamiliarObser },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Observaciones:' },
          { fontSize: 8, colSpan: 5, text: JoverSer.antecedentesAndrologicos.observaciones },
          {},
          {},
          {},
          {}
        ]
      )
    }

    body.push(
      [
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'ANTECEDENTES FAMILIARES RELEVANTES' },
        {},
        {},
        {},
        {},
        {}
      ], [
      { fontSize: 8, text: 'HTA' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.hta ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.htaObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Enfermedad Coronaria' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.enfermedadCoronaria ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.enfermedadCoronariaObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Nefropatías' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.nefropatias ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.nefropatiasObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Obesidad' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.obesidad ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.obesidadObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Enfermedad Cardiovascular' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.enfermedadCardiovascular ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.enfermedadCardiovascularObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Muertes Familiares Menores de 60 Por IAM/ECV' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.muerteFamiliaresMenoresDe60PorIAM_ECV ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.muerteFamiliaresMenoresDe60PorIAM_ECVObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Dislipidemias' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.dislipidemias ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.dislipidemiasObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Diabetes' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.diabetes ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.diabetesObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Enfermedad Mental' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.enfermedadMental ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.enfermedadMentalObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Cáncer' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.cancer ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.cancerObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Cáncer' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.cancer ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.cancerObser },
      {},
      {},
      {}
    ], [
      { fontSize: 8, text: 'Hematológicos' },
      { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.hematologicos ? 'SI' : 'NO') },
      { fontSize: 8, colSpan: 4, text: JoverSer.antecedentesFamiliaresRelevantes.hematologicosObser },
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, text: 'Otros' },
        { fontSize: 8, text: (JoverSer.antecedentesFamiliaresRelevantes.otros ? 'SI' : 'NO') },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 3, text: JoverSer.antecedentesFamiliaresRelevantes.observaciones },
        {},
        {}
      ]);



    body.push([
      { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'FACTORES DE RIESGO PARA ORIGEN DE DIABETES O RIESGO CARDIOVASCULAR' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, bold: true, text: '¿La circunferencia de su cintura, colocando el metro entre el borde infereior de las costillas y el borde superior de la pelvis mida?' },
        { fontSize: 8, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.circunferencia },
        { fontSize: 8, bold: true, text: '¿Generalmente hace 30 minutos diarios de actividad física en el trabajo y/o durante su tiempo libre?' },
        { fontSize: 8, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.actividadFisica },
        { fontSize: 8, bold: true, text: '¿Cuántas veces come vegetales o frutas?' },
        { fontSize: 8, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.comeVegetales }
      ],
      [
        { fontSize: 8, bold: true, text: '¿Toma medicamentos anti-hipertensivos regularmente?' },
        { fontSize: 8, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.antihipertensivos },
        { fontSize: 8, bold: true, text: '¿Le han encontrado alta glucosa en la sangre (Hiperglucemia)?' },
        { fontSize: 8, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.glucosaSangre },
        { fontSize: 8, bold: true, text: '¿Tiene miembros de su núcleo familiar o parientes, diagnosticados con diabetes (Tipo 1 o Tipo 2)?' },
        { fontSize: 8, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.FamiliarDiabetico }
      ],
      [
        { fontSize: 8, bold: true, text: 'Resultado final de riesgo Diabetes' },
        { fontSize: 8, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.resultados },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 3, text: JoverSer.factoresDeriesgoParaOrigenDiabetes.observaciones },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'FACTORES DE RIESGO COMPORTAMENTALES' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Consumo de Licor' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.consumoDeLicor ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Nivel de Consumo de Licor' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.nivelDeConsumoLicor },
        { fontSize: 8, bold: true, text: 'Número de Veces que Consume Licor' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.numeroDeVecesQueConsumeLicor }
      ],

      [
        { fontSize: 8, bold: true, text: 'Tipo de Licor que Consume' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.tipoDeLicorQueConsume },
        { fontSize: 8, bold: true, text: 'Consume Cigarrillos' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.consumeCigarrillos ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Cuantos Cigarrillos al Día' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.cuantosCigarrilosAldia }
      ],
      [
        { fontSize: 8, bold: true, text: 'Número de Años Fumando' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.numeroDeAnosFumando },
        { fontSize: 8, bold: true, text: 'Tipo de Fumador' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.tipoDeFumador },
        { fontSize: 8, bold: true, text: 'Consumo de Sustancias Psicoactivas' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.consumeSustanciasPsicoActivas ? 'SI' : 'NO' }
      ],

      [
        { fontSize: 8, bold: true, text: 'Número de Veces al Día' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.numeroDeVecesQueConsumeSustancias },
        { fontSize: 8, bold: true, text: 'Tiempo en Años Consumiendo' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.numeroDeAnosConsumiendoSustancias },
        { fontSize: 8, bold: true, text: 'Tipo de Sustancia' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.tipoDeSustancia }
      ],
      [
        { fontSize: 8, bold: true, text: 'Riesgo de EPOC' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.riesgoEPOC },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoCompartamentales.observaciones },
        { fontSize: 8, bold: true, text: '' },
        { fontSize: 8, bold: true, text: '' }
      ],
      [
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'FACTORES PROTECTORES BUENOS HABITOS ALIMENTICIOS' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Consumo de Fibra Saludable' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoFibraSaludable ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Consumo de Fibra Insoluble' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoFibraInsoluble ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Consumo de Micronutrientes' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoMicronutrientes ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Consumo de Leguminosas' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoLeguminosas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Consumo de Frutas' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoFrutas ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Consumo de Verduras' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoVerduras ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Consumo de Agua' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoAgua ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Consumo Dieta Baja en Sal' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.consumoDiataBajaEnSal ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, text: JoverSer.factoresProtectoresBuneosHabitosAlimenticios.observaciones }
      ],
      [
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'FACTORES DE RIESGO PSICOSOCIAL' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Con Quien Vive' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.conQuienVive },
        { fontSize: 8, bold: true, text: 'El Apoyo Afectivo es Dado Por' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.apoyoEfectivoEsDadoPor },
        { fontSize: 8, bold: true, text: 'El Apoyo Económico es Dado Por' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.apoyoEconomicoEsDadoPor }
      ],
      [
        { fontSize: 8, bold: true, text: 'La Autoridad en la Casa Esta Dada Por' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.autoridadEnCasaEsDadapor },
        { fontSize: 8, bold: true, text: 'Ocupación de la Madre' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.ocupacionMadre },
        { fontSize: 8, bold: true, text: 'Ocupación del Padre' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.ocupacionPadre }
      ],
      [
        { fontSize: 8, bold: true, text: 'Tiene Antecedentes Judiciales' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.tieneAntecedentesJudiciales ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Tiene un Proyecto de Vida' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.tieneUnProyectoDeVida ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Tipo de Personalidad' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.tipoDePersonalidad }
      ],
      [
        { fontSize: 8, bold: true, text: 'Tiene Hobbies y Aficiones' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.tieneHobbiesYaficiones ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Síntomas Neurovegetativos de Angustia' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.sintomasNeurovegetativosDeAngustia },
        { fontSize: 8, bold: true, text: 'Tiene o ha Tenido Ideas Suicidas' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.tieneOhaTenidoIdeasSuicidad ? 'SI' : 'NO' }
      ],
      [
        { fontSize: 8, bold: true, text: 'Tiene o ha Tenido Miedos Intensos' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.tieneOhaTenidoMiedosIntensos ? 'SI' : 'NO' },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, text: JoverSer.factoresDeRiesgoPsicosocial.observaciones },
        {},
        {}
      ]);


    if (JoverSer.sexualidad != null) {
      var orientacion = this.par.ListadoOrientacionSexual.filter(x => x.id == JoverSer.sexualidad.orientacionSexual);
      body.push([
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'DERECHOS SEXUALES Y REPRODUCTIVOS' },
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
          { fontSize: 8, colSpan: 2, text: JoverSer.sexualidad.identidadGenero },
          {},
        ]);


      if (JoverSer.sexualidad.usoMetodosAnticonceptivos && datosusuarios.sexo == 'F') {
        body.push([
          { fontSize: 8, bold: true, text: 'Métodos anticoncepción usados' },
          { fontSize: 8, text: 'Oral:' + (JoverSer.sexualidad.metodosAnticonceptivos.oral ? "SI" : "NO") },
          { fontSize: 8, text: 'Inyectable:' + (JoverSer.sexualidad.metodosAnticonceptivos.inyectable ? "SI" : "NO") },
          { fontSize: 8, text: 'Subdermico:' + (JoverSer.sexualidad.metodosAnticonceptivos.subdermico ? "SI" : "NO") },
          { fontSize: 8, text: 'D.I.U.:' + (JoverSer.sexualidad.metodosAnticonceptivos.d_I_U ? "SI" : "NO") },
          { fontSize: 8, text: 'Condón:' + (JoverSer.sexualidad.metodosAnticonceptivos.condon ? "SI" : "NO") },
        ],
          [
            { fontSize: 8, text: 'Estirilación Femenina' + (JoverSer.sexualidad.metodosAnticonceptivos.esterilizacionFemenina ? "SI" : "NO") },
            { fontSize: 8, text: 'Vasectomia' + (JoverSer.sexualidad.metodosAnticonceptivos.vasectomia ? "SI" : "NO") },
            { fontSize: 8, text: 'Otros' + (JoverSer.sexualidad.metodosAnticonceptivos.otros ? "SI" : "NO") },
            { fontSize: 8, colSpan: 3, text: JoverSer.sexualidad.metodosAnticonceptivos.otros ? JoverSer.sexualidad.cualesMetodosAnticonceptivos : "" },
            {},
            {},
          ], [
          { fontSize: 8, bold: true, text: 'Si ha tenido dificultades durante las relaciones sexuales' },
          { fontSize: 8, text: JoverSer.sexualidad.tenidoDificultadesRelaciones ? "SI" : "NO" },
          { fontSize: 8, colSpan: 4, text: JoverSer.sexualidad.tenidoDificultadesRelaciones ? JoverSer.sexualidad.cualesTenidoDificultadesRelaciones : "" },
          { fontSize: 8, bold: true, text: 'Ha interrumpido voluntariamente un embarazo' },
          { fontSize: 8, text: JoverSer.sexualidad.interrupcionVoluntariaEmbarazo ? "SI" : "NO" },
          { fontSize: 8, colSpan: 4, text: JoverSer.sexualidad.interrupcionVoluntariaEmbarazo ? JoverSer.sexualidad.interrupcionVoluntariaEmbarazoObser : "" },
        ]);
      }

      if (JoverSer.sexualidad.usaPreservativo && datosusuarios.sexo == 'M') {
        body.push([
          { fontSize: 8, bold: true, text: 'Usa Preservativo' },
          { fontSize: 8, text: JoverSer.sexualidad.usaPreservativo ? "SI" : "NO" },
          {},
          {},
          {},
        ],
          [
            { fontSize: 8, bold: true, text: 'Si ha tenido dificultades durante las relaciones sexuales' },
            { fontSize: 8, text: JoverSer.sexualidad.tenidoDificultadesRelaciones ? "SI" : "NO" },
            { fontSize: 8, colSpan: 4, text: JoverSer.sexualidad.tenidoDificultadesRelaciones ? JoverSer.sexualidad.cualesTenidoDificultadesRelaciones : "" },
            {},
            {},
            {},
          ]);
      }


      body.push(
        [
          { fontSize: 8, bold: true, text: 'Desea tener hijo' },
          { fontSize: 8, text: JoverSer.sexualidad.deseaTenerHijos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Violencia contra la mujer y/o violencia de género' },
          { fontSize: 8, text: JoverSer.sexualidad.violenciaContraMujer ? "SI" : "NO" },
          {},
          {},
        ]);
    }




    body.push([
      { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'TAMIZAJE DE TANNER' },
      {},
      {},
      {},
      {},
      {}
    ],
      [
        { fontSize: 8, colSpan: 6, text: JoverSer.valoracionDelDesarrollo.estadioObserv },
        {},
        {},
        {},
        {},
        {},
      ],
      [
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'PARACLINICOS' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'Examen' }, {},
        { fontSize: 8, bold: true, text: 'Resultado' },
        { fontSize: 8, colSpan: 2, bold: true, text: '' }, {},
        { fontSize: 8, bold: true, text: 'Fecha' }
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'Hgb - Hto' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.hgbHto },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.fechaResultadoHgbHto != null ? moment(JoverSer.paraclinicos.fechaResultadoHgbHto).format("DD-MM-YYYY") : "" }
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'HDL' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.hdl },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.fechaResultadoHdl != null ? moment(JoverSer.paraclinicos.fechaResultadoHdl).format("DD-MM-YYYY") : "" }
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'VDRL' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.vdrl },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.fechaResultadoVdrl != null ? moment(JoverSer.paraclinicos.fechaResultadoVdrl).format("DD-MM-YYYY") : "" }
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'VIH' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.hiv },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.fechaResultadoHiv != null ? moment(JoverSer.paraclinicos.fechaResultadoHiv).format("DD-MM-YYYY") : "" }
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'Prueba rápida treponémica' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.pruebaTreponemica },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.fechaTreponemica != null ? moment(JoverSer.paraclinicos.fechaTreponemica).format("DD-MM-YYYY") : "" }
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'Prueba rápida VIH' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.pruebaVih },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.fechaVih != null ? moment(JoverSer.paraclinicos.fechaVih).format("DD-MM-YYYY") : "" }
      ],
      [
        { fontSize: 8, colSpan: 2, bold: true, text: 'Prueba de embarazo' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.pruebaEmbarazo },
        { fontSize: 8, colSpan: 2, bold: true, text: 'Fecha resultado' }, {},
        { fontSize: 8, text: JoverSer.paraclinicos.fechaPruebaEmbarazo != null ? moment(JoverSer.paraclinicos.fechaPruebaEmbarazo).format("DD-MM-YYYY") : "" }
      ]);

    

    if (JoverSer.familiograma != null) {
      body.push([
        { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'FAMILIOGRAMA' },
        {},
        {},
        {},
        {},
        {}
      ],
        [
          { fontSize: 8, bold: true, text: 'Papá' },
          { fontSize: 8, text: JoverSer.familiograma.papa ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Mamá' },
          { fontSize: 8, text: JoverSer.familiograma.mama ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Materno' },
          { fontSize: 8, text: JoverSer.familiograma.abueloMaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Abuela Materna' },
          { fontSize: 8, text: JoverSer.familiograma.abuelaMaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuela Paterna' },
          { fontSize: 8, text: JoverSer.familiograma.abuelaPaterna ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Abuelo Paterno' },
          { fontSize: 8, text: JoverSer.familiograma.abueloPaterno ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Hermanas' },
          { fontSize: 8, text: JoverSer.familiograma.hermanas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Hermanos' },
          { fontSize: 8, text: JoverSer.familiograma.hermanos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Tíos' },
          { fontSize: 8, text: JoverSer.familiograma.tios ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Tías' },
          { fontSize: 8, text: JoverSer.familiograma.tias ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primos' },
          { fontSize: 8, text: JoverSer.familiograma.primos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Primas' },
          { fontSize: 8, text: JoverSer.familiograma.primas ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Mascotas' },
          { fontSize: 8, text: JoverSer.familiograma.mascotas ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuáles mascotas?' },
          { fontSize: 8, colSpan: 3, text: JoverSer.familiograma.cualesMascotas },
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: JoverSer.familiograma.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: JoverSer.familiograma.observacion },
          {},
          {},
        ]);
    }

    if (JoverSer.ecomapa != null) {
      body.push(
        [
          { fontSize: 8, bold: true, fillColor: '#cfcfcf', colSpan: 6, text: 'ECOMAPA' },
          {},
          {},
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, bold: true, text: 'Iglesias' },
          { fontSize: 8, text: JoverSer.ecomapa.iglesia ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Colegios' },
          { fontSize: 8, text: JoverSer.ecomapa.colegios ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Universidades' },
          { fontSize: 8, text: JoverSer.ecomapa.universidades ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Salud' },
          { fontSize: 8, text: JoverSer.ecomapa.centroMedicos ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Trabajo' },
          { fontSize: 8, text: JoverSer.ecomapa.trabajo ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Amigos' },
          { fontSize: 8, text: JoverSer.ecomapa.amigos ? "SI" : "NO" },
        ],
        [
          { fontSize: 8, bold: true, text: 'Otros' },
          { fontSize: 8, text: JoverSer.ecomapa.otros ? "SI" : "NO" },
          { fontSize: 8, bold: true, text: 'Cuales?' },
          { fontSize: 8, colSpan: 3, text: JoverSer.ecomapa.observacion },
          {},
          {},
        ],

      )
    }

    if (JoverSer.apgarComplete != null) {
      if (JoverSer.apgarComplete.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'APGAR' }, {}, {}, {}, {}, {}]);
        var puntajeTotal = 0;
        JoverSer.apgarComplete.forEach(j => {
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
    
    

    if (JoverSer.tamizajeSaludMentalComplete != null) {
      if (JoverSer.tamizajeSaludMentalComplete.length > 0) {
        body.push([{ fontSize: 8, bold: true, colSpan: 6, fillColor: '#cfcfcf', text: 'TAMIZAJE SALUD MENTAL' }, {}, {}, {}, {}, {}]);
        JoverSer.tamizajeSaludMentalComplete.forEach(j => {
          body.push([{ fontSize: 8, colSpan: 4, text: j.pregunta },
            {},
            {},
            {},
            { fontSize: 8, colSpan: 2, text: j.respuesta  ? "SI" : "NO" },
            {}]);
        });

        body.push([{ fontSize: 8, text: "Interpretación" },
        { fontSize: 8, colSpan: 5, text: JoverSer.interpretacionTamizajeSaludMental == null ? "" : JoverSer.interpretacionTamizajeSaludMental },
        {},
        {},
        {},
        {}]);
      }
    }

    if (JoverSer.tamizajeSaludBucal != null) {
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
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.dolor ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene movilidad en sus dientes?' },
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.movilidad ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Tiene dificultad para masticar?' },
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.dificultadmasticar ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, text: '¿Le sangran las encías?' },
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.sangranEncias ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cepilla usted sus dientes después de cada comida?' },
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.cepillaDiente ? 'SI' : 'NO' },
          { fontSize: 8, bold: true, text: '¿Cuántas veces cepilla usted sus dientes en el día?' },
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.cuantasVecesCepilla ? 'SI' : 'NO' },
        ],
        [
          { fontSize: 8, bold: true, colSpan: 3, text: '¿Cuándo fue la última vez que fue valorado por un Odontólogo?' },
          {},
          {},
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.cuandoValoradoOdontologo },
          { fontSize: 8, text: JoverSer.tamizajeSaludBucal.tiempoValoradoOdontologo },
          {},
        ],
      );
    }


    body.push([
      { fontSize: 8, colSpan: 6, bold: true, text: 'ANÁLISIS, COMENTARIOS Y RECOMENDACIONES DE SEGUIMIENTO' },
      {},
      {},
      {},
      {},
      {},
    ],
      [
        { fontSize: 8, bold: true, text: 'Observación:' },
        { fontSize: 8, colSpan: 5, bold: true, text: JoverSer.observacion },
        {},
        {},
        {},
        {},
      ]);

    return body;
  }
}
