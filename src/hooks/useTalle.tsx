import { useShallow } from "zustand/shallow"
import { talleStore } from "../store/talleStore"
import type { ITalle } from "../types/ITalle"
import { createTalleHttp, getTalleByIdHttp, getTallesHabilitadosHttp } from "../http/talleHttp"
import { CustomSwal } from "../components/UI/CustomSwal/CustomSwal"

export const useTalle = () => {
    const { setTalles, añadirTalle } = talleStore(useShallow((state) => ({
        setTalles: state.setTalles,
        añadirTalle: state.añadirTalle
    })))

    const getTalles = async (): Promise<void> => {
        try {
            const data = await getTallesHabilitadosHttp();
            if (data) {
                setTalles(data)
            }
        } catch (error) {
            console.error("Error en getTalles: ", error)
        }
    }

    const getTalleById = async (talleId: string): Promise<ITalle | undefined> => {
        try {
            const data = getTalleByIdHttp(talleId)
            if (!data) throw new Error;
            return data
        } catch (error) {
            console.error("Error en getTalleById: ", error)
        }
    }

    const createTalle = async (talle: ITalle): Promise<boolean> => {
        try {
            const data = await createTalleHttp(talle)
            if (data) {
                añadirTalle(data)
                CustomSwal.fire("Éxito", "Talle creado correctamente", "success")
                return true
            }
            return false
        } catch (error) {
            console.error("Error en create talle: ", error)
            const err = error as Error;
            if (err.message === "403") {
                CustomSwal.fire("Error", "El talle ya existe", "error");
            } else {
                CustomSwal.fire("Acceso denegado", "No tienes permisos para crear talles", "error");
            }
            return false
        }
    }
    return {
        getTalles,
        getTalleById,
        createTalle
    }
}