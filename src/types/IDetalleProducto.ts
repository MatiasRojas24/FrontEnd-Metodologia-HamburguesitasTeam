import type { IDescuento } from "./IDescuento";
import type { IProducto } from "./IProducto";
import type { ITalle } from "./ITalle";

export interface IDetalleProducto {
  id?: string;
  stock: number;
  color: string;
  talle: ITalle;
  producto: IProducto;
  precioCompra: number;
  precioVenta: number;
  descuento?: IDescuento;
  habilitado?: boolean;
}
