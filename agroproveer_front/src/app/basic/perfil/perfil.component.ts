import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.interface';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { CiudadesService } from '../../core/services/ciudades.service';
import { DocumentTypesService } from '../../core/services/document-types.service';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { Departamento } from '../../models/departamento.interface';
import { Ciudad } from '../../models/ciudad.interface';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  
  departamentos: { value: string; label: string }[] = [];
  ciudades: { value: string; label: string }[] = [];
  documentTypes: { value: string; label: string }[] = [];


  userForm: FormGroup;

  constructor(
    private departamentosService: DepartamentosService,
    private ciudadesService: CiudadesService,
    private documentTypesService: DocumentTypesService
  ) {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
    })
  }

  getControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  editando = false;

  ngOnInit() {
    // Aquí deberías cargar los datos del usuario desde tu servicio
    this.cargarDatosUsuario();
    this.cargarDepartamentos();

    this.getControl('departamento').valueChanges.subscribe(departamentoId => {
      if (departamentoId) {
        this.cargarCiudades(departamentoId);
      } else {
        this.ciudades = [];
        this.getControl('municipio').setValue('');
      }
    });

    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.getControl(key);
      if (this.editando) {
        control.enable();
      } else {
        control.disable();
      }
    });

    this.cargarDocumentTypes();
  }

  cargarDatosUsuario() {
    // Implementar la carga de datos del usuario
  }

  guardarCambios() {
    if (this.userForm.valid) {
      // Implementar el guardado de cambios
      this.editando = false;
      this.toggleEdicion(); // Esto deshabilitará los controles
    }
  }

  toggleEdicion() {
    this.editando = !this.editando;
    // Actualizar el estado de los controles
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.getControl(key);
      if (this.editando) {
        control.enable();
      } else {
        control.disable();
      }
    });
  }

  cargarDepartamentos() {
    this.departamentosService.getDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos.map(d => ({ value: d.id, label: d.name }));
    });
  }

  cargarCiudades(departamento: string) {
    this.ciudadesService.getCiudadesByDepartamento(departamento).subscribe(ciudades => {
      this.ciudades = ciudades.map(c => ({ value: c.id, label: c.name }));
    });
  }

  cargarDocumentTypes() {
    this.documentTypes = this.documentTypesService.getDocumentTypes();
  }
}
