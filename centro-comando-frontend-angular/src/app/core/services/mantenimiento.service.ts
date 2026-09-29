import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MantenimientoNodo } from '../models/mantenimiento.model';

@Injectable({ providedIn: 'root' })
export class MantenimientoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/mantenimientos/`;

  listar(): Observable<MantenimientoNodo[]> {
    return this.http.get<MantenimientoNodo[]>(this.baseUrl);
  }

  obtener(id: number): Observable<MantenimientoNodo> {
    return this.http.get<MantenimientoNodo>(`${this.baseUrl}${id}/`);
  }

  crear(mantenimiento: MantenimientoNodo): Observable<MantenimientoNodo> {
    return this.http.post<MantenimientoNodo>(this.baseUrl, mantenimiento);
  }

  actualizar(id: number, mantenimiento: MantenimientoNodo): Observable<MantenimientoNodo> {
    return this.http.put<MantenimientoNodo>(`${this.baseUrl}${id}/`, mantenimiento);
  }

  marcarCompletado(id: number): Observable<MantenimientoNodo> {
    return this.http.patch<MantenimientoNodo>(`${this.baseUrl}${id}/`, { completado: true });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
}
