import { Diagnostico, VMCup, Ordenamiento, Certificado, OrdenamientoHC } from './Modelos';
import { ResultadoCitologia } from './Cervix';

export class Nota {
	datoPaciente: any;
	public diagnostico: Array<Diagnostico>;
	public nota: string;
	public cup: Array<Ordenamiento>;
	public citaId: string;
	public pacienteId: number;
	public usuarioCreacion: string;
	public medico: string;
	public especialidad: string;
	public fechaCreacion: string;

	public certificadoAislamiento: Certificado;
	public swCertificadoAislamiento: boolean = false;

	public certificadoReintegro: Certificado;
	public swCertificadoReintegro: boolean = false;
	public  OrdenamientoHC:OrdenamientoHC;
}


export class NotaResultadoCervix {
	public citaId: string;
	public pacienteId: number;
	public resultado: ResultadoCitologia;

	constructor() {
		this.resultado = new ResultadoCitologia();
	}

}
export interface Par_NotaAdministrativa
{
    id: number;
    minTiempoVencimiento: number;
    estado: string;
    fechaCreacion: string;
}
