import { Injectable } from '@angular/core';
import { VacunacionServices } from '../../vacunacion/vacunacion.services';
import * as moment from 'moment'
import { Vacunacion } from 'src/app/Modelos/Vacunacion';

@Injectable({
  providedIn: 'root'
})
export class VacunacionImpresionService {

  constructor(
    private vacuna: VacunacionServices
  )
     { }

  public impresionPrograma(esPYP, listVacunacion) {
    try {
      if (esPYP && listVacunacion.length > 0) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(listVacunacion)
          },
          layout: {
            defaultBorder: true
          },
        };
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
  }

  body(listVacunacion: Array<Vacunacion>) {
    
    var body = [];
    try {
      if (listVacunacion.length > 0) {
        var titulo = [];

        titulo.push({ fontSize: 8, colSpan: 6, alignment: 'center', text: 'PROGRAMA VACUNACIÓN', bold: true }, {}, {}, {}, {}, {});
        body.push(titulo);

        listVacunacion.forEach(e => {
          

          if (e.tipoDato != null && e.observacion != null && e.lote != null && e.laboratorio != null) {
            body.push([
              { fontSize: 8, colSpan: 6, bold: true, text: e.edad + " - " + e.queProtege },
              {}, {}, {}, {}, {}
            ], [
              { fontSize: 8, text: e.tipoDosis },
              { fontSize: 8, text: e.tipoDato },
              { fontSize: 8, text: "IPS Vacunadora:" },
              { fontSize: 8, text: e.ipsVacunadora },
              { fontSize: 8, text: "Laboratorio:" },
              { fontSize: 8, text: e.laboratorio }
            ],
              [
                { fontSize: 8, text: "Lote" },
                { fontSize: 8, text: e.lote },
                { fontSize: 8, text: "Fecha Vencimiento" },
                { fontSize: 8, text: moment(e.fechaVencimiento).format("DD-MM-YYYY") },
                { fontSize: 8, text: "Fecha Próxima de vacunación" },
                { fontSize: 8, text: moment(e.fechaProxima).format("DD-MM-YYYY") }
              ],
              [
                { fontSize: 8, text: "Funcionario Vacunador:" },
                { fontSize: 8, text: e.funcionarioVacunador },
                { fontSize: 8, text: "Observación:" },
                { fontSize: 8, colSpan: 3, text: e.observacion },
                {},
                {}
              ]
            );
          }

        });
      }
    } catch (error) {
      
    }
    return body;
  }

}
