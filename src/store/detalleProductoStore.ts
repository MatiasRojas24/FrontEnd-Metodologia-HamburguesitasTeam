import { create } from "zustand";
import type { IDetalleProducto } from "../types/IDetalleProducto";

interface IDetalleProductoStore {
    detalleProductoHabilitado: IDetalleProducto[];
    setDetalleProductoHabilitado: (detalleProducto: IDetalleProducto[]) => void;
}
export const detalleProductoStore = create<IDetalleProductoStore>((set)=> ({
    detalleProductoHabilitado: [],
    setDetalleProductoHabilitado: (detalleProducto) => {set({detalleProductoHabilitado: detalleProducto})}
}))