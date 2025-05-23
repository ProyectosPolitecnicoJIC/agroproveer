import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../authentication/services/login.service';
import { Usuario } from '../../models/usuario.interface';
import { AgroproveerRoutes } from '../../utils/enum/routes';
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

  getUserData(): Usuario  {
    return this.loginService.getUserData();
  }



  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.updateNavigationItems(loggedIn);
    });
  }

  private updateNavigationItems(loggedIn: boolean): void {
    if (loggedIn) {
      this.navigationItems = [
        { label: 'Inicio', route: AgroproveerRoutes.HOME },
        { label: 'Mercado', route: AgroproveerRoutes.MERCADO },
        { label: 'Sobre nosotros', route: AgroproveerRoutes.ABOUT },
        { label: 'Buscar orden', route: AgroproveerRoutes.BUSCAR_ORDEN },
        { label: 'Perfil', route: AgroproveerRoutes.PERFIL },
        { label: 'Cerrar sesión', route: AgroproveerRoutes.LOGOUT }
      ];
      return;
    }
    this.navigationItems = [
      { label: 'Inicio', route: AgroproveerRoutes.HOME },
      { label: 'Mercado', route: AgroproveerRoutes.MERCADO },
      { label: 'Sobre nosotros', route: AgroproveerRoutes.ABOUT },
      { label: 'Buscar orden', route: AgroproveerRoutes.BUSCAR_ORDEN },
      { label: 'Iniciar sesión', route: AgroproveerRoutes.LOGIN },
      { label: 'Registrarse', route: AgroproveerRoutes.REGISTER }
    ];
  }


}
