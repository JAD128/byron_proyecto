import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MantenimientoService } from '../../core/services/mantenimiento.service';
import { NodoServidorService } from '../../core/services/nodo-servidor.service';
import { MantenimientoNodo } from '../../core/models/mantenimiento.model';
import { NodoServidor } from '../../core/models/nodo-servidor.model';

@Component({
  selector: 'app-mantenimiento-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mantenimiento-list.component.html',
})
export class MantenimientoListComponent implements OnInit {
  private mantenimientoService = inject(MantenimientoService);
  private servidorService = inject(NodoServidorService);

  mantenimientos: MantenimientoNodo[] = [];
  servidoresPorId = new Map<number, NodoServidor>();
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.servidorService.listar().subscribe((servidores) => {
      servidores.forEach((s) => this.servidoresPorId.set(s.id as number, s));
    });
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.mantenimientoService.listar().subscribe({
      next: (data) => {
        this.mantenimientos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la programación de mantenimientos.';
        this.cargando = false;
      },
    });
  }

  nombreServidor(id: number): string {
    return this.servidoresPorId.get(id)?.nombre_host ?? `#${id}`;
  }

  marcarCompletado(m: MantenimientoNodo): void {
    if (!m.id) return;
    this.mantenimientoService.marcarCompletado(m.id).subscribe({
      next: () => this.cargar(),
      error: () => (this.error = 'No se pudo actualizar el mantenimiento.'),
    });
  }

  eliminar(m: MantenimientoNodo): void {
    if (!m.id) return;
    if (!confirm(`¿Eliminar el mantenimiento "${m.titulo_tarea}"?`)) return;
    this.mantenimientoService.eliminar(m.id).subscribe({
      next: () => this.cargar(),
      error: () => (this.error = 'No se pudo eliminar el mantenimiento.'),
    });
  }
}
