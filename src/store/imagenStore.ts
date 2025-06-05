import { create } from "zustand";
import type { IImagen } from "../types/IImagen";

interface IImagenStore {
    imagenesDetalle: IImagen[];
    setImagenesDetalle: (imagenes: IImagen[]) => void;
    añadirImagen: (imagenNueva: IImagen) => void;
    eliminarImagen: (idImagen: string) => void;
}

export const imagenStore = create<IImagenStore>((set) => ({
    imagenesDetalle: [],
    setImagenesDetalle: (imagenesIn) => {
        set(() => ({ imagenesDetalle: imagenesIn }))
    },
    añadirImagen: (imagenNueva) => {
        set((state) => ({ imagenesDetalle: [...state.imagenesDetalle, imagenNueva] }))
    },
    eliminarImagen: (idImagen) => {
        set((state) => ({ imagenesDetalle: state.imagenesDetalle.filter((imagen) => imagen.id !== idImagen) }))
    }
}))