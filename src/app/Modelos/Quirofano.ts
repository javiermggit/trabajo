import { Ordenamiento, VMCup } from 'src/app/Modelos/Modelos';



//Clase para mostrar modal
export class GruposOrdenPropiosCx {
	public ordenes: Array<Ordenamiento>;
	public prioridad: number;
	public recomiendoRedPropia: boolean = true;
	public swMinutosAdicionales: boolean = false;
	public minutosAdicionales: number;
	justificacion: string;
	public insumos: Array<MaterialesAdicionales>;
	public Materiales: Array<MaterialesAdicionales>;
	public swRequiereAyudantia: boolean = false;
	public swRequiereInsumos: boolean = false;
	public swRequiereMateriales: boolean = false;

	constructor(){
		this.insumos = new Array<MaterialesAdicionales>();
		this.Materiales = new Array<MaterialesAdicionales>();
    	this.swRequierePreanestesiologiaGeneral = null;
		this.swRequiereAyudantia = false;
	}
	swRequierePreanestesiologiaGeneral: boolean | null = null;
}


export class OrdenesRedCirugia {
	public ordenes: Array<Ordenamiento>;
	public recomiendoRedPropia: boolean = true;
}


//Para agregar en radicacion
export class GruposOrdenRedCx {
	public ordenes: Array<Ordenamiento>;
	public prioridad: number;
	//guarda en la tabla de ordenamiento pendiente solo si  es redpropia true y recomendared aliada true
	public redPropia: boolean = true;
	public recomiendoRedAliada: boolean = true;
	public swMinutosAdicionales: boolean = false;
	public minutosAdicionales: number;
	public insumos: Array<MaterialesAdicionales>;

	constructor(){
		this.insumos = new Array<MaterialesAdicionales>();
	  this.swRequierePreanestesiologiaGeneral = null;
	}
	swRequierePreanestesiologiaGeneral: boolean = null;
	justificacion: string;
}






export class MaterialesAdicionales {
	public insumos: InsumosEspeciales;
	cantidad: number;
}

export class InsumosEspeciales {
	public id: number;
	codigo: string;
	descripcion: string;
}
export class respuestaValidacionCups {
	cups_Id: number;
	swEsAtendidoPorViva: boolean;
	swRequierePreanestesiologia: boolean;

}


export enum IngresoDesde {
	Index = 1,
	Conducta = 2
}


export class OrdenRedCx {
	public prioridad: number;
	//guarda en la tabla de ordenamiento pendiente solo si  es redpropia true y recomendared aliada true
	public redPropia: boolean = true;
	public recomiendoRedAliada: boolean = true;
	public swMinutosAdicionales: boolean = false;
	public minutosAdicionales: number;
	public insumos: Array<MaterialesAdicionales>;

	constructor(){
		this.insumos = new Array<MaterialesAdicionales>();
	}
	swRequierePreanestesiologiaGeneral: boolean;
	justificacion: string;

}
