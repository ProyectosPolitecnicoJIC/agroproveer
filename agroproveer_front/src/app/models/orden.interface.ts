export interface Orden {
  id: number;
  fechaVenta: string;
  nombreCompleto: string;
  correo: string;
  direccionEnvio: string;
  metodoPago: string;
  telefono: string;
  documento: string;
  tipoDocumento: string;
  totalPagar: number;
  nota: string;
  productosVendidos: OrdenProducto[];
}

export interface OrdenProducto {
  id: number;
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
    municipio: string;
    vendedor: string;
    categoria: number;
    cantidadDisponible: number;
  };
  cantidad: number;
  precioUnitario: number;
} 