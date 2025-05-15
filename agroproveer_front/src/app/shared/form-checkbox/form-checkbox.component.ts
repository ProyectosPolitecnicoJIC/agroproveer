import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  standalone: true,
  imports: [
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-checkbox.component.html',
  styleUrl: './form-checkbox.component.css'
})
export class FormCheckboxComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() control!: FormControl;
}
