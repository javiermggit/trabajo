import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MedicamentoPrint } from '../Modelos/Impresion';
import { PesService } from './pes/pes.service';
import { HabitoGestionRiesgoService } from './habito-gestion-riesgo/habito-gestion-riesgo.service';
import { AtencionPrimariaService } from './atencion-primaria/atencion-primaria.service';
import { ParametroService } from '../parametros/parametro.service';
import { TestCovid_Log_Detalle } from '../Modelos/testcovid';
import { HCMorbilidad, OrdenamientoHC, GuardarHCMorbilidad, JSONHc, Parentesco, CategoriaResponsable, VMCup, Ordenamiento } from '../Modelos/Modelos';
import { MedicoService } from '../medico/medico.service';
//import { RecomendacioncxService } from '../modal-add-recomendaciones-cx/recomendacioncx.service';
import { Reimpresion } from '../Modelos/Reimpresion';
import { VmRespuestaGuardadoRelCitaJson } from '../Modelos/VmRespuestaGuardadoRelCitaJson';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MorbilidadService {

  hcMorbilidad: HCMorbilidad
  _baseUrlHC: string;
  _baseUrlOrdenamiento: string;
  _baseImpresion: string;
  _baseCorreo: string;
  citaId: string;
  listadoPyp: Array<pyp>;
  listadoConsultas: Array<consultas>;
  listadoConsultasReimpresion: Array<Reimpresion>;
  public medicamentos: Array<MedicamentoPrint>;
  preguntasTestCovid: Array<TestCovid_Log_Detalle>;
  clientIP: string;

  isSegNoPresencial: Boolean = false;
  segNoPresencialHaveExamen: Boolean = false;

  idsGenerados: Set<number> = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    //@Inject('URLHc') baseUrlHC: string,
    //@Inject('URLImpresion') impresion: string,
    //@Inject('URLApiCorreo') baseUrlApiCorreo: string,
    public pes: PesService,
    public par: ParametroService,
    public habitosG: HabitoGestionRiesgoService,
    public atencionPrimaria: AtencionPrimariaService,
    //@Inject('UrlOrdenamiento') baseUrlOrdenamiento: string,
    private MedicoService: MedicoService,
    //public recomendacionesService: RecomendacioncxService
  ) {

    this._baseImpresion = environment.URLImpresion;
    this.hcMorbilidad = new HCMorbilidad();
    this._baseUrlHC = environment.URLHc;
    this._baseCorreo = environment.URLApiCorreo;
    this._baseUrlOrdenamiento = environment.UrlOrdenamiento;
    this.citaId = this.route.snapshot.paramMap.get('param1');
    this.listadoPyp = new Array<pyp>();


  }

  GuardarMorbilidad() {
    // console.log(JSON.stringify(this.hcMorbilidad));
    return this.http.post<GuardarHCMorbilidad>(this._baseUrlHC + '/api/Morbilidad/GuardarHCMorbilidad?UsuarioId=' + this.MedicoService.medicoId, this.hcMorbilidad, { responseType: "json" })
  }

  GuardarJSONMorbilidad(medico) {
    var datosHC = JSON.stringify(this.hcMorbilidad);
    var jsonhc = new JSONHc();
    jsonhc.UsuarioId = medico == null || medico == undefined ? 0 : medico.id;
    jsonhc.json = datosHC;
    jsonhc.tipo = "MORBILIDAD";
    jsonhc.consultaId = this.hcMorbilidad.citaId;
    return this.http.post<VmRespuestaGuardadoRelCitaJson>(`${this._baseUrlHC}/api/Morbilidad/GuardarJsonHC`, jsonhc, { responseType: 'json' });
  }

  GuardarJSONOrdenamiento(medico) {

    var ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = this.hcMorbilidad.ListadoOrdenamiento;
    ordenamientoshc.paciente = this.hcMorbilidad.datosUsuario;
    ordenamientoshc.citaId = this.hcMorbilidad.citaId;

    var diagnostico = this.hcMorbilidad.diagnosticos.filter(x => x.dx == true);
    if (diagnostico.length != 0) {
      ordenamientoshc.diagnosticoId = this.hcMorbilidad.diagnosticos.filter(x => x.dx == true)[0].id;
    } else {
      ordenamientoshc.diagnosticoId = 0;
    }

    var jsonhc = new JSONHc();
    if (ordenamientoshc.ordenes.length > 0) {
      var datosOrdenamiento = JSON.stringify(ordenamientoshc);
    } else {
      ordenamientoshc.ordenes = this.hcMorbilidad.ListadoOrdenamiento;
      var datosOrdenamiento = JSON.stringify(ordenamientoshc);
    }

    jsonhc.UsuarioId = medico.id;
    jsonhc.json = datosOrdenamiento;
    jsonhc.tipo = "ORDENAMIENTO";
    jsonhc.consultaId = this.hcMorbilidad.citaId;
    return this.http.post<VmRespuestaGuardadoRelCitaJson>(`${this._baseUrlHC}/api/Morbilidad/GuardarJsonHC`, jsonhc, { responseType: 'json' });
  }
  /*
    GuardarOrdenamientosCx(){
      var ordenamientoshc: OrdenamientoHC;
      ordenamientoshc = new OrdenamientoHC();
      var arrayDeIdsAliada: number[] = [];


      if (this.hcMorbilidad.ListadoOrdenamiento.filter(x => x.cup.swCirugia).length > 0
        && this.recomendacionesService.listadoGrupoOrdenPropioCx.length > 0) {

        arrayDeIdsAliada = this.recomendacionesService.listadoGrupoOrdenPropioCx
          .filter(grupo => !grupo.recomiendoRedPropia)
          .map(grupo => grupo.ordenes.map(ordenCx => ordenCx.cup.id))
          .reduce((acc, curr) => acc.concat(curr), [] as number[]);

       this.recomendacionesService.validarOrdenesCx(this.hcMorbilidad.ListadoOrdenamiento);

       // ordenamientoshc.ordenesCx = lista;

      }

      if (arrayDeIdsAliada.length > 0) {
        // Filtrar y modificar swOrdenar
        ordenamientoshc.ordenes = this.hcMorbilidad.ListadoOrdenamiento.filter(x => !arrayDeIdsAliada.includes(x.cup.id));
      } else {
        ordenamientoshc.ordenes = this.hcMorbilidad.ListadoOrdenamiento;
      }

      ordenamientoshc.paciente = this.hcMorbilidad.datosUsuario;
      ordenamientoshc.citaId = this.hcMorbilidad.citaId;
      ordenamientoshc.diagnosticoId = this.hcMorbilidad.diagnosticos.filter(x => x.dx == true)[0].id;
      ordenamientoshc.swHC = true;
      ordenamientoshc.swQuirofano = false;
      console.log(JSON.stringify(ordenamientoshc));


      return this.http.post<any>(this._baseUrlOrdenamiento + '/api/Ordenamientos/GuardarOrdenamiento', ordenamientoshc, { responseType: "json" })
    } */
  ObtenerOrdenamientosHC(): OrdenamientoHC {


    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();


  /*   if (this.hcMorbilidad.ListadoOrdenamiento.filter(x => x.cup.swCirugia).length > 0
      && this.recomendacionesService.listadoGrupoOrdenPropioCx.length > 0) {
      this.recomendacionesService.validarOrdenesCx(this.hcMorbilidad.ListadoOrdenamiento);
    } */

    /*  this.hcMorbilidad.ListadoOrdenamiento = this.hcMorbilidad.ListadoOrdenamiento.map(item => ({
       ...item,
       ordenCx: {
         ...item.ordenCx,
         swRequierePreanestesiologiaGeneral: item.ordenCx.swRequierePreanestesiologiaGeneral == null ? false : item.ordenCx.swRequierePreanestesiologiaGeneral
       }
     })); */

    ordenamientoshc.ordenes = this.hcMorbilidad.ListadoOrdenamiento
    ordenamientoshc.paciente = this.hcMorbilidad.datosUsuario;
    ordenamientoshc.citaId = this.hcMorbilidad.citaId;
    ordenamientoshc.diagnosticoId = this.hcMorbilidad.diagnosticos.filter(x => x.dx == true)[0].id;
    ordenamientoshc.swHC = true;
    ordenamientoshc.swQuirofano = false;
    console.log(JSON.stringify(ordenamientoshc));

    return ordenamientoshc;
  }
  GuardarOrdenamientos() {

    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();


   /*  if (this.hcMorbilidad.ListadoOrdenamiento.filter(x => x.cup.swCirugia).length > 0
      && this.recomendacionesService.listadoGrupoOrdenPropioCx.length > 0) {
      this.recomendacionesService.validarOrdenesCx(this.hcMorbilidad.ListadoOrdenamiento);
    } */

    ordenamientoshc.ordenes = this.hcMorbilidad.ListadoOrdenamiento
    ordenamientoshc.paciente = this.hcMorbilidad.datosUsuario;
    ordenamientoshc.citaId = this.hcMorbilidad.citaId;
    ordenamientoshc.diagnosticoId = this.hcMorbilidad.diagnosticos.filter(x => x.dx == true)[0].id;
    ordenamientoshc.swHC = true;
    ordenamientoshc.swQuirofano = false;
    console.log(JSON.stringify(ordenamientoshc));

    return this.http.post<any>(this._baseUrlOrdenamiento + '/api/Ordenamientos/GuardarOrdenamiento', ordenamientoshc, { responseType: "json" })
  }

  ObtenerConsultasPorPAcienteId(PacienteId) {
    return this.http.get<Array<consultas>>(this._baseUrlHC + '/api/Historicos/ConsultasPorPacienteId?PacienteId=' + PacienteId, { responseType: "json" })
      .subscribe((response) => {

        this.listadoConsultas = response;
      })
  }

  ObtenerExamenFisicoSegNoPresencial(CitaID, PacienteId) {
    return this.http.get<Array<consultas>>(this._baseUrlHC + '/api/Morbilidad/ObtenerOrigenAgendaturnoId?AgendaTurno_Id=' + CitaID + '&Paciente_Id=' + PacienteId)

  }

  GuardarLogSicu(citaId: number) {
    return this.http.post(
      `${this._baseUrlHC}/api/Logs/GuardarLogSicu?CitaID=${citaId}`,
      {}, // body vacío
      { responseType: 'text' }
    );
  }


  ObtenerConsultaPorPaciente(id, tipo) {

    return this.http.get<Array<Reimpresion>>(this._baseUrlHC + '/api/Historicos/ConsultasPorDocumentoPaciente?Tipo=' + tipo + '&Documento=' + id + '&Especialidad=0', { responseType: "json" })
  }


  ObtenerPYP(CitaID, tipo = "MORBILIDAD") {
    return this.http.get<Array<pyp>>(this._baseUrlHC + '/api/Morbilidad/ValidarAccesoProgramas?citaId=' + CitaID + "&Especialidad=" + tipo, { responseType: "json" })
  }

  enviarCorreo(Grupo, agrupador, Correo, UsuarioId, citaid = "", mes = "", tipo = "ORDENAMIENTO", url = "") {

    var urlnueva = url.replace(this._baseImpresion + "/", "");
    var FechaHoy = this.obtenerFechaActual();
    if (tipo === 'INCAPACIDAD') {
      return this.http.get(this._baseCorreo + '/EnvioCorreo/EnviarEmailIncapacidad?Correo=' + Correo + '&UsuarioId=' + UsuarioId + '&CitaId=0' + '&CitaIdBase=' + citaid, { responseType: 'text' })
    } else if (tipo === 'ORDENAMIENTO') {
      return this.http.get(this._baseCorreo + '/EnvioCorreo/EnviarEmailOrdenamiento?Grupo=' + Grupo + "&Correo=" + Correo + '&UsuarioId=' + UsuarioId, { responseType: 'text' })
    } else if (tipo === 'MEDICAMENTO') {
      return this.http.get(this._baseCorreo + '/EnvioCorreo/EnviarEmailMedicamento?Grupo=' + agrupador + "&Correo=" + Correo + '&UsuarioId=' + UsuarioId + '&mes=' + mes, { responseType: 'text' })
    } else if (tipo === 'CERTIFICADOAISLAMIENTO') {
      return this.http.get(this._baseCorreo + '/EnvioCorreo/EnviarEmailCertificado?Correo=' + Correo + '&UsuarioId=' + UsuarioId + '&Url=' + encodeURIComponent(urlnueva) + '&Tipo=aislamiento&Fecha=' + FechaHoy, { responseType: 'text' })
    } else if (tipo === 'CERTIFICADOREINTEGRO') {
      return this.http.get(this._baseCorreo + '/EnvioCorreo/EnviarEmailCertificado?Correo=' + Correo + '&UsuarioId=' + UsuarioId + '&Url=' + encodeURIComponent(urlnueva) + '&Tipo=reintegro&Fecha=' + FechaHoy, { responseType: 'text' })
    }else{
      return '';
    }
  }

  obtenerFechaActual() {
    var date = new Date()
    var y = date.getFullYear();
    var m1 = date.getMonth() + 1;
    var m = m1 < 10 ? "0" + m1 : m1;
    var d1 = date.getDate();
    var d = d1 < 10 ? "0" + d1 : d1;

    return y + "-" + m + "-" + d;
  }

  generarLinksImpresionMedicamento(CitaId, Identificador) {
    return this.http.get<Array<MedicamentoPrint>>(this._baseUrlHC + '/api/Medicamentos/GenerarLinksImpresion?citaId=' + CitaId + '&identificador=' + Identificador, { responseType: "json" })
  }

  generarLinksImpresionOrdenamiento(PacienteId, agrupador) {
    return this.http.get(this._baseUrlHC + '/api/Morbilidad/GenerarLinksImpresionOrdenamientos?PacienteId=' + PacienteId + '&Agrupador=' + agrupador, { responseType: "text" })
  }

  generarLinksImpresionIncapacidad(incapacidadId, padreId) {
    return this.http.get(this._baseUrlHC + '/api/Morbilidad/GenerarLinksImpresionIncapacidad?IncapacidadId=' + incapacidadId + '&PadreId=' + padreId, { responseType: "text" })
  }

  generarLinksImpresionCertificadoA(citaid, padreId, tipo) {
    return this.http.get(this._baseUrlHC + '/api/Morbilidad/GenerarLinksImpresionCertificadoA?CitaId=' + citaid + '&Tipo=' + tipo + '&PadreId=' + padreId, { responseType: "text" })
  }



  generarIdNoRepetido(): number {
    let idRandom: number;

    do {
      idRandom = Math.floor(Math.random() * 1000) + 1;
    } while (this.idsGenerados.has(idRandom));

    this.idsGenerados.add(idRandom);

    return idRandom;
  }
  /*  ObtenerUltimoAcompanantePaciente(PacienteId) {

     return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimoAcompanantePaciente?PacienteId=' + PacienteId, { responseType: "json" }).subscribe((response) => {

       this.atencionPrimaria.ultimoAcompanante = response;
       if (response.parentesco == null) {
         this.atencionPrimaria.ultimoAcompanante.parentesco = new Parentesco();
       } else {
         this.par.ListadoParentesco.forEach(x => {
           if (x.id == this.atencionPrimaria.ultimoAcompanante.parentesco.id) {
             this.atencionPrimaria.ultimoAcompanante.parentesco.descripcion = x.descripcion
           }
         })
       }
       if (response.categoria == null) {
         this.atencionPrimaria.ultimoAcompanante.categoria = new CategoriaResponsable();
       } else {
         this.par.ListadoCategoriaResponsable.forEach(x => {
           if (x.id == this.atencionPrimaria.ultimoAcompanante.categoria.id) {
             this.atencionPrimaria.ultimoAcompanante.categoria.descripcion = x.descripcion
           }
         })
       }
     }, (error) => {
       console.log(error)
     })
   } */

  obtenerUltimaDicapacidad(PacienteId) {
    // /api/Historicos/ObtenerUltimaDiscapacidad

    return this.http.get(this._baseUrlHC + '/api/Historicos/ObtenerUltimaDiscapacidad?PacienteId=' + PacienteId, { responseType: "text" }).subscribe((response) => {

      this.habitosG.HabitosGestionRiesgo.discapacidad = response;

    }, (error) => {

      console.log(error)
    })
  }

  public armarPreguntarTestCovid() {
    if (this.preguntasTestCovid == null) {
      this.preguntasTestCovid = new Array<TestCovid_Log_Detalle>();
      this.preguntasTestCovid.push({ Pregunta: "¿Ha presentado tos, fiebre mayor a 38 grados y dificultad para respirar en los últimos 7 días?", modelo: "fiebre", puntaje: 1, sw: false, Respuesta: "" })
      this.preguntasTestCovid.push({ Pregunta: "¿Ha presentado congestión nasal, malestar general, perdida de olfato o gusto en los últimos siete días?", modelo: "congestion", puntaje: 1, sw: false, Respuesta: "" })
      this.preguntasTestCovid.push({ Pregunta: "¿Ha estado en contacto cercano con alguien confirmado o sospechoso de tener coronavirus, sin haber tomado las medidas de protección adecuadas?", modelo: "contacto", puntaje: 1, sw: false, Respuesta: "" })

    }
  }

  public enviarCorreoTest(test) {
    return this.http.post<any>(this._baseUrlHC + '/api/Morbilidad/GuardarTestCovid', test, { responseType: "json" });
  }

  getClientIP() {
    this.getClientIPAddress().subscribe((res: any) => {
      this.clientIP = res.ip;
    });
  }

  public getClientIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }
}


export class consultas {
  medico: string;
  consultaId: string;
  fecha: string;
}


export class pyp {
  id: number;
  ngmodel: boolean = false;
  observacionPyp: string;
  descripcion: string;
  pacienteAplica: boolean = true;
  advertencia: string;
  value: boolean = false;
}

