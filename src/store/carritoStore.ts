import { create } from "zustand";
import type { IDetalleProducto } from "../types/IDetalleProducto";
import { persist } from "zustand/middleware";

interface ProductoCarrito extends IDetalleProducto{
    cantidad: number;
}

interface ICarritoStore {
    carrito: ProductoCarrito[];
    agregarProductoCarrito: (producto: IDetalleProducto) => void;
    eliminarProductoCarrito: (id:string) => void;
    actualizarCantidad: (id: string, cantidad: number) => void;
    vaciarCarrito: () => void;
}

export const carritoStore = create<ICarritoStore>()(
    persist(
        (set, get) => ({
    carrito: [],
    agregarProductoCarrito: (producto) => {
        if(!producto.id) return;
        console.log("Store: producto recibido:", producto); // 👈

        const carritoActual = get().carrito;
        const existente = carritoActual.find((p)=> p.id === producto.id)

        if (existente) {
            set({
                carrito: carritoActual.map((p) => 
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1} : p
                ),
            });
        } else {
            set({
                carrito: [...carritoActual , { ...producto, cantidad: 1}]
            })
        }
    },
    actualizarCantidad: (id, cantidad) => {
        set({
            carrito: get().carrito.map(p =>
                p.id === id ? { ...p, cantidad } : p
                ),
            });
        },
    eliminarProductoCarrito: (id) => {
        set({
            carrito: get().carrito.filter((p)=> p.id !== id),
        });
    },
    vaciarCarrito:() => {
        set({ carrito: []})
    }
}),
    {
        name: 'carrito-storage'
    }

    )
)