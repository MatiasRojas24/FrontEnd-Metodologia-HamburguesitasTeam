import { create } from "zustand";
import type { IDetalleProducto } from "../types/IDetalleProducto";

interface IDetalleProductoStore {
    detallesDeProducto: IDetalleProducto[];
    detallesProductosHabilitados: IDetalleProducto[];
    detalleProductoActivo: IDetalleProducto | null;
    setDetallesDeProducto: (detallesDeProducto: IDetalleProducto[]) => void;
    setDetallesProductosHabilitados: (detallesProductos: IDetalleProducto[]) => void;
    setDetalleProductoActivo: (detalleProducto: IDetalleProducto | null) => void;
    añadirDetalleDeProducto: (detalleDeProductoNuevo: IDetalleProducto) => void;
    actualizarDetalleDeProducto: (detalleDeProductoActualizado: IDetalleProducto) => void;
    eliminarDetalleDeProducto: (idDetalleDeProducto: string) => void;
}

export const detalleProductoStore = create<IDetalleProductoStore>((set) => ({
    detallesDeProducto: [],
    detallesProductosHabilitados: [],
    detalleProductoActivo: null,
    setDetalleProductoActivo: (detalleProductoActivoIn) => {
        set(() => ({ detalleProductoActivo: detalleProductoActivoIn }))
    },
    setDetallesDeProducto: (detallesDeProductoIn) => {
        set(() => ({ detallesDeProducto: detallesDeProductoIn }))
    },
    setDetallesProductosHabilitados: (detallesProductosIn) => {
        set(() => ({ detallesProductosHabilitados: detallesProductosIn }))
    },
    añadirDetalleDeProducto: (detalleDeProductoNuevo) => {
        set((state) => ({ detallesDeProducto: [...state.detallesDeProducto, detalleDeProductoNuevo] }))
    },
    actualizarDetalleDeProducto: (detalleDeProductoActualizado) => set((state) => (
        { detallesDeProducto: state.detallesDeProducto.map((detalleDeProducto) => detalleDeProducto.id === detalleDeProductoActualizado.id ? { ...detalleDeProductoActualizado } : detalleDeProducto) }
    )),
    eliminarDetalleDeProducto: (idDetalleDeProducto) => set((state) => (
        { detallesDeProducto: state.detallesDeProducto.filter((detalleDeProducto) => detalleDeProducto.id !== idDetalleDeProducto) }
    )),
}))