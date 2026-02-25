
export class Paraclinicos {
    public glicemiaBasal: string = "";
    public fechaResultadoglicemiaBasal: Date;
    public colesterolAltaDensidad: string = "";
    public fechaResultadocolesterolAltaDensidad: Date;
    public colesterolBajaDensidad: string = "";
    public fechaResultadocolesterolBajaDensidad: Date;
    public colesterolTotal: string = "";
    public fechaResultadocolesterolTotal: Date;
    public triglicerios: string = "";
    public fechaResultadotriglicerios: Date;
    public creatinina: string = "";
    public fechaResultadocreatinina: Date;
    public uroanalisis: string = "";
    public fechaResultadouroanalisis: Date;
    public profilaxisYRemocionDePlacaVac: string = "";
    public fechaResultadoprofilaxisYRemocionDePlacaVac: Date;
    public colesterolMuyBajaDensidad: string = "";
    public fechaResultadocolesterolMuyBajaDensidad: Date;

    public tienePSA: boolean = false;;
    public psa: string;
    public fechaResultadoPSA: Date;

    public examenMamografia: boolean = false;;
    public mamografia: string;
    public fechaResultadoExamenMamografia: Date;

    public pruebaTreponemica: string;
    public fechaTreponemica: Date;
    public pruebaVih: string;
    public fechaVih: Date;

    public tieneSaludBucal: boolean = false;;
    public fechaConsultaSaludBucal: Date;
    public saludBucal: string = "";

    hemograma: string;
    fechaHemograma: Date;

    glucosaEnSuero: string;
    fechaglucosaEnSuero: Date;

    hemoglobinaGlicosilada: string;
    fechaHemoglobinaGlicosilada: Date;
    creatininaEnOrina: string;
    fechaCreatininaEnOrina: Date;

    microalbuminuria: string;
    fechaMicroalbuminuria: Date;


    public examenRectal: boolean = false;;
    public rectal: string;


    public examenMama: boolean = false;;
    public mama: string;

}


export class TamisajesDeValoracion {
    public ojoDerecho: string = "";
    public ojoIzquierdo: string = "";
    public ojoDerechoOtro: string = "";
    public ojoIzquierdoOtro: string = "";
    public oidoDerecho: string = "";
    public oidoIzquierdo: string = "";
    public observaciones: string = "";
}


export class EvolucionMedicaDiagnostica {

    public factoresDeRiesgoBiologico: FactoresDeRiesgoBiologico;
    public planDeManejo: PlanDeManejo;
    public riesgoPsicosocial: boolean = false;
    public adultoSano: boolean = false;
    public observaciones: string = ""; //No se usa
    constructor() {
        this.factoresDeRiesgoBiologico = new FactoresDeRiesgoBiologico();
        this.planDeManejo = new PlanDeManejo();
    }

}
export class PlanDeManejo {
    public sano: boolean = false;
    public sinPatologia: boolean = false;
    public presentaPatologia: boolean = false;
    public educacionAdultoJoven: boolean = false;
}
export class FactoresDeRiesgoBiologico {
    public obesidad: boolean = false;
    public bajoPeso: boolean = false;
    public sobrePeso: boolean = false;
    public hiperlipidemia: boolean = false;
    public tabaquismo: boolean = false;
    public sedentarismo: boolean = false;
    public herenciaDeHtA: boolean = false;
    public acidoUrico: boolean = false;
}

export class IndiceBarthel {
    indice: Array<respuestaBarthel>;
    puntajeTotal: number;
    interpretacion: string;
}

export class respuestaBarthel {
    _id: number;
    pregunta: string;
    respuesta: number;
    respuestaDescripcion: string;
    referencia: string;
    puntaje: number;
}

export class TestLindaFried {
    perdidaPeso5kg: boolean = false;
    obserPerdidaPeso5kg: string;

    perdidaPeso3Meses: boolean = false;
    obserPerdidaPeso3Meses: string;

    imc: string;
    calculoIMC: boolean = false;
    obserCalculoIMC: string;

    haceEjercicioFrecuentemente: boolean = false;
    obserHaceEjercicioFrecuentemente: string;

    caminaLargasDistancia: boolean = false;
    obserCaminaLargasDistancia: string;

    caminaCortasDistancia: boolean = false;
    obserCaminaCortasDistancia: string;

    viveCansado: boolean = false;
    obserViveCansado: string;

    fuerzaMuscular: string;
    medicionFuerzaMuscular: boolean = false;
    obserMedicionFuerzaMuscular: string;

    caminaRitmoHabitual: boolean = false;
    obserCaminaRitmoHabitual: string;
    valocidadObtenida: string;

    interpretacion: string;
    puntaje: number;


}
export class TestMinimental {
    anioEnElQueEstamosCorrectamente: boolean = false;
    mesEnElQueEstamosCorrectamente: boolean = false;
    diaEnElQueEstamosCorrectamente: boolean = false;
    fechaHoyEnElQueEstamosCorrectamente: boolean = false;
    horaEnElQueEstamosCorrectamente: boolean = false;
    paisEnElQueEstamosCorrectamente: boolean = false;
    ciudadEnElQueEstamosCorrectamente: boolean = false;
    departamentoEnElQueEstamosCorrectamente: boolean = false;
    lugarEnElQueEstamosCorrectamente: boolean = false;
    barrioEnElQueEstamosCorrectamente: boolean = false

    repitioPalabraCasa: boolean = false;
    repitioPalabraMesa: boolean = false;
    repitioPalabraArbol: boolean = false;
    numeroVecesEnsayos: number;

    primerNumeroRestaoMes: boolean = false;
    segundoNumeroRestaoMes: boolean = false;
    terceroNumeroRestaoMes: boolean = false;
    cuartoNumeroRestaoMes: boolean = false;
    quintoNumeroRestaoMes: boolean = false;

    recordoPalabraCasa: boolean = false;
    recordoPalabraMesa: boolean = false;
    recordoPalabraArbol: boolean = false;

    dijoNombrePrimerObjeto: boolean = false;
    dijoNombreSegundoObjeto: boolean = false;

    repitioFraseCorrectamente: boolean = false;

    primeraOrden: boolean = false;
    segundaOrden: boolean = false;
    terceraOrden: boolean = false;

    leerFraseCorrectamente: boolean = false;
    escribirFraseCorrectamente: boolean = false;
    dibujoPentagonoCorrectamente: boolean = false;
    interpretacion: string;
    puntaje: number;

}

