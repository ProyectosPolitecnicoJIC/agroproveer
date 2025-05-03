import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Categorias } from '../../models/categorias.interface';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputComponent,
    MatIcon
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  categorias: Categorias[] = [];
  categoriaForm: FormGroup;
  loading = false;
  error = '';
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.loading = true;
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las categorías';
        this.loading = false;
        console.error('Error loading categories:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.loading = true;
      const categoriaData: Categorias = this.categoriaForm.value;

      if (this.editingId) {
        this.categoriasService.updateCategoria(this.editingId, categoriaData).subscribe({
          next: () => {
            this.handleSuccess('Categoría actualizada exitosamente');
          },
          error: (err) => this.handleError(err, 'Error al actualizar la categoría')
        });
      } else {
        this.categoriasService.createCategoria(categoriaData).subscribe({
          next: () => {
            this.handleSuccess('Categoría creada exitosamente');
          },
          error: (err) => this.handleError(err, 'Error al crear la categoría')
        });
      }
    }
  }

  editCategoria(categoria: Categorias): void {
    this.editingId = categoria.id || null;
    this.categoriaForm.patchValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
  }

  deleteCategoria(id: number): void {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      this.loading = true;
      this.categoriasService.deleteCategoria(id).subscribe({
        next: () => {
          this.handleSuccess('Categoría eliminada exitosamente');
        },
        error: (err) => this.handleError(err, 'Error al eliminar la categoría')
      });
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.categoriaForm.reset();
  }

  private handleSuccess(message: string): void {
    this.loading = false;
    this.categoriaForm.reset();
    this.editingId = null;
    this.loadCategorias();
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private handleError(err: any, message: string): void {
    this.loading = false;
    this.error = message;
    this.snackBar.open(this.error, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
    console.error('Error:', err);
  }

  getControl(name: string): FormControl {
    return this.categoriaForm.get(name) as FormControl;
  }
}
