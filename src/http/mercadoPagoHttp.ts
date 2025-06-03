import axiosAuth from "./axios.config.ts";
import type { IOrdenCompraDetalle } from "../types/IOrdenCompraDetalle";


const apiUrlController = "/mp";

// POST: Enviar OrdenCompraDetalle y obtener el ID de preferencia de MercadoPago
export const postPedidoMercadoPago = async(
    ordenCompraDetalle : IOrdenCompraDetalle
): Promise<string | undefined> => {
    try {
        const response = await axiosAuth.post<string>(
            apiUrlController,
            ordenCompraDetalle
        );
        return response.data
    } catch (error) {
        console.log("Error al hacer pedido mercado pago", error)
    }
}
