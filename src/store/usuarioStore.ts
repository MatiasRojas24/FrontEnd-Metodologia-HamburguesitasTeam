import { create } from "zustand";
import type { IUsuario } from "../types/IUsuario";
import type { IDireccion } from "../types/IDireccion";

interface IUsuarioStore {
    usuarioActivo: IUsuario | null
    usuarioLogeado: IUsuario | null,
    usuarios: IUsuario[]
    direccionesUsuario: IDireccion[] | []

    setUsuarioActivo: (usuario: IUsuario | null) => void
    setUsuarioLogeado: (usuario: IUsuario | null) => void
    setUsuarios: (arrayUsuarios: IUsuario[]) => void
    añadirUsuario: (usuarioNuevo: IUsuario) => void
    actualizarUsuario: (usuarioActualizado: IUsuario) => void
    eliminarUsuario: (idUsuario: string) => void
    setDireccionesUsuario: (direcciones: IDireccion[]) => void 
}

export const usuarioStore = create<IUsuarioStore>((set) => ({
    usuarioActivo: null,
    usuarioLogeado: null,
    usuarios: [],
    direccionesUsuario: [],

    setUsuarioActivo: (usuarioActivoIn) => {
        set(() => ({ usuarioActivo: usuarioActivoIn }))
    },

    setUsuarioLogeado: (usuarioLogeadoIn) => {
        set(() => ({ usuarioLogeado: usuarioLogeadoIn }))
    },

    setUsuarios: (arrayUsuarios) => {
        set(() => ({ usuarios: arrayUsuarios }))
    },

    añadirUsuario: (usuarioNuevo) => {
        set((state) => ({ usuarios: [...state.usuarios, usuarioNuevo] }))
    },

    actualizarUsuario: (usuarioActualizado) => set((state) => (
        { usuarios: state.usuarios.map((usuario) => usuario.id === usuarioActualizado.id ? { ...usuarioActualizado } : usuario) }
    )),

    eliminarUsuario: (idUsuario) => set((state) => (
        { usuarios: state.usuarios.filter((usuario) => usuario.id !== idUsuario) }
    )),

    setDireccionesUsuario: (direcciones) => {
        set(() => ({ direccionesUsuario: direcciones }))
    },
}))