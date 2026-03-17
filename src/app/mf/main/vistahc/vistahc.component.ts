import { Component, OnDestroy, OnInit } from '@angular/core';
import { VistahcService } from './vistahc.service';
import { MedicoService } from 'src/app/medico/medico.service';
import { Citas } from 'src/app/Modelos/Medico';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { finalize, switchMap, timeout } from 'rxjs';
import { resolveApiErrorMessage } from 'src/app/utils/api-error';
import { escapeHtml as escapeHtmlUtil } from 'src/app/utils/string';
import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service';
import { MessageService, ConfirmationService } from 'primeng/api';
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

  // ── Toast / Confirm helpers ───────────────────────────────────────────
  private toastError(titulo: string, msg: string): void {
    this.messageService.add({ severity: 'error', summary: titulo, detail: msg, life: 5000 });
  }
  private toastWarn(titulo: string, msg: string): void {
    this.messageService.add({ severity: 'warn', summary: titulo, detail: msg, life: 5000 });
  }
  private toastSuccess(titulo: string, msg: string): void {
    this.messageService.add({ severity: 'success', summary: titulo, detail: msg, life: 4000 });
  }
  private toastInfo(titulo: string, msg: string): void {
    this.messageService.add({ severity: 'info', summary: titulo, detail: msg, life: 4000 });
  }
toastWarnPublic(titulo: string, msg: string): void {
  this.messageService.add({ severity: 'warn', summary: titulo, detail: msg, life: 5000 });
}

  // ── PrimeNG paging sync ─────────────────────────────────────────────────────────
  onHcPage(event: any): void { this.syncPrimePage('hc', event); }
  onNotasPage(event: any): void { this.syncPrimePage('notas', event); }
  onOtrosPage(event: any): void { this.syncPrimePage('otros', event); }

  private busyLabel: string = 'Procesando...';

  get isBusy(): boolean {
    return !!(
      this.loading ||
      this.llamadaService?.loading
    );
  }

  get busyText(): string {
    if (this.loading) return this.busyLabel || 'Procesando...';
    if (this.llamadaService?.loading) return 'Llamando turno...';
    return 'Procesando...';
  }

  private syncPrimePage(kind: 'hc' | 'notas' | 'otros', event: any): void {
    const rows = Number(event?.rows ?? 0);
    const first = Number(event?.first ?? 0);
    if (!Number.isFinite(rows) || rows <= 0) return;
    const page = Math.floor(Math.max(0, first) / rows) + 1;
    if (kind === 'hc') { this.hcPageSize = rows; this.hcPage = page; }
    if (kind === 'notas') { this.notasPageSize = rows; this.notasPage = page; }
    if (kind === 'otros') { this.otrosPageSize = rows; this.otrosPage = page; }
  }

  // ── Acceso (icono + validaciones legacy) ────────────────────────────────────────
  private upper(value: any): string { return String(value ?? '').trim().toUpperCase(); }
  private getLinkVideoconsulta(item: any): string { return String(item?.linkVideoconsulta ?? '').trim(); }
  private hasLinkVideoconsulta(item: any): boolean { return this.getLinkVideoconsulta(item).length > 0; }

  getAccesoCase(item: any):
    'office' | 'lupa' | 'extramural' | 'video_modal' | 'video_zoom' | 'phone_modal' | 'none' {
    const agendaId = Number(item?.tipoAgendaAccesoId);
    const acceso = this.upper(item?.tipoAgendaAcceso);
    const modalidad = this.upper(item?.tipoModalidad);
    const modalidadId = toNumberOrNull(item?.tipoModalidadId);
    const hasLink = this.hasLinkVideoconsulta(item);

    if (agendaId === 11 || acceso === 'EXTRAMURAL') return 'extramural';

    if (agendaId === 1 || agendaId === 6) return 'office';
    if (acceso === 'PRESENCIAL' && agendaId !== 7) return 'office';
    if (agendaId === 7 && acceso === 'PRESENCIAL') return hasLink ? 'video_zoom' : 'lupa';

    // Reglas "legacy" basadas en tipoModalidadId (prioridad cuando viene del backend)
    if (agendaId === 7 && modalidadId !== null) {
      // TELEXPERTICIA Enfermera: lupa cuando NO hay link
      if (!hasLink && modalidadId === 1) return 'lupa';
      // TELEXPERTICIA Médico: video si hay link, si no -> teléfono (modal)
      if (hasLink && modalidadId !== 1) return 'video_zoom';
      if (!hasLink && modalidadId !== 1) return 'phone_modal';
    }

    if ((agendaId === 2 || agendaId === 4) && modalidadId !== null) {
      // Teleconsulta (sin link) por modalidad 2/4/10 -> teléfono
      if (!hasLink && (modalidadId === 2 || modalidadId === 4 || modalidadId === 10)) return 'phone_modal';
      // Con link por modalidad 2/4/7 -> video
      if (hasLink && (modalidadId === 2 || modalidadId === 4 || modalidadId === 7)) return 'video_zoom';
    }

    if (agendaId === 10 && modalidadId === 10 && !hasLink) return 'phone_modal';

    if (modalidad === 'TELEXPERTICIA' || acceso === 'TELEXPERTICIA') return hasLink ? 'video_zoom' : 'none';

    if ((agendaId === 2 || agendaId === 4) && acceso === 'VIDEOCONSULTA') return hasLink ? 'video_zoom' : 'video_modal';
    if ((agendaId === 2 || agendaId === 4) && (acceso === 'TELECONSULTA' || acceso === 'TELECONSULTA SEDE')) {
      return hasLink ? 'video_zoom' : 'phone_modal';
    }

    if (agendaId === 7 && acceso !== 'PRESENCIAL') return hasLink ? 'video_zoom' : 'phone_modal';

    // fallback por texto (cuando el id viene raro)
    if (acceso === 'VIDEOCONSULTA') return hasLink ? 'video_zoom' : 'video_modal';
    if (acceso.startsWith('TELECONSULTA')) return hasLink ? 'video_zoom' : 'phone_modal';

    return 'none';
  }

  getAccesoTitle(item: any): string {
    const acceso = this.getAccesoCase(item);
    if (acceso === 'office') return 'Presencial';
    if (acceso === 'lupa') return 'Presencial';
    if (acceso === 'extramural') return 'Extramural';
    if (acceso === 'video_modal') return 'Videoconsulta';
    if (acceso === 'phone_modal') return 'Teleconsulta';
    if (acceso === 'video_zoom') return 'Abrir enlace';
    return '—';
  }

  isAccesoDisabled(item: any): boolean {
    const acceso = this.getAccesoCase(item);
    if (acceso === 'none' || acceso === 'office' || acceso === 'lupa') return true;
    if (acceso === 'video_zoom' && !this.hasLinkVideoconsulta(item)) return true;
    return !!item?.disableButton;
  }

  onAccesoClick(item: any): void {
    const acceso = this.getAccesoCase(item);
    if (this.isAccesoDisabled(item)) return;
    if (acceso === 'video_zoom') { this.abrirZoom(this.getLinkVideoconsulta(item)); return; }
    if (acceso === 'video_modal' || acceso === 'phone_modal' || acceso === 'extramural') { this.abrirModal(item); }
  }
  // ── Modal Paciente ────────────────────────────────────────────────────
  modalPacienteVisible: boolean = false;
  modalPacienteDatos: any = null;
  modalPacienteContactos: string[] = [];
  modalPacienteItem: any = null;

  // ── Modal Histórico ───────────────────────────────────────────────────
  modalHistoricoVisible: boolean = false;
  modalHistoricoHtml: string = '';
  modalHistoricoCitas: any[] = [];  // ← agregar esta línea

  // ── Estado SIP ────────────────────────────────────────────────────────
  public llamadaService: any = { loading: false, estado: false };
  colgar: boolean = false;
  validadorMute: boolean = false;
  minuto: number = 0;
  segundos: number = 0;
  tiempo: any;
  telefonoData: string = '';
  videconsulta: boolean = false;
  observacion: any;
  datoUsuario: any;
  arrayContacto: Array<string> = [];

  // ── Resto propiedades ─────────────────────────────────────────────────
  public filtro = undefined;
  public loadingCI: boolean = false;
  private consentimientoLoadingKey: string | null = null;
  private turnoLoadingKeys = new Set<string>();
  private desactivarLoadingKeys = new Set<string>();
  private finalizarLoadingKeys = new Set<string>();
  citasAMostrar: any[] = [];
  private estadoLlamadoTimer: ReturnType<typeof setInterval> | null = null;

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

  loadingImpresion: boolean = false;
  identificacion!: string;
  tipo!: string;
  identificacionNoTemporal!: string;
  tipoNoTemporal!: string;
  especialidadNoTemporal?: string;
  SwBoton: boolean = false;
  PacienteIdInd: number = 0;
  link: string = '';
  fechahoy = new Date().toISOString().substring(0, ISO_DATE_ONLY_LENGTH);

  ref: any;
  citaId: string = '';

  private readonly baseDisplayedColumns: string[] = [
    'hora', 'paciente', 'acceso', 'turno', 'estado', 'historias', 'consentimientos'
  ];
  displayedColumnsCont: string[] = [
    'fecha', 'paciente', 'acceso', 'verificado', 'historias', 'acciones'
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
  especialidadTouched: boolean = false;

  constructor(
    public rs: VistahcService,
    public medicoServices: MedicoService,
    private cookieService: CookieService,
    public du: DatosPacienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.loginId = environment.production == false ? 'mediprueba' : this.cookieService.get('UsuarioMedico');
  }

  mfAssetUrl(path: string): string {
    const cleanPath = path.replace(/^\/+/, '');
    const publicPath = __webpack_require__?.p && __webpack_require__?.p.length ? __webpack_require__.p : '';
    const windowHref = typeof window !== 'undefined' ? window.location.href : '';
    const windowOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    let origin = windowOrigin;
    if (publicPath) {
      try { origin = new URL(publicPath, windowHref || 'http://localhost/').origin; } catch { origin = windowOrigin; }
    }
    if (!origin) return `/${cleanPath}`;
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
      this.normalizarTextoCitas(this.listado_citas as any);
      this.normalizarTextoCitas(this.listado_citas_recuperacion as any);
      this.normalizarTextoCitas(this.listado_contingencia as any);
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

  // ── Consultas ─────────────────────────────────────────────────────────

  consultarCitasGeneral(): void {
    if (this.filtro !== undefined && this.filtro !== null) {
      this.medicoServices.Especialidad = this.filtro;
    }
    this.consultarCitas();
    this.consultarCitasAnteriores();
  }

  public consultarCitasAnteriores(): void {
    if (this.filtro === undefined || this.filtro === null) return;
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
        this.otrosPage = 1;
      },
      () => { this.loadingOtrosTable = false; }
    );
  }

  public consultarCitas(): void {
    if (this.filtro === undefined || this.filtro === null) {
      this.especialidadTouched = true;
      this.toastWarn(SWAL_TITULO_ADVERTENCIA_DOBLE, SWAL_MSG_DEBE_SELECCIONAR_ESPECIALIDAD);
      return;
    }
    this.busyLabel = 'Cargando citas...';
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
          this.toastInfo('Sin citas', 'No hay citas asignadas para el día de hoy');
        }
        x.forEach(e => {
          e.disableButton = true;
          (e as any).contador = 0;
          e.tipoAgendaAcceso = e.tipoAgendaAcceso == null ? '' : (e.tipoAgendaAcceso as string).toUpperCase();
          if (e.estado === 'FAC') {
            e.disableButton = false;
          } else if (e.estado === 'ACT' && (e.tipoAgendaAccesoId === 2 || e.tipoAgendaAccesoId === 4)) {
            e.disableButton = false;
          }
        });
        this.medicoServices.listadoCitas = x;
        let citas = x.filter(n => !n.adicional);
        let recuperacion = x.filter(n => n.adicional);
        if (this.medicoServices.Especialidad.id === 139) {
          citas = x.filter(n => n.estado !== 'PRO');
          recuperacion = x.filter(n => n.estado !== 'PRO');
        }
        this.listado_citas = citas;
        this.listado_citas_recuperacion = recuperacion;
        this.listado_contingencia = x.filter(n => n.adicional);
        this.hcPage = 1;
        this.notasPage = 1;
        this.otrosPage = 1;
        if ((this.filtro as any)?.swControlaLlamadosSimultaneos) {
          this.consultarEstadoLlamado();
          this.iniciarEstadoLlamadoTimer();
        } else {
          this.detenerEstadoLlamadoTimer();
        }
      },
      () => {
        this.loading = false;
        this.loadingHcTable = false;
        this.loadingNotasTable = false;
        this.detenerEstadoLlamadoTimer();
        this.toastError('Error', SWAL_MSG_ERROR_CONSULTAR_CITA);
      }
    );
  }

  public consultarEspecialidad(): void {
    this.rs.ObtenerEspecialidad().subscribe((x) => {
      this.rs.listadoEspecialidad = x;
      const items = Array.isArray(x) ? x : [];
      if (items.length === 1) {
        this.medicoServices.consultaInmediata = true;
        this.filtro = items[0] as any;
        this.medicoServices.Especialidad = this.filtro;
      } else {
        this.medicoServices.consultaInmediata = false;
      }
    }, (error) => {
      const msg = resolveApiErrorMessage(error, 'Ocurrió un error');
      this.toastError('Advertencia', msg);
    });
  }

  // ── Paginación ────────────────────────────────────────────────────────

  totalPages(total: number, size: number): number {
    if (!total || size <= 0) return 1;
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
    if (table === 'hc' && this.hcPage > 1) this.hcPage--;
    else if (table === 'notas' && this.notasPage > 1) this.notasPage--;
    else if (table === 'otros' && this.otrosPage > 1) this.otrosPage--;
  }

  nextPage(table: 'hc' | 'notas' | 'otros'): void {
    const hcTotal = Array.isArray(this.listado_citas) ? this.listado_citas.length : 0;
    const notasTotal = Array.isArray(this.listado_citas_recuperacion) ? this.listado_citas_recuperacion.length : 0;
    const otrosTotal = Array.isArray(this.listado_contingencia) ? this.listado_contingencia.length : 0;
    if (table === 'hc' && this.hasNextPage(hcTotal, this.hcPage, this.hcPageSize)) this.hcPage++;
    else if (table === 'notas' && this.hasNextPage(notasTotal, this.notasPage, this.notasPageSize)) this.notasPage++;
    else if (table === 'otros' && this.hasNextPage(otrosTotal, this.otrosPage, this.otrosPageSize)) this.otrosPage++;
  }

  buildCounterText(total: number, page: number, size: number): string {
    if (!total) return 'Mostrando 0 de 0';
    const start = (page - 1) * size + 1;
    const end = Math.min(total, page * size);
    return `Mostrando ${start}-${end} de ${total}`;
  }

  mostrarHistoricoCitas(): boolean {
    return Number(this.filtro?.id) === 14;
  }

  // ── Timer estado llamado ──────────────────────────────────────────────

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
    if (!citasIds.length) return;
    this.medicoServices.obtenerEstadoLlamado(citasIds).subscribe({
      next: (response: any) => {
        const data = response?.data || response || [];
        if (!Array.isArray(data)) return;
        this.aplicarEstadoLlamado(this.listado_citas, data);
        this.aplicarEstadoLlamado(this.listado_citas_recuperacion, data);
      },
      error: () => { }
    });
  }

  private aplicarEstadoLlamado(listado: any[], data: any[]): void {
    if (!Array.isArray(listado)) return;
    listado.forEach((cita: any) => {
      const citaId = this.resolveCitaId(cita);
      if (citaId === null) return;
      const estado = data.find((d: any) => {
        const everestId = d?.everest_Id ?? d?.EverestId ?? d?.everestId ?? d?.Everest_Id;
        if (everestId === undefined || everestId === null || everestId === '') return false;
        return String(everestId) === String(citaId);
      });
      if (!estado) return;
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

  // ── Modal Paciente (p-dialog) ─────────────────────────────────────────

  abrirModal(item: any): void {
    if (!item) return;
    const pacienteId =
      item?.pacienteId ?? item?.paciente_Id ?? item?.PacienteId ?? item?.pacienteID ?? item?.idPaciente;
    if (pacienteId === undefined || pacienteId === null || pacienteId === '') {
      this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontró el paciente para abrir el modal.');
      return;
    }
    this.busyLabel = 'Cargando paciente...';
    this.loading = true;
    this.rs.ObtenerPacientePorId(pacienteId).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.datoUsuario = response;
        this.modalPacienteDatos = response;
        this.modalPacienteItem = item;
        this.arrayContacto = [];
        this.modalPacienteContactos = [];
        const telefono = String(response?.telefono ?? '').trim();
        const celular = String(response?.celular ?? '').trim();
        if (telefono && telefono.toUpperCase() !== 'NO') {
          this.arrayContacto.push(telefono);
          this.modalPacienteContactos.push(telefono);
        }
        if (celular && celular.toUpperCase() !== 'NO') {
          this.arrayContacto.push(celular);
          this.modalPacienteContactos.push(celular);
        }
        this.observacion = item?.observacion ?? '';
        this.videconsulta = String(item?.tipoAgendaAcceso ?? '').toUpperCase() === 'VIDEOCONSULTA';
        this.colgar = false;
        this.validadorMute = false;
        this.minuto = 0;
        this.segundos = 0;
        this.modalPacienteVisible = true;
      },
      error: () => {
        this.loading = false;
        this.toastError('Error', 'No se pudo cargar la información del paciente');
      }
    });
  }

  cerrarModalPaciente(): void {
    this.modalPacienteVisible = false;
    this.sipHangUp();
  }

  // ── Modal Histórico (p-dialog) ────────────────────────────────────────

  obtenerHistoricoAsistioCita(item: any): void {
  const pacienteId = item?.pacienteId ?? item?.paciente_Id ?? item?.PacienteId ?? item?.pacienteID ?? item?.idPaciente;
  if (pacienteId === undefined || pacienteId === null || pacienteId === '') {
    this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontró el paciente para consultar el histórico de citas.');
    return;
  }
  const especialidadId = Number(this.filtro?.id ?? 0);
  if (!especialidadId) {
    this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontró la especialidad para consultar el histórico de citas.');
    return;
  }
  this.busyLabel = 'Consultando histórico...';
  this.loading = true;
  this.medicoServices.obtenerHistoricoAsistioCita(especialidadId, Number(pacienteId), true).subscribe({
    next: (res: any[]) => {
      this.loading = false;
      this.modalHistoricoCitas = Array.isArray(res) ? res : [];
      if (this.modalHistoricoCitas.length < 1) {
        this.toastInfo('Información', 'El paciente no tiene citas anteriores');
        return;
      }
      this.modalHistoricoVisible = true;
    },
    error: (err: any) => {
      this.loading = false;
      const msg = err?.error?.mensaje ?? err?.error?.message ?? err?.message ?? 'Error consultando el histórico de citas.';
      this.toastError('Error', msg);
    }
  });
}

  private buildHistoricoHtml(citas: any[]): string {
    return buildHistoricoHtmlUtil(citas);
  }

  // ── Historia Clínica ──────────────────────────────────────────────────

  abrirHistoriaClinica(item: any): void {
    const link = item?.linkCompleto || item?.LinkCompleto;
    if (!link) {
      this.toastWarn('Error', 'No existe link para la Historia Clínica');
      return;
    }
    try {
      const url = new URL(link);
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    } catch {
      this.toastError('Error', 'El link de la Historia Clínica no es válido');
    }
  }

  // ── Finalizar cita ────────────────────────────────────────────────────

  finalizar(item: any): void {
    const citaId = this.resolveCitaId(item);
    if (citaId === undefined || citaId === null || citaId === '') {
      this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontro citaId para finalizar la cita.');
      return;
    }
    const loadingKey = this.getRowKey(item, 'finalizar');
    if (hasLoadingKey(this.finalizarLoadingKeys, loadingKey)) return;
    setLoadingKey(this.finalizarLoadingKeys, loadingKey, true);
    const citaIdEncoded = encodeURIComponent(btoa(String(citaId)));
    this.medicoServices.validHC(citaIdEncoded).subscribe({
      next: (res: any) => {
        if (res?.swEstadoPro === true) {
          this.toastError('Error', res?.mensaje ?? 'La cita ya esta finalizada.');
          setLoadingKey(this.finalizarLoadingKeys, loadingKey, false);
          return;
        }
        this.confirmationService.confirm({
          message: '¿Desea finalizar la cita?',
          header: 'Confirmar',
          icon: 'pi pi-question-circle',
          acceptLabel: 'Finalizar',
          rejectLabel: 'Cancelar',
          reject: () => { setLoadingKey(this.finalizarLoadingKeys, loadingKey, false); },
          accept: () => {
            this.medicoServices.facturarCitas(String(citaId)).subscribe({ next: () => { }, error: () => { } });
            this.medicoServices.finalizar(String(citaId))
              .pipe(finalize(() => { setLoadingKey(this.finalizarLoadingKeys, loadingKey, false); }))
              .subscribe({
                next: (resp: any) => {
                  this.toastSuccess('Listo', resp?.mensaje ?? 'Cita finalizada.');
                  this.quitarFilaLocal(item);
                },
                error: (err: any) => {
                  const msg = err?.error?.mensaje ?? err?.message ?? 'Error finalizando la cita.';
                  this.toastError('Error', msg);
                }
              });
          }
        });
      },
      error: (err: any) => {
        const msg = err?.error?.mensaje ?? err?.message ?? 'Error validando el estado de la cita.';
        this.toastError('Error', msg);
        setLoadingKey(this.finalizarLoadingKeys, loadingKey, false);
      }
    });
  }

  // ── Desactivar cita ───────────────────────────────────────────────────

  desactivarCita(item: any): void {
    const citaId = this.resolveCitaId(item);
    if (citaId === undefined || citaId === null || citaId === '') {
      this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontró el id de la cita para desactivar.');
      return;
    }
    const loadingKey = this.getRowKey(item, 'desactivar');
    if (hasLoadingKey(this.desactivarLoadingKeys, loadingKey)) return;

    this.confirmationService.confirm({
      message: '¿Está seguro que desea desactivar la cita?',
      header: 'Confirmar',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.busyLabel = 'Desactivando cita...';
        this.loading = true;
        setLoadingKey(this.desactivarLoadingKeys, loadingKey, true);
        this.medicoServices.desactivarCitasAnteriores(String(citaId))
          .pipe(
            timeout(TIMEOUT_DESACTIVAR_CITA_MS),
            finalize(() => {
              this.loading = false;
              setLoadingKey(this.desactivarLoadingKeys, loadingKey, false);
            })
          )
          .subscribe({
            next: () => {
              this.toastSuccess('Listo', 'Cita desactivada.');
              this.quitarFilaContingencia(item);
            },
            error: (err: any) => {
              if (err?.name === 'TimeoutError') {
                this.toastWarn('Tiempo de espera', 'El servicio no respondió a tiempo al desactivar la cita.');
                return;
              }
              const msg = err?.error?.mensaje ?? err?.message ?? 'Error al desactivar la cita.';
              this.toastError('Error', msg);
            }
          });
      }
    });
  }

  // ── Llamar paciente ───────────────────────────────────────────────────

  llamarPaciente(identificacion: string, citaId: any): void {
    if (!identificacion) {
      this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontro la identificacion del paciente.');
      return;
    }
    const resolvedCitaId = this.resolveCitaId(citaId);
    if (resolvedCitaId === undefined || resolvedCitaId === null || resolvedCitaId === '') {
      this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontro el id del turno/cita.');
      return;
    }
    const everestId = toNumberOrNull(resolvedCitaId);
    if (everestId === null) {
      this.toastWarn('Dato inválido', 'El id del turno/cita no es numérico.');
      return;
    }
    const turnoKey = this.getRowKey({ identificacion, citaId: resolvedCitaId }, 'turno');
    if (hasLoadingKey(this.turnoLoadingKeys, turnoKey)) return;
    setLoadingKey(this.turnoLoadingKeys, turnoKey, true);
    this.llamadaService.loading = true;
    this.medicoServices.llamadoPaciente(String(identificacion), everestId, this.medicoServices.ticketId)
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
            this.toastInfo('Información', res?.mensaje ?? 'No fue posible llamar al paciente.');
            return;
          }
          const seguirLlamando = res?.swSegirLlamando ?? res?.swSeguirLlamando;
          if (seguirLlamando) {
            this.toastSuccess('Llamado exitoso', 'Llamando al paciente...');
            this.medicoServices.ticketId = res.ticketId;
            this.medicoServices.ticketMensaje = res?.mensaje ?? '';
            this.consultarEstadoLlamado();
          } else {
            this.toastInfo('Información', res?.mensaje ?? 'No se puede realizar el llamado.');
          }
        },
        error: (err: any) => {
          if (err?.name === 'TimeoutError') {
            this.toastWarn('Tiempo de espera', 'Digiturno no respondió a tiempo al llamar el turno.');
            return;
          }
          const msg = err?.error?.mensaje ?? err?.message ?? 'Error realizando el llamado.';
          this.toastError('Error', msg);
        }
      });
  }

  // ── Consentimientos ───────────────────────────────────────────────────

  private getConsentimientoKey(row: any): string {
    const citaId = this.resolveCitaId(row);
    const pacienteId = row?.pacienteId ?? row?.paciente_Id ?? row?.PacienteId ?? row?.pacienteID ?? row?.idPaciente;
    if (citaId !== undefined && citaId !== null && String(citaId).length) return `cita:${String(citaId)}`;
    if (pacienteId !== undefined && pacienteId !== null && String(pacienteId).length) return `paciente:${String(pacienteId)}`;
    return `row:${JSON.stringify(row ?? {})}`;
  }

  isConsentimientoLoading(row: any): boolean {
    return this.consentimientoLoadingKey === this.getConsentimientoKey(row);
  }

  irAci(row: any): void {
    const pacienteId = row?.pacienteId ?? row?.paciente_Id ?? row?.PacienteId ?? row?.pacienteID ?? row?.idPaciente;
    if (pacienteId === undefined || pacienteId === null || pacienteId === '') {
      this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontró el `pacienteId` para abrir Consentimientos.');
      return;
    }
    const key = this.getConsentimientoKey(row);
    if (this.consentimientoLoadingKey === key) return;
    this.loadingCI = true;
    this.consentimientoLoadingKey = key;
    this.rs.ObtenerPacientePorId(pacienteId)
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
            this.toastError('Error', 'No se recibió `idDocumento` al generar el consentimiento.');
            return;
          }
          const base = (environment as any).vistaCI ?? '';
          const baseNormalized = String(base).replace(/\/+$/, '');
          const docNormalized = String(docId).startsWith('/') ? String(docId) : `/${docId}`;
          const popup = window.open(`${baseNormalized}${docNormalized}`, '_blank');
          if (!popup) {
            this.toastInfo('Ventana bloqueada', 'Tu navegador bloqueó la pestaña. Permite ventanas emergentes para abrir el consentimiento.');
          }
        },
        error: (err: any) => {
          const msg = err?.error?.message ?? err?.message ?? 'Ocurrió un error al generar el consentimiento.';
          this.toastError('Error', msg);
        }
      });
  }

  // ── SIP / Llamadas ────────────────────────────────────────────────────

  sipRegister(): void { this.llamadaService.estado = true; }
  sipUnRegister(): void { this.llamadaService.estado = false; }

  sipCall(type: string, number: string): void {
    void type;
    const tel = String(number ?? '').trim();
    if (!tel || tel.toUpperCase() === 'NO') return;
    if (!this.llamadaService?.estado) {
      this.toastWarn('Anuncio', 'Por favor activar para realizar llamadas');
      return;
    }
    this.telefonoData = tel;
    this.colgar = true;
    this.startCallTimer();
    try { window.open(`tel:${encodeURIComponent(tel)}`); } catch { }
  }

  sipHangUp(): void {
    if (!this.colgar) return;
    this.colgar = false;
    this.stopCallTimer();
    this.toastSuccess('Anuncio', 'Llamada finalizada');
  }

  sipToggleMute(mute: boolean): void {
    this.validadorMute = !!mute;
  }

  private startCallTimer(): void {
    this.stopCallTimer();
    this.tiempo = setInterval(() => {
      this.segundos += 1;
      if (this.segundos >= 60) { this.segundos = 0; this.minuto += 1; if (this.minuto >= 60) this.minuto = 0; }
    }, 1000);
  }

  private stopCallTimer(): void {
    if (this.tiempo) { clearInterval(this.tiempo); this.tiempo = null; }
    this.minuto = 0;
    this.segundos = 0;
  }

  // ── Zoom / Links ──────────────────────────────────────────────────────

  abrirZoom(link: string): void {
    if (!link) { this.toastInfo(SWAL_TITULO_DATO_FALTANTE, SWAL_MSG_NO_HAY_LINK_ABRIR); return; }
    window.open(link, '_blank');
  }

  generarLink(item?: any): void {
    const citaId = item ? this.resolveCitaId(item) : null;
    if (citaId === undefined || citaId === null || citaId === '') {
      this.toastWarn(SWAL_TITULO_DATO_FALTANTE, 'No se encontró citaId para generar el link.');
      return;
    }
    this.busyLabel = 'Generando enlace...';
    this.loading = true;
    this.medicoServices.consultarLink(String(citaId))
      .pipe(timeout(15000), finalize(() => { this.loading = false; }))
      .subscribe({
        next: (url: any) => {
          const value = String(url ?? '').trim();
          if (!value) { this.toastInfo('Sin respuesta', 'No se recibió un link para abrir.'); return; }
          window.open(value, '_blank');
        },
        error: (err: any) => {
          const msg = err?.error?.mensaje ?? err?.message ?? 'Error al generar el link.';
          this.toastError('Error', msg);
        }
      });
  }

  cerraModalLlamada(): void {
    try { this.ref?.close?.(); } catch { }
    this.sipHangUp();
    this.sipUnRegister();
  }

  // ── Helpers ───────────────────────────────────────────────────────────

  resolveCitaId(rowOrId: any): string | number | null {
    return resolveCitaIdUtil(rowOrId);
  }

  private getRowKey(row: any, prefix: 'turno' | 'desactivar' | 'finalizar'): string | null {
    const citaId = this.resolveCitaId(row);
    if (citaId !== null) return `${prefix}:cita:${String(citaId)}`;
    if (row?.identificacion) return `${prefix}:ident:${String(row.identificacion)}`;
    return null;
  }

  isTurnoLoading(row: any): boolean {
    return hasLoadingKey(this.turnoLoadingKeys, this.getRowKey(row, 'turno'));
  }

  isDesactivarLoading(row: any): boolean {
    return hasLoadingKey(this.desactivarLoadingKeys, this.getRowKey(row, 'desactivar'));
  }

  isFinalizarLoading(row: any): boolean {
    return hasLoadingKey(this.finalizarLoadingKeys, this.getRowKey(row, 'finalizar'));
  }

  private quitarFilaLocal(item: any): void {
    this.quitarFilaEnListado('listado_contingencia', 'otrosPage', 'otrosPageSize', item);
    this.quitarFilaEnListado('listado_citas_recuperacion', 'notasPage', 'notasPageSize', item);
    this.quitarFilaEnListado('listado_citas', 'hcPage', 'hcPageSize', item);
  }

  private quitarFilaEnListado(
    listadoKey: 'listado_citas' | 'listado_citas_recuperacion' | 'listado_contingencia',
    pageKey: 'hcPage' | 'notasPage' | 'otrosPage',
    sizeKey: 'hcPageSize' | 'notasPageSize' | 'otrosPageSize',
    item: any
  ): void {
    const citaId = this.resolveCitaId(item);
    if (citaId === null) return;

    const actual = Array.isArray((this as any)[listadoKey]) ? (this as any)[listadoKey] : [];
    const filtered = actual.filter((row: any) => String(this.resolveCitaId(row)) !== String(citaId));
    (this as any)[listadoKey] = filtered;

    const pageSize = Number((this as any)[sizeKey] ?? DEFAULT_TABLE_PAGE_SIZE);
    const maxPage = this.totalPages(filtered.length, pageSize);
    if (Number((this as any)[pageKey] ?? 1) > maxPage) (this as any)[pageKey] = maxPage;
  }

  private quitarFilaContingencia(item: any): void {
    const citaId = this.resolveCitaId(item);
    if (citaId === null) return;
    const actual = Array.isArray(this.listado_contingencia) ? this.listado_contingencia : [];
    const filtered = actual.filter((row: any) => String(this.resolveCitaId(row)) !== String(citaId));
    this.listado_contingencia = filtered;
    const maxPage = this.totalPages(filtered.length, this.otrosPageSize);
    if (this.otrosPage > maxPage) this.otrosPage = maxPage;
  }

  private maybeFixMojibake(value: any): string { return maybeFixMojibakeUtil(value); }

  private normalizarTextoCitas(list: any[]): void {
    if (!Array.isArray(list)) return;
    list.forEach((e: any) => {
      if (e?.nombrePaciente) e.nombrePaciente = this.maybeFixMojibake(e.nombrePaciente);
      if (e?.tipoAgendaAcceso) e.tipoAgendaAcceso = this.maybeFixMojibake(e.tipoAgendaAcceso);
    });
  }

  private escapeHtml(value: string): string { return escapeHtmlUtil(value); }

  irA(item: any, tipo: string): void { }

  getAccessClass(item: any): string {
    if (item.tipoAgendaAcceso === 'VIDEOCONSULTA') return 'mod-video';
    if (item.tipoAgendaAcceso === 'PRESENCIAL') return 'mod-presencial';
    if (item.tipoAgendaAcceso === 'TELECONSULTA') return 'mod-tele';
    if (item.tipoModalidad === 'TELEXPERTICIA') return 'mod-telexp';
    return '';
  }

  isAccessDisabled(item: any): boolean { return item.disableButton || item.tipoAgendaAccesoId === 1; }

  getAccessTitle(item: any): string {
    if (item.tipoAgendaAccesoId === 1) return 'No disponible';
    if (item.tipoAgendaAccesoId === 11) return 'Extramural';
    if (item.tipoModalidad === 'TELEXPERTICIA') return 'Telexperticia';
    return item.linkVideoconsulta ? 'Abrir Zoom' : 'Iniciar';
  }

  handleAccessClick(item: any): void {
    if (item.tipoAgendaAccesoId === 2 || item.tipoAgendaAccesoId === 4 || item.tipoModalidad === 'TELEXPERTICIA') {
      item.linkVideoconsulta ? this.abrirZoom(item.linkVideoconsulta) : this.abrirModal(item);
    }
  }
}
