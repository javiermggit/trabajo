/* export const environment = {
  production: false,
  title: 'Ordenamientos',
  env: 'Local',
  version: '3.0.0-beta',
  
  apiUrl: 'http://172.27.83.196:160/APIOrdenamientoHealth',
  apiMedicamento: 'http://172.27.83.196:160/APIMedicamentoHealth',
  apiImpresion: 'http://172.27.83.196:160/APIImpresion/',
  apiImpresionV2: 'http://172.27.83.196:160/APIImpresionV2',
  apiCorreo: 'http://172.27.83.196:160/APIEnvioCorreo/',
  link: 'http://172.27.83.196:160/EverHealth',
}; */


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Ordenamientos',
  env: 'Local',
  version: '3.0.0-beta',
  

  // URLs de APIs
  URLHc: "https://appportal.everestintelligent.com/APIHCHealthDTC",
URLParametrizacion: "/APIParametrizacionGeneralHealth",
URLPaciente: "/APIPacienteV2",
URLMedico: "/APIMedicoHealth",
URLImpresion: "/APIImpresion",
UrlOrdenamiento: "/APIOrdenamientoHealth",
UrlOrdenamientoV2: "/ApiOrdenamientoV2",
UrlLogin: "/EverHealth",
UrlPrestador: "https://appportal.everestintelligent.com/APIPrestadoresHealth",
UrlTeleconsulta: "https://appcita.viva1a.com.co:8051/teleconsulta",
URLExtension: "https://appcita.viva1a.com.co:8051/Directorioclicktocallapi/api",
UrlCIsign: "/APIConsentimientoInformadoTs/api",
URLApiCorreo: "/APIEnvioCorreo/api",
URLWhatsapp:"/apiperez_test/ApiWhatsapp",
UrlIntegracionDigiturno: "/ApiIntegarcionEverestDigiturnoPrueba/api",
UrlParametrizacionRecurso: "/APIParametrizacionRecurso",
UrlAgendamiento: "",
IdPais:1,
UrlPdf:"https://everestintelligent.com:444/apidelta_test/ApiImpresionUnificada/api/Prints",
tituloCliente:'DELTA',
numeroCliente:'1',
plantillaCliente:'c2e0eac5-bfd5-4f3c-96a4-5e3e73d7e7ea'



};


