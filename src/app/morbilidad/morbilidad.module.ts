import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { DatosPacienteComponent } from '../datos-paciente/datos-paciente.component';
import { NgbTabsetModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AtencionPrimariaComponent } from './atencion-primaria/atencion-primaria.component';
import { AntecedentesComponent } from '../antecedentes/antecedentes.component';
import { HabitoGestionRiesgoComponent } from './habito-gestion-riesgo/habito-gestion-riesgo.component';
import { ExamenFisicoComponent } from './examen-fisico/examen-fisico.component';
import { ParaclinicosComponent } from './paraclinicos/paraclinicos.component';
import { PYMComponent } from './pym/pym.component';
import { ImpresionDiagnosticaComponent } from './impresion-diagnostica/impresion-diagnostica.component';
import { ConductaComponent } from './conducta/conducta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { CustomFormsModule } from 'ng2-validation'
import { MomentModule } from 'ngx-moment';
import { PesComponent } from './pes/pes.component';
import { CrecimientoDesarrolloComponent } from '../crecimiento-desarrollo/crecimiento-desarrollo/crecimiento-desarrollo.component';
import { PrenatalModule } from '../prenatal/prenatal.module';
import { PlanificacionFamiliarComponent } from '../planificacion-familiar/planificacion-familiar.component';
import { JovenComponent } from '../joven/joven/joven.component';
import { VacunacionComponent } from '../vacunacion/vacunacion.component';
import { VacunacionPipe } from '../vacunacion/vacunacion.pipe';
import { AdultoComponent } from '../adulto/adulto.component';
import { MamaComponent } from '../mama/mama.component';
import { CervixComponent } from '../cervix/cervix.component';
import { SaludMentalComponent } from '../salud-mental/salud-mental.component';
import { PipeTablaPipe } from '../visualizador-historico/pipe-tabla.pipe';
import { VisualizadorHistoricoComponent } from '../visualizador-historico/visualizador-historico.component';
import { ModalHistoricoParaclinicoComponent } from './paraclinicos/modal-historico-paraclinico/modal-historico-paraclinico.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NotaAdministrativaComponent } from '../nota-administrativa/nota-administrativa.component';
import { MatDialogModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatStepperModule, MatTableModule } from "@angular/material";
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ConfiguracionPYPComponent } from '../configuracion-pyp/configuracion-pyp.component';
import { AdolescenciaComponent } from '../adolescencia/adolescencia.component';
import { ApgarComponent } from '../apgar/apgar.component';
import { FamiliogramaComponent } from '../familiograma/familiograma.component';
import { Ecomapa } from '../Modelos/Adolescencia';
import { EcomapaComponent } from '../ecomapa/ecomapa.component';
import { FinnishriskComponent } from '../finnishrisk/finnishrisk.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from  '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Aie3Component } from '../crecimiento-desarrollo/AIE3/aie3.component';
import { ValeComponent } from '../crecimiento-desarrollo/vale/vale.component';
import { MchatComponent } from '../crecimiento-desarrollo/mchat/mchat.component';
import { LactanciaComponent } from '../crecimiento-desarrollo/Lactancia/lactancia.component';
import { AiepiComponent } from '../crecimiento-desarrollo/AIEPI/aiepi.component';
import { PuntuacionCrecimientoComponent } from '../puntuacion-crecimiento/puntuacion-crecimiento.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { TamizajeSaludMentalComponent } from '../tamizaje-salud-mental/tamizaje-salud-mental.component';
import { TamizajeSaludBucalComponent } from '../tamizaje-salud-bucal/tamizaje-salud-bucal.component';
import { ModalCitasAsignadasComponent } from '../modal-citas-asignadas/modal-citas-asignadas.component';
import { registerLocaleData } from '@angular/common';
// importar locales
import localeEsCo from '@angular/common/locales/es-CO';
import { ModalHistoricoApgarComponent } from '../apgar/modal-historico-apgar/modal-historico-apgar.component';
import { ModalHistoricoFamiliogramaComponent } from '../familiograma/modal-historico-familiograma/modal-historico-familiograma.component';
import { ModalHistoricoEcomapaComponent } from '../ecomapa/modal-historico-ecomapa/modal-historico-ecomapa.component';
import { AIEPIGeneralComponent } from '../aiepigeneral/aiepigeneral.component';
import { EpocComponent } from '../epoc/epoc.component';
import { VisualizacionHistorialEpocComponent } from '../epoc/visualizacion-historial-epoc/visualizacion-historial-epoc.component';
import { ModalCitasSegNoPresencialComponent } from './modal-citas-seg-no-presencial/modal-citas-seg-no-presencial.component';
import { ModalActualizarDatosSNPComponent } from './modal-actualizar-datos-snp/modal-actualizar-datos-snp.component';
import { IndexSeguimientoComponent } from '../segumiento/index/index-seguimiento.component';
import { AtencionPrimariaSegumientoComponent } from '../segumiento/atencion-primaria-segumiento/atencion-primaria-segumiento.component';
import { ImpresionDiagnosticaSegumientoComponent } from '../segumiento/impresion-diagnostica-segumiento/impresion-diagnostica-segumiento.component';
import { ModalOpcionesDigiturnoComponent } from './modal-opciones-digiturno/modal-opciones-digiturno.component';
import { ModalAddRecomendacionesCxComponent } from '../modal-add-recomendaciones-cx/modal-add-recomendaciones-cx.component';
import { ModalInsumosEspecialesComponent } from '../modal-add-recomendaciones-cx/modal-insumos-especiales/modal-insumos-especiales.component';

import { ModalCalcularFechaComponent } from '../modal-calcular-fecha/modal-calcular-fecha.component';
import { ModalPaquetesQxComponent } from '../modal-add-recomendaciones-cx/modal-paquetes-qx/modal-paquetes-qx.component';
import { ModalMaterialesEspecialesComponent } from '../modal-add-recomendaciones-cx/modal-materiales-especiales/modal-materiales-especiales.component';
import { OrdenamientosComponent } from './ordenamientos/ordenamientos.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { RecomendacionesComponent } from './conducta/recomendaciones/recomendaciones.component';
import { SeguimientosComponent } from './conducta/seguimientos/seguimientos.component';
registerLocaleData(localeEsCo, 'es-CO');

@NgModule({
  declarations: [
  PlanificacionFamiliarComponent,
  IndexComponent,
  IndexSeguimientoComponent,
  DatosPacienteComponent,
  AntecedentesComponent,
  AtencionPrimariaComponent,
  HabitoGestionRiesgoComponent,
  ExamenFisicoComponent,
  ParaclinicosComponent,
  PYMComponent,
  ImpresionDiagnosticaComponent,
  ImpresionDiagnosticaSegumientoComponent,
  ConductaComponent,
  OrdenamientosComponent,
  MedicamentosComponent,
  RecomendacionesComponent,
  SeguimientosComponent,
  PesComponent,
  JovenComponent,
  CrecimientoDesarrolloComponent,
  VacunacionComponent,
  VacunacionPipe,
  AdultoComponent,
  MamaComponent,
  CervixComponent,
  SaludMentalComponent,
  PipeTablaPipe,
  VisualizadorHistoricoComponent,
  ModalHistoricoParaclinicoComponent,
  NotaAdministrativaComponent,
  AtencionPrimariaSegumientoComponent,
  ConfiguracionPYPComponent,
  AdolescenciaComponent,
  ApgarComponent,
  TamizajeSaludMentalComponent,
  TamizajeSaludBucalComponent,
  FamiliogramaComponent,
  EcomapaComponent,
  FinnishriskComponent,
  Aie3Component,
  ValeComponent,
  MchatComponent,
  LactanciaComponent,
  AiepiComponent,
  AIEPIGeneralComponent,
  PuntuacionCrecimientoComponent,
  ModalCitasAsignadasComponent,
  EpocComponent,
  VisualizacionHistorialEpocComponent,
  ModalCitasSegNoPresencialComponent,
  ModalActualizarDatosSNPComponent,
  ModalOpcionesDigiturnoComponent,
  ModalAddRecomendacionesCxComponent,
  ModalInsumosEspecialesComponent,
  ModalCalcularFechaComponent,
  ModalPaquetesQxComponent,
  ModalMaterialesEspecialesComponent,
  RecomendacionesComponent,
  SeguimientosComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule,
    MomentModule,
    PrenatalModule,
    CommonModule,
    NgbTabsetModule,
    NgbAccordionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMultiSelectModule,
    NgbModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AngularEditorModule,
    GoogleChartsModule,
    MatDialogModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule
  ],
  exports: [
    DatosPacienteComponent,
    AntecedentesComponent,
    AtencionPrimariaComponent,
    AtencionPrimariaSegumientoComponent,
    HabitoGestionRiesgoComponent,
    ExamenFisicoComponent,
    ParaclinicosComponent,
    PYMComponent,
    ImpresionDiagnosticaComponent,
    ImpresionDiagnosticaSegumientoComponent,
    ConductaComponent,
    PlanificacionFamiliarComponent,
    VacunacionComponent,
    MamaComponent,
    CervixComponent,
    NotaAdministrativaComponent,
    ConfiguracionPYPComponent,
    PesComponent,
    AdolescenciaComponent,
    ApgarComponent,
    TamizajeSaludMentalComponent,
    TamizajeSaludBucalComponent,
    FamiliogramaComponent,
    EcomapaComponent,
    FinnishriskComponent,
    AdultoComponent,
    JovenComponent,
    CrecimientoDesarrolloComponent,
    Aie3Component,
    ValeComponent,
    MchatComponent,
    LactanciaComponent,
    AiepiComponent,
    PuntuacionCrecimientoComponent,
    ModalAddRecomendacionesCxComponent,
    ModalInsumosEspecialesComponent,
    ModalPaquetesQxComponent,
    ModalMaterialesEspecialesComponent
  ],
  entryComponents: [
    VisualizadorHistoricoComponent,
    ModalCitasAsignadasComponent,
    ModalHistoricoApgarComponent,
    ModalHistoricoFamiliogramaComponent,
    ModalHistoricoEcomapaComponent,
    ModalHistoricoParaclinicoComponent,
    VisualizacionHistorialEpocComponent,
    ModalCitasSegNoPresencialComponent,
    ModalActualizarDatosSNPComponent,
    ModalOpcionesDigiturnoComponent,
    ModalAddRecomendacionesCxComponent,
    ModalInsumosEspecialesComponent,
    ModalCalcularFechaComponent,
    ModalPaquetesQxComponent,
    ModalMaterialesEspecialesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe,  {provide: LOCALE_ID,
    useValue: 'es-CO'}]
})
export class MorbilidadModule { }
