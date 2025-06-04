import type { IProducto } from "./IProducto";
import type { ITalle } from "./ITalle";

export interface IDetalleProducto {
  id?: string;
  stock: number;
  color: string;
  estado: boolean;
  talle: ITalle;
  producto: IProducto;
  habilitado?: boolean;
  precioVenta: number;
  precioCompra: number;

}
