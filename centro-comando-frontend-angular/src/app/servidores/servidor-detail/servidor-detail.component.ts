import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IncidenciaServidor } from '../../core/models/incidencia.model';
import { NodoServidor } from '../../core/models/nodo-servidor.model';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { NodoServidorService } from '../../core/services/nodo-servidor.service';

@Component({
  selector: 'app-servidor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servidor-detail.component.html',
})
export class ServidorDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private servidorService = inject(NodoServidorService);
  private incidenciaService = inject(IncidenciaService);

  servidor: NodoServidor | null = null;
  incidencias: IncidenciaServidor[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.error = 'El identificador del servidor no es válido.';
      this.cargando = false;
      return;
    }

    this.servidorService.obtener(id).subscribe({
      next: (servidor) => {
        this.servidor = servidor;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la ficha del servidor.';
        this.cargando = false;
      },
    });
    this.incidenciaService.listar().subscribe({
      next: (incidencias) => this.incidencias = incidencias.filter((incidencia) => incidencia.servidor === id),
      error: () => this.error = 'No se pudieron cargar las incidencias del servidor.',
    });
  }
}
