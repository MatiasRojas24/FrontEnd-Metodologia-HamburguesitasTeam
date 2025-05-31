import { useShallow } from "zustand/shallow"
import { productoStore } from "../store/productoStore"
import type { IProducto } from "../types/IProducto"
import { createProductoHttp, deleteProductoHttp, filtrarPorNombreOSexoOTipoProductoOIdCatalogoHttp, getProductoByIdHttp, getProductosHabilitadosHttp, getProductosHttp, toggleHabilitadoHttp, updateProductoHttp } from "../http/productoHttp"
import Swal from "sweetalert2"
import type { IFiltroProducto } from "../types/IFiltroProducto"

export const useProducto = () => {
    const { setProductos, setProductosHabilitados, añadirProducto, eliminarProducto, actualizarProducto } = productoStore(useShallow((state) => ({
        setProductos: state.setProductos,
        setProductosHabilitados: state.setProductosHabilitados,
        añadirProducto: state.añadirProducto,
        eliminarProducto: state.eliminarProducto,
        actualizarProducto: state.actualizarProducto
    })))

    const getProductos = async (): Promise<void> => {
        try {
            const data = await getProductosHttp();
            if (data) {
                setProductos(data)
            }
        } catch (error) {
            console.error("Error en getProductos: ", error)
        }
    }

    const getProductosHabilitados = async (): Promise<void> => {
        try {
            const data = await getProductosHabilitadosHttp()
            if (data) {
                setProductosHabilitados(data)
            }
        } catch (error) {
            console.error("Error en getProductosHabilitados: ", error)
        }
    }

    const getProductoById = async (idProducto: string): Promise<IProducto | undefined> => {
        try {
            const data = await getProductoByIdHttp(idProducto)
            if (!data) throw new Error;
            return data;
        } catch (error) {
            console.error("Error en getProductoById: ", error)
        }
    }

    const createProducto = async (producto: IProducto): Promise<void> => {
        try {
            const data = await createProductoHttp(producto)
            if (data) {
                añadirProducto(data)
                Swal.fire("Éxito", "Producto creado correctamente", "success")
            }
        } catch (error) {
            console.error("Error en create producto: ", error)
            Swal.fire("Error", "No se pudo crear el producto", "error")
        }
    }

    const updateProducto = async (productoActualizado: IProducto): Promise<void> => {
        try {
            const data = await updateProductoHttp(productoActualizado)
            if (data) {
                actualizarProducto(productoActualizado)
                Swal.fire("Éxito", "Producto creado correctamente", "success")
            }
        } catch (error) {
            console.error("Error en updateProducto: ", error)
            Swal.fire("Error", "No se pudo actualizar el producto", "error")
        }
    }

    const enableUnableProducto = async (idProducto: string): Promise<void> => {
        try {
            const data = await toggleHabilitadoHttp(idProducto)
            if (data) {
                await getProductos()
                getProductosHabilitados()
            }
        } catch (error) {
            console.error("Error en enableUnableProducto: ", error)
        }
    }

    const deleteProducto = async (idProducto: string): Promise<void> => {
        try {
            const confirm = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción podría causar problemas. Recomendamos solo deshabilitar",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            })
            if (!confirm.isConfirmed) return

            const data = await deleteProductoHttp(idProducto)
            if (data) {
                eliminarProducto(idProducto)
                Swal.fire("Éxito", "producto eliminado correctamente", "success")
            }
        } catch (error) {
            console.error("Error en deleteProducto", error)
            Swal.fire("Error", "no se pudo eliminar el producto", "error")
        }
    }

    const filtrarProductos = async (filtros: IFiltroProducto): Promise<void> => {
        try {
            const data = await filtrarPorNombreOSexoOTipoProductoOIdCatalogoHttp(filtros)
            if (data) {
                setProductos(data)
            }
        } catch (error) {
            console.error("Error en filtrarProductos: ", error)
        }
    }
    return {
        getProductos,
        getProductosHabilitados,
        getProductoById,
        createProducto,
        updateProducto,
        enableUnableProducto,
        deleteProducto,
        filtrarProductos,
    }
}