import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ListadoPreguntas, ReimpresionMorbilidad } from '../Modelos/HCUnificado';
import { HCMorbilidad, VMPaciente } from '../Modelos/Modelos';
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
import { AiepiImpresionService } from './Programas/aiepi-impresion.service';
import { EpocImpresionService } from './Programas/epoc-impresion.service';
//import { ReimpresionService } from '../reimpresion/reimpresion.service';
import { ReimpresionService } from '../../app/mf/main/reimpresion/reimpresion.service';

@Injectable({
  providedIn: 'root'
})
export class MorbilidadReimpresionService {
  fechahoy = new Date().toISOString().substring(0, 10);
  dd: any;
  private nitEncabezado = 'NIT: 900440054';
  constructor(
    private imp: ReimpresionService,
    private servGeneral: ImpresionGeneralService,
    private impPes: PesImpresionService,
    private impCD: CrecimientoDesarrolloImpresionService,
    private impAIEPI: AiepiImpresionService,
    private impPrenatal: PrenatalImpresionService,
    public impAdulto: AdultoImpresionService,
    private impSaludMental: SaludMentalImpresionService,
    private impPlanificacion: PlanificacionFamiliarImpresionService,
    private impJoven: JovenImpresionService,
    private impCervix: CervixImpresionService,
    private impMama: MamaImpresionService,
    private impVacunacion: VacunacionImpresionService,
    private impAdo: AdolescenciaImpresionService,
    private epoc: EpocImpresionService,
    //private cdCertificado: CertificadoCrecimientoDService,
    private datePipe: DatePipe
  ) {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;
  }
  

  async imprimirHCMorbilidadPDF(HC: ReimpresionMorbilidad, imagen) {

    const logoUrl = this.getLogoUrl();
    const includeLogo = await this.canLoadLogo(logoUrl);
    const buildDoc = (includeLogo: boolean) => {
      const doc: any = {
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
      };

      if (includeLogo) {
        doc.images = {
          logoIps: logoUrl
        };
      }

      doc.content.push({
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
                text: 'HISTORIA CLÍNICA'
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
                    bold: true,
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

      doc.content.push({ text: '\n' });
      doc.content.push(this.servGeneral.datosPacienteUni(HC.datosPaciente, this.datePipe));
      doc.content = this.morbilidad(HC.morbilidad, HC.datosPaciente, HC.listadoPreguntas, doc.content);
      doc.content.push({ text: '\n' });

      if (HC.morbilidad.profesional.firmaMedicoBase != undefined && HC.morbilidad.profesional.firmaMedicoBase.length > 0) {
        doc.content.push(
          [
            {
              stack: [
                {
                  image: HC.morbilidad.profesional.firmaMedicoBase[0],
                  alignment: 'center',
                  width: 500,
                  height: 70,
                }
              ],
            }
          ]);

      }

      if (HC.listadoGraficas != undefined) {
        if (HC.listadoGraficas.length > 0) {
          doc.content.push({ text: '\n', pageBreak: "before" });
          doc.content.push({ text: 'Graficas PYP\n\n' });
          HC.listadoGraficas.forEach(item => {
            doc.content.push(
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

      return doc;
    };

    /* const win = window.open('', '_blank');
    const docToOpen = buildDoc(includeLogo);
    this.dd = docToOpen;
    pdfMake.createPdf(docToOpen).open({}, win); */

   const win = window.open('', '_blank');
   const docToOpen = buildDoc(includeLogo);
   this.dd = docToOpen;

    const pdf = pdfMake.createPdf(docToOpen) as any;
    pdf.getBlob((blob: Blob) => {
      const pdfUrl = URL.createObjectURL(blob);

      if (win) {
        win.location.href = pdfUrl;
      } else {
        window.open(pdfUrl, '_blank');
      }
    });


   /*  if (HC.morbilidad.crecimientoYDesarrollo != null && HC.morbilidad.crecimientoDesarrollo) {
      if (HC.morbilidad.crecimientoYDesarrollo.certificado != undefined) {
        if (HC.morbilidad.crecimientoYDesarrollo.certificado.tieneCertificado) {
          this.cdCertificado.imprimirCertificado(HC.morbilidad.crecimientoYDesarrollo.certificado.certificadoHtml, HC.datosPaciente);
        }
      }
    } */

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

  private getValidationCode(HC: ReimpresionMorbilidad): string {
    const ts = 2154544;
    return `${ts}`;
  }

  morbilidad(hc: HCMorbilidad, paciente: VMPaciente, listadoPregHijoPadre: ListadoPreguntas, content) {

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
    content.push(this.servGeneral.habitosGestionRiesgo(hc.habitosGestionRiesgo));
    content.push({ text: '\n' });
    content.push(this.servGeneral.revisionPorSistema(hc.revisionSistema));
    content.push(this.servGeneral.examenFisicoU(hc.examenFisico));
    if (hc.agudezaVisual) {
      content.push(this.servGeneral.agudezaVisual(hc));
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

    if (hc.notaAdministrativa != null) {
      if (hc.notaAdministrativa.length > 0) {
        content.push(this.servGeneral.tablaNotaAdministrativa(hc.notaAdministrativa));
        content.push({ text: '\n' });
      }
    }

    if (hc['peshc'] != null && hc.pes) {
      content.push({ text: '\n' });
      content.push(this.impPes.impresionProgramaPES(hc.pes, hc['peshc'], hc.examenFisico,paciente.sexo, paciente.edad));
    }

    if (hc.crecimientoYDesarrollo != null && hc.crecimientoDesarrollo) {
      content.push({ text: '\n' });
      content.push(
        this.impCD.impresionProgramaCD(
          hc.crecimientoDesarrollo,
          hc.examenFisico,
          hc.crecimientoYDesarrollo,
          listadoPregHijoPadre,
          paciente.edadMeses,
          true));
    }


    if (hc.swAiepi && hc.aiepi != null) {
      content.push({ text: '\n' });
      content.push(this.impAIEPI.impresionProgramaAIEPI(hc.swAiepi, hc.aiepi));
    }

    if (hc['prenatalHC'] != null && hc.prenatal) {
      content.push({ text: '\n' });
      content.push(this.impPrenatal.impresionPrograma(hc.prenatal, hc['prenatalHC']));
    }
    var esFumador = hc.habitosGestionRiesgo.fumador == 'No' ? false : true;
    var presion = hc.examenFisico != null ? hc.examenFisico.presionSistolica : 0;

    if (hc.adultoHC != null && hc.esAdulto) {
      content.push({ text: '\n' });
      content.push(this.impAdulto.impresionPrograma("PROGRAMA ADULTO", hc.esAdulto,
        hc.adultoHC, listadoPregHijoPadre, paciente, true, esFumador, presion));
    }

    if (hc.adultoHC != null && hc.esVejez) {
      content.push({ text: '\n' });
      content.push(this.impAdulto.impresionPrograma("PROGRAMA VEJEZ", hc.esVejez, hc.adultoHC, listadoPregHijoPadre, paciente, false, esFumador, presion));
    }

    if (hc['saludMentalHC'] != null && hc.esSaludMental) {
      content.push({ text: '\n' });
      content.push(this.impSaludMental.impresionPrograma(hc.esSaludMental, hc['saludMentalHC']));
    }

    if (hc.planificacionFamiliarHC != null && hc.esPlanificacionFamiliar) {
      content.push({ text: '\n' });
      content.push(this.impPlanificacion.impresionPrograma(hc.esPlanificacionFamiliar, hc.planificacionFamiliarHC, hc.planificacionFamiliarHC.controlPlanificacionFamiliar));
    }

    if (hc['jovenHC'] != null && hc.esJoven) {
      content.push({ text: '\n' });
      content.push(this.impJoven.impresionPrograma(hc.esJoven, paciente, hc['jovenHC'], listadoPregHijoPadre));
    }

    if (hc.adolescenciaHC != null && hc.adolescencia) {
      content.push({ text: '\n' });
      content.push(this.impAdo.impresionPrograma(hc.adolescencia, paciente, hc.adolescenciaHC, listadoPregHijoPadre));
    }


    if (hc.cervixHC != null && hc.cervix) {
      content.push({ text: '\n' });
      content.push(this.impCervix.impresionPrograma(hc.cervix, hc.cervixHC));
    }

    if (hc.mamaHC != null && hc.esMama) {
      content.push({ text: '\n' });
      content.push(this.impMama.impresionPrograma(hc.esMama, hc.mamaHC));
    }

    if (hc.vacunacion != null && hc.esVacunacion) {
      content.push({ text: '\n' });
      content.push(this.impVacunacion.impresionPrograma(hc.esVacunacion, hc.vacunacion));
    }

    if (hc.epoc != null && hc.swEpoc) {
      content.push({ text: '\n' });
      content.push(this.epoc.impresionPrograma(paciente, hc.epoc));
    }

    return content;
  }
}
