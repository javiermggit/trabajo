import { Component, OnInit, Output, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { IndicadoresService } from './indicadores.service';
import Swal from 'sweetalert2';
import { OdontologiaService } from '../odontologia.service';
import { Indicadorplaca, Odontograma, Odontogramas, Diente } from 'src/app/Modelos/Odontologia';
import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service';
import { EventEmitter } from 'protractor';
import { DienteIndicadorPlacaComponent } from './diente-indicador-placa/diente-indicador-placa.component';
import { DienteHistorialComponent } from './diente-historial/diente-historial.component';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {
  totalporcentaje: number;
  totalValorCOP: number;
  totalValorCEO: number;


  @ViewChildren(DienteIndicadorPlacaComponent) dientes: QueryList<DienteIndicadorPlacaComponent>;
  @ViewChildren(DienteHistorialComponent) dientesH: QueryList<DienteHistorialComponent>;

  constructor(public indicadores: IndicadoresService,
    public du: DatosPacienteService,
    public odontologia: OdontologiaService) {

    this.seleccionarEvento();
    this.indicadores.CalcularTotalCOPCEO();
  }

  ngOnInit() {
  }

  cargarOdontogramas() {
    Swal.fire({
      title: 'Esta seguro que desea capturar el indicador?',
      text: "una vez capturado no podra modificarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Capturar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {

        this.odontologia.indicadorPlaca.citaId = this.odontologia.hcOdontologia.citaId;
        this.odontologia.indicadorPlaca.fechaCreacion = new Date().toJSON().split('T')[0];
        this.odontologia.indicadorPlaca.observacion = "";

        var odontograma = new Odontograma();
        odontograma.dientes = this.indicadores.dientes
        odontograma.indicador = this.calcularPromedio(this.indicadores.dientes);
        this.odontologia.indicadorPlaca.odontograma.push(odontograma);


        if (this.indicadores.listIndicadores.length == 0) {
          this.indicadores.listIndicadores.push(this.odontologia.indicadorPlaca);
        } else {
          var d = this.indicadores.listIndicadores.filter(x => x.citaId == this.odontologia.hcOdontologia.citaId);
          if (d.length == 0) {
            this.indicadores.listIndicadores.push(this.odontologia.indicadorPlaca);
          }
        }

        var dienteArray = this.indicadores.dientes.filter(x => x.hallazgos.filter(c => c.evento == 'extraido').length > 0);
        this.indicadores.dientes = new Array<Diente>();
        this.indicadores.dientes = dienteArray;


        this.dientes.toArray().forEach(e => {
          var d = e.eventosDiente.hallazgos.filter(x => x.evento == 'placa');
          if (d.length > 0) {
            e.eventosDiente = { id: e.eventosDiente.id, hallazgos: [] };
          }
        });

        Swal.fire("Exito!!", "Indicador placa cargado Correctamente", "success");
      }
    })
  }

  calcularPromedio(listadoDiente) {
    
    var caratotal: number = 0;
    var totalextraido: number = 0;
    var adulto: boolean = false;
    
    var diente = listadoDiente.filter(x => x.hallazgos.filter(a => a.evento == 'placa').length > 0);
    diente.forEach(e => {
      var l = e.hallazgos.filter(z => z.evento != 'erupcionar');
			if (l.length > 0) {
        if (this.odontologia.numeroDientesAdulto.includes(e.id)) {
          adulto = true;
        }
      }
     
    });

    listadoDiente.forEach(e => {
      e.hallazgos.forEach(x => {
        if (x.evento == 'placa') {
          caratotal = caratotal + 1;
        }

        if (adulto) {
          if (e.id < 51) {
            if (x.evento == 'extraido') {
              totalextraido = totalextraido + 1;
            }
          }
        } else {
          if (e.id > 50) {
            if (x.evento == 'extraido') {
              totalextraido = totalextraido + 1;
            }
          }
        }
      });
    });

    if (adulto) {
      var dientestotal = 28;
    }
    else {
      var dientestotal = 20;
    }
    var totalCaras = (dientestotal - totalextraido) * 4;
    this.totalporcentaje = Number(((caratotal / totalCaras) * 100).toFixed(2));
    return this.totalporcentaje + "";
  }

  seleccionarEvento() {
    this.indicadores.eventos = "placa";
    this.indicadores.caras = [1, 2, 3, 4];
  }

  obtenerDatos(diente) {
    this.dientesH.toArray().forEach(e => {
      e.eventosDiente = { id: e.eventosDiente.id, hallazgos: [] };
    });

    this.dientesH.toArray().forEach(e => {
      diente.dientes.forEach(s => {
        if (s.id == e.value) {
          e.eventosDiente = s;
        }
      });
    });

    this.calcularPromedio(diente.dientes);
  }



}
