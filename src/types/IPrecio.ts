import type { IDescuento } from "./IDescuento";
import type { IDetalleProducto } from "./IDetalleProducto";

export interface IPrecio {
  id?: string;
  precioCompra: number;
  precioVenta: number;
  detalleProducto: IDetalleProducto;
  descuento?: IDescuento;
  habilitado?: boolean;
}
