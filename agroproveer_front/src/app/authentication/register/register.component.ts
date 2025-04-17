import { Component } from '@angular/core';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DocumentTypesService } from '../../core/services/document-types.service';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { OnInit } from '@angular/core';
import { map, Observable, window } from 'rxjs';
import { Departamento } from '../../models/departamento.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormInputComponent,
    ReactiveFormsModule,
    FormSelectComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
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

  CorreoControl = this.form.get('Correo') as FormControl<string>;
  ContrasenaControl = this.form.get('Contrasena') as FormControl<string>;
  ConfirmarContrasenaControl = this.form.get('ConfirmarContrasena') as FormControl<string>;
  NombreControl = this.form.get('Nombre') as FormControl<string>;
  ApellidoControl = this.form.get('Apellido') as FormControl<string>;
  TipoDocumentoControl = this.form.get('TipoDocumento') as FormControl<string>;
  DocumentoControl = this.form.get('Documento') as FormControl<string>;
  RazonSocialControl = this.form.get('RazonSocial') as FormControl<string>;
  TelefonoControl = this.form.get('Telefono') as FormControl<string>;
  DepartamentoControl = this.form.get('Departamento') as FormControl<string>;
  MunicipioControl = this.form.get('Municipio') as FormControl<string>;
  DireccionControl = this.form.get('Direccion') as FormControl<string>;

  // CONSTRUCTOR
  constructor(private documentTypesService: DocumentTypesService
    , private departamentosService: DepartamentosService
  ) {
  }


  // LISTAS
  documentTypes: { value: string, label: string }[] = [];
  departamentosList: { value: string; label: string }[] = [];

  ngOnInit(): void {
    this.documentTypes = this.documentTypesService.getDocumentTypes();
    this.departamentosService.getDepartamentos().pipe(
      map((departamentos: Departamento[]) => 
        departamentos.map((li: Departamento) => ({
          value: li.id,
          label: li.name
        }))
      )
    ).subscribe(transformados => {
      this.departamentosList = transformados;
    });

  }




  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí puedes realizar la lógica de envío del formulario
    } else {
      console.log('Formulario inválido');
    }
  }


}
