import axiosAuth from "./axios.config.ts";
import type { ICatalogo } from "../types/ICatalogo.ts";

const apiUrlController = "/catalogos";

export const getCatalogosHttp = async (): Promise<
  ICatalogo[] | undefined
> => {
  try {
    const response = await axiosAuth.get<ICatalogo[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getCatalogosController", error);
  }
};

export const getCatalogosByIdHttp = async (
  catalogoId: string
): Promise<ICatalogo | undefined> => {
  try {
    const response = await axiosAuth.get<ICatalogo>(
      apiUrlController + `/${catalogoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getCatalogosByIdController", error);
  }
};

export const createCatalogoHttp = async (
  catalogoNuevo: ICatalogo
): Promise<ICatalogo | undefined> => {
  try {
    const response = await axiosAuth.post<ICatalogo>(
      apiUrlController,
      catalogoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createCatalogoController", error);
  }
};

export const updateCatalogoHttp = async (
  catalogoActualizado: ICatalogo
): Promise<ICatalogo | undefined> => {
  try {
    const response = await axiosAuth.put<ICatalogo>(
      apiUrlController,
      catalogoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateCatalogoController", error);
  }
};

export const deleteCatalogoHttp = async (
  catalogoId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      `${apiUrlController}/${catalogoId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Problemas en deleteCatalogoController", error);
  }
};
