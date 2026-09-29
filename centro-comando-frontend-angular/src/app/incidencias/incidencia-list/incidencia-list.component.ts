import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { NodoServidorService } from '../../core/services/nodo-servidor.service';
import { IncidenciaServidor } from '../../core/models/incidencia.model';
import { NodoServidor } from '../../core/models/nodo-servidor.model';

@Component({
  selector: 'app-incidencia-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './incidencia-list.component.html',
})
export class IncidenciaListComponent implements OnInit {
  private incidenciaService = inject(IncidenciaService);
  private servidorService = inject(NodoServidorService);

  incidencias: IncidenciaServidor[] = [];
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
    this.incidenciaService.listar().subscribe({
      next: (data) => {
        this.incidencias = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de incidencias.';
        this.cargando = false;
      },
    });
  }

  nombreServidor(id: number): string {
    return this.servidoresPorId.get(id)?.nombre_host ?? `#${id}`;
  }

  marcarResuelta(incidencia: IncidenciaServidor): void {
    if (!incidencia.id) return;
    this.incidenciaService.resolver(incidencia.id).subscribe({
      next: () => this.cargar(),
      error: () => (this.error = 'No se pudo actualizar la incidencia.'),
    });
  }

  eliminar(incidencia: IncidenciaServidor): void {
    if (!incidencia.id) return;
    if (!confirm(`¿Eliminar la incidencia "${incidencia.titulo}"?`)) return;
    this.incidenciaService.eliminar(incidencia.id).subscribe({
      next: () => this.cargar(),
      error: () => (this.error = 'No se pudo eliminar la incidencia.'),
    });
  }
}
