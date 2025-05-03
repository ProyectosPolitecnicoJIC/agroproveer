import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = `https://29cbed90-c872-430d-bf89-f1bdf67eca6c.mock.pstmn.io/productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl);
  }

  getProductoById(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(this.apiUrl, producto);
  }
} 