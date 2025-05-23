import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:8096/api/usuarios';

  constructor(private http: HttpClient) { }

  getPerfil(numeroDocumento: string, token: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl + '/' + numeroDocumento, { headers: { 'Authorization':  'Bearer '+token } });
  }

  updatePerfil(usuario: Usuario, token: string): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl + '/actualizar', usuario, { headers: { 'Authorization':  'Bearer '+token } });
  }
}
