import type { IDetalleProducto } from "./IDetalleProducto";

export interface IImagen {
  id?: string;
  imagen: File;
  publicId?: string;
  url?: string;
  detalleProducto: IDetalleProducto;
  habilitado?: boolean;
}
