import { ComentariosRecomendacionesSeguimiento, PatronesCrecimiento, RutinasHabitosSaludables, SeguimientoEscalaAbreviadaDesarrollo, SeguimientoPrograma } from "./CrecimientoDesarrollo";

export class VMRutinasHabitos{
  fechaCreacion:Date;
  public rutinasHabitos: RutinasHabitosSaludables;
}

export class VMSeguimientoPrograma{
  fechaCreacion:Date;
  public seguimientoPrograma: SeguimientoPrograma;
  public seguimientoEscalaAbreviadaDesarrollo: SeguimientoEscalaAbreviadaDesarrollo;
  public patronesCrecimiento: PatronesCrecimiento;
  public comentariosRecomendacionesSeguimiento: ComentariosRecomendacionesSeguimiento;
}




export class VMTamizajeAnemiaResult{

  edad:number;
  fechaCreacion:Date;
  swObligarlo:boolean;
  codigoCup:string;

}