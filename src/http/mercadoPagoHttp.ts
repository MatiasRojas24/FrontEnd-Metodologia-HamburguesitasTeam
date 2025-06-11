import axiosAuth from "./axios.config.ts";
import type { IOrdenCompraDetalle } from "../types/IOrdenCompraDetalle";


const apiUrlController = "/mp";


export const postPedidoMercadoPago = async(
    ordenCompraDetalle : IOrdenCompraDetalle
): Promise<string | undefined> => {
    try {
        const response = await axiosAuth.post<string>(
            apiUrlController,
            ordenCompraDetalle
        );
        return response.data
    } catch (error: any) {
        console.log("Error al hacer pedido mercado pago", error.response?.data || error.message);
        throw new Error(error.response?.data || "Fallo la solicitud a Mercado Pago");
}
}
