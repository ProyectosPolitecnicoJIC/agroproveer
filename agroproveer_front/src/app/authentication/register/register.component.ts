import { Component } from '@angular/core';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonType, ButtonVariant, ButtonSize} from '../../shared/button/button.types';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DocumentTypesService } from '../../core/services/document-types.service';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { CiudadesService } from '../../core/services/ciudades.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormInputComponent,
    ReactiveFormsModule,
    FormSelectComponent,
    ButtonComponent
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
  TelefonoControl = this.form.get('Telefono') as FormControl<string>;
  DepartamentoControl = this.form.get('Departamento') as FormControl<string>;
  MunicipioControl = this.form.get('Municipio') as FormControl<string>;
  DireccionControl = this.form.get('Direccion') as FormControl<string>;

  // CONSTRUCTOR
  constructor(
    private documentTypesService: DocumentTypesService,
    private departamentosService: DepartamentosService,
    private ciudadesService: CiudadesService
  ) {
  }

  // ENUMS
  buttonType = ButtonType;
  buttonVariant = ButtonVariant;
  buttonSize = ButtonSize;


  // LISTAS
  documentTypes: { value: string, label: string }[] = [];
  departamentosList: { value: string; label: string }[] = [];
  ciudadesList: { value: string; label: string }[] = [];

  ngOnInit(): void {
    this.documentTypes = this.documentTypesService.getDocumentTypes();
    this.departamentosService.getDepartamentos().subscribe(
      deps => {
        this.departamentosList = deps.map(i => ({
          value: i.id.toString(),
          label: i.name
        }))
      }
    );

    // Subscribe to department changes to load cities
    this.DepartamentoControl.valueChanges.subscribe(deptId => {
      if (deptId) {
        this.loadCiudades(deptId);
      } else {
        this.ciudadesList = [];
        this.MunicipioControl.setValue('');
      }
    });
  }

  // Load cities based on selected department
  loadCiudades(deptId: string): void {
    this.ciudadesService.getCiudadesByDepartamento(deptId).subscribe(
      cities => {
        this.ciudadesList = cities.map(city => ({
          value: city.id.toString(),
          label: city.name
        }));
        // Reset municipio selection when department changes
        this.MunicipioControl.setValue('');
      }
    );
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
