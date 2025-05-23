import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Orden } from '../../models/orden.interface';
import { CheckoutService } from '../../services/checkout.service';
import { LoginService } from '../../authentication/services/login.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-orden',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './buscar-orden.component.html',
  styleUrl: './buscar-orden.component.css'
})
export class BuscarOrdenComponent implements OnInit {
  ordenId: string = '';
  orden: Orden | null = null;
  loading: boolean = false;
  error: string | null = null;
  isLoggedIn: boolean = false;
  private token: string = '';

  constructor(
    private checkoutService: CheckoutService,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.token = localStorage.getItem('token') || '';
  }

  buscarOrden(): void {
    if (!this.ordenId) {
      this.error = 'Por favor ingresa un número de orden';
      return;
    }

    const id = parseInt(this.ordenId);
    if (isNaN(id)) {
      this.error = 'El número de orden debe ser un número válido';
      return;
    }

    this.loading = true;
    this.error = null;
    this.orden = null;

    this.checkoutService.getOrder(id, this.token).subscribe({
      next: (orden) => {
        this.orden = orden;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'No se encontró la orden o hubo un error al buscarla';
        this.loading = false;
      }
    });
  }

  getEstadoClass(estado: string): string {
    const estados: { [key: string]: string } = {
      'PENDIENTE': 'estado-pendiente',
      'CONFIRMADA': 'estado-confirmada',
      'ENVIADA': 'estado-enviada',
      'ENTREGADA': 'estado-entregada',
      'CANCELADA': 'estado-cancelada'
    };
    return estados[estado] || 'estado-default';
  }
}
