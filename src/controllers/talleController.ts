import axios from "./axios.ts";
import type { ITalle } from "../types/ITalle";

const apiUrlController = "/talles";

export const getTallesController = async (): Promise<ITalle[] | undefined> => {
  try {
    const response = await axios.get<ITalle[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getTallesController", error);
  }
};

export const getTalleByIdController = async (
  talleId: string
): Promise<ITalle | undefined> => {
  try {
    const response = await axios.get<ITalle>(apiUrlController + `/${talleId}`);
    return response.data;
  } catch (error) {
    console.error("Problemas en getTalleByIdController", error);
  }
};

export const createTalleController = async (
  talleNuevo: ITalle
): Promise<ITalle | undefined> => {
  try {
    const response = await axios.post<ITalle>(apiUrlController, talleNuevo);
    return response.data;
  } catch (error) {
    console.error("Problemas en createTalleController", error);
  }
};

export const updateTalleController = async (
  talleActualizado: ITalle
): Promise<ITalle | undefined> => {
  try {
    const response = await axios.put<ITalle>(
      apiUrlController + `/${talleActualizado.id}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateTalleController", error);
  }
};

export const deleteTalleController = async (
  talleId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${talleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteTalleController", error);
  }
};
