import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = `http://localhost:8096/api/producto`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl);
  }

  getProductosByUser(id: number, token: string): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.apiUrl}/vendedor/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  getProductoById(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: Productos, token: string): Observable<Productos> {
    return this.http.post<Productos>(this.apiUrl+"/save", producto, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  updateProducto(producto: Partial<Productos>, token: string): Observable<Productos> {
    console.log(producto);
    return this.http.put<Productos>(`${this.apiUrl}/actualizar`, producto, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  deleteProducto(id: number, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
} 