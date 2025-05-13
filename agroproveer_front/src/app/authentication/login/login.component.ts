import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { ButtonType } from '../../shared/button/button.types';
import { LoginService } from '../services/login.service';
import { Login } from '../../models/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    FormInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  buttonType = ButtonType;

  formLogin = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
    password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(6)])
  });

  emailControl = this.formLogin.get('email') as FormControl<string>;
  passwordControl = this.formLogin.get('password') as FormControl<string>;

  constructor(private loginService: LoginService) { }


  ngOnInit() {
    this.formLogin.updateValueAndValidity();
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const loginData: Login = {
        username: this.emailControl.value,
        password: this.passwordControl.value
      };

      this.loginService.login(loginData).subscribe(
        (response) => {
          if (response) {
            console.log('Login successful');
            // Store token in local storage or handle successful login
            localStorage.setItem('token', response.token); // Assuming the API returns a token
          } else {
            console.log('Login failed');
          }
        }
      );
    }
  }
}
