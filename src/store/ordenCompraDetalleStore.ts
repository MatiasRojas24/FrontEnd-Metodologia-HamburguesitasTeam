import { create } from "zustand";
import type { IOrdenCompraDetalle } from "../types/IOrdenCompraDetalle";

interface IOrdenCompraDetalleStore {
  ordenesCompraDetalle: IOrdenCompraDetalle[];
  ordenesCompraDetalleHabilitados: IOrdenCompraDetalle[];
  ordenCompraDetalleActiva: IOrdenCompraDetalle | null;
  setOrdenesCompraDetalle: (ordenes: IOrdenCompraDetalle[]) => void;
  setOrdenesCompraDetalleHabilitados: (ordenes: IOrdenCompraDetalle[]) => void;
  setOrdenCompraDetalleActiva: (orden: IOrdenCompraDetalle | null) => void;
  añadirOrdenCompraDetalle: (orden: IOrdenCompraDetalle) => void;
  actualizarOrdenCompraDetalle: (orden: IOrdenCompraDetalle) => void;
  eliminarOrdenCompraDetalle: (id: string) => void;
}

export const ordenCompraDetalleStore = create<IOrdenCompraDetalleStore>((set) => ({
  ordenesCompraDetalle: [],
  ordenesCompraDetalleHabilitados: [],
  ordenCompraDetalleActiva: null,

  setOrdenesCompraDetalle: (ordenes) =>
    set(() => ({ ordenesCompraDetalle: ordenes })),

  setOrdenesCompraDetalleHabilitados: (ordenes) =>
    set(() => ({ ordenesCompraDetalleHabilitados: ordenes })),

  setOrdenCompraDetalleActiva: (orden) =>
    set(() => ({ ordenCompraDetalleActiva: orden })),

  añadirOrdenCompraDetalle: (orden) =>
    set((state) => ({
      ordenesCompraDetalle: [...state.ordenesCompraDetalle, orden],
    })),

  actualizarOrdenCompraDetalle: (ordenActualizada) =>
    set((state) => ({
      ordenesCompraDetalle: state.ordenesCompraDetalle.map((o) =>
        o.id === ordenActualizada.id ? { ...ordenActualizada } : o
      ),
    })),

  eliminarOrdenCompraDetalle: (id) =>
    set((state) => ({
      ordenesCompraDetalle: state.ordenesCompraDetalle.filter((o) => o.id !== id),
    })),
}));