import axiosAuth from "./axios.config.ts";
import type { IDetalleProducto } from "../types/IDetalleProducto.ts";
import type { IProducto } from "../types/IProducto.ts";
import type { ITalle } from "../types/ITalle.ts";

const apiUrlController = "/detallesProductos";

export const getDetallesProductosHttp = async (): Promise<
  IDetalleProducto[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IDetalleProducto[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getDetallesProductosController", error);
  }
};

export const getDetalleProductoByIdHttp = async (
  detalleProductoId: string
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axiosAuth.get<IDetalleProducto>(
      apiUrlController + `/${detalleProductoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDetalleProductoByIdController", error);
  }
};

export const createDetalleProductoHttp = async (
  detalleProductoNuevo: IDetalleProducto
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axiosAuth.post<IDetalleProducto>(
      apiUrlController,
      detalleProductoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createDetalleProductoController", error);
  }
};

export const updateDetalleProductoHttp = async (
  detalleProductoActualizado: IDetalleProducto
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axiosAuth.put<IDetalleProducto>(
      apiUrlController, detalleProductoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateDetalleProductoController", error);
  }
};

export const deleteDetalleProductoHttp = async (
  detalleProductoId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${detalleProductoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteDetalleProductoController", error);
  }
};

export const addTalleToDetalleProductoHttp = async (
  talle: ITalle,
  detalleProductoId: string
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axiosAuth.post<IDetalleProducto>(
      apiUrlController + `/talles/${detalleProductoId}`,
      talle
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addTalleToDetalleProductoController", error);
  }
};

export const addProductoToDetalleProductoHttp = async (
  producto: IProducto,
  detalleProductoId: string
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axiosAuth.post<IDetalleProducto>(
      apiUrlController + `/productos/${detalleProductoId}`,
      producto
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addProductoToDetalleProductoController", error);
  }
};

export const getDetallesProductosByTalleIdHttp = async (
  talleId: string
): Promise<IDetalleProducto[] | undefined> => {
  try {
    const response = await axiosAuth.get<IDetalleProducto[]>(
      apiUrlController + `/talles/${talleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDetalleProductoByTalleIdController", error);
  }
};

export const getDetallesProductosByProductoIdHttp = async (
  productoId: string
): Promise<IDetalleProducto[] | undefined> => {
  try {
    const response = await axiosAuth.get<IDetalleProducto[]>(
      apiUrlController + `/productos/${productoId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en getDetalleProductoByProductoIdController",
      error
    );
  }
};
