import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  navigationItems: any = [];

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tokenSubject.subscribe(() => {
      this.updateNavigationItems();
    });

    window.addEventListener('storage', () => {
      this.tokenSubject.next(localStorage.getItem('token'));
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  private updateNavigationItems(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userDataString = localStorage.getItem('userData');
      if (userDataString && (JSON.parse(userDataString).exp > Date.now() / 1000)) {
        this.navigationItems = [
          { label: 'Inicio', route: '/home' },
          { label: 'Mercado', route: '/mercado' },
          { label: 'Sobre nosotros', route: '/about' },
          { label: 'Perfil', route: '/perfil' },
          { label: 'Cerrar sesión', route: '/logout' }
        ];
        return;
      }
    }
    this.navigationItems = [
      { label: 'Inicio', route: '/home' },
      { label: 'Mercado', route: '/mercado' },
      { label: 'Sobre nosotros', route: '/about' },
      { label: 'Iniciar sesión', route: '/login' },
      { label: 'Registrarse', route: '/registro' }
    ];
  }
}
