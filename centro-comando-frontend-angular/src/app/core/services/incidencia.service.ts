import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IncidenciaServidor } from '../models/incidencia.model';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/incidencias/`;

  listar(): Observable<IncidenciaServidor[]> {
    return this.http.get<IncidenciaServidor[]>(this.baseUrl);
  }

  obtener(id: number): Observable<IncidenciaServidor> {
    return this.http.get<IncidenciaServidor>(`${this.baseUrl}${id}/`);
  }

  crear(incidencia: IncidenciaServidor): Observable<IncidenciaServidor> {
    return this.http.post<IncidenciaServidor>(this.baseUrl, incidencia);
  }

  actualizar(id: number, incidencia: IncidenciaServidor): Observable<IncidenciaServidor> {
    return this.http.put<IncidenciaServidor>(`${this.baseUrl}${id}/`, incidencia);
  }

  resolver(id: number): Observable<IncidenciaServidor> {
    return this.http.patch<IncidenciaServidor>(`${this.baseUrl}${id}/`, { resuelta: true });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
}
