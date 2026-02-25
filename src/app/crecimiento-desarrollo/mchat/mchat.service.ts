import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { delayedRetry } from 'src/app/pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MchatService {

  public datos: any;
  conDatos: boolean = false;


  _baseUrlHC: string;
  _baseUrlPaciente: string;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string,
   // @Inject('URLPaciente') baseUrlPaciente: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlPaciente = environment.URLPaciente;
    //this.ObtenerDatos()
  }



  //#region Combos
  ObtenerDatos(datosMarcardos) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Graficas/mchat?categoriaId=4&seleccionados=' + datosMarcardos, { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener mchat nuevamente...');
        return EMPTY
      })
    ).subscribe((responses) => {
      this.datos = responses;
    }, (error) => {
      console.log('intentando obtener mchat nuevamente...');
    })
  }
}
