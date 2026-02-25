import { Injectable, Inject } from '@angular/core';
import { Grafica, CrecimientoDesarrollo, AntecedentesPerinatales, PatologiasRecienNacido, InformacionPsicosocial, SeguimientoPrograma, PatronesCrecimiento, SeguimientoEscalaAbreviadaDesarrollo, AIEPI, ProximoControl, ComentariosRecomendacionesSeguimiento } from '../Modelos/CrecimientoDesarrollo';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { Cervix, DatosTomaCitologia, PlanDeCuidadoCervix, ResultadoCitologia } from '../Modelos/Cervix';
import { DatosPacienteService } from '../datos-paciente/datos-paciente.service';
import { VMDatoMuestraCitologia } from '../Modelos/ModelHistorico';
import { delayedRetry } from '../pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CervixService {

  public datosCervix: Cervix;

  // public ListadoUltimaCitologia: any;
  public ListadoCatacteristicaFlujo: any;
  public ListadoMetodoPlanificacionActual: any;
  public ListadoAspectoCuelloUterino: any;
  public ListadoProcedimientoCuelloUterino: any;
  public ListadoMedioTomaMuestra: any;
  public ListadoEstadoVacunacionVPH: any;
  public ListadoCalidadMuestra: any;
  public ListadoClasificacionMuestra: any;
  public ListadoAnormalidadCelulasEscamosas: any;
  public ListadoAnormalidadCelulasGlandularesSinEspecificar: any;
  public ListadoAnormalidadCelulasGlandularesEspecificadas: any;
  public ListadoHallazgosNoNeoplasicos: any;
  public ListadoMicroorganismos: any;
  public ListadoHistoricoDatosMuestra: any;
  //public ListadoContinuaEsquema: any;

  public errors: Array<string> = [];

  _baseUrlHC: string;
  _baseURLPar: string;

  constructor(
    private http: HttpClient,
    //@Inject('URLHc') baseUrlHc: string,
    public du: DatosPacienteService
    //@Inject('URLParametrizacion') baseUrlPar: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseURLPar = environment.URLParametrizacion;

    this.datosCervix = new Cervix();

    this.ObtenerCervix()

    //Combos
    //this.ObtenerListadoUltimaCitologia();    
    this.ObtenerListadoCatacteristicaFlujo();
    this.ObtenerListadoMetodoPlanificacionActual();
    this.ObtenerListadoAspectoCuelloUterino();
    this.ObtenerListadoProcedimientoCuelloUterino();
    this.ObtenerListadoMedioTomaMuestra();
    this.ObtenerListadoEstadoVacunacionVPH();
    this.ObtenerListadoCalidadMuestra();
    this.ObtenerListadoClasificacionMuestra();
    this.ObtenerListadoAnormalidadCelulasEscamosas();
    this.ObtenerListadoAnormalidadCelulasGlandularesSinEspecificar();
    this.ObtenerListadoAnormalidadCelulasGlandularesEspecificadas();
    this.ObtenerListadoMicroorganismos();
    this.ObtenerListadoHallazgosNoNeoplasicos();
    // this.ObtenerListadoContinuaEsquema();  
    //End Combos
  }

  /*  GuardarCervix(){
     var headers = new Headers();
     headers.append("Content-Type","application/json");
     let ProfesionalLogueado = "123123";
     let PacienteId = "291109";
     let options = new RequestOptions({ headers: headers });
     return this.http.post<any>(this._baseUrlHC + '/api/CrecimientoDesarrollo/GuardarCrecimientoDesarrollo?PacienteId='+PacienteId+'&ProfesionalLogueado='+ ProfesionalLogueado, this.datosCervix,{responseType:"json"}).subscribe((response) =>{
       
       console.dir(response);
     }, err=>{
       
       console.dir(err);
     })  
   }
  */

  ObtenerCervix() {

    this.datosCervix.ets = false;
    this.datosCervix.citologiaAnterior = false;
    //this.datosCervix.fechaToma : Date;
    //this.datosCervix.ultimaCitologia: any;
    //this.datosCervix.ultimaMestruacion: Date;
    this.datosCervix.numeroCompanerosSexuales = 0;
    this.datosCervix.presentaDispareunia = false;
    this.datosCervix.presentaDolorPelvico = false;

    this.datosCervix.presenciaFlujoVaginal = false;
    //this.datosCervix.catacteristicaFlujo:any;
    //this.datosCervix.metodoPlanificacionActual : any;
    this.datosCervix.menopausia = false;
    this.datosCervix.embarazoActual = false;
    //this.datosCervix.aspectoCuelloUterino:any;
    //this.datosCervix.procedimientoCuelloUterino:any;

    this.datosCervix.datosTomaCitologia = new DatosTomaCitologia();

    //this.datosCervix.datosTomaCitologia.resultadoCitologiAnterior="datosTomaCitologiaresultadoCitologiAnterior";
    this.datosCervix.datosTomaCitologia.resultadoCitologiAnterior = "";
    //this.datosCervix.datosTomaCitologia.medioTomaMuestra: any;
    this.datosCervix.datosTomaCitologia.numeroPlaca = 0;
    //this.datosCervix.datosTomaCitologia.estadoVacunacionVPH:any;

    this.datosCervix.resultadoCitologia = new ResultadoCitologia();

    // this.datosCervix.resultadoCitologia.fechaResultado: Date;
    // this.datosCervix.resultadoCitologia.calidadMuestra: any;
    // this.datosCervix.resultadoCitologia.clasificacionMuestra:any;
    // this.datosCervix.resultadoCitologia.anormalidadCelulasEscamosas:any;
    // this.datosCervix.resultadoCitologia.anormalidadCelulasGlandularesSinEspecificar:any;
    // this.datosCervix.resultadoCitologia.anormalidadCelulasGlandularesEspecificadas:any;
    // this.datosCervix.resultadoCitologia.microorganismos:any;

    this.datosCervix.resultadoCitologia.requiereColposcopia = false;
    // this.datosCervix.resultadoCitologia.fechaColposcopia:Date;
    this.datosCervix.resultadoCitologia.requiereBiopsia = false;
    //this.datosCervix.resultadoCitologia.fechaBiopsia:Date;
    this.datosCervix.resultadoCitologia.requiereConsultaGinecologo = false;
    //this.datosCervix.resultadoCitologia.tratamientoGinecologo="tratamientoGinecologo";
    this.datosCervix.resultadoCitologia.tratamientoGinecologo = "";

    //this.datosCervix.resultadoCitologia.continuaEsquema:any;
    this.datosCervix.resultadoCitologia.observaciones = "";
    this.datosCervix.planDeCuidado = new PlanDeCuidadoCervix();

  }

  ValidarCervix() {
    this.errors = [];

    //#region antecedentesPerinatales
    if (this.datosCervix.ultimaCitologia == null) {
      this.datosCervix.validacionUltimaCitologia = true;
      this.errors.push("Ultima Citologia");
    } else {
      this.datosCervix.validacionUltimaCitologia = false;
    }

    if (this.datosCervix.numeroCompanerosSexuales == null) {
      this.datosCervix.validacionNumeroCompanerosSexuales = true;
      this.errors.push("Número de compañeros sexuales");
    } else {
      this.datosCervix.validacionNumeroCompanerosSexuales = false;
    }

    if (this.datosCervix.catacteristicaFlujo == null) {
      this.datosCervix.validacionCatacteristicaFlujo = true;
      this.errors.push("Caracteristica del Flujo");
    } else {
      this.datosCervix.validacionCatacteristicaFlujo = false;
    }
    if (this.datosCervix.metodoPlanificacionActual == null) {
      this.datosCervix.validacionMetodoPlanificacionActual = true;
      this.errors.push("Método de planificación Actual");
    } else {
      this.datosCervix.validacionMetodoPlanificacionActual = false;
    }

    if (this.datosCervix.aspectoCuelloUterino == null) {
      this.datosCervix.validacionAspectoCuelloUterino = true;
      this.errors.push("Aspecto del cuello uterino");
    } else {
      this.datosCervix.validacionAspectoCuelloUterino = false;
    }

    if (this.datosCervix.procedimientoCuelloUterino == null) {
      this.datosCervix.validacionProcedimientoCuelloUterino = true;
      this.errors.push("Procedimientos anteriores en el cuello uterino");
    } else {
      this.datosCervix.validacionProcedimientoCuelloUterino = false;
    }



    if (this.datosCervix.datosTomaCitologia.medioTomaMuestra == null) {
      this.datosCervix.datosTomaCitologia.validacionMedioTomaMuestra = true;
      this.errors.push("Medio con que se toma la muestra");
    } else {
      this.datosCervix.datosTomaCitologia.validacionMedioTomaMuestra = false;
    }

    if (this.datosCervix.datosTomaCitologia.numeroPlaca == null) {
      this.datosCervix.datosTomaCitologia.validacionNumeroPlaca = true;
      this.errors.push("Numero de Placa");
    } else {
      this.datosCervix.datosTomaCitologia.validacionNumeroPlaca = false;
    }

    if (this.datosCervix.datosTomaCitologia.estadoVacunacionVPH == null) {
      this.datosCervix.datosTomaCitologia.validacionEstadoVacunacionVPH = true;
      this.errors.push("Estado de Vacunacion VPH");
    } else {
      this.datosCervix.datosTomaCitologia.validacionEstadoVacunacionVPH = false;
    }



    if (this.datosCervix.resultadoCitologia.calidadMuestra == null) {
      this.datosCervix.resultadoCitologia.validacionCalidadMuestra = true;
      this.errors.push("Calidad de la muestra");
    } else {
      this.datosCervix.resultadoCitologia.validacionCalidadMuestra = false;
    }
    if (this.datosCervix.resultadoCitologia.clasificacionMuestra == null) {
      this.datosCervix.resultadoCitologia.validacionClasificacionMuestra = true;
      this.errors.push("Claficificacion de la muestra");
    } else {
      this.datosCervix.resultadoCitologia.validacionClasificacionMuestra = false;
    }
    if (this.datosCervix.resultadoCitologia.anormalidadCelulasEscamosas == null) {
      this.datosCervix.resultadoCitologia.validacionAnormalidadCelulasEscamosas = true;
      this.errors.push("Anormalidad de células escamosas");
    } else {
      this.datosCervix.resultadoCitologia.validacionAnormalidadCelulasEscamosas = false;
    }
    if (this.datosCervix.resultadoCitologia.anormalidadCelulasGlandularesSinEspecificar == null) {
      this.datosCervix.resultadoCitologia.validacionAnormalidadCelulasGlandularesSinEspecificar = true;
      this.errors.push("Anormalidad de celulas glandulares sin especificar (AGC-NOS)");
    } else {
      this.datosCervix.resultadoCitologia.validacionAnormalidadCelulasGlandularesSinEspecificar = false;
    }
    if (this.datosCervix.resultadoCitologia.anormalidadCelulasGlandularesEspecificadas == null) {
      this.datosCervix.resultadoCitologia.validacionAnormalidadCelulasGlandularesEspecificadas = true;
      this.errors.push("Anormalidad de celulas glandulares especificas (Atípicas)");
    } else {
      this.datosCervix.resultadoCitologia.validacionAnormalidadCelulasGlandularesEspecificadas = false;
    }
    if (this.datosCervix.resultadoCitologia.microorganismos == null) {
      this.datosCervix.resultadoCitologia.validacionMicroorganismos = true;
      this.errors.push("Microorgnismos");
    } else {
      this.datosCervix.resultadoCitologia.validacionMicroorganismos = false;
    }
    if (this.datosCervix.resultadoCitologia.continuaEsquema == null) {
      this.datosCervix.resultadoCitologia.validacionContinuaEsquema = true;
      this.errors.push("Continua en esquema");
    } else {
      this.datosCervix.resultadoCitologia.validacionContinuaEsquema = false;
    }

    if (this.datosCervix.resultadoCitologia.otrosHallazgosNoNeoplasicos == null) {
      this.datosCervix.resultadoCitologia.validacionOtrosHallazgosNoNeoplasicos = true;
      this.errors.push("Otros Hallazgos No Neoplaicos");
    } else {
      this.datosCervix.resultadoCitologia.validacionOtrosHallazgosNoNeoplasicos = false;
    }
    //#endregion

    console.dir(this.errors)
  }

  ObtenerListadoCatacteristicaFlujo() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParCaracteristicaFlujos', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        console.log('intentando obtener Flujo nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {

      this.ListadoCatacteristicaFlujo = response;
    }, (error) => {

    })
  }

  ObtenerListadoMetodoPlanificacionActual() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParMetodoPlanificacion', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        console.log('intentando obtener Planificacion nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoMetodoPlanificacionActual = response;
    })
  }
  ObtenerListadoAspectoCuelloUterino() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParAspectoCuelloUterinos', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener Cuello uterino nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoAspectoCuelloUterino = response;
    })
  }
  ObtenerListadoProcedimientoCuelloUterino() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParProcedimientoCuelloUterinos', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener Procedimiento cuello uterino nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoProcedimientoCuelloUterino = response;
    })
  }
  ObtenerListadoMedioTomaMuestra() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParMedioTomaMuestras', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        console.log(e);
        console.log('intentando obtener toma muestra nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoMedioTomaMuestra = response;
    })
  }
  ObtenerListadoEstadoVacunacionVPH() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParEstadoVacunacionesVph', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener Vacuna VPH nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoEstadoVacunacionVPH = response;
    })
  }
  ObtenerListadoCalidadMuestra() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParCalidadMuestras', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener Calidad Muestra nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoCalidadMuestra = response;
    })
  }
  ObtenerListadoClasificacionMuestra() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParClasificacionMuestras', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener clasificacion muestra nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoClasificacionMuestra = response;
    })
  }
  ObtenerListadoAnormalidadCelulasEscamosas() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParAnormalidadCelulasEscamosas', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener Celulas Escamosas nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoAnormalidadCelulasEscamosas = response;
    })
  }
  ObtenerListadoAnormalidadCelulasGlandularesSinEspecificar() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParAnormalidadCelulasGlandulares', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener Celulas Glandulares nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoAnormalidadCelulasGlandularesSinEspecificar = response;
    })
  }
  ObtenerListadoAnormalidadCelulasGlandularesEspecificadas() {  
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParAnormalidadCelulasGlandularesEsps', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener glandulares esps nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoAnormalidadCelulasGlandularesEspecificadas = response;
    })
  }
  ObtenerListadoMicroorganismos() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParMicroorganismos', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener  nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoMicroorganismos = response;
    })
  }

  ObtenerListadoHallazgosNoNeoplasicos() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParHallazgosNoNeoplasicos', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
       
        console.log('intentando obtener  nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      this.ListadoHallazgosNoNeoplasicos = response;
    })
  }

  cargarDatosHistoricosPorCita(id) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerHCCervixPorCita?cita=' + id, { responseType: "json" })
      .subscribe(
        (response) => {
          this.datosCervix = response;
        }, (error) => {

        })
  }


  cargarDatosHistoricosResultadoPorPaciente(id) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimaResultadoCitologia?PacienteId=' + id, { responseType: "json" })
      .subscribe(
        (response) => {
          this.datosCervix = new Cervix();
          response.fechaResultado = response.fechaResultado == "0001-01-01T00:00:00Z" ? new Date() : response.fechaResultado;
          if (!response.finalizacionTratamiento) {
            this.datosCervix.resultadoCitologia = response;
          }
        }, (error) => {

        })
  }


  cargarDatosHistoricosPorPaciente(id) {
    return this.http.get<Cervix>(this._baseUrlHC + '/api/Historicos/ObtenerUltimoHistoricoCervix?PacienteId=' + id, { responseType: "json" })
      .subscribe(
        (response) => {

          this.datosCervix = new Cervix();
          this.datosCervix.planDeCuidado = response.planDeCuidado == null ? new PlanDeCuidadoCervix : response.planDeCuidado;
        }, (error) => {

        })
  }


  cargarDatosHistoricosTomaMuestra(id) {
    return this.http.get<Array<VMDatoMuestraCitologia>>(this._baseUrlHC + '/api/Historicos/ObtenerTomaMuestraCitologia?PacienteId=' + id, { responseType: "json" })
  }

  // ObtenerListadoContinuaEsquema(){
  //   var headers = new Headers();
  //     headers.append("Content-Type","application/json");

  //     let options = new RequestOptions({ headers: headers });
  //     return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTerminacionEmbarazos',{responseType:"json"}).subscribe((response) =>{
  //       this.ListadoContinuaEsquema= response;
  //    })  
  // }
  //#endregion
}
