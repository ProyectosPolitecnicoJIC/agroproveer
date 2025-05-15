import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ProductoCart } from '../../models/productocart.interface';
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

  cartItems: ProductoCart[] = [];
  totalPrice: number = 0;

  ngOnInit() {
    this.cartService.getItemsObservable().subscribe((items) => {
      this.cartItems = items;
      this.getTotalPrice();
    });
  }
   
  getTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  
  
}