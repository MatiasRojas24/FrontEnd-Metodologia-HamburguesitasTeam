import { create } from "zustand";
import type { ICatalogo } from "../types/ICatalogo";

interface ICatalogoStore {
    catalogoActivo: ICatalogo | null;
    catalogos: ICatalogo[];
    setCatalogoActivo: (catalogo: ICatalogo) => void;
    setCatalogos: (catalogos: ICatalogo[]) => void;
    añadirCatalogo: (catalogoNuevo: ICatalogo) => void;
}

export const catalogoStore = create<ICatalogoStore>((set) => ({
    catalogoActivo: null,
    catalogos: [],
    setCatalogoActivo: (catalogoActivoIn) => {
        set(() => ({ catalogoActivo: catalogoActivoIn }))
    },
    setCatalogos: (catalogos) => {
        set(() => ({ catalogos: catalogos }))
    },
    añadirCatalogo: (catalogoNuevo) => {
        set((state) => ({ catalogos: [...state.catalogos, catalogoNuevo] }))
    }
}))