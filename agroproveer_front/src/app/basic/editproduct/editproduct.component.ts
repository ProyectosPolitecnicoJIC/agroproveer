import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Productos } from '../../models/productos.interface';
import { ProductosService } from '../../services/productos.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoriasService } from '../../services/categorias.service';
import { Categorias } from '../../models/categorias.interface';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  productForm: FormGroup;
  categorias: Categorias[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Productos | null,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagenUrl: ['', Validators.required],
      municipio: ['', Validators.required],
      categoria: ['', [Validators.required, Validators.min(1)]],
      cantidadDisponible: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.productForm.patchValue(this.data);
    }
    this.categoriasService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const userDocument = JSON.parse(localStorage.getItem("userData") || '{}').cedula;
      const token = localStorage.getItem("token") || '';
      formData.vendedor = userDocument;
      if (this.data) {
        // Update existing product
        formData.id = this.data.id;
        this.productosService.updateProducto(formData, token).subscribe({
          next: () => {
            this.snackBar.open('Producto actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Error al actualizar el producto', 'Cerrar', { duration: 3000 });
          }
        });
      } else {
        // Create new product
        this.productosService.createProducto(formData, token).subscribe({
          next: () => {
            this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Error al crear el producto', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
