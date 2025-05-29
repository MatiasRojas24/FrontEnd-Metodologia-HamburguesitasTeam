import axios from "./axios.ts";
import type { IOrdenCompraDetalle } from "../types/IOrdenCompraDetalle";
import type { IOrdenCompra } from "../types/IOrdenCompra";
import type { IDetalleProducto } from "../types/IDetalleProducto";

const apiUrlController = "/ordenComprasDetalles";

export const getOrdenesCompraDetalleController = async (): Promise<
  IOrdenCompraDetalle[] | undefined
> => {
  try {
    const response = await axios.get<IOrdenCompraDetalle[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenesCompraDetalleController", error);
  }
};

export const getOrdenCompraDetalleByIdController = async (
  ordenCompraDetalleId: string
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axios.get<IOrdenCompraDetalle>(
      apiUrlController + `/${ordenCompraDetalleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getOrdenCompraDetalleByIdController", error);
  }
};

export const createOrdenCompraDetalleController = async (
  ordenCompraDetalleNueva: IOrdenCompraDetalle
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axios.post<IOrdenCompraDetalle>(
      apiUrlController,
      ordenCompraDetalleNueva
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createOrdenCompraDetalleController", error);
  }
};

export const updateOrdenCompraDetalleController = async (
  ordenCompraDetalleActualizada: IOrdenCompraDetalle
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axios.put<IOrdenCompraDetalle>(
      apiUrlController, ordenCompraDetalleActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateOrdenCompraDetalleController", error);
  }
};

export const deleteOrdenCompraDetalleController = async (
  ordenCompraDetalleId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${ordenCompraDetalleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteOrdenCompraDetalleController", error);
  }
};

export const addOrdenCompraToOrdenCompraDetalleController = async (
  ordenCompra: IOrdenCompra,
  ordenCompraDetalleId: string
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axios.post<IOrdenCompraDetalle>(
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

export const addDetalleProductoToOrdenCompraDetalleController = async (
  detalleProducto: IDetalleProducto,
  ordenCompraDetalleId: string
): Promise<IOrdenCompraDetalle | undefined> => {
  try {
    const response = await axios.post<IOrdenCompraDetalle>(
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

export const getOrdenesCompraDetalleByOrdenCompraIdController = async (
  ordenCompraId: string
): Promise<IOrdenCompraDetalle[] | undefined> => {
  try {
    const response = await axios.get<IOrdenCompraDetalle[]>(
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

export const getOrdenesCompraDetalleByDetalleProductoIdController = async (
  detalleProductoId: string
): Promise<IOrdenCompraDetalle[] | undefined> => {
  try {
    const response = await axios.get<IOrdenCompraDetalle[]>(
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
