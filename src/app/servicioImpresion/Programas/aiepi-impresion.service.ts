import { Injectable } from '@angular/core';
import { AiepiService } from 'src/app/crecimiento-desarrollo/AIEPI/aiepi.service';
import { AIAPIS } from 'src/app/Modelos/CrecimientoDesarrollo';

@Injectable({
  providedIn: 'root'
})
export class AiepiImpresionService {

  constructor(
    private aiepi: AiepiService
  ) { }


  impresionProgramaAIEPI(esCD, CDHC: AIAPIS) {

    try {
      if (esCD && this.aiepi.datos.length > 0) {
        return {
          table: {
            widths: ['20%', '13%', '20%', '13%', '20%', '13%'],
            body: this.body(CDHC)
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


  body(aiepiHC: AIAPIS) {

    var body = [];

    body.push([{ fontSize: 8, bold: true, colSpan: 6, text: 'ESTRATEGIA AIEPI PARA NIÑOS DE DOS MESES A CINCO AÑOS' }, {}, {}, {}, {}, {}]);
    this.aiepi.datos.forEach(x => {
      body.push([{ fontSize: 8, bold: true, colSpan: 6, text: x.padre == null ? "" : x.padre.descripcion }, {}, {}, {}, {}, {}]);
      x.hijos.forEach(z => {
        var hijo = aiepiHC.datosMarcardos.filter(e => z.padre.id == e);
        var respuesta = 'NO';
        if (hijo.length != 0) {
          respuesta = 'SI';
        }
        var respuestas = [];
        respuestas.push({ fontSize: 8, colSpan: 5, text: z.padre == null ? "" : z.padre.descripcion }, {}, {}, {}, {},
          { fontSize: 8, text: respuesta });
        body.push(respuestas);
      });
    });

    body.push([
      { fontSize: 8, colSpan: 6, text: 'Signos de alarma:\n' + aiepiHC.recomendaciones.signoAlarma },
      {},
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, colSpan: 6, text: 'Recomendaciones para el desarrollo:\n' + aiepiHC.recomendaciones.desarrollo },
      {},
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, colSpan: 6, text: 'Recomendaciones de buen trato:\n' + aiepiHC.recomendaciones.buenTrato },
      {},
      {},
      {},
      {},
      {},
    ], [
      { fontSize: 8, colSpan: 6, text: 'Recomendaciones Generales:\n' + aiepiHC.recomendaciones.generales },
      {},
      {},
      {},
      {},
      {},
    ]);


    return body;
  }
}
