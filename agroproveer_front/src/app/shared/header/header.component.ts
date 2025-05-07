import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navigationItems = [
    { label: 'Inicio', route: '/home' },
    { label: 'Mercado', route: '/mercado' },
    { label: 'Sobre nosotros', route: '/about' },
    { label: 'Login', route: '/login' },
    { label: 'Registro', route: '/registro' },
  ];
}
