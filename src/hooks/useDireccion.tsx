import { useShallow } from "zustand/shallow"
import { addUsuariosToDireccionHttp, createDireccionHttp, deleteDireccionHttp, getDireccionByIdHttp, getDireccionesByUsuarioIdHttp, getDireccionesHttp, updateDireccionHttp } from "../http/direccionHttp"
import { direccionStore } from "../store/direccionStore"
import type { IDireccion } from "../types/IDireccion"
import type { IUsuario } from "../types/IUsuario"

export const useDireccion = () => {

    // STORE
    const { setDirecciones, añadirDireccion, actualizarDireccion, eliminarDireccion } = direccionStore(useShallow((state) => (
        {
            setDirecciones: state.setDirecciones,
            añadirDireccion: state.añadirDireccion,
            actualizarDireccion: state.actualizarDireccion,
            eliminarDireccion: state.eliminarDireccion
        }
    )))


    // METODOS DEL HOOK
    const getDirecciones = async (): Promise<void> => {
        const data = await getDireccionesHttp()
        if (data) setDirecciones(data)
    }

    const getDireccionById = async (idDireccion: string): Promise<IDireccion | undefined> => {
        try {
            const data = await getDireccionByIdHttp(idDireccion)
            if (!data) throw new Error

            return data;
        } catch (error) {
            console.error("Hubo un error en getDireccionById: ", error)
        }
    }

    const createDireccion = async (direccion: IDireccion): Promise<boolean> => {

        try {
            const data = await createDireccionHttp(direccion)
            console.log("data desde el registerUsuarioAdmin: ", data)
            if (!data) throw new Error
            añadirDireccion(direccion)

            return true
        } catch (error) {
            console.error("Hubo un error en createDireccion", error)
            return false
        }
    }

    const updateDireccion = async (direccionActualizada: IDireccion): Promise<boolean> => {

        try {
            const response = await updateDireccionHttp(direccionActualizada)
            console.log("Se actualizo el usuario: ", response)
            actualizarDireccion(direccionActualizada)

            return true;
        } catch (error) {
            console.error("Hubo un error en 'updateDireccion'", error)
            return false;
        }
    }

    const deleteDireccion = async (idDireccion: string): Promise<boolean> => {
        try {
            const response = await deleteDireccionHttp(idDireccion)
            console.log("Response del deleteDireccionController: ", response)
            eliminarDireccion(idDireccion)

            return true
        } catch (error) {
            console.error('Error en "deleteDireccion":', error)
            return false
        }
    }

    const addUsuariosToDirecciones = async (usuarios: IUsuario[], idDireccion: string): Promise<boolean> => {
        console.log(usuarios)
        console.log(idDireccion)
        try {
            const response = await addUsuariosToDireccionHttp(usuarios, idDireccion)
            if (!response) throw new Error

            const direccion = await getDireccionById(idDireccion)
            if (!direccion) {
                await deleteDireccion(idDireccion)
                throw new Error
            }

            actualizarDireccion(direccion)

            return true
        } catch (error) {
            console.log(usuarios)
            console.log(idDireccion)
            console.log("Hubo un error en addUsuariosToDirecciones: ", error)
            return false
        }
    }

    const getDireccionesByUsuarioId = async (idUsuario: string): Promise<void> => {
        try {
            const direcciones = await getDireccionesByUsuarioIdHttp(idUsuario)
            if (direcciones) setDirecciones(direcciones)
                
        } catch (error) {
            console.error("Hubo un problema en getDireccionesByUsuarioId: ", error)
        }
    }
    
  return {
    getDirecciones,
    createDireccion,
    updateDireccion,
    deleteDireccion,
    addUsuariosToDirecciones,
    getDireccionesByUsuarioId,
  }
}
