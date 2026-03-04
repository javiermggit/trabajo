export class Citas {
    horaMostrar: String ='12:00';
    horaConsulta: String ='12:00';
    fechaUltimaConsulta: String='2026-02-23';
    citaId: String='001';
    citaIdCode: String='001';
    pacienteId: String='001'
    identificacion: String='123';
    nombrePaciente: String='pablo';
    estadoCita: String='Activa';
    estado: String='act';
    link: String='act';
    observacion: String='observacion';
    tipoAgendaAccesoId: number=1;
    tipoAgendaAcceso: String = 'TELECONSULTA';
    adicional: boolean = false;
    disableButton: boolean =false;
    edadAnios:number =30;
    edadMeses:number =24;
}

export class Especialidad {
    id: number =1;
    descripcion: String='Cardiologia';
    observacion: String='observacion especialidad';
    fechaCreacion: String='2026-02-23';
    fechaFin: String='2026-02-23';
    estado: String='Activo';
    appId: number =1;
    cupId: number =1;
    tipoMarcacionId: number =1;
    cup: String='CUP-001';
    swPermiteFechaConsulta: boolean =true;
}

export class CitasImpresion {
    horaMostrar: String ='12:00';
    horaConsulta: String ='12:00';
    fechaUltimaConsulta: String='2026-02-23';
    citaId: String='001';
    citaIdCode: String='001';
    pacienteId: String='001'
    identificacion: String='123';
    nombrePaciente: String='pablo';
    estadoCita: String='Activa';
    estado: String='act';
    horaApertura: String='08:00';
    horaCierre: String='17:00';

}

export class Cups {
  codigo: string;
  descripcion: string;
  notaTecnica: string;
  estado: string | null;
  swIsHistoriaProcedimiento: boolean | null;
}
