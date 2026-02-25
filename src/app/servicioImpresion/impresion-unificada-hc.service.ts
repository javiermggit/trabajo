import { Injectable, QueryList, ViewChildren } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
//import htmlToImage from 'html-to-image';
import { PesImpresionService } from './Programas/pes-impresion.service';
import { CrecimientoDesarrolloImpresionService } from './Programas/crecimiento-desarrollo-impresion.service';
import { PrenatalImpresionService } from './Programas/prenatal-impresion.service';
import { AdultoImpresionService } from './Programas/adulto-impresion.service';
import { SaludMentalImpresionService } from './Programas/salud-mental-impresion.service';
import { JovenImpresionService } from './Programas/joven-impresion.service';
import { PlanificacionFamiliarImpresionService } from './Programas/planificacion-familiar-impresion.service';
import { CervixImpresionService } from './Programas/cervix-impresion.service';
import { MamaImpresionService } from './Programas/mama-impresion.service';
//import { ReimpresionService } from '../reimpresion/reimpresion.service';
import { ReimpresionService } from '../../app/mf/main/reimpresion/reimpresion.service';
import { ImpresionGeneralService } from './impresion-general.service';
import { VacunacionImpresionService } from './Programas/vacunacion-impresion.service';
import { HCUnificado } from '../Modelos/HCUnificado';
import { HCEnfermeria } from '../Modelos/Enfermeria';
import { HCMorbilidad, VMPaciente } from '../Modelos/Modelos';
import { HCProcedimiento } from '../Modelos/Procedimiento';
import { VMOdontologiaOdontograma } from '../Modelos/Odontologia';
//import { OdontogramaVisualizacionComponent } from '../odontologia/odontograma-visualizacion/odontograma-visualizacion.component';
//import { OdontogramaVisualizacionService } from '../odontologia/odontograma-visualizacion/odontograma-visualizacion.service';
//import { CertificadoCrecimientoDService } from './certificado-crecimiento-d.service';
import { MorbilidadReimpresionService } from './morbilidad-reimpresion.service';
import { EnfermeriaReimpresionService } from './enfermeria-reimpresion.service';
import { OdontologiaReimpresionService } from './odontologia-reimpresion.service';
import { ProcedimientoReimpresionService } from './procedimiento-reimpresion.service';

@Injectable({
  providedIn: 'root'
})
export class ImpresionUnificadaHCService {
  fechahoy = new Date().toISOString().substring(0, 10);
  img: any;
  dd: any;
  i: number = 0;
  private readonly nitEncabezado = 'NIT: 900440054';
  private currentValidationCode = '';
  //@ViewChildren(OdontogramaVisualizacionComponent) odontogramaComponent: QueryList<OdontogramaVisualizacionComponent>;

  constructor(
    private datePipe: DatePipe,
    public imp: ReimpresionService,
    public servGeneral: ImpresionGeneralService,
    public impPes: PesImpresionService,
    //private se: OdontogramaVisualizacionService,
    public impCD: CrecimientoDesarrolloImpresionService,
    public impPrenatal: PrenatalImpresionService,
    public impAdulto: AdultoImpresionService,
    public impSaludMental: SaludMentalImpresionService,
    public impPlanificacion: PlanificacionFamiliarImpresionService,
    public impJoven: JovenImpresionService,
    public impCervix: CervixImpresionService,
    public impMama: MamaImpresionService,
    public impVacunacion: VacunacionImpresionService,
    //public cdCertificado: CertificadoCrecimientoDService,
    public reimpresionMorb: MorbilidadReimpresionService,
    public reimpresionEnf: EnfermeriaReimpresionService,
    public reimpresionOdo: OdontologiaReimpresionService,
    public reimpresionProc: ProcedimientoReimpresionService) {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;
  }

  async imprimirHCPDF(HC: HCUnificado) {
    const logoUrl = this.getLogoUrl();
    const includeLogo = await this.canLoadLogo(logoUrl);

    this.i = 0;
    this.currentValidationCode = this.getValidationCode(HC);
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
    this.encabezado(includeLogo);
    this.dd.content.push(this.servGeneral.datosPacienteUni(HC.datosPaciente, this.datePipe));
    this.dd.content.push({ text: '\n' });
    this.morbilidadHC(HC.listaMorbilidad, HC.datosPaciente, HC.listadoPreguntas);
    this.enfermeriaHC(HC.listaEnfermeria, HC.datosPaciente, HC.listadoPreguntas);
    this.procedimientoHC(HC.listaProcedimiento);
    this.odontologiaHC(HC.listaOdontologia, HC.datosPaciente);

    this.dd.content.push({ text: '\n' });

    if (HC.listadoGraficas != undefined) {
      if (HC.listadoGraficas.length > 0) {
        this.dd.content.push({ text: 'Graficas PYP\n' });
        HC.listadoGraficas.forEach(item => {
          this.dd.content.push(
            [
              {
                stack: [
                  {
                    image: item,
                    alignment: 'center',
                    width: 400,
                    height: 250,
                  }
                ],
                colSpan: 6
              },
              {},
              {},
              {},
              {},
              {}
            ]);

        });
      }
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

  morbilidadHC(listaMorbilidad: Array<HCMorbilidad>, paciente:VMPaciente, listado) {
    listaMorbilidad.forEach(hc => {
      this.i++;
      this.dd.content.push({ text: '\n' });

      paciente.edadMeses = hc.edadPaciente;
      this.dd.content.push({
        table: {
          widths: ['100%'],
          body: [
            [
              { text: 'ATENCIÓN CONSULTA #' + this.i, fontSize: 9, bold: true, fillColor: 'gray' }
            ]
          ]
        },
        layout: {
          defaultBorder: true
        },
      });

      this.dd.content = this.reimpresionMorb.morbilidad(hc, paciente, listado, this.dd.content);

    });
  }

  enfermeriaHC(listaEnfermeria: Array<HCEnfermeria>, paciente, listado) {
    listaEnfermeria.forEach(hc => {
      this.i++;
      this.dd.content.push({ text: '\n' });
      paciente.edadMeses = hc.edadPaciente;
      this.dd.content.push({
        table: {
          widths: ['100%'],
          body: [
            [
              { text: 'ATENCIÓN CONSULTA #' + this.i, fontSize: 9, bold: true, fillColor: 'gray' }
            ]
          ]
        },
        layout: {
          defaultBorder: true
        },
      });

      this.dd.content = this.reimpresionEnf.enfermeria(hc, paciente, listado, this.dd.content);
    });
  }

  procedimientoHC(listaProcedimiento: Array<HCProcedimiento>) {
    listaProcedimiento.forEach(hc => {
      this.i++;
      this.dd.content.push({ text: '\n' });
      this.dd.content.push({
        table: {
          widths: ['100%'],
          body: [
            [
              { text: 'ATENCIÓN CONSULTA #' + this.i, fontSize: 9, bold: true, fillColor: 'gray' }
            ]
          ]
        },
        layout: {
          defaultBorder: true
        },
      });

      this.dd.content = this.reimpresionProc.procedimientoHC(hc, this.dd.content);

    });

  }

  odontologiaHC(listaOdontologia: Array<VMOdontologiaOdontograma>, paciente) {
    listaOdontologia.forEach(hc => {
      this.i++;
      this.dd.content.push({ text: '\n' });
      this.dd.content.push({
        table: {
          widths: ['100%'],
          body: [
            [
              { text: 'ATENCIÓN CONSULTA #' + this.i, fontSize: 9, bold: true, fillColor: 'gray' }
            ]
          ]
        },
        layout: {
          defaultBorder: true
        },
      });

      this.dd.content = this.reimpresionOdo.odontologiaHC(hc,this.dd.content);


    });
  }

  encabezado(includeLogo: boolean) {
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
              text: 'HISTORIAS CLÍNICA'
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
                  text: 'Código de habilitación: ' + this.currentValidationCode,
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

  private getValidationCode(HC: HCUnificado): string {
    const ts = 2154544;
    return `${ts}`;
  }

  imagen() {
    if (this.imp.profesional.firmaMedico == "" || this.imp.profesional.firmaMedico == null || this.imp.profesional.firmaMedico == undefined) {
      return {
        text: '\n',
      };
    } else {
      if (this.img == "") {
        return '';
      } else {
        return {
          table: {
            widths: ['30%', '40%', '30%'],
            body: [
              [
                {
                  text: ''
                },
                {
                  stack: [
                    {
                      image: this.img,
                      alignment: 'center',
                      width: 200,
                      height: 100,
                    }
                  ]
                },
                {
                  text: ''
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


  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      this.img = new Image();
      this.img.setAttribute("crossOrigin", "anonymous");
      this.img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = this.img.width;
        canvas.height = this.img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this.img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      this.img.onerror = error => {
        resolve("");
      };

      this.img.src = url;
    });
  }

}
