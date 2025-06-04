import type { IDireccion } from "./IDireccion";
import type { IUsuario } from "./IUsuario";

export interface IOrdenCompra {
  id?: string;
  total?: number;
  descuento?: number;
  fechaCompra: string;
  direccionEnvio?: IDireccion;
  usuario?: IUsuario;
  habilitado?: boolean;
}
