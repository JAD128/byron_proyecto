import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NodoServidorService } from '../../core/services/nodo-servidor.service';
import { MOTORES_CONTENEDOR, NodoServidor } from '../../core/models/nodo-servidor.model';

@Component({
  selector: 'app-servidor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './servidor-form.component.html',
})
export class ServidorFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private servidorService = inject(NodoServidorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  motores = MOTORES_CONTENEDOR;
  servidorId: number | null = null;
  guardando = false;
  erroresServidor: Record<string, string[]> = {};

  form = this.fb.nonNullable.group({
    nombre_host: ['', [Validators.required, Validators.maxLength(100)]],
    direccion_ip: ['', [Validators.required]],
    motor_contenedores: ['podman' as NodoServidor['motor_contenedores'], [Validators.required]],
    proxy_inverso: [true],
    en_produccion: [true],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.servidorId = Number(idParam);
      this.servidorService.obtener(this.servidorId).subscribe((servidor) => {
        this.form.patchValue(servidor);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.erroresServidor = {};
    const datos = this.form.getRawValue();

    const peticion = this.servidorId
      ? this.servidorService.actualizar(this.servidorId, datos)
      : this.servidorService.crear(datos);

    peticion.subscribe({
      next: () => this.router.navigate(['/servidores']),
      error: (err) => {
        this.guardando = false;
        // DRF devuelve un objeto { campo: ["mensaje", ...] } en errores de validación (400)
        this.erroresServidor = err?.error && typeof err.error === 'object' ? err.error : {
          non_field_errors: ['Ocurrió un error al guardar el servidor.'],
        };
      },
    });
  }
}
