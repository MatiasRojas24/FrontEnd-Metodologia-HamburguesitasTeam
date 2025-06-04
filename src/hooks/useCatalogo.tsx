import { useShallow } from "zustand/shallow";
import { catalogoStore } from "../store/catalogoStore";
import { createCatalogoHttp, getCatalogosByIdHttp, getCatalogosHabilitadosHttp } from "../http/catalogoHttp";
import type { ICatalogo } from "../types/ICatalogo";
import { CustomSwal } from "../components/UI/CustomSwal/CustomSwal";

export const useCatalogo = () => {
    const { setCatalogos, añadirCatalogo } = catalogoStore(useShallow((state) => ({
        setCatalogos: state.setCatalogos,
        añadirCatalogo: state.añadirCatalogo
    })))

    const getCatalogos = async (): Promise<void> => {
        try {
            const data = await getCatalogosHabilitadosHttp()
            if (data) {
                setCatalogos(data)
            }
        } catch (error) {
            console.error("Error en getCatalogos", error)
        }
    }

    const getCatalogoById = async (idCatalogo: string): Promise<ICatalogo | undefined> => {
        try {
            const data = await getCatalogosByIdHttp(idCatalogo)
            if (!data) throw new Error;
            return data
        } catch (error) {
            console.error("Error en getCatalogoById: ", error)
        }
    }

    const createCatalogo = async (catalogo: ICatalogo): Promise<boolean> => {
        try {
            const data = await createCatalogoHttp(catalogo)
            if (data) {
                añadirCatalogo(data)
                CustomSwal.fire("Éxito", "Categoría creada correctamente", "success")
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error en createCatalogo: ", error)
            CustomSwal.fire("Error", "Error al crear categoría", "error")
            return false;
        }
    }

    return {
        getCatalogos,
        getCatalogoById,
        createCatalogo
    }
}
