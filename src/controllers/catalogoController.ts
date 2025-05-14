import axios from "./axios.ts";
import type { ICatalogo } from "../types/ICatalogo";

const apiUrlController = "/catalogos";

export const getCatalogosController = async (): Promise<
  ICatalogo[] | undefined
> => {
  try {
    const response = await axios.get<ICatalogo[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getCatalogosController", error);
  }
};

export const getCatalogosByIdController = async (
  catalogoId: string
): Promise<ICatalogo | undefined> => {
  try {
    const response = await axios.get<ICatalogo>(
      apiUrlController + `/${catalogoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getCatalogosByIdController", error);
  }
};

export const createCatalogoController = async (
  catalogoNuevo: ICatalogo
): Promise<ICatalogo | undefined> => {
  try {
    const response = await axios.post<ICatalogo>(
      apiUrlController,
      catalogoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createCatalogoController", error);
  }
};

export const updateCatalogoController = async (
  catalogoActualizado: ICatalogo
): Promise<ICatalogo | undefined> => {
  try {
    const response = await axios.put<ICatalogo>(
      apiUrlController + `/${catalogoActualizado.id}`,
      catalogoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateCatalogoController", error);
  }
};

export const deleteCatalogoController = async (
  catalogoId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      `${apiUrlController}/${catalogoId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Problemas en deleteCatalogoController", error);
  }
};
