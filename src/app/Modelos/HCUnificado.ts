import { HCEnfermeria } from './Enfermeria';
import { HCAnestesiologia } from './HCAnestesiologia';
import { HCMorbilidad, VMPaciente } from './Modelos';
import { HCOdontologia, VMOdontologiaOdontograma } from './Odontologia';
import { HCProcedimiento } from './Procedimiento';

export class HCUnificado {
	public datosPaciente: VMPaciente;
	public contrato: string;
	public listaMorbilidad: Array<HCMorbilidad>;
	public listaEnfermeria: Array<HCEnfermeria>;
	public listaOdontologia: Array<VMOdontologiaOdontograma>;
	public listaProcedimiento: Array<HCProcedimiento>;

	listadoGraficas: Array<any>;
	listadoPreguntas: ListadoPreguntas;
}

export class ListadoPreguntas {
	vale: any;
	apgar: any;
	saludMental: any;
	MChat: any;
	lactancia: any;
}

export class ReimpresionMorbilidad {
	public datosPaciente: VMPaciente;
	public morbilidad: HCMorbilidad;
	listadoGraficas: Array<any>;
	listadoPreguntas: ListadoPreguntas;

}

export class ReimpresionEnfermeria {
	public datosPaciente: VMPaciente;
	public enfermeria: HCEnfermeria;
	listadoGraficas: Array<any>;
	listadoPreguntas: ListadoPreguntas;

}

export class ReimpresionOdontologia {
	public datosPaciente: VMPaciente;
	public odontologia: VMOdontologiaOdontograma;
}

export class ReimpresionProcedimientos {
	public datosPaciente: VMPaciente;
	public procedimiento: HCProcedimiento;
}

export class ReimpresionAnestesiologia {
	public datosPaciente: VMPaciente;
	public anestesiologia: HCAnestesiologia;

}
