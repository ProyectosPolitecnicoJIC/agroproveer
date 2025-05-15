import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css'
})
export class FormInputComponent {
  @Input() label: string = "";
  @Input() inputType: string = "";
  @Input() placeholder: string = "";
  @Input() control!: FormControl;
  @Input() showTogglePassword: boolean = false;
  @Input() icon: string = "";
  @Input() hint: string = "";
  @Input() mandatory: boolean = false;
  @Input() enabled: boolean = true;
  @Input() errorMessage?: string = "";
  @Input() showCustomError: boolean = false;
 
  passwordVisible: boolean = false;

  get getInputType(): string {
    if (this.inputType !== 'password') return this.inputType;
    return this.passwordVisible ? 'text' : 'password';
  }
}
