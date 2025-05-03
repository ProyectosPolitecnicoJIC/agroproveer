import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './basic/home/home.component';
import { AboutComponent } from './basic/about/about.component';
import { ShoppingcartComponent } from './basic/shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './basic/checkout/checkout.component';
import { ProductosComponent } from './basic/productos/productos.component';
import { AdminproductosComponent } from './basic/adminproductos/adminproductos.component';
export const routes: Routes = [
    { path: 'registro', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'cart', component: ShoppingcartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'mercado', component: ProductosComponent },
    { path: 'adminproductos', component: AdminproductosComponent }
];
