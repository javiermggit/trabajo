import { Component } from '@angular/core';
import { VistahcService } from './vistahc.service';
import Swal from 'sweetalert2';
//import { AccordionModule } from 'primeng/accordion';
import { MedicoService } from 'src/app/medico/medico.service';
import { MatTableDataSource } from '@angular/material/table';
import { Citas } from 'src/app/Modelos/Medico';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
//import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service';

declare const __webpack_require__: { p?: string } | undefined;

@Component({
  selector: 'app-vistahc',
  templateUrl: './vistahc.component.html',
  styleUrls: ['./vistahc.component.css']
})
export class VistahcComponent {
 public llamadaService: any = { loading: false, estado: false };  
 public filtro = undefined;
 public loadingCI: boolean = false;
  // ── DataSources ──────────────────────────────────────────────────────────
  /** Citas del día (no adicionales) */
  public dataSource: MatTableDataSource<Citas> = new MatTableDataSource<Citas>([]);

  /** Recuperación (adicionales) */
  public dataSourceEti: MatTableDataSource<Citas> = new MatTableDataSource<Citas>([]);

  /** Contingencia */
  public dataSourceCont: MatTableDataSource<Citas> = new MatTableDataSource<Citas>([]);
  public loginId: String;
  public cookieService: CookieService;
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
  hcPageSize: number = 5;
  notasPageSize: number = 5;
  otrosPageSize: number = 5;


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
    fechahoy = new Date().toISOString().substring(0, 10);    
    displayedColumns: string[] = [
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
    private router: Router,
    private route: ActivatedRoute,
    //public du: DatosPacienteService
   ){

     this.loginId = environment.production == false ? "mprueba" : this.cookieService.get('UsuarioMedico');
       
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

    consultarCitasGeneral() {
      this.consultarCitas();
     //this.consultarCitasAnteriores();
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
          Swal.fire('Error!!', "Error al consultar la cita", 'error')
        })
    } else {
      Swal.fire('Advertencia!!', 'Debe seleccionar una especialidad', 'warning')
    }

  }

   public consultarCitas(): void {
    if (this.filtro === undefined || this.filtro === null) {
      Swal.fire('Advertencia!!', 'Debe seleccionar una especialidad', 'warning');
      return;
    }

    this.loading = true;

    this.medicoServices.consultarCitas(this.filtro.id).subscribe(
      (x: Citas[]) => {
        this.loading = false;

        if (x.length === 0) {
          Swal.fire('No hay citas asignadas para el día de hoy', '', 'info');
        }

        // Marcar botones habilitados/deshabilitados
        x.forEach(e => {
          e.disableButton = true;
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
      },
      (error) => {
        this.loading = false;
        Swal.fire('Error!!', 'Error al consultar la cita', 'error');
      }
    );
  }

 public consultarEspecialidad() {
     //this.loadingReimpresion = true;
       this.medicoServices.obtenerListadoTipo().subscribe((x) => {    
 
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

  abrirHistoriaClinica(item: any): void {
    const base = (environment as any).vistaHC as string;
    if (!base) {
      Swal.fire('Configuración pendiente', 'Falta configurar `environment.vistaHC` para abrir la Historia Clínica.', 'info');
      return;
    }

    const url = new URL(base, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const citaId = item?.citaId ?? item?.consultaId ?? item?.ConsultaId;
    const pacienteId = item?.pacienteId ?? item?.paciente_Id ?? item?.PacienteId ?? item?.pacienteID;

    if (citaId !== undefined && citaId !== null) url.searchParams.set('citaId', String(citaId));
    if (pacienteId !== undefined && pacienteId !== null) url.searchParams.set('pacienteId', String(pacienteId));
    if (item?.identificacion) url.searchParams.set('identificacion', String(item.identificacion));
    if (this.filtro?.id) url.searchParams.set('especialidadId', String(this.filtro.id));

    window.open(url.toString(), '_blank');
  }

  
    // ── Acciones de citas (mantener los métodos que ya tenías) ────────────────

  irA(item: any, tipo: string): void {
    // tu implementación existente
  }

   /*  irAci(row: any) {
    this.loading = true;
    this.du.ObtenerPacientePorId(row.pacienteId).subscribe((response) => {
      console.log(response)
      let data: any = {
        "id": response.id,
        "tipoIdentificacion": response.tipo_Identificacion,
        "identificacion": response.identificacion,
        "nombres": response.nombre,
        "apellidos": response.primer_Apellido + " " + response.segundo_Apellido,
        "telefono": response.telefono,
        "correo": response.correo,
        "swPermiteEnviar": true
      }

      this.medicoServices.guardarConsentimientoUsuario(data).subscribe({
        next: (res: any) => {
          console.log(res)
          window.open(environment.vistaCI + res.data.idDocumento, "_target");
        },
        error: (err: any) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: err,
          })
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }, (error) => {
    });
  } */

  irAci(row :any){

  }

  finalizar(item: any): void {
    // tu implementación existente
  }

  desactivarCita(item: any): void {
    // tu implementación existente
  }

  llamarPaciente(identificacion: string, citaId: any): void {
    // tu implementación existente
  }

  abrirModal(item: any, template: any): void {
    // tu implementación existente
  }

  openZoom(link: string): void {
    // tu implementación existente
  }

  abrirZoom(link: string): void {
    // tu implementación existente
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
