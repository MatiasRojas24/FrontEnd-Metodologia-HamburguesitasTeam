import axios from "./axios.ts";
import type { IProducto } from "../types/IProducto";
import type { ICatalogo } from "../types/ICatalogo";

const apiUrlController = "/productos";

export const getProductosController = async (): Promise<
  IProducto[] | undefined
> => {
  try {
    const response = await axios.get<IProducto[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getProductosController", error);
  }
};

export const getProductoByIdController = async (
  productoId: string
): Promise<IProducto | undefined> => {
  try {
    const response = await axios.get<IProducto>(
      apiUrlController + `/${productoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getProductoByIdController", error);
  }
};

export const createProductoController = async (
  productoNuevo: IProducto
): Promise<IProducto | undefined> => {
  try {
    const response = await axios.post<IProducto>(
      apiUrlController,
      productoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createProductoController", error);
  }
};

export const updateProductoController = async (
  productoActualizado: IProducto
): Promise<IProducto | undefined> => {
  try {
    const response = await axios.put<IProducto>(
      apiUrlController + `/${productoActualizado.id}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateProductoController", error);
  }
};

export const deleteProductoController = async (
  productoId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${productoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteProductoController", error);
  }
};

export const addCatalogoToProductoController = async (
  catalogo: ICatalogo,
  productoId: string
): Promise<IProducto | undefined> => {
  try {
    const response = await axios.post<IProducto>(
      apiUrlController + `/catalogos/${productoId}`,
      catalogo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addCatalogoToProductoController", error);
  }
};

export const getProductosByCatalogoIdController = async (
  catalogoId: string
): Promise<IProducto[] | undefined> => {
  try {
    const response = await axios.get<IProducto[]>(
      apiUrlController + `/catalogos/${catalogoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getProductosByCatalogoIdController", error);
  }
};
