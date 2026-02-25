import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { CrecimientoDesarrolloService } from '../crecimiento-desarrollo.service';
import { puntuacionRango } from 'src/app/Modelos/prueba';
import { MorbilidadService } from 'src/app/morbilidad/morbilidad.service';
import { EMPTY, Observable } from 'rxjs';
import { delayedRetry } from 'src/app/pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Aie3Service {

  public datos: any;
  public datosMarcardosMG: Array<number> = []
  public datosMarcardosMF: Array<number> = []
  public datosMarcardosAL: Array<number> = []
  public datosMarcardosPS: Array<number> = []


  conDatos: boolean = false;

  public mg: string = '0';
  public mf: string = '0';
  public al: string = '0';
  public ps: string = '0';

  public hmg: string = '0';
  public hmf: string = '0';
  public hal: string = '0';
  public hps: string = '0';

  public mgResult: string = '0';
  public mfResult: string = '0';
  public alResult: string = '0';
  public psResult: string = '0';


  public puntuaciones: puntuacionRango[];
  public puntuacionesVisualizacion: puntuacionRango[];


  _baseUrlHC: string;
  _baseUrlPaciente: string;

  constructor(
    private http: HttpClient,
     //@Inject('URLHc') baseUrlHc: string,
     //@Inject('URLPaciente') baseUrlPaciente: string,
     public ms: MorbilidadService
      ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlPaciente = environment.URLPaciente;
  }

  //#region Combos  EAD-3
  ObtenerDatos(datos: any) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Graficas/AIE3?categoriaId=1&seleccionados=' + datos, { responseType: "json" }).pipe(
      delayedRetry(30000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener AED3 nuevamente...');
        return EMPTY
      })
    ).subscribe((response) => {
      console.log("AED3",response);
      this.datos = response;
    }, error => {
      console.log('intentando obtener AED3 nuevamente...');
    })
  }

  graficar(edadCorregida: number): Observable<boolean> {

    return Observable.create(observer => {
      let datosIn = new AreaIn();
      datosIn.MG = this.datosMarcardosMG;
      datosIn.MF = this.datosMarcardosMF;
      datosIn.AL = this.datosMarcardosAL;
      datosIn.PS = this.datosMarcardosPS;

      //this._baseUrlPaciente ojo cambiar ur api
      var url = this._baseUrlPaciente + '/api/Paciente/ObtenerArea/' + edadCorregida//this.crecim.Hc.seguimientoPrograma.rangoEdad;
      this.http.post<AreaOut>(url, datosIn, { responseType: "json" }).subscribe((response) => {
        
        this.conDatos = true;
        this.mg = response.mg;
        this.mf = response.mf;
        this.al = response.al;
        this.ps = response.ps;

        this.cambiarItem(response.rango);

        observer.next(true);
        observer.complete();
      }, error => {
        this.conDatos = false;
      })


    });
  }

  red: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  green: number[] = [62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

  generarVector() {
    this.hmg = this.mg;
    this.hmf = this.mf;
    this.hal = this.al;
    this.hps = this.ps;

    if (this.red.includes(parseInt(this.mg))) {
      this.hmg = "-";
    }
    if (this.red.includes(parseInt(this.mf))) {
      this.hmf = "-";
    }
    if (this.red.includes(parseInt(this.al))) {
      this.hal = "-";
    }
    if (this.red.includes(parseInt(this.ps))) {
      this.hps = "-";
    }

    if (this.green.includes(parseInt(this.mg))) {
      this.hmg = "--";
    }
    if (this.green.includes(parseInt(this.mf))) {
      this.hmf = "--";
    }
    if (this.green.includes(parseInt(this.al))) {
      this.hal = "--";
    }
    if (this.green.includes(parseInt(this.ps))) {
      this.hps = "--";
    }

    if (parseInt(this.mg) > 100) {
      this.hmg = "100";
    }
    if (parseInt(this.mf) > 100) {
      this.hmf = "100";
    }
    if (parseInt(this.al) > 100) {
      this.hal = "100";
    }
    if (parseInt(this.ps) > 100) {
      this.hps = "100";
    }

    this.puntuaciones = [
      {
        rango: 1,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 35, color: 'red' },
              { inicial: 36, final: 48, color: 'yellow' },
              { inicial: 49, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 31, color: 'red' },
              { inicial: 32, final: 52, color: 'yellow' },
              { inicial: 53, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 19, color: 'red' },
              { inicial: 20, final: 29, color: 'yellow' },
              { inicial: 30, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 16, color: 'red' },
              { inicial: 17, final: 33, color: 'yellow' },
              { inicial: 34, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 2,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 30, color: 'red' },
              { inicial: 31, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 25, color: 'red' },
              { inicial: 26, final: 32, color: 'yellow' },
              { inicial: 33, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 30, color: 'red' },
              { inicial: 31, final: 39, color: 'yellow' },
              { inicial: 40, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 3,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 32, color: 'red' },
              { inicial: 33, final: 41, color: 'yellow' },
              { inicial: 42, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 39, color: 'yellow' },
              { inicial: 40, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 24, color: 'red' },
              { inicial: 25, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 39, color: 'yellow' },
              { inicial: 40, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 4,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 36, color: 'red' },
              { inicial: 37, final: 43, color: 'yellow' },
              { inicial: 44, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 38, color: 'red' },
              { inicial: 39, final: 45, color: 'yellow' },
              { inicial: 46, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 26, color: 'red' },
              { inicial: 27, final: 41, color: 'yellow' },
              { inicial: 42, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 39, color: 'yellow' },
              { inicial: 40, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 5,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 34, color: 'red' },
              { inicial: 35, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 38, color: 'red' },
              { inicial: 39, final: 44, color: 'yellow' },
              { inicial: 45, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 35, color: 'red' },
              { inicial: 36, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 45, color: 'red' },
              { inicial: 46, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 6,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 39, color: 'yellow' },
              { inicial: 40, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 45, color: 'red' },
              { inicial: 46, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 38, color: 'red' },
              { inicial: 39, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 37, color: 'red' },
              { inicial: 38, final: 41, color: 'yellow' },
              { inicial: 42, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 7,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 32, color: 'red' },
              { inicial: 33, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 34, color: 'red' },
              { inicial: 35, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 43, color: 'yellow' },
              { inicial: 44, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 30, color: 'red' },
              { inicial: 31, final: 39, color: 'yellow' },
              { inicial: 40, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 8,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 29, color: 'red' },
              { inicial: 30, final: 38, color: 'yellow' },
              { inicial: 39, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 34, color: 'red' },
              { inicial: 35, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 32, color: 'red' },
              { inicial: 33, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 29, color: 'red' },
              { inicial: 30, final: 41, color: 'yellow' },
              { inicial: 42, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 9,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 32, color: 'red' },
              { inicial: 33, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 32, color: 'red' },
              { inicial: 33, final: 38, color: 'yellow' },
              { inicial: 39, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 30, color: 'red' },
              { inicial: 31, final: 39, color: 'yellow' },
              { inicial: 40, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 30, color: 'red' },
              { inicial: 31, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 10,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 29, color: 'red' },
              { inicial: 30, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 33, color: 'red' },
              { inicial: 34, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 32, color: 'red' },
              { inicial: 33, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 11,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 29, color: 'red' },
              { inicial: 30, final: 42, color: 'yellow' },
              { inicial: 43, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 34, color: 'red' },
              { inicial: 35, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 34, color: 'red' },
              { inicial: 35, final: 40, color: 'yellow' },
              { inicial: 41, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 32, color: 'red' },
              { inicial: 33, final: 38, color: 'yellow' },
              { inicial: 39, final: 100, color: 'green' }
            ]
          }
        ]
      },
      {
        rango: 12,
        ListadoAreas: [
          {
            nombre: 'MG',
            seleccion: this.hmg,
            listoColores: [
              { inicial: 0, final: 36, color: 'red' },
              { inicial: 37, final: 50, color: 'yellow' },
              { inicial: 51, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'MF',
            seleccion: this.hmf,
            listoColores: [
              { inicial: 0, final: 36, color: 'red' },
              { inicial: 37, final: 45, color: 'yellow' },
              { inicial: 46, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'AL',
            seleccion: this.hal,
            listoColores: [
              { inicial: 0, final: 30, color: 'red' },
              { inicial: 31, final: 46, color: 'yellow' },
              { inicial: 47, final: 100, color: 'green' }
            ]
          },
          {
            nombre: 'PS',
            seleccion: this.hps,
            listoColores: [
              { inicial: 0, final: 38, color: 'red' },
              { inicial: 39, final: 60, color: 'yellow' },
              { inicial: 61, final: 100, color: 'green' }
            ]
          }
        ]
      }
    ];




  }

  cambiarItem(edadRango) {

    this.generarVector();
    this.puntuacionesVisualizacion = this.puntuaciones.filter(c => c.rango == edadRango);

    if (this.puntuacionesVisualizacion.length == 0) {
      this.conDatos = false;
    } else {
      this.puntuacionesVisualizacion[0].ListadoAreas.forEach(x => {
        x.listoColores.forEach(c => {
          if (x.nombre == "MG") {
            if (c.inicial <= parseInt(this.mg) && parseInt(this.mg) <= c.final) {
              this.mgResult = c.color;
            }
          }

          if (x.nombre == "MF") {
            if (c.inicial <= parseInt(this.mf) && parseInt(this.mf) <= c.final) {
              this.mfResult = c.color
            }
          }

          if (x.nombre == "AL") {
            if (c.inicial <= parseInt(this.al) && parseInt(this.al) <= c.final) {
              this.alResult = c.color
            }
          }

          if (x.nombre == "PS") {
            if (c.inicial <= parseInt(this.ps) && parseInt(this.ps) <= c.final) {
              this.psResult = c.color
            }
          }
        });
      });
    }
  }
}


export class AreaIn {
  public MG: Array<number>;
  public MF: Array<number>;
  public AL: Array<number>;
  public PS: Array<number>;
}

export class AreaOut {
  public mg: string;
  public mf: string;
  public al: string;
  public ps: string;
  public rango: number;
}