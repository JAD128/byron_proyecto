import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { NodoServidorService } from '../../core/services/nodo-servidor.service';
import { IncidenciaServidor, NIVELES_SEVERIDAD } from '../../core/models/incidencia.model';
import { NodoServidor } from '../../core/models/nodo-servidor.model';

@Component({
  selector: 'app-incidencia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './incidencia-form.component.html',
})
export class IncidenciaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private incidenciaService = inject(IncidenciaService);
  private servidorService = inject(NodoServidorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  niveles = NIVELES_SEVERIDAD;
  servidores: NodoServidor[] = [];
  incidenciaId: number | null = null;
  guardando = false;
  erroresIncidencia: Record<string, string[]> = {};

  form = this.fb.nonNullable.group({
    servidor: [null as number | null, [Validators.required]],
    titulo: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: ['', [Validators.required]],
    severidad: ['media' as IncidenciaServidor['severidad'], [Validators.required]],
    resuelta: [false],
  });

  ngOnInit(): void {
    this.servidorService.listar().subscribe((data) => (this.servidores = data));

    const idParam = this.route.snapshot.paramMap.get('id');
    const servidorParam = this.route.snapshot.queryParamMap.get('servidor');
    if (idParam) {
      this.incidenciaId = Number(idParam);
      this.incidenciaService.obtener(this.incidenciaId).subscribe((incidencia) => {
        this.form.patchValue(incidencia);
      });
    } else if (servidorParam) {
      this.form.patchValue({ servidor: Number(servidorParam) });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.erroresIncidencia = {};
    const datos = this.form.getRawValue() as any;

    const servidorId = this.form.controls.servidor.value;
    const peticion = this.incidenciaId
      ? this.incidenciaService.actualizar(this.incidenciaId, datos)
      : this.incidenciaService.crear(datos);

    peticion.subscribe({
      next: () => this.router.navigate(
        servidorId ? ['/servidores', servidorId] : ['/incidencias'],
      ),
      error: (err) => {
        this.guardando = false;
        this.erroresIncidencia = err?.error && typeof err.error === 'object' ? err.error : {
          non_field_errors: ['Ocurrió un error al guardar la incidencia.'],
        };
      },
    });
  }
}
