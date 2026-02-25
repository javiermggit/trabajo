import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OdontogramaVisualizacionService } from '../odontograma-visualizacion.service';
import { Diente } from 'src/app/Modelos/Odontologia';
import { VMDiagnosticoOdontologico, VMCup } from 'src/app/Modelos/Modelos';
import { ImpresionDiagnosticaOdontoService } from '../../impresion-diagnostica-odonto/impresion-diagnostica-odonto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EvolucionService } from '../../evolucion/evolucion.service';
import { MedicoService } from 'src/app/medico/medico.service';

@Component({
	selector: 'app-dientes-visualizacion',
	templateUrl: './dientes-visualizacion.component.html',
	styleUrls: ['./dientes-visualizacion.component.scss']
})

export class DientesVisualizacionComponent implements OnInit {
	@Input() value: number;
	eventosDiente: Diente;
	diagnostico: any;
	@Input() diente: number;
	@Input() estado: any;

	@ViewChild('content', { static: false }) private content;

	constructor(public se: OdontogramaVisualizacionService,
		public impDiagnostico: ImpresionDiagnosticaOdontoService,
		public evolu: EvolucionService,
		public med: MedicoService,
		public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.eventosDiente = this.se.obtenerEventosDiente(this.value);
	}

	cambiarCara(cara: number) {
		this.se.cambiarCaraDiente(cara, this.value, this.content);
		this.eventosDiente = this.se.obtenerEventosDiente(this.value);
	}

	seleccionarDiente(diente: number) {
		//alert(diente);
	}

	agregarDiagnostico() {
		
		if (this.diagnostico != undefined) {
			if (this.diagnostico.codigo != "K007") {
				let diagnostico = new VMDiagnosticoOdontologico();
				diagnostico.id = this.diagnostico.id;
				diagnostico.diente = this.se.dienteSeleccionado.diente;
				diagnostico.cara = this.se.dienteSeleccionado.cara;
				diagnostico.codigo = this.diagnostico.codigo;
				diagnostico.evento = this.se.dienteSeleccionado.evento;
				diagnostico.descripcion = this.diagnostico.descripcion;
				this.impDiagnostico.diagnosticos.push(diagnostico);
				this.se.modal.close(diagnostico)
			} else {
				this.se.modal.close(null)
			}
		}



	}

}

