import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface ApiConfig {
  apiHC: string;
  apiWhatsapp: string;
  apiParametrizacionGeneral: string;
  apiParametrizacion: string;
  apiPaciente: string;
  apiMedico: string;
  apiImpresion: string;
  apiOrdenamientoHealth: string;
  apiLogin: string;
  apiMedicamento: string;
  _linkTeleConsulta: string;
  getExtension: string;
  apiEnvioCorreo: string;
  apiAgendamientoInteligente: string;
  apiParametrizacionRecurso: string;
  apiPrestadores: string;
  apiCiSign: string;
  apiIntegracionDigiturno: string;
  apiImagen: string;
  apiMessagesProvider: string;
  templateName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private infoCliente: any = null;
  private readonly fallbackInfoCliente = {
    logo: '/assets/logo-delta-ips.png'
  };

  constructor(private http: HttpClient) { }

  getInfoCliente() {
    return this.infoCliente;
  }

  cargarParIps(): Observable<any> {
    return this.http
      .get<any>(`${environment.URLHc}/api/ParIps/List`)
      .pipe(
        tap(resp => {
          if (resp && resp.data && resp.data.length > 0) {
            this.infoCliente = resp.data[0];
          } else {
            this.infoCliente = this.fallbackInfoCliente;
          }
        }),
        catchError(() => {
          this.infoCliente = this.fallbackInfoCliente;
          return of(null);
        })
      );
  }
}
