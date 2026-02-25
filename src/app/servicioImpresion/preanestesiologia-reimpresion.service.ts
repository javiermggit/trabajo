import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReimpresionAnestesiologia } from '../Modelos/HCUnificado';
import { VMPaciente } from '../Modelos/Modelos';
import { ImpresionGeneralService } from './impresion-general.service';
import { PesImpresionService } from './Programas/pes-impresion.service';
import { CrecimientoDesarrolloImpresionService } from './Programas/crecimiento-desarrollo-impresion.service';
import { PrenatalImpresionService } from './Programas/prenatal-impresion.service';
import { AdultoImpresionService } from './Programas/adulto-impresion.service';
import { SaludMentalImpresionService } from './Programas/salud-mental-impresion.service';
import { JovenImpresionService } from './Programas/joven-impresion.service';
import { PlanificacionFamiliarImpresionService } from './Programas/planificacion-familiar-impresion.service';
import { CervixImpresionService } from './Programas/cervix-impresion.service';
import { MamaImpresionService } from './Programas/mama-impresion.service';
import { VacunacionImpresionService } from './Programas/vacunacion-impresion.service';
import { DatePipe } from '@angular/common';
import { AdolescenciaImpresionService } from './Programas/adolescencia-impresion.service';
//import { CertificadoCrecimientoDService } from './certificado-crecimiento-d.service';
//import { AiepiImpresionService } from './Programas/aiepi-impresion.service';
import { EpocImpresionService } from './Programas/epoc-impresion.service';
import { ExamenesFisicosSignosVitales, HCAnestesiologia, ValoracionPrequirurgica } from '../Modelos/HCAnestesiologia';
import { ReimpresionService } from '../../app/mf/main/reimpresion/reimpresion.service';
@Injectable({
  providedIn: 'root'
})
export class PreAnestesiologiaReimpresionService {
  fechahoy = new Date().toISOString().substring(0, 10);
  dd: any;
  private readonly nitEncabezado = 'NIT: 900440054';
  constructor(
    public servGeneral: ImpresionGeneralService,
    public impPes: PesImpresionService,
    public impCD: CrecimientoDesarrolloImpresionService,
    //public impAIEPI: AiepiImpresionService,
    public impPrenatal: PrenatalImpresionService,
    public impAdulto: AdultoImpresionService,
    public impSaludMental: SaludMentalImpresionService,
    public impPlanificacion: PlanificacionFamiliarImpresionService,
    public impJoven: JovenImpresionService,
    public impCervix: CervixImpresionService,
    public impMama: MamaImpresionService,
    public impVacunacion: VacunacionImpresionService,
    public impAdo: AdolescenciaImpresionService,
    public epoc: EpocImpresionService,
   // private cdCertificado: CertificadoCrecimientoDService,
    private datePipe: DatePipe,
    private imp: ReimpresionService,
  ) {
   (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;
  }

  async imprimirHCPreAnestesiologiaPDF(HC: ReimpresionAnestesiologia, imagen) {
    const logoUrl = this.getLogoUrl();
    const includeLogo = await this.canLoadLogo(logoUrl);
    this.dd = {
      pageMargins: [20, 20, 20, 20],
      header: {
        columns: [
          { alignment: "left", margin: [10, 5, 0, 0], text: new Date().toLocaleString() + '', color: "#A4A4A4", fontSize: '10' },
          { alignment: "center", margin: [10, 5, 0, 0], text: HC.datosPaciente.nombre + ' ' + HC.datosPaciente.primer_Apellido + ' ' + HC.datosPaciente.segundo_Apellido, color: "#A4A4A4", fontSize: '7' }
        ]
      },
      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              color: "#A4A4A4",
              fontSize: 9,
              text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount,
              alignment: 'center'
            }
          ]
        };
      },
      content: [],
    }
    if (includeLogo) {
      this.dd.images = {
        logoIps: logoUrl
      };
    }

    this.dd.content.push({
      table: {
        widths: ['20%', '60%', '20%'],
        body: [
          [
            includeLogo ? {
              stack: [
                {
                  image: 'logoIps',
                  alignment: 'center',
                  width: 120,
                  height: 30,
                }
              ]
            } : {
              text: '',
              margin: [0, 10, 0, 0]
            },
            {
              fontSize: 13,
              fillColor: '#fff',
              bold: true,
              margin: [0, 10, 0, 10],
              alignment: 'center',
              text: 'HISTORIA CLÍNICA PREANESTESIOLÓGICA'
            },
            {
              stack: [
                {
                  text: this.nitEncabezado,
                  fontSize: 8,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 2, 10, 2]
                },
                {
                  text: 'Código de habilitación: ' + this.getValidationCode(HC),
                  fontSize: 8,
                  alignment: 'right',
                  margin: [0, 0, 10, 0],
                  noWrap: true
                }
              ]
            }
          ],
        ]
      },
      layout: {
        defaultBorder: false
      },
    });

    this.dd.content.push({ text: '\n' });
    this.dd.content.push(this.servGeneral.datosPacienteUni(HC.datosPaciente, this.datePipe));
    this.dd.content = this.preanestesiologia(HC.anestesiologia, HC.datosPaciente, this.dd.content);
    //, pageBreak: 'before'
    this.dd.content.push({ text: '\n' });

    if (HC.anestesiologia.profesional.firmaMedicoBase != undefined && HC.anestesiologia.profesional.firmaMedicoBase.length > 0) {
      this.dd.content.push(
        [
          {
            stack: [
              {
                image: HC.anestesiologia.profesional.firmaMedicoBase[0],
                alignment: 'center',
                width: 500,
                height: 70,
              }
            ],
          }
        ]);

    }

    const win = window.open('', '_blank');
    const pdf = pdfMake.createPdf(this.dd);
      pdf.getBlob().then((blob: Blob) => {
  const pdfUrl = URL.createObjectURL(blob);

  if (win) {
    win.location.href = pdfUrl;
  } else {
    window.open(pdfUrl, '_blank');
  }
 });

  }

  private getLogoUrl(): string {
    const localLogo = `${window.location.origin}/assets/logo-delta-ips.png`;

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return localLogo;
    }

    if (this.imp.logoIpsUrl && this.imp.logoIpsUrl.trim() !== '') {
      return this.imp.logoIpsUrl.trim();
    }

    return localLogo;
  }

  private async canLoadLogo(url: string): Promise<boolean> {
    if (!url) {
      return false;
    }
    if (url.startsWith('data:image')) {
      return true;
    }

    try {
      const response = await Promise.race([
        fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store' }),
        new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('timeout')), 1200))
      ]);
      return (response as Response).ok;
    } catch {
      return false;
    }
  }

  private getValidationCode(HC: ReimpresionAnestesiologia): string {
    const ts = 2154544;
    return `${ts}`;
  }

  preanestesiologia(hc: HCAnestesiologia, paciente: VMPaciente, content) {

    content.push({ text: '\n' });
    content.push(this.servGeneral.datosHCUnificado(hc));
    content.push({ text: '\n' });
    content.push(this.servGeneral.acompanantes(hc.acompanante));
    content.push(this.servGeneral.motivoConsulta(hc.motivo, hc.ultimaEnfermedad));

    content.push(this.servGeneral.antecedentesPatologicos(hc.antecedentePatologicos));
    content.push(this.servGeneral.tabla(hc.quirurgicos, this.servGeneral.antecedentesQuirurgicos(hc.quirurgicos)));
    content.push(this.servGeneral.tabla(hc.traumaticos, this.servGeneral.antecedentesTraumatologicos(hc.traumaticos)));
    content.push(this.servGeneral.tabla(hc.transfusiones, this.servGeneral.antecedentesTranfusiones(hc.transfusiones)));
    content.push(this.servGeneral.tabla(hc.alergicos, this.servGeneral.antecedentesAlergicos(hc.alergicos)));
    content.push(this.servGeneral.tabla(hc.farmacologicos, this.servGeneral.antecedentesFarmacologicos(hc.farmacologicos)));
    content.push(this.servGeneral.tablaGinoObstetrico(paciente.sexo, hc.antecedenteGinecoObstetrico));
    content.push(this.servGeneral.antecedentesFamiliares(hc.antecedenteFamiliar));
    content.push({ text: '\n' });
    
    if (hc.valoracionPrequirurgica != null) {
      content.push({ text: '\n' });
      content.push(this.valoracionPrequirurgica(hc.valoracionPrequirurgica));
    }

    content.push({ text: '\n' });
    content.push(this.servGeneral.analisisyplan(hc.analisisYplan));
    content.push(this.servGeneral.impresionDiagnostico(hc.diagnosticos));
    content.push(this.servGeneral.finalidadConsulta(hc.diagnosticoPrincipal));
    if (hc.resultadoApoyoDX != null || hc.resultadoImagenologia != null || hc.resultadoLaboratorio != null) {
      if (hc.resultadoApoyoDX.length > 0 || hc.resultadoImagenologia.length > 0 || hc.resultadoLaboratorio.length > 0) {
        content.push({ text: '\n' });
        content.push(this.servGeneral.tablaParaclinicos(hc.resultadoApoyoDX, hc.resultadoImagenologia, hc.resultadoLaboratorio));
      }
    }

    if (hc.incapacidad != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaIncapacidad(hc.incapacidad));
    }
    if (hc["listadoOrdenamientos"] != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaOdenamiento(hc["listadoOrdenamientos"]));
    }

    if (hc.medicamento != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaMedicamento(hc.medicamento));
    }

    if (hc.recomendacionesMedicas != null && hc.recomendacionesMedicas != "") {
      content.push({ fontSize: 8, bold: true, text: '\nRECOMENDACIONES MEDICAS' });
      content.push({ fontSize: 8, text: hc.recomendacionesMedicas });
      content.push({ text: '\n' });
    }
    return content;
  }


  valoracionPrequirurgica(valoracion: ValoracionPrequirurgica) {
    try {
      const table = {
        widths: ['25%', '25%', '25%', '25%'],
        body: []
      };

      table.body = this.construirBody(valoracion);

      let layout = {
        defaultBorder: true
      };

      var respuesta = { table, layout }

      return respuesta;
    } catch (error) {
      return '';
    }
  }

  private construirBody(valoracion: ValoracionPrequirurgica): any[] {
    let body = [
      this.crearFilaTitulo('INTERPRETACIÓN AYUDA DX', false, 4, '#cfcfcf'),
    ];

    body.push(
      [
        { fontSize: 8, colSpan: 2, text: 'NOMBRE', alignment: 'center' },
        {},
        { fontSize: 8, colSpan: 2, text: 'FECHA', alignment: 'center' },
        {}
      ]
    );
    // Agregar filas dinámicas
    const items = [
      { label: 'Protombina', value: valoracion.interpretacionAyudaDx.protombina == null ? '' :  valoracion.interpretacionAyudaDx.protombina, fecha: valoracion.interpretacionAyudaDx.protombinaFecha },
      { label: 'Glicemia', value: valoracion.interpretacionAyudaDx.glicemia== null ? '' :  valoracion.interpretacionAyudaDx.glicemia, fecha: valoracion.interpretacionAyudaDx.glicemiaFecha },
      { label: 'TPT', value: valoracion.interpretacionAyudaDx.tpt== null ? '' :  valoracion.interpretacionAyudaDx.tpt, fecha: valoracion.interpretacionAyudaDx.tptFecha },
      { label: 'Creatinina', value: valoracion.interpretacionAyudaDx.creatinina== null ? '' :  valoracion.interpretacionAyudaDx.creatinina, fecha: valoracion.interpretacionAyudaDx.creatininaFecha },
      { label: 'Hemograma', value: valoracion.interpretacionAyudaDx.hemograma== null ? '' :  valoracion.interpretacionAyudaDx.hemograma, fecha: valoracion.interpretacionAyudaDx.hemogramaFecha },
      { label: 'Electrocardiograma', value: valoracion.interpretacionAyudaDx.electrocardiograma== null ? '' :  valoracion.interpretacionAyudaDx.electrocardiograma, fecha: valoracion.interpretacionAyudaDx.electrocardiogramaFecha },
      { label: 'RadiografiaTorax', value: valoracion.interpretacionAyudaDx.radiografiaTorax== null ? '' :  valoracion.interpretacionAyudaDx.radiografiaTorax, fecha: valoracion.interpretacionAyudaDx.radiografiaToraxFecha },
      { label: 'TSH', value: valoracion.interpretacionAyudaDx.tsh== null ? '' :  valoracion.interpretacionAyudaDx.tsh, fecha: valoracion.interpretacionAyudaDx.tshFecha },
    ];

    items.forEach(item => {
      body.push(this.crearFilaDinamica(item.label, item.value, item.fecha));
    });
    body.push(this.crearFilaOtrosExamenes(valoracion.interpretacionAyudaDx.otrosExamenes));

    body.push(this.crearFilaTitulo('EXAMEN FISICOS SIGNOS VITALES', true, 4, '#cfcfcf'));
    body.push([
      { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.peso ? `Peso: ${valoracion.examenesFisicosSignosVitales.peso}` : 'Peso: ' },
      { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.talla ? `Talla: ${valoracion.examenesFisicosSignosVitales.talla}` : 'Talla: ' },
      { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.imc ? `IMC: ${valoracion.examenesFisicosSignosVitales.imc}` : 'IMC: ' },
      { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.taSistolica ? `TA Sistólica: ${valoracion.examenesFisicosSignosVitales.taSistolica}` : 'TA Sistólica: ' }
    ],
      [
        { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.taDiastolica ? `TA Diastólica: ${valoracion.examenesFisicosSignosVitales.taDiastolica}` : 'TA Diastólica: ' },
        { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.frecuenciaRespiratoria ? `Frecuencia Respiratoria: ${valoracion.examenesFisicosSignosVitales.frecuenciaRespiratoria}` : 'Frecuencia Respiratoria: ' },
        { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.frecuenciaCardiaca ? `Frecuencia Cardiaca: ${valoracion.examenesFisicosSignosVitales.frecuenciaCardiaca}` : 'Frecuencia Cardiaca: ' },
        { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.saturacionOxigeno ? `Saturación Oxígeno: ${valoracion.examenesFisicosSignosVitales.saturacionOxigeno}` : 'Saturación Oxígeno: ' }
      ],
      [
        { fontSize: 8, colSpan: 1, text: valoracion.examenesFisicosSignosVitales.temperatura ? `Temperatura: ${valoracion.examenesFisicosSignosVitales.temperatura}` : 'Temperatura: ' },
        {},
        {},
        {}
      ]
    );

    body.push(this.crearFilaTitulo('VALORACION CLINICA', true, 4, '#cfcfcf'));
    valoracion.valoracionClinica.forEach(valoracion => {
      body.push(this.crearFilaTitulo(valoracion.descripcion.toUpperCase() ? valoracion.descripcion.toUpperCase() : '', true, 4, ''));
      body.push(
        [
          { fontSize: 8, colSpan: 2, text: 'PREGUNTA', alignment: 'center' },
          {},
          { fontSize: 8, colSpan: 2, text: 'RESPUESTA', alignment: 'center' },
          {}
        ]
      );
      valoracion.hijos.forEach(hijo => {
        body.push(
          [
            { fontSize: 8, colSpan: 2, text: hijo.pregunta ? hijo.pregunta : '' },
            {},
            { fontSize: 8, colSpan: 2, text: hijo.respuesta ? 'SI' : 'NO' },
            {}
          ]
        );
      });
      body.push([
        { fontSize: 8, colSpan: 4, text: valoracion.observacion ? `Observación: ${valoracion.observacion}` : 'Observación: ' },
      ]);
    });

    body.push(this.crearFilaTitulo('ESTADOS', true, 4, '#cfcfcf'));
    body.push(
      [
        { fontSize: 8, colSpan: 1, text: valoracion.estados.nutricional ? `Nutricional: ${valoracion.estados.nutricional}` : 'Nutricional:' },
        { fontSize: 8, colSpan: 3, text: valoracion.estados.observacionNutricional ? `Observación: ${valoracion.estados.observacionNutricional}` : 'Observación:' },
      ],
      [
        { fontSize: 8, colSpan: 1, text: valoracion.estados.pulmonar ? `Pulmonar: ${valoracion.estados.pulmonar}` : 'Pulmonar:' },
        { fontSize: 8, colSpan: 3, text: valoracion.estados.observacionPulmonar ? `Observación: ${valoracion.estados.observacionPulmonar}` : 'Observación:' },
      ]
    );

    body.push(this.crearFilaTitulo('DEFINICIÓN DEL RIESGO', true, 4, '#cfcfcf'));
    if (valoracion.definicionRiesgo.clasificacionASA.descripcion) {
      body.push(
        [
          { fontSize: 8, colSpan: 4, text: 'CLASIFICACIÓN ASA' },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, text: `${valoracion.definicionRiesgo.clasificacionASA.id} - ${valoracion.definicionRiesgo.clasificacionASA.descripcion}` },
          {},
          { fontSize: 8, colSpan: 2, text: `Otros: ${valoracion.definicionRiesgo.clasificacionASA.otros}` },
          {}
        ]
      );
    }

    if (valoracion.definicionRiesgo.categoriaRiesgo.descripcion) {
      body.push(
        [
          { fontSize: 8, colSpan: 4, text: 'CATEGORIA DEL RIESGO' },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, text: `${valoracion.definicionRiesgo.categoriaRiesgo.id} - ${valoracion.definicionRiesgo.categoriaRiesgo.descripcion}` },
          {},
          { fontSize: 8, colSpan: 2, text: `Otros: ${valoracion.definicionRiesgo.categoriaRiesgo.otros}` },
          {}
        ]
      );
    }

    if (valoracion.definicionRiesgo.clasificacionViaAerea.descripcion) {
      body.push(
        [
          { fontSize: 8, colSpan: 4, text: 'CLASIFICACIÓN VIA AEREA' },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, text: `${valoracion.definicionRiesgo.clasificacionViaAerea.id} - ${valoracion.definicionRiesgo.clasificacionViaAerea.descripcion}` },
          {},
          { fontSize: 8, colSpan: 2, text: `Otros: ${valoracion.definicionRiesgo.clasificacionViaAerea.otros}` },
          {}
        ]
      );
    }

    if (valoracion.definicionRiesgo.riesgoTromboembolismo.descripcion) {
      body.push(
        [
          { fontSize: 8, colSpan: 4, text: 'RIESGO TROMBOEMBOLISMO' },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, text: `${valoracion.definicionRiesgo.riesgoTromboembolismo.id} - ${valoracion.definicionRiesgo.riesgoTromboembolismo.descripcion}` },
          {},
          { fontSize: 8, colSpan: 2, text: `Otros: ${valoracion.definicionRiesgo.riesgoTromboembolismo.otros}` },
          {}
        ]
      );
    }

    if (valoracion.definicionRiesgo.clasificacionViabilidad.descripcion) {
      body.push(
        [
          { fontSize: 8, colSpan: 4, text: 'CLASIFICACIÓN VIABILIDAD' },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, text: `${valoracion.definicionRiesgo.clasificacionViabilidad.id} - ${valoracion.definicionRiesgo.clasificacionViabilidad.descripcion}` },
          {},
          { fontSize: 8, colSpan: 2, text: `Otros: ${valoracion.definicionRiesgo.clasificacionViabilidad.otros}` },
          {}
        ]
      );
    }

    if (valoracion.definicionRiesgo.destinoCirugia.descripcion) {
      body.push(
        [
          { fontSize: 8, colSpan: 4, text: 'DESTINO CIRUGIA' },
          {},
          {},
          {}
        ],
        [
          { fontSize: 8, colSpan: 2, text: `${valoracion.definicionRiesgo.destinoCirugia.id} - ${valoracion.definicionRiesgo.destinoCirugia.descripcion}` },
          {},
          { fontSize: 8, colSpan: 2, text: `Otros: ${valoracion.definicionRiesgo.destinoCirugia.otros}` },
          {}
        ]
      );
    }

    if (valoracion.definicionRiesgo.procedimientosViables.length > 0) {
      body.push(
        [
          { fontSize: 8, colSpan: 4, text: 'PROCEDIMIENTOS VIABLES' },
          {},
          {},
          {}
        ]
      );
      valoracion.definicionRiesgo.procedimientosViables.forEach(items => {
        
        body.push(
          [
            { fontSize: 8, colSpan: 4, text: `Procedimiento: ${items.procedimiento.codigo} - ${items.procedimiento.descripcion}` },
            {},
            {},
            {}
          ]
        );
      });
    }

    body.push(
      [
        { fontSize: 8, colSpan: 4, text: `Justificación : ${valoracion.definicionRiesgo.justificacionDestino}` },
        {},
        {},
        {}
      ],
      [
        { fontSize: 8, colSpan: 4, text: `Observación : ${valoracion.definicionRiesgo.observacion}` },
        {},
        {},
        {}
      ]
    );

    return body;
  }


  private crearFilaTitulo(texto: string, bold: boolean, colSpan: number, fillColor: string): any[] {
    return [
      { fontSize: 8, bold, fillColor, colSpan, text: texto },
      {}, {}, {}
    ];
  }

  private crearFilaDinamica(label: string, value: string, fecha: string): any[] {
    return [
      { fontSize: 8, colSpan: 2, text: `${label}: ${value}` },
      {},
      { fontSize: 8, colSpan: 2, text: fecha ? fecha : "" },
      {}
    ];
  }


  private crearFilaOtrosExamenes(otrosExamenes: string): any[] {
    return [
      { fontSize: 8, colSpan: 4, text: `OtrosExamenes: ${otrosExamenes ? otrosExamenes : ""}` },
      {}, {}, {}
    ];
  }

}
