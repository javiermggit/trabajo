import { ChangeDetectorRef, Component, Inject, NgModule, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { ReimpresionService } from './reimpresion.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Reimpresion } from 'src/app/Modelos/Reimpresion';
/* import { OdontogramaVisualizacionService } from 'src/app/odontologia/odontograma-visualizacion/odontograma-visualizacion.service';
import { Diente, VMOdontologiaOdontograma } from 'src/app/Modelos/Odontologia'; */
/* import { HCUnificado, ReimpresionOdontologia } from 'src/app/Modelos/HCUnificado'; */
/* import { MedicoService } from 'src/app/medico/medico.service'; */
import { NotaAdministrativaService } from 'src/app/nota-administrativa/nota-administrativa.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
/* import * as moment from 'moment'
import htmlToImage from 'html-to-image'; */
import * as htmlToImage from 'html-to-image';
import { Router } from '@angular/router';
////import { OdontologiaReimpresionService } from 'src/app/servicioImpresion/odontologia-reimpresion.service';
//import { OdontogramaVisualizacionComponent } from 'src/app/odontologia/odontograma-visualizacion/odontograma-visualizacion.component';
import { ValeService } from 'src/app/crecimiento-desarrollo/vale/vale.service';
//import { IndicadoresService } from 'src/app/odontologia/indicadores/indicadores.service';
//import { AntecedenteService } from 'src/app/antecedentes/antecedente.service';
import { AiepiService } from 'src/app/crecimiento-desarrollo/AIEPI/aiepi.service';
import { CrecimientoDesarrolloService } from 'src/app/crecimiento-desarrollo/crecimiento-desarrollo.service';
import { ParametroService } from 'src/app/parametros/parametro.service';
//import { IndicadoresComponent } from 'src/app/odontologia/indicadores/indicadores.component';
/* import { ImpresionUnificadaHCService } from 'src/app/servicioImpresion/impresion-unificada-hc.service';
 */
import { PreAnestesiologiaReimpresionService } from 'src/app/servicioImpresion/preanestesiologia-reimpresion.service';
import { MorbilidadReimpresionService } from 'src/app/servicioImpresion/morbilidad-reimpresion.service';
import { EnfermeriaReimpresionService } from 'src/app/servicioImpresion/enfermeria-reimpresion.service';
import { ProcedimientoReimpresionService } from 'src/app/servicioImpresion/procedimiento-reimpresion.service';
/*import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service'; */


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
 /*  @ViewChildren(OdontogramaVisualizacionComponent) odontograma: QueryList<OdontogramaVisualizacionComponent>;
  @ViewChildren(IndicadoresComponent) indicadores: QueryList<IndicadoresComponent>; */
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


  constructor(
    public rs:ReimpresionService ,
    public router: Router,
    //public medicoServices: MedicoService,
    public changeDetectorRefs: ChangeDetectorRef,
    public nota: NotaAdministrativaService,
    @Inject(DOCUMENT) private document: any,
    //private datePipe: DatePipe,
    //public du: DatosPacienteService,
    public parametro: ParametroService,
    public cd: CrecimientoDesarrolloService,
    public aiepi: AiepiService,
    public vale: ValeService,
    //public hcUnificadas: ImpresionUnificadaHCService,
    public hcRMorbilidad: MorbilidadReimpresionService,
    public hcREnfermeria: EnfermeriaReimpresionService,
    public hcRProcedimiento: ProcedimientoReimpresionService,
    /* private hcROdontologia: OdontologiaReimpresionService,
    private diente: OdontogramaVisualizacionService,
    public antecedente: AntecedenteService,
    private dienteIndicador: IndicadoresService, */
    public hcRpreAnestesiologia: PreAnestesiologiaReimpresionService,
   ) {
    //(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;
   }

  ngOnInit(): void {
    this.setProfesionalFallback();
    this.rs.ObtenerListadoTipoDocumento();
    this.inicializarTipoDocumentoPorDefecto();
    this.consultarEspecialidad();
  }

  // Punto de extensión para lógica futura
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
    this.setProfesionalFallback();
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
      /**se consultan aqui los datos de referencia solo los que no tiene edad
       * ya que la edad debe ser la edad con la que e hizo la HC
       */

      this.cd.cargarDatosReimpresionPadreHijos();

      this.rs.reimpresion = x

      if (x.length > 0) {
        this.SwBoton = true;
        this.PacienteIdInd = x[0].pacienteId;
      }
      this.hcDataOriginal = [...this.rs.reimpresion];
      this.construirOpcionesProfesionales();
      this.aplicarFiltrosLocalesHC();
      this.hcPage = 1;
      //this.changeDetectorRefs.detectChanges();
      this.loadingReimpresion = false;
      this.loadingHcTable = false;
    }, (error) => {
      this.rs.reimpresion = new Array<Reimpresion>();
      this.dataSource = new MatTableDataSource(this.rs.reimpresion);
      this.hcDataOriginal = [];
      this.setProfesionalFallback();
      //this.changeDetectorRefs.detectChanges();
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

      console.log(error)
      this.loadingNotasTable = false;
      this.errorNotasTable = 'Error al consultar notas administrativas';
      this.rs.listadonotas = new Array<any>();
      this.dataSource2 = new MatTableDataSource(this.rs.listadonotas);
      //this.changeDetectorRefs.detectChanges();
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
      //this.changeDetectorRefs.detectChanges();
      // this.loadingReimpresion = false;
    }, (error) => {
      this.rs.listadonotas = new Array<any>();
      this.dataSource2 = new MatTableDataSource(this.rs.listadonotas);
      this.notasDataOriginal = [];
      this.construirOpcionesProfesionales();
      this.aplicarFiltrosLocalesHC();
      this.loadingNotasTable = false;
      this.errorNotasTable = 'Error al consultar notas administrativas';
      //this.changeDetectorRefs.detectChanges();
      console.log(error)

    })

  }

  public consultarHCIntegra() {
    // this.loadingReimpresion = true;
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
        //this.changeDetectorRefs.detectChanges();
        //  this.loadingReimpresion = false;
      }, (error) => {

        this.rs.listadoHcIntegra = new Array<any>();
        this.dataSource3 = new MatTableDataSource([]);
        this.otrosDataOriginal = [];
        this.construirOpcionesProfesionales();
        this.aplicarFiltrosLocalesHC();
        this.loadingOtrosTable = false;
        this.errorOtrosTable = 'Error al consultar historias de otros sistemas';
        //this.changeDetectorRefs.detectChanges();
        console.log(error)
        //   this.loadingReimpresion = false;
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
      console.log(error)
    })
  }

 imprimirHistoriaClinicaPDF(row: Reimpresion) {
    var citaid = row.consultaId;
    this.loadingImpresion = true;

    this.rs.ObtenerHcDatoAsociado(citaid);

    //this.du.DatosUsuario = response;
    if (row.link == "impresion") {
      this.cargarMorbilidad(citaid, row.pacienteId);
    } else if (row.link == "impresionEnfermeria") {
      //this.ImpresionEnfermeria(citaid);
     this.cargarEnfermeria(citaid, row.pacienteId);
    } /* else if (row.link == "impresionOdontologia") {
      //  this.ImpresionOdontologia(citaid);
      this.diente.isImpresion = true;
      this.cargarOdontologia(citaid, row.pacienteId);
    }  */
   else if (row.link == "impresionProcedimiento") {
      //  this.ImpresionProcedimiento(citaid);
      this.cargarProcedimiento(citaid, row.pacienteId);
    } else if (row.link == "impresionPreAnestesiologia") {
      //this.cargarPreAnestesiologia(citaid, row.pacienteId);
    }  else {
      Swal.fire('', 'No se encuentra habilitado en estos momentos', 'info')
      this.loadingImpresion = false;
    }
  } 

  cargarMorbilidad(citaid, pacienteId) {

    this.rs.ObtenerHcMorbilidad(pacienteId, citaid).subscribe(response => {

      var arrayImg = [];

      if (response.morbilidad.crecimientoDesarrollo) {
        this.validarImpresionImagenCD(response.morbilidad.crecimientoYDesarrollo, arrayImg);
      }

      if (response.morbilidad.prenatal) {
        this.validarImpresionImagenPrenatal(response.morbilidad['prenatalHC'], arrayImg);
      }

      if (response.morbilidad.profesional != null && response.morbilidad.profesional.firmaMedico != "") {
        this.rs.firmaMedico = this.rs._baseUrlLogin + "/FirmaMedico/" + response.morbilidad.profesional.firmaMedico;
        arrayImg.push({ img: 'imagenFirma', tipo: 'firmaMedico' });
      }

      response.morbilidad.profesional.firmaMedicoBase = [];
      response.listadoGraficas = [];
      if (arrayImg.length > 0) {
        let requests = arrayImg.reduce((promiseChain, item) => {
          return promiseChain.then(() => new Promise((resolve) => {
            this.sleep(1000).then(() => {
              const img = document.getElementById(item.img) as HTMLElement | null;
              if (!img) {
                resolve(true);
                return;
              }
              img.style.opacity = "1";

              this.asyncFunctionGraficas(img, item.tipo, resolve, response.listadoGraficas, response.morbilidad.profesional.firmaMedicoBase);
            });
          }));
        }, Promise.resolve());

        requests.then(() => {
          this.loadingImpresion = false;
          this.hcRMorbilidad.imprimirHCMorbilidadPDF(response, this.rs.obtenerImagenLogo());
          this.rs.cancelar()
        })
      } else {
        this.loadingImpresion = false;
        this.hcRMorbilidad.imprimirHCMorbilidadPDF(response, this.rs.obtenerImagenLogo());
        this.rs.cancelar()
      }
    }, error => {

      this.loadingImpresion = false;
      Swal.fire('', 'Error al consultar la HC:' + error.error.error, 'error')
    });

  }
  validarImpresionImagenCD(crecimientoYDesarrollo, arrayImg) {
    if (crecimientoYDesarrollo != undefined) {
      if (crecimientoYDesarrollo['pesoTalla'] != undefined) {
        this.rs.pesoTalla = crecimientoYDesarrollo['pesoTalla']
        arrayImg.push({ img: 'pesoTallaImg', tipo: 'cd' });
      }

      if (crecimientoYDesarrollo['tallaEdad'] != undefined) {
        this.rs.tallaEdad = crecimientoYDesarrollo['tallaEdad'];
        arrayImg.push({ img: 'tallaEdadImg', tipo: 'cd' });
      }

      if (crecimientoYDesarrollo['perimetroCefalico'] != undefined) {
        this.rs.perimetroCefalico = crecimientoYDesarrollo['perimetroCefalico']
        arrayImg.push({ img: 'perimetroCefalicoImg', tipo: 'cd' });
      }

      if (crecimientoYDesarrollo['imcEdad'] != undefined) {
        this.rs.imcEdad = crecimientoYDesarrollo['imcEdad']
        arrayImg.push({ img: 'imcEdadImg', tipo: 'cd' });
      }

      if (crecimientoYDesarrollo['pesoEdad'] != undefined) {
        this.rs.pesoEdad = crecimientoYDesarrollo['pesoEdad'];
        arrayImg.push({ img: 'pesoEdadImg', tipo: 'cd' });
      }
    }
  }

   validarImpresionImagenPrenatal(prenatal, arrayImg) {

    if (prenatal != undefined) {
      if (prenatal['imcMaterno'] != undefined) {
        this.rs.IMCMaterno = prenatal['imcMaterno'];
        arrayImg.push({ img: 'imcMaternoImg', tipo: 'prenatal' });
      }

      if (prenatal['alturaUterina'] != undefined) {
        this.rs.alturaUterina = prenatal['alturaUterina'];
        arrayImg.push({ img: 'alturaUterinaImg', tipo: 'prenatal' });
      }

      if (prenatal['presionSitolica'] != undefined) {
        this.rs.presionS = prenatal['presionSitolica'];
        arrayImg.push({ img: 'presionSitolicaImg', tipo: 'prenatal' });
      }

      if (prenatal['presionDiastolica'] != undefined) {
        this.rs.presionD = prenatal['presionDiastolica'];
        arrayImg.push({ img: 'presionDiastolicaImg', tipo: 'prenatal' });
      }

      if (prenatal['glicemia'] != undefined) {
        this.rs.glicemia = prenatal['glicemia'];
        arrayImg.push({ img: 'glicemiaImg', tipo: 'prenatal' });
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  asyncFunctionGraficas(img: HTMLElement, tipo: string, cb: (value?: unknown) => void, listado: string[], firmaMedico: string[]) {
    htmlToImage.toPng(img)
      .then((dataUrl) => {

        if (tipo == 'firmaMedico') {
          firmaMedico.push(dataUrl);
        } else {
          listado.push(dataUrl);
        }
        img.style.opacity = "0";
        cb();
      })
      .catch((error) => {
        img.style.opacity = "0";
        console.log(error);
        cb();
      });

  }

  // enfermeria 
   
  cargarEnfermeria(citaid, pacienteId) {
    this.rs.ObtenerHcEnfermeria(pacienteId, citaid).subscribe(response => {

      var arrayImg = [];

      if (response.enfermeria.esCrecimientoDesarrollo) {
        this.validarImpresionImagenCD(response.enfermeria.crecimientoDesarrollo, arrayImg);
      }

      if (response.enfermeria.prenatal) {
        this.validarImpresionImagenPrenatal(response.enfermeria['prenatalHC'], arrayImg);
      }

      if (response.enfermeria.profesional.firmaMedico != "") {
        this.rs.firmaMedico = this.rs._baseUrlLogin + "/FirmaMedico/" + response.enfermeria.profesional.firmaMedico;
        arrayImg.push({ img: 'imagenFirma', tipo: 'firmaMedico' });
      }

      response.enfermeria.profesional.firmaMedicoBase = [];
      response.listadoGraficas = [];
      if (arrayImg.length > 0) {
        let requests = arrayImg.reduce((promiseChain, item) => {
          return promiseChain.then(() => new Promise((resolve) => {
            this.sleep(1000).then(() => {
              var img = document.getElementById(item.img);
              img.style.opacity = "1";
              this.asyncFunctionGraficas(img, item.tipo, resolve, response.listadoGraficas, response.enfermeria.profesional.firmaMedicoBase);
            });
          }));
        }, Promise.resolve());

        requests.then(() => {
          this.loadingImpresion = false;
          this.hcREnfermeria.imprimirHCEnfermeriaPDF(response, this.rs.obtenerImagenLogo());
          this.rs.cancelar()
        })
      } else {
        this.loadingImpresion = false;
        this.hcREnfermeria.imprimirHCEnfermeriaPDF(response, this.rs.obtenerImagenLogo());
        this.rs.cancelar()
      }
    }, error => {
      this.loadingImpresion = false;
      Swal.fire('', 'Error al consultar la HC:' + error.error.error, 'error')
    });

  }


  // fin de enfermeria

  // procedimiento

   cargarProcedimiento(citaid, pacienteId) {
    this.rs.ObtenerHcProcedimiento(pacienteId, citaid).subscribe(response => {

      this.loadingImpresion = false;
      this.hcRProcedimiento.imprimirHCProcedimientoPDF(response, this.rs.obtenerImagenLogo());
      this.rs.cancelar()
    }, error => {
      this.loadingImpresion = false;
      Swal.fire('', 'Error al consultar la HC:' + error.error, 'error')
    });

  }


  // fin de procedimiento


  // odontologia

  /* cargarOdontologia(citaid, pacienteId) {
    this.rs.ObtenerHcOdontologia(pacienteId, citaid).subscribe(response => {

      if (response.odontologia.odontograma != null || response.odontologia.indicadorPlaca != null) {
        var arrayImg = [];
        if (response.odontologia.odontograma != null) {
          this.cargarOdontograma(response.odontologia.odontograma.odontograma.dientes);
          arrayImg.push({ img: 'myDiv' });
        }

        if (response.odontologia.indicadorPlaca != null) {
          this.cargarIndicadorPlaca(response.odontologia.indicadorPlaca.odontograma[response.odontologia.indicadorPlaca.odontograma.length - 1].dientes);
          arrayImg.push({ img: 'myDivIndicadores' });
        }

        if (response.odontologia.odontologia.profesional.firmaMedico != "") {
          this.rs.firmaMedico = this.rs._baseUrlLogin + "/FirmaMedico/" + response.odontologia.odontologia.profesional.firmaMedico;
          arrayImg.push({ img: 'imagenFirma', tipo: 'firmaMedico' });
        }

        response.odontologia.odontologia.profesional.firmaMedicoBase = [];
        if (arrayImg.length > 0) {

          let requests = arrayImg.reduce((promiseChain, item) => {
            return promiseChain.then(() => new Promise((resolve) => {
              this.sleep(1000).then(() => {
                var img = document.getElementById(item.img);
                img.style.opacity = "1";
                var dataurl = "";
                this.asyncFunctionOdontrogramaIndividual(img, item.img, resolve, response.odontologia);

              });
            }));
          }, Promise.resolve());

          requests.then(() => {
            this.diente.dientes = [];
            this.dienteIndicador.dientes = [];
            this.hcROdontologia.imprimirHCOdontologicaPDF(response, this.rs.obtenerImagenLogo());
            this.loadingImpresion = false;
          })
        } else {
          this.diente.dientes = [];
          this.dienteIndicador.dientes = [];
          this.loadingImpresion = false;
          this.hcROdontologia.imprimirHCOdontologicaPDF(response, this.rs.obtenerImagenLogo());
        }
      } else {
        this.diente.dientes = [];
        this.dienteIndicador.dientes = [];
        this.loadingImpresion = false;
        this.hcROdontologia.imprimirHCOdontologicaPDF(response, this.rs.obtenerImagenLogo());
      }

    }, error => {
      this.loadingImpresion = false;
      Swal.fire('', 'Error al consultar la HC:' + error.error, 'error')
    });

  }

   asyncFunctionOdontrogramaIndividual(img, tipo, cb, imagen: VMOdontologiaOdontograma) {

    htmlToImage.toPng(img)
      .then((dataUrl) => {

        // console.log(dataUrl);
        img.style.opacity = "0";
        if (tipo == 'myDiv') {
          imagen.odontograma.imagen = dataUrl;
        } else if (tipo == 'myDivIndicadores') {
          imagen.indicadorPlaca.imagen = dataUrl;
        } else if (tipo == 'firmaMedico') {
          imagen.odontologia.profesional.firmaMedicoBase.push(dataUrl);
        }
        cb();
      })
      .catch((error) => {
        img.style.opacity = "0";
        cb();
      });

  }


  cargarOdontograma(dientes: Diente[]) {
    this.diente.dientes = dientes;
    var listODonto = this.odontograma.toArray();
    if (listODonto.length > 0) {
      var listDiente = listODonto[0].dientesOdontograma.toArray();
      listDiente.forEach(e => {
        e.eventosDiente = this.diente.obtenerEventosDiente(e.value);
      });
    }
  }

  cargarIndicadorPlaca(dientes: Diente[]) {
    this.dienteIndicador.dientes = dientes;
    var listODonto = this.indicadores.toArray();
    if (listODonto.length > 0) {
      var listDiente = listODonto[0].dientes.toArray();
      listDiente.forEach(e => {
        e.eventosDiente = this.dienteIndicador.obtenerEventosDiente(e.value);
      });
    }
  } */

 /*  cargarProcedimiento(citaid, pacienteId) {
    this.rs.ObtenerHcProcedimiento(pacienteId, citaid).subscribe(response => {

      this.loadingImpresion = false;
      this.hcRProcedimiento.imprimirHCProcedimientoPDF(response, this.rs.obtenerImagenLogo());
      this.rs.cancelar()
    }, error => {
      this.loadingImpresion = false;
      Swal.fire('', 'Error al consultar la HC:' + error.error, 'error')
    });

  } */


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
      this.tipo = ((opcion as any)?.valor ?? opcion?.id ?? '') as any;
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

  private enviarHistoriaSeleccionada(
    row: Reimpresion,
    tipoHistoria: 'full' | 'lite',
    canal: 'correo' | 'whatsapp',
    destino: string
  ) {
    const tipoTexto = tipoHistoria === 'full' ? 'Full' : 'Lite';
    const mensaje = this.construirMensajeEnvio(row, tipoTexto);

    if (canal === 'correo') {
      const asunto = encodeURIComponent(`Historia Clínica ${tipoTexto}`);
      const cuerpo = encodeURIComponent(mensaje);
      this.document.defaultView.location.href = `mailto:${destino}?subject=${asunto}&body=${cuerpo}`;
    } else {
      const numeroLimpio = destino.replace(/[^\d]/g, '');
      const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
      this.document.defaultView.open(url, '_blank');
    }

    Swal.fire('Envío preparado', `Canal: ${canal === 'correo' ? 'Correo' : 'WhatsApp'}\nHistoria: ${tipoTexto}`, 'success');
  }

  private construirMensajeEnvio(row: Reimpresion, tipoTexto: string): string {
    const medico = row?.medico ?? 'N/A';
    const especialidad = row?.especialidad ?? 'N/A';
    const fecha = row?.fecha ? new Date(row.fecha).toLocaleDateString('es-CO') : 'N/A';
    return `Adjunto Historia Clínica ${tipoTexto}.\nMédico: ${medico}\nEspecialidad: ${especialidad}\nFecha: ${fecha}`;
  }
}
