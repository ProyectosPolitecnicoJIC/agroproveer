import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../models/productos.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-myproducts',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './myproducts.component.html',
  styleUrl: './myproducts.component.css'
})
export class MyproductsComponent implements OnInit {
  productos: Productos[] = [];
  loading: boolean = true;
  error: string | null = null;
  private userDocument = JSON.parse(localStorage.getItem("userData") || '{}').cedula;
  private token: string | null = localStorage.getItem("token");

  constructor(
    private productosService: ProductosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    
    this.productosService.getProductosByUser(this.userDocument, this.token || '').subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        this.snackBar.open(this.error, 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  deleteProduct(id: number): void {
    // TODO: Implement delete functionality
    this.snackBar.open('Función de eliminación pendiente', 'Cerrar', {
      duration: 3000
    });
  }

  editProduct(id: number): void {
    // TODO: Implement edit functionality
    this.snackBar.open('Función de edición pendiente', 'Cerrar', {
      duration: 3000
    });
  }
}
