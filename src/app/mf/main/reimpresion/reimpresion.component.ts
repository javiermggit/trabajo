import { ChangeDetectorRef, Component, Inject, OnInit,ViewChild } from '@angular/core';
import { ReimpresionService } from './reimpresion.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Reimpresion } from 'src/app/Modelos/Reimpresion';
import { NotaAdministrativaService } from 'src/app/nota-administrativa/nota-administrativa.service';
import { Router } from '@angular/router';
import { EnviarPlantillaCorreo } from 'src/app/Modelos/whatsapp';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-reimpresion',
  templateUrl: './reimpresion.component.html',
  styleUrls: ['./reimpresion.component.css']
})
export class ReimpresionComponent implements OnInit {
  @ViewChild('fechaRangoCalendar') fechaRangoCalendar: any;
  private readonly profesionalFallbackValue = '__medico_prueba__';
  private readonly profesionalFallbackLabel = 'Medico Prueba';
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
  fechahoy = new Date().toISOString().substring(0, 10); 
  public dataSource: MatTableDataSource<Reimpresion> = new MatTableDataSource<Reimpresion>([]);
  public dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public dataSource3: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['medico', 'fecha', 'especialidad', 'link'];
  displayedColumnsHc: string[] = ['paciente', 'identificacion', 'rutaAccesoPdf'];
  hcDataOriginal: Reimpresion[] = [];
  notasDataOriginal: any[] = [];
  otrosDataOriginal: any[] = [];
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
  hcPageSize: number = 5;
  notasPageSize: number = 5;
  otrosPageSize: number = 5;
  idcliente :string;

  constructor(
    public rs:ReimpresionService ,
    public router: Router,  
    public changeDetectorRefs: ChangeDetectorRef,
    public nota: NotaAdministrativaService,
    @Inject(DOCUMENT) private document: any 
   ) {
   
    this.idcliente= environment.numeroCliente;
   }

  ngOnInit(): void {
    this.setProfesionalFallback();
    this.rs.ObtenerListadoTipoDocumento();
    this.inicializarTipoDocumentoPorDefecto();
    this.consultarEspecialidad(); 
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
      this.setProfesionalFallback();
      
      this.loadingReimpresion = false;
      if (error.error.error == undefined) {
        this.errorHcTable = error?.error?.mensaje ?? 'Error al consultar historias clínicas';
        Swal.fire('Advertencia!!', error.error.mensaje, 'warning')
      } else {
        this.errorHcTable = error?.error?.error ?? 'Error al consultar historias clínicas';
        Swal.fire('Advertencia!!', error.error.error, 'warning')
      }
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
    this.loadingReimpresion = true;
    this.rs.ObtenerEspecialidad().subscribe((x) => {

      this.rs.listadoEspecialidad = x
      this.loadingReimpresion = false;
    }, (error) => {

      this.loadingReimpresion = false;
      if (error.error.error == undefined) {
        Swal.fire('Advertencia!!', error.error.mensaje, 'error')
      } else {
        Swal.fire('Advertencia!!', error.error.error, 'error')
      }
      //console.log(error)
    })
  }

 imprimirHistoriaClinicaPDF(row: Reimpresion) {

  this.loadingImpresion = true;

  this.rs.ObtenerHcDatoAsociado(row.consultaId);

  const clientId = Number(this.idcliente);
  const pacienteId = row.pacienteId;
  const citaId = row.consultaId;

  let tipo = '';

  switch (row.link) {

    case 'impresion':
      tipo = 'Morbidity';
      break;

    case 'impresionEnfermeria':
      tipo = 'nursing';
      break;

    case 'impresionOdontologia':
      tipo = 'dentistry';
      break;

    case 'impresionProcedimiento':
      tipo = 'procedure';
      break;

    default:
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
            Swal.fire('Sin datos', 'No existen registros para esta consulta.', 'info');
            break;

          case 'NOT_FOUND':
            Swal.fire('No encontrado', 'La historia clínica no existe.', 'warning');
            break;

          case 'SERVER_ERROR':
            Swal.fire('Error servidor', 'Ocurrió un error interno (500).', 'error');
            break;

          default:
            Swal.fire('Error', 'No se pudo generar el PDF.', 'error');
        }
      }
    });
}

private construirUrlHistoria(row: Reimpresion): string {

  const clientId = Number(this.idcliente);
  const pacienteId = row.pacienteId;
  const citaId = row.consultaId;
  //console.log(citaId);

  let tipo = '';

  switch (row.link) {
    case 'impresion':
      tipo = 'Morbidity';
      break;

    case 'impresionEnfermeria':
      tipo = 'nursing';
      break;

    case 'impresionOdontologia':
      tipo = 'dentistry';
      break;

    case 'impresionProcedimiento':
      tipo = 'procedure';
      break;
  }

  const base = window.location.origin; //

  return `${environment.apiReal}/ApiImpresionUnificada/api/Prints/${tipo}/${clientId}/${pacienteId}/${citaId}`;
}

 imprimirUnificadacronica() {

  if (!this.rs?.datoPaciente?.id) {
    Swal.fire('Advertencia', 'Primero debes consultar un paciente', 'warning');
    return;
  }

  const clientId = Number(this.idcliente);
  const pacienteId = this.rs.datoPaciente.id;

  this.loadingImpresion = true;
//pacienteId=2 pruebas ,cuando no pasarle la variable pacienteId
  this.rs.abrircronica('unified-morbidity', clientId, 2)
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
            Swal.fire('Sin datos', 'No existen registros para este paciente.', 'info');
            break;

          case 'NOT_FOUND':
            Swal.fire('No encontrado', 'El recurso no existe.', 'warning');
            break;

          case 'SERVER_ERROR':
            Swal.fire('Error servidor', 'Ocurrió un error interno (500).', 'error');
            break;

          default:
            Swal.fire('Error', 'No se pudo generar el PDF.', 'error');
        }
      }
    });
}

 imprimirUnificadageneral() {

  if (!this.rs?.datoPaciente?.id) {
    Swal.fire('Advertencia', 'Primero debes consultar un paciente', 'warning');
    return;
  }

  const clientId = Number(this.idcliente);
  const pacienteId = this.rs.datoPaciente.id;

  this.loadingImpresion = true;
//pacienteId=2 pruebas ,cuando no pasarle la variable pacienteId
  this.rs.abrirunificada('unified-morbidity', clientId, 2)
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
            Swal.fire('Sin datos', 'No existen registros para este paciente.', 'info');
            break;

          case 'NOT_FOUND':
            Swal.fire('No encontrado', 'El recurso no existe.', 'warning');
            break;

          case 'SERVER_ERROR':
            Swal.fire('Error servidor', 'Ocurrió un error interno (500).', 'error');
            break;

          default:
            Swal.fire('Error', 'No se pudo generar el PDF.', 'error');
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
  }

  private construirOpcionesProfesionales() {
    const allRows = [...this.hcDataOriginal];
    const unicos = Array.from(new Set(
      allRows
        .map(item => this.obtenerNombreProfesional(item))
        .filter(Boolean)
    ));

    this.profesionalesOptions = unicos
      .sort((a, b) => a.localeCompare(b))
      .map(nombre => ({ label: nombre, value: nombre }));

    if (this.profesionalesOptions.length === 0) {
      this.setProfesionalFallback();
    }

    const existeSeleccion = this.profesionalesOptions.some(o => o.value === this.filtroProfesional);
    if (!existeSeleccion) {
      this.filtroProfesional = this.profesionalesOptions.length > 0 ? this.profesionalesOptions[0].value : null;
    }
  }

  private setProfesionalFallback() {
    this.profesionalesOptions = [{ label: this.profesionalFallbackLabel, value: this.profesionalFallbackValue }];
    this.filtroProfesional = this.profesionalFallbackValue;
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

    if (intento < 20) {
      setTimeout(() => this.inicializarTipoDocumentoPorDefecto(intento + 1), 150);
    }
  }

  private filtrarRowsLocales<T>(rows: T[]): T[] {
    let filtrado = [...rows];

    if (this.filtroProfesional) {
      if (this.filtroProfesional !== this.profesionalFallbackValue) {
        filtrado = filtrado.filter(item => this.obtenerNombreProfesional(item) === this.filtroProfesional);
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
      //linkPdf = await this.generarYSubirPdf(row, tipoHistoria);
     linkPdf = this.construirUrlHistoria(row);
     //console.log('URL generada:', linkPdf);
      //console.log('2️ PDF generado correctamente:', linkPdf);
    } catch {
      Swal.close();
      const mensajeFallback = this.construirMensajeEnvio(row, tipoTexto);
      if (canal === 'correo') {
        this.enviarFallbackCorreo(destino, tipoTexto, mensajeFallback);
      } else {
        this.enviarFallbackWhatsapp(destino, mensajeFallback, tipoTexto);
      }
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
  this.rs.sendWhatsapp(linkPdf, responseAsociado,row)
   
);
    Swal.fire('Envío realizado', `WhatsApp enviado correctamente (${tipoTexto})`, 'success');
  } catch {
    this.enviarFallbackWhatsapp(destino, mensaje, tipoTexto);
  }
}
  }

  private construirMensajeEnvio(row: Reimpresion, tipoTexto: string, linkPdf?: string): string {
    const medico = row?.medico ?? 'N/A';
    const especialidad = row?.especialidad ?? 'N/A';
    const fecha = row?.fecha ? new Date(row.fecha).toLocaleDateString('es-CO') : 'N/A';
    const linkTexto = linkPdf ? `\nEnlace: ${linkPdf}` : '';
    return `Adjunto Historia Clínica ${tipoTexto}.\nMédico: ${medico}\nEspecialidad: ${especialidad}\nFecha: ${fecha}${linkTexto}`;
  }

  private construirHtmlCorreo(row: Reimpresion, tipoTexto: string, linkPdf: string): string {
    const fecha = this.formatearFechaTexto(row?.fecha);
    const medico = row?.medico ?? 'N/A';
    const especialidad = row?.especialidad ?? 'N/A';
    const paciente = this.obtenerNombrePacientePlano();
    return `<div style="font-family:Segoe UI,Arial,sans-serif;color:#1f2937;">
      <h3 style="margin:0 0 10px;">Historia Clínica ${tipoTexto}</h3>
      <p style="margin:0 0 8px;">Paciente: ${paciente}</p>
      <p style="margin:0 0 8px;">Médico: ${medico}</p>
      <p style="margin:0 0 8px;">Especialidad: ${especialidad}</p>
      <p style="margin:0 0 12px;">Fecha: ${fecha}</p>
      <a href="${linkPdf}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;padding:8px 14px;background:#2d6cdf;color:#fff;text-decoration:none;border-radius:6px;">
         Descargar historia clínica
      </a>
    </div>`;
  }

  private async generarYSubirPdf(row: Reimpresion, tipoHistoria: 'full' | 'lite'): Promise<string> {
    const blob = await this.generarPdfBlobDesdeFila(row);
    const nombre = `hc-${row?.consultaId ?? 'consulta'}-${tipoHistoria}.pdf`;
    const archivo = new File([blob], nombre, { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('file', archivo);

    const response = await firstValueFrom(this.rs.uploadPDF(formData));
    if (!response || response.isError || !response.link) {
      throw new Error(response?.mensaje || 'No fue posible cargar el PDF');
    }

    return response.link;
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
