import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AIAPIS, AiapiRecomendacion, datosMarcardos } from 'src/app/Modelos/CrecimientoDesarrollo';
import { delayedRetry } from 'src/app/pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiepiService {

  public datos: any;
  public aiepi: AIAPIS;


  _baseUrlHC: string;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this.aiepi = new AIAPIS();
    //this.aiepi.datosMarcardos = new Array<datosMarcardos>();
    this.aiepi.recomendaciones = new AiapiRecomendacion();
    this.aiepi.recomendaciones.generales = "";
    this.ObtenerDatos()
  }

  //#region Combos
  ObtenerDatos() {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Graficas/AIE3?categoriaId=2', { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener AIEPI nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      console.log("AIEPI",response);
      this.datos = response;
      //GENERAL
      var i = this.aiepi.datosMarcardos.indexOf(this.datos[0].padre.id);
      this.datos[0].padre.value = true;
      if (i == -1) {// si no existe 
        this.aiepi.datosMarcardos.push(this.datos[0].padre.id);
      }
      this.aiepi.recomendaciones.generales = "1.Se recuerda al acompañante los derechos del niño y que estos requieren una protección especial, para ello, es necesario seguir mejorando la situación de los niños sin distinción y procurar que éstos se desarrollen y sean educados en condiciones de paz y seguridad.\n2.	Garantizar al infante según su edad la protección de su salud, recordando el tránsito de la ingesta de leche materna exclusiva en menores de 6 meses y continuar con esta hasta el año de edad con alimentación complementaria. En niños mayores de 1 año comiendo diariamente alimentos de cada uno de los siete grupos, aumento del consumo diario de frutas al natural y de hortalizas y verduras, controlar el consumo en exceso de sal, dulce y graso de origen animal, para prevenir enfermedades. Se explica técnica de amamantamiento.\n3.	Prevención de enfermedades infecciosas lavándose las manos antes de preparar las comidas, hirviendo el agua y poniendo en práctica cuidados higiénicos en el manejo de los alimentos.\n4.	Compartir la alimentación en familia, para fortalecer hábitos alimentarios, valores, comportamientos y la unidad familiar.\n5.	Para vivir en armonía y construir la paz, exprese su amor y practique la tolerancia y solidaridad diaria.\n6.	Realizar deporte por lo menos tres veces por semana como parte de su estilo de vida y la del niño.\n7.	Pasar por valoración de salud oral y vacunación.";
 
      //VERIFICACION
      var i = this.aiepi.datosMarcardos.indexOf(this.datos[this.datos.length - 1].padre.id);
      this.datos[this.datos.length - 1].padre.value = true;
      if (i == -1) {// si no existe 
        this.aiepi.datosMarcardos.push(this.datos[this.datos.length - 1].padre.id);
      }

      /* 
      var i = this.aiepi.datosMarcardos.filter(x => x.padre == this.datos[0].padre.id);
      this.datos[0].padre.value = true;
 
      if (i.length != 0) {// si no existe 
        var n = new datosMarcardos();
        n.padre = this.datos[0].padre.id;
        this.aiepi.datosMarcardos.push(n);
      }
      
      //VERIFICACION
      var i = this.aiepi.datosMarcardos.filter(x => x.padre == this.datos[this.datos.length - 1].padre.id);
      this.datos[this.datos.length - 1].padre.value = true;
 
      if (i.length != 0) {// si no existe 
        var nv = new datosMarcardos();
        nv.padre = this.datos[this.datos.length - 1].padre.id;
        this.aiepi.datosMarcardos.push(nv);
      }
       */

    });
  }
}
