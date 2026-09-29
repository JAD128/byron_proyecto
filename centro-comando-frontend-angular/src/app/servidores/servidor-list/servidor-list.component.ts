import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NodoServidorService } from '../../core/services/nodo-servidor.service';
import { NodoServidor } from '../../core/models/nodo-servidor.model';

@Component({
  selector: 'app-servidor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servidor-list.component.html',
})
export class ServidorListComponent implements OnInit {
  private servidorService = inject(NodoServidorService);

  servidores: NodoServidor[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.servidorService.listar().subscribe({
      next: (data) => {
        this.servidores = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de servidores.';
        this.cargando = false;
      },
    });
  }

  eliminar(servidor: NodoServidor): void {
    if (!servidor.id) return;
    if (!confirm(`¿Eliminar el servidor "${servidor.nombre_host}"? Esta acción también eliminará sus incidencias y mantenimientos asociados.`)) {
      return;
    }
    this.servidorService.eliminar(servidor.id).subscribe({
      next: () => this.cargar(),
      error: () => (this.error = 'No se pudo eliminar el servidor.'),
    });
  }
}
