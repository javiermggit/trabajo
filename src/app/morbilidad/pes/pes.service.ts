import { Injectable, Inject } from '@angular/core';
import { SindromeMetabolico, Hipertension, Nefroproteccion, Diabetes, Pes, antecedentes, ResultadoexamenPrograma, clasificacionPatologica, puntajeFramingham, EPOC, Hipotiroidismo, Obesidad, IsResultadoexamenPrograma, VMHistoricoPes, FactoresSindrome, ParExamenes, VMDiagConfirmatorio, DatosReferenciaTFG, TestMoriskGreen, PlanificacionFamiliar, AntecedentesRelacionadas } from 'src/app/Modelos/Pes';
import { HttpClient } from '@angular/common/http';
import { ParametroService } from 'src/app/parametros/parametro.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PesService {

  public pes: Pes;
  public ListadoTipoSindrome: any;
  public ListadoTipoHipertension: any;
  public ListadoTipoDiabetes: any;
  public ListadoTipoERC: any;
  public ListadoPuntajeFramingham: Array<puntajeFramingham>;
  historicoSeguimientoPrograma: Array<any>;
  _baseUrlHC: string;
  _baseURLPar: string;
  public primeraVezResultado: boolean = false;
  public primeraVezHipertenso: boolean = false;
  public primeraVezMetabolico: boolean = false;
  public primeraVezDiabetes: boolean = false;
  public primeraVezNefro: boolean = false;

  public esHipertenso: boolean = false;
  public esMetabolico: boolean = false;
  public esDiabetes: boolean = false;
  public esNefro: boolean = false;
  tratamiento: boolean = false;
  public errors: Array<string> = [];
  puntajeTotalRiesgo: Array<any>;
  valoresNormales: Array<ParExamenes>;
  riesgo: any;
  TGFEstadioBColor: any;
  TGFEstadioColor: any;
  colesterolTotal: string;
  colesterolHDL: string;
  isExamenPrograma: IsResultadoexamenPrograma;
  historicoSeguimiento: VMHistoricoPes;
  primerzVezSelecciona: boolean = false;
  sindromeDX = []
  HTADX = []
  DMDX = []
  ERCDX = []
  replicarFecha: boolean = false;
  replicarFechaSeg: boolean = false;
  fechaAReplicar: Date;
  fechaAReplicarSeg: Date;

  public Sex: number = 0;
  public Edad: number = 35;
  public Talla: number = 35;
  public Peso: number = 35;
  public Creatinine: number = 0;
  public CreatinineUnidad: number;
  public CreatinineUnidades: any[];
  public resultadoCG: any;
  public resultadoMDRD: any;
  public resultadoMDRCkdEpi: any;

  afroAmericano: boolean = false;

  constructor(
    private http: HttpClient,
    //@Inject('URLHc') baseUrlHc: string,
    public ps: ParametroService,
    //@Inject('URLParametrizacion') baseUrlPar: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseURLPar = environment.URLParametrizacion;

    this.pes = new Pes();
    this.pes.resultadoPrograma = new ResultadoexamenPrograma();
    this.pes.seguimientoResultadoPrograma = new ResultadoexamenPrograma();
    this.pes.sindromeMetabolico = new SindromeMetabolico();
    this.pes.sindromeMetabolico.factores = new FactoresSindrome();
    this.pes.hipertension = new Hipertension();
    this.pes.nefroproteccion = new Nefroproteccion();
    this.pes.diabetes = new Diabetes();
    this.pes.epoc = new EPOC();
    this.pes.hipotiroidismo = new Hipotiroidismo();
    this.pes.obesidad = new Obesidad();
    this.pes.antecedentes = new antecedentes();
    this.pes.clasificacion = new clasificacionPatologica();
    this.pes.comentariosFinales = "";
    this.pes.datosReferenciaTFG = new DatosReferenciaTFG();
    this.ObtenerListadoTipoSindrome();
    this.ObtenerListadoTipoHipertension();
    this.ObtenerListadoTipoDiabetes();
    this.ObtenerListadoTipoERC();
    this.ObtenerListadoPuntajeFramingham();



    this.puntajeTotalRiesgo = [
      { puntaje: 0, operador: '<', riesgo: 0, real: 1 },
      { puntaje: 0, operador: '=', riesgo: 1, real: 1 },
      { puntaje: 1, operador: '=', riesgo: 1, real: 1 },
      { puntaje: 2, operador: '=', riesgo: 1, real: 1 },
      { puntaje: 3, operador: '=', riesgo: 1, real: 1 },
      { puntaje: 4, operador: '=', riesgo: 1, real: 1 },
      { puntaje: 5, operador: '=', riesgo: 2, real: 2 },
      { puntaje: 6, operador: '=', riesgo: 2, real: 2 },
      { puntaje: 7, operador: '=', riesgo: 3, real: 3 },
      { puntaje: 8, operador: '=', riesgo: 4, real: 4 },
      { puntaje: 9, operador: '=', riesgo: 5, real: 5 },
      { puntaje: 10, operador: '=', riesgo: 6, real: 6 },
      { puntaje: 11, operador: '=', riesgo: 8, real: 8 },
      { puntaje: 12, operador: '=', riesgo: 10, real: 10 },
      { puntaje: 13, operador: '=', riesgo: 12, real: 12 },
      { puntaje: 14, operador: '=', riesgo: 16, real: 16 },
      { puntaje: 15, operador: '=', riesgo: 20, real: 20 },
      { puntaje: 16, operador: '=', riesgo: 25, real: 25 },
      { puntaje: 17, operador: '>', riesgo: 31, real: 30 },
    ]
  }

  calcularTFG() {
    if (this.pes.resultadoPrograma != undefined) {
      this.Creatinine = 0;
      if (this.pes.seguimientoResultadoPrograma.resultadoCreatinina != null && this.pes.seguimientoResultadoPrograma.resultadoCreatinina != "") {
        this.Creatinine = parseFloat(this.pes.seguimientoResultadoPrograma.resultadoCreatinina)
      } else {
        if(this.pes.resultadoPrograma.resultadoCreatinina != null && this.pes.resultadoPrograma.resultadoCreatinina != ""){
          this.Creatinine = parseFloat(this.pes.resultadoPrograma.resultadoCreatinina)
        }
      }

      var resultadoMDRD = 0;
      if (this.Edad != null && this.Creatinine != null) {
        
        //Femenino
        if (this.Sex == 0 && this.afroAmericano) {
          resultadoMDRD = 186 * Math.pow(this.Creatinine, - 1.154) * Math.pow(this.Edad, - 0.203) * 0.742 * 1.210
        } else if (this.Sex == 0 && !this.afroAmericano) {
          resultadoMDRD = 186 * Math.pow(this.Creatinine, - 1.154) * Math.pow(this.Edad, - 0.203) * 0.742
        } else if (this.Sex == 1 && this.afroAmericano) {
          resultadoMDRD = 186 * Math.pow(this.Creatinine, - 1.154) * Math.pow(this.Edad, - 0.203) * 1.210
        } else if (this.Sex == 1 && !this.afroAmericano) {
          resultadoMDRD = 186 * Math.pow(this.Creatinine, - 1.154) * Math.pow(this.Edad, - 0.203)
        }

        this.pes.clasificacion.resultadoMDRD = resultadoMDRD.toFixed(2);

      }

      var resultadoCkiEpi = 0;
      if (this.Edad != null && this.Creatinine != null) {
        var numInicial = 144;
        //Femenino
        if (this.Sex == 0) {

          if (this.afroAmericano) {
            numInicial = 166
          } else {
            numInicial = 144
          }

          if (this.Creatinine <= 0.7) {
            resultadoCkiEpi = numInicial * Math.pow(this.Creatinine / 0.7, -0.329) * Math.pow(0.993, this.Edad)
          }
          if (this.Creatinine > 0.7) {
            resultadoCkiEpi = numInicial * Math.pow(this.Creatinine / 0.7, -1.209) * Math.pow(0.993, this.Edad)
          }
        }

        //masculino
        if (this.Sex == 1) {

          if (this.afroAmericano) {
            numInicial = 163
          } else {
            numInicial = 141
          }

          if (this.Creatinine <= 0.9) {
            resultadoCkiEpi = numInicial * Math.pow(this.Creatinine / 0.9, -0.411) * Math.pow(0.993, this.Edad)
          }
          if (this.Creatinine > 0.7) {
            resultadoCkiEpi = numInicial * Math.pow(this.Creatinine / 0.9, -1.209) * Math.pow(0.993, this.Edad)
          }
        }
        this.pes.clasificacion.resultadoCkdEpi = resultadoCkiEpi.toFixed(2);
      }

      
      if (this.pes.datosReferenciaTFG != null) {
        this.pes.datosReferenciaTFG.resultadoCkdEpi = resultadoCkiEpi.toFixed(2);
        this.pes.datosReferenciaTFG.resultadoMDRD = resultadoMDRD.toFixed(2);
      }

    }
  }




  ObtenerPes(PacienteId: number) {
    this.primeraVezHipertenso = false;
    this.primeraVezMetabolico = false;
    this.primeraVezDiabetes = false;
    this.primeraVezNefro = false;

    this.esHipertenso = false;
    this.esMetabolico = false;
    this.esDiabetes = false;
    this.esNefro = false;
    this.replicarFecha = false;
    this.fechaAReplicar = null;
    return this.http.get<Pes>(this._baseUrlHC + '/api/Historicos/ObtenerUltimaHCPes?PacienteId=' + PacienteId, { responseType: "json" }).subscribe((response) => {

      if (response.datosReferenciaTFG == undefined) {
        this.pes.datosReferenciaTFG = new DatosReferenciaTFG();
      } else {
        this.pes.datosReferenciaTFG = response.datosReferenciaTFG;
      }

      if (response.testMoriskGreen == undefined) {
        this.pes.testMoriskGreen = new TestMoriskGreen();
      } else {
        this.pes.testMoriskGreen = response.testMoriskGreen;
      }

      if (response.planificacionFamiliar == undefined) {
        this.pes.planificacionFamiliar = new PlanificacionFamiliar();
      } else {
        this.pes.planificacionFamiliar = response.planificacionFamiliar;
      }

      if (response.antecedentesRelacionados == undefined) {
        this.pes.antecedentesRelacionados = new AntecedentesRelacionadas();
      } else {
        this.pes.antecedentesRelacionados = response.antecedentesRelacionados;
      }

      this.pes.esSindromeMetabolico = response.esSindromeMetabolico;
      this.pes.sindromeMetabolico = response.sindromeMetabolico;
      this.pes.esHipertension = response.esHipertension;
      this.pes.hipertension = response.hipertension;
      this.pes.esDiabetes = response.esDiabetes;
      this.pes.diabetes = response.diabetes;
      this.pes.esNefroproteccion = response.esNefroproteccion;
      this.pes.nefroproteccion = response.nefroproteccion;

      //SINDROME METABBOLICO
      if (response.esSindromeMetabolico && response.sindromeMetabolico.diagnosticoConfirmatorio == null) {
        this.pes.sindromeMetabolico.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
        var diagSM = this.ps.ListadoDiagnosticos.filter(x => x.codigo == (response.sindromeMetabolico.diagConfirmatorio).toUpperCase());

        if (diagSM.length > 0) {
          this.pes.sindromeMetabolico.diagnosticoConfirmatorio = { codigo: diagSM[0].codigo, id: diagSM[0].id, descripcion: diagSM[0].descripcion };
          this.sindromeDX.push({ codigo: diagSM[0].codigo, id: diagSM[0].id, descripcion: diagSM[0].descripcion });
        }
      } else if (response.sindromeMetabolico.diagnosticoConfirmatorio != null) {
        this.sindromeDX.push(response.sindromeMetabolico.diagnosticoConfirmatorio);
      }

      //HIPERTENSION
      if (response.esHipertension && response.hipertension.diagnosticoConfirmatorio == null) {
        this.pes.hipertension.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
        var diagHTA = this.ps.ListadoDiagnosticos.filter(x => x.codigo == (response.hipertension.diagConfirmatorio).toUpperCase());

        if (diagHTA.length > 0) {
          this.pes.hipertension.diagnosticoConfirmatorio = { codigo: diagHTA[0].codigo, id: diagHTA[0].id, descripcion: diagHTA[0].descripcion };
          this.HTADX.push({ codigo: diagHTA[0].codigo, id: diagHTA[0].id, descripcion: diagHTA[0].descripcion });
        }

      } else if (response.hipertension.diagnosticoConfirmatorio != null) {
        this.HTADX.push(response.hipertension.diagnosticoConfirmatorio);
      }


      //DIABETES
      if (response.esDiabetes && response.diabetes.diagnosticoConfirmatorio == null) {
        this.pes.diabetes.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
        var diagDM = this.ps.ListadoDiagnosticos.filter(x => x.codigo == (response.diabetes.diagConfirmatorio).toUpperCase());

        if (diagDM.length > 0) {
          this.pes.diabetes.diagnosticoConfirmatorio = { codigo: diagDM[0].codigo, id: diagDM[0].id, descripcion: diagDM[0].descripcion };
          this.DMDX.push({ codigo: diagDM[0].codigo, id: diagDM[0].id, descripcion: diagDM[0].descripcion });
        }
      } else if (response.diabetes.diagnosticoConfirmatorio != null) {
        this.DMDX.push(response.diabetes.diagnosticoConfirmatorio);
      }


      //NEFRO
      if (response.esNefroproteccion && response.nefroproteccion.diagnosticoConfirmatorio == null) {
        this.pes.nefroproteccion.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
        var diagERC = this.ps.ListadoDiagnosticos.filter(x => x.codigo == (response.nefroproteccion.diagConfirmatorio).toUpperCase());

        if (diagERC.length > 0) {
          this.pes.nefroproteccion.diagnosticoConfirmatorio = { codigo: diagERC[0].codigo, id: diagERC[0].id, descripcion: diagERC[0].descripcion };
          this.ERCDX.push({ codigo: diagERC[0].codigo, id: diagERC[0].id, descripcion: diagERC[0].descripcion });
        }
      } else if (response.nefroproteccion.diagnosticoConfirmatorio != null) {
        this.ERCDX.push(response.nefroproteccion.diagnosticoConfirmatorio);
      }



      this.pes.epoc = response.epoc == null ? new EPOC() : response.epoc;
      this.pes.obesidad = response.obesidad == null ? new Obesidad() : response.obesidad;
      this.pes.hipotiroidismo = response.hipotiroidismo == null ? new Hipotiroidismo() : response.hipotiroidismo;
      this.esHipertenso = response.esHipertension;
      this.esMetabolico = response.esSindromeMetabolico;
      this.esDiabetes = response.esDiabetes;
      this.esNefro = response.esNefroproteccion;

      this.obtenerProgramas(PacienteId);

      if (response.resultadoPrograma == undefined) {
        this.isExamenPrograma = new IsResultadoexamenPrograma();
        this.pes.resultadoPrograma = new ResultadoexamenPrograma();
      } else {
        this.pes.resultadoPrograma = response.resultadoPrograma;
        this.isExamenPrograma = new IsResultadoexamenPrograma();
        this.bloquearExamenes(response.resultadoPrograma);

      }

      if (response.clasificacion == undefined) {
        this.pes.clasificacion = new clasificacionPatologica();
      } else {
        this.pes.clasificacion = response.clasificacion;
      }

      this.pes.seguimientoResultadoPrograma = new ResultadoexamenPrograma();
      this.ObtenerPesResultadosAnnar(PacienteId, false);
    }, err => {

      this.pes.esSindromeMetabolico = false;
      this.pes.sindromeMetabolico = new SindromeMetabolico();
      this.pes.sindromeMetabolico.tipoSindrome = { id: 0, descripcion: "" }

      this.pes.esHipertension = false;
      this.pes.hipertension = new Hipertension();
      this.pes.hipertension.tipoHipertension = { id: 0, descripcion: "" }
      this.isExamenPrograma = new IsResultadoexamenPrograma();
      this.pes.esNefroproteccion = false;
      this.pes.nefroproteccion = new Nefroproteccion();
      this.pes.nefroproteccion.etiologiaERC = { id: 0, descripcion: "" }
      this.pes.clasificacion = new clasificacionPatologica();
      this.pes.resultadoPrograma = new ResultadoexamenPrograma();
      this.pes.seguimientoResultadoPrograma = new ResultadoexamenPrograma();
      this.pes.esDiabetes = false;
      this.pes.diabetes = new Diabetes();
      this.pes.epoc = new EPOC();
      this.pes.obesidad = new Obesidad();
      this.pes.hipotiroidismo = new Hipotiroidismo();
      this.pes.diabetes.tipoDiabetes = { id: 0, descripcion: "" }
      this.primeraVezResultado = true;

      this.pes.hipertension.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
      this.pes.sindromeMetabolico.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
      this.pes.diabetes.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
      this.pes.nefroproteccion.diagnosticoConfirmatorio = new VMDiagConfirmatorio();
      this.sindromeDX = []
      this.HTADX = []
      this.DMDX = []
      this.ERCDX = []

      this.pes.datosReferenciaTFG = new DatosReferenciaTFG();
      this.pes.testMoriskGreen = new TestMoriskGreen();
      this.pes.planificacionFamiliar = new PlanificacionFamiliar();
      this.pes.antecedentesRelacionados = new AntecedentesRelacionadas();
      this.ObtenerPesResultadosAnnar(PacienteId, true);
      console.dir(err);
    })
  }

  bloquearExamenes(examen: ResultadoexamenPrograma) {

    if (examen.resultadoCreatinina != "" && examen.resultadoCreatinina != null && examen.resultadoCreatinina != undefined) {
      this.isExamenPrograma.isresultadoCreatinina = true;
    }

    if (examen.resultadoTrigliceridos != "" && examen.resultadoTrigliceridos != null && examen.resultadoTrigliceridos != undefined) {
      this.isExamenPrograma.isresultadoTrigliceridos = true;
    }

    if (examen.resultadoHemoglobina != "" && examen.resultadoHemoglobina != null && examen.resultadoHemoglobina != undefined) {
      this.isExamenPrograma.isresultadoHemoglobina = true;
    }

    if (examen.resultadoPTH != "" && examen.resultadoPTH != null && examen.resultadoPTH != undefined) {
      this.isExamenPrograma.isresultadoPTH = true;
    }
    if (examen.resultadoMicroAlbuminuria != "" && examen.resultadoMicroAlbuminuria != null && examen.resultadoMicroAlbuminuria != undefined) {
      this.isExamenPrograma.isresultadoMicroAlbuminuria = true;
    }
    if (examen.resultadoProteina24H != "" && examen.resultadoProteina24H != null && examen.resultadoProteina24H != undefined) {
      this.isExamenPrograma.isresultadoProteina24H = true;
    }
    /*  if (examen.resultadoMicroAlbuminuria2 != "" && examen.resultadoMicroAlbuminuria2 != null && examen.resultadoMicroAlbuminuria2 != undefined) {
       this.isExamenPrograma.isresultadoMicroAlbuminuria2 = true;
     } */
    if (examen.resultadoCreatinuria != "" && examen.resultadoCreatinuria != null && examen.resultadoCreatinuria != undefined) {
      this.isExamenPrograma.isresultadoCreatinuria = true;
    }
    if (examen.resultadoAlbumina != "" && examen.resultadoAlbumina != null && examen.resultadoAlbumina != undefined) {
      this.isExamenPrograma.isresultadoAlbumina = true;
    }
    if (examen.resultadoGlicemia != "" && examen.resultadoGlicemia != null && examen.resultadoGlicemia != undefined) {
      this.isExamenPrograma.isresultadoGlicemia = true;
    }
    if (examen.resultadoElectrocardiograma != "" && examen.resultadoElectrocardiograma != null && examen.resultadoElectrocardiograma != undefined) {
      this.isExamenPrograma.isresultadoElectrocardiograma = true;
    }
    if (examen.resultadoColesterolTotal != "" && examen.resultadoColesterolTotal != null && examen.resultadoColesterolTotal != undefined) {
      this.isExamenPrograma.isresultadoColesterolTotal = true;
    }
    if (examen.resultadoEcografiaRenal != "" && examen.resultadoEcografiaRenal != null && examen.resultadoEcografiaRenal != undefined) {
      this.isExamenPrograma.isresultadoEcografiaRenal = true;
    }
    if (examen.resultadoColesterolHDL != "" && examen.resultadoColesterolHDL != null && examen.resultadoColesterolHDL != undefined) {
      this.isExamenPrograma.isresultadoColesterolHDL = true;
    }
    if (examen.resultadoPotasio != "" && examen.resultadoPotasio != null && examen.resultadoPotasio != undefined) {
      this.isExamenPrograma.isresultadoPotasio = true;
    }
    if (examen.resultadoColesterolLDL != "" && examen.resultadoColesterolLDL != null && examen.resultadoColesterolLDL != undefined) {
      this.isExamenPrograma.isresultadoColesterolLDL = true;
    }
    if (examen.resultadoFosforo != "" && examen.resultadoFosforo != null && examen.resultadoFosforo != undefined) {
      this.isExamenPrograma.isresultadoFosforo = true;
    }
    if (examen.resultadoUroanalisis != "" && examen.resultadoUroanalisis != null && examen.resultadoUroanalisis != undefined) {
      this.isExamenPrograma.isresultadoUroanalisis = true;
    }


  }
  obtenerProgramas(PacienteId) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Historicos/ObtenerProgramaPes?PacienteId=' + PacienteId, { responseType: "json" })
      .subscribe((response) => {

        this.pes.esSindromeMetabolico = false;
        this.pes.esHipertension = false;
        this.pes.esNefroproteccion = false;
        this.pes.esDiabetes = false;

        response.forEach(e => {

          if (this.esHipertenso && this.esDiabetes && e.programa_Id == 17) {
            this.primeraVezHipertenso = true;
            this.primeraVezDiabetes = true;
            this.pes.esHipertension = true;
            this.pes.esDiabetes = true;
          }

          if (this.esHipertenso && e.programa_Id == 15) {
            this.primeraVezHipertenso = true;
            this.pes.esHipertension = true;
          }

          if (this.esDiabetes && e.programa_Id == 16) {
            this.primeraVezDiabetes = true;
            this.pes.esDiabetes = true;
          }

          if (this.esMetabolico && e.programa_Id == 13) {
            this.primeraVezMetabolico = true;
            this.pes.esSindromeMetabolico = true;
          }

          if (this.esNefro && (e.programa_Id == 14 || e.programa_Id == 18 || e.programa_Id == 19 || e.programa_Id == 20 || e.programa_Id == 21)) {
            this.primeraVezNefro = true;
            this.pes.esNefroproteccion = true;
          }

        });


      });
  }

  ValidarPes() {
    this.errors = [];
    // //#region sindromeMetabolico
    if (this.pes.esSindromeMetabolico) {

      if (this.pes.sindromeMetabolico.fechaIngreso == null) {
        this.pes.sindromeMetabolico.validacionFechaIngreso = true;
        this.errors.push("Fecha de Ingreso al programa (Sindrome Metabolico)");
      } else {
        this.pes.sindromeMetabolico.validacionFechaIngreso = false;
      }

      if (this.pes.sindromeMetabolico.diagConfirmatorio == null || this.pes.sindromeMetabolico.diagConfirmatorio == "") {
        this.pes.sindromeMetabolico.validacionDiagConfirmatorio = true;
        this.errors.push("Diagnóstico confirmatorio (Sindrome Metabolico)");
      } else {
        this.pes.sindromeMetabolico.validacionDiagConfirmatorio = false;
      }

      if (this.pes.sindromeMetabolico.fechaConfirmacionDx == null) {
        this.pes.sindromeMetabolico.validacionFechaConfirmacionDx = true;
        this.errors.push("Fecha de Confirmación del dx (Sindrome Metabolico)");
      } else {
        this.pes.sindromeMetabolico.validacionFechaConfirmacionDx = false;
      }

      if (this.pes.sindromeMetabolico.tipoDiagnostico == null || this.pes.sindromeMetabolico.tipoDiagnostico == "") {
        this.pes.sindromeMetabolico.validacionTipoDiagnostico = true;
        this.errors.push("Tipo de Diagnóstico (Sindrome Metabolico)");
      } else {
        this.pes.sindromeMetabolico.validacionTipoDiagnostico = false;
      }

      if (this.pes.sindromeMetabolico.tipoSindrome == null || this.pes.sindromeMetabolico.tipoSindrome.id == 0) {
        this.pes.sindromeMetabolico.validacionTipoSindrome = true;
        this.errors.push("Tipo de sindrome (Sindrome Metabolico)");
      } else {
        this.pes.sindromeMetabolico.validacionTipoSindrome = false;
      }

      if (this.pes.sindromeMetabolico.edadIngreso <= 0 || this.pes.sindromeMetabolico.edadIngreso == null || this.pes.sindromeMetabolico.edadIngreso > 100) {
        this.pes.sindromeMetabolico.validacionEdadIngreso = true;
        this.errors.push("Edad al ingreso (Sindrome Metabolico)");
      } else {
        this.pes.sindromeMetabolico.validacionEdadIngreso = false;
      }

      if (this.pes.sindromeMetabolico.tasaFilGlomerular == null) {
        this.pes.sindromeMetabolico.validacionTasaFilGlomerular = true;
        this.errors.push("Tasa de filtración glomerular (Sindrome Metabolico)");
      } else {
        this.pes.sindromeMetabolico.validacionTasaFilGlomerular = false;
      }
    }
    //#endregion


    // //#region hipertension
    if (this.pes.esHipertension) {

      if (this.pes.hipertension.fechaIngreso == null) {
        this.pes.hipertension.validacionFechaIngreso = true;
        this.errors.push("Fecha de Ingreso al programa (Hipertension)");
      } else {
        this.pes.hipertension.validacionFechaIngreso = false;
      }

      if (this.pes.hipertension.diagConfirmatorio == null || this.pes.hipertension.diagConfirmatorio == "") {
        this.pes.hipertension.validacionDiagConfirmatorio = true;
        this.errors.push("Diagnóstico confirmatorio (Hipertension)");
      } else {
        this.pes.hipertension.validacionDiagConfirmatorio = false;
      }

      if (this.pes.hipertension.fechaConfirmacionDx == null) {
        this.pes.hipertension.validacionFechaConfirmacionDx = true;
        this.errors.push("Fecha de Confirmación del dx (Hipertension)");
      } else {
        this.pes.hipertension.validacionFechaConfirmacionDx = false;
      }

      if (this.pes.hipertension.tipoHipertension == null || this.pes.hipertension.tipoHipertension.id == 0) {
        this.pes.hipertension.validacionTipoHipertension = true;
        this.errors.push("Tipo de Hipertensión (Hipertension)");
      } else {
        this.pes.hipertension.validacionTipoHipertension = false;
      }

      if (this.pes.hipertension.edadIngreso <= 0 || this.pes.hipertension.edadIngreso == null || this.pes.hipertension.edadIngreso > 100) {
        this.pes.hipertension.validacionEdadIngreso = true;
        this.errors.push("Edad al ingreso (Hipertension)");
      } else {
        this.pes.hipertension.validacionEdadIngreso = false;
      }

      if (this.pes.hipertension.tasaFilGlomerular == null) {
        this.pes.hipertension.validacionTasaFilGlomerular = true;
        this.errors.push("Tasa de filtración glomerular (Hipertension)");
      } else {
        this.pes.hipertension.validacionTasaFilGlomerular = false;
      }
    }
    //#endregion

    // //#region diabetes
    if (this.pes.esDiabetes) {

      if (this.pes.diabetes.fechaIngreso == null) {
        this.pes.diabetes.validacionFechaIngreso = true;
        this.errors.push("Fecha de Ingreso al programa (Diabetes)");
      } else {
        this.pes.diabetes.validacionFechaIngreso = false;
      }

      if (this.pes.diabetes.diagConfirmatorio == null || this.pes.diabetes.diagConfirmatorio == "") {
        this.pes.diabetes.validacionDiagConfirmatorio = true;
        this.errors.push("Diagnóstico confirmatorio (Diabetes)");
      } else {
        this.pes.diabetes.validacionDiagConfirmatorio = false;
      }

      if (this.pes.diabetes.fechaConfirmacionDx == null) {
        this.pes.diabetes.validacionFechaConfirmacionDx = true;
        this.errors.push("Fecha de Confirmación del dx (Diabetes)");
      } else {
        this.pes.diabetes.validacionFechaConfirmacionDx = false;
      }

      if (this.pes.diabetes.tipoDiabetes == null || this.pes.diabetes.tipoDiabetes.id == 0) {
        this.pes.diabetes.validacionTipoDiabetes = true;
        this.errors.push("Tipo de Diabetes (Diabetes)");
      } else {
        this.pes.diabetes.validacionTipoDiabetes = false;
      }

      if (this.pes.diabetes.edadIngreso <= 0 || this.pes.diabetes.edadIngreso == null || this.pes.diabetes.edadIngreso > 100) {
        this.pes.diabetes.validacionEdadIngreso = true;
        this.errors.push("Edad al ingreso (Diabetes)");
      } else {
        this.pes.diabetes.validacionEdadIngreso = false;
      }

      if (this.pes.diabetes.tasaFilGlomerular == null) {
        this.pes.diabetes.validacionTasaFilGlomerular = true;
        this.errors.push("Tasa de filtración glomerular (Diabetes)");
      } else {
        this.pes.diabetes.validacionTasaFilGlomerular = false;
      }


    }
    //#endregion

    // //#region nefroproteccion
    if (this.pes.esNefroproteccion) {
      if (this.pes.nefroproteccion.fechaIngreso == null) {
        this.pes.nefroproteccion.validacionFechaIngreso = true;
        this.errors.push("Fecha de Ingreso al programa (Nefroproteccion)");
      } else {
        this.pes.nefroproteccion.validacionFechaIngreso = false;
      }

      if (this.pes.nefroproteccion.diagConfirmatorio == null || this.pes.nefroproteccion.diagConfirmatorio == "") {
        this.pes.nefroproteccion.validacionDiagConfirmatorio = true;
        this.errors.push("Diagnóstico confirmatorio (Nefroproteccion)");
      } else {
        this.pes.nefroproteccion.validacionDiagConfirmatorio = false;
      }

      if (this.pes.nefroproteccion.fechaConfirmacionDx == null) {
        this.pes.nefroproteccion.validacionFechaConfirmacionDx = true;
        this.errors.push("Fecha de Confirmación del dx (Nefroproteccion)");
      } else {
        this.pes.nefroproteccion.validacionFechaConfirmacionDx = false;
      }

      if (this.pes.nefroproteccion.etiologiaERC == null || this.pes.nefroproteccion.etiologiaERC.id == 0) {
        this.pes.nefroproteccion.validacionEtiologiaERC = true;
        this.errors.push("Tipo de la ERC (Nefroproteccion)");
      } else {
        this.pes.nefroproteccion.validacionEtiologiaERC = false;
      }

      if (this.pes.nefroproteccion.edadIngreso <= 0 || this.pes.nefroproteccion.edadIngreso == null || this.pes.nefroproteccion.edadIngreso > 100) {
        this.pes.nefroproteccion.validacionEdadIngreso = true;
        this.errors.push("Edad al ingreso (Nefroproteccion)");
      } else {
        this.pes.nefroproteccion.validacionEdadIngreso = false;
      }

      if (this.pes.nefroproteccion.tasaFilGlomerular == null) {
        this.pes.nefroproteccion.validacionTasaFilGlomerular = true;
        this.errors.push("Tasa de filtración glomerular (Nefroproteccion)");
      } else {
        this.pes.nefroproteccion.validacionTasaFilGlomerular = false;
      }
    }
    //#endregion

    console.dir(this.errors)
  }


  ObtenerListadoTipoSindrome() {

    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTipoSindromes', { responseType: "json" }).subscribe((response) => {
      this.ListadoTipoSindrome = response;
    })
  }

  ObtenerListadoTipoHipertension() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTipoHipertensiones', { responseType: "json" }).subscribe((response) => {
      this.ListadoTipoHipertension = response;
    })
  }

  ObtenerListadoTipoDiabetes() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParTiposDiabetes', { responseType: "json" }).subscribe((response) => {
      this.ListadoTipoDiabetes = response;
    })
  }

  ObtenerListadoTipoERC() {
    return this.http.get<Array<any>>(this._baseURLPar + '/api/ParEtiologiasErc', { responseType: "json" }).subscribe((response) => {
      this.ListadoTipoERC = response;
    })
  }

  ObtenerListadoPuntajeFramingham() {
    this.ListadoPuntajeFramingham = new Array<puntajeFramingham>();
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Historicos/ObtenerDatosPuntajeFramingham', { responseType: "json" }).subscribe((response) => {
      this.ListadoPuntajeFramingham = response;
    })
  }

  ObtenerHistoricoSeguimiento(PacienteId) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Historicos/ObtenerHistoricoSeguimientoPrograma?PacienteId=' + PacienteId, { responseType: "json" }).subscribe((response) => {

      this.historicoSeguimientoPrograma = response;
    })
  }

  GraficarHistoricoSignos() {
    return this.http.post<any>(this._baseUrlHC + '/api/Historicos/ObtenerGraficaHistoricoSignosVitales', this.historicoSeguimientoPrograma, { responseType: "json" })
  }

  GraficarHistorico() {
    return this.http.post<any>(this._baseUrlHC + '/api/Historicos/ObtenerGraficaHistoricoLaboratorio', this.historicoSeguimientoPrograma, { responseType: "json" })
  }

  ObtenerPesPorCita(cita: string) {
    return this.http.get<Pes>(this._baseUrlHC + '/api/Historicos/ObtenerHCPesPorCita?cita=' + cita, { responseType: "json" }).subscribe((response) => {

      this.pes.esSindromeMetabolico = response.esSindromeMetabolico;
      this.pes.sindromeMetabolico = response.sindromeMetabolico;
      this.pes.esHipertension = response.esHipertension;
      this.pes.esNefroproteccion = response.esNefroproteccion;

      this.pes.hipertension = response.hipertension;
      this.pes.esDiabetes = response.esDiabetes;
      this.pes.diabetes = response.diabetes;
      this.pes.nefroproteccion = response.nefroproteccion;
      this.pes.epoc = response.epoc == null ? new EPOC() : response.epoc;
      this.pes.obesidad = response.obesidad == null ? new Obesidad() : response.obesidad;
      this.pes.hipotiroidismo = response.hipotiroidismo == null ? new Hipotiroidismo() : response.hipotiroidismo;
      this.pes.resultadoPrograma = response.resultadoPrograma;

      this.pes.seguimientoResultadoPrograma = response.seguimientoResultadoPrograma;
      this.pes.clasificacion = response.clasificacion;
      this.pes.comentariosFinales = response.comentariosFinales;
      this.pes.datosReferenciaTFG = response.datosReferenciaTFG;
      this.pes.testMoriskGreen = response.testMoriskGreen;
      this.pes.planificacionFamiliar = response.planificacionFamiliar;

    }, err => {

      this.pes = new Pes();
      this.pes.resultadoPrograma = new ResultadoexamenPrograma();
      this.pes.seguimientoResultadoPrograma = new ResultadoexamenPrograma();
      this.pes.sindromeMetabolico = new SindromeMetabolico();
      this.pes.hipertension = new Hipertension();
      this.pes.nefroproteccion = new Nefroproteccion();
      this.pes.diabetes = new Diabetes();
      this.pes.epoc = new EPOC();
      this.pes.hipotiroidismo = new Hipotiroidismo();
      this.pes.obesidad = new Obesidad();
      this.pes.antecedentes = new antecedentes();
      this.pes.clasificacion = new clasificacionPatologica();
      this.pes.comentariosFinales = "";
      this.pes.datosReferenciaTFG = new DatosReferenciaTFG();
      this.pes.testMoriskGreen = new TestMoriskGreen();
      this.pes.planificacionFamiliar = new PlanificacionFamiliar();
      this.pes.antecedentesRelacionados = new AntecedentesRelacionadas();

    })
  }


  ObtenerPesHistoricoResumen(idPaciente: number) {
    this.historicoSeguimiento = new VMHistoricoPes();
    return this.http.get<VMHistoricoPes>(this._baseUrlHC + '/api/Historicos/ObtenerHistoricoPes?PacienteId=' + idPaciente, { responseType: "json" }).subscribe((response) => {
      this.historicoSeguimiento = response;
    }, err => {
    })
  }



  ObtenerPesResultadosAnnar(idPaciente: number, swPrimeraVez: boolean) {

    return this.http.get<ResultadoexamenPrograma>(this._baseUrlHC + '/api/Historicos/ObtenerUltimosResultadosLaboratorioAnnarPes?pacienteId=' + idPaciente, { responseType: "json" }).subscribe((response) => {

      if (swPrimeraVez) {
        this.pes.resultadoPrograma = response;
      } else {
        this.pes.seguimientoResultadoPrograma = response;
      }

    }, err => {
    })
  }

}
