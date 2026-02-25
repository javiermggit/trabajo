
export class Paquete {
	id: number;
	programa_Id: number;
	descripcion: string;
	parPaquetePrograma: Array<PaquetePrograma> = new Array<PaquetePrograma>();
	swPrequirurgicos: boolean = false;
}


export class PaquetePrograma {
	id: number;
	paquete_Id: number;
	descripcion: string;
}



export class PaqueteCupPrograma {
	id: number;
	paquetePrograma_Id: number;
	tipo: string;
	codigo_Cup: string;
	estado: string;
	fechacreacion: Date;
}




export class parCupsAlertasHc {
	id: number;
	examen: string;
	codigo: string;
	estado: string;
	fechacreacion: Date;
}
