import axiosAuth from "./axios.config.ts";
import type { IOrdenCompraDetalle } from "../types/IOrdenCompraDetalle.ts";
import type { IOrdenCompra } from "../types/IOrdenCompra.ts";
import type { IDetalleProducto } from "../types/IDetalleProducto.ts";
import axios from "axios";

const apiUrlController = "/ordenComprasDetalles";

export const getOrdenesComprasDetallesHabilitadosHttp = async (): Promise<IOrdenCompraDetalle[] | undefined> => {
  try {
    const response = await axios.get<IOrdenCompraDetalle[]>(import.meta.env.VITE_API_URL + apiUrlController + '/getEnabled')
    return response.data
  } catch (error) {
    console.error("Problemas en getOrdenesComprasDetallesHabilitadosHttp", error)
  }
}

export const getOrdenesCompraDetalleHttp = async (): Promise<
  IOrdenCompraDetalle[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IOrdenCompraDetalle[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenesCompraDetalleController", error);
  }
};

export const getOrdenCompraDetalleByIdHttp = async (
  ordenCompraDetalleId: string
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axiosAuth.get<IOrdenCompraDetalle>(
      apiUrlController + `/${ordenCompraDetalleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenCompraDetalleByIdController", error);
  }
};

export const createOrdenCompraDetalleHttp = async (
  ordenCompraDetalleNueva: IOrdenCompraDetalle
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axiosAuth.post<IOrdenCompraDetalle>(
      apiUrlController,
      ordenCompraDetalleNueva
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createOrdenCompraDetalleController", error);
  }
};

export const updateOrdenCompraDetalleHttp = async (
  ordenCompraDetalleActualizada: IOrdenCompraDetalle
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axiosAuth.put<IOrdenCompraDetalle>(
      apiUrlController, ordenCompraDetalleActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateOrdenCompraDetalleController", error);
  }
};

export const deleteOrdenCompraDetalleHttp = async (
  ordenCompraDetalleId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${ordenCompraDetalleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteOrdenCompraDetalleController", error);
  }
};

export const addOrdenCompraToOrdenCompraDetalleHttp = async (
  ordenCompra: IOrdenCompra,
  ordenCompraDetalleId: string
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axiosAuth.post<IOrdenCompraDetalle>(
      apiUrlController + `/ordenCompras/${ordenCompraDetalleId}`,
      ordenCompra
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en addOrdenCompraToOrdenCompraDetalleController",
      error
    );
  }
};

export const addDetalleProductoToOrdenCompraDetalleHttp = async (
  detalleProducto: IDetalleProducto,
  ordenCompraDetalleId: string
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axiosAuth.post<IOrdenCompraDetalle>(
      apiUrlController + `/detallesProductos/${ordenCompraDetalleId}`,
      detalleProducto
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en addDetalleProductoToOrdenCompraDetalleController",
      error
    );
  }
};

export const getOrdenesCompraDetalleByOrdenCompraIdHttp = async (
  ordenCompraId: string
): Promise<IOrdenCompraDetalle[] | undefined> => {
  try {
    const response = await axiosAuth.get<IOrdenCompraDetalle[]>(
      apiUrlController + `/ordenCompras/${ordenCompraId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en getOrdenesCompraDetalleByOrdenCompraIdController",
      error
    );
  }
};

export const getOrdenesCompraDetalleByDetalleProductoIdHttp = async (
  detalleProductoId: string
): Promise<IOrdenCompraDetalle[] | undefined> => {
  try {
    const response = await axiosAuth.get<IOrdenCompraDetalle[]>(
      apiUrlController + `/detallesProductos/${detalleProductoId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en getOrdenesCompraDetalleByDetalleProductoIdController",
      error
    );
  }
};

export const toggleHabilitadoHttp = async (
  ordenCompraDetalleId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${ordenCompraDetalleId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}