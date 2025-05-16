import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkout } from '../models/checkout/checkout.interface';
@Injectable({
  providedIn: 'root'
})
export class  CheckoutService {
  private apiUrl = `http://localhost:8096/api/venta/sendVenta`;

  constructor(private http: HttpClient) { }

  createCheckout(checkout: Checkout): Observable<Checkout> {
    return this.http.post<Checkout>(this.apiUrl, checkout);
  }
}