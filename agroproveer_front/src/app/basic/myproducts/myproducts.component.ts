import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../models/productos.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditproductComponent } from '../editproduct/editproduct.component';

@Component({
  selector: 'app-myproducts',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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

  openEditDialog(producto?: Productos): void {
    console.log(producto);
    const dialogRef = this.dialog.open(EditproductComponent, {
      data: producto || null,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    this.productosService.deleteProducto(id, this.token || '').subscribe({
      next: () => {
        this.loadProducts();
        this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open('Error al eliminar el producto', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  editProduct(id: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      this.openEditDialog(producto);
    }
  }
}
