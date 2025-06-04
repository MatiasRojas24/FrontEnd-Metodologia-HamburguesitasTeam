import { useShallow } from "zustand/shallow"
import { detalleProductoStore } from "../store/detalleProductoStore"
import { getDetallesProductosHabilitadosHttp } from "../http/detalleProductoHttp";



export const useDetalleProducto = () => {
    const {setDetalleProductoHabilitado} = detalleProductoStore(useShallow((state)=> ({
        setDetalleProductoHabilitado: state.setDetalleProductoHabilitado
    })));

    const getDetalleProductoHabilitado = async(): Promise<void> => {
        try {
            const data = await getDetallesProductosHabilitadosHttp()
            if (data) {
                setDetalleProductoHabilitado(data)
            }
        } catch (error) {
            console.log("Error en detalleProductoHabilitado", error);   
        }
    };
    return {
        getDetalleProductoHabilitado,
    }
}   