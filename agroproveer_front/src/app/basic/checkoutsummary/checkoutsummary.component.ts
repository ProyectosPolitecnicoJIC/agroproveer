import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';
import { AgroproveerRoutes } from '../../utils/enum/routes';

@Component({
  selector: 'app-checkoutsummary',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './checkoutsummary.component.html',
  styleUrl: './checkoutsummary.component.css'
})
export class CheckoutsummaryComponent implements OnInit {

  id: number = 0;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : 0;
      console.log(this.id);
    });
  }
  ngOnInit() {
    
  }

  goMarket() {
    this.router.navigate([AgroproveerRoutes.MERCADO]);
  }
}
