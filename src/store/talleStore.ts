import { create } from "zustand";
import type { ITalle } from "../types/ITalle";

interface ITalleStore {
    talles: ITalle[];
    setTalles: (talles: ITalle[]) => void;
    añadirTalle: (talleNuevo: ITalle) => void;
}

export const talleStore = create<ITalleStore>((set) => ({
    talles: [],
    setTalles: (tallesIn) => {
        set(() => ({ talles: tallesIn }))
    },
    añadirTalle: (talleNuevo) => {
        set((state) => ({ talles: [...state.talles, talleNuevo] }))
    },
}))