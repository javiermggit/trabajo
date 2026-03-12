import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReimpresionService } from './reimpresion.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Reimpresion } from 'src/app/Modelos/Reimpresion';
import { NotaAdministrativaService } from 'src/app/nota-administrativa/nota-administrativa.service';
import { EnviarPlantillaCorreo } from 'src/app/Modelos/whatsapp';
import { environment } from 'src/environments/environment';
import { catchError, debounceTime, distinctUntilChanged, finalize, firstValueFrom, map, of, Subject, switchMap, takeUntil, timeout } from 'rxjs';
import { MedicoService } from 'src/app/medico/medico.service';
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
  loadingImpresion :boolean =false;
  identificacion!: string;
   tipo!: string;
   especialidad?: string;
   identificacionNoTemporal! : string;
  tipoNoTemporal! : string;
  especialidadNoTemporal? : string; 
  SwBoton: boolean = false;
  PacienteIdInd: number=0;
  link: string='';
  fechahoy = new Date().toISOString().substring(0, ISO_DATE_ONLY_LENGTH);
  public dataSource: MatTableDataSource<Reimpresion> = new MatTableDataSource<Reimpresion>([]);
  public dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public dataSource3: MatTableDataSource<any> = new MatTableDataSource<any>([]);
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
  errorHcTable: string = '';
  errorNotasTable: string = '';
  errorOtrosTable: string = '';
  hcPage: number = 1;
  notasPage: number = 1;
  otrosPage: number = 1;
  hcPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
  notasPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
  otrosPageSize: number = DEFAULT_TABLE_PAGE_SIZE;
  idcliente :string;

	  constructor(
	    public rs:ReimpresionService ,
	    public nota: NotaAdministrativaService,
	    public medicoServices: MedicoService,
	    @Inject(DOCUMENT) private document: any 
	   ) {
   
    this.idcliente= environment.numeroCliente;
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

  ajustarPanelDropdown(inputId: string): void {
    try {
      const doc = this.document as Document;
      const triggerNode = doc?.getElementById(inputId) as HTMLElement | null;
      const triggerEl = (triggerNode?.closest?.('.p-dropdown, .p-autocomplete') as HTMLElement | null) ?? triggerNode;
      if (!triggerEl) {
        return;
      }

      const panels = Array.from(
        doc.querySelectorAll('.reimp-dropdown-panel')
      ) as HTMLElement[];
      const panel = panels[panels.length - 1];
      if (!panel) {
        return;
      }

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
      if (wrapper) {
        wrapper.style.maxHeight = `${wrapperMax}px`;
      }
	  } catch {
	      // no-op
	    }
	  }

	  private configurarAutocompleteProfesionales(): void {
	    this.profesionalTermino$
	      .pipe(
	        debounceTime(PROFESIONAL_SEARCH_DEBOUNCE_MS),
	        distinctUntilChanged(),
	        switchMap((termino) => {
	          const clean = String(termino ?? '').trim();
	          if (clean.length < PROFESIONAL_SEARCH_MIN_LENGTH) {
	            return of([]);
	          }

		          this.loadingProfesionales = true;
		          return this.rs.ObtenerProfesionalesPorTermino(clean).pipe(
		            timeout({ first: TIMEOUT_PROFESIONALES_MS }),
		            catchError(() => of([])),
		            finalize(() => {
		              this.loadingProfesionales = false;
		            })
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
		            } catch {
		              // no-op
		            }
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
	          || item?.nombreCompleto
	          || item?.NombreCompleto
	          || item?.descripcion
	          || item?.Descripcion
	          || ''
	      ).trim();

	      if (!rawLabel) {
	        continue;
	      }

	      const key = this.normalizarTexto(rawLabel);
	      if (!key || seen.has(key)) {
	        continue;
	      }

	      seen.add(key);
	      out.push({ label: rawLabel, value: rawLabel });

	      if (out.length >= this.profesionalesMaxApi) {
	        break;
	      }
	    }

	    return out;
	  }
	  
	
	  //
	   consultarDatoGenerales() {
    if (this.tipo != undefined && this.identificacion != '' && this.identificacion != undefined) {
      this.limpiarDataSources();
      this.identificacionNoTemporal = this.identificacion;
      this.tipoNoTemporal = this.tipo;
      this.especialidadNoTemporal = this.especialidad;
      this.consultarDatos();
      this.consultarPaciente();
      this.consultarHCIntegra();
    } else {
      // SI NO INGRESA TODOS LOS DATOS SE LIMPIAN LAS TABLAS
      this.limpiarDataSources();
      this.identificacionNoTemporal = "";
      this.tipoNoTemporal = "";
      this.especialidadNoTemporal = "";

      Swal.fire('Advertencia!!', 'Faltan campos por digitar', 'warning')
    }
  }
  
  private limpiarDataSources() {
    this.rs.reimpresion = [];
    this.dataSource = new MatTableDataSource([]);
    this.hcDataOriginal = [];
    //this.setProfesionalFallback();
    this.filtroFechaRango = null;

    this.rs.listadonotas = [];
    this.dataSource2 = new MatTableDataSource([]);
    this.notasDataOriginal = [];

    this.rs.listadoHcIntegra = [];
    this.dataSource3 = new MatTableDataSource([]);
    this.otrosDataOriginal = [];
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

   public consultarDatos() {
    this.loadingReimpresion = true;
    this.loadingHcTable = true;
    this.errorHcTable = '';
    this.SwBoton = false;
    this.rs.ObtenerConsulta(this.identificacion, this.tipo, this.especialidad).subscribe((x) => {
   
      this.rs.reimpresion = x

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
	      this.dataSource = new MatTableDataSource(this.rs.reimpresion);
	      this.hcDataOriginal = [];
	      this.filtroProfesional = null;
	      this.construirOpcionesProfesionales();
	      
	      this.loadingReimpresion = false;
	      const msg = resolveApiErrorMessage(error, 'Error al consultar historias clínicas');
	      this.errorHcTable = msg;
	      Swal.fire('Advertencia!!', msg, 'warning');
	      this.loadingHcTable = false;
	    })

  }

public consultarPaciente() {
    this.nota.ObtenerDatosPaciente(this.identificacion, this.tipo).subscribe(x => {
      this.rs.datoPaciente = x;
      if (!x) {
        this.rs.listadonotas = [];
        this.dataSource2 = new MatTableDataSource([]);
        this.loadingNotasTable = false;
        this.rs.listadoHcIntegra = [];
        this.dataSource3 = new MatTableDataSource([]);
        this.loadingOtrosTable = false;
        return;
      }

      this.consultarNotaAdministrativas(x.id);
    }, error => {

      //console.log(error)
      this.loadingNotasTable = false;
      this.errorNotasTable = 'Error al consultar notas administrativas';
      this.rs.listadonotas = new Array<any>();
      this.dataSource2 = new MatTableDataSource(this.rs.listadonotas);
      
    })
  }

  public consultarNotaAdministrativas(idpaciente: string) {
    this.loadingNotasTable = true;
    this.errorNotasTable = '';

    this.rs.ObtenerConsultaNotasAdministrativas(idpaciente).subscribe((x) => {
      x.forEach(e => {
        this.nota.obtenerNombreMedico(e.usuarioCreacion, e)
      });

      this.rs.listadonotas = x
      this.notasDataOriginal = [...this.rs.listadonotas];
      this.construirOpcionesProfesionales();
      this.aplicarFiltrosLocalesHC();
      this.notasPage = 1;
      this.loadingNotasTable = false;
     
    }, (error) => {
      this.rs.listadonotas = new Array<any>();
      this.dataSource2 = new MatTableDataSource(this.rs.listadonotas);
      this.notasDataOriginal = [];
      this.construirOpcionesProfesionales();
      this.aplicarFiltrosLocalesHC();
      this.loadingNotasTable = false;
      this.errorNotasTable = 'Error al consultar notas administrativas';      
      //console.log(error)

    })

  }

  public consultarHCIntegra() {
   
    this.loadingOtrosTable = true;
    this.errorOtrosTable = '';
    this.nota.ObtenerDatosPaciente(this.identificacion, this.tipo).subscribe(x => {

      this.rs.datoPaciente = x;
      if (!x) {
        this.rs.listadoHcIntegra = [];
        this.dataSource3 = new MatTableDataSource([]);
        this.loadingOtrosTable = false;
        return;
      }

      this.rs.ObtenerHcIntegra(x.id).subscribe((result) => {
        this.rs.listadoHcIntegra = result
        this.otrosDataOriginal = [...result];
        this.construirOpcionesProfesionales();
        this.aplicarFiltrosLocalesHC();
        this.otrosPage = 1;
        this.loadingOtrosTable = false;       
      }, (error) => {

        this.rs.listadoHcIntegra = new Array<any>();
        this.dataSource3 = new MatTableDataSource([]);
        this.otrosDataOriginal = [];
        this.construirOpcionesProfesionales();
        this.aplicarFiltrosLocalesHC();
        this.loadingOtrosTable = false;
        this.errorOtrosTable = 'Error al consultar historias de otros sistemas';
       
        console.log(error)
     
      })
    }, () => {
      this.loadingOtrosTable = false;
      this.errorOtrosTable = 'Error al consultar historias de otros sistemas';
    })
  }

  public consultarEspecialidad() {
      //this.loadingReimpresion = true;
        this.rs.ObtenerEspecialidad().subscribe((x) => {    
  
        this.rs.listadoEspecialidad = x
        //this.loadingReimpresion = false;
      }, (error) => {
  
        //this.loadingReimpresion = false;
        if (error.error.error == undefined) {
          Swal.fire('Advertencia!!', error.error.mensaje, 'error')
        } else {
          Swal.fire('Advertencia!!', error.error.error, 'error')
        }
        //console.log(error)
      })
    }

     public async consultarprofesionales() {
      // NO cargar el combo desde /api/ParProfesionales.
      // Se toma el profesional del usuario logueado (cookie UsuarioMedico).
      this.loadingProfesionales = true;

      try {
        const resp = await firstValueFrom(this.medicoServices.obtenerDatosLoginByLogin$());
        const nombres = String(resp?.nombres ?? resp?.Nombres ?? '').trim();
        const apellidos = String(resp?.apellidos ?? resp?.Apellidos ?? '').trim();
        const label = `${nombres} ${apellidos}`.replace(/\s+/g, ' ').trim();

	        if (label) {
	          this.profesionalLogueadoOption = { label, value: label };
	          this.catalogoProfesionalesOptions = [this.profesionalLogueadoOption];
	          // Solo se carga como opción por defecto; NO se selecciona para no afectar el consultar/filtro local.
	          this.filtroProfesional = null;
	        } else {
	          this.profesionalLogueadoOption = null;
	          this.catalogoProfesionalesOptions = [];
	          this.filtroProfesional = null;
	        }

        // Ya no usamos el listado completo de profesionales.
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
	        Swal.fire('Advertencia!!', msg, 'error');
	      }
	    }

 imprimirHistoriaClinicaPDF(row: Reimpresion) {

  this.loadingImpresion = true;

  this.rs.ObtenerHcDatoAsociado(row.consultaId);

  const clientId = Number(this.idcliente);
  const pacienteId = row.pacienteId;
  const citaId = row.consultaId;

  let tipo: 'Morbidity' | 'nursing' | 'dentistry' | 'procedure';

  try {
    tipo = this.resolverTipoHistoria(row);
  } catch {
    Swal.fire('', 'No se encuentra habilitado en estos momentos', 'info');
    this.loadingImpresion = false;
    return;
  }

  this.rs.abrirMorbidity(tipo, clientId, pacienteId, citaId)
    .subscribe({
      next: (blob) => {

        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');

        this.loadingImpresion = false;
      },

      error: (err) => {

        this.loadingImpresion = false;

        switch (err.message) {

          case 'NO_DATA':
            Swal.fire(SWAL_TITULO_SIN_DATOS, SWAL_MSG_NO_REGISTROS_CONSULTA, 'info');
            break;

          case 'NOT_FOUND':
            Swal.fire(SWAL_TITULO_NO_ENCONTRADO, SWAL_MSG_HC_NO_EXISTE, 'warning');
            break;

          case 'SERVER_ERROR':
            Swal.fire(SWAL_TITULO_ERROR_SERVIDOR, SWAL_MSG_ERROR_500, 'error');
            break;

          default:
            Swal.fire(SWAL_TITULO_ERROR, SWAL_MSG_NO_PDF, 'error');
        }
      }
    });
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
    case 'impresion':
      return 'Morbidity';
    case 'impresionEnfermeria':
      return 'nursing';
    case 'impresionOdontologia':
      return 'dentistry';
    case 'impresionProcedimiento':
      return 'procedure';
    default:
      throw new Error('UNSUPPORTED_HISTORY_TYPE');
  }
}

 imprimirUnificadacronica() {

  if (!this.rs?.datoPaciente?.id) {
    Swal.fire(SWAL_TITULO_ADVERTENCIA, SWAL_MSG_PRIMERO_CONSULTAR_PACIENTE, 'warning');
    return;
  }

  const clientId = Number(this.idcliente);
  const pacienteId = this.rs.datoPaciente.id;

  this.loadingImpresion = true;
//pacienteId=2 pruebas ,cuando no pasarle la variable pacienteId
  this.rs.abrircronica('unified-morbidity', clientId, pacienteId)
    .subscribe({
      next: (blob) => {

        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');

        this.loadingImpresion = false;
      },
      error: (err) => {

        this.loadingImpresion = false;

        switch (err.message) {

          case 'NO_DATA':
            Swal.fire(SWAL_TITULO_SIN_DATOS, SWAL_MSG_NO_REGISTROS_PACIENTE, 'info');
            break;

          case 'NOT_FOUND':
            Swal.fire(SWAL_TITULO_NO_ENCONTRADO, SWAL_MSG_RECURSO_NO_EXISTE, 'warning');
            break;

          case 'SERVER_ERROR':
            Swal.fire(SWAL_TITULO_ERROR_SERVIDOR, SWAL_MSG_ERROR_500, 'error');
            break;

          default:
            Swal.fire(SWAL_TITULO_ERROR, SWAL_MSG_NO_PDF, 'error');
        }
      }
    });
}

 imprimirUnificadageneral() {

  if (!this.rs?.datoPaciente?.id) {
    Swal.fire(SWAL_TITULO_ADVERTENCIA, SWAL_MSG_PRIMERO_CONSULTAR_PACIENTE, 'warning');
    return;
  }

  const clientId = Number(this.idcliente);
  const pacienteId = this.rs.datoPaciente.id;

  this.loadingImpresion = true;
//pacienteId=2 pruebas ,cuando no pasarle la variable pacienteId
  this.rs.abrirunificada('unified-morbidity', clientId, pacienteId)
    .subscribe({
      next: (blob) => {

        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');

        this.loadingImpresion = false;
      },
      error: (err) => {

        this.loadingImpresion = false;

        switch (err.message) {

          case 'NO_DATA':
            Swal.fire(SWAL_TITULO_SIN_DATOS, SWAL_MSG_NO_REGISTROS_PACIENTE, 'info');
            break;

          case 'NOT_FOUND':
            Swal.fire(SWAL_TITULO_NO_ENCONTRADO, SWAL_MSG_RECURSO_NO_EXISTE, 'warning');
            break;

          case 'SERVER_ERROR':
            Swal.fire(SWAL_TITULO_ERROR_SERVIDOR, SWAL_MSG_ERROR_500, 'error');
            break;

          default:
            Swal.fire(SWAL_TITULO_ERROR, SWAL_MSG_NO_PDF, 'error');
        }
      }
    });
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
    if (this.tieneRangoCompleto(value)) {
      this.cerrarPopupRangoFecha();
    }
  }

  onRangoFechaSelect(): void {
    if (this.tieneRangoCompleto(this.filtroFechaRango)) {
      this.cerrarPopupRangoFecha();
    }
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
      if (!this.fechaRangoCalendar) {
        return;
      }
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
    } else if (table === 'notas' && this.hasNextPage(this.dataSource2.data.length, this.notasPage, this.notasPageSize)) {
      this.notasPage++;
    } else if (table === 'otros' && this.hasNextPage(this.dataSource3.data.length, this.otrosPage, this.otrosPageSize)) {
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

  aplicarFiltrosLocalesHC() {
    this.dataSource = new MatTableDataSource(this.filtrarRowsLocales(this.hcDataOriginal));
    this.dataSource2 = new MatTableDataSource(this.filtrarRowsLocales(this.notasDataOriginal));
    this.dataSource3 = new MatTableDataSource(this.filtrarRowsLocales(this.otrosDataOriginal));
    this.hcPage = 1;
    this.notasPage = 1;
    this.otrosPage = 1;
  }

		  limpiarFiltrosLocalesHC() {
		    this.filtroProfesional = null;
		    this.filtroFechaRango = null;
		    this.aplicarFiltrosLocalesHC();
		  }

  limpiarTodosFiltros() {
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
    // Mantiene la opción quemada visible, pero sin selección aplicada.
		    this.filtroProfesional = null;
		    this.construirOpcionesProfesionales();
		  }

	  private construirOpcionesProfesionales() {
	    const allRows: any[] = [
	      ...(this.hcDataOriginal ?? []),
	      ...(this.notasDataOriginal ?? []),
	      ...(this.otrosDataOriginal ?? []),
	    ];

	    const nombresEnTablas = this.profesionalSearchActivo
	      ? []
	      : allRows
	        .map(item => this.obtenerNombreProfesional(item))
	        .filter(Boolean);

	    const optionsByKey = new Map<string, { label: string; value: string }>();

	    if (this.profesionalLogueadoOption) {
	      const key = this.normalizarTexto(this.profesionalLogueadoOption.value);
	      if (key && !optionsByKey.has(key)) {
	        optionsByKey.set(key, this.profesionalLogueadoOption);
	      }
	    }
	
	    for (const opt of (this.catalogoProfesionalesOptions ?? [])) {
	      const key = this.normalizarTexto(opt.value);
	      if (key && !optionsByKey.has(key)) {
	        optionsByKey.set(key, opt);
      }
    }

    for (const nombre of nombresEnTablas) {
      const value = String(nombre).trim();
      const key = this.normalizarTexto(value);
      if (key && !optionsByKey.has(key)) {
        optionsByKey.set(key, { label: value, value });
      }
    }

    const options = Array.from(optionsByKey.values());

    if (options.length === 0) {
      this.profesionalesAllOptions = [{ label: this.profesionalFallbackLabel, value: this.profesionalFallbackValue }];
    } else if (nombresEnTablas.length === 0) {
      this.profesionalesAllOptions = (this.catalogoProfesionalesOptions.length > 0
        ? this.catalogoProfesionalesOptions
        : options).sort((a, b) => a.label.localeCompare(b.label));
    } else {
      this.profesionalesAllOptions = options.sort((a, b) => a.label.localeCompare(b.label));
    }

    if (this.profesionalesVisibleLimit <= 0) {
      this.profesionalesVisibleLimit = this.profesionalesInicial;
    }

    if (this.profesionalesVisibleLimit > this.profesionalesAllOptions.length) {
      this.profesionalesVisibleLimit = this.profesionalesAllOptions.length;
    }

    this.actualizarOpcionesProfesionalesVisibles();

    const existeSeleccion = !!this.filtroProfesional
      && this.filtroProfesional !== this.profesionalFallbackValue
      && this.profesionalesAllOptions.some(o =>
        this.normalizarTexto(o.value) === this.normalizarTexto(this.filtroProfesional!)
      );

		    if (!existeSeleccion) {
		      this.filtroProfesional = null;
		    }
		  }

		  private setProfesionalFallback() {
		    this.profesionalesAllOptions = [{ label: this.profesionalFallbackLabel, value: this.profesionalFallbackValue }];
		    this.profesionalesVisibleLimit = this.profesionalesInicial;
		    this.profesionalFilterValue = '';
		    this.actualizarOpcionesProfesionalesVisibles();
		    this.filtroProfesional = null;
		  }

  private inicializarTipoDocumentoPorDefecto(intento: number = 0): void {
    const yaSeleccionado = this.tipo !== undefined && this.tipo !== null && this.tipo !== '';
    if (yaSeleccionado) {
      return;
    }

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
      setTimeout(
        () => this.inicializarTipoDocumentoPorDefecto(intento + 1),
        TIPO_DOCUMENTO_DEFAULT_RETRY_DELAY_MS
      );
    }
  }

  private filtrarRowsLocales<T>(rows: T[]): T[] {
    let filtrado = [...rows];

    if (this.filtroProfesional) {
      if (this.filtroProfesional !== this.profesionalFallbackValue) {
        const filtroKey = this.normalizarTexto(this.filtroProfesional);
        filtrado = filtrado.filter(item => this.normalizarTexto(this.obtenerNombreProfesional(item)) === filtroKey);
      }
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
      item?.medico ??
      item?.profesional ??
      item?.usuarioCreacionNombre ??
      item?.usuarioCreacion ??
      ''
    ).trim();

    return nombre
      .replace(/\s+/g, ' ')
      .replace(/^medico\b/i, 'Médico');
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

      // Evita renderizar miles de items si el filtro es muy amplio.
      if (visibles.length > MAX_PROFESIONALES_VISIBLE) {
        visibles = visibles.slice(0, MAX_PROFESIONALES_VISIBLE);
      }
    } else {
      const limit = Math.max(0, this.profesionalesVisibleLimit ?? this.profesionalesInicial);
      visibles = all.slice(0, limit);
    }

    // Garantiza que la selección actual siempre exista en el listado visible.
    if (this.filtroProfesional) {
      const keySel = this.normalizarTexto(this.filtroProfesional);
      const existsVisible = visibles.some(o => this.normalizarTexto(o.value) === keySel);
      if (!existsVisible) {
        const selected = all.find(o => this.normalizarTexto(o.value) === keySel);
        if (selected) {
          visibles = [selected, ...visibles];
        }
      }
    }

	    // Evita que el overlay de PrimeNG se cierre al cambiar la referencia del arreglo.
	    if (!this.profesionalesOptions) {
	      this.profesionalesOptions = [];
	    }
	    this.profesionalesOptions.splice(0, this.profesionalesOptions.length, ...visibles);
	  }

  private obtenerFechaItem(item: any): Date | null {
    const value = item?.fecha ?? item?.fechaCreacion ?? item?.fechaRegistro ?? item?.fechaAtencion ?? null;
    if (!value) {
      return null;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return this.normalizarFechaSinHora(date);
  }

  private normalizarFechaSinHora(fecha: Date): Date {
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  }

  
  async seleccionarTipoImpresion(row: Reimpresion) {
    const tipoResult = await Swal.fire({
      title: 'Tipo de impresión',
      input: 'radio',
      inputOptions: {
        full: 'Historia clínica Full',
        lite: 'Historia clínica Lite'
      },
      inputValue: 'full',
      showCancelButton: true,
      confirmButtonText: 'Imprimir',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => !value ? 'Debes seleccionar una opción' : null
    });

    if (!tipoResult.isConfirmed || !tipoResult.value) {
      return;
    }

    // Por ahora Full/Lite comparten la misma impresión actual.
    this.imprimirHistoriaClinicaPDF(row);
  }

  async abrirModalEnvio(row: Reimpresion) {
    const tipoResult = await Swal.fire({
      title: 'Tipo de historia clínica',
      input: 'radio',
      inputOptions: {
        full: 'Historia clínica Full',
        lite: 'Historia clínica Lite'
      },
      inputValue: 'full',
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => !value ? 'Debes seleccionar una opción' : null
    });

    if (!tipoResult.isConfirmed || !tipoResult.value) {
      return;
    }

    const canalResult = await Swal.fire({
      title: 'Canal de envío',
      input: 'radio',
      inputOptions: {
        correo: 'Correo electrónico',
        whatsapp: 'WhatsApp'
      },
      inputValue: 'correo',
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => !value ? 'Debes seleccionar una opción' : null
    });

    if (!canalResult.isConfirmed || !canalResult.value) {
      return;
    }

    const isCorreo = canalResult.value === 'correo';
    const destinoResult = await Swal.fire({
      title: isCorreo ? 'Correo destino' : 'Número WhatsApp destino',
      input: 'text',
      inputPlaceholder: isCorreo ? 'ejemplo@correo.com' : '+573001112233',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return 'Este campo es obligatorio';
        }
        if (isCorreo) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value.trim()) ? null : 'Correo inválido';
        }
        const phoneRegex = /^\+?\d{8,15}$/;
        return phoneRegex.test(value.trim()) ? null : 'Número inválido. Usa formato +573001112233';
      }
    });

    if (!destinoResult.isConfirmed || !destinoResult.value) {
      return;
    }

    const tipoHistoria = tipoResult.value as 'full' | 'lite';
    const canal = canalResult.value as 'correo' | 'whatsapp';
    const destino = (destinoResult.value as string).trim();

    this.enviarHistoriaSeleccionada(row, tipoHistoria, canal, destino);
  }

  private async enviarHistoriaSeleccionada(
    row: Reimpresion,
    tipoHistoria: 'full' | 'lite',
    canal: 'correo' | 'whatsapp',
    destino: string
  ): Promise<void> {
    const tipoTexto = tipoHistoria === 'full' ? 'Full' : 'Lite';
    let linkPdf = '';    

    Swal.fire({
      title: 'Preparando envio',
      text: 'Generando y cargando PDF...',
      allowOutsideClick: false,
      onOpen: () => Swal.showLoading()
    });
     //console.log('1. Método enviarHistoriaSeleccionada ejecutado');

    try {

       //const paciente = await firstValueFrom(this.rs.Obtenercitadet(row.consultaId));
    //console.log('Datos del paciente:', paciente);
     linkPdf = this.construirUrlHistoria(row);
     //console.log('URL generada:', linkPdf);
      //console.log('2️ PDF generado correctamente:', linkPdf);
    } catch {
      Swal.close();
      Swal.fire('Error', 'No se pudo construir el enlace de la historia clínica.', 'error');
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
        Swal.fire('Envío realizado', `Correo enviado correctamente (${tipoTexto})`, 'success');
      } catch {
        this.enviarFallbackCorreo(destino, tipoTexto, mensaje);
      }
    } else {
      

  try {
    // Guardamos celular limpio
this.rs.celularEnvio = this.normalizarNumeroWhatsapp(destino).replace(/^57/, '');


const responseAsociado = await firstValueFrom(this.rs.ObtenerPaciente(row.consultaId));
 //console.log('4. datos pacientes:', responseAsociado);

if (!responseAsociado) {
  throw new Error('No se pudo obtener datos asociados');
}



// Enviamos WhatsApp
await firstValueFrom(
  //this.rs.sendWhatsapp(linkPdf, responseAsociado,row);
  this.rs.sendWhatsapp(linkPdf, responseAsociado,row)
   
);
    Swal.fire('Envío realizado', `WhatsApp enviado correctamente (${tipoTexto})`, 'success');
  } catch {
    
    this.enviarFallbackWhatsapp(destino, mensaje, tipoTexto);
  }
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
	    return buildHistoriaClinicaCorreoHtml({
	      tipoTexto,
	      paciente,
      medico,
      especialidad,
      fechaTexto: fecha,
      linkPdf,
    });

  }

	  private async generarPdfBlobDesdeFila(row: Reimpresion): Promise<Blob> {

  const clientId = 1; // o dinámico si lo tienes
  const pacienteId = row?.pacienteId;
  const citaId = row?.consultaId; // NO convertir a number si es string

  if (row?.link === 'impresion') {
    return await firstValueFrom(
      this.rs.descargarPdfDesdeUrl('mor',clientId, pacienteId, citaId)
    );
  }

  throw new Error('Tipo de historia clínica no soportado para envío');
}

 
  private enviarFallbackCorreo(destino: string, tipoTexto: string, mensaje: string): void {
    const asunto = encodeURIComponent(`Historia Clínica ${tipoTexto}`);
    const cuerpo = encodeURIComponent(mensaje);
    this.document.defaultView.location.href = `mailto:${destino}?subject=${asunto}&body=${cuerpo}`;
    Swal.fire('Envío preparado', 'No fue posible enviar por API. Se abrió correo local.', 'info');
  }

  private enviarFallbackWhatsapp(destino: string, mensaje: string, tipoTexto: string): void {
    const numeroLimpio = this.normalizarNumeroWhatsapp(destino).replace(/^57/, '');
    const url = `https://wa.me/57${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
    this.document.defaultView.open(url, '_blank');
    Swal.fire('Envío preparado', `No fue posible enviar por API. Se abrió WhatsApp (${tipoTexto}).`, 'info');
  }

  private normalizarNumeroWhatsapp(value: string): string {
    const onlyDigits = value.replace(/[^\d]/g, '');
    return onlyDigits.startsWith('57') ? onlyDigits : `57${onlyDigits}`;
  }

  private obtenerConsecutivoAsociado(row: Reimpresion): number {
    const raw = row?.consultaId ?? '';
    const parsed = Number(raw);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
      return parsed;
    }
    return 0;
  }

  private obtenerNombrePacientePlano(): string {
    const p = this.rs?.datoPaciente;
    const nombre = `${p?.nombre ?? ''} ${p?.primer_Apellido ?? ''} ${p?.segundo_Apellido ?? ''}`.trim();
    return nombre || 'Paciente';
  }

  private formatearFechaTexto(value: any): string {
    if (!value) {
      return 'N/A';
    }
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('es-CO');
  }

}
