import { useEffect } from "react";
import {
  getOrdenesCompraDetalleHttp,
  getOrdenesComprasDetallesHabilitadosHttp,
  createOrdenCompraDetalleHttp,
  updateOrdenCompraDetalleHttp,
  deleteOrdenCompraDetalleHttp,
  toggleHabilitadoHttp,
  getOrdenesCompraDetalleByOrdenCompraIdHttp,
  getOrdenesCompraDetalleByDetalleProductoIdHttp,
} from "../http/ordenCompraDetalleController";
import { ordenCompraDetalleStore } from "../store/ordenCompraDetalleStore";
import type { IOrdenCompraDetalle } from "../types/IOrdenCompraDetalle";

export const useOrdenCompraDetalle = () => {
  const setOrdenesCompraDetalle = ordenCompraDetalleStore(state => state.setOrdenesCompraDetalle);
  const setOrdenesCompraDetalleHabilitados = ordenCompraDetalleStore(state => state.setOrdenesCompraDetalleHabilitados);
  const añadirOrdenCompraDetalle = ordenCompraDetalleStore(state => state.añadirOrdenCompraDetalle);
  const actualizarOrdenCompraDetalle = ordenCompraDetalleStore(state => state.actualizarOrdenCompraDetalle);
  const eliminarOrdenCompraDetalleStore = ordenCompraDetalleStore(state => state.eliminarOrdenCompraDetalle);

  const getOrdenes = async () => {
    const data = await getOrdenesCompraDetalleHttp();
    if (data) setOrdenesCompraDetalle(data);
  };

  const getHabilitados = async () => {
    const data = await getOrdenesComprasDetallesHabilitadosHttp();
    if (data) setOrdenesCompraDetalleHabilitados(data);
  };

  const crear = async (nuevo: IOrdenCompraDetalle) => {
    const creado = await createOrdenCompraDetalleHttp(nuevo);
    if (creado) añadirOrdenCompraDetalle(creado);
    return creado;
  };

  const actualizar = async (actualizado: IOrdenCompraDetalle) => {
    const data = await updateOrdenCompraDetalleHttp(actualizado);
    if (data) actualizarOrdenCompraDetalle(data);
    return data;
  };

  const eliminar = async (id: string) => {
    const res = await deleteOrdenCompraDetalleHttp(id);
    if (res) eliminarOrdenCompraDetalleStore(id);
    return res;
  };

  const toggleHabilitado = async (id: string) => {
    return await toggleHabilitadoHttp(id);
  };

  const getByOrdenCompraId = async (ordenCompraId: string) => {
    return await getOrdenesCompraDetalleByOrdenCompraIdHttp(ordenCompraId);
  };

  const getByDetalleProductoId = async (detalleProductoId: string) => {
    return await getOrdenesCompraDetalleByDetalleProductoIdHttp(detalleProductoId);
  };

  return {
    getOrdenes,
    getHabilitados,
    crear,
    actualizar,
    eliminar,
    toggleHabilitado,
    getByOrdenCompraId,
    getByDetalleProductoId,
  };
};