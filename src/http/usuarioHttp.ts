import axiosAuth from "./axios.config.ts";
import type { IUsuario } from "../types/IUsuario.ts";
import type { IDireccion } from "../types/IDireccion.ts";
import axios from "axios";

const apiUrlController = "/usuarios";

export const getUsuariosHabilitadosHttp = async (): Promise<IUsuario[] | undefined> => {
  try {
    const response = await axios.get<IUsuario[]>(import.meta.env.VITE_API_URL + apiUrlController + '/getEnabled')
    return response.data
  } catch (error) {
    console.error("Problemas en getUsuariosHabilitadosHttp", error)
  }
}

export const getUsuariosHttp = async (): Promise<
  IUsuario[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IUsuario[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getUsuariosController", error);
  }
};

export const getUsuarioByUsername = async (username: string): Promise<IUsuario | undefined> => {
  try {
    const response = await axiosAuth.get<IUsuario>(apiUrlController + `/username/${username}`);
    return response.data;
  } catch (error) {
    console.error("Problemas en getUsuarioByUsername", error);
  }
}

export const getUsuarioByIdHttp = async (
  usuarioId: string
): Promise<IUsuario | undefined> => {
  try {
    const response = await axiosAuth.get<IUsuario>(
      apiUrlController + `/${usuarioId}`
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
      apiUrlController,
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
      apiUrlController + `/${usuarioId}`
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
      apiUrlController + `/direcciones/${usuarioId}`,
      direcciones
    );
    console.log("data desde el controller: ", response.data)
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
      apiUrlController + `/direcciones/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getUsuariosByDireccionIdController", error);
  }
};

export const toggleHabilitadoHttp = async (
  usuarioId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${usuarioId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}