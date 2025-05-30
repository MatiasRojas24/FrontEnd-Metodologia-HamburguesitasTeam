import axiosAuth from "./axios.config.ts";
import type { ITalle } from "../types/ITalle.ts";
import axios from "axios";

const apiUrlController = "/talles";

export const getTallesHabilitadosHttp = async (): Promise<ITalle[] | undefined> => {
  try {
    const response = await axios.get<ITalle[]>(apiUrlController + '/getEnabled')
    return response.data
  } catch (error) {
    console.error("Problemas en getTallesHabilitadosHttp", error)
  }
}

export const getTallesHttp = async (): Promise<ITalle[] | undefined> => {
  try {
    const response = await axiosAuth.get<ITalle[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getTallesController", error);
  }
};

export const getTalleByIdHttp = async (
  talleId: string
): Promise<ITalle | undefined> => {
  try {
    const response = await axiosAuth.get<ITalle>(apiUrlController + `/${talleId}`);
    return response.data;
  } catch (error) {
    console.error("Problemas en getTalleByIdController", error);
  }
};

export const createTalleHttp = async (
  talleNuevo: ITalle
): Promise<ITalle | undefined> => {
  try {
    const response = await axiosAuth.post<ITalle>(apiUrlController, talleNuevo);
    return response.data;
  } catch (error) {
    console.error("Problemas en createTalleController", error);
  }
};

export const updateTalleHttp = async (
  talleActualizado: ITalle
): Promise<ITalle | undefined> => {
  try {
    const response = await axiosAuth.put<ITalle>(
      apiUrlController, talleActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateTalleController", error);
  }
};

export const deleteTalleHttp = async (
  talleId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${talleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteTalleController", error);
  }
};

export const toggleHabilitadoHttp = async (
  talleId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${talleId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}