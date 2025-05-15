import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Checkout } from '../../models/checkout.interface';
import { CartService } from '../../core/services/cart.service';
import { DocumentTypesService } from '../../core/services/document-types.service';
import { PaymentMethodsService } from '../../core/services/payment-methods.service';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { ProductoCart } from '../../models/productocart.interface';
import { FormCheckboxComponent } from '../../shared/form-checkbox/form-checkbox.component';
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

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private documentTypesService: DocumentTypesService,
    private paymentMethodsService: PaymentMethodsService
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
  }

  ngOnInit() {
    this.cartService.getItemsObservable().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
      this.shippingCost = this.checkoutForm.get('need_domicilio')?.value ? 5000 : 0;
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
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
        productos: this.cartItems,
        fecha_venta: new Date(),
        ...this.checkoutForm.value,
        total_pagar: this.totalPrice
      };
      console.log('Checkout data:', checkoutData);
    }
  }
}
