import { useShallow } from "zustand/shallow"
import { detalleProductoStore } from "../store/detalleProductoStore"
import { createDetalleProductoHttp, deleteDetalleProductoHttp, getDetalleProductoByIdHttp, getDetallesProductosByProductoIdHttp, getDetallesProductosHabilitadosHttp, toggleHabilitadoHttp, updateDetalleProductoHttp } from "../http/detalleProductoHttp"
import type { IDetalleProducto } from "../types/IDetalleProducto"
import { CustomSwal } from "../components/UI/CustomSwal/CustomSwal"

export const useDetalleProducto = () => {
    const { setDetallesDeProducto, setDetallesProductosHabilitados, añadirDetalleDeProducto, actualizarDetalleDeProducto, eliminarDetalleDeProducto } = detalleProductoStore(useShallow((state) => ({
        setDetallesDeProducto: state.setDetallesDeProducto,
        setDetallesProductosHabilitados: state.setDetallesProductosHabilitados,
        añadirDetalleDeProducto: state.añadirDetalleDeProducto,
        actualizarDetalleDeProducto: state.actualizarDetalleDeProducto,
        eliminarDetalleDeProducto: state.eliminarDetalleDeProducto
    })))

    const getDetallesDeProducto = async (productoId: string): Promise<void> => {
        try {
            const data = await getDetallesProductosByProductoIdHttp(productoId)
            if (data) {
                setDetallesDeProducto(data)
            }
        } catch (error) {
            console.error("Error en getDetallesDeProducto: ", error)
        }
    }

    const getDetallesProductosHabilitados = async (): Promise<void> => {
        try {
            const data = await getDetallesProductosHabilitadosHttp()
            if (data) {
                setDetallesProductosHabilitados(data)
            }
        } catch (error) {
            console.error("Error en getDetallesProductosHabilitados: ", error)
        }
    }

    const getDetalleProductoById = async (idDetalleProducto: string): Promise<IDetalleProducto | undefined> => {
        try {
            const data = await getDetalleProductoByIdHttp(idDetalleProducto)
            if (!data) throw new Error;
            return data
        } catch (error) {
            console.error("Error en getDetalleProductoById: ", error)
        }
    }

    const createDetalleProducto = async (detalleProducto: IDetalleProducto): Promise<boolean> => {
        try {
            const data = await createDetalleProductoHttp(detalleProducto)
            if (data) {
                añadirDetalleDeProducto(data)
                CustomSwal.fire("Éxito", "Detalle creado correctamente", "success")
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en createDetalleProducto: ', error)
            CustomSwal.fire('Error', 'No se pudo crear el detalle', 'error')
            return false;
        }
    }

    const updateDetalleProducto = async (detalleProductoActualizado: IDetalleProducto): Promise<void> => {
        try {
            const data = await updateDetalleProductoHttp(detalleProductoActualizado)
            if (data) {
                actualizarDetalleDeProducto(data)
                CustomSwal.fire('Éxito', 'Detalle actualizado correctamente', 'success')
            }
        } catch (error) {
            console.error('Error en updateDetalleProducto: ', error)
            CustomSwal.fire('Error', 'No se pudo actualizar el detalle', 'error')
        }
    }

    const enableUnableDetalleProducto = async (detalleProductoId: string): Promise<void> => {
        try {
            await toggleHabilitadoHttp(detalleProductoId)
        } catch (error) {
            console.error('Error en enableUnableDetalleProducto', error)
        }
    }

    const deleteDetalleProducto = async (detalleProductoId: string): Promise<void> => {
        try {
            const confirm = await CustomSwal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción podría causar problemas. Recomendamos solo deshabilitar",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            })
            if (!confirm.isConfirmed) return

            const data = await deleteDetalleProductoHttp(detalleProductoId)
            if (data) {
                eliminarDetalleDeProducto(detalleProductoId)
                CustomSwal.fire("Éxito", "Detalle eliminado correctamente", "success")
            }
        } catch (error) {
            console.error("Error en deleteProducto", error)
            CustomSwal.fire("Error", "No se pudo eliminar el detalle", "error")
        }
    }

    return {
        getDetallesDeProducto,
        getDetallesProductosHabilitados,
        getDetalleProductoById,
        createDetalleProducto,
        updateDetalleProducto,
        enableUnableDetalleProducto,
        deleteDetalleProducto
    }
}