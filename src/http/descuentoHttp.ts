import axiosAuth from "./axios.config.ts";
import type { IDescuento } from "../types/IDescuento.ts";
import axios from "axios";

const apiUrlController = "/descuentos";

export const getDescuentosHabilitadosHttp = async (): Promise<IDescuento[] | undefined> => {
  try {
    const response = await axios.get<IDescuento[]>(import.meta.env.VITE_API_URL + apiUrlController + '/getEnabled')
    return response.data
  } catch (error) {
    console.error("Problemas en getDescuentosHabilitadosHttp", error)
  }
}

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

export const toggleHabilitadoHttp = async (
  descuentoId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${descuentoId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}
