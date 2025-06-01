import type { IDireccion } from "./IDireccion";

type TipoUsuario = "ADMIN" | "CLIENTE";
export interface IUsuario {
  id?: string;
  username: string;
  password: string;
  email: string;
  nombre: string;
  dni: string;
  rol?: TipoUsuario;
  direcciones?: IDireccion[];
  habilitado?: boolean;
}
