import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Checkout } from '../../models/checkout/checkout.interface';
import { CartService } from '../../core/services/cart.service';
import { DocumentTypesService } from '../../core/services/document-types.service';
import { PaymentMethodsService } from '../../core/services/payment-methods.service';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { ProductoCart } from '../../models/productocart.interface';
import { FormCheckboxComponent } from '../../shared/form-checkbox/form-checkbox.component';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { CiudadesService } from '../../core/services/ciudades.service';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { AgroproveerRoutes } from '../../utils/enum/routes';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent,
    DecimalPipe,
    FormCheckboxComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: ProductoCart[] = [];
  totalPrice: number = 0;
  shippingCost: number = 0;
  departamentos: any[] = [];
  ciudades: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private documentTypesService: DocumentTypesService,
    private paymentMethodsService: PaymentMethodsService,
    private departamentosService: DepartamentosService,
    private ciudadesService: CiudadesService,
    private cdr: ChangeDetectorRef,
    private checkoutService: CheckoutService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      nombre_comprador: new FormControl('', [Validators.required, Validators.minLength(3)]),
      correo_comprador: new FormControl('', [Validators.required, Validators.email]),
      direccion_envio: new FormControl('', [Validators.required, Validators.minLength(10)]),
      metodo_pago: new FormControl('', Validators.required),
      telefono_comprador: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      ciudad_comprador: new FormControl('', [Validators.required]),
      departamento_comprador: new FormControl('', [Validators.required]),
      tipo_documento: new FormControl('', Validators.required),
      documento_comprador: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]),
      nota_adicional: new FormControl(''),
      need_domicilio: new FormControl(false),
    });
    this.checkoutForm.statusChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {


    // Cargar departamentos
    this.departamentosService.getDepartamentos().subscribe({
      next: (deps) => {
        this.departamentos = deps.map(i => ({
          value: i.id.toString(),
          label: i.name
        }));
        this.cdr.detectChanges();
      }
    });

    // Suscribirse a cambios en el departamento
    this.getControl('departamento_comprador').valueChanges.subscribe({
      next: (deptId) => {
        console.log(deptId);
        if (deptId) {
          this.loadCiudades(deptId);
        } else {
          this.ciudades = [];
          this.getControl('ciudad_comprador').setValue('');
          this.cdr.detectChanges();
        }
      }
    });

    this.cartService.getItemsObservable().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });

    this.checkoutForm.get('need_domicilio')?.valueChanges.subscribe((needDomicilio) => {
      if (needDomicilio) {
        this.shippingCostBasedOnCity();
      } else {
        this.shippingCost = 0;
      }
      this.calculateTotal();
    });

  }


  loadCiudades(deptId: string): void {
    this.ciudadesService.getCiudadesByDepartamento(deptId).subscribe({
      next: (cities) => {
        this.ciudades = cities.map(city => ({
          value: city.id.toString(),
          label: city.name
        }));
        this.getControl('ciudad_comprador').setValue('');
        this.cdr.detectChanges();
      }
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad) , 0)+ this.shippingCost;
  }

  shippingCostBasedOnCity() {
    const city = this.getControl('ciudad_comprador').value;
    this.cartItems.forEach(item => {
      if (item.municipio === city) {
        this.shippingCost = 10000;
        return;
      } else {
        this.shippingCost = 15000;
        return;
      }
    });
  }

  get documentTypes() {
    return this.documentTypesService.getDocumentTypes();
  }

  get paymentMethods() {
    return this.paymentMethodsService.getPaymentMethods();
  }

  getControl(name: string): FormControl {
    return this.checkoutForm.get(name) as FormControl;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const checkoutData: Checkout = {
        id: 0,
        nombreCompleto: this.getControl('nombre_comprador').value,
        correo: this.getControl('correo_comprador').value,
        direccionEnvio: this.getControl('direccion_envio').value,
        metodoPago: this.getControl('metodo_pago').value,
        telefono: this.getControl('telefono_comprador').value,
        documento: this.getControl('documento_comprador').value,
        tipoDocumento: this.getControl('tipo_documento').value,
        totalPagar: this.totalPrice,
        nota: this.getControl('nota_adicional').value,
        productos: this.cartItems.map(item => ({
          productoId: item.id,
          precioUnitario: item.precio,
          cantidad: item.cantidad
        }))
      };
      this.checkoutService.createCheckout(checkoutData).subscribe({
        next: (response) => {
          console.log('Checkout successful:', response);
          this.cartService.clearCart();
          this.checkoutForm.reset();
          this.shippingCost = 0;
          this.totalPrice = 0;
          this.router.navigate([AgroproveerRoutes.CHECKOUT_SUCCESS], {
            queryParams: { id: response.id }
          });
        },
        error: (error) => {
          console.error('Checkout error:', error);
        }
      });
    }
  }
}
