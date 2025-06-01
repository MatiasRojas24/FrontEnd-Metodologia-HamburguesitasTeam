import type { ICatalogo } from "./ICatalogo";

export type TipoProducto = "ZAPATILLA" | "REMERA" | "PANTALON" | "CAMPERA";
export type Sexo = "HOMBRE" | "MUJER" | "OTRO";
export interface IProducto {
  id?: string;
  nombre: string;
  tipoProducto: TipoProducto;
  sexo: Sexo;
  catalogo: ICatalogo;
  habilitado?: boolean;
}
