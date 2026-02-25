
import { environment } from 'src/environments/environment';
import { catchError, EMPTY } from 'rxjs';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { delayedRetry } from 'src/app/pipes/reintentoApi';
import { Especialidad, Citas } from 'src/app/Modelos/Medico';
import { Reimpresion } from 'src/app/Modelos/Reimpresion';
import { HCMorbilidad, VMPaciente, Profesional } from 'src/app/Modelos/Modelos';
import { HCUnificado, ReimpresionAnestesiologia, ReimpresionEnfermeria, ReimpresionMorbilidad, ReimpresionOdontologia, ReimpresionProcedimientos } from 'src/app/Modelos/HCUnificado';
import { Nota } from 'src/app/Modelos/Nota';
import { NotaAdministrativaService } from 'src/app/nota-administrativa/nota-administrativa.service';
import { Grafica } from 'src/app/Modelos/CrecimientoDesarrollo';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/core/Services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReimpresionService {
  // Servicio base para habilitar pruebas de navegación
  public firmaMedico: string;
   profesional: Profesional;
   _baseUrl: string;
   _baseUrlLogin: string;
  _baseUrlMedico: string;
  public pesoTalla: Grafica = new Grafica;
  public tallaEdad: Grafica = new Grafica;
  public perimetroCefalico: Grafica = new Grafica;
  public imcEdad: Grafica = new Grafica;
  public pesoEdad: Grafica = new Grafica;
  public alturaUterina: Grafica = new Grafica;
  public IMCMaterno: Grafica = new Grafica;
  public presionS: Grafica = new Grafica;
  public presionD: Grafica = new Grafica;
  public glicemia: Grafica = new Grafica;
  public loadingDocumentTypeControl = false;
  public ListadoTipoDocumento: Array<{ descripcion: string; id: any }> = [];
  private _baseUrlHC: string;
  public listadoEspecialidad: Array<Especialidad> = [];
  reimpresion: Array<Reimpresion> = [];
  listadonotas: Array<any> = [];
  listadoHcIntegra: Array<any> = [];
  public datoAsociado: any;
   datoPaciente: any;
  public logoIpsUrl: string = '';
  public logoIpsBase64: string = this.getTransparentPixel();
  private readonly localDefaultLogoPath: string = '/assets/logo-delta-ips.png';
  constructor(
    private http: HttpClient,
    private nota: NotaAdministrativaService,
    private appConfig: AppConfigService,
  ) {
    this._baseUrl = environment.URLParametrizacion;
    this._baseUrlHC = environment.URLHc;
    this._baseUrlMedico = environment.URLMedico;
    this._baseUrlLogin = environment.UrlLogin;   
    this.reimpresion = new Array<Reimpresion>();

    //imagen por url ya no base 64, se obtiene de tabla par_ips, si no funciona quitar la parte de imagen en pdfMake y dejar solo el texto del nombre de la ips

    this.appConfig.cargarParIps().subscribe(() => {
      const info = this.appConfig.getInfoCliente();
      this.setLogoFromInfo(info);
    });
  }

  buscar() { }
  reimprimir() { }


  ObtenerListadoTipoDocumento() {
    this.loadingDocumentTypeControl = true;
    return this.http.get<any>(this._baseUrl + '/api/ParTipoDocumento', { responseType: "json" }).pipe(
      delayedRetry(30000, 100),
      catchError((e) => {
        console.error('No fue posible obtener ObtenerListadoTipoDocumento', e);
        this.ListadoTipoDocumento = [];
        this.loadingDocumentTypeControl = false;
        return EMPTY
      })
    ).subscribe((response: any) => {
      const sourceList = this.resolveSourceList(response);
      this.ListadoTipoDocumento = sourceList
        .map((item: any) => {
          const id = item?.Id ?? item?.id ?? item?.Codigo ?? item?.codigo ?? item?.Sigla ?? item?.sigla ?? item;
           const valor = item?.Valor ?? item?.valor ?? id;
          const descripcion = this.resolveDescripcion(item, id);
          return { descripcion, id,valor };
        })
        .filter((item: any) => !!item.descripcion);
      this.loadingDocumentTypeControl = false;
    })
  }

  ObtenerEspecialidad() {
    return this.http.get<Array<Especialidad>>(this._baseUrlHC + '/api/Historicos/EspecialidadesImpresion', { responseType: "json" });
  }

  private resolveSourceList(response: any): Array<any> {
    if (Array.isArray(response)) {
      return response;
    }

    const candidates = [
      response?.data,
      response?.Data,
      response?.items,
      response?.Items,
      response?.result,
      response?.Result
    ];

    const firstArray = candidates.find((c) => Array.isArray(c));
    return Array.isArray(firstArray) ? firstArray : [];
  }

  private resolveDescripcion(item: any, id: any): string {
    const raw = item?.Descripcion
      ?? item?.descripcion
      ?? item?.Nombre
      ?? item?.nombre
      ?? item?.TipoDocumento
      ?? item?.tipoDocumento
      ?? item?.Abreviatura
      ?? item?.abreviatura
      ?? item?.Sigla
      ?? item?.sigla
      ?? '';

    const text = String(raw ?? '').trim();
    const isInvalid = !text || ['empty', 'null', 'undefined', '[object object]'].includes(text.toLowerCase());
    if (!isInvalid) {
      return text;
    }

    return String(id ?? '').trim();
  }

   obtenerImagenLogo() {
    return this.logoIpsBase64;
  } 
    
  private setLogoFromInfo(info: any) {
    const logoFromApi = info && (info['ruta_Logo'] || info['logo']) ? (info['ruta_Logo'] || info['logo']) : '';
    const candidates = this.getLogoCandidates((logoFromApi || '').trim());

    this.tryConvertCandidates(candidates, 0)
      .then(result => {
        this.logoIpsUrl = result.url;
        this.logoIpsBase64 = result.dataUrl;
      })
      .catch(() => {
        this.logoIpsUrl = '';
        this.logoIpsBase64 = this.getTransparentPixel();
      });
  }

  private getLogoCandidates(logoFromApi: string): string[] {
    const candidates: string[] = [];

    const normalizedLogoFromApi = this.normalizeLogoUrl(logoFromApi);
    if (normalizedLogoFromApi) {
      candidates.push(normalizedLogoFromApi);
    }

    const localFallback = this.getLocalDefaultLogoUrl();
    if (!candidates.includes(localFallback)) {
      candidates.push(localFallback);
    }

    return candidates;
  }

  private tryConvertCandidates(candidates: string[], index: number): Promise<{ url: string, dataUrl: string }> {
    if (index >= candidates.length) {
      return Promise.reject(new Error('No fue posible cargar logo'));
    }

    const candidateUrl = candidates[index];
    return this.convertImageUrlToDataUrl(candidateUrl)
      .then(dataUrl => ({ url: candidateUrl, dataUrl }))
      .catch(() => this.tryConvertCandidates(candidates, index + 1));
  }

  private normalizeLogoUrl(url: string): string {
    if (!url) {
      return '';
    }

    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed) || /^data:/i.test(trimmed)) {
      return trimmed;
    }

    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${window.location.origin}${cleanPath}`;
  }

  private getLocalDefaultLogoUrl(): string {
    return `${window.location.origin}${this.localDefaultLogoPath}`;
  }

  private convertImageUrlToDataUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(
        blob => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        },
        error => reject(error)
      );
    });
  }


   private getTransparentPixel(): string {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5W9p8AAAAASUVORK5CYII=';
  }


 /*  ObtenerConsulta(id: string,tipo: string,especialidad?: string) {
  const especialidadFinal = !especialidad || especialidad === 'undefined'
    ? '0'
    : especialidad;

  return this.http.get<Array<Reimpresion>>(
    `${this._baseUrlHC}/api/Historicos/ConsultasPorDocumentoPaciente`,
    {
      params: {
        Tipo: tipo,
        Documento: id,
        Especialidad: especialidadFinal
      }
    }
  );
} */

  ObtenerConsulta(id: string, tipo: string, especialidad?: string) {

  const especialidadFinal =
    !especialidad || especialidad === 'undefined'
      ? '0'
      : especialidad;

  const params = new HttpParams()
    .set('Tipo', tipo)
    .set('Documento', id)
    .set('Especialidad', especialidadFinal);

  return this.http.get<Array<Reimpresion>>(
    `${this._baseUrlHC}/api/Historicos/ConsultasPorDocumentoPaciente`,
    { params }
  );
}

  ObtenerPaciente(citaid: string) {
    return this.http.get<VMPaciente>(this._baseUrlHC + '/api/Historicos/ObtenerDatosPacienteReimpreision?CitaId=' + citaid, { responseType: "json" });
  }

 ObtenerHCConsultaUnificada(
  id: string,
  especialidad?: string
) {
  const especialidadFinal = !especialidad || especialidad === 'undefined'
    ? '0'
    : especialidad;

  return this.http.get<HCUnificado>(
    `${this._baseUrlHC}/api/Historicos/ConsultasHCUnificadas`,
    {
      params: {
        Pacienteid: id,
        Especialidad: especialidadFinal
      }
    }
  );
}

  ObtenerConsultaNotasAdministrativas(pacienteid: string) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Historicos/ObtenerNotaAdministrativaSinCita?PacienteId=' + pacienteid, { responseType: "json" });
  }


  ObtenerHcIntegra(pacienteid: string) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Historicos/ObtenerHistoriaClinicaPdf?PacienteId=' + pacienteid, { responseType: "json" });
  }

  ObtenerHcMorbilidad(idPaciente: string, citaid: string) {
    return this.http.get<ReimpresionMorbilidad>(this._baseUrlHC + '/api/Historicos/ConsultasHCReimpresionMorbilidad?Pacienteid=' + idPaciente + '&cita=' + citaid, { responseType: "json" })
  }

  ObtenerHcPreAnestesiologia(idPaciente: string, citaid: string) {
    return this.http.get<ReimpresionAnestesiologia>(this._baseUrlHC + '/api/Historicos/ConsultasHCReimpresionPreAnestesiologia?Pacienteid=' + idPaciente + '&cita=' + citaid, { responseType: "json" })
  }

  ObtenerHcEnfermeria(idPaciente: string, citaid: string) {
    return this.http.get<ReimpresionEnfermeria>(this._baseUrlHC + '/api/Historicos/ConsultasHCReimpresionEnfermeria?Pacienteid=' + idPaciente + '&cita=' + citaid, { responseType: "json" })
  }

  ObtenerHcOdontologia(idPaciente: string, citaid: string) {
    return this.http.get<ReimpresionOdontologia>(this._baseUrlHC + '/api/Historicos/ConsultarHCReimpresionOdontologia?Pacienteid=' + idPaciente + '&cita=' + citaid, { responseType: "json" })
  }

  ObtenerHcProcedimiento(idPaciente: string, citaid: string) {
    return this.http.get<ReimpresionProcedimientos>(this._baseUrlHC + '/api/Historicos/ConsultarHCReimpresionProcedimiento?Pacienteid=' + idPaciente + '&cita=' + citaid, { responseType: "json" })
  }

  obtenerNotaAdministrativas(idcita: string) {
    return this.http.get<Array<Nota>>(this._baseUrlHC + '/api/Historicos/ObtenerNotaAdministrativaPorCita?cita=' + idcita, { responseType: "json" })
  }

  cargarNota(response: any) {
    this.nota.notasReimp = response;
    this.nota.notasReimp.forEach(e => {
      this.nota.obtenerNombreMedico(e.usuarioCreacion, e)
    });

  }

  ObtenerHcDatoAsociado(citaid: string) {
    return this.http.get<any>(this._baseUrlMedico + '/api/ProfesionalAsociado/ObtenerDatosProfecionalAsociados?CitaId=' + citaid, { responseType: "json" }).subscribe(
      response => {
        if (!response.error && response.data != null) {
          this.datoAsociado = response.data
        }
      }
      , error => {
      });
  }

  cancelar() {
    this.pesoTalla = {
      title: "Peso para la Talla Niños (Puntuación Z (0 a 2 años))",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Longitud (cm)" },
        vAxis: { title: "Peso (Kg)" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.tallaEdad = {
      title: "Talla para la Edad Niños (Puntuación Z (0 a 2 años))",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Edad (en meses y años cumplidos)" },
        vAxis: { title: "Longitud (cm)" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.perimetroCefalico = {
      title: "Perímetro Cefálico Niños (Puntuación Z (0 a 5 años))",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Edad (en meses y años cumplidos)" },
        vAxis: { title: "Perímetro Cefálico (cm)" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.imcEdad = {
      title: "IMC para la Edad Niños (Puntuación Z (0 a 2 años))",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Edad (en meses y años cumplidos)" },
        vAxis: { title: "IMC (kg/m^2)" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.pesoEdad = {
      title: "Peso para Edad Niños (Puntuación Z (0 a 2 años))",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Edad (en meses y años cumplidos)" },
        vAxis: { title: "Peso (Kg)" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.alturaUterina = {
      title: "Altura Uterina",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Semanas de edad gestacional" },
        vAxis: { title: "Altura Uterina (cm)" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.IMCMaterno = {
      title: "IMC Materno",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Semanas de edad gestacional" },
        vAxis: { title: "IMC" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.presionS = {
      title: "Presión sistólica",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Semanas de edad gestacional" },
        vAxis: { title: "Presión sistólica" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.presionD = {
      title: "Presión diastólica",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Semanas de edad gestacional" },
        vAxis: { title: "Presión diastólica" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

    this.glicemia = {
      title: "Glicemia",
      type: "LineChart",
      columnNames: ["x", ""],
      data: [
        [0, 0,]
      ],
      options: {
        backgroundColor: '#E4E4E4',
        colors: ["black",],
        hAxis: { title: "Semanas de edad gestacional" },
        vAxis: { title: "Glicemia" },
        series:
          [
            { curveType: 'function', visibleInLegend: true, pointShape: "", pointSize: 0, lineDashStyle: [0] },
          ]
      }
    }

  }


}
