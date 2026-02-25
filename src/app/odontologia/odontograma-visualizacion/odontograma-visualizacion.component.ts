import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { OdontogramaVisualizacionService } from './odontograma-visualizacion.service';
import { OdontologiaService } from '../odontologia.service';
import { Odontogramas, Odontograma } from 'src/app/Modelos/Odontologia';
import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service';
import Swal from 'sweetalert2';
import { IndicadoresService } from '../indicadores/indicadores.service';
import { DientesVisualizacionComponent } from './dientes-visualizacion/dientes-visualizacion.component';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-odontograma-visualizacion',
  templateUrl: './odontograma-visualizacion.component.html',
  styleUrls: ['./odontograma-visualizacion.component.scss']
})
export class OdontogramaVisualizacionComponent implements OnInit {
  title: string;

  @ViewChildren(DientesVisualizacionComponent) public dientesOdontograma: QueryList<DientesVisualizacionComponent>;



  constructor(public se: OdontogramaVisualizacionService,
    public odontologia: OdontologiaService,
    public indicadorServices: IndicadoresService,
    public datosPaciente: DatosPacienteService) {
    this.seleccionarEvento('migracion', '');
    
    if (this.se.esControl) {
      this.title = "ODONTOGRAMA CONTROL"
    } else {
      if (this.se.isCapturado) {
        this.title = "ODONTOGRAMA GUARDADO"
      } else if (this.se.esUrgencia) {
        this.title = "ODONTOGRAMA URGENCIA"
      } else {
        this.title = "ODONTOGRAMA PRIMERA VEZ"
      }
    }
  }

  ngOnInit() { }

  /**
   * CAPTURA EL ODONTOGRAMA EN EL SERVICIOS
   */
  cargarOdontogramas() {
    Swal.fire({
      title: 'Esta seguro que desea capturar el odontograma inicial?',
      text: "una vez capturado no podra modificarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Capturar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        Swal.fire("Exito!!", "Odontograma cargado Correctamente", "success");
        this.odontologia.odontogramas = new Odontogramas();
        this.odontologia.odontogramas.citaId = this.odontologia.hcOdontologia.citaId;
        this.odontologia.odontogramas.esPrimeraVez = this.se.esPrimeravez;
        //this.odontologia.odontogramas.observacion = this.se.observacion;

        this.odontologia.odontogramas.odontograma = new Odontograma();
        this.odontologia.odontogramas.odontograma.dientes = this.se.dientes;

        this.se.capturarIndicador();

        this.se.dientes.forEach(x => {
          if (x.id != 18 && x.id != 28 && x.id != 48 && x.id != 38) {
            var hallazgo = x.hallazgos.filter(c => c.evento == 'extraido' || c.evento == 'erupcionar' || c.evento == 'exodoncia' || c.evento == 'exodonciaQx' || c.evento == 'numerario' || c.evento == 'corona' || c.evento == 'diastema' || c.evento == 'pontico' || c.evento == 'rr' || c.evento == 'rre')
            if (hallazgo.length > 0) {
              this.indicadorServices.dientes.push({ id: x.id, hallazgos: [{ cara: 1, estado: "", evento: "extraido", diagnostico: "" }] })
            }
          }
        });
        this.se.isCapturado = true;
      }
    })
  }


  /**
   * @param dato NOMBRE DEL EVENTO
   * @param color COLOR SI ES ROJO (r) O AZUL ()
   */
  seleccionarEvento(dato, color) {

    $(".lienaAzul").removeClass("lienaAzul");
    $("." + dato + color).addClass("lienaAzul");
    if (color == "") {
      this.se.estado = color;
    } else {
      this.se.estado = "-r";
    }
    this.monstrarCaras()
    this.se.eventos = dato;

    this.se.diente = null;
    this.se.cara = null;
    switch (this.se.eventos) {
      case "":
        this.ocultarCaras();
        $("#tratamiento1").prop("disabled", true);
        break;
      case "diastema":
        this.soloCarasLateral();
        break;
      case "carie":
        this.monstrarCaras();
        break;
      case "corona":
        this.ocultarCaras();
        break;
      case "endodoncia":
        this.ocultarCaras();
        break;
      case "erupcionar":
        this.ocultarCaras();
        break;
      case "exodoncia":
        this.ocultarCaras();
        break;
      case "exodonciaQx":
        this.ocultarCaras();
        break;
      case "extraido":
        this.ocultarCaras();
        break;
      case "fractura":
        this.monstrarCaras();
        break;
      case "incrustacion":
        this.ocultarCaras();
        break;
      case "mbs":
        this.monstrarCaras();
        break;
      case "mbh":
        this.monstrarCaras();
        break;
      case "migracion":
        this.soloCarasLateral();
        break;
      case "movilidad1":
        //rango();
        this.ocultarCaras();
        break;
      case "movilidad2":
        //rango();
        this.ocultarCaras();
        break;
      case "movilidad3":
        //rango();
        this.ocultarCaras();
        break;
      case "numerario":
        this.soloCarasLateral();
        break;
      case "intrusionextrusion":
        this.soloCarasFrontal();
        break;
      case "giroversion":
        this.ocultarCaras();
        break;
      case "obturacion":
        this.monstrarCaras();
        break;
      case "obturacionok":
        this.monstrarCaras();
        break;
      case "pontico":
        this.ocultarCaras();
        break;
      case "ok":
        this.ocultarCaras();
        break;
      case "radiografia":
        this.ocultarCaras();
        break;
      case "resina":
        this.monstrarCaras();
        break;
      case "restauracion":
        this.soloCarasFrontal();
        break;
      case "rr":
        this.soloCarasFrontalCentral();
        break;
      case "rre":
        this.soloCarasFrontalCentral();
        break;
      case "sellante":
        this.monstrarCaras();
        break;
      case "obturaciont":
        this.monstrarCaras();
        break;
      case "icdas3":
        this.monstrarCaras();
        break;
      case "icdas4":
        this.monstrarCaras();
        break;
      case "icdas5":
        this.monstrarCaras();
        break;
      case "icdas6":
        this.monstrarCaras();
        break;
    }
  }

  /**
   * activa todas las caras del diente
   */
  monstrarCaras() {
    this.se.caras = [1, 2, 3, 4, 5];
  }

  soloCarasLateral() {
    this.se.caras = [2, 4];
  }

  soloCarasFrontal() {
    this.se.caras = [1, 3];
  }

  soloCarasFrontalCentral() {
    this.se.caras = [1, 3, 5];
  }

  ocultarCaras() {
    this.se.caras = [0];
  }


}