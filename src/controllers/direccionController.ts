import axios from "./axios.ts";
import type { IDireccion } from "../types/IDireccion";
import type { IUsuario } from "../types/IUsuario";

const apiUrlController = "/direcciones";

export const getDireccionesController = async (): Promise<
  IDireccion[] | undefined
> => {
  try {
    const response = await axios.get<IDireccion[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getDireccionesController", error);
  }
};

export const getDireccionByIdController = async (
  direccionId: string
): Promise<IDireccion | undefined> => {
  try {
    const response = await axios.get<IDireccion>(
      apiUrlController + `/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDireccionByIdController", error);
  }
};

export const createDireccionController = async (
  direccionNueva: IDireccion
): Promise<IDireccion | undefined> => {
  try {
    const response = await axios.post<IDireccion>(
      apiUrlController,
      direccionNueva
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createDireccionController", error);
  }
};

export const updateDireccionController = async (
  direccionActualizada: IDireccion
): Promise<IDireccion | undefined> => {
  try {
    const response = await axios.put<IDireccion>(
      apiUrlController, direccionActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateDireccionController", error);
  }
};

export const deleteDireccionController = async (
  direccionId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteDireccionController", error);
  }
};

export const addUsuariosToDireccionController = async (
  usuarios: IUsuario[],
  direccionId: string
): Promise<IDireccion | undefined> => {
  try {
    const response = await axios.post<IDireccion>(
      apiUrlController + `/usuarios/${direccionId}`,
      usuarios
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addUsuariosToDireccionController", error);
  }
};

export const getDireccionesByUsuarioIdController = async (
  usuarioId: string
): Promise<IDireccion[] | undefined> => {
  try {
    const response = await axios.get<IDireccion[]>(
      apiUrlController + `/usuarios/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDireccionesByUsuarioIdController", error);
  }
};
