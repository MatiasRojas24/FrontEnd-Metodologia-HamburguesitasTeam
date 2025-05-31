import axiosAuth from "./axios.config.ts";
import type { IProducto } from "../types/IProducto.ts";
import type { ICatalogo } from "../types/ICatalogo.ts";
import axios from "axios";
import type { IFiltroProducto } from "../types/IFiltroProducto.ts";

const apiUrlController = "/productos";

export const getProductosHabilitadosHttp = async (): Promise<IProducto[] | undefined> => {
  try {
    const response = await axios.get<IProducto[]>(import.meta.env.VITE_API_URL + apiUrlController + '/getEnabled')
    return response.data;
  } catch (error) {
    console.error("Problemas en getProductosHabilitadosHttp", error)
  }
}

export const getProductosHttp = async (): Promise<
  IProducto[] | undefined
> => {
  try {
    const response = await axiosAuth.get<IProducto[]>(apiUrlController);
    return response.data;
  } catch (error) {
    console.error("Problemas en getProductosController", error);
  }
};

export const getProductoByIdHttp = async (
  productoId: string
): Promise<IProducto | undefined> => {
  try {
    const response = await axiosAuth.get<IProducto>(
      apiUrlController + `/${productoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getProductoByIdController", error);
  }
};

export const createProductoHttp = async (
  productoNuevo: IProducto
): Promise<IProducto | undefined> => {
  try {
    const response = await axiosAuth.post<IProducto>(
      apiUrlController,
      productoNuevo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en createProductoController", error);
  }
};

export const updateProductoHttp = async (
  productoActualizado: IProducto
): Promise<IProducto | undefined> => {
  try {
    const response = await axiosAuth.put<IProducto>(
      apiUrlController, productoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateProductoController", error);
  }
};

export const deleteProductoHttp = async (
  productoId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.delete<string>(
      apiUrlController + `/${productoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteProductoController", error);
  }
};

export const addCatalogoToProductoHttp = async (
  catalogo: ICatalogo,
  productoId: string
): Promise<IProducto | undefined> => {
  try {
    const response = await axiosAuth.post<IProducto>(
      apiUrlController + `/catalogos/${productoId}`,
      catalogo
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addCatalogoToProductoController", error);
  }
};

export const getProductosByCatalogoIdHttp = async (
  catalogoId: string
): Promise<IProducto[] | undefined> => {
  try {
    const response = await axiosAuth.get<IProducto[]>(
      apiUrlController + `/catalogos/${catalogoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getProductosByCatalogoIdController", error);
  }
};

export const filtrarPorNombreOSexoOTipoProductoOIdCatalogoHttp = async (
  filtro: IFiltroProducto
): Promise<IProducto[] | undefined> => {
  try {
    const params = new URLSearchParams();

    if (filtro.nombre) params.append("nombre", filtro.nombre);
    if (filtro.tipoProducto) params.append("tipoProducto", filtro.tipoProducto);
    if (filtro.sexo) params.append("sexo", filtro.sexo);
    if (filtro.idCatalogo) params.append("idCatalogo", filtro.idCatalogo)

    const response = await axiosAuth.get<IProducto[]>(
      apiUrlController + `/filtro?${params.toString()}`
    )
    return response.data
  } catch (error) {
    console.error("Problemas en el filtro del producto", error)
  }
}

export const toggleHabilitadoHttp = async (
  productoId: string
): Promise<string | undefined> => {
  try {
    const response = await axiosAuth.patch<string>(`${apiUrlController}/toggle-habilitado/${productoId}`)
    return response.data
  } catch (error) {
    console.error("Error al alterar el estado", error)
  }
}