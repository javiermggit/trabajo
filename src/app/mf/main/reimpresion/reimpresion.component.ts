import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReimpresionService } from './reimpresion.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Reimpresion } from 'src/app/Modelos/Reimpresion';
import { NotaAdministrativaService } from 'src/app/nota-administrativa/nota-administrativa.service';
import { EnviarPlantillaCorreo } from 'src/app/Modelos/whatsapp';
import { environment } from 'src/environments/environment';
import { catchError, debounceTime, distinctUntilChanged, finalize, firstValueFrom, map, of, Subject, switchMap, takeUntil, timeout } from 'rxjs';
import { MedicoService } from 'src/app/medico/medico.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { resolveApiErrorMessage } from 'src/app/utils/api-error';
import { normalizeText } from 'src/app/utils/string';
import {
  DEFAULT_TABLE_PAGE_SIZE,
  ISO_DATE_ONLY_LENGTH,
  MAX_PROFESIONALES_VISIBLE,
  PROFESIONAL_SEARCH_DEBOUNCE_MS,
  PROFESIONAL_SEARCH_MIN_LENGTH,
  TIMEOUT_PROFESIONALES_MS,
  TIPO_DOCUMENTO_DEFAULT_RETRY_DELAY_MS,
  TIPO_DOCUMENTO_DEFAULT_RETRY_MAX
} from 'src/app/utils/constants';
import { sanitizarTerminoProfesional as sanitizarTerminoProfesionalUtil } from 'src/app/utils/sanitize';
import { buildHistoriaClinicaCorreoHtml } from 'src/app/utils/correo-hc';
import { buildMensajeEnvioHistoriaClinica } from 'src/app/utils/mensaje-envio';
import {
  SWAL_MSG_ERROR_500,
  SWAL_MSG_HC_NO_EXISTE,
  SWAL_MSG_NO_PDF,
  SWAL_MSG_NO_REGISTROS_CONSULTA,
  SWAL_MSG_NO_REGISTROS_PACIENTE,
  SWAL_MSG_PRIMERO_CONSULTAR_PACIENTE,
  SWAL_MSG_RECURSO_NO_EXISTE,
  SWAL_TITULO_ADVERTENCIA,
  SWAL_TITULO_ERROR,
  SWAL_TITULO_ERROR_SERVIDOR,
  SWAL_TITULO_NO_ENCONTRADO,
  SWAL_TITULO_SIN_DATOS
} from 'src/app/utils/swal-messages';

@Component({
  selector: 'app-reimpresion',
  templateUrl: './reimpresion.component.html',
  styleUrls: ['./reimpresion.component.css']
})
export class ReimpresionComponent implements OnInit, OnDestroy {
  @ViewChild('fechaRangoCalendar') fechaRangoCalendar: any;
  @ViewChild('profesionalDropdown') profesionalDropdown: any;

  // ── Modal: Tipo de impresión ──────────────────────────────────────────
  modalImpresionVisible: boolean = false;
  modalImpresionTipo: 'full' | 'lite' = 'full';
  modalImpresionError: string = '';
  private modalImpresionRow: Reimpresion | null = null;

  // ── Modal: Flujo envío ────────────────────────────────────────────────
  modalEnvioTipoVisible: boolean = false;
  modalEnvioTipo: 'full' | 'lite' = 'full';
  modalEnvioTipoError: string = '';

  modalEnvioCanalVisible: boolean = false;
  modalEnvioCanal: 'correo' | 'whatsapp' = 'correo';
  modalEnvioCanalError: string = '';

  modalEnvioDestinoVisible: boolean = false;
  modalEnvioDestino: string = '';
  modalEnvioDestinoError: string = '';

  // fila guardada durante todo el flujo de envío
  private _envioRow: Reimpresion | null = null;
  private _envioTipo: 'full' | 'lite' = 'full';
  private _envioCanal: 'correo' | 'whatsapp' = 'correo';

  // ── Propiedades existentes ────────────────────────────────────────────
  private readonly profesionalFallbackValue = '__medico_prueba__';
  private readonly profesionalFallbackLabel = 'Medico Prueba';
  private readonly profesionalesInicial = 40;
  private readonly profesionalesMaxApi = 50;
  private profesionalLogueadoOption: { label: string; value: string } | null = null;
  private readonly profesionalTermino$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();
  private profesionalSearchActivo: boolean = false;
  private profesionalDropdownAbierto: boolean = false;

  filtersFormGroup = new FormGroup({
    dateRangeControl: new FormControl<Date[] | null>(null),
  });

  loadingReimpresion: boolean = false;
  loadingImpresion: boolean = false;
  identificacion!: string;
  tipo!: string;
  especialidad?: string;
  identificacionNoTemporal!: string;
  tipoNoTemporal!: string;
  especialidadNoTemporal?: string;
  SwBoton: boolean = false;
  PacienteIdInd: number = 0;
  link: string = '';
  fechahoy = new Date().toISOString().substring(0, ISO_DATE_ONLY_LENGTH);

  // datos filtrados (sin Angular Material)
  hcRows: Reimpresion[] = [];
  notasRows: any[] = [];
  otrosRows: any[] = [];

  // datos paginados (para pintar en p-table sin recalcular en template)
  hcRowsPage: Reimpresion[] = [];
  notasRowsPage: any[] = [];
  otrosRowsPage: any[] = [];

  displayedColumns: string[] = ['medico', 'fecha', 'especialidad', 'link'];
  displayedColumnsHc: string[] = ['paciente', 'identificacion', 'rutaAccesoPdf'];

  hcDataOriginal: Reimpresion[] = [];
  notasDataOriginal: any[] = [];
  otrosDataOriginal: any[] = [];

  loadingProfesionales: boolean = false;
  private catalogoProfesionalesOptions: Array<{ label: string; value: string }> = [];
  private profesionalesAllOptions: Array<{ label: string; value: string }> = [];
  profesionalesVisibleLimit: number = this.profesionalesInicial;
  profesionalFilterValue: string = '';
  profesionalesOptions: Array<{ label: string; value: string }> = [];
  filtroProfesional: string | null = null;
  filtroFechaRango: Date[] | null = null;

  loadingHcTable: boolean = false;
  loadingNotasTable: boolean = false;
  loadingOtrosTable: boolean = false;
  loadingEnvio: boolean = false;
  errorHcTable: string = '';
  errorNotasTable: string = '';
  errorOtrosTable: string = '';

  get isBlockingBusy(): boolean {
    return !!(this.loadingEnvio || this.loadingImpresion);
  }

  get blockingOverlayText(): string {
    if (this.loadingEnvio) return 'Enviando, por favor espere...';
    if (this.loadingImpresion) return 'Generando documento, por favor espere...';
    return 'Procesando...';
  }

  hcPage: number = 1;
  notasPage: number = 1;
  otrosPage: number = 1;
  hcPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
  notasPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
  otrosPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
  idcliente: string;

  constructor(
    public rs: ReimpresionService,
    public nota: NotaAdministrativaService,
    public medicoServices: MedicoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.idcliente = environment.numeroCliente;
  }

  ngOnInit(): void {
    this.setProfesionalFallback();
    this.configurarAutocompleteProfesionales();
    this.consultarprofesionales();
    this.rs.ObtenerListadoTipoDocumento();
    this.inicializarTipoDocumentoPorDefecto();
    this.consultarEspecialidad();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.profesionalTermino$.complete();
  }

  // ── Helpers toast ─────────────────────────────────────────────────────

  private toastError(titulo: string, mensaje: string): void {
    this.messageService.add({ severity: 'error', summary: titulo, detail: mensaje, life: 5000 });
  }

  private toastWarn(titulo: string, mensaje: string): void {
    this.messageService.add({ severity: 'warn', summary: titulo, detail: mensaje, life: 5000 });
  }

  private toastSuccess(titulo: string, mensaje: string): void {
    this.messageService.add({ severity: 'success', summary: titulo, detail: mensaje, life: 4000 });
  }

  private toastInfo(titulo: string, mensaje: string): void {
    this.messageService.add({ severity: 'info', summary: titulo, detail: mensaje, life: 4000 });
  }

  // ── Modal Tipo Impresión ──────────────────────────────────────────────

  seleccionarTipoImpresion(row: Reimpresion): void {
    this.modalImpresionRow = row;
    this.modalImpresionTipo = 'full';
    this.modalImpresionError = '';
    this.modalImpresionVisible = true;
  }

  onCerrarModalImpresion(): void {
    this.modalImpresionVisible = false;
    this.modalImpresionRow = null;
    this.modalImpresionError = '';
  }

  onConfirmarImpresion(): void {
    if (!this.modalImpresionTipo) {
      this.modalImpresionError = 'Debes seleccionar una opción';
      return;
    }
    const row = this.modalImpresionRow;
    this.modalImpresionVisible = false;
    this.modalImpresionRow = null;
    this.modalImpresionError = '';
    if (row) {
      this.imprimirHistoriaClinicaPDF(row);
    }
  }

  // ── Modal Envío – Paso 1: Tipo HC ─────────────────────────────────────

  abrirModalEnvio(row: Reimpresion): void {
    this._envioRow = row;
    this._envioTipo = 'full';
    this._envioCanal = 'correo';
    this.modalEnvioTipo = 'full';
    this.modalEnvioTipoError = '';
    this.modalEnvioTipoVisible = true;
  }

  onCerrarModalEnvioTipo(): void {
    this._envioRow = null;
    this.modalEnvioTipoVisible = false;
    this.modalEnvioTipoError = '';
  }

 onConfirmarEnvioTipo(): void {
  if (!this.modalEnvioTipo) {
    this.modalEnvioTipoError = 'Debes seleccionar una opción';
    return;
  }
  this._envioTipo = this.modalEnvioTipo;
  this.modalEnvioTipoVisible = false;
  this.modalEnvioTipoError = '';
  setTimeout(() => {
    this.modalEnvioCanal = 'correo';
    this.modalEnvioCanalError = '';
    this.modalEnvioCanalVisible = true;
  }, 150);
}

  // ── Modal Envío – Paso 2: Canal ───────────────────────────────────────

  onCerrarModalEnvioCanal(): void {
    this._envioRow = null;
    this.modalEnvioCanalVisible = false;
    this.modalEnvioCanalError = '';
  }

 onConfirmarEnvioCanal(): void {
  if (!this.modalEnvioCanal) {
    this.modalEnvioCanalError = 'Debes seleccionar una opción';
    return;
  }
  this._envioCanal = this.modalEnvioCanal;
  this.modalEnvioCanalVisible = false;
  this.modalEnvioCanalError = '';
  setTimeout(() => {
    this.modalEnvioDestino = '';
    this.modalEnvioDestinoError = '';
    this.modalEnvioDestinoVisible = true;
  }, 150);
}

  // ── Modal Envío – Paso 3: Destino ─────────────────────────────────────

  onCerrarModalEnvioDestino(): void {
    this._envioRow = null;
    this.modalEnvioDestinoVisible = false;
    this.modalEnvioDestinoError = '';
    this.modalEnvioDestino = '';
  }

  onConfirmarEnvioDestino(): void {
    const destino = (this.modalEnvioDestino ?? '').trim();

    if (!destino) {
      this.modalEnvioDestinoError = 'Este campo es obligatorio';
      return;
    }

    if (this._envioCanal === 'correo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(destino)) {
        this.modalEnvioDestinoError = 'Correo inválido';
        return;
      }
    } else {
      const phoneRegex = /^\+?\d{8,15}$/;
      if (!phoneRegex.test(destino)) {
        this.modalEnvioDestinoError = 'Número inválido. Usa formato +573001112233';
        return;
      }
    }

    // capturar todo de las variables privadas que nunca se tocan por onHide
    const row = this._envioRow;
    const tipo = this._envioTipo;
    const canal = this._envioCanal;

    // cerrar modal
    this.modalEnvioDestinoVisible = false;
    this.modalEnvioDestinoError = '';
    this.modalEnvioDestino = '';
    this._envioRow = null;

    if (row) {
      this.enviarHistoriaSeleccionada(row, tipo, canal, destino)
        .then(() => {})
        .catch(() => {});
    }
  }

  // ── Lógica existente ──────────────────────────────────────────────────

  ajustarPanelDropdown(inputId: string): void {
    try {
      const doc = this.document as Document;
      const triggerNode = doc?.getElementById(inputId) as HTMLElement | null;
      const triggerEl = (triggerNode?.closest?.('.p-dropdown, .p-autocomplete') as HTMLElement | null) ?? triggerNode;
      if (!triggerEl) return;
      const panels = Array.from(doc.querySelectorAll('.reimp-dropdown-panel')) as HTMLElement[];
      const panel = panels[panels.length - 1];
      if (!panel) return;
      const rect = triggerEl.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const gutter = 12;
      const width = Math.min(Math.max(rect.width, 260), viewportW - gutter * 2);
      const left = Math.min(Math.max(rect.left, gutter), viewportW - width - gutter);
      const top = rect.bottom + 4;
      panel.style.width = `${width}px`;
      panel.style.maxWidth = `${viewportW - gutter * 2}px`;
      panel.style.left = `${left + window.scrollX}px`;
      panel.style.right = 'auto';
      panel.style.top = `${top + window.scrollY}px`;
      panel.style.bottom = 'auto';
      const headerReserve = panel.querySelector('.p-dropdown-header') ? 62 : 18;
      const availableBelow = viewportH - rect.bottom - gutter;
      const wrapperMax = Math.max(80, Math.min(260, availableBelow - headerReserve));
      const wrapper =
        (panel.querySelector('.p-dropdown-items-wrapper') as HTMLElement | null)
        ?? (panel.querySelector('.p-autocomplete-items-wrapper') as HTMLElement | null);
      if (wrapper) wrapper.style.maxHeight = `${wrapperMax}px`;
    } catch { }
  }

  private configurarAutocompleteProfesionales(): void {
    this.profesionalTermino$
      .pipe(
        debounceTime(PROFESIONAL_SEARCH_DEBOUNCE_MS),
        distinctUntilChanged(),
        switchMap((termino) => {
          const clean = String(termino ?? '').trim();
          if (clean.length < PROFESIONAL_SEARCH_MIN_LENGTH) return of([]);
          this.loadingProfesionales = true;
          return this.rs.ObtenerProfesionalesPorTermino(clean).pipe(
            timeout({ first: TIMEOUT_PROFESIONALES_MS }),
            catchError(() => of([])),
            finalize(() => { this.loadingProfesionales = false; })
          );
        }),
        map((listado: any[]) => this.mapProfesionalesToOptions(listado)),
        takeUntil(this.destroy$)
      )
      .subscribe((options) => {
        this.catalogoProfesionalesOptions = options;
        this.construirOpcionesProfesionales();
        if (this.profesionalDropdownAbierto && (this.profesionalFilterValue?.length ?? 0) >= 3) {
          setTimeout(() => {
            try {
              this.profesionalDropdown?.show?.();
              this.profesionalDropdown?.focusFilter?.();
              this.ajustarPanelDropdown('filtroMedico');
            } catch { }
          }, 0);
        }
      });
  }

  private sanitizarTerminoProfesional(value: string): string {
    return sanitizarTerminoProfesionalUtil(value);
  }

  private mapProfesionalesToOptions(listado: any[]): Array<{ label: string; value: string }> {
    const out: Array<{ label: string; value: string }> = [];
    const seen = new Set<string>();
    for (const item of (listado ?? [])) {
      const nombres = String(item?.nombres ?? item?.Nombres ?? item?.nombre ?? item?.Nombre ?? '').trim();
      const apellidos = String(item?.apellidos ?? item?.Apellidos ?? '').trim();
      const rawLabel = String(
        `${nombres} ${apellidos}`.replace(/\s+/g, ' ').trim()
        || item?.nombreCompleto || item?.NombreCompleto
        || item?.descripcion || item?.Descripcion || ''
      ).trim();
      if (!rawLabel) continue;
      const key = this.normalizarTexto(rawLabel);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push({ label: rawLabel, value: rawLabel });
      if (out.length >= this.profesionalesMaxApi) break;
    }
    return out;
  }

  consultarDatoGenerales(): void {
    if (this.tipo != undefined && this.identificacion != '' && this.identificacion != undefined) {
      this.limpiarDataSources();
      this.identificacionNoTemporal = this.identificacion;
      this.tipoNoTemporal = this.tipo;
      this.especialidadNoTemporal = this.especialidad;
      this.consultarDatos();
      this.consultarPaciente();
      this.consultarHCIntegra();
    } else {
      this.limpiarDataSources();
      this.identificacionNoTemporal = '';
      this.tipoNoTemporal = '';
      this.especialidadNoTemporal = '';
      this.toastWarn('Advertencia', 'Faltan campos por digitar');
    }
  }

  private limpiarDataSources(): void {
    this.rs.reimpresion = [];
    this.hcDataOriginal = [];
    this.hcRows = [];
    this.hcRowsPage = [];
    this.filtroFechaRango = null;
    this.rs.listadonotas = [];
    this.notasDataOriginal = [];
    this.notasRows = [];
    this.notasRowsPage = [];
    this.rs.listadoHcIntegra = [];
    this.otrosDataOriginal = [];
    this.otrosRows = [];
    this.otrosRowsPage = [];
    this.errorHcTable = '';
    this.errorNotasTable = '';
    this.errorOtrosTable = '';
    this.loadingHcTable = false;
    this.loadingNotasTable = false;
    this.loadingOtrosTable = false;
    this.hcPage = 1;
    this.notasPage = 1;
    this.otrosPage = 1;
  }

  public consultarDatos(): void {
    this.loadingReimpresion = true;
    this.loadingHcTable = true;
    this.errorHcTable = '';
    this.SwBoton = false;
    this.rs.ObtenerConsulta(this.identificacion, this.tipo, this.especialidad).subscribe((x) => {
      this.rs.reimpresion = x;
      if (x.length > 0) {
        this.SwBoton = true;
        this.PacienteIdInd = x[0].pacienteId;
      }
      this.hcDataOriginal = [...this.rs.reimpresion];
      this.construirOpcionesProfesionales();
      this.aplicarFiltrosLocalesHC();
      this.hcPage = 1;
      this.loadingReimpresion = false;
      this.loadingHcTable = false;
    }, (error) => {
      this.rs.reimpresion = new Array<Reimpresion>();
      this.hcRows = [];
      this.hcRowsPage = [];
      this.hcDataOriginal = [];
      this.filtroProfesional = null;
      this.construirOpcionesProfesionales();
      this.loadingReimpresion = false;
      const msg = resolveApiErrorMessage(error, 'Error al consultar historias clínicas');
      this.errorHcTable = msg;
      this.toastWarn('Advertencia', msg);
      this.loadingHcTable = false;
    });
  }

  public consultarPaciente(): void {
    this.nota.ObtenerDatosPaciente(this.identificacion, this.tipo).subscribe(x => {
      this.rs.datoPaciente = x;
      if (!x) {
        this.rs.listadonotas = [];
        this.notasRows = [];
        this.notasRowsPage = [];
        this.loadingNotasTable = false;
        this.rs.listadoHcIntegra = [];
        this.otrosRows = [];
        this.otrosRowsPage = [];
        this.loadingOtrosTable = false;
        return;
      }
      this.consultarNotaAdministrativas(x.id);
    }, () => {
      this.loadingNotasTable = false;
      this.errorNotasTable = 'Error al consultar notas administrativas';
      this.rs.listadonotas = new Array<any>();
      this.notasRows = [];
      this.notasRowsPage = [];
    });
  }

  public consultarNotaAdministrativas(idpaciente: string): void {
    this.loadingNotasTable = true;
    this.errorNotasTable = '';
    this.rs.ObtenerConsultaNotasAdministrativas(idpaciente).subscribe((x) => {
      x.forEach(e => { this.nota.obtenerNombreMedico(e.usuarioCreacion, e); });
      this.rs.listadonotas = x;
      this.notasDataOriginal = [...this.rs.listadonotas];
      this.construirOpcionesProfesionales();
      this.aplicarFiltrosLocalesHC();
      this.notasPage = 1;
      this.loadingNotasTable = false;
    }, () => {
      this.rs.listadonotas = new Array<any>();
      this.notasDataOriginal = [];
      this.notasRows = [];
      this.notasRowsPage = [];
      this.construirOpcionesProfesionales();
      this.aplicarFiltrosLocalesHC();
      this.loadingNotasTable = false;
      this.errorNotasTable = 'Error al consultar notas administrativas';
    });
  }

  public consultarHCIntegra(): void {
    this.loadingOtrosTable = true;
    this.errorOtrosTable = '';
    this.nota.ObtenerDatosPaciente(this.identificacion, this.tipo).subscribe(x => {
      this.rs.datoPaciente = x;
      if (!x) {
        this.rs.listadoHcIntegra = [];
        this.otrosRows = [];
        this.otrosRowsPage = [];
        this.loadingOtrosTable = false;
        return;
      }
      this.rs.ObtenerHcIntegra(x.id).subscribe((result) => {
        this.rs.listadoHcIntegra = result;
        this.otrosDataOriginal = [...result];
        this.construirOpcionesProfesionales();
        this.aplicarFiltrosLocalesHC();
        this.otrosPage = 1;
        this.loadingOtrosTable = false;
      }, () => {
        this.rs.listadoHcIntegra = new Array<any>();
        this.otrosDataOriginal = [];
        this.otrosRows = [];
        this.otrosRowsPage = [];
        this.construirOpcionesProfesionales();
        this.aplicarFiltrosLocalesHC();
        this.loadingOtrosTable = false;
        this.errorOtrosTable = 'Error al consultar historias de otros sistemas';
      });
    }, () => {
      this.loadingOtrosTable = false;
      this.errorOtrosTable = 'Error al consultar historias de otros sistemas';
    });
  }

  public consultarEspecialidad(): void {
    this.rs.ObtenerEspecialidad().subscribe((x) => {
      this.rs.listadoEspecialidad = x;
    }, (error) => {
      const msg = error?.error?.mensaje ?? error?.error?.error ?? 'Error al cargar especialidades';
      this.toastError('Error', msg);
    });
  }

  public async consultarprofesionales(): Promise<void> {
    this.loadingProfesionales = true;
    try {
      const resp = await firstValueFrom(this.medicoServices.obtenerDatosLoginByLogin$());
      const nombres = String(resp?.nombres ?? resp?.Nombres ?? '').trim();
      const apellidos = String(resp?.apellidos ?? resp?.Apellidos ?? '').trim();
      const label = `${nombres} ${apellidos}`.replace(/\s+/g, ' ').trim();
      if (label) {
        this.profesionalLogueadoOption = { label, value: label };
        this.catalogoProfesionalesOptions = [this.profesionalLogueadoOption];
        this.filtroProfesional = null;
      } else {
        this.profesionalLogueadoOption = null;
        this.catalogoProfesionalesOptions = [];
        this.filtroProfesional = null;
      }
      this.rs.listadoprofesinal = [];
      this.loadingProfesionales = false;
      this.construirOpcionesProfesionales();
    } catch (error: any) {
      this.loadingProfesionales = false;
      this.profesionalLogueadoOption = null;
      this.catalogoProfesionalesOptions = [];
      this.rs.listadoprofesinal = [];
      this.filtroProfesional = null;
      this.construirOpcionesProfesionales();
      const msg = resolveApiErrorMessage(error, 'No fue posible cargar el profesional logueado');
      this.toastError('Advertencia', msg);
    }
  }

  imprimirHistoriaClinicaPDF(row: Reimpresion): void {
    if (this.loadingEnvio || this.loadingImpresion) return;
    this.loadingImpresion = true;
    this.rs.ObtenerHcDatoAsociado(row.consultaId);
    const clientId = Number(this.idcliente);
    const pacienteId = row.pacienteId;
    let citaId = row.consultaId;
    citaId = this.normalizarBase64(citaId);
    if (!citaId) {
      this.toastError('Error', 'El identificador de la cita no es válido');
      this.loadingImpresion = false;
      return;
    }
    let tipo: 'Morbidity' | 'nursing' | 'dentistry' | 'procedure';
    try {
      tipo = this.resolverTipoHistoria(row);
    } catch {
      this.toastInfo('Info', 'No se encuentra habilitado en estos momentos');
      this.loadingImpresion = false;
      return;
    }
    this.rs.abrirMorbidity(tipo, clientId, pacienteId, citaId).subscribe({
      next: (blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.loadingImpresion = false;
      },
      error: (err) => {
        this.loadingImpresion = false;
        switch (err.message) {
          case 'NO_DATA':      this.toastInfo(SWAL_TITULO_SIN_DATOS, SWAL_MSG_NO_REGISTROS_CONSULTA); break;
          case 'NOT_FOUND':    this.toastWarn(SWAL_TITULO_NO_ENCONTRADO, SWAL_MSG_HC_NO_EXISTE); break;
          case 'SERVER_ERROR': this.toastError(SWAL_TITULO_ERROR_SERVIDOR, SWAL_MSG_ERROR_500); break;
          default:             this.toastError(SWAL_TITULO_ERROR, SWAL_MSG_NO_PDF);
        }
      }
    });
  }

  imprimirUnificadacronica(): void {
    if (this.loadingEnvio || this.loadingImpresion) return;
    if (!this.rs?.datoPaciente?.id) {
      this.toastWarn(SWAL_TITULO_ADVERTENCIA, SWAL_MSG_PRIMERO_CONSULTAR_PACIENTE);
      return;
    }
    const clientId = Number(this.idcliente);
    const pacienteId = this.rs.datoPaciente.id;
    this.loadingImpresion = true;
    this.rs.abrircronica('unified-morbidity', clientId, pacienteId).subscribe({
      next: (blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.loadingImpresion = false;
      },
      error: (err) => {
        this.loadingImpresion = false;
        switch (err.message) {
          case 'NO_DATA':      this.toastInfo(SWAL_TITULO_SIN_DATOS, SWAL_MSG_NO_REGISTROS_PACIENTE); break;
          case 'NOT_FOUND':    this.toastWarn(SWAL_TITULO_NO_ENCONTRADO, SWAL_MSG_RECURSO_NO_EXISTE); break;
          case 'SERVER_ERROR': this.toastError(SWAL_TITULO_ERROR_SERVIDOR, SWAL_MSG_ERROR_500); break;
          default:             this.toastError(SWAL_TITULO_ERROR, SWAL_MSG_NO_PDF);
        }
      }
    });
  }

  imprimirUnificadageneral(): void {
    if (this.loadingEnvio || this.loadingImpresion) return;
    if (!this.rs?.datoPaciente?.id) {
      this.toastWarn(SWAL_TITULO_ADVERTENCIA, SWAL_MSG_PRIMERO_CONSULTAR_PACIENTE);
      return;
    }
    const clientId = Number(this.idcliente);
    const pacienteId = this.rs.datoPaciente.id;
    this.loadingImpresion = true;
    this.rs.abrirunificada('unified-morbidity', clientId, pacienteId).subscribe({
      next: (blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.loadingImpresion = false;
      },
      error: (err) => {
        this.loadingImpresion = false;
        switch (err.message) {
          case 'NO_DATA':      this.toastInfo(SWAL_TITULO_SIN_DATOS, SWAL_MSG_NO_REGISTROS_PACIENTE); break;
          case 'NOT_FOUND':    this.toastWarn(SWAL_TITULO_NO_ENCONTRADO, SWAL_MSG_RECURSO_NO_EXISTE); break;
          case 'SERVER_ERROR': this.toastError(SWAL_TITULO_ERROR_SERVIDOR, SWAL_MSG_ERROR_500); break;
          default:             this.toastError(SWAL_TITULO_ERROR, SWAL_MSG_NO_PDF);
        }
      }
    });
  }

  private async enviarHistoriaSeleccionada(
  row: Reimpresion,
  tipoHistoria: 'full' | 'lite',
  canal: 'correo' | 'whatsapp',
  destino: string
): Promise<void> {
  const tipoTexto = tipoHistoria === 'full' ? 'Full' : 'Lite';
  let linkPdf = '';
  if (this.loadingEnvio || this.loadingImpresion) return;
  this.loadingEnvio = true;

  try {
    linkPdf = this.construirUrlHistoria(row);
  } catch (e) {
    this.loadingEnvio = false;
    this.toastError('Error', 'No se pudo construir el enlace de la historia clínica.');
    return;
  }

  const mensaje = this.construirMensajeEnvio(row, tipoTexto, linkPdf);

  if (canal === 'correo') {
    const payload: EnviarPlantillaCorreo = {
      correo: destino,
      htmlBody: this.construirHtmlCorreo(row, tipoTexto, linkPdf),
      asunto: `Historia Clínica ${tipoTexto}`,
      tipoCorreo: 'Notificación',
      consecutivoAsociado: this.obtenerConsecutivoAsociado(row)
    };
    try {
      await firstValueFrom(this.rs.enviarCorreo(payload));
      this.loadingEnvio = false;
      this.toastSuccess('Envío realizado', `Correo enviado correctamente (${tipoTexto})`);
    } catch (e: any) {
      this.loadingEnvio = false;
      const asunto = encodeURIComponent(`Historia Clínica ${tipoTexto}`);
      const cuerpo = encodeURIComponent(mensaje);
      window.open(`mailto:${destino}?subject=${asunto}&body=${cuerpo}`, '_blank');
      this.toastInfo('Envío preparado', 'No fue posible enviar por API. Se abrió correo local.');
    }
  } else {
    try {
      this.rs.celularEnvio = this.normalizarNumeroWhatsapp(destino).replace(/^57/, '');
      const responseAsociado = await firstValueFrom(this.rs.ObtenerPaciente(row.consultaId));
      if (!responseAsociado) throw new Error('Sin datos paciente');
      await firstValueFrom(this.rs.sendWhatsapp(linkPdf, responseAsociado, row));
      this.loadingEnvio = false;
      this.toastSuccess('Envío realizado', `WhatsApp enviado correctamente (${tipoTexto})`);
    } catch (e: any) {
      this.loadingEnvio = false;
      const numeroLimpio = this.normalizarNumeroWhatsapp(destino).replace(/^57/, '');
      const url = `https://wa.me/57${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
      this.toastInfo('Envío preparado', `No fue posible enviar por API. Se abrió WhatsApp (${tipoTexto}).`);
    }
  }
}

  setDateRange(months: number): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - months);
    this.filtroFechaRango = [startDate, endDate];
    this.filtersFormGroup.controls.dateRangeControl.setValue([startDate, endDate]);
    this.aplicarFiltrosLocalesHC();
    this.cerrarPopupRangoFecha();
  }

  onRangoFechaModelChange(value: Date[] | null): void {
    this.filtroFechaRango = value;
    this.aplicarFiltrosLocalesHC();
    if (this.tieneRangoCompleto(value)) this.cerrarPopupRangoFecha();
  }

  onRangoFechaSelect(): void {
    if (this.tieneRangoCompleto(this.filtroFechaRango)) this.cerrarPopupRangoFecha();
  }

  onRangoFechaTodayClick(): void {
    this.aplicarFiltrosLocalesHC();
    this.cerrarPopupRangoFecha();
  }

  private tieneRangoCompleto(value: Date[] | null | undefined): boolean {
    return !!(value && value[0] && value[1]);
  }

  private cerrarPopupRangoFecha(): void {
    setTimeout(() => {
      if (!this.fechaRangoCalendar) return;
      if (typeof this.fechaRangoCalendar.hideOverlay === 'function') {
        this.fechaRangoCalendar.hideOverlay();
        return;
      }
      if ('overlayVisible' in this.fechaRangoCalendar) {
        this.fechaRangoCalendar.overlayVisible = false;
      }
    }, 0);
  }

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
    this.recomputePagedRows();
  }

  nextPage(table: 'hc' | 'notas' | 'otros'): void {
    const hcTotal = this.hcRows.length;
    const notasTotal = this.notasRows.length;
    const otrosTotal = this.otrosRows.length;
    if (table === 'hc' && this.hasNextPage(hcTotal, this.hcPage, this.hcPageSize)) this.hcPage++;
    else if (table === 'notas' && this.hasNextPage(notasTotal, this.notasPage, this.notasPageSize)) this.notasPage++;
    else if (table === 'otros' && this.hasNextPage(otrosTotal, this.otrosPage, this.otrosPageSize)) this.otrosPage++;
    this.recomputePagedRows();
  }

  buildCounterText(total: number, page: number, size: number): string {
    if (!total) return 'Mostrando 0 de 0';
    const start = (page - 1) * size + 1;
    const end = Math.min(total, page * size);
    return `Mostrando ${start}-${end} de ${total}`;
  }

  aplicarFiltrosLocalesHC(): void {
    this.hcRows = this.filtrarRowsLocales(this.hcDataOriginal);
    this.notasRows = this.filtrarRowsLocales(this.notasDataOriginal);
    this.otrosRows = this.filtrarRowsLocales(this.otrosDataOriginal);
    this.hcPage = 1;
    this.notasPage = 1;
    this.otrosPage = 1;
    this.recomputePagedRows();
  }

  private recomputePagedRows(): void {
    this.hcRowsPage = this.paginatedRows(this.hcRows, this.hcPage, this.hcPageSize);
    this.notasRowsPage = this.paginatedRows(this.notasRows, this.notasPage, this.notasPageSize);
    this.otrosRowsPage = this.paginatedRows(this.otrosRows, this.otrosPage, this.otrosPageSize);
  }

  limpiarFiltrosLocalesHC(): void {
    this.filtroProfesional = null;
    this.filtroFechaRango = null;
    this.aplicarFiltrosLocalesHC();
  }

  limpiarTodosFiltros(): void {
    this.tipo = undefined as any;
    this.identificacion = undefined as any;
    this.especialidad = undefined;
    this.identificacionNoTemporal = '';
    this.tipoNoTemporal = '';
    this.especialidadNoTemporal = undefined;
    this.filtroProfesional = null;
    this.filtroFechaRango = null;
    this.filtersFormGroup.controls.dateRangeControl.setValue(null);
    this.SwBoton = false;
    this.limpiarDataSources();
    this.filtroProfesional = null;
    this.construirOpcionesProfesionales();
  }

  private construirOpcionesProfesionales(): void {
    const allRows: any[] = [
      ...(this.hcDataOriginal ?? []),
      ...(this.notasDataOriginal ?? []),
      ...(this.otrosDataOriginal ?? []),
    ];
    const nombresEnTablas = this.profesionalSearchActivo
      ? []
      : allRows.map(item => this.obtenerNombreProfesional(item)).filter(Boolean);
    const optionsByKey = new Map<string, { label: string; value: string }>();
    if (this.profesionalLogueadoOption) {
      const key = this.normalizarTexto(this.profesionalLogueadoOption.value);
      if (key && !optionsByKey.has(key)) optionsByKey.set(key, this.profesionalLogueadoOption);
    }
    if (this.filtroProfesional && this.filtroProfesional !== this.profesionalFallbackValue) {
      const value = String(this.filtroProfesional ?? '').trim();
      const key = this.normalizarTexto(value);
      if (key && !optionsByKey.has(key)) optionsByKey.set(key, { label: value, value });
    }
    for (const opt of (this.catalogoProfesionalesOptions ?? [])) {
      const key = this.normalizarTexto(opt.value);
      if (key && !optionsByKey.has(key)) optionsByKey.set(key, opt);
    }
    for (const nombre of nombresEnTablas) {
      const value = String(nombre).trim();
      const key = this.normalizarTexto(value);
      if (key && !optionsByKey.has(key)) optionsByKey.set(key, { label: value, value });
    }
    const options = Array.from(optionsByKey.values());
    if (options.length === 0) {
      this.profesionalesAllOptions = [{ label: this.profesionalFallbackLabel, value: this.profesionalFallbackValue }];
    } else if (nombresEnTablas.length === 0) {
      this.profesionalesAllOptions = (this.catalogoProfesionalesOptions.length > 0
        ? this.catalogoProfesionalesOptions : options).sort((a, b) => a.label.localeCompare(b.label));
    } else {
      this.profesionalesAllOptions = options.sort((a, b) => a.label.localeCompare(b.label));
    }
    if (this.profesionalesVisibleLimit <= 0) this.profesionalesVisibleLimit = this.profesionalesInicial;
    if (this.profesionalesVisibleLimit > this.profesionalesAllOptions.length)
      this.profesionalesVisibleLimit = this.profesionalesAllOptions.length;
    this.actualizarOpcionesProfesionalesVisibles();
    const existeSeleccion = !!this.filtroProfesional
      && this.filtroProfesional !== this.profesionalFallbackValue
      && this.profesionalesAllOptions.some(o =>
        this.normalizarTexto(o.value) === this.normalizarTexto(this.filtroProfesional!)
      );
    if (!existeSeleccion) this.filtroProfesional = null;
  }

  private setProfesionalFallback(): void {
    this.profesionalesAllOptions = [{ label: this.profesionalFallbackLabel, value: this.profesionalFallbackValue }];
    this.profesionalesVisibleLimit = this.profesionalesInicial;
    this.profesionalFilterValue = '';
    this.actualizarOpcionesProfesionalesVisibles();
    this.filtroProfesional = null;
  }

  private inicializarTipoDocumentoPorDefecto(intento: number = 0): void {
    const yaSeleccionado = this.tipo !== undefined && this.tipo !== null && this.tipo !== '';
    if (yaSeleccionado) return;
    const listado = this.rs.ListadoTipoDocumento ?? [];
    if (listado.length > 0) {
      const cedula = listado.find((item: any) =>
        String(item?.descripcion ?? '').toLowerCase().includes('cedula')
      );
      const opcion = cedula ?? listado[0];
      this.tipo = (opcion?.valor ?? opcion?.id ?? '') as any;
      return;
    }
    if (intento < TIPO_DOCUMENTO_DEFAULT_RETRY_MAX) {
      setTimeout(() => this.inicializarTipoDocumentoPorDefecto(intento + 1), TIPO_DOCUMENTO_DEFAULT_RETRY_DELAY_MS);
    }
  }

  private filtrarRowsLocales<T>(rows: T[]): T[] {
    let filtrado = [...rows];
    if (this.filtroProfesional && this.filtroProfesional !== this.profesionalFallbackValue) {
      const filtroKey = this.normalizarTexto(this.filtroProfesional);
      filtrado = filtrado.filter(item => this.normalizarTexto(this.obtenerNombreProfesional(item)) === filtroKey);
    }
    const fechaInicio = this.filtroFechaRango?.[0] ? this.normalizarFechaSinHora(this.filtroFechaRango[0]) : null;
    const fechaFinRaw = this.filtroFechaRango?.[1] ?? this.filtroFechaRango?.[0] ?? null;
    const fechaFin = fechaFinRaw ? this.normalizarFechaSinHora(fechaFinRaw) : null;
    if (fechaInicio && fechaFin) {
      filtrado = filtrado.filter(item => {
        const fechaItem = this.obtenerFechaItem(item);
        return !!fechaItem && fechaItem >= fechaInicio && fechaItem <= fechaFin;
      });
    }
    return filtrado;
  }

  private obtenerNombreProfesional(item: any): string {
    const nombre = String(
      item?.medico ?? item?.profesional ?? item?.usuarioCreacionNombre ?? item?.usuarioCreacion ?? ''
    ).trim();
    return nombre.replace(/\s+/g, ' ').replace(/^medico\b/i, 'Médico');
  }

  private normalizarTexto(value: string): string {
    return normalizeText(value);
  }

  get totalProfesionales(): number {
    return this.profesionalesAllOptions?.length ?? 0;
  }

  onProfesionalFilter(event: any): void {
    const raw = String(event?.filter ?? '');
    const termino = this.sanitizarTerminoProfesional(raw);
    this.profesionalFilterValue = termino;
    if (termino.length < PROFESIONAL_SEARCH_MIN_LENGTH) {
      this.profesionalSearchActivo = false;
      this.loadingProfesionales = false;
      this.catalogoProfesionalesOptions = [];
      this.profesionalTermino$.next('');
      this.construirOpcionesProfesionales();
      return;
    }
    this.profesionalSearchActivo = true;
    this.loadingProfesionales = true;
    this.profesionalTermino$.next(termino);
  }

  onProfesionalShow(): void {
    this.profesionalDropdownAbierto = true;
  }

  onProfesionalHide(): void {
    this.profesionalFilterValue = '';
    this.profesionalSearchActivo = false;
    this.profesionalDropdownAbierto = false;
    this.loadingProfesionales = false;
    this.catalogoProfesionalesOptions = [];
    this.profesionalTermino$.next('');
    this.construirOpcionesProfesionales();
  }

  private actualizarOpcionesProfesionalesVisibles(): void {
    const all = this.profesionalesAllOptions ?? [];
    const filtro = String(this.profesionalFilterValue ?? '').trim();
    let visibles: Array<{ label: string; value: string }>;
    if (filtro) {
      const filtroKey = this.normalizarTexto(filtro);
      visibles = all.filter(o => this.normalizarTexto(o.label).includes(filtroKey));
      if (visibles.length > MAX_PROFESIONALES_VISIBLE) visibles = visibles.slice(0, MAX_PROFESIONALES_VISIBLE);
    } else {
      const limit = Math.max(0, this.profesionalesVisibleLimit ?? this.profesionalesInicial);
      visibles = all.slice(0, limit);
    }
    if (this.filtroProfesional) {
      const keySel = this.normalizarTexto(this.filtroProfesional);
      const existsVisible = visibles.some(o => this.normalizarTexto(o.value) === keySel);
      if (!existsVisible) {
        const selected = all.find(o => this.normalizarTexto(o.value) === keySel);
        if (selected) visibles = [selected, ...visibles];
      }
    }
    if (!this.profesionalesOptions) this.profesionalesOptions = [];
    this.profesionalesOptions.splice(0, this.profesionalesOptions.length, ...visibles);
  }

  private obtenerFechaItem(item: any): Date | null {
    const value = item?.fecha ?? item?.fechaCreacion ?? item?.fechaRegistro ?? item?.fechaAtencion ?? null;
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return this.normalizarFechaSinHora(date);
  }

  private normalizarFechaSinHora(fecha: Date): Date {
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  }

  private normalizarBase64(str: string): string | null {
    str = str.trim().replace(/=+$/, '');
    if (!/^[A-Za-z0-9+/]*$/.test(str)) return null;
    const padding = (4 - (str.length % 4)) % 4;
    return str + '='.repeat(padding);
  }

  private construirUrlHistoria(row: Reimpresion): string {
    const clientId = Number(this.idcliente);
    const pacienteId = row.pacienteId;
    const citaId = row.consultaId;
    const tipo = this.resolverTipoHistoria(row);
    return `${environment.apiReal}/ApiImpresionUnificada/api/Prints/${tipo}/${clientId}/${pacienteId}/${citaId}`;
  }

  private resolverTipoHistoria(row: Reimpresion): 'Morbidity' | 'nursing' | 'dentistry' | 'procedure' {
    switch (row?.link) {
      case 'impresion':            return 'Morbidity';
      case 'impresionEnfermeria':  return 'nursing';
      case 'impresionOdontologia': return 'dentistry';
      case 'impresionProcedimiento': return 'procedure';
      default: throw new Error('UNSUPPORTED_HISTORY_TYPE');
    }
  }

  private construirMensajeEnvio(row: Reimpresion, tipoTexto: string, linkPdf?: string): string {
    const medico = String(row?.medico ?? 'N/A');
    const especialidad = String(row?.especialidad ?? 'N/A');
    const fecha = row?.fecha ? new Date(row.fecha).toLocaleDateString('es-CO') : 'N/A';
    return buildMensajeEnvioHistoriaClinica({ tipoTexto, medico, especialidad, fechaTexto: fecha, linkPdf });
  }

  private construirHtmlCorreo(row: Reimpresion, tipoTexto: string, linkPdf: string): string {
    const fecha = this.formatearFechaTexto(row?.fecha);
    const medico = String(row?.medico ?? 'N/A');
    const especialidad = String(row?.especialidad ?? 'N/A');
    const paciente = this.obtenerNombrePacientePlano();
    return buildHistoriaClinicaCorreoHtml({ tipoTexto, paciente, medico, especialidad, fechaTexto: fecha, linkPdf });
  }

  private normalizarNumeroWhatsapp(value: string): string {
    const onlyDigits = value.replace(/[^\d]/g, '');
    return onlyDigits.startsWith('57') ? onlyDigits : `57${onlyDigits}`;
  }

  private obtenerConsecutivoAsociado(row: Reimpresion): number {
    const raw = row?.consultaId ?? '';
    const parsed = Number(raw);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) return parsed;
    return 0;
  }

  private obtenerNombrePacientePlano(): string {
    const p = this.rs?.datoPaciente;
    const nombre = `${p?.nombre ?? ''} ${p?.primer_Apellido ?? ''} ${p?.segundo_Apellido ?? ''}`.trim();
    return nombre || 'Paciente';
  }

  private formatearFechaTexto(value: any): string {
    if (!value) return 'N/A';
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('es-CO');
  }

  private async generarPdfBlobDesdeFila(row: Reimpresion): Promise<Blob> {
    const clientId = 1;
    const pacienteId = row?.pacienteId;
    const citaId = row?.consultaId;
    if (row?.link === 'impresion') {
      return await firstValueFrom(this.rs.descargarPdfDesdeUrl('mor', clientId, pacienteId, citaId));
    }
    throw new Error('Tipo de historia clínica no soportado para envío');
  }
}
