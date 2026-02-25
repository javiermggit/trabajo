import { Injectable } from '@angular/core';
import { DatosPacienteService } from '../datos-paciente/datos-paciente.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { MedicoService } from '../medico/medico.service';
import { ReimpresionService } from '../../app/mf/main/reimpresion/reimpresion.service';

@Injectable({
  providedIn: 'root'
})
export class RemisionImpresionService {
  fechahoy = new Date().toISOString().substring(0, 10);
  private readonly nitEncabezado = 'NIT: 900440054';

  constructor(
    private datePipe: DatePipe,
    public medico: MedicoService,
    private imp: ReimpresionService,
    public du: DatosPacienteService
  ) {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;
  }

  async imprimirREMISION(listadocup) {
    const logoUrl = this.getLogoUrl();
    const includeLogo = await this.canLoadLogo(logoUrl);
    const validationCode = this.getValidationCode();

    const dd: any = {
      pageMargins: [20, 20, 20, 20],
      content: [
        this.contenido(listadocup, includeLogo, validationCode),
      ],
    };

    if (includeLogo) {
      dd.images = {
        logoIps: logoUrl
      };
    }

    const win = window.open('', '_blank');
    const pdf = pdfMake.createPdf(dd);
      pdf.getBlob().then((blob: Blob) => {
  const pdfUrl = URL.createObjectURL(blob);

  if (win) {
    win.location.href = pdfUrl;
  } else {
    window.open(pdfUrl, '_blank');
  }
});
  }

  contenido(listadocup, includeLogo: boolean, validationCode: string) {
    return {
      pageBreak: 'after',
      widths: ['25%', '25%', '25%', '25%'],
      table: {
        body: this.body(listadocup, includeLogo, validationCode)
      },
      layout: {
        defaultBorder: true
      },
    };
  }

  body(listadocup, includeLogo: boolean, validationCode: string) {
    const body = [];
    listadocup.forEach(e => {
      body.push(
        [
          includeLogo ? {
            stack: [
              {
                image: 'logoIps',
                alignment: 'center',
                width: 50,
                height: 10,
              }
            ]
          } : {
            text: ''
          },
          { fontSize: 10, bold: true, colSpan: 2, text: 'REMISIÓN' },
          {},
          { fontSize: 10, text: moment(this.fechahoy).format('DD-MM-YYYY') },
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, alignment: 'right', noWrap: true, text: this.nitEncabezado + '    Código de habilitación: ' + validationCode },
          {},
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'DATOS DEL PACIENTE' },
          {},
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: 'Nombre: ' + this.du.DatosUsuario.nombre + ' ' + this.du.DatosUsuario.primer_Apellido + ' ' + this.du.DatosUsuario.segundo_Apellido },
          {},
          { fontSize: 8, bold: true, text: 'Identificación: ' + this.du.DatosUsuario.identificacion },
          { fontSize: 8, bold: true, text: 'Fecha nacimiento: ' + this.datePipe.transform(this.du.DatosUsuario.fecha_Nacimiento, 'dd/MM/yyyy') },
        ],
        [
          { fontSize: 8, bold: true, text: 'Dirección: ' + this.du.DatosUsuario.direccion },
          { fontSize: 8, bold: true, text: 'Teléfono: ' + this.du.DatosUsuario.telefono },
          { fontSize: 8, bold: true, text: 'Celular: ' + this.du.DatosUsuario.celular },
          { fontSize: 8, bold: true, text: 'Correo: ' + this.du.DatosUsuario.correo },
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'DATOS DE QUIEN REMITE' },
          {},
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 2, text: 'Nombre: ' + this.medico.medico.nombres + ' ' + this.medico.medico.apellidos },
          {},
          { fontSize: 8, bold: true, text: 'Identificación: ' + this.medico.medico.documento },
          { fontSize: 8, bold: true, text: 'Especialidad: ' + this.medico.Especialidad.descripcion },
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'A QUIEN REMITE' },
          {},
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Especialidad: ' + e.cup.codigo + ' | ' + e.cup.descripcion },
          {},
          {},
          {},
        ],
        [
          { fontSize: 8, bold: true, colSpan: 4, text: 'Observación: ' + e.nota },
          {},
          {},
          {},
        ],
        [
          { text: '', colSpan: 4, border: [false, false, false, false] },
          {},
          {},
          {},
        ],
        [
          { text: '', colSpan: 4, border: [false, false, false, false] },
          {},
          {},
          {},
        ],
        [
          { text: '', colSpan: 4, border: [false, false, false, false] },
          {},
          {},
          {},
        ],
        [
          { text: '', colSpan: 4, border: [false, false, false, false] },
          {},
          {},
          {},
        ],
        [
          { text: '', colSpan: 4, border: [false, false, false, false] },
          {},
          {},
          {},
        ],
      );
    });
    return body;
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

  private getValidationCode(): string {
    const ts = 2154544;
    return `${ts}`;
  }
}
