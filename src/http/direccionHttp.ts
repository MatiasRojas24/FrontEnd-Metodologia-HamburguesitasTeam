import axiosAuth from "./axios.config.ts";
import type { IDireccion } from "../types/IDireccion.ts";
import type { IUsuario } from "../types/IUsuario.ts";
import axios from "axios";

const apiUrlController = "/direcciones";

export const getDireccionesHabilitadasHttp = async (): Promise<IDireccion[] | undefined> => {
  try {
    const response = await axios.get<IDireccion[]>(apiUrlController + '/getEnabled')
    return response.data
  } catch (error) {
    console.error("Problemas en getDireccionesHabilitadasHttp", error)
  }
}

export const getDireccionesHttp = async (): Promise<
  IDireccion[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IDireccion[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getDireccionesController", error);
  }
};

export const getDireccionByIdHttp = async (
  direccionId: string
): Promise<IDireccion | undefined> => {
  try {
    const response = await axiosAuth.get<IDireccion>(
      apiUrlController + `/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDireccionByIdController", error);
  }
};

export const createDireccionHttp = async (
  direccionNueva: IDireccion
): Promise<IDireccion | undefined> => {
  try {
    const response = await axiosAuth.post<IDireccion>(
      apiUrlController,
      direccionNueva
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createDireccionController", error);
  }
};

export const updateDireccionHttp = async (
  direccionActualizada: IDireccion
): Promise<IDireccion | undefined> => {
  try {
    const response = await axiosAuth.put<IDireccion>(
      apiUrlController, direccionActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateDireccionController", error);
  }
};

export const deleteDireccionHttp = async (
  direccionId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteDireccionController", error);
  }
};

export const addUsuariosToDireccionHttp = async (
  usuarios: IUsuario[],
  direccionId: string
): Promise<IDireccion | undefined> => {
  try {
    const response = await axiosAuth.post<IDireccion>(
      apiUrlController + `/usuarios/${direccionId}`,
      usuarios
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addUsuariosToDireccionController", error);
  }
};

export const getDireccionesByUsuarioIdHttp = async (
  usuarioId: string
): Promise<IDireccion[] | undefined> => {
  try {
    const response = await axiosAuth.get<IDireccion[]>(
      apiUrlController + `/usuarios/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDireccionesByUsuarioIdController", error);
  }
};

export const toggleHabilitadoHttp = async (
  direccionId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${direccionId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}
