import axios from "./axios.ts";
import type { IPrecio } from "../types/IPrecio";
import type { IDetalleProducto } from "../types/IDetalleProducto";
import type { IDescuento } from "../types/IDescuento";

const apiUrlController = "/precios";

export const getPreciosController = async (): Promise<
  IPrecio[] | undefined
> => {
  try {
    const response = await axios.get<IPrecio[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getPreciosController", error);
  }
};

export const getPrecioByIdController = async (
  precioId: string
): Promise<IPrecio | undefined> => {
  try {
    const response = await axios.get<IPrecio>(
      apiUrlController + `/${precioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getPrecioByIdController", error);
  }
};

export const createPrecioController = async (
  precioNuevo: IPrecio
): Promise<IPrecio | undefined> => {
  try {
    const response = await axios.post<IPrecio>(apiUrlController, precioNuevo);
    return response.data;
  } catch (error) {
    console.error("Problemas en createPrecioController", error);
  }
};

export const updatePrecioController = async (
  precioActualizado: IPrecio
): Promise<IPrecio | undefined> => {
  try {
    const response = await axios.put<IPrecio>(
      apiUrlController, precioActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updatePrecioController", error);
  }
};

export const deletePrecioController = async (
  precioId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${precioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deletePrecioController", error);
  }
};

export const addDetalleProductoToPrecioController = async (
  detalleProducto: IDetalleProducto,
  precioId: string
): Promise<IPrecio | undefined> => {
  try {
    const response = await axios.post<IPrecio>(
      apiUrlController + `/detallesProductos/${precioId}`,
      detalleProducto
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addDetalleProductoToPrecioController", error);
  }
};

export const addDescuentoToPrecioController = async (
  descuento: IDescuento,
  precioId: string
): Promise<IPrecio | undefined> => {
  try {
    const response = await axios.post<IPrecio>(
      apiUrlController + `/descuentos/${precioId}`,
      descuento
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addDescuentoToPrecioController", error);
  }
};

export const getPreciosByDetalleProductoIdController = async (
  detalleProductoId: string
): Promise<IPrecio[] | undefined> => {
  try {
    const response = await axios.get<IPrecio[]>(
      apiUrlController + `/detallesProductos/${detalleProductoId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en getPreciosByDetalleProductoIdController",
      error
    );
  }
};

export const getPreciosByDescuentoIdController = async (
  descuentoId: string
): Promise<IPrecio[] | undefined> => {
  try {
    const response = await axios.get<IPrecio[]>(
      apiUrlController + `/descuentos/${descuentoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getPreciosByDescuentoIdController", error);
  }
};
