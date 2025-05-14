import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../authentication/services/login.service';
import { Observable } from 'rxjs';

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


  constructor(private loginService: LoginService) { }



  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.updateNavigationItems(loggedIn);
    });
  }

  private updateNavigationItems(loggedIn: boolean): void {
    if (loggedIn) {
      this.navigationItems = [
        { label: 'Inicio', route: '/home' },
        { label: 'Mercado', route: '/mercado' },
        { label: 'Sobre nosotros', route: '/about' },
        { label: 'Perfil', route: '/perfil' },
        { label: 'Cerrar sesión', route: '/logout' }
      ];
      return;
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
