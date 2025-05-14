import type { IUsuario } from "./IUsuario";

export interface IDireccion {
  id?: string;
  pais: string;
  provincia: string;
  localidad: string;
  departamento: string;
  usuarios?: IUsuario[];
}
