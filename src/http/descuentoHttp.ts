import axiosAuth from "./axios.config.ts";
import type { IDescuento } from "../types/IDescuento.ts";

const apiUrlController = "/descuentos";

export const getDescuentosHttp = async (): Promise<
  IDescuento[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IDescuento[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getDescuentosController", error);
  }
};

export const getDescuentoByIdHttp = async (
  descuentoId: string
): Promise<IDescuento | undefined> => {
  try {
    const response = await axiosAuth.get<IDescuento>(
      apiUrlController + `/${descuentoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDescuentosByIdController", error);
  }
};

export const createDescuentoHttp = async (
  descuentoNuevo: IDescuento
): Promise<IDescuento | undefined> => {
  try {
    const response = await axiosAuth.post<IDescuento>(
      apiUrlController,
      descuentoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createDescuentoController", error);
  }
};

export const updateDescuentoHttp = async (
  descuentoActualizado: IDescuento
): Promise<IDescuento | undefined> => {
  try {
    const response = await axiosAuth.put<IDescuento>(
      apiUrlController, descuentoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateDescuentoController", error);
  }
};

export const deleteDescuentoHttp = async (
  descuentoId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${descuentoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteDescuentoController", error);
  }
};
