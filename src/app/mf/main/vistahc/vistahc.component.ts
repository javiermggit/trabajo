import { Component, OnDestroy, OnInit } from '@angular/core';
import { VistahcService } from './vistahc.service';
import Swal from 'sweetalert2';
import { MedicoService } from 'src/app/medico/medico.service';
import { MatTableDataSource } from '@angular/material/table';
import { Citas } from 'src/app/Modelos/Medico';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { finalize, switchMap, timeout } from 'rxjs';
import { resolveApiErrorMessage } from 'src/app/utils/api-error';
import { escapeHtml as escapeHtmlUtil } from 'src/app/utils/string';
import {
  DEFAULT_TABLE_PAGE_SIZE,
  ISO_DATE_ONLY_LENGTH,
  LLAMADO_ESTADO_POLL_MS,
  TIMEOUT_DESACTIVAR_CITA_MS,
  TIMEOUT_LLAMAR_TURNO_MS
} from 'src/app/utils/constants';
import { resolveCitaId as resolveCitaIdUtil } from 'src/app/utils/cita';
import { hasLoadingKey, setLoadingKey } from 'src/app/utils/loading-keys';
import { toNumberOrNull } from 'src/app/utils/primitive';
import { buildHistoricoHtml as buildHistoricoHtmlUtil } from '../../../utils/historico-html';
import { maybeFixMojibake as maybeFixMojibakeUtil } from 'src/app/utils/mojibake';
import {
  SWAL_MSG_DEBE_SELECCIONAR_ESPECIALIDAD,
  SWAL_MSG_ERROR_CONSULTAR_CITA,
  SWAL_MSG_NO_HAY_LINK_ABRIR,
  SWAL_TITULO_ADVERTENCIA_DOBLE,
  SWAL_TITULO_DATO_FALTANTE
} from 'src/app/utils/swal-messages';

declare const __webpack_require__: { p?: string } | undefined;

@Component({
  selector: 'app-vistahc',
  templateUrl: './vistahc.component.html',
  styleUrls: ['./vistahc.component.css']
})
export class VistahcComponent implements OnInit, OnDestroy {
 public llamadaService: any = { loading: false, estado: false };  
 public filtro = undefined;
  public loadingCI: boolean = false;
  private consentimientoLoadingKey: string | null = null;
  private turnoLoadingKeys = new Set<string>();
  private desactivarLoadingKeys = new Set<string>();
  citasAMostrar: any[] = [];
  private estadoLlamadoTimer: ReturnType<typeof setInterval> | null = null;
  // ── DataSources ──────────────────────────────────────────────────────────
  /** Citas del día (no adicionales) */
  public dataSource: MatTableDataSource<Citas> = new MatTableDataSource<Citas>([]);

  /** Recuperación (adicionales) */
  public dataSourceEti: MatTableDataSource<Citas> = new MatTableDataSource<Citas>([]);

	  /** Contingencia */
	  public dataSourceCont: MatTableDataSource<Citas> = new MatTableDataSource<Citas>([]);
	  public loginId: string;
	  row_: any;
	  listado_citas: any;
	  listado_citas_recuperacion: any;
	  listado_contingencia: any;
  loading = false;
  especialidad?: string;
  errorHcTable: string = '';
  errorNotasTable: string = '';
  errorOtrosTable: string = '';
  hcPage: number = 1;
  notasPage: number = 1;
  otrosPage: number = 1;
	  hcPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
	  notasPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
	  otrosPageSize: number = DEFAULT_TABLE_PAGE_SIZE;


  /////
  
    loadingImpresion :boolean =false;
    identificacion!: string;
     tipo!: string;
     identificacionNoTemporal! : string;
    tipoNoTemporal! : string;
    especialidadNoTemporal? : string; 
    SwBoton: boolean = false;
    PacienteIdInd: number=0;
    link: string='';
    fechahoy = new Date().toISOString().substring(0, ISO_DATE_ONLY_LENGTH);
    private readonly baseDisplayedColumns: string[] = [
    'hora',
    'paciente',
    //'acceso',
    'turno',
    'estado',
    'historias',
    'consentimientos'
  ];

  /** Columnas para Contingencia */
  displayedColumnsCont: string[] = [
    'fecha',
    'paciente',
    'verificado',
    'historias',
    'acciones'
  ];

  get displayedColumns(): string[] {
    return this.mostrarHistoricoCitas()
      ? [...this.baseDisplayedColumns, 'historico']
      : this.baseDisplayedColumns;
  }
   
    notasDataOriginal: any[] = [];
    otrosDataOriginal: any[] = [];
    profesionalesOptions: Array<{ label: string; value: string }> = [];
    filtroProfesional: string | null = null;
    filtroFechaRango: Date[] | null = null;
    loadingHcTable: boolean = false;
    loadingNotasTable: boolean = false;
    loadingOtrosTable: boolean = false;
   

  //////
	  constructor(
	    public rs: VistahcService,
	    public medicoServices: MedicoService,
	    private cookieService: CookieService,
	   ){

     this.loginId = environment.production == false ? 'mprueba' : this.cookieService.get('UsuarioMedico');
      //this.loginId = environment.production == false ? "JARAMIREZ" : this.cookieService.get('UsuarioMedico');
  }

  mfAssetUrl(path: string): string {
    const cleanPath = path.replace(/^\/+/, '');

    const publicPath = __webpack_require__?.p && __webpack_require__?.p.length ? __webpack_require__.p : '';
    const windowHref = typeof window !== 'undefined' ? window.location.href : '';
    const windowOrigin = typeof window !== 'undefined' ? window.location.origin : '';

    let origin = windowOrigin;
    if (publicPath) {
      try {
        origin = new URL(publicPath, windowHref || 'http://localhost/').origin;
      } catch {
        origin = windowOrigin;
      }
    }

    if (!origin) {
      return `/${cleanPath}`;
    }

    // En Angular CLI, los assets normalmente viven en `/<assets...>` (root del host).
    return new URL(`/${cleanPath}`, origin).toString();
  }

    ngOnInit(): void {    
      this.consultarEspecialidad(); 

      const state = this.rs.viewState;
      if (state) {
        this.filtro = state.filtro;

        this.listado_citas = state.citas ?? this.listado_citas;
        this.listado_citas_recuperacion = state.citasEti ?? this.listado_citas_recuperacion;
        this.listado_contingencia = state.citasCont ?? this.listado_contingencia;

        // Si el estado viene cacheado (navegación/restore), normalizar strings para evitar mojibake.
        this.normalizarTextoCitas(this.listado_citas as any);
        this.normalizarTextoCitas(this.listado_citas_recuperacion as any);
        this.normalizarTextoCitas(this.listado_contingencia as any);

        this.dataSource = new MatTableDataSource<Citas>(state.citas ?? []);
        this.dataSourceEti = new MatTableDataSource<Citas>(state.citasEti ?? []);
        this.dataSourceCont = new MatTableDataSource<Citas>(state.citasCont ?? []);

        this.hcPage = state.hcPage ?? this.hcPage;
        this.notasPage = state.notasPage ?? this.notasPage;
        this.otrosPage = state.otrosPage ?? this.otrosPage;

        this.hcPageSize = state.hcPageSize ?? this.hcPageSize;
        this.notasPageSize = state.notasPageSize ?? this.notasPageSize;
        this.otrosPageSize = state.otrosPageSize ?? this.otrosPageSize;
      }
  }  

  ngOnDestroy(): void {
    this.detenerEstadoLlamadoTimer();
  }

    consultarCitasGeneral() {
      if (this.filtro !== undefined && this.filtro !== null) {
        this.medicoServices.Especialidad = this.filtro;
      }

      this.consultarCitas();
      this.consultarCitasAnteriores();
  }

  public consultarCitasAnteriores(): void {
    if (this.filtro === undefined || this.filtro === null) {
      return;
    }

    this.loadingOtrosTable = true;
    this.medicoServices.consultarCitasContigencia(this.filtro.id).subscribe(
      (x: Citas[]) => {
        this.loadingOtrosTable = false;
        this.normalizarTextoCitas(x as any);
        let contingencia = x;

        if (this.medicoServices?.Especialidad?.id === 139) {
          contingencia = x.filter(n => n.estado !== 'PRO');
        }

        this.listado_contingencia = contingencia;
        this.dataSourceCont = new MatTableDataSource<Citas>(contingencia);
        this.otrosPage = 1;
      },
      () => {
        this.loadingOtrosTable = false;
        // Contingencia es opcional; no bloquea la vista si falla.
      }
    );
  }

  public consultarCitasold() {

    if (this.filtro != undefined) {
      this.loading = true;

      this.medicoServices.consultarCitas(this.filtro.id).subscribe(
        (x) => {

          this.loading = false;
          if (x.length == 0) {
            Swal.fire('No hay citas asignadas para el dia de hoy', "", 'info')
          }

          x.forEach(e => {
            e.disableButton = true;
            e.tipoAgendaAcceso = e.tipoAgendaAcceso == null ? '' : (e.tipoAgendaAcceso).toUpperCase()
            if (e.estado == "FAC") {
              e.disableButton = false;
            } else {
              if (e.estado == "ACT" && (e.tipoAgendaAccesoId == 2 || e.tipoAgendaAccesoId == 4)) {
                e.disableButton = false;
              }
            }
          });

          this.medicoServices.listadoCitas = x
          this.dataSource = new MatTableDataSource(x.filter(n => !n.adicional));
          this.dataSourceEti = new MatTableDataSource(x.filter(n => n.adicional));        


          this.listado_citas_recuperacion = x.filter(n => n.adicional)
          this.listado_citas = x.filter(n => !n.adicional)

          if(this.medicoServices.Especialidad.id == 139){
            this.listado_citas = x.filter(n => n.estado != 'PRO')
            this.listado_citas_recuperacion = x.filter(n => n.estado != 'PRO')
          }
          // console.log(this.listado_citas_recuperacion)
          // console.log(this.listado_citas)


        }, (error) => {
          this.loading = false;
          Swal.fire('Error!!', SWAL_MSG_ERROR_CONSULTAR_CITA, 'error')
        })
    } else {
      Swal.fire(SWAL_TITULO_ADVERTENCIA_DOBLE, SWAL_MSG_DEBE_SELECCIONAR_ESPECIALIDAD, 'warning')
    }

  }

   public consultarCitas(): void {
    if (this.filtro === undefined || this.filtro === null) {
      Swal.fire(SWAL_TITULO_ADVERTENCIA_DOBLE, SWAL_MSG_DEBE_SELECCIONAR_ESPECIALIDAD, 'warning');
      return;
    }

    this.loading = true;
    this.loadingHcTable = true;
    this.loadingNotasTable = true;

    this.medicoServices.consultarCitas(this.filtro.id).subscribe(
      (x: Citas[]) => {
        this.loading = false;
        this.loadingHcTable = false;
        this.loadingNotasTable = false;
        this.normalizarTextoCitas(x as any);

        if (x.length === 0) {
          Swal.fire('No hay citas asignadas para el día de hoy', '', 'info');
        }

        // Marcar botones habilitados/deshabilitados
        x.forEach(e => {
          e.disableButton = true;
          (e as any).contador = 0;
          e.tipoAgendaAcceso = e.tipoAgendaAcceso == null
            ? ''
            : (e.tipoAgendaAcceso as string).toUpperCase();

          if (e.estado === 'FAC') {
            e.disableButton = false;
          } else if (e.estado === 'ACT' && (e.tipoAgendaAccesoId === 2 || e.tipoAgendaAccesoId === 4)) {
            e.disableButton = false;
          }
        });

        // Guardar en el servicio
        this.medicoServices.listadoCitas = x;

        // Separar citas normales y de recuperación
        let citas       = x.filter(n => !n.adicional);
        let recuperacion = x.filter(n => n.adicional);

        // Caso especial especialidad 139: excluir estado PRO
        if (this.medicoServices.Especialidad.id === 139) {
          citas        = x.filter(n => n.estado !== 'PRO');
          recuperacion = x.filter(n => n.estado !== 'PRO');
        }

        // Arrays raw
        this.listado_citas              = citas;
        this.listado_citas_recuperacion = recuperacion;
        this.listado_contingencia       = x.filter(n => n.adicional); // ajusta el filtro si tienes campo específico

        // DataSources
        this.dataSource    = new MatTableDataSource<Citas>(citas);
        this.dataSourceEti = new MatTableDataSource<Citas>(recuperacion);
        this.dataSourceCont = new MatTableDataSource<Citas>(this.listado_contingencia);

        // Resetear páginas
        this.hcPage    = 1;
        this.notasPage = 1;
        this.otrosPage = 1;

        if ((this.filtro as any)?.swControlaLlamadosSimultaneos) {
          this.consultarEstadoLlamado();
          this.iniciarEstadoLlamadoTimer();
        } else {
          this.detenerEstadoLlamadoTimer();
        }
      },
      (error) => {
        this.loading = false;
        this.loadingHcTable = false;
        this.loadingNotasTable = false;
        this.detenerEstadoLlamadoTimer();
        Swal.fire('Error!!', SWAL_MSG_ERROR_CONSULTAR_CITA, 'error');
      }
    );
  }

 public consultarEspecialidad() {
     //this.loadingReimpresion = true;
       this.rs.ObtenerEspecialidad().subscribe((x) => {    
 
       this.rs.listadoEspecialidad = x
       //this.loadingReimpresion = false;
     }, (error) => {
 
       //this.loadingReimpresion = false;
       const msg = resolveApiErrorMessage(error, 'Ocurrió un error');
       Swal.fire('Advertencia!!', msg, 'error');
       //console.log(error)
     })
 }

 totalPages(total: number, size: number): number {
    if (!total || size <= 0) {
      return 1;
    }
    return Math.max(1, Math.ceil(total / size));
  }

  paginatedRows<T>(rows: T[], page: number, size: number): T[] {
    const start = (Math.max(page, 1) - 1) * size;
    return rows.slice(start, start + size);
  }

  hasNextPage(total: number, page: number, size: number): boolean {
    return page < this.totalPages(total, size);
  }

  previousPage(table: 'hc' | 'notas' | 'otros'): void {
    if (table === 'hc' && this.hcPage > 1) {
      this.hcPage--;
    } else if (table === 'notas' && this.notasPage > 1) {
      this.notasPage--;
    } else if (table === 'otros' && this.otrosPage > 1) {
      this.otrosPage--;
    }
  }

  nextPage(table: 'hc' | 'notas' | 'otros'): void {
    if (table === 'hc' && this.hasNextPage(this.dataSource.data.length, this.hcPage, this.hcPageSize)) {
      this.hcPage++;
    } else if (table === 'notas' && this.hasNextPage(this.dataSourceEti.data.length, this.notasPage, this.notasPageSize)) {
      this.notasPage++;
    } else if (table === 'otros' && this.hasNextPage(this.dataSourceCont.data.length, this.otrosPage, this.otrosPageSize)) {
      this.otrosPage++;
    }
  }

  buildCounterText(total: number, page: number, size: number): string {
    if (!total) {
      return 'Mostrando 0 de 0';
    }
    const start = (page - 1) * size + 1;
    const end = Math.min(total, page * size);
    return `Mostrando ${start}-${end} de ${total}`;
  }

  mostrarHistoricoCitas(): boolean {
    return Number(this.filtro?.id) === 14;
  }

  private iniciarEstadoLlamadoTimer(): void {
    this.detenerEstadoLlamadoTimer();
    this.estadoLlamadoTimer = setInterval(() => this.consultarEstadoLlamado(), LLAMADO_ESTADO_POLL_MS);
  }

  private detenerEstadoLlamadoTimer(): void {
    if (this.estadoLlamadoTimer) {
      clearInterval(this.estadoLlamadoTimer);
      this.estadoLlamadoTimer = null;
    }
  }

  private consultarEstadoLlamado(): void {
    const citasIds = (this.listado_citas || [])
      .map((c: any) => this.resolveCitaId(c))
      .filter((id: any) => id !== null) as Array<string | number>;
    if (!citasIds.length) {
      return;
    }

    this.medicoServices.obtenerEstadoLlamado(citasIds).subscribe({
      next: (response: any) => {
        const data = response?.data || response || [];
        if (!Array.isArray(data)) {
          return;
        }

        this.aplicarEstadoLlamado(this.listado_citas, data);
        this.aplicarEstadoLlamado(this.listado_citas_recuperacion, data);
        this.dataSource = new MatTableDataSource<Citas>(this.listado_citas || []);
        this.dataSourceEti = new MatTableDataSource<Citas>(this.listado_citas_recuperacion || []);
      },
      error: () => {
        // Digiturno no debe bloquear la vista si falla temporalmente.
      }
    });
  }

  private aplicarEstadoLlamado(listado: any[], data: any[]): void {
    if (!Array.isArray(listado)) {
      return;
    }

    listado.forEach((cita: any) => {
      const citaId = this.resolveCitaId(cita);
      if (citaId === null) return;

      const estado = data.find((d: any) => {
        const everestId = d?.everest_Id ?? d?.EverestId ?? d?.everestId ?? d?.Everest_Id;
        if (everestId === undefined || everestId === null || everestId === '') return false;
        return String(everestId) === String(citaId);
      });
      if (!estado) {
        return;
      }

      cita.swSeguirLlamando = estado.swSeguirLlamando;

      if ((this.filtro as any)?.swControlaLlamadosSimultaneos) {
        cita.swExcedioLimiteLlamada = estado.swExcedioLimiteLlamada;
        cita.disableButton = !estado.swTiempoRestanteLlamado;
        cita.contador = estado.tiempoRestanteLlamado;
        cita.ticket_Id = estado.ticket_Id;
        cita.swTiempoRestanteLlamado = estado.swTiempoRestanteLlamado;
      }
    });
  }

  abrirHistoriaClinica(item: any): void {
    const base = (environment as any).vistaHC as string;
    if (!base) {
      Swal.fire('Configuración pendiente', 'Falta configurar `environment.vistaHC` para abrir la Historia Clínica.', 'info');
      return;
    }

    const url = new URL(base, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const citaId = this.resolveCitaId(item);
    const pacienteId = item?.pacienteId ?? item?.paciente_Id ?? item?.PacienteId ?? item?.pacienteID;

    if (citaId !== undefined && citaId !== null) url.searchParams.set('citaId', String(citaId));
    if (pacienteId !== undefined && pacienteId !== null) url.searchParams.set('pacienteId', String(pacienteId));
    if (item?.identificacion) url.searchParams.set('identificacion', String(item.identificacion));
    if (this.filtro?.id) url.searchParams.set('especialidadId', String(this.filtro.id));

    window.open(url.toString(), '_blank');
  }

  obtenerHistoricoAsistioCita(item: any): void {
    const pacienteId =
      item?.pacienteId ??
      item?.paciente_Id ??
      item?.PacienteId ??
      item?.pacienteID ??
      item?.idPaciente;

    if (pacienteId === undefined || pacienteId === null || pacienteId === '') {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, 'No se encontró el paciente para consultar el histórico de citas.', 'warning');
      return;
    }

    const especialidadId = Number(this.filtro?.id ?? 0);
    if (!especialidadId) {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, 'No se encontró la especialidad para consultar el histórico de citas.', 'warning');
      return;
    }

    this.loading = true;
    this.medicoServices.obtenerHistoricoAsistioCita(especialidadId, Number(pacienteId), true).subscribe({
      next: (res: any[]) => {
        this.citasAMostrar = Array.isArray(res) ? res : [];

        if (this.citasAMostrar.length < 1) {
          Swal.fire('Información', 'El paciente no tiene citas anteriores', 'info');
          return;
        }

        Swal.fire({
          title: 'Histórico de citas',
          width: 900,
          html: this.buildHistoricoHtml(this.citasAMostrar),
          confirmButtonText: 'Cerrar'
        });
      },
      error: (err: any) => {
        const msg =
          err?.error?.mensaje ??
          err?.error?.message ??
          err?.message ??
          (typeof err === 'string' ? err : 'Error consultando el histórico de citas.');
        Swal.fire('Error', msg, 'error');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private buildHistoricoHtml(citas: any[]): string {
    return buildHistoricoHtmlUtil(citas);
    /* legacy (mismo HTML, mantenido por rollback fácil)
    const rows = citas.map((cita: any) => {
      const fecha = this.formatHistoricoDate(cita?.fechaCita);
      const profesional = this.escapeHtml(cita?.nombreProfesional ?? '');
      const asistio = cita?.asistioCita ? 'Sí' : 'No';
      const asistioClass = cita?.asistioCita ? '' : ' style="color:#dc2626;font-weight:600;"';
      const especialidad = this.escapeHtml(cita?.especialidad ?? '');
      const programa = this.escapeHtml(cita?.programa ?? '');

      return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${fecha}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${profesional}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;"${asistioClass}>${asistio}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${especialidad}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${programa}</td>
        </tr>
      `;
    }).join('');

    return `
      <div style="max-height:420px;overflow:auto;text-align:left;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Fecha</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Profesional</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Asistió</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Especialidad</th>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #d1d5db;">Programa</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
    */
  }

  private formatHistoricoDate(value: any): string {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return this.escapeHtml(String(value));
    return d.toLocaleDateString('es-CO');
  }

  private escapeHtml(value: string): string {
    return escapeHtmlUtil(value);
  }

  // Los endpoints retornan ids con nombres distintos según la consulta (citaId, ConsultaId, CitaId, etc).
  // Esta función centraliza la resolución para que los botones (turno/desactivar/historia) funcionen parejo.
	  resolveCitaId(rowOrId: any): string | number | null {
	    return resolveCitaIdUtil(rowOrId);
	  }

  private getRowKey(row: any, prefix: 'turno' | 'desactivar'): string | null {
    const citaId = this.resolveCitaId(row);
    if (citaId !== null) return `${prefix}:cita:${String(citaId)}`;
    if (row?.identificacion) return `${prefix}:ident:${String(row.identificacion)}`;
    return null;
  }

	  isTurnoLoading(row: any): boolean {
	    const key = this.getRowKey(row, 'turno');
	    return hasLoadingKey(this.turnoLoadingKeys, key);
	  }

	  isDesactivarLoading(row: any): boolean {
	    const key = this.getRowKey(row, 'desactivar');
	    return hasLoadingKey(this.desactivarLoadingKeys, key);
	  }

  private quitarFilaContingencia(item: any): void {
    const citaId = this.resolveCitaId(item);
    if (citaId === null) return;

    const actual = Array.isArray(this.listado_contingencia) ? this.listado_contingencia : [];
    const filtered = actual.filter((row: any) => String(this.resolveCitaId(row)) !== String(citaId));

    this.listado_contingencia = filtered;
    this.dataSourceCont = new MatTableDataSource<Citas>(filtered as any);

    // Ajustar paginación si la página queda fuera de rango.
    const maxPage = this.totalPages(filtered.length, this.otrosPageSize);
    if (this.otrosPage > maxPage) this.otrosPage = maxPage;
  }

  private maybeFixMojibake(value: any): string {
    return maybeFixMojibakeUtil(value);
    /* legacy (mismo comportamiento, mantenido por rollback fácil)
    const text = String(value ?? '');
    if (!text) return text;

    // Heurística: patrones típicos de UTF-8 mal interpretado como Latin1/Win-1252.
    const looksBroken = /Ã.|Â.|â[€™“”–—]/.test(text);
    if (!looksBroken) return text;

    const win1252Map: Record<number, number> = {
      0x20ac: 0x80, // €
      0x201a: 0x82, // ‚
      0x0192: 0x83, // ƒ
      0x201e: 0x84, // „
      0x2026: 0x85, // …
      0x2020: 0x86, // †
      0x2021: 0x87, // ‡
      0x02c6: 0x88, // ˆ
      0x2030: 0x89, // ‰
      0x0160: 0x8a, // Š
      0x2039: 0x8b, // ‹
      0x0152: 0x8c, // Œ
      0x017d: 0x8e, // Ž
      0x2018: 0x91, // ‘
      0x2019: 0x92, // ’
      0x201c: 0x93, // “
      0x201d: 0x94, // ”
      0x2022: 0x95, // •
      0x2013: 0x96, // –
      0x2014: 0x97, // —
      0x02dc: 0x98, // ˜
      0x2122: 0x99, // ™
      0x0161: 0x9a, // š
      0x203a: 0x9b, // ›
      0x0153: 0x9c, // œ
      0x017e: 0x9e, // ž
      0x0178: 0x9f, // Ÿ
    };

    // Re-encodar la string a bytes 0-255 (win1252/latin1) y decodificar como UTF-8.
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      const codePoint = text.charCodeAt(i);
      if (codePoint <= 0xff) {
        bytes[i] = codePoint;
        continue;
      }
      const mapped = win1252Map[codePoint];
      if (mapped === undefined) {
        return text; // no representable; no arriesgar.
      }
      bytes[i] = mapped;
    }

    try {
      const fixed = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      // Solo aplicar si realmente mejora (reduce patrones rotos).
      if (/Ã.|Â.|â[€™“”–—]/.test(fixed)) return text;
      return fixed;
    } catch {
      return text;
    }
    */
  }

  private normalizarTextoCitas(list: any[]): void {
    if (!Array.isArray(list)) return;
    list.forEach((e: any) => {
      if (e?.nombrePaciente) e.nombrePaciente = this.maybeFixMojibake(e.nombrePaciente);
      if (e?.tipoAgendaAcceso) e.tipoAgendaAcceso = this.maybeFixMojibake(e.tipoAgendaAcceso);
    });
  }

  
    // ── Acciones de citas (mantener los métodos que ya tenías) ────────────────

  irA(item: any, tipo: string): void {
    // tu implementación existente
  }


  private getConsentimientoKey(row: any): string {
    const citaId = this.resolveCitaId(row);
    const pacienteId =
      row?.pacienteId ?? row?.paciente_Id ?? row?.PacienteId ?? row?.pacienteID ?? row?.idPaciente;

    if (citaId !== undefined && citaId !== null && String(citaId).length) return `cita:${String(citaId)}`;
    if (pacienteId !== undefined && pacienteId !== null && String(pacienteId).length) return `paciente:${String(pacienteId)}`;
    return `row:${JSON.stringify(row ?? {})}`;
  }

  isConsentimientoLoading(row: any): boolean {
    return this.consentimientoLoadingKey === this.getConsentimientoKey(row);
  }

  irAci(row: any): void {
    const pacienteId =
      row?.pacienteId ??
      row?.paciente_Id ??
      row?.PacienteId ??
      row?.pacienteID ??
      row?.idPaciente;

    if (pacienteId === undefined || pacienteId === null || pacienteId === '') {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, 'No se encontró el `pacienteId` para abrir Consentimientos.', 'warning');
      return;
    }

    const key = this.getConsentimientoKey(row);
    if (this.consentimientoLoadingKey === key) return;

    this.loadingCI = true;
    this.consentimientoLoadingKey = key;

    this.rs
      .ObtenerPacientePorId(pacienteId)
      .pipe(
        switchMap((response: any) => {
          const apellidos = [response?.primer_Apellido, response?.segundo_Apellido].filter(Boolean).join(' ');

          const data: any = {
            id: response?.id,
            tipoIdentificacion: response?.tipo_Identificacion,
            identificacion: response?.identificacion,
            nombres: response?.nombre,
            apellidos,
            telefono: response?.telefono,
            correo: response?.correo,
            swPermiteEnviar: true
          };

          return this.medicoServices.guardarConsentimientoUsuario(data);
        }),
        finalize(() => {
          this.loadingCI = false;
          this.consentimientoLoadingKey = null;
        })
      )
      .subscribe({
        next: (res: any) => {
          const docId = res?.data?.idDocumento;
          if (!docId) {
            Swal.fire('Error', 'No se recibió `idDocumento` al generar el consentimiento.', 'error');
            return;
          }

          const base = (environment as any).vistaCI ?? '';
          const baseNormalized = String(base).replace(/\/+$/, '');
          const docNormalized = String(docId).startsWith('/') ? String(docId) : `/${docId}`;

          //console.log('datos:',baseNormalized);

          const popup = window.open(`${baseNormalized}${docNormalized}`, '_blank');
          if (!popup) {
            Swal.fire(
              'Ventana bloqueada',
              'Tu navegador bloqueó la pestaña. Permite ventanas emergentes para abrir el consentimiento.',
              'info'
            );
          }
        },
        error: (err: any) => {
          const msg =
            err?.error?.message ??
            err?.message ??
            (typeof err === 'string' ? err : 'Ocurrió un error al generar el consentimiento.');
          Swal.fire('Error', msg, 'error');
        }
      });
  }

  finalizar(item: any): void {
    const citaId = this.resolveCitaId(item);
    if (citaId === undefined || citaId === null || citaId === '') {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, 'No se encontro citaId para finalizar la cita.', 'warning');
      return;
    }

    this.loading = true;
    const citaIdEncoded = encodeURIComponent(btoa(String(citaId)));

    this.medicoServices.validHC(citaIdEncoded).subscribe({
      next: (res: any) => {
        if (res?.swEstadoPro === true) {
          Swal.fire('Error', res?.mensaje ?? 'La cita ya esta finalizada.', 'error');
          this.loading = false;
          return;
        }

        Swal.fire({
          title: 'Desea finalizar la cita?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Finalizar',
          cancelButtonText: 'Cancelar',
        }).then((result: any) => {
          const confirmed = result?.isConfirmed ?? result?.value;
          if (!confirmed) {
            this.loading = false;
            return;
          }

          // Facturacion (no bloqueante)
          this.medicoServices.facturarCitas(String(citaId)).subscribe({ next: () => {}, error: () => {} });

          this.medicoServices.finalizar(String(citaId)).subscribe({
            next: (resp: any) => {
              Swal.fire('Listo', resp?.mensaje ?? 'Cita finalizada.', 'success');
              this.consultarCitasGeneral();
            },
            error: (err: any) => {
              const msg =
                err?.error?.mensaje ??
                err?.message ??
                (typeof err === 'string' ? err : 'Error finalizando la cita.');
              Swal.fire('Error', msg, 'error');
              this.loading = false;
            },
            complete: () => {
              this.loading = false;
            }
          });
        });
      },
      error: (err: any) => {
        const msg =
          err?.error?.mensaje ??
          err?.message ??
          (typeof err === 'string' ? err : 'Error validando el estado de la cita.');
        Swal.fire('Error', msg, 'error');
        this.loading = false;
      }
    });
  }

  desactivarCita(item: any): void {
    const citaId = this.resolveCitaId(item);
    if (citaId === undefined || citaId === null || citaId === '') {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, 'No se encontró el id de la cita para desactivar.', 'warning');
      return;
    }

	    const loadingKey = this.getRowKey(item, 'desactivar');
	    if (hasLoadingKey(this.desactivarLoadingKeys, loadingKey)) return;

    Swal.fire({
      title: 'Esta seguro que desea desactivar la cita?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      const confirmed = result?.isConfirmed ?? result?.value;
      if (!confirmed) return;

	      this.loading = true;
	      setLoadingKey(this.desactivarLoadingKeys, loadingKey, true);
	      this.medicoServices
	        .desactivarCitasAnteriores(String(citaId))
	        .pipe(
	          timeout(TIMEOUT_DESACTIVAR_CITA_MS),
	          finalize(() => {
	            this.loading = false;
	            setLoadingKey(this.desactivarLoadingKeys, loadingKey, false);
	          })
	        )
        .subscribe({
        next: (resp: any) => {
          const normalized = String(resp ?? '')
            .trim()
            .replace(/^\"|\"$/g, '')
            .toLowerCase();

          const ok =
            normalized === '1' ||
            normalized.length === 0 ||
            normalized.includes('true') ||
            normalized.includes('ok') ||
            normalized.includes('success') ||
            normalized.includes('exito');

          // Si el HTTP fue 200, en la práctica ya se desactivó; evitar mensaje confuso al usuario.
          Swal.fire('Listo', 'Cita desactivada.', 'success');
          if (!ok) {
            // Solo para diagnóstico: el backend a veces responde textos no estándar.
            // eslint-disable-next-line no-console
            console.warn('[DesactivarCita] Respuesta inesperada:', resp);
          }

          // Solo quitar la fila seleccionada (evita que el refresh esconda todas las citas).
          this.quitarFilaContingencia(item);
        },
        error: (err: any) => {
          if (err?.name === 'TimeoutError') {
            Swal.fire('Tiempo de espera', 'El servicio no respondió a tiempo al desactivar la cita.', 'warning');
            return;
          }
          const msg =
            err?.error?.mensaje ??
            err?.message ??
            (typeof err === 'string' ? err : 'Error al desactivar la cita.');
          Swal.fire('Error', msg, 'error');
        }
      });
    });
  }

  llamarPaciente(identificacion: string, citaId: any): void {
    if (!identificacion) {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, 'No se encontro la identificacion del paciente.', 'warning');
      return;
    }

    const resolvedCitaId = this.resolveCitaId(citaId);
    if (resolvedCitaId === undefined || resolvedCitaId === null || resolvedCitaId === '') {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, 'No se encontro el id del turno/cita.', 'warning');
      return;
    }

    const everestId = toNumberOrNull(resolvedCitaId);
    if (everestId === null) {
      Swal.fire('Dato inválido', 'El id del turno/cita no es numérico.', 'warning');
      return;
    }

    const turnoKey = this.getRowKey({ identificacion, citaId: resolvedCitaId }, 'turno');
    if (hasLoadingKey(this.turnoLoadingKeys, turnoKey)) return;
    setLoadingKey(this.turnoLoadingKeys, turnoKey, true);
    this.llamadaService.loading = true;

    this.medicoServices
      .llamadoPaciente(String(identificacion), everestId, this.medicoServices.ticketId)
      .pipe(
        timeout(TIMEOUT_LLAMAR_TURNO_MS),
        finalize(() => {
          setLoadingKey(this.turnoLoadingKeys, turnoKey, false);
          this.llamadaService.loading = false;
        })
      )
      .subscribe({
      next: (res: any) => {
        if (res?.ticketId === 0) {
          Swal.fire('Informacion', res?.mensaje ?? 'No fue posible llamar al paciente.', 'info');
          return;
        }

        const seguirLlamando = res?.swSegirLlamando ?? res?.swSeguirLlamando;
        if (seguirLlamando) {
          Swal.fire('Llamado exitoso', 'Llamando al paciente...', 'success');
          this.medicoServices.ticketId = res.ticketId;
          this.medicoServices.ticketMensaje = res?.mensaje ?? '';
          this.consultarEstadoLlamado();
        } else {
          Swal.fire('Informacion', res?.mensaje ?? 'No se puede realizar el llamado.', 'info');
        }
      },
      error: (err: any) => {
        if (err?.name === 'TimeoutError') {
          Swal.fire('Tiempo de espera', 'Digiturno no respondió a tiempo al llamar el turno.', 'warning');
          return;
        }
        const msg =
          err?.error?.mensaje ??
          err?.message ??
          (typeof err === 'string' ? err : 'Error realizando el llamado.');
        Swal.fire('Error', msg, 'error');
      }
    });
  }

  abrirModal(item: any, template: any): void {
    // tu implementación existente
  }

  openZoom(link: string): void {
    if (!link) {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, SWAL_MSG_NO_HAY_LINK_ABRIR, 'info');
      return;
    }
    window.open(link, '_blank');
  }

  abrirZoom(link: string): void {
    if (!link) {
      Swal.fire(SWAL_TITULO_DATO_FALTANTE, SWAL_MSG_NO_HAY_LINK_ABRIR, 'info');
      return;
    }
    window.open(link, '_blank');
  }

  cerraModalLlamada(): void {
    // tu implementación existente
  }

  generarLink(): void {
    // tu implementación existente
  }

  // ── SIP / Llamadas ────────────────────────────────────────────────────────

  sipRegister(): void {
    // tu implementación existente
  }

  sipUnRegister(): void {
    // tu implementación existente
  }

  sipCall(type: string, number: string): void {
    // tu implementación existente
  }

  sipHangUp(): void {
    // tu implementación existente
  }

  sipToggleMute(mute: boolean): void {
    // tu implementación existente
  }

  
   
}
