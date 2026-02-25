import { Inject, Injectable } from '@angular/core';
import { EvolucionMedicaDiagnostica } from '../Modelos/Adulto';
import { FactoresDeriesgoParaOrigenDiabetes } from '../Modelos/Joven';
import { HttpClient } from '@angular/common/http';
import { delayedRetry } from '../pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinnishriskService {
  public EvolucionMedicaDiagnostica: EvolucionMedicaDiagnostica;
  public factoresDeriesgoParaOrigenDiabetes: FactoresDeriesgoParaOrigenDiabetes;
  public ListadoPreguntasDiabetes: any;
  _baseURLPar: any
  constructor(
    private http: HttpClient
     //@Inject('URLParametrizacion') baseUrlPar: string
    ) {
    this.EvolucionMedicaDiagnostica = new EvolucionMedicaDiagnostica();
    this.factoresDeriesgoParaOrigenDiabetes = new FactoresDeriesgoParaOrigenDiabetes();
    this._baseURLPar = environment.URLParametrizacion;
    this.ObtenerListadoPreguntas();
  }

  ObtenerListadoPreguntas() {

    return this.http.get<Array<any>>(this._baseURLPar + '/api/PreguntasRiesgoDiabetes', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener AIEPI nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {

      this.ListadoPreguntasDiabetes = response;
    })
  }

}
