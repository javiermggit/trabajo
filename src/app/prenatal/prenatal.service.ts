import { Injectable, Inject } from '@angular/core';
import { Grafica } from '../Modelos/CrecimientoDesarrollo';
import { HttpClient } from '@angular/common/http';
import { ExamenesDeIngresoTrimestre, MonitoreoProgramaPrenatalFeto, MonitoreoProgramaPrenatalMadre, PlanDeCuidadoPrenatal, Prenatal } from '../Modelos/Prenatal';
import { DatosPacienteService } from '../datos-paciente/datos-paciente.service';
import { ExamenFisicoService } from '../morbilidad/examen-fisico/examen-fisico.service';
import { IsExamenesDeIngresoTrimestre } from '../Modelos/IsExamenesDeIngresoTrimestre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrenatalService {

  public Hc: Prenatal;
  public Datos: Grafica;
  _baseUrlHC: string;

  SwPrimeraVez: boolean;
  public listadoAntecedenteHisPrenatal: any;
  public listadoHistoricoPrenatal: Array<any>;
  habilitarCampos: boolean = false;

  habilitarCampoEOPC: boolean = false;
  habilitarCampoArtritis: boolean = false;
  habilitarCampoTiroide: boolean = false;
  habilitarCampoObesidad: boolean = false;

  isExamenesDeIngresoSegundoTrimestre: IsExamenesDeIngresoTrimestre;
  isExamenesDeIngresoPrimerTrimestre: IsExamenesDeIngresoTrimestre;
  isExamenesDeIngresoTercerTrimestre: IsExamenesDeIngresoTrimestre;

  examenesDeIngresoTrimestreAnnarResultado: ExamenesDeIngresoTrimestre = new ExamenesDeIngresoTrimestre();

  constructor(
    private http: HttpClient,
    public datospaServ: DatosPacienteService,
    public examen: ExamenFisicoService
    //@Inject('URLHc') baseUrlHc: string
  ) {

    this.isExamenesDeIngresoSegundoTrimestre = new IsExamenesDeIngresoTrimestre();
    this.isExamenesDeIngresoPrimerTrimestre = new IsExamenesDeIngresoTrimestre();
    this.isExamenesDeIngresoTercerTrimestre = new IsExamenesDeIngresoTrimestre();
    this.Hc = new Prenatal();


    this.Hc.monitoreoProgramaPrenatalMadre.fechaConsulta = new Date().toISOString().slice(0, 10);

    this._baseUrlHC = environment.URLHc;

    this.examenesDeIngresoTrimestreAnnarResultado = new ExamenesDeIngresoTrimestre();

  }

  ObtenerPrenatalResultadosAnnar(idPaciente: number, swPrimeraVez: boolean) {
    this.SwPrimeraVez = swPrimeraVez;
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimosResultadosLaboratorioAnnarPrenatal?pacienteId=' + idPaciente, { responseType: "json" }).subscribe((response) => {

      this.examenesDeIngresoTrimestreAnnarResultado = response;
      
      if (swPrimeraVez) {
        for (let key in this.Hc.examenesDeIngresoPrimerTrimestre) {
          let child = this.Hc.examenesDeIngresoPrimerTrimestre[key];
          if (child == "" || child == null) {

            this.Hc.examenesDeIngresoPrimerTrimestre[key] = this.examenesDeIngresoTrimestreAnnarResultado[key];
          }
        }
      } else {
        var semanasGestacion = this.obtenerSemanaGestacional();

        if (semanasGestacion > 24) {
          this.validarExamenTrimestre(this.Hc.examenesDeIngresoTercerTrimestre, this.examenesDeIngresoTrimestreAnnarResultado);
        } else if (semanasGestacion > 12) {
          this.validarExamenTrimestre(this.Hc.examenesDeIngresoSegundoTrimestre, this.examenesDeIngresoTrimestreAnnarResultado);
        } else if (semanasGestacion > 1) {
          this.validarExamenTrimestre(this.Hc.examenesDeIngresoPrimerTrimestre, this.examenesDeIngresoTrimestreAnnarResultado);
        }
      }
    }, err => {
    })
  }


  validarExamenTrimestre(modeloActual: ExamenesDeIngresoTrimestre, examenesAnnar: ExamenesDeIngresoTrimestre) {

    if (modeloActual.resultadoHemograma == null) {
      modeloActual.resultadoHemograma = examenesAnnar.resultadoHemograma;
    } else {

      var date1: Date = new Date(modeloActual.fechaResultadoHemograma);
      var date2: Date = new Date(examenesAnnar.fechaResultadoHemograma);
      if (date1 < date2) {
        modeloActual.resultadoHemograma = examenesAnnar.resultadoHemograma;
      }
    }


    if (modeloActual.resultadoGlicemia != null && modeloActual.resultadoGlicemia != 0) {
      var date1: Date = new Date(modeloActual.fechaResultadoGlicemia);
      var date2: Date = new Date(examenesAnnar.fechaResultadoGlicemia);
      if (date1 < date2) {
        modeloActual.resultadoGlicemia = examenesAnnar.resultadoGlicemia;
      }
    } else {
      modeloActual.resultadoGlicemia = examenesAnnar.resultadoGlicemia;
    }

    if (modeloActual.resultadoHematocrito != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoHematocrito);
      var date2: Date = new Date(examenesAnnar.fechaResultadoHematocrito);
      if (date1 < date2) {
        modeloActual.resultadoHematocrito = examenesAnnar.resultadoHematocrito;
      }
    } else {
      modeloActual.resultadoHematocrito = examenesAnnar.resultadoHematocrito;
    }

    if (modeloActual.resultadoHemoglobina != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoHemoglobina);
      var date2: Date = new Date(examenesAnnar.fechaResultadoHemoglobina);
      if (date1 < date2) {
        modeloActual.resultadoHemoglobina = examenesAnnar.resultadoHemoglobina;
      }
    } else {
      modeloActual.resultadoHemoglobina = examenesAnnar.resultadoHemoglobina;
    }

    if (modeloActual.resultadoToxoplasmaIgG != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoToxoplasmaIgG);
      var date2: Date = new Date(examenesAnnar.fechaResultadoToxoplasmaIgG);
      if (date1 < date2) {
        modeloActual.resultadoToxoplasmaIgG = examenesAnnar.resultadoToxoplasmaIgG;
      }
    } else {
      modeloActual.resultadoToxoplasmaIgG = examenesAnnar.resultadoToxoplasmaIgG;
    }

    if (modeloActual.resultadoToxoplasmaIgM != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoToxoplasmaIgM);
      var date2: Date = new Date(examenesAnnar.fechaResultadoToxoplasmaIgM);
      if (date1 < date2) {
        modeloActual.resultadoToxoplasmaIgM = examenesAnnar.resultadoToxoplasmaIgM;
      }
    } else {
      modeloActual.resultadoToxoplasmaIgM = examenesAnnar.resultadoToxoplasmaIgM;
    }


    if (modeloActual.resultadoVDRL != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoVDRL);
      var date2: Date = new Date(examenesAnnar.fechaResultadoVDRL);
      if (date1 < date2) {
        modeloActual.resultadoVDRL = examenesAnnar.resultadoVDRL;
      }
    } else {
      modeloActual.resultadoVDRL = examenesAnnar.resultadoVDRL;
    }

    if (modeloActual.resultadoVIH != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoVIH);
      var date2: Date = new Date(examenesAnnar.fechaResultadoVIH);
      if (date1 < date2) {
        modeloActual.resultadoVIH = examenesAnnar.resultadoVIH;
      }
    } else {
      modeloActual.resultadoVIH = examenesAnnar.resultadoVIH;
    }


    if (modeloActual.resultadoPruebaRapidaVDRL != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoPruebaRapidaVDRL);
      var date2: Date = new Date(examenesAnnar.fechaResultadoPruebaRapidaVDRL);
      if (date1 < date2) {
        modeloActual.resultadoPruebaRapidaVDRL = examenesAnnar.resultadoPruebaRapidaVDRL;
      }
    } else {
      modeloActual.resultadoPruebaRapidaVDRL = examenesAnnar.resultadoPruebaRapidaVDRL;
    }


    if (modeloActual.resultadoPruebaRapidaVIH != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoPruebaRapidaVIH);
      var date2: Date = new Date(examenesAnnar.fechaResultadoPruebaRapidaVIH);
      if (date1 < date2) {
        modeloActual.resultadoPruebaRapidaVIH = examenesAnnar.resultadoPruebaRapidaVIH;
      }
    } else {
      modeloActual.resultadoPruebaRapidaVIH = examenesAnnar.resultadoPruebaRapidaVIH;
    }

    if (modeloActual.resultadoParcialOrina != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoParcialOrina);
      var date2: Date = new Date(examenesAnnar.fechaResultadoParcialOrina);
      if (date1 < date2) {
        modeloActual.resultadoParcialOrina = examenesAnnar.resultadoParcialOrina;
      }
    } else {
      modeloActual.resultadoParcialOrina = examenesAnnar.resultadoParcialOrina;
    }

    if (modeloActual.resultadoUrocultivo != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoUrocultivo);
      var date2: Date = new Date(examenesAnnar.fechaResultadoUrocultivo);
      if (date1 < date2) {
        modeloActual.resultadoUrocultivo = examenesAnnar.resultadoUrocultivo;
      }
    } else {
      modeloActual.resultadoUrocultivo = examenesAnnar.resultadoUrocultivo;
    }

    if (modeloActual.resultadoPruebaHBsAG != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoPruebaHBsAG);
      var date2: Date = new Date(examenesAnnar.fechaResultadoPruebaHBsAG);
      if (date1 < date2) {
        modeloActual.resultadoPruebaHBsAG = examenesAnnar.resultadoPruebaHBsAG;
      }
    } else {
      modeloActual.resultadoPruebaHBsAG = examenesAnnar.resultadoPruebaHBsAG;
    }

    if (modeloActual.resultadoCoombsIndirecto != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoCoombsIndirecto);
      var date2: Date = new Date(examenesAnnar.fechaResultadoCoombsIndirecto);
      if (date1 < date2) {
        modeloActual.resultadoCoombsIndirecto = examenesAnnar.resultadoCoombsIndirecto;
      }
    } else {
      modeloActual.resultadoCoombsIndirecto = examenesAnnar.resultadoCoombsIndirecto;
    }

    if (modeloActual.resultadoCurvaToleranciaGlucosa != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoCurvaToleranciaGlucosa);
      var date2: Date = new Date(examenesAnnar.fechaResultadoCurvaToleranciaGlucosa);
      if (date1 < date2) {
        modeloActual.resultadoCurvaToleranciaGlucosa = examenesAnnar.resultadoCurvaToleranciaGlucosa;
      }
    } else {
      modeloActual.resultadoCurvaToleranciaGlucosa = examenesAnnar.resultadoCurvaToleranciaGlucosa;
    }


    if (modeloActual.resultadoFrotisVaginal != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoFrotisVaginal);
      var date2: Date = new Date(examenesAnnar.fechaResultadoFrotisVaginal);
      if (date1 < date2) {
        modeloActual.resultadoFrotisVaginal = examenesAnnar.resultadoFrotisVaginal;
      }
    } else {
      modeloActual.resultadoFrotisVaginal = examenesAnnar.resultadoFrotisVaginal;
    }

    if (modeloActual.resultadoGlucosa != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoGlucosa);
      var date2: Date = new Date(examenesAnnar.fechaResultadoGlucosa);
      if (date1 < date2) {
        modeloActual.resultadoGlucosa = examenesAnnar.resultadoGlucosa;
      }
    } else {
      modeloActual.resultadoGlucosa = examenesAnnar.resultadoGlucosa;
    }


    if (modeloActual.resultadoGlucosaPre != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoGlucosaPre);
      var date2: Date = new Date(examenesAnnar.fechaResultadoGlucosaPre);
      if (date1 < date2) {
        modeloActual.resultadoGlucosaPre = examenesAnnar.resultadoGlucosaPre;
      }
    } else {
      modeloActual.resultadoGlucosaPre = examenesAnnar.resultadoGlucosaPre;
    }


    if (modeloActual.resultadoGlucosaPost != null) {
      var date1: Date = new Date(modeloActual.fechaResultadoGlucosaPost);
      var date2: Date = new Date(examenesAnnar.fechaResultadoGlucosaPost);
      if (date1 < date2) {
        modeloActual.resultadoGlucosaPost = examenesAnnar.resultadoGlucosaPost;
      }
    } else {
      modeloActual.resultadoGlucosaPost = examenesAnnar.resultadoGlucosaPost;
    }

  }

  obtenerSemanaGestacional() {
    var startDate = this.Hc.gestacionActual.fechaUltimaMenstruacion;
    var endDate = new Date();

    var millisecondsPorSemana = 24 * 60 * 60 * 1000 * 7;
    var endD = this.treatAsUTC(endDate) as any;
    var startD = this.treatAsUTC(startDate) as any;
    var diasEntre = (endD - startD) / millisecondsPorSemana;
    var cantSemDecimal = Number(diasEntre.toFixed(2))
    var cantSemanas = parseInt(diasEntre + "")
    var dias = (((cantSemDecimal - cantSemanas) * 7) - 1).toFixed(0);
    var variable = cantSemanas + "." + Math.abs(parseInt(dias));
    this.Hc.gestacionActual.edadGestacionalFechaUltimaMentruacion = Number(variable);
    this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion = this.Hc.gestacionActual.edadGestacionalFechaUltimaMentruacion;



    return this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion;
  }


  cargarDatosHistoricos(id) {

    this.isExamenesDeIngresoSegundoTrimestre = new IsExamenesDeIngresoTrimestre();
    this.isExamenesDeIngresoPrimerTrimestre = new IsExamenesDeIngresoTrimestre();
    this.isExamenesDeIngresoTercerTrimestre = new IsExamenesDeIngresoTrimestre();
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimaConsultaPrenatal?PacienteId=' + id, { responseType: "json" })
      .subscribe(
        (response) => {
          this.habilitarCampos = false;
          if (response.consultaId != 0) {
            //this.habilitarCampos = true;
            this.Hc.hisReproductivaAntObstetricos = response.hisReproductivaAntObstetricos;
            this.Hc.gestacionActual = response.gestacionActual;

            if(this.Hc.gestacionActual.fechaEcografiaObstetrica.toString() != "0001-01-01T00:00:00Z"){
              this.calcularEdadGestacional(this.Hc.gestacionActual.fechaEcografiaObstetrica, this.Hc.gestacionActual.edadGetacionalEcografiaObstetrica);
            }else{
              this.Hc.gestacionActual.fechaEcografiaObstetrica = null
              this.Hc.gestacionActual.edadGetacionalEcografiaObstetrica = null
            }

            this.Hc.monitoreoProgramaPrenatalMadre = new MonitoreoProgramaPrenatalMadre();
            this.Hc.monitoreoProgramaPrenatalMadre.vacunaDPT = response.monitoreoProgramaPrenatalMadre.vacunaDPT;
            this.Hc.monitoreoProgramaPrenatalMadre.fechaVacunaDPT = response.monitoreoProgramaPrenatalMadre.fechaVacunaDPT;
            this.Hc.monitoreoProgramaPrenatalMadre.vacunaInfluenza = response.monitoreoProgramaPrenatalMadre.vacunaInfluenza;
            this.Hc.monitoreoProgramaPrenatalMadre.fechaVacunaInfluenza = response.monitoreoProgramaPrenatalMadre.fechaVacunaInfluenza;

            this.Hc.monitoreoProgramaPrenatalFeto = new MonitoreoProgramaPrenatalFeto();
            this.Hc.monitoreoProgramaPrenatalFeto.numeroFetos = response.monitoreoProgramaPrenatalFeto.numeroFetos;


            this.Hc.examenesDeIngresoPrimerTrimestre = response.examenesDeIngresoPrimerTrimestre;
            //this.validarExamenITrimestre(response.examenesDeIngresoPrimerTrimestre);

            this.Hc.examenesDeIngresoSegundoTrimestre = response.examenesDeIngresoSegundoTrimestre;
            //this.validarExamenIITrimestre(response.examenesDeIngresoSegundoTrimestre);

            this.Hc.examenesDeIngresoTercerTrimestre = response.examenesDeIngresoTercerTrimestre;
            //this.validarExamenIIITrimestre(response.examenesDeIngresoTercerTrimestre);

            this.ObtenerPrenatalResultadosAnnar(id, false);
            this.Hc.otrasPatologiasRelacionadas = response.otrasPatologiasRelacionadas;
            this.Hc.planDeCuidado = response.planDeCuidado == null ? new PlanDeCuidadoPrenatal() : response.planDeCuidado;

            //this.validarOtrasPatologias(response.otrasPatologiasRelacionadas);
          } else {
            this.ObtenerPrenatalResultadosAnnar(id, true);
            // this.habilitarCampos = false;
          }
        }, (error) => {
          this.ObtenerPrenatalResultadosAnnar(id, true);
        })
  }



  calcularEdadGestacional(fechaIngreso: Date, edadGestacionalActual: number) {
    
    var endDate = new Date().getTime();
    var startDate = new Date(fechaIngreso).getTime();

    var semanasTranscurridas = Number(((endDate - startDate) / (1000 * 60 * 60 * 24 * 7)).toFixed(1));
    var totalCantSemana = edadGestacionalActual + semanasTranscurridas;

    this.Hc.gestacionActual.edadGetacionalEcografiaObstetrica = totalCantSemana;
    return true;
    /*
    var cantSemDecimal = Number(diasEntre.toFixed(2))

    var cantSemanas = parseInt((diasEntre) + "")
    var cantSemanasAnt = parseInt((edadGestacionalActual) + "")

    var totalCantSemana = cantSemanas + cantSemanasAnt;

    var dias = (((cantSemDecimal - cantSemanas) * 7) - 1).toFixed(0);
    var diasant = "0";
    if((edadGestacionalActual - cantSemanasAnt) != 0){
       diasant = (((edadGestacionalActual - cantSemanasAnt) * 7) - 1).toFixed(0);
    }

    var totaldias = Number(dias) + Number(diasant);
    var variable = '0';

    if (totaldias > 7) {
      var cantSemana = 0;
      var restaDias = totaldias;
      while (restaDias >= 7) {
        restaDias = restaDias - 7;
        cantSemana += 1;
      }

      variable = (totalCantSemana + cantSemana) + "." + Math.abs(parseInt(restaDias + ""));
    } else {
      variable = totalCantSemana + "." + Math.abs(parseInt(totaldias + ""));
    }

    this.Hc.gestacionActual.edadGetacionalEcografiaObstetrica = Number(variable);
    // this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion = this.prenatalServicio.Hc.gestacionActual.edadGestacionalFechaUltimaMentruacion;
    return true; */
  }

  treatAsUTC(date) {
    
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }


  cargarDatosHistoricosSeguimiento() {

    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Historicos/ObtenerPrenatalHC?PacienteId=' + this.datospaServ.DatosUsuario.id, { responseType: "json" });
  }

  validarOtrasPatologias(dato) {
    this.habilitarCampoEOPC = dato.enfermedadCardioPulmonarEpoc;
    this.habilitarCampoArtritis = dato.artritisReumatoide;
    this.habilitarCampoTiroide = dato.tiroidesAlterada;
    this.habilitarCampoObesidad = dato.obesidad;
  }

  ObtenerAlturaUterina() {
    let edad = this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion;
    let altura = this.Hc.monitoreoProgramaPrenatalFeto.alturaUterina == null ? this.Hc.monitoreoProgramaPrenatalFeto.altura_Uterina : this.Hc.monitoreoProgramaPrenatalFeto.alturaUterina;
    return this.http.get<Grafica>(this._baseUrlHC + '/api/Graficas/ObtenerAlturaUterina?edadSemana=' + edad + '&PacienteId=' + this.datospaServ.DatosUsuario.id + '&altura=' + altura, { responseType: "json" })
  }

  ObtenerIncrementoPesoMaterno() {
    let edad = this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion;
    let imc = this.Hc.monitoreoProgramaPrenatalMadre.indiceMasaCorporal;

    return this.http.get<Grafica>(this._baseUrlHC + '/api/Graficas/ObtenerIncrementoPesoMaterno?edadSemana=' + edad + '&PacienteId=' + this.datospaServ.DatosUsuario.id + '&imc=' + imc, { responseType: "json" })
  }

  PresionSistolica() {

    let edad = this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion;
    let presion = this.examen.ExamenFisico.presionSistolica;

    return this.http.get<Grafica>(this._baseUrlHC + '/api/Graficas/ObtenerGraficaPresionSistolica?edadSemana=' + edad + '&PacienteId=' + this.datospaServ.DatosUsuario.id + '&presion=' + presion, { responseType: "json" })
  }

  PresionDiastolica() {

    let edad = this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion;
    let presion = this.examen.ExamenFisico.presionDiastolica;

    return this.http.get<Grafica>(this._baseUrlHC + '/api/Graficas/ObtenerGraficaPresionDiastolica?edadSemana=' + edad + '&PacienteId=' + this.datospaServ.DatosUsuario.id + '&presion=' + presion, { responseType: "json" })
  }

  Glicemia() {

    let edad = this.Hc.monitoreoProgramaPrenatalMadre.semanasGestacion;
    let glicemiaI = this.Hc.examenesDeIngresoPrimerTrimestre.resultadoGlicemia == null ? "0" : this.Hc.examenesDeIngresoPrimerTrimestre.resultadoGlicemia;
    let glicemiaII = this.Hc.examenesDeIngresoSegundoTrimestre.resultadoGlicemia == null ? "0" : this.Hc.examenesDeIngresoSegundoTrimestre.resultadoGlicemia;
    let glicemiaIII = this.Hc.examenesDeIngresoTercerTrimestre.resultadoGlicemia == null ? "0" : this.Hc.examenesDeIngresoTercerTrimestre.resultadoGlicemia;
    let fglicemiaI = this.Hc.examenesDeIngresoPrimerTrimestre.fechaResultadoGlicemia == null ? "" : this.Hc.examenesDeIngresoPrimerTrimestre.fechaResultadoGlicemia;
    let fglicemiaII = this.Hc.examenesDeIngresoSegundoTrimestre.fechaResultadoGlicemia == null ? "" : this.Hc.examenesDeIngresoSegundoTrimestre.fechaResultadoGlicemia;
    let fglicemiaIII = this.Hc.examenesDeIngresoTercerTrimestre.fechaResultadoGlicemia == null ? "" : this.Hc.examenesDeIngresoTercerTrimestre.fechaResultadoGlicemia;

    return this.http.get<Grafica>(this._baseUrlHC + '/api/Graficas/ObtenerGraficaGlicemia?edadSemana=' + edad + '&PacienteId=' + this.datospaServ.DatosUsuario.id + '&glicemiaI=' + glicemiaI + '&glicemiaII=' + glicemiaII + '&glicemiaIII=' + glicemiaIII + '&fglicemiaI=' + fglicemiaI + '&fglicemiaII=' + fglicemiaII + '&fglicemiaIII=' + fglicemiaIII, { responseType: "json" })
  }

  validarExamenITrimestre(datos) {

    if (datos.resultadoHemograma != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoHemograma = true;
    }

    if (datos.fechaResultadoHemograma != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoHemograma = true;
    }

    if (datos.resultadoGlicemia != null && datos.resultadoGlicemia != 0) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoGlicemia = true;
    }

    if (datos.fechaResultadoGlicemia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoGlicemia = true;
    }

    if (datos.resultadoHematocrito != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoHematocrito = true;
    }

    if (datos.fechaResultadoHematocrito != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoHematocrito = true;
    }

    if (datos.resultadoHemoglobina != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoHemoglobina = true;
    }

    if (datos.fechaResultadoHemoglobina != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoHemoglobina = true;
    }

    if (datos.resultadoVDRL != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoVDRL = true;
    }

    if (datos.fechaResultadoVDRL != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoVDRL = true;
    }

    if (datos.resultadoVIH != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoVIH = true;
    }

    if (datos.fechaResultadoVIH != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoVIH = true;
    }
    if (datos.resultadoPruebaRapidaVDRL != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoPruebaRapidaVDRL = true;
    }

    if (datos.fechaResultadoPruebaRapidaVDRL != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoPruebaRapidaVDRL = true;
    }
    if (datos.resultadoPruebaRapidaVIH != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoPruebaRapidaVIH = true;
    }

    if (datos.fechaResultadoPruebaRapidaVIH != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoPruebaRapidaVIH = true;
    }
    if (datos.resultadoParcialOrina != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoParcialOrina = true;
    }

    if (datos.fechaResultadoParcialOrina != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoParcialOrina = true;
    }
    if (datos.resultadoUrocultivo != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoUrocultivo = true;
    }

    if (datos.fechaResultadoUrocultivo != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoUrocultivo = true;
    }
    if (datos.resultadoPruebaHBsAG != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoPruebaHBsAG = true;
    }

    if (datos.fechaResultadoPruebaHBsAG != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoPruebaHBsAG = true;
    }
    if (datos.resultadoTestOSullivan != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoTestOSullivan = true;
    }

    if (datos.fechaResultadoTestOSullivan != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoTestOSullivan = true;
    }
    if (datos.resultadoToxoplasmaIgG != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoToxoplasmaIgG = true;
    }

    if (datos.fechaResultadoToxoplasmaIgG != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoToxoplasmaIgG = true;
    }
    if (datos.resultadoToxoplasmaIgM != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoToxoplasmaIgM = true;
    }

    if (datos.fechaResultadoToxoplasmaIgM != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoToxoplasmaIgM = true;
    }
    if (datos.resultadoCoombsIndirecto != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoCoombsIndirecto = true;
    }

    if (datos.fechaResultadoCoombsIndirecto != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoCoombsIndirecto = true;
    }
    if (datos.resultadoCurvaToleranciaGlucosa != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoCurvaToleranciaGlucosa = true;
    }

    if (datos.fechaResultadoCurvaToleranciaGlucosa != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoCurvaToleranciaGlucosa = true;
    }
    if (datos.resultadoCitologia != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoCitologia = true;
    }

    if (datos.fechaResultadoCitologia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoCitologia = true;
    }
    if (datos.resultadoFrotisVaginal != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoFrotisVaginal = true;
    }

    if (datos.fechaResultadoFrotisVaginal != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoFrotisVaginal = true;
    }
    if (datos.resultadoEcoObstetrica != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoEcoObstetrica = true;
    }

    if (datos.fechaResultadoEcoObstetrica != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoEcoObstetrica = true;
    }
    if (datos.resultadoOtraEcografia != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoOtraEcografia = true;
    }

    if (datos.fechaResultadoOtraEcografia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoOtraEcografia = true;
    }

    if (datos.fechaResultadoGlucosa != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoGlucosa = true;
    }

    if (datos.resultadoGlucosa != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoGlucosa = true;
    }

    if (datos.fechaResultadoGlucosaPre != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoGlucosaPre = true;
    }

    if (datos.resultadoGlucosaPre != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoGlucosaPre = true;
    }

    if (datos.fechaResultadoGlucosaPost != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoPrimerTrimestre.isFechaResultadoGlucosaPost = true;
    }

    if (datos.resultadoGlucosaPost != null) {
      this.isExamenesDeIngresoPrimerTrimestre.isResultadoGlucosaPost = true;
    }

  }

  validarExamenIITrimestre(datos) {
    if (datos.resultadoHemograma != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoHemograma = true;
    }

    if (datos.fechaResultadoHemograma != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoHemograma = true;
    }

    if (datos.resultadoGlicemia != null || datos.resultadoGlicemia != 0) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoGlicemia = true;
    }

    if (datos.fechaResultadoGlicemia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoGlicemia = true;
    }

    if (datos.resultadoHematocrito != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoHematocrito = true;
    }

    if (datos.fechaResultadoHematocrito != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoHematocrito = true;
    }

    if (datos.resultadoHemoglobina != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoHemoglobina = true;
    }

    if (datos.fechaResultadoHemoglobina != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoHemoglobina = true;
    }

    if (datos.resultadoVDRL != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoVDRL = true;
    }

    if (datos.fechaResultadoVDRL != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoVDRL = true;
    }

    if (datos.resultadoVIH != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoVIH = true;
    }

    if (datos.fechaResultadoVIH != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoVIH = true;
    }

    if (datos.resultadoPruebaRapidaVDRL != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoPruebaRapidaVDRL = true;
    }

    if (datos.fechaResultadoPruebaRapidaVDRL != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoPruebaRapidaVDRL = true;
    }
    if (datos.resultadoPruebaRapidaVIH != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoPruebaRapidaVIH = true;
    }

    if (datos.fechaResultadoPruebaRapidaVIH != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoPruebaRapidaVIH = true;
    }
    if (datos.resultadoParcialOrina != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoParcialOrina = true;
    }

    if (datos.fechaResultadoParcialOrina != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoParcialOrina = true;
    }
    if (datos.resultadoUrocultivo != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoUrocultivo = true;
    }

    if (datos.fechaResultadoUrocultivo != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoUrocultivo = true;
    }
    if (datos.resultadoPruebaHBsAG != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoPruebaHBsAG = true;
    }

    if (datos.fechaResultadoPruebaHBsAG != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoPruebaHBsAG = true;
    }
    if (datos.resultadoTestOSullivan != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoTestOSullivan = true;
    }

    if (datos.fechaResultadoTestOSullivan != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoTestOSullivan = true;
    }
    if (datos.resultadoToxoplasmaIgG != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoToxoplasmaIgG = true;
    }

    if (datos.fechaResultadoToxoplasmaIgG != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoToxoplasmaIgG = true;
    }
    if (datos.resultadoToxoplasmaIgM != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoToxoplasmaIgM = true;
    }

    if (datos.fechaResultadoToxoplasmaIgM != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoToxoplasmaIgM = true;
    }
    if (datos.resultadoCoombsIndirecto != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoCoombsIndirecto = true;
    }

    if (datos.fechaResultadoCoombsIndirecto != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoCoombsIndirecto = true;
    }
    if (datos.resultadoCurvaToleranciaGlucosa != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoCurvaToleranciaGlucosa = true;
    }

    if (datos.fechaResultadoCurvaToleranciaGlucosa != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoCurvaToleranciaGlucosa = true;
    }
    if (datos.resultadoCitologia != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoCitologia = true;
    }

    if (datos.fechaResultadoCitologia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoCitologia = true;
    }
    if (datos.resultadoFrotisVaginal != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoFrotisVaginal = true;
    }

    if (datos.fechaResultadoFrotisVaginal != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoFrotisVaginal = true;
    }
    if (datos.resultadoEcoObstetrica != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoEcoObstetrica = true;
    }

    if (datos.fechaResultadoEcoObstetrica != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoEcoObstetrica = true;
    }
    if (datos.resultadoOtraEcografia != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoOtraEcografia = true;
    }

    if (datos.fechaResultadoOtraEcografia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoOtraEcografia = true;
    }

    if (datos.fechaResultadoGlucosa != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoGlucosa = true;
    }

    if (datos.resultadoGlucosa != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoGlucosa = true;
    }

    if (datos.fechaResultadoGlucosaPre != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoGlucosaPre = true;
    }

    if (datos.resultadoGlucosaPre != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoGlucosaPre = true;
    }

    if (datos.fechaResultadoGlucosaPost != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoSegundoTrimestre.isFechaResultadoGlucosaPost = true;
    }

    if (datos.resultadoGlucosaPost != null) {
      this.isExamenesDeIngresoSegundoTrimestre.isResultadoGlucosaPost = true;
    }

  }

  validarExamenIIITrimestre(datos) {
    if (datos.resultadoHemograma != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoHemograma = true;
    }

    if (datos.fechaResultadoHemograma != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoHemograma = true;
    }

    if (datos.resultadoGlicemia != null || datos.resultadoGlicemia != 0) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoGlicemia = true;
    }

    if (datos.fechaResultadoGlicemia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoGlicemia = true;
    }


    if (datos.resultadoHematocrito != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoHematocrito = true;
    }

    if (datos.fechaResultadoHematocrito != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoHematocrito = true;
    }

    if (datos.resultadoHemoglobina != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoHemoglobina = true;
    }

    if (datos.fechaResultadoHemoglobina != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoHemoglobina = true;
    }

    if (datos.resultadoVDRL != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoVDRL = true;
    }

    if (datos.fechaResultadoVDRL != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoVDRL = true;
    }

    if (datos.resultadoVIH != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoVIH = true;
    }

    if (datos.fechaResultadoVIH != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoVIH = true;
    }
    if (datos.resultadoPruebaRapidaVDRL != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoPruebaRapidaVDRL = true;
    }

    if (datos.fechaResultadoPruebaRapidaVDRL != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoPruebaRapidaVDRL = true;
    }
    if (datos.resultadoPruebaRapidaVIH != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoPruebaRapidaVIH = true;
    }

    if (datos.fechaResultadoPruebaRapidaVIH != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoPruebaRapidaVIH = true;
    }
    if (datos.resultadoParcialOrina != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoParcialOrina = true;
    }

    if (datos.fechaResultadoParcialOrina != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoParcialOrina = true;
    }
    if (datos.resultadoUrocultivo != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoUrocultivo = true;
    }

    if (datos.fechaResultadoUrocultivo != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoUrocultivo = true;
    }
    if (datos.resultadoPruebaHBsAG != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoPruebaHBsAG = true;
    }

    if (datos.fechaResultadoPruebaHBsAG != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoPruebaHBsAG = true;
    }
    if (datos.resultadoTestOSullivan != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoTestOSullivan = true;
    }

    if (datos.fechaResultadoTestOSullivan != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoTestOSullivan = true;
    }
    if (datos.resultadoToxoplasmaIgG != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoToxoplasmaIgG = true;
    }

    if (datos.fechaResultadoToxoplasmaIgG != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoToxoplasmaIgG = true;
    }

    if (datos.resultadoToxoplasmaIgM != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoToxoplasmaIgM = true;
    }

    if (datos.fechaResultadoToxoplasmaIgM != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoToxoplasmaIgM = true;
    }
    if (datos.resultadoCoombsIndirecto != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoCoombsIndirecto = true;
    }

    if (datos.fechaResultadoCoombsIndirecto != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoCoombsIndirecto = true;
    }
    if (datos.resultadoCurvaToleranciaGlucosa != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoCurvaToleranciaGlucosa = true;
    }

    if (datos.fechaResultadoCurvaToleranciaGlucosa != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoCurvaToleranciaGlucosa = true;
    }
    if (datos.resultadoCitologia != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoCitologia = true;
    }

    if (datos.fechaResultadoCitologia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoCitologia = true;
    }
    if (datos.resultadoFrotisVaginal != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoFrotisVaginal = true;
    }

    if (datos.fechaResultadoFrotisVaginal != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoFrotisVaginal = true;
    }

    if (datos.resultadoEcoObstetrica != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoEcoObstetrica = true;
    }

    if (datos.fechaResultadoEcoObstetrica != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoEcoObstetrica = true;
    }

    if (datos.resultadoOtraEcografia != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoOtraEcografia = true;
    }

    if (datos.fechaResultadoOtraEcografia != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoOtraEcografia = true;
    }

    if (datos.resultadoOtraEcografia != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoOtraEcografia = true;
    }

    if (datos.fechaResultadoGlucosa != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoGlucosa = true;
    }

    if (datos.resultadoGlucosa != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoGlucosa = true;
    }

    if (datos.fechaResultadoGlucosaPre != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoGlucosaPre = true;
    }

    if (datos.resultadoGlucosaPre != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoGlucosaPre = true;
    }

    if (datos.fechaResultadoGlucosaPost != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoGlucosaPost = true;
    }

    if (datos.resultadoGlucosaPost != null) {
      this.isExamenesDeIngresoTercerTrimestre.isResultadoGlucosaPost = true;
    }

    if (datos.fechaResultadoCultivoVaginoRectal != "0001-01-01T00:00:00Z") {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoCultivoVaginoRectal = true;
    }

    if (datos.resultadoCultivoVaginoRectal != null) {
      this.isExamenesDeIngresoTercerTrimestre.isFechaResultadoGlucosaPost = true;
    }

    /* public isResultadoGlucosa: boolean = false;
       public isResultadoGlucosaPre: boolean = false;
       public isResultadoGlucosaPost: boolean = false;
       public isResultadoCultivoVaginoRectal: boolean = false;*/
  }

  cargarDatosHistoricosPorCita(id) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerHCPrenatalPorCita?cita=' + id, { responseType: "json" })
      .subscribe(
        (response) => {

          this.Hc = response;
        }, (error) => {

        })
  }



}



