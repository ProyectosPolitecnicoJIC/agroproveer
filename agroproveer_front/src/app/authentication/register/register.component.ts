import { Component } from '@angular/core';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormInputComponent,
    ReactiveFormsModule

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = new FormGroup({
    Correo: new FormControl<string>(''), 
    Contrasena: new FormControl<string>(''),
    ConfirmarContrasena: new FormControl<string>(''),
    Nombre: new FormControl<string>(''),
    Apellido: new FormControl<string>(''),
    TipoDocumento: new FormControl<string>(''),
    Documento: new FormControl<string>(''),
    RazonSocial: new FormControl<string>(''),
    Telefono: new FormControl<string>(''),
    Departamento: new FormControl<string>(''),
    Municipio: new FormControl<string>(''),
    Direccion: new FormControl<string>('')
  });

  Correo = this.form.get('Correo') as FormControl<string>;
  Contrasena = this.form.get('Contrasena') as FormControl<string>;
  ConfirmarContrasena = this.form.get('ConfirmarContrasena') as FormControl<string>;
  Nombre = this.form.get('Nombre') as FormControl<string>;
  Apellido = this.form.get('Apellido') as FormControl<string>;
  TipoDocumento = this.form.get('TipoDocumento') as FormControl<string>;
  Documento = this.form.get('Documento') as FormControl<string>;
  RazonSocial = this.form.get('RazonSocial') as FormControl<string>;
  Telefono = this.form.get('Telefono') as FormControl<string>;
  Departamento = this.form.get('Departamento') as FormControl<string>;
  Municipio = this.form.get('Municipio') as FormControl<string>;
  Direccion = this.form.get('Direccion') as FormControl<string>;

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí puedes realizar la lógica de envío del formulario
    } else {
      console.log('Formulario inválido');
    }
  }


}
