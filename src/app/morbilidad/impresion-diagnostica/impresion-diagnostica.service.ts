import { Injectable, Inject } from '@angular/core';
import { VMDiagnostico, DiagnosticoPrincipal, Incapacidad, Certificado, PlanManejoPostCovid } from 'src/app/Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { RequestOptions, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})

export class ImpresionDiagnosticaService {

  DiagnosticoSeleccionado: VMDiagnostico;
  analisisYplan: string;
  diagnosticos: VMDiagnostico[];
  diagnosticosRelacionados: VMDiagnostico[];
  diagnosticosPrincipal: VMDiagnostico[];
  public diagnosticoPrincipal: DiagnosticoPrincipal;
  public incapacidad: Incapacidad;
  public certificadoAislamiento: Certificado;
  public certificadoReintegro: Certificado;
  public planDeManejoPostCovid: PlanManejoPostCovid;

 
  seleccionadoLicMaterna: boolean = false;
  swIncapacidad: boolean = false;
  swCertificadoAislamiento: boolean = false;
  swCertificadoReintegro: boolean = false;
  public mostrarIncapacidad: boolean = true;
  _baseUrlHC: string;

  seleccionado: boolean = false;
  seleccionadoGeneralLaboral: boolean = false;
  optionsGrupoServicio: string[] = [
    "Consulta Externa",
    "Apoyo diagnóstico clínico y complementación terapéutica",
    "Internación",
    "Quirúrgico",
    "Atención inmediata",
  ]

  optionsModalidadPrestacionServicio: string[] = [
    "Intramural",
    "Extramural unidad móvil",
    "Extramural domiciliaria",
    "Extramural jornada de salud",
    "Telemedicina interactiva",
    "Telemedicina no interactiva",
    "Telemedicina telexperticia",
    "Telemedicina telemonitoreo"
  ]


  constructor(
    private http: HttpClient
    //@Inject('URLHc') _baseUrlHC: string
  ) {
    this.mostrarIncapacidad = true;
    this.diagnosticos = new Array<VMDiagnostico>();
    this.diagnosticoPrincipal = new DiagnosticoPrincipal();
    this.incapacidad = new Incapacidad();
    this.certificadoReintegro = new Certificado();
    this.certificadoAislamiento = new Certificado();
    this._baseUrlHC = environment.URLHc;
    this.DiagnosticoSeleccionado = new VMDiagnostico();
    this.planDeManejoPostCovid = new PlanManejoPostCovid();
  }

  ObtenerHistoricoAnalisisyPlan(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/HistoricoImpresionDiagnosticaAnalisisPlan?PacienteId=' + pacienteID, { responseType: "json" })
  }

  ObtenerHistoricoIncapacidad(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/HistoricoIncapacidad?PacienteId=' + pacienteID, { responseType: "json" })
  }

  cargarDatosHistoricosLicencia(pacienteId) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerHistoricoPrenatalLicencia?PacienteId=' + pacienteId, { responseType: "json" })

  }
}


