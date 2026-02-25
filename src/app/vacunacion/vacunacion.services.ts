import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { Vacunacion } from '../Modelos/Vacunacion';
import { DatosPacienteService } from '../datos-paciente/datos-paciente.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacunacionServices {
  public listadoVacunas: Array<Vacunacion>;
  _baseUrl: string;

  constructor(
    private http: HttpClient,
    //@Inject('URLHc') hcURL: string,
    public dp: DatosPacienteService
  ) {
    this.listadoVacunas = new Array<Vacunacion>();
    this._baseUrl = environment.URLHc;
    //this.CargarListadoVacunas();
  }


  CargarHistoricoVacunas(pacienteID) {
    
    return this.http.get<any>(this._baseUrl + '/api/Historicos/ObtenerUltimaConsultaVacunacion?PacienteId=' + pacienteID, { responseType: "json" }).subscribe((response) => {
    //  console.log(response.vacunas);
      
      this.listadoVacunas = response.vacunas;
    }, error => {
      
      console.log(error);
    })
  }


  CargarListadoVacunas() {
    
    if (this.dp.DatosUsuario.edadAnos <= 5) {
      //Recién Nacido
      var tuberculosisUnica = new Vacunacion();
      tuberculosisUnica.edad = "Recién Nacido";
      tuberculosisUnica.tipoDosis = "Dosis Única";
      tuberculosisUnica.queProtege = "Tuberculosis B.C.G";
      this.listadoVacunas.push(tuberculosisUnica);

      var hepatitisB = new Vacunacion();
      hepatitisB.edad = "Recién Nacido";
      hepatitisB.tipoDosis = "Dosis Recién Nacido";
      hepatitisB.queProtege = "Hepatitis B";
      this.listadoVacunas.push(hepatitisB);

      //2 Meses
      var polioPrimera = new Vacunacion();
      polioPrimera.edad = "2 Meses";
      polioPrimera.tipoDosis = "Primera dosis";
      polioPrimera.queProtege = "Polio";
      this.listadoVacunas.push(polioPrimera);

      var pentavalentePrimera = new Vacunacion();
      pentavalentePrimera.edad = "2 Meses";
      pentavalentePrimera.tipoDosis = "Primera dosis";
      pentavalentePrimera.queProtege = "Pentavalente: Hepatitis B, Haemophilus influenzae Tipo b y Difteria - Tosferina - tétano (DPT)";
      this.listadoVacunas.push(pentavalentePrimera);

      var rotavirusPrimera = new Vacunacion();
      rotavirusPrimera.edad = "2 Meses";
      rotavirusPrimera.tipoDosis = "Primera dosis";
      rotavirusPrimera.queProtege = "Rotavirus";
      this.listadoVacunas.push(rotavirusPrimera);

      var neumococoPrimera = new Vacunacion();
      neumococoPrimera.edad = "2 Meses";
      neumococoPrimera.tipoDosis = "Primera dosis";
      neumococoPrimera.queProtege = "Neumococo";
      this.listadoVacunas.push(neumococoPrimera);

      //4 Meses
      var polioSegunda = new Vacunacion();
      polioSegunda.edad = "4 Meses";
      polioSegunda.tipoDosis = "Segunda dosis";
      polioSegunda.queProtege = "Polio";
      this.listadoVacunas.push(polioSegunda);

      var pentavalenteSegunda = new Vacunacion();
      pentavalenteSegunda.edad = "4 Meses";
      pentavalenteSegunda.tipoDosis = "Segunda dosis";
      pentavalenteSegunda.queProtege = "Pentavalente: Hepatitis B, Haemophilus influenzae Tipo b y Difteria - Tosferina - tétano (DPT)";
      this.listadoVacunas.push(pentavalenteSegunda);

      var rotavirusSegunda = new Vacunacion();
      rotavirusSegunda.edad = "4 Meses";
      rotavirusSegunda.tipoDosis = "Segunda dosis";
      rotavirusSegunda.queProtege = "Rotavirus";
      this.listadoVacunas.push(rotavirusSegunda);

      var neumococoSegunda = new Vacunacion();
      neumococoSegunda.edad = "4 Meses";
      neumococoSegunda.tipoDosis = "Segunda dosis";
      neumococoSegunda.queProtege = "Neumococo";
      this.listadoVacunas.push(neumococoSegunda);

      //6 Meses
      var polioTercera = new Vacunacion();
      polioTercera.edad = "6 Meses";
      polioTercera.tipoDosis = "Tercera dosis";
      polioTercera.queProtege = "Polio";
      this.listadoVacunas.push(polioTercera);

      var pentavalenteTercera = new Vacunacion();
      pentavalenteTercera.edad = "6 Meses";
      pentavalenteTercera.tipoDosis = "Tercera dosis";
      pentavalenteTercera.queProtege = "Pentavalente: Hepatitis B, Haemophilus influenzae Tipo b y Difteria - Tosferina - tétano (DPT)";
      this.listadoVacunas.push(pentavalenteTercera);

      var influenzaPrimera = new Vacunacion();
      influenzaPrimera.edad = "6 Meses";
      influenzaPrimera.tipoDosis = "Primera dosis";
      influenzaPrimera.queProtege = "Influenza";
      this.listadoVacunas.push(influenzaPrimera);

      //7 Meses
      var influenzaSegunda = new Vacunacion();
      influenzaSegunda.edad = "7 Meses";
      influenzaSegunda.tipoDosis = "Segunda dosis";
      influenzaSegunda.queProtege = "Influenza";
      this.listadoVacunas.push(influenzaSegunda);


      //12 Meses
      var sarampioUnica = new Vacunacion();
      sarampioUnica.edad = "12 Meses";
      sarampioUnica.tipoDosis = "Dosis unica";
      sarampioUnica.queProtege = "Sarampión - Rubeola - Paperas (SRP)";
      this.listadoVacunas.push(sarampioUnica);

      var neumococoRefuerzo = new Vacunacion();
      neumococoRefuerzo.edad = "12 Meses";
      neumococoRefuerzo.tipoDosis = "Dosis refuerzo";
      neumococoRefuerzo.queProtege = "Neumococo";
      this.listadoVacunas.push(neumococoRefuerzo);

      var varicelaUnica = new Vacunacion();
      varicelaUnica.edad = "12 Meses";
      varicelaUnica.tipoDosis = "Dosis unica";
      varicelaUnica.queProtege = "Varicela";
      this.listadoVacunas.push(varicelaUnica);

      var hepatitisAUnica = new Vacunacion();
      hepatitisAUnica.edad = "12 Meses";
      hepatitisAUnica.tipoDosis = "Dosis unica";
      hepatitisAUnica.queProtege = "Hepatitis A";
      this.listadoVacunas.push(hepatitisAUnica);

      //18 Meses
      var DifteriaPrimerR = new Vacunacion();
      DifteriaPrimerR.edad = "18 Meses";
      DifteriaPrimerR.tipoDosis = "Dosis primer refuerzo";
      DifteriaPrimerR.queProtege = "Difteria - Tosferina - Tetano (DPT)";
      this.listadoVacunas.push(DifteriaPrimerR);

      var PolioPrimerR = new Vacunacion();
      PolioPrimerR.edad = "18 Meses";
      PolioPrimerR.tipoDosis = "Dosis primer refuerzo";
      PolioPrimerR.queProtege = "Polio";
      this.listadoVacunas.push(PolioPrimerR);

      var fiebreAmarillaUnica = new Vacunacion();
      fiebreAmarillaUnica.edad = "18 Meses";
      fiebreAmarillaUnica.tipoDosis = "Dosis unica";
      fiebreAmarillaUnica.queProtege = "Fiebre Amarilla (FA)";
      this.listadoVacunas.push(fiebreAmarillaUnica);


      //5 años
      var DifteriaSegundoR = new Vacunacion();
      DifteriaSegundoR.edad = "5 años";
      DifteriaSegundoR.tipoDosis = "Dosis segundo refuerzo";
      DifteriaSegundoR.queProtege = "Difteria - Tosferina - Tetano (DPT)";
      this.listadoVacunas.push(DifteriaSegundoR);

      var sarampioSegundoR = new Vacunacion();
      sarampioSegundoR.edad = "5 años";
      sarampioSegundoR.tipoDosis = "Dosis segundo refuerzo";
      sarampioSegundoR.queProtege = "Sarampión - Rubeola - Paperas (SRP)";
      this.listadoVacunas.push(sarampioSegundoR);

      var polioSegundoR = new Vacunacion();
      polioSegundoR.edad = "5 años";
      polioSegundoR.tipoDosis = "Dosis segundo refuerzo";
      polioSegundoR.queProtege = "Polio";
      this.listadoVacunas.push(polioSegundoR);

      var varicelaSegundoR = new Vacunacion();
      varicelaSegundoR.edad = "5 años";
      varicelaSegundoR.tipoDosis = "Dosis refuerzo";
      varicelaSegundoR.queProtege = "Varicela";
      this.listadoVacunas.push(varicelaSegundoR);

    }

    if (this.dp.DatosUsuario.edadAnos > 5) {
      //vacunas complementarias
      var meningitisUnica = new Vacunacion();
      meningitisUnica.edad = "Vacunas Complementarias";
      meningitisUnica.tipoDosis = "Dosis unica";
      meningitisUnica.queProtege = "Meningitis meningocócica";
      this.listadoVacunas.push(meningitisUnica);

      var papilomaUnica = new Vacunacion();
      papilomaUnica.edad = "Vacunas Complementarias";
      papilomaUnica.tipoDosis = "Dosis unica";
      papilomaUnica.queProtege = "Papiloma humano VPH";
      this.listadoVacunas.push(papilomaUnica);

      var texoidePrimera = new Vacunacion();
      texoidePrimera.edad = "Vacunas Complementarias";
      texoidePrimera.tipoDosis = "Primera Dosis";
      texoidePrimera.queProtege = "Toxoide Tetánico";
      this.listadoVacunas.push(texoidePrimera);

      var texoideSegunda = new Vacunacion();
      texoideSegunda.edad = "Vacunas Complementarias";
      texoideSegunda.tipoDosis = "Segunda Dosis";
      texoideSegunda.queProtege = "Toxoide Tetánico";
      this.listadoVacunas.push(texoideSegunda);

      var texoideTercera = new Vacunacion();
      texoideTercera.edad = "Vacunas Complementarias";
      texoideTercera.tipoDosis = "Tercera Dosis";
      texoideTercera.queProtege = "Toxoide Tetánico";
      this.listadoVacunas.push(texoideTercera);

      var neumococoAdultaUnica = new Vacunacion();
      neumococoAdultaUnica.edad = "Vacunas Complementarias";
      neumococoAdultaUnica.tipoDosis = "Dosis unica";
      neumococoAdultaUnica.queProtege = "Neumococo Adulto";
      this.listadoVacunas.push(neumococoAdultaUnica);

      var fiebreAmarillaAU = new Vacunacion();
      fiebreAmarillaAU.edad = "Vacunas Complementarias";
      fiebreAmarillaAU.tipoDosis = "Dosis unica";
      fiebreAmarillaAU.queProtege = "Fiebre Amarilla";
      this.listadoVacunas.push(fiebreAmarillaAU);

      var difteriaAUnica = new Vacunacion();
      difteriaAUnica.edad = "Vacunas Complementarias";
      difteriaAUnica.tipoDosis = "Dosis unica";
      difteriaAUnica.queProtege = "DPT Difteria - Tosferina - tétano";
      this.listadoVacunas.push(difteriaAUnica);
    }

  }



}
