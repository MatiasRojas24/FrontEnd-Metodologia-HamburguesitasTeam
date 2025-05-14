import type { ICatalogo } from "./ICatalogo";

type TipoProducto = "ZAPATILLA" | "REMERA" | "PANTALON" | "CAMPERA";
type Sexo = "HOMBRE" | "MUJER" | "OTRO";
export interface IProducto {
  id?: string;
  nombre: string;
  tipoProducto: TipoProducto;
  sexo: Sexo;
  catalogo: ICatalogo;
}
