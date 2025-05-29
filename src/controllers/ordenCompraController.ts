import axios from "./axios.ts";
import type { IOrdenCompra } from "../types/IOrdenCompra";
import type { IUsuario } from "../types/IUsuario";
import type { IDireccion } from "../types/IDireccion";

const apiUrlController = "/ordenesDeCompra";

export const getOrdenesCompraController = async (): Promise<
  IOrdenCompra[] | undefined
> => {
  try {
    const response = await axios.get<IOrdenCompra[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenesCompraController", error);
  }
};

export const getOrdenCompraByIdController = async (
  ordenCompraId: string
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axios.get<IOrdenCompra>(
      apiUrlController + `/${ordenCompraId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenCompraByIdController", error);
  }
};

export const createOrdenCompraController = async (
  ordenCompraNueva: IOrdenCompra
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axios.post<IOrdenCompra>(
      apiUrlController,
      ordenCompraNueva
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createOrdenCompraController", error);
  }
};

export const updateOrdenCompraController = async (
  ordenCompraActualizada: IOrdenCompra
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axios.put<IOrdenCompra>(
      apiUrlController, ordenCompraActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateOrdenCompraController", error);
  }
};

export const deleteOrdenCompraController = async (
  ordenCompraId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${ordenCompraId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteOrdenCompraController", error);
  }
};

export const addUsuarioToOrdenCompraController = async (
  usuario: IUsuario,
  ordenCompraId: string
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axios.post<IOrdenCompra>(
      apiUrlController + `/usuarios/${ordenCompraId}`,
      usuario
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addUsuarioToOrdenCompraController", error);
  }
};

export const addDireccionEnvioToOrdenCompraController = async (
  direccionEnvio: IDireccion,
  ordenCompraId: string
): Promise<IOrdenCompra | undefined> => {
  try {
    const response = await axios.post<IOrdenCompra>(
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

export const getOrdenesCompraByUsuarioIdController = async (
  usuarioId: string
): Promise<IOrdenCompra[] | undefined> => {
  try {
    const response = await axios.get<IOrdenCompra[]>(
      apiUrlController + `/usuarios/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenesCompraByUsuarioIdController", error);
  }
};

export const getOrdenesCompraByDireccionEnvioIdController = async (
  direccionId: string
): Promise<IOrdenCompra[] | undefined> => {
  try {
    const response = await axios.get<IOrdenCompra[]>(
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
