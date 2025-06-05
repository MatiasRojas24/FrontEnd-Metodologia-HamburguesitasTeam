import { create } from "zustand";
import type { ITalle } from "../types/ITalle";

interface ITalleStore {
    talles: ITalle[];
    tallesFiltrados: ITalle[];
    setTalles: (talles: ITalle[]) => void;
    setTallesFiltrados: (talles: ITalle[]) => void;
    añadirTalle: (talleNuevo: ITalle) => void;
}

export const talleStore = create<ITalleStore>((set) => ({
    talles: [],
    tallesFiltrados: [],
    setTalles: (tallesIn) => {
        set(() => ({ talles: tallesIn }))
    },
    setTallesFiltrados: (tallesIn) => {
        set(() => ({ tallesFiltrados: tallesIn }))
    },
    añadirTalle: (talleNuevo) => {
        set((state) => ({ talles: [...state.talles, talleNuevo] }))
    },
}))