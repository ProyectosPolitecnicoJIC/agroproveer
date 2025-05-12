import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  beneficios = [
    {
      title: 'Facilidad de comercialización',
      description: 'Fácil comercialización de sus productos sin necesidad de intermediarios y sobre costos',
      image: '../../../assets/Beneficio 1.jpg'
    },
    {
      title: 'Comprar productos favoritos',
      description: 'Podrás comprar tus productos favoritos en la zona de tú preferencia',
      image: '../../../assets/Beneficio 2.png'
    },
    {
      title: 'Acercamiento directo',
      description: 'Acercamiento directo entre el vendedor y comprador',
      image: '../../../assets/Beneficio 3.jpg'
    },
    {
      title: 'Opciones de entrega',
      description: 'Posibilidad de elegir si recoger el producto en la finca productora o que te lo lleven a la comodidad de tu hogar',
      image: '../../../assets/Beneficio 4.jpg'
    }
  ]

}
