import { Injectable } from '@angular/core';
//import { MamaService } from 'src/app/mama/mama.service';
import { Mama } from 'src/app/Modelos/Mama';

@Injectable({
  providedIn: 'root'
})
export class MamaImpresionService {

  constructor(
    //public servicio: MamaService
  ) { }

  impresionPrograma(esPYP, mama) {
    if (esPYP) {
      return {
        table: {
          widths: ['20%', '8%', '20%', '8%', '20%', '24%'],
          body: this.body(mama)
        },
        layout: {
          defaultBorder: true
        },
      };
    } else {
      return '';
    }
  }

  body(mama: Mama) {
    
    var clase = mama;
    var body = [];
    var titulo = [];

    titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center', text: 'PROGRAMA MAMA', bold: true }, {}, {}, {}, {}, {});
    body.push(titulo);


    body.push(
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'IDENTIFICACIÓN DE FACTORE DE RIESGO' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Inicio de Menarca antes de los 11 años: ' },
        {},
        { fontSize: 8, text: clase.inicioMenarcaAntes11 ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'edad' },
        { fontSize: 8, text: clase.edadInicioMenarcaAntes11 },
        {},
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Primer Embarazo a partir de los 40 años: ' },
        {},
        { fontSize: 8, text: clase.primerEmbarazoApartir40 ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'edad' },
        { fontSize: 8, text: clase.edadPrimerEmbarazoApartir40 },
        {}
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Inicio de menopausia después de los 54 años' },
        {},
        { fontSize: 8, text: clase.inicioMenopausiaDespues54 ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'edad' },
        { fontSize: 8, text: clase.edadInicioMenopausiaDespues54 },
        {},

      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Antecedentes familiares de cáncer de Mama' },
        {},
        { fontSize: 8, text: clase.aFCancerMama ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Grado de Consanguinidad' },
        { fontSize: 8, text: clase.gradoConsangAFCancerMama },
        {}
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Antecedentes familiares de cáncer de pulmón' },
        {},
        { fontSize: 8, text: clase.aFCancerPulmon ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Grado de Consanguinidad' },
        { fontSize: 8, text: clase.gradoConsangAFCancerPulmon },
        {}
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Antecedentes familiares de cáncer de próstata' },
        {},
        { fontSize: 8, text: clase.aFCancerProstota ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Grado de Consanguinidad' },
        { fontSize: 8, text: clase.gradoConsangAFProstota },
        {}
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Antecedentes familiares de cáncer otro' },
        {},
        {},
        { fontSize: 8, text: clase.aFCancerOtro ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Grado de Consanguinidad' },
        { fontSize: 8, text: clase.gradoConsangAFOtro }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Exposición a radiación ionizante adolescencia' },
        {},
        {},
        { fontSize: 8, text: clase.exposicionRIAdolecencia ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'edad' },
        { fontSize: 8, text: clase.edadExposicionRIAdolecencia }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Ha tenido enfermedad benigna previa' },
        {},
        {},
        { fontSize: 8, text: clase.haTenidoEBenignaPrevia ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'edad' },
        { fontSize: 8, text: clase.edadEBenignaPrevia }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Aumento de IMC después de la menopausia' },
        {},
        {},
        { fontSize: 8, colSpan: 3, text: clase.aumentoIMCDespuesMenopausia ? "SI" : "NO" },
        {},
        {}
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'ha usado terapia de reemplazo hormonal mayor a 5 años' },
        {},
        {},
        { fontSize: 8, text: clase.terapiaReemplazoHormonalMayor5 ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'edad' },
        { fontSize: 8, text: clase.cualterapiaReemplazoHormonalMayor5 }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Portadora de mutación genética conocida' },
        {},
        {},
        { fontSize: 8, text: clase.portadoraMutacionGeneticaConocida ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Cual' },
        { fontSize: 8, text: clase.cualPortadoraMutacionGeneticaConocida }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Ha tenido radioterapia sobre la pared del tórax con una edad menor de 30 años' },
        {},
        {},
        { fontSize: 8, text: clase.haTenidoRadioterapiaSPToraxMenor30 ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'edad' },
        { fontSize: 8, text: clase.cualHaTenidoRadioterapiaSPToraxMenor30 }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Riesgo en el transcurso de la vida >30% estimado por alguno de los modelos existentes' },
        {},
        {},
        { fontSize: 8, text: clase.riesgoTranscursoMayor30 ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Cual' },
        { fontSize: 8, text: clase.cualRiesgoTranscursoMayor30 }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Biopsias mamarias previas cuyo resultado muestre atipias' },
        {},
        {},
        { fontSize: 8, text: clase.biopsiaMamariasMuestreAtipias ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Resultado' },
        { fontSize: 8, text: clase.resultadoBiopsiaMamariasMuestreAtipias }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Diagnóstico histológico de neoplasia lobulillar in situ' },
        {},
        {},
        { fontSize: 8, text: clase.diagnosticoHistologicoNeoplasiaLobulillar ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'observación' },
        { fontSize: 8, text: clase.cualDiagnosticoHistologicoNeoplasiaLobulillar }
      ],
      [
        { fontSize: 8, colSpan: 3, bold: true, text: 'Densidad mamaria mayor al 75%' },
        {},
        {},
        { fontSize: 8, text: clase.densidadMamariaMayor75 ? "SI" : "NO" },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, text: clase.observacionDensidadMamariaMayor75 }
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'Mamografía' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Fecha del orden de mamografía' },
        { fontSize: 8, text: clase.mamografia.fechaOrdenMamografia },
        { fontSize: 8, bold: true, text: 'Fecha del toma de mamografía' },
        { fontSize: 8, text: clase.mamografia.fechaTomaMamografia },
        { fontSize: 8, bold: true, text: 'Fecha resultado' },
        { fontSize: 8, text: clase.mamografia.fechaResultado }
      ],
      [
        { fontSize: 8, bold: true, text: 'resultado' },
        { fontSize: 8, text: clase.mamografia.resultado },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, colSpan: 3, text: clase.mamografia.comentario },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'Ecografía' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Fecha del orden de Ecografía' },
        { fontSize: 8, text: clase.ecografia.fechaOrdenEcografia },
        { fontSize: 8, bold: true, text: 'Fecha del toma de Ecografía' },
        { fontSize: 8, text: clase.ecografia.fechaTomaEcografia },
        { fontSize: 8, bold: true, text: 'Fecha resultado' },
        { fontSize: 8, text: clase.ecografia.fechaResultado }
      ],
      [
        { fontSize: 8, bold: true, text: 'resultado' },
        { fontSize: 8, text: clase.ecografia.resultado },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, text: clase.ecografia.comentario },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'Biopsia' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'Fecha del orden de Biopsia' },
        { fontSize: 8, text: clase.biopsia.fechaOrdenBiopsia },
        { fontSize: 8, bold: true, text: 'Fecha del toma de Biopsia' },
        { fontSize: 8, text: clase.biopsia.fechaTomaBiopsia },
        { fontSize: 8, bold: true, text: 'Fecha resultado' },
        { fontSize: 8, text: clase.biopsia.fechaResultado }
      ],
      [
        { fontSize: 8, bold: true, text: 'resultado' },
        { fontSize: 8, text: clase.biopsia.resultado },
        { fontSize: 8, bold: true, text: 'Observaciones:' },
        { fontSize: 8, text: clase.biopsia.comentario },
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, colSpan: 6, text: 'VPH' },
        {},
        {},
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, bold: true, text: 'resultado' },
        { fontSize: 8, text: clase.resultadovph },
        {},
        {},
        {},
        {}
      ],

    );

    return body;
  }
}
