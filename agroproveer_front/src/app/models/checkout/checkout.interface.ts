import { CheckoutProducto } from "./productoCheckout.interface";
export interface Checkout {
    id?: number;
    nombreCompleto: string;
    correo: string;
    direccionEnvio: string;
    metodoPago: string;
    telefono: string;
    documento: string;
    tipoDocumento: string;
    totalPagar: number;
    nota: string;
    productos: CheckoutProducto[];
}