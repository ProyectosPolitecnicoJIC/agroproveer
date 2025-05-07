import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorias } from '../models/categorias.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = `https://29cbed90-c872-430d-bf89-f1bdf67eca6c.mock.pstmn.io/categorias`;

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(this.apiUrl);
  }

  createCategoria(categoria: Categorias): Observable<Categorias> {
    return this.http.post<Categorias>(this.apiUrl, categoria);
  }

  updateCategoria(id: number, categoria: Categorias): Observable<Categorias> {
    return this.http.put<Categorias>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 