import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NodoServidor } from '../models/nodo-servidor.model';

@Injectable({ providedIn: 'root' })
export class NodoServidorService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/servidores/`;

  listar(): Observable<NodoServidor[]> {
    return this.http.get<NodoServidor[]>(this.baseUrl);
  }

  obtener(id: number): Observable<NodoServidor> {
    return this.http.get<NodoServidor>(`${this.baseUrl}${id}/`);
  }

  crear(servidor: NodoServidor): Observable<NodoServidor> {
    return this.http.post<NodoServidor>(this.baseUrl, servidor);
  }

  actualizar(id: number, servidor: NodoServidor): Observable<NodoServidor> {
    return this.http.put<NodoServidor>(`${this.baseUrl}${id}/`, servidor);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
}
