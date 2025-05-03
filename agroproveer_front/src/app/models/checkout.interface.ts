import { ProductoCart } from "./productocart.interface";

export interface Checkout {
    id: number;
    productos: ProductoCart[];
    fecha_venta: Date;
    nombre_comprador: string;
    correo_comprador: string;
    direccion_envio: string;    
    metodo_pago: string;
    telefono_comprador: string;
    tipo_documento: string;
    documento_comprador: string;
    nota_adicional: string;
    total_pagar: number;
}