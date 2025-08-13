export interface IProducto {
  id: string;
  imagen?: string;
  precioEntrada?: string;
  precioVenta: string;
  linea?: string;
  categoria?: string;
  subCategoria?: string;
  nombre: string;
  referencia: string;
  descripcion?: string;
  unidades?: number;
}
