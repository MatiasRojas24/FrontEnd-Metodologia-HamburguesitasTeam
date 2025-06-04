import type { IDetalleProducto } from "./IDetalleProducto";
import type { IOrdenCompra } from "./IOrdenCompra";

export interface IOrdenCompraDetalle {
  id?: string;
  detalleProducto: IDetalleProducto;
  cantidad: number;
  subtotal: number;
  ordenCompra: IOrdenCompra;
  habilitado?: boolean;
}
