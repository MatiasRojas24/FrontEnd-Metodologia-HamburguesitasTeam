import { create } from "zustand";
import type { IOrdenCompra } from "../types/IOrdenCompra";

interface IOrdenCompraStore {
  ordenesCompra: IOrdenCompra[];
  ordenesComprasHabilitadas: IOrdenCompra[];
  ordenCompraActiva: IOrdenCompra | null;
  setOrdenesCompra: (ordenes: IOrdenCompra[]) => void;
  setOrdenesComprasHabilitadas: (ordenes: IOrdenCompra[]) => void;
  setOrdenCompraActiva: (orden: IOrdenCompra | null) => void;
  añadirOrdenCompra: (orden: IOrdenCompra) => void;
  actualizarOrdenCompra: (orden: IOrdenCompra) => void;
  eliminarOrdenCompra: (id: string) => void;
}

export const ordenCompraStore = create<IOrdenCompraStore>((set) => ({
  ordenesCompra: [],
  ordenesComprasHabilitadas: [],
  ordenCompraActiva: null,

  setOrdenesCompra: (ordenes) => set(() => ({ ordenesCompra: ordenes })),
  setOrdenesComprasHabilitadas: (ordenes) => set(() => ({ ordenesComprasHabilitadas: ordenes })),
  setOrdenCompraActiva: (orden) => set(() => ({ ordenCompraActiva: orden })),

  añadirOrdenCompra: (orden) => set((state) => ({
    ordenesCompra: [...state.ordenesCompra, orden],
  })),

  actualizarOrdenCompra: (ordenActualizado) => set((state) => ({
    ordenesCompra: state.ordenesCompra.map((ord) =>
      ord.id === ordenActualizado.id ? { ...ordenActualizado } : ord
    ),
  })),

  eliminarOrdenCompra: (id) => set((state) => ({
    ordenesCompra: state.ordenesCompra.filter((ord) => ord.id !== id),
  })),
}));