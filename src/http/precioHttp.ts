import axiosAuth from "./axios.config.ts";
import type { IPrecio } from "../types/IPrecio.ts";
import type { IDetalleProducto } from "../types/IDetalleProducto.ts";
import type { IDescuento } from "../types/IDescuento.ts";
import axios from "axios";

const apiUrlController = "/precios";

export const getPreciosHabilitadosHttp = async (): Promise<IPrecio[] | undefined> => {
  try {
    const response = await axios.get<IPrecio[]>(import.meta.env.VITE_API_URL + apiUrlController + '/getEnabled')
    return response.data
  } catch (error) {
    console.error("Problemas en getPreciosHabilitadosHttp", error)
  }
}


export const getPreciosHttp = async (): Promise<
  IPrecio[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IPrecio[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getPreciosController", error);
  }
};

export const getPrecioByIdHttp = async (
  precioId: string
): Promise<IPrecio | undefined> => {
  try {
    const response = await axiosAuth.get<IPrecio>(
      apiUrlController + `/${precioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getPrecioByIdController", error);
  }
};

export const createPrecioHttp = async (
  precioNuevo: IPrecio
): Promise<IPrecio | undefined> => {
  try {
    const response = await axiosAuth.post<IPrecio>(apiUrlController, precioNuevo);
    return response.data;
  } catch (error) {
    console.error("Problemas en createPrecioController", error);
  }
};

export const updatePrecioHttp = async (
  precioActualizado: IPrecio
): Promise<IPrecio | undefined> => {
  try {
    const response = await axiosAuth.put<IPrecio>(
      apiUrlController, precioActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updatePrecioController", error);
  }
};

export const deletePrecioHttp = async (
  precioId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${precioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deletePrecioController", error);
  }
};

export const addDetalleProductoToPrecioHttp = async (
  detalleProducto: IDetalleProducto,
  precioId: string
): Promise<IPrecio | undefined> => {
  try {
    const response = await axiosAuth.post<IPrecio>(
      apiUrlController + `/detallesProductos/${precioId}`,
      detalleProducto
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addDetalleProductoToPrecioController", error);
  }
};

export const addDescuentoToPrecioHttp = async (
  descuento: IDescuento,
  precioId: string
): Promise<IPrecio | undefined> => {
  try {
    const response = await axiosAuth.post<IPrecio>(
      apiUrlController + `/descuentos/${precioId}`,
      descuento
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addDescuentoToPrecioController", error);
  }
};

export const getPreciosByDetalleProductoIdHttp = async (
  detalleProductoId: string
): Promise<IPrecio[] | undefined> => {
  try {
    const response = await axiosAuth.get<IPrecio[]>(
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

export const getPreciosByDescuentoIdHttp = async (
  descuentoId: string
): Promise<IPrecio[] | undefined> => {
  try {
    const response = await axiosAuth.get<IPrecio[]>(
      apiUrlController + `/descuentos/${descuentoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getPreciosByDescuentoIdController", error);
  }
};

export const toggleHabilitadoHttp = async (
  precioId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${precioId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}