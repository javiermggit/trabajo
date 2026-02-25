import { VMCup } from "./Modelos";


export class VMFechaResultadoOrdenamiento {
	public fecha: any;
	public cups: Array<VMResultadoOrdenamiento>;
}

export class VMResultadoOrdenamiento {
	public codigo: string;
	public cups: string;
	public profesional: string;
	public origen: string;
	public resultados: Array<ResultadoAnnar>;
}

export class ResultadoAnnar {
	public numeroAutorizacion: string;
  public mongoIdOrdenamiento: string;
	public cup: VMCup;
  public num_Peticion: string;
  public cod_Analito: string;
  public nom_Analito: string;
  public valor_Minimo: string;
  public valor_Maximo: string;
  public unidades: string;
  public resultado: string;
	public fecha_Recepcion: any;
	public fechaResultado: any;
	public fecha_Impresion_Entrega: any;
	public laboratorio_Id: string;
	public descripcionValorReferencia: string;
	public annarConseAsoc: number;
	public codigoSede: string;
	public estado: string;
	public profesional: any;
	public leidoPor: any;
	public consultaIdLeido: number;
	public leido: boolean = false;
}







export class ResultadoLaboratorioAnnar {
  public numeroAutorizacion: string;
  public mongoIdOrdenamiento: string;
	public cup: VMCup;
  public num_Peticion: string;
  public cod_Analito: string;
  public nom_Analito: string;
  public valor_Minimo: string;
  public valor_Maximo: string;
  public unidades: string;
  public resultado: string;
	public fecha_Recepcion: any;
	public fechaResultado: any;
	public fecha_Impresion_Entrega: any;
	public laboratorio_Id: string;
	public descripcionValorReferencia: string;
	public annarConseAsoc: number;
	public codigoSede: string;
	public estado: string;
	public profesional: any;
	public leido: boolean = false;
}





export class VMResultadoLab {
	public cup: VMCup;
	public fechaResultado: any;
	public descripcionResultado: string;
	public resultado: string;
	public numeroAutorizacion: string;
	public profesional: any;
	public codAnalito: string;
}