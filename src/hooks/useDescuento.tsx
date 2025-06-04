import { useShallow } from "zustand/shallow"
import { descuentoStore } from "../store/descuentoStore"
import { createDescuentoHttp, deleteDescuentoHttp, getDescuentoByIdHttp, getDescuentosHttp, updateDescuentoHttp } from "../http/descuentoHttp"
import type { IDescuento } from "../types/IDescuento"
import { CustomSwal } from "../components/UI/CustomSwal/CustomSwal"
import { getDetallesProductosByDescuentoIdHttp } from "../http/detalleProductoHttp"

export const useDescuento = () => {
    const { setDescuentos, añadirDescuento, actualizarDescuento, eliminarDescuento } = descuentoStore(useShallow((state) => ({
        setDescuentos: state.setDescuentos,
        añadirDescuento: state.añadirDescuento,
        actualizarDescuento: state.actualizarDescuento,
        eliminarDescuento: state.eliminarDescuento
    })))

    const getDescuentos = async (): Promise<void> => {
        try {
            const data = await getDescuentosHttp()
            if (data) {
                setDescuentos(data)
            }
        } catch (error) {
            console.error('Error en getDescuentos', error)
        }
    }

    const getDescuentosById = async (idDescuento: string): Promise<IDescuento | undefined> => {
        try {
            const data = await getDescuentoByIdHttp(idDescuento)
            if (!data) throw new Error;
            return data;
        } catch (error) {
            console.error('Error en getDescuentoById: ', error)
        }
    }

    const createDescuento = async (descuento: IDescuento): Promise<boolean> => {
        try {
            const data = await createDescuentoHttp(descuento)
            if (data) {
                añadirDescuento(data)
                CustomSwal.fire('Éxito', 'Descuento creado correctamente', 'success')
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en createDescuento: ', error)
            CustomSwal.fire('Error', 'Error al crear descuento', 'error')
            return false;
        }
    }

    const updateDescuento = async (descuentoActualizado: IDescuento): Promise<void> => {
        try {
            const data = await updateDescuentoHttp(descuentoActualizado)
            if (data) {
                actualizarDescuento(data)
                CustomSwal.fire('Éxito', 'Descuento actualizado correctamente', 'error')
            }
        } catch (error) {
            console.error('Error en updateDescuento: ', error)
            CustomSwal.fire('Error', 'Error al actualizar descuento', 'error')
        }
    }

    const deleteDescuento = async (idDescuento: string): Promise<void> => {
        try {
            const confirm = await CustomSwal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción es irreversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar"
            })
            if (!confirm.isConfirmed) return

            const usedDescuento = await getDetallesProductosByDescuentoIdHttp(idDescuento)
            if (usedDescuento && usedDescuento.length > 0) {
                CustomSwal.fire('Error', 'Existen detalles con el descuento asignado', 'error')
                return;
            }
            const data = await deleteDescuentoHttp(idDescuento)
            if (data) {
                eliminarDescuento(data)
                CustomSwal.fire('Éxito', 'Descuento eliminado correctamente', 'success')
            }
        } catch (error) {
            console.error('Error en eliminarDescuento: ', error)
            CustomSwal.fire('Error', 'Error al eliminar el descuento', 'error')
        }
    }

    return {
        getDescuentos,
        getDescuentosById,
        createDescuento,
        updateDescuento,
        deleteDescuento
    }
}