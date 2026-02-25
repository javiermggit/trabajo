import { Injectable, Inject } from '@angular/core';
import { SaludMental, tipoTrastornoSaludMental, NovedadSeguimiento, ComportamientoGenerales } from '../Modelos/SaludMental';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { delayedRetry } from '../pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaludMentalService {

  saludmental: SaludMental;
  baseurlParametrizacion: string;
  _baseUrlHC: string;
  ListadoTipoTrastornoMentales: Array<tipoTrastornoSaludMental>;
  listadoNovedadSeguimiento: Array<NovedadSeguimiento>;

  constructor(
    private http: HttpClient
    //@Inject('URLParametrizacion') baseUrlPar: string
    //@Inject('URLHc') baseUrlHC: string
  ) {

    this.saludmental = new SaludMental();
    this.saludmental.comportamientoGenerales = new ComportamientoGenerales();
    this.baseurlParametrizacion = environment.URLParametrizacion;
    this._baseUrlHC = environment.URLHc;
    this.obtenerTiposTrastornoMental();
    this.obtenerNovedadSeguimiento();
  }

  obtenerTiposTrastornoMental() {
    return this.http.get<Array<tipoTrastornoSaludMental>>(this.baseurlParametrizacion + '/api/ParClasificacionTiposTrastornosSaludMental', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener AIEPI nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoTipoTrastornoMentales = response;
    })
  }
  obtenerNovedadSeguimiento() {
    return this.http.get<Array<NovedadSeguimiento>>(this.baseurlParametrizacion + '/api/ParNovedadSeguimientos', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener AIEPI nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.listadoNovedadSeguimiento = response;
    })
  }

  cargarDatosHistoricosPorCita(id) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerHCSaludMetalPorCita?cita=' + id, { responseType: "json" })
      .subscribe(
        (response) => {
          this.saludmental = response;
        }, (error) => {

        })
  }

}
