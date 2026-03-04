import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {
  citaId: string | null = null;
  identificacion: string | null = null;
  nombrePaciente: string | null = null;
  edadAnios: number | null = null;
  edadMeses: number | null = null;
  sexo: string | null = null;
  eps: string | null = null;
  correo: string | null = null;
  marcaciones: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe((params) => {
      this.citaId = params.get('citaId');
      this.identificacion = params.get('identificacion');
      this.nombrePaciente = params.get('nombrePaciente');

      const edadAniosRaw = params.get('edadAnios');
      const edadMesesRaw = params.get('edadMeses');
      this.edadAnios = edadAniosRaw !== null && edadAniosRaw !== '' ? Number(edadAniosRaw) : null;
      this.edadMeses = edadMesesRaw !== null && edadMesesRaw !== '' ? Number(edadMesesRaw) : null;
      if (Number.isNaN(this.edadAnios as number)) this.edadAnios = null;
      if (Number.isNaN(this.edadMeses as number)) this.edadMeses = null;

      this.sexo = params.get('sexo');
      this.eps = params.get('eps');
      this.correo = params.get('correo');
    });
  }

  get edadTexto(): string {
    if (this.edadAnios === null && this.edadMeses === null) return '-';
    if ((this.edadAnios ?? 0) === 0) {
      return `${this.edadMeses ?? 0} meses`;
    }
    return `${this.edadAnios} años${this.edadMeses ? ` y ${this.edadMeses} meses` : ''}`;
  }

  volver(): void {
    this.router.navigate(['..', 'vistahc'], { relativeTo: this.route });
  }
}
