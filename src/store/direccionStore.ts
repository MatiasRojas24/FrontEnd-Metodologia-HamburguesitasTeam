import { create } from "zustand";
import type { IDireccion } from "../types/IDireccion";

interface IDireccionStore {
    direcciones: IDireccion[] | []
    direccionActiva: IDireccion | null

    setDirecciones: (arrayDirecciones: IDireccion[]) => void
    setDireccionActiva: (direccionIn: IDireccion | null) => void
    añadirDireccion: (nuevaDireccion: IDireccion) => void
    actualizarDireccion: (direccionActualizaca: IDireccion) => void
    eliminarDireccion: (idDireccion: string) => void
}

export const direccionStore = create <IDireccionStore>((set)=>({
    direcciones: [],
    direccionActiva: null,

    setDirecciones: (arrayDirecciones) => {
        set(()=>({ direcciones: arrayDirecciones }))
    },

    setDireccionActiva: (direccionIn) => {
        set(()=>({ direccionActiva: direccionIn }))
    },

    añadirDireccion: (direccionNueva) => {
        set((state) => (
            {direcciones: [...state.direcciones, direccionNueva]}
        ))
    },

    actualizarDireccion: (direccionActualizada) => set((state) => (
        { direcciones: state.direcciones.map((direccion) => direccion.id === direccionActualizada.id ? {...direccionActualizada} : direccion) }
    )),

    eliminarDireccion: (idDireccion) => set((state) =>(
        { direcciones: state.direcciones.filter((direccion) => direccion.id !== idDireccion) }  
    ))
}))