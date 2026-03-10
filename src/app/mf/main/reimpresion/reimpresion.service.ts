
import { environment } from 'src/environments/environment';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, } from '@angular/common/http';
import { delayedRetry } from 'src/app/pipes/reintentoApi';
import { Especialidad, Citas } from 'src/app/Modelos/Medico';
import { Reimpresion } from 'src/app/Modelos/Reimpresion';
import { VMPaciente, Profesional } from 'src/app/Modelos/Modelos';
import { HCUnificado} from 'src/app/Modelos/HCUnificado';
import { Nota } from 'src/app/Modelos/Nota';
import { NotaAdministrativaService } from 'src/app/nota-administrativa/nota-administrativa.service';
import { Injectable } from '@angular/core';
import { EnviarPlantillaCorreo, EnviarPlantillaGupshup, UploadHCResponse } from 'src/app/Modelos/whatsapp';
import { CitaDetalles } from 'src/app/Modelos/Impresion';

@Injectable({
  providedIn: 'root'
})
export class ReimpresionService {
  // Servicio base para habilitar pruebas de navegación
   celularEnvio: any;
  public firmaMedico: string;
   profesional: Profesional;
   _baseUrl: string;
   _baseUrlLogin: string;
  _baseUrlMedico: string;
  _baseUrlwhatspp:string;
  _baseUrlCorreo:string;
  _baseUrlPdf:string;  
  public loadingDocumentTypeControl = false;
  public ListadoTipoDocumento: Array<{ descripcion: string; id: any; valor: any }> = [];
  private _baseUrlHC: string;
  public listadoEspecialidad: Array<Especialidad> = [];
   public listadoprofesinal: Array<Profesional>;
  reimpresion: Array<Reimpresion> = [];
  listadonotas: Array<any> = [];
  listadoHcIntegra: Array<any> = [];
  public datoAsociado: any;
   datoPaciente: any;
 
  constructor(
    private http: HttpClient,
    private nota: NotaAdministrativaService    
  ) {
    this._baseUrl = environment.URLParametrizacion;
    this._baseUrlHC = environment.URLHc;
    this._baseUrlMedico = environment.URLMedico;     
    this._baseUrlwhatspp=environment.URLWhatsapp; 
    this._baseUrlCorreo= environment.URLApiCorreo;
    this._baseUrlPdf =environment.UrlPdf;
    this.reimpresion = new Array<Reimpresion>();    
   
  }

    
/* abrirMorbidity(tipo :string,clientId: number, pacienteId: number, citaId: string): void {
  
  const url = `${this._baseUrlPdf}/${tipo}/${clientId}/${pacienteId}/${citaId}`;
  window.open(url, '_blank');
} */

 abrirMorbidity(
  tipo: string,
  clientId: number,
  pacienteId: number,
  citaId: string
): Observable<Blob> {

  const url = `${this._baseUrlPdf}/${tipo}/${clientId}/${pacienteId}/${citaId}`;

  return this.http.get(url, {
    responseType: 'blob',
    observe: 'response'
  }).pipe(

    map((response: HttpResponse<Blob>) => {

      if (!response.body || response.body.size === 0) {
        throw new Error('NO_DATA');
      }

      return response.body;
    }),

    catchError((error: HttpErrorResponse) => {

      if (error.status === 404) {
        return throwError(() => new Error('NOT_FOUND'));
      }

      if (error.status === 500) {
        return throwError(() => new Error('SERVER_ERROR'));
      }

      return throwError(() => new Error('UNKNOWN_ERROR'));
    })
  );
}

 abrircronica(
  tipo: string,
  clientId: number,
  pacienteId: number
): Observable<Blob> {

  const url = `${this._baseUrlPdf}/${tipo}/${clientId}/${pacienteId}?programs=Pes`;

  return this.http.get(url, {
    responseType: 'blob',
    observe: 'response'
  }).pipe(
    map(response => {

      // Si viene vacío
      if (!response.body || response.body.size === 0) {
        throw new Error('NO_DATA');
      }

      return response.body;
    }),
    catchError((error: HttpErrorResponse) => {

      if (error.status === 404) {
        return throwError(() => new Error('NOT_FOUND'));
      }

      if (error.status === 500) {
        return throwError(() => new Error('SERVER_ERROR'));
      }

      return throwError(() => new Error('UNKNOWN_ERROR'));
    })
  );
}

 abrirunificada(
  tipo: string,
  clientId: number,
  pacienteId: number
): Observable<Blob> {

  const url = `${this._baseUrlPdf}/${tipo}/${clientId}/${pacienteId}`;

  return this.http.get(url, {
    responseType: 'blob',
    observe: 'response'
  }).pipe(
    map(response => {

      // Si viene vacío
      if (!response.body || response.body.size === 0) {
        throw new Error('NO_DATA');
      }

      return response.body;
    }),
    catchError((error: HttpErrorResponse) => {

      if (error.status === 404) {
        return throwError(() => new Error('NOT_FOUND'));
      }

      if (error.status === 500) {
        return throwError(() => new Error('SERVER_ERROR'));
      }

      return throwError(() => new Error('UNKNOWN_ERROR'));
    })
  );
}


 descargarPdfDesdeUrl(tipo :string,clientId: number, pacienteId: number, citaId: string) {
   const url = `${this._baseUrlPdf}/${tipo}/${clientId}/${pacienteId}/${citaId}`;
  return this.http.get(url, { responseType: 'blob' });
}

  uploadPDF(formData: FormData) {
    return this.http.post<UploadHCResponse>(this.getUploadPdfEndpoint(), formData);
  }

sendWhatsapp(link: string, hc: any,row:any) {
const fechaFormateada = row.fecha.replace('T', ' ').split('.')[0];
  const payload: EnviarPlantillaGupshup = {
    from: environment.telefonocliente,
    to: "57" + this.celularEnvio,
    templete: {
      id: environment.plantillaCliente,
      params: [
        environment.tituloCliente,
        hc?.nombre ?? 'Paciente',
        row?.especialidad ?? 'Historia Clínica',
        fechaFormateada ?? '01/11/2025 14:25',
        link ?? 'https://www.google.com'
      ]
    }
  };

  //console.log('Enviando WhatsApp API:', payload);

  return this.http.post<any>(
    this.getEnviarWhatsappEndpoint(),
    payload
  );
}

  enviarCorreo(payload: EnviarPlantillaCorreo) {
    return this.http.post<any>(this.getEnviarCorreoEndpoint(), payload);
  }


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
    return this.http.get<Array<Especialidad>>(this._baseUrl + '/api/ParEspecialidades', { responseType: "json" });
  }

	  Obtenerprofesionales() {
	    return this.http.get<Array<Profesional>>(this._baseUrl + '/api/ParProfesionales', { responseType: "json" });
	  }

	  ObtenerProfesionalesPorTermino(termino: string): Observable<Array<Profesional>> {
	    const params = new HttpParams().set('termino', String(termino ?? '').trim());
	    return this.http
	      .get<any>(`${this._baseUrl}/api/ParProfesionales/GetParProfesionalPorTermino`, { params })
	      .pipe(
	        map((response: any) => this.resolveSourceList(response) as Array<Profesional>)
	      );
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

  

  private getUploadPdfEndpoint(): string {
    const envAny = environment as any;
    return envAny.UploadHCEndpoint
      ?? `${this._baseUrlHC}/api/Historicos/UploadHC`;
  }

  private getEnviarWhatsappEndpoint(): string {
    const envAny = environment as any;
    return envAny.EnviarWhatsappEndpoint
      ?? `${this._baseUrlwhatspp}/api/v1/whatsapp`;
  }

  private getEnviarCorreoEndpoint(): string {
    const envAny = environment as any;
    return envAny.EnviarCorreoEndpoint
      ?? `${this._baseUrlCorreo}/EnvioCorreo/EnviarEmailServicio`;
  }


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


  /* ObtenerPaciente(citaid: string) {
   return this.http.get<VMPaciente>(this._baseUrlHC + '/api/Paciente/CargarDatosPacienteByCitaId/' + citaid, { responseType: "json" });
  } */

  //sirve
  ObtenerPaciente(citaid) {
    return this.http.get<VMPaciente>(this._baseUrlHC + '/api/Historicos/ObtenerDatosPacienteReimpreision?CitaId=' + citaid, { responseType: "json" });
  }


   Obtenercitadet(citaid: string) {
    return this.http.get(this._baseUrlHC + '/api/Historicos/ObtenerDatosCita?CitaId=' + citaid, { responseType: "json" });
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

  obtenerNotaAdministrativas(idcita: string) {
    return this.http.get<Array<Nota>>(this._baseUrlHC + '/api/Historicos/ObtenerNotaAdministrativaPorCita?cita=' + idcita, { responseType: "json" })
  }

  cargarNota(response: any) {
    this.nota.notasReimp = response;
    this.nota.notasReimp.forEach(e => {
      this.nota.obtenerNombreMedico(e.usuarioCreacion, e)
    });

  }

 /*  ObtenerHcDatoAsociado(citaid: string) {
    return this.http.get<any>(this._baseUrlMedico + '/api/ProfesionalAsociado/ObtenerDatosProfecionalAsociados?CitaId=' + citaid, { responseType: "json" }).subscribe(
      response => {
        if (!response.error && response.data != null) {
          this.datoAsociado = response.data
        }
      }
      , error => {
      });
  }  */

      ObtenerHcDatoAsociado(citaid: string) {
  return this.http.get<any>(
    this._baseUrlMedico + 
    '/api/ProfesionalAsociado/ObtenerDatosProfecionalAsociados?CitaId=' + citaid
  );
}

}
