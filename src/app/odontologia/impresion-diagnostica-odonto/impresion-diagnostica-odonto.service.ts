import { Injectable, Inject } from '@angular/core';
import { DiagnosticoPrincipal, Incapacidad, VMDiagnosticoOdontologico } from 'src/app/Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImpresionDiagnosticaOdontoService {
  analisisYplan: string;
  diagnosticos: VMDiagnosticoOdontologico[];

  diagnosticosRelacionados: VMDiagnosticoOdontologico[];
  diagnosticosPrincipal: VMDiagnosticoOdontologico[];


  swIncapacidad: boolean = false;
  listadoDiagnosticoSeleccionados: Array<VMDiagnosticoOdontologico>
  DiagnosticoSeleccionado: VMDiagnosticoOdontologico;
  public diagnosticoPrincipal: DiagnosticoPrincipal;
  public incapacidad: Incapacidad;
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
    this.DiagnosticoSeleccionado = new VMDiagnosticoOdontologico();
    this.diagnosticos = new Array<VMDiagnosticoOdontologico>();
    this.diagnosticoPrincipal = new DiagnosticoPrincipal();
    this.incapacidad = new Incapacidad();
    this.incapacidad.fechaIncapacidad = new Date().toISOString().slice(0, 10);
    this._baseUrlHC = environment.URLHc;
  }



  ObtenerHistoricoMotivoConsulta(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/HistoricoOdontologia/HistoricoImpresionDiagnostica?PacienteId=' + pacienteID, { responseType: "json" })
  }

  ObtenerHistoricoDiagnostico(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/HistoricoOdontologia/HistoricosDiagnostica?PacienteId=' + pacienteID, { responseType: "json" })
  }

  ObtenerHistoricoIncapacidad(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/HistoricoIncapacidad?PacienteId=' + pacienteID, { responseType: "json" })
  }

}


