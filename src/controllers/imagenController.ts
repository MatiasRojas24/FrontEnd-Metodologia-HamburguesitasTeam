import axios from "./axios.ts";
import type { IImagen } from "../types/IImagen";
import type { IDetalleProducto } from "../types/IDetalleProducto";

const apiUrlController = "/imagenes";

export const getImagenesController = async (): Promise<
  IImagen[] | undefined
> => {
  try {
    const response = await axios.get<IImagen[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getImagenesController", error);
  }
};

export const getImagenByIdController = async (
  imagenId: string
): Promise<IImagen | undefined> => {
  try {
    const response = await axios.get<IImagen>(
      apiUrlController + `/${imagenId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getImagenByIdController", error);
  }
};

export const createImagenController = async (
  imagenNueva: IImagen
): Promise<IImagen | undefined> => {
  try {
    const response = await axios.post<IImagen>(apiUrlController, imagenNueva);
    return response.data;
  } catch (error) {
    console.error("Problemas en createImagenController", error);
  }
};

export const updateImagenController = async (
  imagenActualizada: IImagen
): Promise<IImagen | undefined> => {
  try {
    const response = await axios.put<IImagen>(
      apiUrlController + `/${imagenActualizada.id}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateImagenController", error);
  }
};

export const deleteImagenController = async (
  imagenId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${imagenId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteImagenController", error);
  }
};

export const addDetalleProductoToDireccionController = async (
  detalleProducto: IDetalleProducto,
  imagenId: string
): Promise<IImagen | undefined> => {
  try {
    const response = await axios.post<IImagen>(
      apiUrlController + `/detallesProductos/${imagenId}`,
      detalleProducto
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en addDetalleProductoToDireccionController",
      error
    );
  }
};

export const getImagenesByDetalleProductoIdController = async (
  detalleProductoId: string
): Promise<IImagen[] | undefined> => {
  try {
    const response = await axios.get<IImagen[]>(
      apiUrlController + `/detallesProductos/${detalleProductoId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en getImagenesByDetalleProductoIdController",
      error
    );
  }
};
