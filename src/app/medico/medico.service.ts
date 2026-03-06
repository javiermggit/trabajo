import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad, Citas,Cups } from '../Modelos/Medico';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { CtcExtension } from '../Modelos/CtcExtension';
import { CtcBitacora } from '../Modelos/CtcBitacora';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public _baseUrl;
  public urlCIsign;
  public listadoEspecialidad: Array<Especialidad>;
  public Especialidad: Especialidad;
  public listadoCitas: Array<Citas>;
  public listadoCitasEtiquetas: Array<Citas> =  [];
  public listadoCitasContigencia: Array<Citas> = [];
  public loginId: String;
  public medicoId: number = 0;
  public urlTeleconsulta: string;
  public medico: any;
  public loadingAll = true;
  _baseUrlLogin: string;
  public link: string ='';
  public servidor: string = "COL";
  public urlExtension: string;
  public llamada: boolean = false;
  consultaInmediata: boolean = false;
  public _apiIntegracion: string;
  public ticketId: number = 0;
  public ticketMensaje: string ='';
  tipoIntegracion: string = "IntegracionDigiturno";
  tipoAcceso:string ='';
  edadAnios: number = 0;
    cup: Cups;
  //public IdPais:number;


  constructor(
    private http: HttpClient,
    //@Inject('URLMedico') baseUrl: string,
    //@Inject('UrlLogin') baseUrlLogin: string,
    //@Inject('UrlTeleconsulta') baseUrlTeleconsulta: string,
    //@Inject('UrlCIsign') urlCIsign: string,
    //@Inject('URLExtension') baseUrlExtension: string,
    //@Inject('IdPais') IdPais: number,
    //@Inject('UrlIntegracionDigiturno') UrlIntegracion: string,
    public router: Router,
    public cookieService: CookieService,
    @Inject(DOCUMENT) private document: any
  ) {

    this.urlTeleconsulta = environment.UrlTeleconsulta;
   /*  this.IdPais =environment.IdPais;

    if (this.IdPais == 2) {
      this.servidor = "REP";
    } */
    /* PRODUCTIVO */

    //this.loginId = this.cookieService.get('UsuarioMedico');

    //this.loginId = environment.production == false ? "JHERNANDEZR" : this.cookieService.get('UsuarioMedico'); //odonto
     //this.loginId = environment.production == false ? "JARAMIREZ" : this.cookieService.get('UsuarioMedico');
    //this.loginId = environment.production == false ? "CMENDEZ" : this.cookieService.get('UsuarioMedico');
    this.loginId = environment.production == false ? "mprueba" : this.cookieService.get('UsuarioMedico');

    this._baseUrlLogin = environment.UrlLogin;
    this._apiIntegracion = environment.UrlIntegracionDigiturno;
    this.urlExtension = environment.URLExtension;
    this.urlCIsign = environment.UrlCIsign;

    if (this.loginId == "" || this.loginId == undefined) {
      this.document.location.href = this._baseUrlLogin;
    }
    this._baseUrl = environment.URLMedico;
    this.listadoEspecialidad = new Array<Especialidad>();
    this.Especialidad = new Especialidad();
    this.listadoCitas = new Array<Citas>();
    this.obtenerIdMedico();

    this.obtenerMedicoByLogin();

  }


  obtenerIdMedico() {
    return this.http.get<number>(this._baseUrl + '/api/Medico/ObtenerIdMedico?login=' + this.loginId, { responseType: "json" })
      .subscribe((response) => {
        this.medicoId = response;
      });
  }

  obtenerMedicoByLogin() {

    return this.http.get<any>(this._baseUrl + '/api/Medico/ObtenerDatosLoginByLogin?login=' + this.loginId, { responseType: "json" })
      .subscribe((response) => {

        this.medico = response;
      });
  }

  obtenerDatosLoginByLogin$(login: string = String(this.loginId ?? '')) {
    return this.http.get<any>(this._baseUrl + '/api/Medico/ObtenerDatosLoginByLogin?login=' + login, { responseType: "json" });
  }

  obtenerListadoTipo() {
    return this.http.get<Array<Especialidad>>(this._baseUrl + '/api/Medico/ObtenerEspecialidadMedico?login=' + this.loginId, { responseType: "json" })
  }

  public consultarCitas(filtro: String) {
    //SE MODIFICO PARA AGREGAR LA EDAD Y QUE CUANDO TIPO CONSULTA SEA NULL MANDE PRESENCIAL
    //apimedico
    return this.http.get<Array<Citas>>(this._baseUrl + '/api/Medico/ObtenerConsultas?especialidadId=' + filtro + '&profesionalId=' + this.medicoId, { responseType: "json" });
  }

  public consultarCitasContigencia(filtro: String) {
    return this.http.get<Array<Citas>>(this._baseUrl + '/api/Medico/ObtenerConsultasAnteriores?especialidadId=' + filtro + '&profesionalId=' + this.medicoId, { responseType: "json" });
  }

  public consultarLink(citaID: String) {

    return this.http.get(this.urlTeleconsulta + '/api/TeleLlamada/GenerarLinkTeleLlamada?citaId=' + citaID + '&esPaciente=false&servidor=' + this.servidor, { responseType: "text" });
  }

  public desactivarCitasAnteriores(citaID: String) {
    return this.http.get(this._baseUrl + '/api/Medico/DesactivarCitasAnteriores?CitaId=' + citaID + '&UsuarioId=' + this.medicoId, { responseType: "text" });
  }

  public facturarCitas(citaID: String) {
    return this.http.get(this._baseUrl + '/api/Medico/facturarCitasTeleconsulta?CitaId=' + citaID, { responseType: "text" });
  }

  public guardarHoraApertura(citaID: String) {
    return this.http.get(this._baseUrl + '/api/Medico/guardarHoraApertura?CitaId=' + citaID, { responseType: "text" });
  }

  public guardarHoraCierre(citaID: String) {
    return this.http.get(this._baseUrl + '/api/Medico/guardarHoraCierre?CitaId=' + citaID, { responseType: "text" });
  }

  public getExtension(id: string) {
    return this.http.get<CtcExtension>(this.urlExtension + "/Ctc/BuscarExtension?id=" + id);
  }

  public guardarLog(bitacora: CtcBitacora) {
    return this.http.post<any>(this.urlExtension + "/Ctc/IngresoLog", bitacora)
  }

  public guardarConsentimientoUsuario(data: any) {
    return this.http.post<any>(this.urlCIsign + "/ConsentimientoInformado/GuardarConsentimientosUsuarioByEverest", data)
  }

  public validHC(citaID: string) {
    return this.http.get<any>(this._baseUrl + '/api/Medico/ObtenerEstadoCita?TurnoId=' + citaID)
  }

  public obtenIdMedico() {
    return this.http.get<number>(this._baseUrl + '/api/Medico/ObtenerDatosLoginByLogin?login=' + this.loginId, { responseType: "json" });
  }

  public getTroncal(idExtension: string) {
    return this.http.get<any>(this.urlExtension + "/CtcTroncal/getTroncal?idExtension=" + idExtension);
  }

  getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }

estadoTraductor(estado: string): string {
  switch (estado) {
    case "ACT":
      return "color: black";
    case "FAC":
      return "color: green";
    default:
      return "color: gray";
  }
}

  public llamadoPaciente(Identificacion: string, citaID: number, ticketId: number) {
    var UsuarioId:Number = this.medico.id
    return this.http.get<any>(`${this._apiIntegracion}/Digiturno/LlamadoTicket?tipoIntegracion=${this.tipoIntegracion}&Identificacion=${Identificacion}&UsuarioId=${UsuarioId}&EverestId=${citaID}&ticketId=${ticketId}`,{ responseType: "json" });
  }

  public ConfirmarTicket(citaID: string) {
    var UsuarioId:Number = this.medico.id

    return this.http.get<any>(`${this._apiIntegracion}/Digiturno/ConfirmarTicket?tipoIntegracion=${this.tipoIntegracion}&TicketId=${this.ticketId}&UsuarioId=${UsuarioId}&EverestId=${citaID}`,{ responseType: "json" });
  }

  public TransferirTicketALineaFrente(citaID: string, opcion: any) {
    var UsuarioId:Number = this.medico.id
    return this.http.get<any>(`${this._apiIntegracion}/Digiturno/TransferirTicketALineaFrente?tipoIntegracion=${this.tipoIntegracion}&TicketId=${this.ticketId}&UsuarioId=${UsuarioId}&EverestId=${citaID}&turOpcion=${opcion}`,{ responseType: "json" });
  }

  public GetOpcionesParaTransferencia() {
    var UsuarioId:Number = this.medico.id
    return this.http.get<any>(`${this._apiIntegracion}/Digiturno/GetOpcionesParaTransferencia?tipoIntegracion=${this.tipoIntegracion}&UsuarioId=${UsuarioId}`,{ responseType: "json" });
  }

  public FinalizarTicket(citaID: string) {
    var UsuarioId:Number = this.medico.id
    return this.http.get<any>(`${this._apiIntegracion}/Digiturno/FinalizarTicket?tipoIntegracion=${this.tipoIntegracion}&TicketId=${this.ticketId}&UsuarioId=${UsuarioId}&EverestId=${citaID}`,{ responseType: "json" });
  }

  public ExamenfisicoisOpcional()
  {
    if(this.tipoAcceso == "TELECONSULTA" || this.tipoAcceso == "TeleConsulta" || this.tipoAcceso == "TELECONSULTA SEDE" || this.tipoAcceso == "VIDEOCONSULTA"){
      return true;
    }
    else{
      return false;
    }
  }

  public EspecialidadNoValidaExamenFisico(){
    if(this.Especialidad.id == 44 || this.Especialidad.id == 45 || this.Especialidad.id == 46 || this.Especialidad.id == 119 || this.Especialidad.id == 120 || this.Especialidad.id == 122){
      return true;
    }
    else{
      return false;
    }
  }
}
