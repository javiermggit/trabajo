export class TestPostCovid {

  constructor() {
    this.tipoPostCovid = "Ambulatorio"
    this.osteomuscular = new Osteomuscular;
    this.cardiovascular = new Cardiovascular;
    this.neurologico = new Neurologico;
    this.respiratorio = new Respiratorio;
    this.digestivo = new Digestivo;
    this.otro = new Otro;
    this.sistemaCuerpoHumano = new Array<string>();
  }

  tipoPostCovid: string;
  esPrimeravez: boolean;
  esControl: boolean;
  fechaInicioSintomas: Date;
  fechaFinalSintomas: Date;
  osteomuscular: Osteomuscular;
  cardiovascular: Cardiovascular;
  neurologico: Neurologico;
  respiratorio: Respiratorio;
  digestivo: Digestivo;
  otro: Otro;
  sistemaCuerpoHumano: Array<string>;
}

export class Osteomuscular {
  dolorMuscular: string;
}

export class Cardiovascular {
  dolorPecho: string;
}

export class Neurologico {
  dolorCabeza: string;
  angustiadoTriste: string;
}

export class Respiratorio {
  tosPersistenteSeca: string;
  tosPersistenteExpectoracion: string;
}

export class Digestivo {
  dolorPermanenteEstomago: string;
}

export class Otro {
  presentadoFiebreDespuesDeCovid: string;
  perdidaPeso: string;
  manchasGranosBrotesPiel: string;
}

export class VMTieneTestCovid {
  tieneTestCovid: boolean;
  tieneTestPostCovid: boolean;
  testPostCovid: TestPostCovid;

  constructor() {
    this.testPostCovid = new TestPostCovid();
  }
}