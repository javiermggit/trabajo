import { Injectable, Inject } from '@angular/core';
import { Ordenamiento, Medicamento, HCMedicmento, VMCup } from 'src/app/Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { ParametroService } from 'src/app/parametros/parametro.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MedicoService } from 'src/app/medico/medico.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductaService {
  ListadoOrdenamiento: Array<Ordenamiento>;

  ListadoTiempoAgendar = [
    'Día(s)',
    'Mes(es)',
    'Año(s)',
  ];

  HCmedicamento: HCMedicmento;
  recomendacionesMedicas: string;

  ListadoOrdenamientoReimp: Array<Ordenamiento>;
  listadoOrdenamientoVigente3meses: Array<Ordenamiento>;
  HCmedicamentoReimp: HCMedicmento;
  recomendacionesMedicasReimp: string;

  swRequiereRecomendacion: boolean = false;

  fechahoy: string
  _baseUrlHC: string;
  _baseUrlOrde: string;
  _baseUrlOrdeV2: string;

  segumientoNoPresencial: boolean = false;
  tipoSeguimiento: number;
  segumientoFecha: Date;
  segumientoTipoJornada: Boolean;
  segumientoModalidad: string;
  segumientoTurnoAgenda: number;
  segumientoNota: string;

  segumientoAnterior: string;

  habilitarSeguimiento: Boolean = false;


  constructor(
    public medicoServices: MedicoService,
    private http: HttpClient,
    //@Inject('URLHc') _baseUrlHC: string,
    //@Inject('UrlOrdenamiento') _baseUrlOrde: string,
    //@Inject('UrlOrdenamientoV2') _baseUrlOrdeV2: string,
    public parametrizacion: ParametroService
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlOrde = environment.UrlOrdenamiento;
    this._baseUrlOrdeV2 = environment.UrlOrdenamientoV2;
    this.ListadoOrdenamiento = new Array<Ordenamiento>();
    this.HCmedicamento = new HCMedicmento();
    this.HCmedicamento.medicamentos = new Array<Medicamento>();
    this.HCmedicamento.numeroMeses = 2;
    this.HCmedicamento.fechaInicioPF = new Date().toISOString().slice(0, 10);
    var fechaFinal = new Date();
    fechaFinal.setMonth(new Date().getMonth() + 2);
    this.HCmedicamento.fechaFinPF = fechaFinal.toISOString().slice(0, 10);
  }


  cargarOrden(codigo: string) {

    var dato = this.parametrizacion.ListadoCups.find(x => x.codigo == codigo);
    if (dato != null) {
      var vmResultado = new Ordenamiento();
      vmResultado.cup = dato;
      vmResultado.cup.cantidad = 1;
      vmResultado.tipo = "";
      vmResultado.nota = "";

      if (this.ListadoOrdenamiento.filter(x => x.cup.codigo == vmResultado.cup.codigo).length == 0) {
        this.ListadoOrdenamiento.push(vmResultado)
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  GuardarLogSicu(citaId: number) {
    return this.http.post(
      `${this._baseUrlHC}/api/Logs/GuardarLogSicu?CitaID=${citaId}`,
      {}, // body vacío
      { responseType: 'text' }
    );
  }



  ObtenerHistoricoMedicamento(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/HistoricoMedicamentoHCM?PacienteId=' + pacienteID, { responseType: "json" })
  }

  ObtenerHistoricoOrdenamamientos(pacienteID, tipo) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/OrdenamientosPaciente?PacienteId=' + pacienteID + '&NotaTecnica=' + tipo, { responseType: "json" })
  }

  listarAgendasDisponibles(fecha, citaId, swVisualizacion, tipoAccesoId) {
    return this.http.post<any>(this._baseUrlHC + '/api/Morbilidad/ObtenerTurnosSeguimientoNoPresencia?FechaSeguimiento=' + fecha + '&TurnoId=' + citaId + '&swVisualizacion=' + swVisualizacion + '&TipoaccesoId=' + tipoAccesoId, null)
  }
  guardarAgendaSegumiento(turnoId, agendaId, usuarioId, Modalidad, SegNoPresencial) {
    return this.http.post<any>(this._baseUrlHC + '/api/Morbilidad/InsertarSeguimientoNoPresencial?TurnoId=' + turnoId + '&AgendaTurno_Id=' + agendaId + '&UsuarioId=' + usuarioId + '&SegModalidad=' + Modalidad, SegNoPresencial)
  }
  encolarSegNoPresencial(turnoId, usuarioId, SegNoPresencial) {
    return this.http.post<any>(this._baseUrlHC + '/api/Morbilidad/EncolarSeguimientoNoPresencial?TurnoId=' + turnoId + '&UsuarioId=' + usuarioId, SegNoPresencial)
  }

  ObtenerHistoricoMedicamentoPorcita(CitaId) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerMedicamentosPorCita?cita=' + CitaId, { responseType: "json" })
      .subscribe((response) => {
        this.HCmedicamento = response;
      }, (error) => {
      })
  }

  ObtenerHistoricoOrdenamientosPorcita(CitaId) {
    return this.http.get<any>(this._baseUrlOrde + '/ObtenerOrdenamientoPorCita?cita=' + CitaId, { responseType: "json" })
      .subscribe((response) => {
        this.ListadoOrdenamiento = response;
        this.ListadoOrdenamiento.forEach(e => {
          e.nota = e['observaciones'];
        });
      })
  }

  ObtenerHistoricoOrdenamientosPorPacienteVigencia(Pacienteid) {
    this.listadoOrdenamientoVigente3meses = new Array<Ordenamiento>();
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerOrdenamientoPorPacienteIdVigente?pacienteid=' + Pacienteid, { responseType: "json" })
      .subscribe((response) => {
        this.listadoOrdenamientoVigente3meses = response;
      }, error => {
        this.listadoOrdenamientoVigente3meses = new Array<Ordenamiento>();
      })
  }


  validarCantidadCup(pacienteId, CupId, cantidad) {
    return this.http.get(this._baseUrlOrde + '/api/Ordenamientos/ValidarCantidadCup?pacienteId=' + pacienteId + '&CupId=' + CupId + '&cantidad=' + cantidad, { responseType: "text" })
  }

  getInformacionExtraCupsCirugia(pacienteId: number, citaId: string, listaIds:any): Observable<any> {

    var url = `${this._baseUrlOrdeV2}/api/ordenamiento/GetInformacionExtraCupsCirugia?citaId=${citaId}`;

    return this.http.post(url, listaIds, { responseType: "json" })
  }

  getPaquetePrograma(idPaquete:number, citaId: string): Observable<any> {

    var url = `${this._baseUrlOrdeV2}/api/Combo/ObtenerPaqueteProgramasCupsByCitaId?citaID=${citaId}&paqueteProgramaId=${idPaquete}`;
    return this.http.get(url, { responseType: "json" })
  }

}
