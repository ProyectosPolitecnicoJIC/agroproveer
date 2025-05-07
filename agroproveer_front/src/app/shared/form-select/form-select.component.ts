import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, AbstractControl, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule 
  ],
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.css'
})
export class FormSelectComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() mandatory: boolean = false;
  @Input() enabled: boolean = true;
  @Input() icon: string = "";

  ngOnInit() {
    if (!this.enabled) {
      this.control.disable();
    }
  }
}
