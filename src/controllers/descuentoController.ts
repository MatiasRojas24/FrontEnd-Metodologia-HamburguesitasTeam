import axios from "./axios.ts";
import type { IDescuento } from "../types/IDescuento";

const apiUrlController = "/descuentos";

export const getDescuentosController = async (): Promise<
  IDescuento[] | undefined
> => {
  try {
    const response = await axios.get<IDescuento[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getDescuentosController", error);
  }
};

export const getDescuentoByIdController = async (
  descuentoId: string
): Promise<IDescuento | undefined> => {
  try {
    const response = await axios.get<IDescuento>(
      apiUrlController + `/${descuentoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDescuentosByIdController", error);
  }
};

export const createDescuentoController = async (
  descuentoNuevo: IDescuento
): Promise<IDescuento | undefined> => {
  try {
    const response = await axios.post<IDescuento>(
      apiUrlController,
      descuentoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createDescuentoController", error);
  }
};

export const updateDescuentoController = async (
  descuentoActualizado: IDescuento
): Promise<IDescuento | undefined> => {
  try {
    const response = await axios.put<IDescuento>(
      apiUrlController, descuentoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateDescuentoController", error);
  }
};

export const deleteDescuentoController = async (
  descuentoId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${descuentoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteDescuentoController", error);
  }
};
