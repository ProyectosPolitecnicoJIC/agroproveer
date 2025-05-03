import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../models/productos.interface';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ProductoCart } from '../../models/productocart.interface';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Productos[] = [];
  loading = true;

  constructor(private productosService: ProductosService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  addToCart(productId: number): void {
    let producto = this.productos.find(p => p.id === productId);
    if (producto) {
      let item: ProductoCart = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        imagen: producto.imagen,
        descripcion: producto.descripcion,
        vendedor_id: producto.vendedor_id,
        categoria_id: producto.categoria_id
      }
      this.cartService.addItem(item);
    }
  }


}
