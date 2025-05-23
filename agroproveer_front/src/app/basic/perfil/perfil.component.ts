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
import { PerfilService } from '../../services/perfil.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  documentoToken: string = '';
  private token: string = localStorage.getItem('token') || "";


  userForm: FormGroup;

  constructor(
    private departamentosService: DepartamentosService,
    private ciudadesService: CiudadesService,
    private documentTypesService: DocumentTypesService,
    private perfilService: PerfilService,
    private router: Router,
    private snackBar: MatSnackBar
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

    this.documentoToken = JSON.parse(localStorage.getItem('userData') || '{}').cedula;
    this.cargarDatosUsuario();



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
      if (key != 'tipoDocumento' && key != 'documento') {
        if (this.editando) {
          control.enable();
        } else {
          control.disable();
        }
      } else {
        control.disable();
      }
    });

    this.cargarDocumentTypes();
  }

  cargarDatosUsuario() {
    // Implementar la carga de datos del usuario
    console.log(this.token);
    this.perfilService.getPerfil(this.documentoToken, this.token).subscribe(usuario => {
      console.log(usuario);
      this.userForm.get('documento')?.setValue(usuario.documento);
      this.userForm.get('tipoDocumento')?.setValue(usuario.tipoDocumento);
      this.userForm.get('departamento')?.setValue(usuario.departamento);
      this.userForm.get('municipio')?.setValue(usuario.municipio);
      this.userForm.get('nombre')?.setValue(usuario.nombre);
      this.userForm.get('apellido')?.setValue(usuario.apellido);
      this.userForm.get('correo')?.setValue(usuario.correo);
      this.userForm.get('telefono')?.setValue(usuario.telefono);
      this.userForm.get('direccion')?.setValue(usuario.direccion);
    });
  }



  toggleEdicion() {
    if (this.editando && this.userForm.valid) {
      this.savePerfil();
    }

    this.editando = !this.editando;
    // Actualizar el estado de los controles
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.getControl(key);
      if (key != 'tipoDocumento' && key != 'documento') {
        if (this.editando) {
          control.enable();
        } else {
          control.disable();
        }
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

  goToMyProducts() {
    this.router.navigate(['/my-products']);
  }

  savePerfil() {
    let perfil: Usuario = this.userForm.value;
    perfil.documento = this.userForm.get('documento')?.value;
    perfil.rol = JSON.parse(localStorage.getItem('userData') || '{}').rol;
    perfil.tipoDocumento = this.userForm.get('tipoDocumento')?.value;
    console.log(perfil);
    this.perfilService.updatePerfil(perfil, this.token).subscribe(response => {
      console.log(response);
      this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', {
        duration: 3000
      });
    }, error => {
      this.snackBar.open('Error al actualizar el perfil', 'Cerrar', {
        duration: 3000
      });
    });

  }
}
