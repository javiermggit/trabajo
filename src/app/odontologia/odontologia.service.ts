import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { GuardarHCMorbilidad, OrdenamientoHC, JSONHc, HabitosGestionRiesgo, Parentesco, CategoriaResponsable } from '../Modelos/Modelos';
import { HCOdontologia, AntecedenteOdontologico, Odontogramas, Indicadorplaca, Evolucion } from '../Modelos/Odontologia';
import { AntecedentesOdontologicosService } from './antecedentes-odontologicos/antecedentes-odontologicos.service';
import { AntecedenteMedicinaGeneralService } from './antecedente-medicina-general/antecedente-medicina-general.service';
import { AtencionPrimariaOdontoService } from './atencion-primaria-odonto/atencion-primaria-odonto.services';
import { HabitosGestionRiesgoOdontoService } from './habitos-gestion-riesgo-odonto/habitos-gestion-riesgo-odonto.service';
import { ParametroService } from '../parametros/parametro.service';
//import { RecomendacioncxService } from '../modal-add-recomendaciones-cx/recomendacioncx.service';
import { VmRespuestaGuardadoRelCitaJson } from '../Modelos/VmRespuestaGuardadoRelCitaJson';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OdontologiaService {
  hcOdontologia: HCOdontologia
  _baseUrlHc: string;
  _baseUrlOrdenamiento: string;
  odontogramas: Odontogramas;
  indicadorPlaca: Indicadorplaca;
  evolucion: Array<Evolucion>;
  esControl: boolean;
  odontologia: odontologiaGeneral;
  numeroDiente: number[];
  numeroDientesAdulto: number[];
  numeroDientesNino: number[];
  datosacompanante: any = {};

  idsGenerados: Set<number> = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    //@Inject('URLHc') baseUrlHc: string,
    //@Inject('UrlOrdenamiento') baseUrlOrdenamiento: string,
    public antecedentes: AntecedenteMedicinaGeneralService,
    public atencionPrimaria: AtencionPrimariaOdontoService,
    public par: ParametroService,
    public habitosgestion: HabitosGestionRiesgoOdontoService,
    public antOdontologicos: AntecedentesOdontologicosService
   // public recomendacionesService: RecomendacioncxService
    ) {

    this.hcOdontologia = new HCOdontologia();
    this.hcOdontologia.antecedenteOdontologico = new AntecedenteOdontologico();
    this._baseUrlHc = environment.URLHc;
    this._baseUrlOrdenamiento = environment.UrlOrdenamiento;
    this.odontogramas = new Odontogramas();
    this.indicadorPlaca = new Indicadorplaca();
    this.evolucion = new Array<Evolucion>();
    this.odontologia = new odontologiaGeneral();


    this.numeroDiente = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85]
    this.numeroDientesAdulto = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48]
    this.numeroDientesNino = [51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85]

  }

  GuardarLogSicu(citaId: number) {
    return this.http.post(
      `${this._baseUrlHc}/api/Logs/GuardarLogSicu?CitaID=${citaId}`,
      {}, // body vacío
      { responseType: 'text' }
    );
  }



  GuardarHcOdontologia() {

    return this.http.post<GuardarHCMorbilidad>(this._baseUrlHc + '/api/Odontologia/GuardarHCOdontologia', this.odontologia, { responseType: "json" });
  }

  ObtenerOrdenamientosHC() :OrdenamientoHC{

    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = this.hcOdontologia.ListadoOrdenamiento;
    ordenamientoshc.paciente = this.hcOdontologia.datosUsuario;
    ordenamientoshc.citaId = this.hcOdontologia.citaId;
    ordenamientoshc.diagnosticoId = this.hcOdontologia.Diagnosticos.filter(x => x.dx == true)[0].id;
    ordenamientoshc.swHC = true;
    ordenamientoshc.swQuirofano = false;

    console.log(JSON.stringify(ordenamientoshc));

    return ordenamientoshc;
  }

  GuardarOrdenamientos() {

    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
  /*   var arrayDeIdsAliada: number[]


    if (this.hcOdontologia.ListadoOrdenamiento.filter(x => x.cup.swCirugia).length > 0
      && this.recomendacionesService.listadoGrupoOrdenPropioCx.length > 0) {


      arrayDeIdsAliada = this.recomendacionesService.listadoGrupoOrdenPropioCx
        .filter(grupo => !grupo.recomiendoRedPropia)
        .map(grupo => grupo.ordenes.map(ordenCx => ordenCx.cup.id))
        .reduce((acc, curr) => acc.concat(curr), [] as number[]); // Utilizamos reduce para aplanar el array



      this.recomendacionesService.listadoGrupoOrdenPropioCx.forEach(item => {
        item.ordenes.forEach(itemOrd => {
          var filterORd = this.hcOdontologia.ListadoOrdenamiento.filter(x => x.cup.id == itemOrd.cup.id && arrayDeIdsAliada.includes(x.cup.id));
          if (filterORd.length > 0) {
            itemOrd.nota = filterORd[0].nota;
            itemOrd.cantidad = filterORd[0].cup.cantidad;
          }
        });
      });

       ordenamientoshc.ordenesCx = this.recomendacionesService.listadoGrupoOrdenPropioCx;
    }

    if (arrayDeIdsAliada.length > 0) {
      // Filtrar y modificar swOrdenar
      ordenamientoshc.ordenes = this.hcOdontologia.ListadoOrdenamiento.filter(x => !arrayDeIdsAliada.includes(x.cup.id));
    } else {
      ordenamientoshc.ordenes = this.hcOdontologia.ListadoOrdenamiento;
    } */


    ordenamientoshc.ordenes = this.hcOdontologia.ListadoOrdenamiento;
    ordenamientoshc.paciente = this.hcOdontologia.datosUsuario;
    ordenamientoshc.citaId = this.hcOdontologia.citaId;
    ordenamientoshc.diagnosticoId = this.hcOdontologia.Diagnosticos.filter(x => x.dx == true)[0].id;
    ordenamientoshc.swHC = true;
    ordenamientoshc.swQuirofano = false;

    console.log(JSON.stringify(ordenamientoshc));

    return this.http.post<any>(this._baseUrlOrdenamiento + '/api/ordenamientos/GuardarOrdenamiento', ordenamientoshc, { responseType: "json" })
  }

  GuardarJSONMorbilidad(medico) {

    var datosHC = JSON.stringify(this.odontologia);
    var jsonhc = new JSONHc();
    jsonhc.UsuarioId = medico.id;
    jsonhc.json = datosHC;
    jsonhc.tipo = "ODONTOLOGIA";
    jsonhc.consultaId = this.odontologia.hcOdontologia.citaId;
    return this.http.post<VmRespuestaGuardadoRelCitaJson>(`${this._baseUrlHc}/api/Morbilidad/GuardarJsonHC`,jsonhc,{ responseType: 'json' });
  }

  GuardarJSONOrdenamiento(medico) {

    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = this.hcOdontologia.ListadoOrdenamiento;
    ordenamientoshc.paciente = this.hcOdontologia.datosUsuario;
    ordenamientoshc.citaId = this.hcOdontologia.citaId;

    var diagnostico = this.hcOdontologia.Diagnosticos.filter(x => x.dx == true);
    if (diagnostico.length != 0) {
      ordenamientoshc.diagnosticoId = this.hcOdontologia.Diagnosticos.filter(x => x.dx == true)[0].id;
    } else {
      ordenamientoshc.diagnosticoId = 0;
    }

    var datosOrdenamiento = JSON.stringify(ordenamientoshc);
    var jsonhc = new JSONHc();
    jsonhc.UsuarioId = medico.id;
    jsonhc.json = datosOrdenamiento;
    jsonhc.tipo = "ORDENAMIENTO";
    jsonhc.consultaId = this.hcOdontologia.citaId;
    return this.http.post<VmRespuestaGuardadoRelCitaJson>(`${this._baseUrlHc}/api/Morbilidad/GuardarJsonHC`,jsonhc,{ responseType: 'json' });
  }


  GuardarOdontograma(PacienteId: number) {
    return this.http.post<any>(this._baseUrlHc + '/api/Odontologia/GuardarOdontograma?PacienteId=' + PacienteId, this.odontogramas, { responseType: "json" })
  }

  ObtenerAntecedentesByCita(citaId) {
    return this.http.get<any>(this._baseUrlHc + '/api/Morbilidad/CargarAntecedentesByCita/' + citaId, { responseType: "json" }).subscribe((response) => {
      this.antecedentes.quirurgicos = response.quirurgicos;
      this.antecedentes.traumaticos = response.traumaticos;
      this.antecedentes.transfusiones = response.transfusiones;
      this.antecedentes.alergicos = response.alergicos;
      this.antecedentes.farmacologicos = response.farmacologicos;
      this.antecedentes.antecedenteGinecoObstetrico = response.antecedenteGinecoObstetrico;
      this.antecedentes.antecedenteFamiliar = response.antecedenteFamiliar;
      this.antecedentes.antecedentePatologicos = response.antecedentePatologicos;
    }, (error) => {

    })
  }

  ObtenerAntecedentesByCitaOdontologico(citaId) {

    return this.http.get<any>(this._baseUrlHc + '/api/HistoricoOdontologia/CargarAntecedentesByCitaOdontologia/' + citaId, { responseType: "json" }).subscribe((response) => {

      this.antOdontologicos.examenEstomatologico = response.examenEstomatologico;
      this.antOdontologicos.examenOclusal = response.examenOclusal;
      this.antOdontologicos.habitoOral = response.habitoOral;
      this.antOdontologicos.examenPulpar = response.examenPulpar;
      this.antOdontologicos.examenPeriodontal = response.examenPeriodontal;
      this.antOdontologicos.habitosHigieneOral = response.habitosHigieneOral;

    }, (error) => {

    })
  }

  ObtenerUltimoAcompanantePaciente(PacienteId) {
    return this.http.get<any>(this._baseUrlHc + '/api/HistoricoOdontologia/ObtenerUltimoAcompanantePaciente?PacienteId=' + PacienteId, { responseType: "json" }).subscribe((response) => {
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
  }

  ObtenerHistoricoHabitosByCita(citaId) {

    this.habitosgestion.HabitosGestionRiesgo = new HabitosGestionRiesgo();
    return this.http.get<any>(this._baseUrlHc + '/api/HistoricoOdontologia/CargarHistoricoHabitoGestionRiesgo/' + citaId, { responseType: "json" }).subscribe((response) => {

      if (response != null) {
        this.habitosgestion.HabitosGestionRiesgo = response;
      }
    }, (error) => {
      console.log(error)
    })
  }


  generarIdNoRepetido(): number {
    let idRandom: number;

    do {
      idRandom = Math.floor(Math.random() * 1000) + 1;
    } while (this.idsGenerados.has(idRandom));

    this.idsGenerados.add(idRandom);

    return idRandom;
  }

}

export class odontologiaGeneral {
  hcOdontologia: HCOdontologia
  odontogramas: Odontogramas;
  indicadorPlaca: Indicadorplaca;
  evolucion: Array<Evolucion>;
  esControl: boolean;
  esUrgencia: boolean;
  esPrimeravez: boolean;
  esTelesalud: boolean;
  public  OrdenamientoHC:OrdenamientoHC;

  constructor() {
    this.hcOdontologia = new HCOdontologia();
    this.hcOdontologia.antecedenteOdontologico = new AntecedenteOdontologico();
    this.odontogramas = new Odontogramas();
    this.indicadorPlaca = new Indicadorplaca();
    this.evolucion = new Array<Evolucion>();
  }
}
