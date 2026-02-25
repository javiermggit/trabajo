import { Injectable, Inject } from '@angular/core';
import { HCMedicmento, Medicamento, Ordenamiento } from 'src/app/Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductaOdontoService {
  ListadoOrdenamiento: Array<Ordenamiento>;
  fechahoy: string
  HCmedicamento: HCMedicmento;
  recomendacionesMedicas: string;
  _baseUrlHC: string;
  _baseUrlOrde: string;

 
  swRequiereRecomendacion: boolean = false;
  constructor(
    private http: HttpClient
    //@Inject('URLHc') _baseUrlHC: string,
    //@Inject('UrlOrdenamiento') _baseUrlOrde: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlOrde = environment.UrlOrdenamiento;
    this.ListadoOrdenamiento = new Array<Ordenamiento>();
    this.HCmedicamento = new HCMedicmento();
    this.HCmedicamento.medicamentos = new Array<Medicamento>();
    this.HCmedicamento.numeroMeses = 2;
    this.HCmedicamento.fechaInicioPF = new Date().toISOString().slice(0, 10);
    var fechaFinal = new Date();
    fechaFinal.setMonth(new Date().getMonth() + 2);
    this.HCmedicamento.fechaFinPF = fechaFinal.toISOString().slice(0, 10);

  }


  ObtenerHistoricoMedicamento(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/HistoricoMedicamentoHCM?PacienteId=' + pacienteID, { responseType: "json" })
  }

  ObtenerHistoricoOrdenamamientos(pacienteID, tipo) {
    return this.http.get<any>(this._baseUrlOrde + '/OrdenamientosPacienteOdontologico?PacienteId=' + pacienteID + '&NotaTecnica=' + tipo, { responseType: "json" })
  }

  ObtenerHistoricoMedicamentoPorcita(CitaId) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerMedicamentosPorCita?cita=' + CitaId, { responseType: "json" })
      .subscribe((response) => {

        this.HCmedicamento = response;
      })
  }

  ObtenerHistoricoOrdenamientosPorcita(CitaId) {
    return this.http.get<any>(this._baseUrlOrde + '/ObtenerOrdenamientoPorCita?cita=' + CitaId, { responseType: "json" })
      .subscribe((response) => {
        

        response.forEach(e => {
          e.nota = e.observaciones;
          e.diagnostico = e.dx;
          e.diagnostico.descripcion = e.dx.diagnostico;
          if (e.diente != null) {
            e.diente = e.diente.diente;
            e.cara = e.diente.cara;
            e.evento = e.diente.evento;
          } else {
            e.diente = 0;
            e.cara = 0;
            e.evento = "";
          }

        });
        this.ListadoOrdenamiento = response;
      })
  }



}
