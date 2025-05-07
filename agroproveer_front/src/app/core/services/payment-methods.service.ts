import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {
  readonly paymentMethods = [
    { value: 'CREDIT_CARD', label: 'Tarjeta de crédito' },
    { value: 'BANK_TRANSFER', label: 'Transferencia bancaria' },
    { value: 'CASH', label: 'Efectivo' }
  ];

  constructor() { }

  getPaymentMethods(): { value: string, label: string }[] {
    return this.paymentMethods;
  }
} 