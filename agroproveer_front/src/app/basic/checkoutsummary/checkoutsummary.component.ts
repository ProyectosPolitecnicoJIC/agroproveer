import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-checkoutsummary',
  standalone: true,
  imports: [],
  templateUrl: './checkoutsummary.component.html',
  styleUrl: './checkoutsummary.component.css'
})
export class CheckoutsummaryComponent implements OnInit {

  id: number = 0;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }
  ngOnInit() {
    
  }
}
