import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonType, ButtonVariant, ButtonSize} from '../../shared/button/button.types';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentTypesService } from '../../core/services/document-types.service';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { CiudadesService } from '../../core/services/ciudades.service';
import { RegisterService } from '../services/register.service';

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
    Correo: new FormControl<string>('', [Validators.required, Validators.email]),
    Contrasena: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    ConfirmarContrasena: new FormControl<string>('', [Validators.required]),
    Nombre: new FormControl<string>('', [Validators.required]),
    Apellido: new FormControl<string>('', [Validators.required]),
    TipoDocumento: new FormControl<string>('', [Validators.required]),
    Documento: new FormControl<string>('', [Validators.required]),
    Telefono: new FormControl<string>('', [Validators.required]),
    Departamento: new FormControl<string>(''),
    Municipio: new FormControl<string>(''),
    Direccion: new FormControl<string>('', [Validators.required])
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

  constructor(
    private documentTypesService: DocumentTypesService,
    private departamentosService: DepartamentosService,
    private ciudadesService: CiudadesService,
    private cdr: ChangeDetectorRef,
    private registerService: RegisterService
  ) {
    // Inicializar el estado del formulario
    this.form.statusChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  buttonType = ButtonType;
  buttonVariant = ButtonVariant;
  buttonSize = ButtonSize;

  documentTypes: { value: string, label: string }[] = [];
  departamentosList: { value: string; label: string }[] = [];
  ciudadesList: { value: string; label: string }[] = [];

  ngOnInit(): void {
    // Cargar tipos de documento
    this.documentTypes = this.documentTypesService.getDocumentTypes();

    // Cargar departamentos
    this.departamentosService.getDepartamentos().subscribe({
      next: (deps) => {
        this.departamentosList = deps.map(i => ({
          value: i.id.toString(),
          label: i.name
        }));
        this.cdr.detectChanges();
      }
    });

    // Suscribirse a cambios en el departamento
    this.DepartamentoControl.valueChanges.subscribe({
      next: (deptId) => {
        if (deptId) {
          this.loadCiudades(deptId);
        } else {
          this.ciudadesList = [];
          this.MunicipioControl.setValue('');
          this.cdr.detectChanges();
        }
      }
    });
  }

  loadCiudades(deptId: string): void {
    this.ciudadesService.getCiudadesByDepartamento(deptId).subscribe({
      next: (cities) => {
        this.ciudadesList = cities.map(city => ({
          value: city.id.toString(),
          label: city.name
        }));
        this.MunicipioControl.setValue('');
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {

      const usuario = {
        nombre: this.NombreControl.value,
        apellido: this.ApellidoControl.value,
        correo: this.CorreoControl.value,
        contrasena: this.ContrasenaControl.value,
        telefono: this.TelefonoControl.value,
        documento: this.DocumentoControl.value,
        tipoDocumento: this.TipoDocumentoControl.value,
        direccion: this.DireccionControl.value,
        departamento: this.DepartamentoControl.value,
        municipio: this.MunicipioControl.value,
        rol: 'VENDEDOR'
      };

      console.log('Usuario:', usuario);

      this.registerService.register(usuario).subscribe({
        next: (response) => {
          console.log('Registro:', response, usuario);
          if (response) {
            console.log('Registro exitoso');
          } else {
            console.error('Error en el registro');
          }
        },
        error: (error) => {
          console.error('Error en el registro', error);
        }
      });

    } else {
      console.log('Formulario inválido');
    }
  }
}
