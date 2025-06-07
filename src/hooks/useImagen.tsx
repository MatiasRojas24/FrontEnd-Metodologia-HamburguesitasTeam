import { useShallow } from "zustand/shallow"
import { imagenStore } from "../store/imagenStore"
import { createImagenHttp, deleteImagenHttp, getImagenesByDetalleProductoIdHttp } from "../http/imagenHttp"
import type { IImagen } from "../types/IImagen"
import { CustomSwal } from "../components/UI/CustomSwal/CustomSwal"

export const useImagen = () => {
    const { setImagenesDetalle, añadirImagen, eliminarImagen } = imagenStore(useShallow((state) => ({
        setImagenesDetalle: state.setImagenesDetalle,
        añadirImagen: state.añadirImagen,
        eliminarImagen: state.eliminarImagen
    })))

    const getImagenesDetalle = async (idDetalleProducto: string): Promise<void> => {
        try {
            const data = await getImagenesByDetalleProductoIdHttp(idDetalleProducto)
            if (data) {
                setImagenesDetalle(data)
            }
        } catch (error) {
            console.error('Error en getImagenesDetalle', error)
        }
    }

    const createImagen = async (imagen: IImagen): Promise<boolean> => {
        try {
            const data = await createImagenHttp(imagen)
            if (data) {
                añadirImagen(data)
                CustomSwal.fire('Éxito', 'Imagen agregada correctamente', 'success')
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en createImagen: ', error)
            CustomSwal.fire('Error', 'Algo salió mal al agregar la imagen', 'error')
            return false;
        }
    }

    const deleteImagen = async (idImagen: string): Promise<void> => {
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

            const data = await deleteImagenHttp(idImagen)
            if (data) {
                eliminarImagen(idImagen)
                CustomSwal.fire('Éxito', 'Imagen eliminada correctamente', 'success')
            }
        } catch (error) {
            console.error('Error en deleteImagen: ', error)
            CustomSwal.fire('Error', 'No se pudo eliminar la imagen', 'error')
        }
    }
    return {
        getImagenesDetalle,
        createImagen,
        deleteImagen
    }
}