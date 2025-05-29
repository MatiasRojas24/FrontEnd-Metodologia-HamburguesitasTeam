import axiosAuth from "./axios.config.ts";
import type { IImagen } from "../types/IImagen.ts";
import type { IDetalleProducto } from "../types/IDetalleProducto.ts";

const apiUrlController = "/imagenes";

export const getImagenesHttp = async (): Promise<
  IImagen[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IImagen[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getImagenesController", error);
  }
};

export const getImagenByIdHttp = async (
  imagenId: string
): Promise<IImagen | undefined> => {
  try {
    const response = await axiosAuth.get<IImagen>(
      apiUrlController + `/${imagenId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getImagenByIdController", error);
  }
};

export const createImagenHttp = async (
  imagenNueva: IImagen
): Promise<IImagen | undefined> => {
  try {
    const response = await axiosAuth.post<IImagen>(apiUrlController, imagenNueva);
    return response.data;
  } catch (error) {
    console.error("Problemas en createImagenController", error);
  }
};

export const updateImagenHttp = async (
  imagenActualizada: IImagen
): Promise<IImagen | undefined> => {
  try {
    const response = await axiosAuth.put<IImagen>(
      apiUrlController, imagenActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateImagenController", error);
  }
};

export const deleteImagenHttp = async (
  imagenId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${imagenId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteImagenController", error);
  }
};

export const addDetalleProductoToImagenHttp = async (
  detalleProducto: IDetalleProducto,
  imagenId: string
): Promise<IImagen | undefined> => {
  try {
    const response = await axiosAuth.post<IImagen>(
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

export const getImagenesByDetalleProductoIdHttp = async (
  detalleProductoId: string
): Promise<IImagen[] | undefined> => {
  try {
    const response = await axiosAuth.get<IImagen[]>(
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
