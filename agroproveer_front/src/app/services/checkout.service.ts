import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkout } from '../models/checkout/checkout.interface';
import { Orden } from '../models/orden.interface';
@Injectable({
  providedIn: 'root'
})
export class  CheckoutService {
  private apiUrl = `http://localhost:8096/api/venta/sendVenta`;
  private apiUrlBuscarOrden = `http://localhost:8096/api/venta`;


  constructor(private http: HttpClient) { }

  createCheckout(checkout: Checkout): Observable<Checkout> {
    return this.http.post<Checkout>(this.apiUrl, checkout);
  }

  getOrder(id: number, token: string): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrlBuscarOrden}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}