import axiosAuth from "./axios.config.ts";
import type { IOrdenCompra } from "../types/IOrdenCompra.ts";
import type { IUsuario } from "../types/IUsuario.ts";
import type { IDireccion } from "../types/IDireccion.ts";
import axios from "axios";

const apiUrlController = "/ordenesDeCompra";

export const getOrdenesComprasHabilitadasHttp = async (): Promise<IOrdenCompra[] | undefined> => {
  try {
    const response = await axios.get<IOrdenCompra[]>(apiUrlController + '/getEnabled')
    return response.data
  } catch (error) {
    console.error("Problemas en getOrdenesComprasHabilitadasHttp", error)
  }
}

export const getOrdenesCompraHttp = async (): Promise<
  IOrdenCompra[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IOrdenCompra[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenesCompraController", error);
  }
};

export const getOrdenCompraByIdHttp = async (
  ordenCompraId: string
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axiosAuth.get<IOrdenCompra>(
      apiUrlController + `/${ordenCompraId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenCompraByIdController", error);
  }
};

export const createOrdenCompraHttp = async (
  ordenCompraNueva: IOrdenCompra
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axiosAuth.post<IOrdenCompra>(
      apiUrlController,
      ordenCompraNueva
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createOrdenCompraController", error);
  }
};

export const updateOrdenCompraHttp = async (
  ordenCompraActualizada: IOrdenCompra
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axiosAuth.put<IOrdenCompra>(
      apiUrlController, ordenCompraActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateOrdenCompraController", error);
  }
};

export const deleteOrdenCompraHttp = async (
  ordenCompraId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${ordenCompraId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteOrdenCompraController", error);
  }
};

export const addUsuarioToOrdenCompraHttp = async (
  usuario: IUsuario,
  ordenCompraId: string
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axiosAuth.post<IOrdenCompra>(
      apiUrlController + `/usuarios/${ordenCompraId}`,
      usuario
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addUsuarioToOrdenCompraController", error);
  }
};

export const addDireccionEnvioToOrdenCompraHttp = async (
  direccionEnvio: IDireccion,
  ordenCompraId: string
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axiosAuth.post<IOrdenCompra>(
      apiUrlController + `/direcciones/${ordenCompraId}`,
      direccionEnvio
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en addDireccionEnvioToOrdenCompraController",
      error
    );
  }
};

export const getOrdenesCompraByUsuarioIdHttp = async (
  usuarioId: string
): Promise<IOrdenCompra[] | undefined> => {
  try {
    const response = await axiosAuth.get<IOrdenCompra[]>(
      apiUrlController + `/usuarios/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenesCompraByUsuarioIdController", error);
  }
};

export const getOrdenesCompraByDireccionEnvioIdHttp = async (
  direccionId: string
): Promise<IOrdenCompra[] | undefined> => {
  try {
    const response = await axiosAuth.get<IOrdenCompra[]>(
      apiUrlController + `/direcciones/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en getOrdenesCompraByDireccionEnvioIdController",
      error
    );
  }
};

export const toggleHabilitadoHttp = async (
  ordenCompraId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${ordenCompraId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}
