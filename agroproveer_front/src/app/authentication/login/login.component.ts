import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { ButtonType } from '../../shared/button/button.types';
import { LoginService } from '../services/login.service';
import { Login } from '../../models/login.interface';
import { jwtData } from '../../models/jwt.interface';
import { Router } from '@angular/router';

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

  constructor(private loginService: LoginService, private router: Router) { }


  ngOnInit() {
    this.formLogin.updateValueAndValidity();
    if(localStorage.getItem('token')){
      const userDataString = localStorage.getItem('userData');
      if (userDataString && (JSON.parse(userDataString).exp > Date.now() / 1000)) {
        this.router.navigate(['/home']);
      }
    }
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
            // Store token in local storage or handle successful login
            localStorage.setItem('token', response.token); // Assuming the API returns a token
            const jwtData = JSON.parse(atob(response.token.split('.')[1]));
            let userData: jwtData = {
              sub: jwtData.sub,
              iat: jwtData.iat,
              exp: jwtData.exp,
              rol: jwtData.rol,
              cedula: jwtData.cedula
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            this.router.navigate(['/home']);
          } else{
            alert('Credenciales incorrectas');
          }
        }
      );
    }
  }
}
