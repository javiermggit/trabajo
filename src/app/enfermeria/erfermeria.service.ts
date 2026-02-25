import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

import Swal from 'sweetalert2'
import { HCEnfermeria } from '../Modelos/Enfermeria';
import { GuardarHCMorbilidad, OrdenamientoHC, JSONHc, Parentesco, CategoriaResponsable } from '../Modelos/Modelos';
import { pyp } from '../morbilidad/morbilidad.service';
import { AtencionPrimariaService } from '../morbilidad/atencion-primaria/atencion-primaria.service';
import { ParametroService } from '../parametros/parametro.service';
import { HabitoGestionRiesgoService } from '../morbilidad/habito-gestion-riesgo/habito-gestion-riesgo.service';
import { VmRespuestaGuardadoRelCitaJson } from '../Modelos/VmRespuestaGuardadoRelCitaJson';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErfermeriaService {
  hcEnfermeria: HCEnfermeria
  citaId: string;
  _baseUrlHc: string;
  _baseUrlOrdenamiento: string;
  listadoPyp: Array<pyp>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    //@Inject('URLHc') baseUrlHc: string,
    public atencionPrimaria: AtencionPrimariaService,
    public par: ParametroService,
    public habitosG: HabitoGestionRiesgoService
    //@Inject('UrlOrdenamiento') baseUrlOrdenamiento: string
  ) {
    this.hcEnfermeria = new HCEnfermeria();
    this._baseUrlHc = environment.URLHc;
    this._baseUrlOrdenamiento = environment.UrlOrdenamiento;
    this.citaId = this.route.snapshot.paramMap.get('param1');
  }


  GuardarHcenfermeria() {

    return this.http.post<GuardarHCMorbilidad>(this._baseUrlHc + '/api/Enfermeria/GuardarHCEnfermeria', this.hcEnfermeria, { responseType: "json" });
  }

  GuardarLogSicu(citaId: number) {
    return this.http.post(
      `${this._baseUrlHc}/api/Logs/GuardarLogSicu?CitaID=${citaId}`,
      {}, // body vacío
      { responseType: 'text' }
    );
  }


  ObtenerOrdenamientosHC():OrdenamientoHC {
    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = this.hcEnfermeria.listadoOrdenamiento;
    ordenamientoshc.paciente = this.hcEnfermeria.datosUsuario;
    ordenamientoshc.citaId = this.hcEnfermeria.citaId;
    ordenamientoshc.diagnosticoId = this.hcEnfermeria.diagnosticos.filter(x => x.dx == true)[0].id;

    //var urlOrdenamiento = "";
    return ordenamientoshc;
  }

  GuardarOrdenamientos() {
    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = this.hcEnfermeria.listadoOrdenamiento;
    ordenamientoshc.paciente = this.hcEnfermeria.datosUsuario;
    ordenamientoshc.citaId = this.hcEnfermeria.citaId;
    ordenamientoshc.diagnosticoId = this.hcEnfermeria.diagnosticos.filter(x => x.dx == true)[0].id;

    //var urlOrdenamiento = "";
    return this.http.post<any>(this._baseUrlOrdenamiento + '/api/Ordenamientos/GuardarOrdenamiento', ordenamientoshc, { responseType: "json" })
  }

  GuardarJSONMorbilidad(medico) {
    var datosHC = JSON.stringify(this.hcEnfermeria);
    var jsonhc = new JSONHc();
    jsonhc.UsuarioId = medico.id;
    jsonhc.json = datosHC;
    jsonhc.tipo = "ENFERMERIA";
    jsonhc.consultaId = this.hcEnfermeria.citaId;
    //console.log(JSON.stringify(jsonhc));

    return this.http.post<VmRespuestaGuardadoRelCitaJson>(`${this._baseUrlHc}/api/Morbilidad/GuardarJsonHC`, jsonhc, { responseType: 'json' });


   /*  return this.http.post<any>(this._baseUrlHc + '/api/Morbilidad/GuardarJsonHC', jsonhc, { responseType: "json" }).subscribe(x => {
      console.log("Guardo el Json")
    }, error => {
      console.log(error);
    }) */

  }

  GuardarJSONOrdenamiento(medico) {

    var ordenamientoshc: OrdenamientoHC;
    ordenamientoshc = new OrdenamientoHC();
    ordenamientoshc.ordenes = this.hcEnfermeria.listadoOrdenamiento;
    ordenamientoshc.paciente = this.hcEnfermeria.datosUsuario;
    ordenamientoshc.citaId = this.hcEnfermeria.citaId;

    var diagnostico = this.hcEnfermeria.diagnosticos.filter(x => x.dx == true);
    if (diagnostico.length != 0) {
      ordenamientoshc.diagnosticoId = this.hcEnfermeria.diagnosticos.filter(x => x.dx == true)[0].id;
    } else {
      ordenamientoshc.diagnosticoId = 0;
    }

    var datosOrdenamiento = JSON.stringify(ordenamientoshc);
    var jsonhc = new JSONHc();
    jsonhc.UsuarioId = medico.id;
    jsonhc.json = datosOrdenamiento;
    jsonhc.tipo = "ORDENAMIENTO";
    jsonhc.consultaId = this.hcEnfermeria.citaId;

    return this.http.post<VmRespuestaGuardadoRelCitaJson>(`${this._baseUrlHc}/api/Morbilidad/GuardarJsonHC`, jsonhc, { responseType: 'json' });

  /*   return this.http.post<any>(this._baseUrlHc + '/api/Morbilidad/GuardarJsonHC', jsonhc, { responseType: "json" }).subscribe(x => {
      console.log("Guardo el Json")
    }, error => {
      console.log(error);
    }) */

  }

  /* ObtenerUltimoAcompanantePaciente(PacienteId) {
    return this.http.get<any>(this._baseUrlHc + '/api/Historicos/ObtenerUltimoAcompanantePacienteEnfermeria?PacienteId=' + PacienteId, { responseType: "json" }).subscribe((response) => {
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
    })
  } */

  obtenerUltimaDicapacidad(PacienteId) {
    // /api/Historicos/ObtenerUltimaDiscapacidad
    return this.http.get(this._baseUrlHc + '/api/Historicos/ObtenerUltimaDiscapacidad?PacienteId=' + PacienteId, { responseType: "text" }).subscribe((response) => {
      this.habitosG.HabitosGestionRiesgo.discapacidad = response;
    }, (error) => {
    })
  }


}


