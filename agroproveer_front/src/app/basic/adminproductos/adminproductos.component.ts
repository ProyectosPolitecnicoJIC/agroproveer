import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../models/productos.interface';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from '../../services/categorias.service';
import { Categorias } from '../../models/categorias.interface';
import { AgroproveerRoutes } from '../../utils/enum/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminproductos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent
  ],
  templateUrl: './adminproductos.component.html',
  styleUrl: './adminproductos.component.css'
})
export class AdminproductosComponent implements OnInit {
  productForm: FormGroup;
  loading = false;
  error = '';
  categorias: Categorias[] = [];
  categoriasLoading = false;
  private token: string | null = localStorage.getItem("token");

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar,
    private router: Router,

  ) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      municipio: ['', Validators.required],
      categoria_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriasLoading = true;
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.categoriasLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las categorías';
        this.categoriasLoading = false;
        console.error('Error loading categories:', err);
      }
    });
  }

  getControl(name: string): FormControl {
    return this.productForm.get(name) as FormControl;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.error = '';

      const productData: Productos = {
        id: 0,
        ...this.productForm.value
      };

      this.productosService.createProducto(productData, this.token || '').subscribe({
        next: (response) => {
          this.loading = false;
          this.snackBar.open('Producto creado exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.productForm.reset();
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al crear el producto. Por favor, intente nuevamente.';
          this.snackBar.open(this.error, 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating product:', err);
        }
      });
    }
  }

  getCategoriasOptions() {
    return this.categorias.map(cat => ({
      value: cat.id?.toString() || '',
      label: cat.nombre
    }));
  }
}
