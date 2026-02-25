import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alertCupsTamizaje, Joven, Paraclinicos } from '../Modelos/Joven';
import { EcomapaService } from '../ecomapa/ecomapa.service';
import { FamiliogramaService } from '../familiograma/familiograma.service';
import { ApgarServiceService } from '../apgar/apgar-service.service';
import { TamizajeSaludMentalService } from '../tamizaje-salud-mental/tamizaje-salud-mental.service';
import { TamizajeSaludBucalService } from '../tamizaje-salud-bucal/tamizaje-salud-bucal.service';
import { FinnishriskService } from '../finnishrisk/finnishrisk.service';
import { delayedRetry } from '../pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JovenService {

  public Hc: Joven;

  public ListadoOcupacion: any;
  public ListadoPreguntasDiabetes: any;
  public errors: Array<string> = [];
  _baseUrlHC: string;
  _baseURLPar: string;
  arrayRespuesta: any = [];
  swAlertTamizajeRiesgo: boolean = false;
  swPaqueteAlert: alertCupsTamizaje;

  constructor(
    private http: HttpClient, 
    //@Inject('URLHc') baseUrlHc: string, 
    //@Inject('URLParametrizacion') baseUrlPar: string,
    public apgarService: ApgarServiceService,
    public familiogramas: FamiliogramaService,
    public tSaludMental: TamizajeSaludMentalService,
    public tSaludBucal: TamizajeSaludBucalService,
    public finnishrisk: FinnishriskService,
    public ecomapas: EcomapaService
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseURLPar = environment.URLParametrizacion;

    this.Hc = new Joven();
    this.ObtenerListadoOcupacion();
    this.ObtenerListadoPreguntas();
    this.swPaqueteAlert = new alertCupsTamizaje();
  }


  retornarModeloCompleto() {

    this.Hc.apgar = this.apgarService.datosMarcardosApgar;
    this.Hc.apgarComplete = this.apgarService.datosMarcardosApgar;

    this.Hc.ecomapa = this.ecomapas.ecomapa;
    this.Hc.familiograma = this.familiogramas.familiograma;
    this.Hc.tamizajeSaludMental = this.tSaludMental.datosMarcardosSM;
    this.Hc.tamizajeSaludMentalComplete = this.tSaludMental.datosMarcardosSM;

    this.Hc.interpretacionTamizajeSaludMental = this.tSaludMental.interpretacion;
    this.Hc.tamizajeSaludBucal = this.tSaludBucal.tamizaje;
    this.Hc.tamisajesDeValoracion.ojoDerecho = this.Hc.tamisajesDeValoracion.ojoDerecho + '/' + this.Hc.tamisajesDeValoracion.ojoDerechoOtro;
    this.Hc.tamisajesDeValoracion.ojoIzquierdo = this.Hc.tamisajesDeValoracion.ojoIzquierdo + '/' + this.Hc.tamisajesDeValoracion.ojoIzquierdoOtro;
    this.Hc.factoresDeriesgoParaOrigenDiabetes = this.finnishrisk.factoresDeriesgoParaOrigenDiabetes;


    return this.Hc;
  }

  ObtenerListadoOcupacion() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParOcupaciones', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoOcupacion = response;
    })
  }

  ObtenerListadoPreguntas() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/PreguntasRiesgoDiabetes', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener  nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoPreguntasDiabetes = response;
    })
  }

  cargarUltimoHistoricosJoven(id) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimoHistoricoJoven?PacienteId=' + id, { responseType: "json" })
      .subscribe(
        (response) => {
          
          this.Hc = new Joven();
          this.Hc.antecedentesPatologicosPersonales = response.antecedentesPatologicosPersonales;
          this.Hc.antecedentesAndrologicos = response.antecedentesAndrologicos;
          this.Hc.antecedentesGinecoObstetricos = response.antecedentesGinecoObstetricos;
          this.Hc.antecedentesFamiliaresRelevantes = response.antecedentesFamiliaresRelevantes;
          this.Hc.antecedentesInmunologicos = response.antecedentesInmunologicos;
          this.Hc.paraclinicos = response.paraclinicos == null ? new Paraclinicos() : response.paraclinicos;
          this.validarTamizajeCardiovascular();
        }, (error) => {
          this.Hc.paraclinicos = new Paraclinicos();
          this.validarTamizajeCardiovascular();
        })
  }

  validarTamizajeCardiovascular() {
    this.swAlertTamizajeRiesgo = false;

    if (this.Hc.paraclinicos.glicemiaBasal == undefined || this.Hc.paraclinicos.glicemiaBasal == "") {
      this.swPaqueteAlert.glicemiaBasal = true;
    } else {
      this.swPaqueteAlert.glicemiaBasal = false;
    }

    if (this.Hc.paraclinicos.hdl == undefined || this.Hc.paraclinicos.hdl == "") {
      this.swPaqueteAlert.colesterolHDL = true;
    } else {
      this.swPaqueteAlert.colesterolHDL = false;
    }

    if (this.Hc.paraclinicos.colesterolLDL == undefined || this.Hc.paraclinicos.colesterolLDL == "") {
      this.swPaqueteAlert.colesterolLDL = true;
    } else {
      this.swPaqueteAlert.colesterolLDL = false;
    }

    if (this.Hc.paraclinicos.colesterolTotal == undefined || this.Hc.paraclinicos.colesterolTotal == "") {
      this.swPaqueteAlert.colesterolTotal = true;
    } else {
      this.swPaqueteAlert.colesterolTotal = false;
    }

    if (this.Hc.paraclinicos.trigliceridos == undefined || this.Hc.paraclinicos.trigliceridos == "") {
      this.swPaqueteAlert.trigliceridos = true;
    } else {
      this.swPaqueteAlert.trigliceridos = false;
    }

    if (this.Hc.paraclinicos.uroanalisis == undefined || this.Hc.paraclinicos.uroanalisis == "") {
      this.swPaqueteAlert.uroanalisis = true;
    } else {
      this.swPaqueteAlert.uroanalisis = false;
    }

    if (this.Hc.paraclinicos.creatinina == undefined || this.Hc.paraclinicos.creatinina == "") {
      this.swPaqueteAlert.creatinina = true;
    } else {
      this.swPaqueteAlert.creatinina = false;
    }

    if (this.Hc.paraclinicos.colesterolMuyBajaDensidad == undefined || this.Hc.paraclinicos.colesterolMuyBajaDensidad == "") {
      this.swPaqueteAlert.colesterolVLDL = true;
    } else {
      this.swPaqueteAlert.colesterolVLDL = false;
    }

    var paquete = this.swPaqueteAlert;
    var resultArray = Object.keys(paquete).map(function (key) {
      return key;
    });

    if (resultArray.length > 0) {
      this.swAlertTamizajeRiesgo = true;
    }
  }

  cargarDatosHistoricosPorCita(id) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerHCJovenPorCita?cita=' + id, { responseType: "json" })
      .subscribe(
        (response) => {
          this.Hc = response;
        }, (error) => {

        })
  }


}
