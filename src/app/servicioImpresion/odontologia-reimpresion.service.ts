import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReimpresionOdontologia } from '../Modelos/HCUnificado';
import { VMOdontologiaOdontograma } from '../Modelos/Odontologia';
import { ImpresionGeneralService } from './impresion-general.service';
import { ReimpresionService } from '../../app/mf/main/reimpresion/reimpresion.service';

@Injectable({
  providedIn: 'root'
})
export class OdontologiaReimpresionService {
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

  async imprimirHCOdontologicaPDF(HC: ReimpresionOdontologia, imagen: any) {
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
              text: 'HISTORIA CLÍNICA ODONTOLOGICA'
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

    this.dd.content = this.odontologiaHC(HC.odontologia, this.dd.content);
    this.dd.content.push({ text: '\n' });
    if (HC.odontologia.odontologia.profesional.firmaMedicoBase != undefined && HC.odontologia.odontologia.profesional.firmaMedicoBase.length > 0) {
      this.dd.content.push(
        [
          {
            stack: [
              {
                image: HC.odontologia.odontologia.profesional.firmaMedicoBase[0],
                alignment: 'center',
                width: 160,
                height: 70,
              }
            ],
          }
        ]);
    }


    const win = window.open('', '_blank');
    const pdf = pdfMake.createPdf(this.dd) as any;
    pdf.getBlob((blob: Blob) => {
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

  private getValidationCode(HC: ReimpresionOdontologia): string {
    const ts = 2154544;
    return `${ts}`;
  }

  odontologiaHC(hc: VMOdontologiaOdontograma,content: any[]) {

    content.push({ text: '\n' });
    content.push(this.servGeneral.datosHCUnificado(hc.odontologia));
    content.push({ text: '\n' });
    content.push(this.servGeneral.acompanantes(hc.odontologia.acompanante));
    content.push(this.servGeneral.motivoConsulta(hc.odontologia.motivo, hc.odontologia.ultimaEnfermedad));
    content.push(this.servGeneral.antecedentesPatologicosOdontolgocis(hc.odontologia.antecedentePatologicos));
    content.push(this.servGeneral.tabla(hc.odontologia.quirurgicos, this.servGeneral.antecedentesQuirurgicos(hc.odontologia.quirurgicos)));
    content.push(this.servGeneral.tabla(hc.odontologia.traumaticos, this.servGeneral.antecedentesTraumatologicos(hc.odontologia.traumaticos)));
    content.push(this.servGeneral.tabla(hc.odontologia.traumaticos, this.servGeneral.antecedentesTranfusiones(hc.odontologia.transfusiones)));
    content.push(this.servGeneral.tabla(hc.odontologia.alergicos, this.servGeneral.antecedentesAlergicos(hc.odontologia.alergicos)));
    content.push(this.servGeneral.tabla(hc.odontologia.farmacologicos, this.servGeneral.antecedentesFarmacologicos(hc.odontologia.farmacologicos)));
    content.push(this.servGeneral.antecedentesFamiliaresOdonto(hc.odontologia.antecedenteFamiliar));

    if (hc.odontologia.antecedenteOdontologico != null) {
      content.push({
        table: {
          widths: ['30%', '10%', '60%'],
          body: this.servGeneral.antecedentesEstomatologico(hc.odontologia.antecedenteOdontologico.examenEstomatologico),

        },
        layout: {
          defaultBorder: true
        },
      });
      content.push({
        table: {
          widths: ['30%', '10%', '60%'],
          body: this.servGeneral.antecedentesOclusal(hc.odontologia.antecedenteOdontologico.examenOclusal),

        },
        layout: {
          defaultBorder: true
        },
      });
      content.push({
        table: {
          widths: ['30%', '10%', '60%'],
          body: this.servGeneral.antecedentesHabitoOral(hc.odontologia.antecedenteOdontologico.habitoOral),

        },
        layout: {
          defaultBorder: true
        },
      });
      content.push({
        table: {
          widths: ['30%', '10%', '30%', '30%'],
          body: this.servGeneral.antecedentesHabitosHigieneOral(hc.odontologia.antecedenteOdontologico.habitosHigieneOral),

        },
        layout: {
          defaultBorder: true
        },
      });
      content.push({
        table: {
          widths: ['30%', '10%', '60%'],
          body: this.servGeneral.antecedentesPulpar(hc.odontologia.antecedenteOdontologico.examenPulpar),

        },
        layout: {
          defaultBorder: true
        },
      });
      content.push({
        table: {
          widths: ['30%', '10%', '60%'],
          body: this.servGeneral.antecedentesPeriodontal(hc.odontologia.antecedenteOdontologico.examenPeriodontal),

        },
        layout: {
          defaultBorder: true
        },
      });


    }

    content.push(this.servGeneral.analisisyplan(hc.odontologia.analisisYplan));
    content.push(this.servGeneral.impresionDiagnosticoOdontologica(hc.odontologia.diagnosticos));
    content.push(this.servGeneral.finalidadConsulta(hc.odontologia.diagnosticoPrincipal));
    if (hc.odontologia.incapacidad != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaIncapacidad(hc.odontologia.incapacidad));
    }

    if (hc.odontologia['ListadoOrdenamientos'] != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaOdenamientoOdontologia(hc.odontologia['ListadoOrdenamientos']));
    }

    if (hc.odontologia.medicamento != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaMedicamento(hc.odontologia.medicamento));
    }


      content.push({
        fontSize: 8, bold: true, text: hc.odontologia.recomendacionesMedicas == null ? "" : '\nRECOMENDACIONES MEDICAS',
      });
      content.push({
        fontSize: 8, text: hc.odontologia.recomendacionesMedicas == null ? "NO REFIERE" : hc.odontologia.recomendacionesMedicas,
      });
  
      
    if (hc.odontograma != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.odontogramaOdontologia(hc.odontograma.odontograma, hc.odontograma.imagen));


      content.push({
        fontSize: 8, bold: true, text: '\nOBSERVACION ODONTOGRAMA'
      });
      content.push({ fontSize: 8, text: hc.odontograma.observacion == null || hc.odontograma.observacion == "" ? "NO REFIERE" : hc.odontograma.observacion });
    }

    if (hc.odontologia.indicadoresCOP != null) {
      content.push({ text: '\n' });
      content.push({
        table: {
          widths: ['20%', '20%', '20%', '20%', '20%'],
          body: [
            [
              { fontSize: 8, colSpan: 5, bold: true, text: 'INDICADORES COP' },
              {},
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, bold: true, text: 'SANOS: ' + hc.odontologia.indicadoresCOP.sano },
              { fontSize: 8, bold: true, text: 'CARIADO NO CAVITACIONAL: ' + hc.odontologia.indicadoresCOP.cariadoNoCavitacional },
              { fontSize: 8, bold: true, text: 'CARIADO CAVITACIONAL: ' + hc.odontologia.indicadoresCOP.cariado },
              { fontSize: 8, bold: true, text: 'OBTURADOS: ' + hc.odontologia.indicadoresCOP.obsturado },
              { fontSize: 8, bold: true, text: 'PERDIDOS: ' + hc.odontologia.indicadoresCOP.perdido },
            ],
            [
              { fontSize: 8, bold: true, text: 'Extraídos por ortodoncia: ' + hc.odontologia.indicadoresCOP.extraidoOrtodoncia },
              { fontSize: 8, colSpan: 4, bold: true, text: 'TOTAL: ' + hc.odontologia.indicadoresCOP.total },
              {},
              {},
              {},
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      });
    }

    if (hc.odontologia.indicadoresCEO != null) {
      content.push({ text: '\n' });
      content.push({
        table: {
          widths: ['20%', '20%', '20%', '20%', '20%'],
          body: [
            [
              { fontSize: 8, colSpan: 5, bold: true, text: 'INDICADORES CEO' },
              {},
              {},
              {},
              {},
            ],
            [
              { fontSize: 8, bold: true, text: 'SANOS: ' + hc.odontologia.indicadoresCEO.sano },
              { fontSize: 8, bold: true, text: 'CARIADO NO CAVITACIONAL: ' + hc.odontologia.indicadoresCEO.cariadoNoCavitacional },
              { fontSize: 8, bold: true, text: 'CARIADO CAVITACIONAL: ' + hc.odontologia.indicadoresCEO.cariado },
              { fontSize: 8, bold: true, text: 'EXFOLIADO: ' + hc.odontologia.indicadoresCEO.exfoliado },
              { fontSize: 8, bold: true, text: 'OBTURADOS: ' + hc.odontologia.indicadoresCEO.obsturado },
            ],
            [
              { fontSize: 8, bold: true, text: 'Extraídos por ortodoncia: ' + hc.odontologia.indicadoresCEO.extraidoOrtodoncia },
              { fontSize: 8, colSpan: 4, bold: true, text: 'TOTAL: ' + hc.odontologia.indicadoresCEO.total },
              {},
              {},
              {},
            ],
          ]
        },
        layout: {
          defaultBorder: true
        },
      });
    }

    if (hc.indicadorPlaca != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.indicadorPlacaOdontologia(hc.indicadorPlaca.odontograma, hc.indicadorPlaca.imagen));
    }

    if (hc.evolucion != null) {
      content.push({ text: '\n' });
      content.push(this.servGeneral.tablaEvolucion(hc.evolucion));
    }
    


    if (hc.odontologia['notaAdministrativa'] != null) {
      content.push({ text: '\n' });
      if (hc.odontologia['notaAdministrativa'].length > 0) {
        content.push(this.servGeneral.tablaNotaAdministrativa(hc.odontologia['notaAdministrativa']));
        content.push({ text: '\n' });
      }
    }

    return content;
  }
}
