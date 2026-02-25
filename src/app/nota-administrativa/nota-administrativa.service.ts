import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { Reimpresion } from '../Modelos/Reimpresion';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { Nota, NotaResultadoCervix } from '../Modelos/Nota';
import { VMCup, JSONHc, OrdenamientoHC, Ordenamiento } from '../Modelos/Modelos';
import { Especialidad } from '../Modelos/Medico';
import { environment } from 'src/environments/environment';
import { MedicoService } from '../medico/medico.service';

@Injectable({
  providedIn: 'root'
})
export class NotaAdministrativaService {
  reimpresion: Array<Reimpresion>;
  notas: Array<Nota>;
  notasReimp: Array<Nota>;
  notaCervix: NotaResultadoCervix;
  _baseUrlHC: string;
  _baseUrlLogin: string;
  _baseUrlEverest: string ='';
  public loginId: String ='';
  _baseUrlMedico: string='';
  _baseUrlPaciente: string ='';
  datoPaciente: any;
  listadoEspecialidad: Array<Especialidad> |undefined;
  //public medicoId: number;
  _baseImpresion: string ='';
  public usuarioId: number=0;
  _baseUrlOrdenamiento: string='';
  constructor(
    private http: HttpClient,
    public medicoService: MedicoService,
    public cookieService: CookieService,
    //@Inject('URLHc') baseUrlHC: string,
    //@Inject('UrlLogin') baseUrlLogin: string,
    //@Inject('URLMedico') baseUrlMedico: string,
    //@Inject('URLPaciente') UrlPaciente: string,
    //@Inject('UrlOrdenamiento') baseUrlOrdenamiento: string,
    //@Inject('URLImpresion') baseImpresion: string,
    @Inject(DOCUMENT) private document: any
  ) {
    this._baseUrlOrdenamiento = environment.UrlOrdenamiento;
    this.reimpresion = new Array<Reimpresion>();
    this.notas = new Array<Nota>();
    this.notasReimp = new Array<Nota>();
    this.notaCervix = new NotaResultadoCervix();
    this._baseImpresion = environment.URLImpresion;
    this._baseUrlHC = environment.URLHc;
    this._baseUrlLogin = environment.UrlLogin;
    this._baseUrlMedico = environment.URLMedico;
    this._baseUrlPaciente = environment.URLPaciente;
    this._baseUrlEverest = environment.UrlLogin;

    //this.loginId = this.cookieService.get('UsuarioMedico');

   // this.loginId =  environment.production == false ? "JHERNANDEZR" : this.cookieService.get('UsuarioMedico');
    this.loginId =  environment.production == false ? "JARAMIREZ" : this.cookieService.get('UsuarioMedico');

    //this.loginId = "JHESCORCIA";

    if (this.loginId == "" || this.loginId == undefined) {
      this.document.location.href = this._baseUrlLogin;
    }
    this.obtenerIdPorLogin();
  }


  obtenerIdPorLogin() {

    return this.http.get<any>(this._baseUrlMedico + '/api/Medico/ObtenerDatosLoginByLogin?login=' + this.loginId, { responseType: "json" })
      .subscribe((response) => {
        if (response != null) {
          this.usuarioId = response.id;
        }
      });
  }

  obtenerListadoTipo() {
    this.listadoEspecialidad = new Array<Especialidad>();
    return this.http.get<Array<Especialidad>>(this._baseUrlMedico + '/api/Medico/ObtenerEspecialidadMedico?login=' + this.loginId, { responseType: "json" })
  }

  ObtenerConsulta(id, tipo) {
    return this.http.get<Array<Reimpresion>>(this._baseUrlHC + '/api/Historicos/ConsultasPorDocumentoPacienteYProfesional?Tipo=' + tipo + '&Documento=' + id + '&ProfesionalId=' + this.medicoService.medicoId, { responseType: "json" });
  }

  ObtenerDatosPaciente(id, tipo) {

    return this.http.get<any>(this._baseUrlPaciente + '/api/Paciente/CargarDatosPacienteByIdentificacion/' + id + '?tipo=' + tipo, { responseType: "json" });
  }

  guardarNotaAdministrativa(idpaciente, nota: Nota) {
    return this.http.post(this._baseUrlHC + '/api/NotaAdministrativa/GuardarNotaAdministrativa?ProfesionalId=' + this.usuarioId + '&PacienteId=' + idpaciente, nota, { responseType: "json" });
  }

  guardarNotaCervix(idpaciente, nota: NotaResultadoCervix) {
    return this.http.post(this._baseUrlHC + '/api/Cervix/GuardarResultadoCitologiaCervixHC?PacienteId=' + idpaciente + '&CitaId=' + nota.citaId, nota.resultado, { responseType: "json" });
  }

  obtenerNotaAdministrativas(idcita) {
    return this.http.get<Array<Nota>>(this._baseUrlHC + '/api/Historicos/ObtenerNotaAdministrativaPorCita?cita=' + idcita, { responseType: "json" }).subscribe(
      (x) => {

        this.notas = x;
        this.notas.forEach(e => {
          this.obtenerNombreMedico(e.usuarioCreacion, e)
        });

      }, (error) => {

        console.log(error)
      });
  }

  obtenerNombreMedico(id, dato) {
    return this.http.get<any>(this._baseUrlMedico + '/api/Medico/ObtenerDatosLoginById?Id=' + id, { responseType: "json" })
      .subscribe((response) => {
        dato.medico = response.nombres + " " + response.apellidos;
      });
  }

  GuardarOrdenamientos(datos: Nota) {

    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = datos.cup;
    ordenamientoshc.paciente = this.datoPaciente;
    ordenamientoshc.citaId = datos.citaId == undefined ? "0" : datos.citaId;
    ordenamientoshc.diagnosticoId = datos.diagnostico == undefined ? 0 : datos.diagnostico[0].id;
    ordenamientoshc.usuarioId = this.usuarioId;
    return this.http.post<any>(this._baseUrlOrdenamiento + '/api/Ordenamientos/GuardarOrdenamiento', ordenamientoshc, { responseType: "json" })
  }

  validarCantidadCup(pacienteId, CupId, cantidad) {

    return this.http.get(this._baseUrlOrdenamiento + '/api/Ordenamientos/ValidarCantidadCup?pacienteId=' + pacienteId + '&CupId=' + CupId + '&cantidad=' + cantidad, { responseType: "text" })
  }

  ObtenerOrdenamientosHC(datos: Nota) :OrdenamientoHC{
    
    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = datos.cup;
    ordenamientoshc.paciente = this.datoPaciente;
    ordenamientoshc.citaId = datos.citaId == undefined ? "0" : datos.citaId;
    ordenamientoshc.diagnosticoId = datos.diagnostico == undefined ? 0 : datos.diagnostico[0].id;
    ordenamientoshc.usuarioId = this.usuarioId;
    ordenamientoshc.swHC = true;
    ordenamientoshc.swQuirofano = false;

    console.log(JSON.stringify(ordenamientoshc));

    return ordenamientoshc;
  }

  cargarDatosHistoricosResultadoPorPaciente(id) {

    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimaResultadoCitologia?PacienteId=' + id, { responseType: "json" })
      .subscribe(
        (response) => {

          response.fechaResultado = response.fechaResultado == "0001-01-01T00:00:00Z" ? new Date() : response.fechaResultado;
          if (!response.finalizacionTratamiento) {
            this.notaCervix.resultado = response;
          }
        }, (error) => {

        })
  }


  generarLinksImpresionCertificadoA(PacienteID, padreId, tipo) {
    return this.http.get(this._baseUrlHC + '/api/Morbilidad/GenerarLinksImpresionCertificadoAPaciente?PacienteId=' + PacienteID + '&Tipo=' + tipo + '&PadreId=' + padreId, { responseType: "text" })
  }

  enviarCorreo(Correo, UsuarioId, tipo = "", url = "") {

    var urlnueva = url.replace(this._baseImpresion + "/", "");
    var FechaHoy = this.obtenerFechaActual();
    return this.http.get<any>(this._baseUrlEverest + '/Agendamiento/EnviarEmailCertificado?Correo=' + Correo + '&UsuarioId=' + UsuarioId + '&Url=' + encodeURIComponent(urlnueva) + '&Tipo=' + tipo + '&Fecha=' + FechaHoy)

  }

  obtenerFechaActual() {
    var date = new Date()
    var y = date.getFullYear();
    var m1 = date.getMonth() + 1;
    var m = m1 < 10 ? "0" + m1 : m1;
    var d1 = date.getDate();
    var d = d1 < 10 ? "0" + d1 : d1;

    return y + "-" + m + "-" + d;
  }

}
