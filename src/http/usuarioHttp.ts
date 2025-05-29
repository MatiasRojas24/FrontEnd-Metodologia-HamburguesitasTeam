import axiosAuth from "./axios.config.ts";
import type { IUsuario } from "../types/IUsuario.ts";
import type { IDireccion } from "../types/IDireccion.ts";

const apiUrlUsuariosController = "/usuarios";

export const getUsuariosHttp = async (): Promise<
  IUsuario[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IUsuario[]>(apiUrlUsuariosController);
    return response.data;
  } catch (error) {
    console.warn("Token expirado o inválido, cerrando sesión...");
    localStorage.removeItem("token");

    console.error("Problemas en getUsuariosController", error);
  }
};

export const getUsuarioByIdHttp = async (
  usuarioId: string
): Promise<IUsuario | undefined> => {
  try {
    const response = await axiosAuth.get<IUsuario>(
      apiUrlUsuariosController + `/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getUsuarioByIdController", error);
  }
};

export const updateUsuarioHttp = async (
  usuarioActualizado: IUsuario
): Promise<IUsuario | undefined> => {
  try {
    const response = await axiosAuth.put<IUsuario>(
      apiUrlUsuariosController,
      usuarioActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateUsuarioController", error);
  }
};

export const deleteUsuarioHttp = async (
  usuarioId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlUsuariosController + `/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteUsuarioController", error);
  }
};

export const addDireccionesToUsuarioHttp = async (
  direcciones: IDireccion[],
  usuarioId: string
): Promise<IUsuario | undefined> => {
  try {
    const response = await axiosAuth.post<IUsuario>(
      apiUrlUsuariosController + `/direcciones/${usuarioId}`,
      direcciones
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addDireccionesToUsuarioController", error);
  }
};

export const getUsuariosByDireccionIdHttp = async (
  direccionId: string
): Promise<IUsuario[] | undefined> => {
  try {
    const response = await axiosAuth.get<IUsuario[]>(
      apiUrlUsuariosController + `/direcciones/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getUsuariosByDireccionIdController", error);
  }
};
