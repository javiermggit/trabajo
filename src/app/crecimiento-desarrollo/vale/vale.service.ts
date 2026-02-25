import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delayedRetry } from 'src/app/pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValeService {

  public datosAll: any;
  public datos2: any;
  conDatos: boolean = false;
  _baseUrlHC: string;
  _baseUrlPaciente: string;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string,
    //@Inject('URLPaciente') baseUrlPaciente: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlPaciente = environment.URLPaciente;
    this.datos2 = [];
  }



  //#region Combos
  ObtenerDatosVale(datosMarcardos, edad) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Graficas/Vale?categoriaId=3&edad=' + edad + '&seleccionados=' + datosMarcardos, { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener Vale nuevamente...');
        return EMPTY
      })
    ).subscribe((responses) => {
      this.datos2 = responses;
    }, (error) => {
    })
  }

  ObtenerDatos(datos: any) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Graficas/AIE3?categoriaId=3&seleccionados=' + datos, { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener vale nuevamente...');
        return EMPTY
      })
    ).subscribe((responses) => {
      console.log("VALE",responses);
      this.datosAll = responses;
      console.dir(this.datosAll)
    }, (error) => {

    })
  }
}
