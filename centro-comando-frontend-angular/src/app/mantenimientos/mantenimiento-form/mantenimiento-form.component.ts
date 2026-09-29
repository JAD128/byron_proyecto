import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MantenimientoService } from '../../core/services/mantenimiento.service';
import { NodoServidorService } from '../../core/services/nodo-servidor.service';
import { MantenimientoNodo, TIPO_TAREA } from '../../core/models/mantenimiento.model';
import { NodoServidor } from '../../core/models/nodo-servidor.model';

@Component({
  selector: 'app-mantenimiento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './mantenimiento-form.component.html',
})
export class MantenimientoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private mantenimientoService = inject(MantenimientoService);
  private servidorService = inject(NodoServidorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tipos = TIPO_TAREA;
  servidores: NodoServidor[] = [];
  mantenimientoId: number | null = null;
  guardando = false;
  erroresMantenimiento: Record<string, string[]> = {};

  form = this.fb.nonNullable.group({
    servidor: [null as number | null, [Validators.required]],
    titulo_tarea: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion_tecnica: ['', [Validators.required]],
    tipo: ['actualizacion' as MantenimientoNodo['tipo'], [Validators.required]],
    fecha_programada: ['', [Validators.required]],
    completado: [false],
  });

  ngOnInit(): void {
    this.servidorService.listar().subscribe((data) => (this.servidores = data));

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.mantenimientoId = Number(idParam);
      this.mantenimientoService.obtener(this.mantenimientoId).subscribe((m) => {
        this.form.patchValue({
          ...m,
          // input type="datetime-local" espera "YYYY-MM-DDTHH:mm"
          fecha_programada: m.fecha_programada ? m.fecha_programada.slice(0, 16) : '',
        });
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.erroresMantenimiento = {};
    const datos = this.form.getRawValue() as any;

    const peticion = this.mantenimientoId
      ? this.mantenimientoService.actualizar(this.mantenimientoId, datos)
      : this.mantenimientoService.crear(datos);

    peticion.subscribe({
      next: () => this.router.navigate(['/mantenimientos']),
      error: (err) => {
        this.guardando = false;
        this.erroresMantenimiento = err?.error && typeof err.error === 'object' ? err.error : {
          non_field_errors: ['Ocurrió un error al guardar el mantenimiento.'],
        };
      },
    });
  }
}
