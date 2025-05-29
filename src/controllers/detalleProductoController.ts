import axios from "./axios.ts";
import type { IDetalleProducto } from "../types/IDetalleProducto";
import type { IProducto } from "../types/IProducto";
import type { ITalle } from "../types/ITalle";
import type { FiltroDetalleProducto } from "../types/IFiltroDetalleProducto.ts";

const apiUrlController = "/detallesProductos";



export const filtrarDetalleProductosController = async (filtro: FiltroDetalleProducto): Promise<IProducto [] | undefined> => {
  try {
    const params = new URLSearchParams();

    if (filtro.idTalle) params.append("idTalle", filtro.idTalle);
    if (filtro.tipoProducto) params.append("tipoProducto", filtro.tipoProducto);
    if (filtro.sexo) params.append("sexo", filtro.sexo);
    if (filtro.minPrecio !== null && filtro.minPrecio !== undefined) params.append("minPrecio", filtro.minPrecio.toString());
    if (filtro.maxPrecio !== null && filtro.maxPrecio !== undefined) params.append("maxPrecio", filtro.maxPrecio.toString());

    const response = await axios.get<IProducto[]>(apiUrlController + `/productos/filtro?${params.toString}`)

    return response.data
  } catch (error) {
    console.log("Error en el filtrarDetalleProductos", error);
  }}


export const getDetallesProductosController = async (): Promise<
  IDetalleProducto[] | undefined
> => {
  try {
    const response = await axios.get<IDetalleProducto[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getDetallesProductosController", error);
  }
};

export const getDetalleProductoByIdController = async (
  detalleProductoId: string
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axios.get<IDetalleProducto>(
      apiUrlController + `/${detalleProductoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDetalleProductoByIdController", error);
  }
};

export const createDetalleProductoController = async (
  detalleProductoNuevo: IDetalleProducto
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axios.post<IDetalleProducto>(
      apiUrlController,
      detalleProductoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createDetalleProductoController", error);
  }
};

export const updateDetalleProductoController = async (
  detalleProductoActualizado: IDetalleProducto
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axios.put<IDetalleProducto>(
      apiUrlController, detalleProductoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateDetalleProductoController", error);
  }
};

export const deleteDetalleProductoController = async (
  detalleProductoId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlController + `/${detalleProductoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteDetalleProductoController", error);
  }
};

export const addTalleToDetalleProductoController = async (
  talle: ITalle,
  detalleProductoId: string
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axios.post<IDetalleProducto>(
      apiUrlController + `/talles/${detalleProductoId}`,
      talle
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addTalleToDetalleProductoController", error);
  }
};

export const addProductoToDetalleProductoController = async (
  producto: IProducto,
  detalleProductoId: string
): Promise<IDetalleProducto | undefined> => {
  try {
    const response = await axios.post<IDetalleProducto>(
      apiUrlController + `/productos/${detalleProductoId}`,
      producto
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addProductoToDetalleProductoController", error);
  }
};

export const getDetallesProductosByTalleIdController = async (
  talleId: string
): Promise<IDetalleProducto[] | undefined> => {
  try {
    const response = await axios.get<IDetalleProducto[]>(
      apiUrlController + `/talles/${talleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getDetalleProductoByTalleIdController", error);
  }
};

export const getDetallesProductosByProductoIdController = async (
  productoId: string
): Promise<IDetalleProducto[] | undefined> => {
  try {
    const response = await axios.get<IDetalleProducto[]>(
      apiUrlController + `/productos/${productoId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Problemas en getDetalleProductoByProductoIdController",
      error
    );
  }
};
