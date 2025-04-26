import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Producto } from '../../models/producto.interface';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIcon,
    DecimalPipe
  ],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent implements OnInit {
  constructor(public cartService: CartService, public router: Router) {}

  cartItems: Producto[] = [];
  totalPrice: number = 0;

  ngOnInit() {
    this.cartService.getItemsObservable().subscribe((items) => {
      this.cartItems = items;
      this.getTotalPrice();
    });
    this.cartService.addItem(this.dummyCartItems[0]);
    this.cartService.addItem(this.dummyCartItems[1]);
    this.cartService.addItem(this.dummyCartItems[2]);
    this.cartService.addItem(this.dummyCartItems[3]);
  }
   
  getTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  dummyCartItems: Producto[] = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 100,
      cantidad: 1,
      imagen: '../../assets/Beneficio 1.jpg',
      vendedor_id: 1,
      categoria_id: 1
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 200,
      cantidad: 2,
      imagen: 'https://via.placeholder.com/150',
      vendedor_id: 1,
      categoria_id: 1
    },
    {
      id: 3,
      nombre: 'Producto 3',
      descripcion: 'Descripción del producto 3',
      precio: 300,
      cantidad: 3,
      imagen: 'https://via.placeholder.com/150',
      vendedor_id: 1,
      categoria_id: 1
    }, 
    {
      id: 4,
      nombre: 'Producto 4',
      descripcion: 'Descripción del producto 4',
      precio: 400,
      cantidad: 4,  
      imagen: 'https://via.placeholder.com/150',
      vendedor_id: 1,
      categoria_id: 1
    }
  ]
}