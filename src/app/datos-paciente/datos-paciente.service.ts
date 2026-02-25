import { Injectable, Inject, ViewChild, ElementRef } from '@angular/core';
import { vmCitaOdontologia, VMPaciente } from '../Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
import { ParametroService } from '../parametros/parametro.service';
//import { OdontogramaVisualizacionService } from '../odontologia/odontograma-visualizacion/odontograma-visualizacion.service';
import { VMTieneTestCovid } from '../Modelos/TestPostCovid';
import { SafeUrl } from '@angular/platform-browser';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosPacienteService {

  public DatosUsuario: VMPaciente;
  ultimacitaOdontologi: vmCitaOdontologia;


  urlIframeSICU: SafeUrl = "https://sicu.compensarsalud.com/SicuWebResponsive/login";
  _baseUrlPaciente: string;
  _baseUrlHC: string;
  tienePostCovid: VMTieneTestCovid;
  citaid: number;
  constructor(
    private http: HttpClient,
    //@Inject('URLPaciente') baseUrlPaciente: string,
    //@Inject('URLHc') baseUrlHC: string,
    public parametros: ParametroService,
    //public odntoVisual: OdontogramaVisualizacionService
  ) {
    this._baseUrlPaciente = environment.URLPaciente;
    this.DatosUsuario = new VMPaciente();
    this._baseUrlHC =  environment.URLHc;
  }

  ObtenerPaciente(citaid) {
    this.citaid = citaid;
    return this.http.get<VMPaciente>(this._baseUrlPaciente + '/api/Paciente/CargarDatosPacienteByCitaId/' + citaid, { responseType: "json" })
  }

  ObtenerPacientePorId(idPaciente) {
    return this.http.get<VMPaciente>(this._baseUrlPaciente + '/api/Paciente/CargarDatosPaciente/' + idPaciente, { responseType: "json" })
  }

  public autorizarCompensar(pacienteId: String, Radicadoweb) {
    return this.http.get(this._baseUrlPaciente + '/api/Paciente/AutorizarCitaCompensar?PacienteId=' + pacienteId + '&NumeroAutorizacion=' + Radicadoweb + '&Invoca=MEDICO', { responseType: "text" });
  }

  TieneTestCovid(idPaciente) {
    return this.http.get<VMTieneTestCovid>(this._baseUrlHC + '/api/Historicos/obtenerDatosTestCovid?pacienteid=' + idPaciente, { responseType: "json" });
  }

  editPaciente(DatosUsuario: VMPaciente) {
    var url = this._baseUrlPaciente + '/api/Paciente/ActualizarDatosPacienteHC/' + DatosUsuario.id;
    return this.http.post<VMPaciente>(url, DatosUsuario, { responseType: "json" }).subscribe((response) => {
    })
  }


  ObtenerProgramaCompensar(PacienteID) {
    // 
    return this.http.get(this._baseUrlPaciente + '/api/Paciente/ProgramaPrimario?pacienteId=' + PacienteID, { responseType: 'text' });
  }


  guardarLogSICU() {
    var url = this._baseUrlHC + '/api/Morbilidad/GuardarLogSICU?Citabase=' + this.citaid;
    return this.http.get<any>(url, { responseType: "json" }).subscribe((response) => {
    })
  }

  obtenerURLSICU(documentoMedico: string) {
    //  var identificacion = "1003826528";
    // documentoMedico = "1129539583";
    var url = this._baseUrlHC + '/api/Morbilidad/consultarPaginaSICU?documentoMedico=' + documentoMedico + '&documentoPaciente=' + this.DatosUsuario.identificacion + '&tipoDocumento=' + this.obtenerID(this.DatosUsuario.tipo_Identificacion);
    return this.http.get(url, { responseType: 'text' })

  }

  obtenerID(tipo: string) {
    switch (tipo) {
      case 'CC':
        return 1;
      case 'TI':
        return 3;
      case 'CE':
        return 4;
      case 'PA':
        return 5;
      case 'CD':
        return 6;
      case 'RC':
        return 7;
      case 'NUIP':
        return 8;
      case 'CN':
        return 9;
      case 'SV':
        return 10;
      default:
        return 1;
    }
  }
  obtenerUltimaCitaOdontologia(PacienteId) {
    return this.http.get<vmCitaOdontologia>(this._baseUrlHC + '/api/Morbilidad/obtenerUltimaCitaOdontologia?pacienteId=' + PacienteId, { responseType: "json" }).subscribe((response) => {
      this.ultimacitaOdontologi = response
    }, (error) => {
      console.log(error)
    })
  }

}
