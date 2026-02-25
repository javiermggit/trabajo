import { ChangeDetectorRef, Component, Inject, NgModule, OnInit, ViewChildren,QueryList } from '@angular/core';
import { ReimpresionService } from './reimpresion.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Reimpresion } from 'src/app/Modelos/Reimpresion';
import { OdontogramaVisualizacionService } from 'src/app/odontologia/odontograma-visualizacion/odontograma-visualizacion.service';
import { Diente, VMOdontologiaOdontograma } from 'src/app/Modelos/Odontologia';
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
import { IndicadoresService } from 'src/app/odontologia/indicadores/indicadores.service';
import { AntecedenteService } from 'src/app/antecedentes/antecedente.service';
import { AiepiService } from 'src/app/crecimiento-desarrollo/AIEPI/aiepi.service';
import { CrecimientoDesarrolloService } from 'src/app/crecimiento-desarrollo/crecimiento-desarrollo.service';
import { ParametroService } from 'src/app/parametros/parametro.service';
//import { IndicadoresComponent } from 'src/app/odontologia/indicadores/indicadores.component';
/* import { ImpresionUnificadaHCService } from 'src/app/servicioImpresion/impresion-unificada-hc.service';
 */
import { PreAnestesiologiaReimpresionService } from 'src/app/servicioImpresion/preanestesiologia-reimpresion.service';
import { MorbilidadReimpresionService } from 'src/app/servicioImpresion/morbilidad-reimpresion.service';
/* import { ProcedimientoReimpresionService } from 'src/app/servicioImpresion/procedimiento-reimpresion.service';
import { EnfermeriaReimpresionService } from 'src/app/servicioImpresion/enfermeria-reimpresion.service';
import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service'; */


@Component({
  selector: 'app-reimpresion',
  templateUrl: './reimpresion.component.html',
  styleUrls: ['./reimpresion.component.css']
})
export class ReimpresionComponent implements OnInit {
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
    //public hcREnfermeria: EnfermeriaReimpresionService,
    //public hcRProcedimiento: ProcedimientoReimpresionService,
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
    this.rs.ObtenerListadoTipoDocumento();
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

    this.rs.listadonotas = [];
    this.dataSource2 = new MatTableDataSource([]);

    this.rs.listadoHcIntegra = [];
    this.dataSource3 = new MatTableDataSource([]);
  }

   public consultarDatos() {
    this.loadingReimpresion = true;
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
      this.dataSource = new MatTableDataSource(this.rs.reimpresion);
      //this.changeDetectorRefs.detectChanges();
      this.loadingReimpresion = false;
    }, (error) => {
      this.rs.reimpresion = new Array<Reimpresion>();
      this.dataSource = new MatTableDataSource(this.rs.reimpresion);
      //this.changeDetectorRefs.detectChanges();
      this.loadingReimpresion = false;
      if (error.error.error == undefined) {
        Swal.fire('Advertencia!!', error.error.mensaje, 'warning')
      } else {
        Swal.fire('Advertencia!!', error.error.error, 'warning')
      }
    })

  }

  public consultarPaciente() {
    this.nota.ObtenerDatosPaciente(this.identificacion, this.tipo).subscribe(x => {
      this.rs.datoPaciente = x;
      if (!x) {
        this.rs.listadonotas = [];
        this.dataSource2 = new MatTableDataSource([]);
        this.rs.listadoHcIntegra = [];
        this.dataSource3 = new MatTableDataSource([]);
        return;
      }

      this.consultarNotaAdministrativas(x.id);
    }, error => {

      console.log(error)
      this.rs.listadonotas = new Array<any>();
      this.dataSource2 = new MatTableDataSource(this.rs.listadonotas);
      //this.changeDetectorRefs.detectChanges();
    })
  }

  public consultarNotaAdministrativas(idpaciente: string) {

    this.rs.ObtenerConsultaNotasAdministrativas(idpaciente).subscribe((x) => {
      x.forEach(e => {
        this.nota.obtenerNombreMedico(e.usuarioCreacion, e)
      });

      this.rs.listadonotas = x
      this.dataSource2 = new MatTableDataSource(this.rs.listadonotas);
      //this.changeDetectorRefs.detectChanges();
      // this.loadingReimpresion = false;
    }, (error) => {
      this.rs.listadonotas = new Array<any>();
      this.dataSource2 = new MatTableDataSource(this.rs.listadonotas);
      //this.changeDetectorRefs.detectChanges();
      console.log(error)

    })

  }

  public consultarHCIntegra() {
    // this.loadingReimpresion = true;
    this.nota.ObtenerDatosPaciente(this.identificacion, this.tipo).subscribe(x => {

      this.rs.datoPaciente = x;
      if (!x) {
        this.rs.listadoHcIntegra = [];
        this.dataSource3 = new MatTableDataSource([]);
        return;
      }

      this.rs.ObtenerHcIntegra(x.id).subscribe((result) => {
        this.rs.listadoHcIntegra = result
        this.dataSource3 = new MatTableDataSource(result);
        //this.changeDetectorRefs.detectChanges();
        //  this.loadingReimpresion = false;
      }, (error) => {

        this.rs.listadoHcIntegra = new Array<any>();
        this.dataSource3 = new MatTableDataSource([]);
        //this.changeDetectorRefs.detectChanges();
        console.log(error)
        //   this.loadingReimpresion = false;
      })
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
      // this.ImpresionEnfermeria(citaid);
     // this.cargarEnfermeria(citaid, row.pacienteId);
    } /* else if (row.link == "impresionOdontologia") {
      //  this.ImpresionOdontologia(citaid);
      this.diente.isImpresion = true;
      this.cargarOdontologia(citaid, row.pacienteId);
    }  */else if (row.link == "impresionProcedimiento") {
      //  this.ImpresionProcedimiento(citaid);
      //this.cargarProcedimiento(citaid, row.pacienteId);
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

    this.filtersFormGroup.controls.dateRangeControl.setValue([
      startDate,
      endDate,
    ]);
  }
}
