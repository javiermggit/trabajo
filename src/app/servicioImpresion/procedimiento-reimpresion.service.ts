import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ImpresionGeneralService } from './impresion-general.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReimpresionProcedimientos } from '../Modelos/HCUnificado';
import { HCProcedimiento } from '../Modelos/Procedimiento';
import { ReimpresionService } from '../../app/mf/main/reimpresion/reimpresion.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoReimpresionService {
  fechahoy = new Date().toISOString().substring(0, 10);
  dd: any;
  private readonly nitEncabezado = 'NIT: 900440054';
  constructor(
    public servGeneral: ImpresionGeneralService,
    private datePipe: DatePipe,
    public imp: ReimpresionService
   ) {
     (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;
  }


  async imprimirHCProcedimientoPDF(HC: ReimpresionProcedimientos, imagen: any) {
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
      footer: function (currentPage: { toString: () => string; }, pageCount: string) {
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
              text: 'HISTORIA CLÍNICA DE PROCEDIMIENTO'
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
    this.dd.content = this.procedimientoHC(HC.procedimiento, this.dd.content);

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

  private getValidationCode(HC: ReimpresionProcedimientos): string {
    const ts = 2154544;
    return `${ts}`;
  }

 procedimientoHC(hc: HCProcedimiento, content: any[]) { 
    content.push({ text: '\n' });
    content.push(this.servGeneral.datosHCUnificado(hc));
    content.push({ text: '\n' });
    content.push({
      table: {
        widths: ['20%', '40%', '20%', '20%'],
        body: this.servGeneral.listadoOrdenamiento(hc['ListadoOrdenamiento'])
      },
      layout: {
        defaultBorder: true
      },
    });

   content.push({
  table: {
    widths: ['20%', '80%'],
    body: [
      [
        { text: 'MAS DATOS', fontSize: 8, bold: true, colSpan: 2 },
        {}
      ],
      [
        { text: 'Paciente firmo consentimiento informado?:', fontSize: 8, bold: true },
        { text: hc?.consentimiento ? 'SI' : 'NO', fontSize: 8 }
      ],
      [
        { text: 'Observaciones del procedimiento:', fontSize: 8, bold: true },
        { text: hc?.orbservaciones || '', fontSize: 8 }
      ],
      [
        { text: 'Recomendaciones medicas:', fontSize: 8, bold: true },
        { text: hc?.recomendacionesMedicas || '', fontSize: 8 }
      ]
    ]
  },
  layout: 'lightHorizontalLines'
});
    if (hc?.diagnosticos?.length) {
      content.push({ text: '\n' });
      content.push({
        table: {
          widths: ['20%', '20%', '60%'],
          body: this.servGeneral.impresionDiagnostica(hc.diagnosticos)
        },
        layout: {
          defaultBorder: true
        },
      });
    }
    if (hc.diagnosticoPrincipal && (hc.diagnosticoPrincipal.tipoDiagnosticoPpal != null || hc.diagnosticoPrincipal.finalidadConsulta != null || hc.diagnosticoPrincipal.causaExterna != null)) {
      content.push({ text: '\n' });
      content.push({
        table: {
          widths: ['20%', '80%'],
          body: [
            [
              { fontSize: 8, bold: true, text: 'Tipo diagnostico principal:' },
              { fontSize: 8, text: hc.diagnosticoPrincipal.tipoDiagnosticoPpal == null ? '' : hc.diagnosticoPrincipal.tipoDiagnosticoPpal.descripcion },
            ],
            [
              { fontSize: 8, bold: true, text: 'Finalidad de consulta:' },
              { fontSize: 8, text: hc.diagnosticoPrincipal.finalidadConsulta == null ? '' : hc.diagnosticoPrincipal.finalidadConsulta.descripcion },
            ],
            [
              { fontSize: 8, bold: true, text: 'Causa externa:' },
              { fontSize: 8, text: hc.diagnosticoPrincipal.causaExterna == null ? '' : hc.diagnosticoPrincipal.causaExterna.nombre },
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      });
    }
    if (hc.resultadoPruebaRapida != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaExamen(hc.resultadoPruebaRapida));
    }

    content.push({ text: '\n' });
    content.push(this.servGeneral.tablaIncapacidad(hc.incapacidad));

   

    if (hc?.ListadoOrdenamientoSolicitados) {
  content.push({ text: '\n' });
  content.push(this.servGeneral.tablaOdenamiento(hc.ListadoOrdenamientoSolicitados));
}

    if (hc.medicamento != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaMedicamento(hc.medicamento));
    }

      if (hc?.NotaAdministrativa) {
  content.push(this.servGeneral.tablaNotaAdministrativa(hc.NotaAdministrativa));
  content.push({ text: '\n' });
   }

    return content;
  }
}
