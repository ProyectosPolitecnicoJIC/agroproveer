import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../models/productos.interface';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ProductoCart } from '../../models/productocart.interface';
import { FormsModule } from '@angular/forms';
import { CiudadesService } from '../../core/services/ciudades.service';
import { Ciudad } from '../../models/ciudad.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [DecimalPipe, FormsModule, ScrollingModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Productos[] = [];
  filteredProductos: Productos[] = [];
  loading = true;
  searchTerm: string = '';
  selectedMunicipio: string = '';
  municipioSearchTerm: string = '';
  filteredMunicipios: string[] = [];
  showMunicipioDropdown: boolean = false;
  private municipioSearchSubject = new Subject<string>();
  readonly ITEMS_PER_PAGE = 20;

  constructor(
    private productosService: ProductosService, 
    private cartService: CartService,
    private ciudadesService: CiudadesService
  ) {
    this.municipioSearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchMunicipios(term);
    });
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.filteredProductos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  filterProductos(): void {
    if (!this.productos) return;
    
    const searchTermLower = this.searchTerm.toLowerCase();
    const selectedMunicipio = this.selectedMunicipio;

    this.filteredProductos = this.productos.filter(producto => {
      const matchesSearch = !searchTermLower || 
        producto.nombre.toLowerCase().includes(searchTermLower) ||
        producto.descripcion.toLowerCase().includes(searchTermLower);
      const matchesMunicipio = !selectedMunicipio || producto.municipio === selectedMunicipio;
      return matchesSearch && matchesMunicipio;
    });
  }

  searchMunicipios(term: string): void {
    if (!term || term.length < 2) {
      this.filteredMunicipios = [];
      return;
    }

    this.ciudadesService.getCiudades().subscribe({
      next: (ciudades: Ciudad[]) => {
        const searchTerm = term.toLowerCase();
        const filtered = ciudades
          .map(ciudad => ciudad.name)
          .filter(name => name.toLowerCase().includes(searchTerm))
          .sort()
          .slice(0, this.ITEMS_PER_PAGE);
        
        this.filteredMunicipios = filtered;
      },
      error: (error) => {
        console.error('Error searching cities:', error);
        this.filteredMunicipios = [];
      }
    });
  }

  onSearchChange(): void {
    this.filterProductos();
  }

  onMunicipioSearchChange(): void {
    if (!this.municipioSearchTerm) {
      this.clearMunicipioFilter();
    } else {
      this.municipioSearchSubject.next(this.municipioSearchTerm);
    }
  }

  selectMunicipio(municipio: string): void {
    this.selectedMunicipio = municipio;
    this.municipioSearchTerm = municipio;
    this.showMunicipioDropdown = false;
    this.filterProductos();
  }

  toggleMunicipioDropdown(): void {
    this.showMunicipioDropdown = !this.showMunicipioDropdown;
    if (this.showMunicipioDropdown && this.municipioSearchTerm.length >= 2) {
      this.searchMunicipios(this.municipioSearchTerm);
    }
  }

  clearMunicipioFilter(): void {
    this.selectedMunicipio = '';
    this.municipioSearchTerm = '';
    this.filteredMunicipios = [];
    this.showMunicipioDropdown = false;
    this.filterProductos();
  }

  addToCart(productId: number): void {
    let producto = this.productos.find(p => p.id === productId);
    if (producto) {
      let item: ProductoCart = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        descripcion: producto.descripcion,
        cantidad: 1,
        vendedor: producto.vendedor,
        categoria: producto.categoria,
        cantidadDisponible: producto.cantidadDisponible,
        municipio: producto.municipio
      }
      this.cartService.addItem(item);
    }
  }
}
