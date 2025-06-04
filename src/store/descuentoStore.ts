import { create } from "zustand";
import type { IDescuento } from "../types/IDescuento";

interface IDescuentoStore {
    descuentos: IDescuento[];
    descuentoActivo: IDescuento | null;
    setDescuentos: (descuentos: IDescuento[]) => void;
    setDescuentoActivo: (descuento: IDescuento | null) => void;
    añadirDescuento: (descuentoNuevo: IDescuento) => void;
    actualizarDescuento: (descuentoActualizado: IDescuento) => void;
    eliminarDescuento: (idDescuento: string) => void;
}

export const descuentoStore = create<IDescuentoStore>((set) => ({
    descuentos: [],
    descuentoActivo: null,
    setDescuentos: (descuentosIn) => {
        set(() => ({ descuentos: descuentosIn }))
    },
    setDescuentoActivo: (descuentoIn) => {
        set(() => ({ descuentoActivo: descuentoIn }))
    },
    añadirDescuento: (descuentoNuevo) => {
        set((state) => ({ descuentos: [...state.descuentos, descuentoNuevo] }))
    },
    actualizarDescuento: (descuentoActualizado) => set((state) => (
        { descuentos: state.descuentos.map((descuento) => descuento.id === descuentoActualizado.id ? { ...descuentoActualizado } : descuento) }
    )),
    eliminarDescuento: (idDescuento) => set((state) => (
        { descuentos: state.descuentos.filter((descuento) => descuento.id !== idDescuento) }
    ))
}))