import { Injectable } from '@angular/core';
import { CertificadoMedico, CrecimientoDesarrollo, AntecedentesPerinatales, PatologiasRecienNacido, InformacionPsicosocial, SeguimientoPrograma, PatronesCrecimiento, SeguimientoEscalaAbreviadaDesarrollo, ComentariosRecomendacionesSeguimiento, LactanciaMaterna, lactanciaCuestionario, RespuestaGrafica, TamizajeAnemia, RutinasHabitosSaludables, ValoracionSaludSexual } from '../Modelos/CrecimientoDesarrollo';
import { HttpClient } from '@angular/common/http';
import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service';
import { ExamenFisicoService } from 'src/app/morbilidad/examen-fisico/examen-fisico.service';
import { MchatService } from './mchat/mchat.service';
import { Aie3Service } from './AIE3/aie3.service';
import { ValeService } from './vale/vale.service';
import { VMPaciente } from '../Modelos/Modelos';
import { LactanciaService } from './Lactancia/lactancia.service';
import { AiepiService } from './AIEPI/aiepi.service';
import { AsistenciaEscolar, BaseListTamizajeMental, Ecomapa, Familiograma, TamizajeSaludBucal, VMApgar } from '../Modelos/Adolescencia';
import { ValoracionDelDesarrollo } from '../Modelos/Joven';
import { VMRutinasHabitos, VMSeguimientoPrograma, VMTamizajeAnemiaResult } from '../Modelos/VMCrecimiento';
//import { TamizajeSaludBucalService } from 'src/app/tamizaje-salud-bucal/tamizaje-salud-bucal.service';
import { FamiliogramaService } from 'src/app/familiograma/familiograma.service';
import { ApgarServiceService } from 'src/app/apgar/apgar-service.service';
//import { TamizajeSaludMentalService } from 'src/app/tamizaje-salud-mental/tamizaje-salud-mental.service';
import { FinnishriskService } from 'src/app/finnishrisk/finnishrisk.service';
import { EcomapaService } from 'src/app/ecomapa/ecomapa.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrecimientoDesarrolloService {

  public Hc: CrecimientoDesarrollo;
  public ListadoTerminacionEmbarazo: any;
  public ListadoLugarParto: any;
  public ListadoProfesionalParto: any
  public ListadoPosicionParto: any;
  public ListadoPlacenta: any;
  public ListadoAnestesia: any;
  public ListadoReanimacion: any;
  public ListadoubicacionTomaTSH: any;

  public ListadoViveCon: any;
  public ListadoCondicionesSocioeconomicas: any;
  public ListadoCondicionesViviendas: any;
  public ListadoTipoAlimentacion: any;
  public ListadoTamisajeAgudezaVisual: any;
  public ListadoTamisajeAuditivo: any;
  public ListadoCrecimientoH: Array<VMSeguimientoPrograma> | undefined ;
  public ListadoRutinas: Array<VMRutinasHabitos> | undefined;

  public datosMarcardosMchat: Array<number> = []
  public datosMarcardosVale: Array<number> = []
  public datosMarcardosAie3: Array<number> = []
  public datosMarcardosLactancia: Array<number> = []
  public lactanciaPreguntas: lactanciaCuestionario = new lactanciaCuestionario();
  public coloresBMG: string;
  public coloresBMF: string;
  public coloresBAL: string;
  public coloresBPS: string;
  public observaciongrafica: string = "";
  public observaciongraficaPatrones: string = "";

  alertTamizajeAuditivo: boolean = false;
  swAlertHemoglobinaPlan: boolean = false;
  swAlertHematocritoPlan: boolean = false;

  public errors: Array<string> = [];
  habilitarCampos: boolean = false;
  _baseUrlHC: string;
  _baseURLPar: string;
  public historicoApgar: Array<VMApgar> = []

  constructor(
    public datospaServ: DatosPacienteService,
    private http: HttpClient,
    //@Inject('URLHc') baseUrlHc: string,
    //@Inject('URLParametrizacion') baseUrlPar: string,
    public efs: ExamenFisicoService,
    public aie3Service: Aie3Service,
    public mchatService: MchatService,
    public valeService: ValeService,
    public aiepi: AiepiService,
    public lactanciaService: LactanciaService,
    //public ValeServicio: ValeService,
    public familiogramas: FamiliogramaService,
    public apgarService: ApgarServiceService,
    //public tSaludMental: TamizajeSaludMentalService,
    //public tSaludBucal: TamizajeSaludBucalService,
    public finnishrisk: FinnishriskService,
    public ecomapas: EcomapaService
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseURLPar = environment.URLParametrizacion;

    this.Hc = new CrecimientoDesarrollo();
    this.coloresBMG = '#FFF';
    this.coloresBMF = '#FFF';
    this.coloresBAL = '#FFF';
    this.coloresBPS = '#FFF';
    this.observaciongrafica = "";
    this.observaciongraficaPatrones = "";
    this.ObtenerCrecimientoDesarrollo()

    //Combos
    this.ObtenerListadoTerminacionEmbarazo();
    this.ObtenerListadoLugarParto();
    this.ObtenerListadoProfesionalParto();
    this.ObtenerListadoPosicionParto();
    this.ObtenerListadoPlacenta();
    this.ObtenerListadoAnestesia();
    this.ObtenerListadoReanimacion();
    this.ObtenerListadoubicacionTomaTSH();
    this.ObtenerListadoViveCon();
    this.ObtenerListadoCondicionesSocioeconomicas();
    this.ObtenerListadoCondicionesViviendas();
    this.ObtenerListadoTipoAlimentacion();
    this.ObtenerListadoTamisajeAgudezaVisual();
    this.ObtenerListadoTamisajeAuditivo();
    //End Combos

  }


  ObtenerCrecimientoDesarrollo() {
    this.Hc.infancia = false;
    this.Hc.primeraInfancia = false;
    this.swAlertHemoglobinaPlan = false;
    this.swAlertHematocritoPlan = false;
    this.Hc.antecedentesPerinatales = new AntecedentesPerinatales();
    this.Hc.patologiasRecienNacido = new PatologiasRecienNacido();
    this.Hc.informacionPsicosocial = new InformacionPsicosocial();
    this.Hc.seguimientoPrograma = new SeguimientoPrograma();
    this.Hc.patronesCrecimiento = new PatronesCrecimiento();
    this.Hc.seguimientoEscalaAbreviadaDesarrollo = new SeguimientoEscalaAbreviadaDesarrollo();
    //this.Hc.aiepi = new AIEPI();
    // this.Hc.proximoControl = new ProximoControl();
    this.Hc.comentariosRecomendacionesSeguimiento = new ComentariosRecomendacionesSeguimiento();
    // this.Hc.recomendacionCursoVida = new ComentariosRecomendacionesSeguimiento();
    this.Hc.certificado = new CertificadoMedico();
    //AntecedentesPerinatales
    this.Hc.antecedentesPerinatales.embarazoDeseado = true;
    this.Hc.antecedentesPerinatales.complicacionesParto = false;
    this.Hc.antecedentesPerinatales.episiotomia = false;
    this.Hc.antecedentesPerinatales.desgarro = false;
    this.Hc.antecedentesPerinatales.transfusionSanguinea = false;
    //this.Hc.antecedentesPerinatales.suministroAntibiotico = false;
    this.Hc.antecedentesPerinatales.pesoRNNacer = 0;
    this.Hc.antecedentesPerinatales.perimetroCefalico = 0;
    this.Hc.antecedentesPerinatales.longitud = 0;
    this.Hc.antecedentesPerinatales.edadGestacional = 0;
    this.Hc.antecedentesPerinatales.apgar1Min = 0;
    this.Hc.antecedentesPerinatales.apgar5Min = 0;
    this.Hc.antecedentesPerinatales.tomaTSH = false;
    this.Hc.antecedentesPerinatales.valor_TSH = 0;
    this.Hc.antecedentesPerinatales.vacunaHepatitisB = false;
    this.Hc.antecedentesPerinatales.alteracionBilirrubina = false;
    this.Hc.antecedentesPerinatales.toxoplasmaIGM = 0;

    //PatologiasRecienNacido
    this.Hc.patologiasRecienNacido.respiratorias = false;
    this.Hc.patologiasRecienNacido.malformaciones = false;
    this.Hc.patologiasRecienNacido.obstruccionViaAereaSuperior = false;
    this.Hc.patologiasRecienNacido.cardiovasculares = false;
    this.Hc.patologiasRecienNacido.infecciosas = false;
    this.Hc.patologiasRecienNacido.metabolicas = false;
    this.Hc.patologiasRecienNacido.hematologicas = false;
    this.Hc.patologiasRecienNacido.neurologicas = false;

    //InformacionPsicosocial
    this.Hc.informacionPsicosocial.edadMadre = 0;
    this.Hc.informacionPsicosocial.ausenciaMuerteMadre = false;
    this.Hc.informacionPsicosocial.edadPadre = 0;
    this.Hc.informacionPsicosocial.ausenciaMuertePadre = false;
    this.Hc.informacionPsicosocial.numeroHermanos = 0;
    this.Hc.informacionPsicosocial.observaciones = "";

    //SeguimientoPrograma
    this.Hc.seguimientoPrograma.edadActual = 0; //ojo
    this.Hc.seguimientoPrograma.edadActualMeses = 2; //ojo
    this.Hc.seguimientoPrograma.perimetroCefalico = 0;//ojo
    this.Hc.seguimientoPrograma.signosMaltratoFisico = false;
    this.Hc.seguimientoPrograma.observaciones = "";

    //patronesCrecimiento
    this.Hc.patronesCrecimiento.tallaParaEdad = "";
    this.Hc.patronesCrecimiento.pesoParaTalla = "";
    this.Hc.patronesCrecimiento.perimetroCefalico = "";
    this.Hc.patronesCrecimiento.iMCParaEdad = "";
    this.Hc.patronesCrecimiento.pesoParaEdad = "";

    //SeguimientoEscalaAbreviadaDesarrollo
    this.Hc.seguimientoEscalaAbreviadaDesarrollo.motricidadGruesa = "";
    this.Hc.seguimientoEscalaAbreviadaDesarrollo.motricidadFinoadactiva = "";
    this.Hc.seguimientoEscalaAbreviadaDesarrollo.audicionLenguaje = "";
    this.Hc.seguimientoEscalaAbreviadaDesarrollo.personalSocial = "";

    this.Hc.familiograma = new Familiograma();
    this.Hc.ecomapa = new Ecomapa();
    this.Hc.apgar = [];
    this.Hc.apgarComplete = [];

    //ComentariosRecomendacionesSeguimiento
    this.Hc.comentariosRecomendacionesSeguimiento.observacion = "";
    //this.Hc.recomendacionCursoVida.observacion = "";

    this.Hc.seguimientoPrograma.edadActual = this.datospaServ.DatosUsuario.edadAnos;
    this.Hc.seguimientoPrograma.edadActualMeses = this.datospaServ.DatosUsuario.edadMeses;
    this.Hc.tamizajeAnemia = new TamizajeAnemia();
    this.Hc.tamizajeSaludMental = [];
    this.Hc.tamizajeSaludMentalComplete = [];
    this.Hc.tamizajeSaludBucal = new TamizajeSaludBucal();
    // this.Hc.tamizajeAlimentacion = new TamizajeAlimentacion();
    //this.Hc.planDeCuidado = new PlanDeCuidadoCrecimientoDesarrollo();
    this.Hc.tamizajeSaludMental = new Array<BaseListTamizajeMental>();
    this.Hc.tamizajeSaludMentalComplete = new Array<BaseListTamizajeMental>();
    this.Hc.rutinasHabitos = new RutinasHabitosSaludables();
    this.Hc.valoracionSaludSexual = new ValoracionSaludSexual();
    this.Hc.valoracionDelDesarrollo = new ValoracionDelDesarrollo();
    this.Hc.asistenciaEscolar = new AsistenciaEscolar();
    this.Hc.interpretacionTamizajeSaludMental = "";

  }

  cargarDatosHistoricos(id: string | number) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimaConsultaPyP?PacienteId=' + id, { responseType: "json" })
      .subscribe(
        (response) => {
          
          this.habilitarCampos = false;
          if (response.consultaId != 0) {
            //this.habilitarCampos = true;
            this.Hc.antecedentesPerinatales = response.antecedentesPerinatales;
            this.Hc.informacionPsicosocial = response.informacionPsicosocial;
            this.Hc.patologiasRecienNacido = response.patologiasRecienNacido;
            this.Hc.tamizajeAnemia = response.tamizajeAnemia == null ? new TamizajeAnemia() : response.tamizajeAnemia;
            this.obtenerAlertTamizajeAnemia(this.Hc.tamizajeAnemia);
            //this.Hc.planDeCuidado = response.planDeCuidado == undefined ? new PlanDeCuidadoCrecimientoDesarrollo() : response.planDeCuidado;
            this.Hc.valoracionSaludSexual = response.valoracionSaludSexual == undefined ? new ValoracionSaludSexual() : response.valoracionSaludSexual;
            this.Hc.valoracionDelDesarrollo = response.valoracionDelDesarrollo == undefined ? new ValoracionDelDesarrollo() : response.valoracionDelDesarrollo;
            this.Hc.asistenciaEscolar = response.asistenciaEscolar == undefined ? new AsistenciaEscolar() : response.asistenciaEscolar;
            this.Hc.rutinasHabitos = response.rutinasHabitos == undefined ? new RutinasHabitosSaludables() : response.rutinasHabitos;
            this.Hc.lactanciaPreguntas = response.lactanciaPreguntas;
          } else {
            if (this.datospaServ.DatosUsuario.sexo == 'F' && ((this.datospaServ.DatosUsuario.edadMeses >= 6 && this.datospaServ.DatosUsuario.edadMeses <= 23) || (this.datospaServ.DatosUsuario.edadAnos >= 10 && this.datospaServ.DatosUsuario.edadAnos <= 11))) {
              this.swAlertHemoglobinaPlan = true;
              this.Hc.tamizajeAnemia = new TamizajeAnemia();
            }
            if (this.datospaServ.DatosUsuario.sexo == 'F' && (this.datospaServ.DatosUsuario.edadAnos >= 10 && this.datospaServ.DatosUsuario.edadAnos <= 11)) {
              this.swAlertHematocritoPlan = true;
              this.Hc.tamizajeAnemia = new TamizajeAnemia();
            }
          }
        }, (error) => {
        })
  }


  obtenerAlertTamizajeAnemia(tamizajeAnemia: TamizajeAnemia) {
    
    if (this.datospaServ.DatosUsuario.sexo == 'F' && (this.datospaServ.DatosUsuario.edadMeses >= 6 && this.datospaServ.DatosUsuario.edadMeses <= 23)) {
      if (tamizajeAnemia.tieneHemoglobina) {
        if (tamizajeAnemia.edadHemoglobina < 6) {
          this.swAlertHemoglobinaPlan = true;
          this.Hc.tamizajeAnemia = new TamizajeAnemia();
        } else {
          this.swAlertHemoglobinaPlan = false;
        }
      } else {
        this.swAlertHemoglobinaPlan = true;
        this.Hc.tamizajeAnemia = new TamizajeAnemia();
      }
    }

    if (this.datospaServ.DatosUsuario.sexo == 'F' && (this.datospaServ.DatosUsuario.edadAnos >= 10 && this.datospaServ.DatosUsuario.edadAnos <= 11)) {
      if (tamizajeAnemia.tieneHemoglobina) {
        if (tamizajeAnemia.edadHemoglobina < 120) {
          this.swAlertHemoglobinaPlan = true;
          this.Hc.tamizajeAnemia = new TamizajeAnemia();
        } else {
          this.swAlertHemoglobinaPlan = false;
        }
      } else {
        this.swAlertHemoglobinaPlan = true;
        this.Hc.tamizajeAnemia = new TamizajeAnemia();
      }

      if (tamizajeAnemia.tieneHematocrito) {
        if (tamizajeAnemia.edadHemoglobina < 120) {
          this.swAlertHematocritoPlan = true;
          this.Hc.tamizajeAnemia = new TamizajeAnemia();
        } else {
          this.swAlertHematocritoPlan = false;
        }
      } else {
        this.swAlertHematocritoPlan = true;
        this.Hc.tamizajeAnemia = new TamizajeAnemia();
      }
    }
  }


  /* 
    cargarDatosTamizajeAnemia() {
      return this.http.get<Array<VMTamizajeAnemiaResult>>(this._baseUrlHC + '/api/Historicos/ObtenerTamizajeAnemiaPrimeraInfancia?PacienteId=' + this.datospaServ.DatosUsuario.id + '&nacimiento=' + this.datospaServ.DatosUsuario.fecha_Nacimiento, { responseType: "json" }).subscribe(
        (response) => {
          this.datosTamizaje = response;
        }, (error) => {
        })
    }
   */

  cargarDatosHistoricosSeguimiento() {
    return this.http.get<Array<VMSeguimientoPrograma>>(this._baseUrlHC + '/api/Historicos/ObtenerListadoSeguimientoPyP?PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  cargarDatosHistoricosRutinas() {
    return this.http.get<Array<VMRutinasHabitos>>(this._baseUrlHC + '/api/Historicos/ObtenerHistorialRutinasHabitos?PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  cargarDatosLactanciaMaterna() {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Historicos/ObtenerListadoLactanciaMaternaPyP?PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  //#region Combos
  ObtenerListadoTerminacionEmbarazo() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTerminacionEmbarazos', { responseType: "json" }).subscribe((response) => {
      this.ListadoTerminacionEmbarazo = response;
    })
  }
  ObtenerListadoProfesionalParto() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParProfesionalParto', { responseType: "json" }).subscribe((response) => {
      this.ListadoProfesionalParto = response;
    })
  }
  ObtenerListadoLugarParto() {

    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParLugarParto', { responseType: "json" }).subscribe((response) => {
      this.ListadoLugarParto = response;
    })
  }
  ObtenerListadoPosicionParto() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParPosicionParto', { responseType: "json" }).subscribe((response) => {
      this.ListadoPosicionParto = response;
    })
  }
  ObtenerListadoPlacenta() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParPlacentas', { responseType: "json" }).subscribe((response) => {
      this.ListadoPlacenta = response;
    })
  }
  ObtenerListadoAnestesia() {

    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTipoAnestesias', { responseType: "json" }).subscribe((response) => {
      this.ListadoAnestesia = response;
    })
  }
  ObtenerListadoReanimacion() {

    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParReanimaciones', { responseType: "json" }).subscribe((response) => {
      this.ListadoReanimacion = response;
    })
  }
  ObtenerListadoubicacionTomaTSH() {

    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParUbicacionTsh', { responseType: "json" }).subscribe((response) => {
      this.ListadoubicacionTomaTSH = response;
    })
  }
  ObtenerListadoViveCon() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParViveCon', { responseType: "json" }).subscribe((response) => {
      this.ListadoViveCon = response;
    })
  }
  ObtenerListadoCondicionesSocioeconomicas() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParCondicionesSocioeconomicas', { responseType: "json" }).subscribe((response) => {
      this.ListadoCondicionesSocioeconomicas = response;
    })
  }
  ObtenerListadoCondicionesViviendas() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParCondicionesViviendas', { responseType: "json" }).subscribe((response) => {
      this.ListadoCondicionesViviendas = response;
    })
  }
  ObtenerListadoTipoAlimentacion() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTiposAlimentacion', { responseType: "json" }).subscribe((response) => {
      this.ListadoTipoAlimentacion = response;
    })
  }
  ObtenerListadoTamisajeAgudezaVisual() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTamisajesVisuales', { responseType: "json" }).subscribe((response) => {
      this.ListadoTamisajeAgudezaVisual = response;
    })
  }
  ObtenerListadoTamisajeAuditivo() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTamisajesAuditivos', { responseType: "json" }).subscribe((response) => {
      this.ListadoTamisajeAuditivo = response;
    })
  }

  ObtenerPesoTalla() {

    let edad = this.Hc.seguimientoPrograma.edadActualMeses;
    let talla = this.efs.ExamenFisico.talla;
    let peso = this.efs.ExamenFisico.peso;
    let sexo = this.datospaServ.DatosUsuario.sexo;
    return this.http.get<RespuestaGrafica>(this._baseUrlHC + '/api/Graficas/ObtenerPesoTalla?peso=' + peso + '&talla=' + talla + '&edad=' + edad + '&sexo=' + sexo + '&PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  ObtenerTallaEdad() {
    let edad = this.Hc.seguimientoPrograma.edadActualMeses;
    let talla = this.efs.ExamenFisico.talla;
    let sexo = this.datospaServ.DatosUsuario.sexo;
    return this.http.get<RespuestaGrafica>(this._baseUrlHC + '/api/Graficas/ObtenerTallaEdad?talla=' + talla + '&edad=' + edad + '&sexo=' + sexo + '&PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  ObtenerPerimetroCefalico() {
    let edad = this.Hc.seguimientoPrograma.edadActualMeses;
    let perimetro = this.efs.ExamenFisico.perimetroCefalico;
    let sexo = this.datospaServ.DatosUsuario.sexo;
    return this.http.get<RespuestaGrafica>(this._baseUrlHC + '/api/Graficas/ObtenerPerimetroCefalico?perimetro=' + perimetro + '&edad=' + edad + '&sexo=' + sexo + '&PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  ObtenerImcEdad() {
    let edad = this.Hc.seguimientoPrograma.edadActualMeses;
    // let imc = this.efs.ExamenFisico.peso / Math.pow((this.efs.ExamenFisico.talla/100),2);
    let sexo = this.datospaServ.DatosUsuario.sexo;
    return this.http.get<RespuestaGrafica>(this._baseUrlHC + '/api/Graficas/ObtenerImcEdad?imc=' + this.efs.ExamenFisico.imc + '&edad=' + edad + '&sexo=' + sexo + '&PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  ObtenerPesoEdad() {
    let edad = this.Hc.seguimientoPrograma.edadActualMeses;
    let sexo = this.datospaServ.DatosUsuario.sexo;
    let peso = this.efs.ExamenFisico.peso;
    return this.http.get<RespuestaGrafica>(this._baseUrlHC + '/api/Graficas/ObtenerPesoEdad?peso=' + peso + '&edad=' + edad + '&sexo=' + sexo + '&PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" })
  }

  cargarDatosHistoricosPadreHijos(datos: VMPaciente) {
    
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerHCCrecimientoDesarrolloPorPaciente?paciente=' + datos.id, { responseType: "json" }).subscribe(
      (response) => {
        
        if (response != null) {
          this.datosMarcardosMchat = response.mchat;
          this.datosMarcardosAie3 = response.aie3;
          //this.datosMarcardosVale = response.vale;
          this.datosMarcardosVale = [];
          this.datosMarcardosLactancia = response.lactancia;
        }

        this.lactanciaPreguntas = new lactanciaCuestionario();
        this.mchatService.ObtenerDatos(this.datosMarcardosMchat)
        this.valeService.ObtenerDatosVale(this.datosMarcardosVale, datos.edadMeses)
        /** EAD-3 */
        this.aie3Service.ObtenerDatos(this.datosMarcardosAie3)
        /** El AIEPI no esta porque la consulta es diferente */
        this.lactanciaService.ObtenerDatos(this.datosMarcardosLactancia)
      }, (error) => {
      })
  }

  cargarDatosReimpresionPadreHijos() {
    this.mchatService.ObtenerDatos("")
    /**VALE lleva edad pero como es para reimpresion se debe poner la edad guardada */
    this.valeService.ObtenerDatos("")
    /** EAD-3 */
    this.aie3Service.ObtenerDatos("")
    /** El AIEPI no esta porque la consulta es diferente */
    this.lactanciaService.ObtenerDatos("")
    this.aiepi.ObtenerDatos();
  }


  ObtenerHistoricoApgarFamiliogramaEcomapa(paciente: number) {
    return this.http.get<Array<VMApgar>>(this._baseUrlHC + '/api/Historicos/ObtenerHistorialApgarCrecimiento?PacienteId=' + paciente)
      .subscribe((responses) => {
        this.historicoApgar = responses;
      }, (error) => {
      })
  }

}
