import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Checkout } from '../../models/checkout.interface';
import { CartService } from '../../core/services/cart.service';
import { DocumentTypesService } from '../../core/services/document-types.service';
import { PaymentMethodsService } from '../../core/services/payment-methods.service';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: FormGroup;

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
      tipo_documento: new FormControl('', Validators.required),
      documento_comprador: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]),
      nota_adicional: new FormControl(''),
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
        productos: [],
        fecha_venta: new Date(),
        ...this.checkoutForm.value,
        total_pagar: 0
      };
      console.log('Checkout data:', checkoutData);
    }
  }
}
