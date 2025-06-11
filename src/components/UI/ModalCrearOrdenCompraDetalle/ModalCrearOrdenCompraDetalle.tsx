import React, { useEffect, type FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { carritoStore } from '../../../store/carritoStore';
import { ordenCompraStore } from '../../../store/ordenCompraStore';
import { createOrdenCompraDetalleHttp } from '../../../http/ordenCompraDetalleController';
import styles from './ModalCrearOrdenCompraDetalle.module.css';
import Swal from 'sweetalert2';
type IPropsModalOrdenCompraDetalle = {
    isOpen: boolean;
    onClose: () => void;

};
export const ModalCrearOrdenCompraDetalle: FC<IPropsModalOrdenCompraDetalle> = ({isOpen, onClose}) => {
    const carrito = carritoStore((state) => state.carrito);
    const ordenCompra = ordenCompraStore((state) => state.ordenCompraActiva);
    const vaciarCarrito = carritoStore((state) => state.vaciarCarrito);

    const total = carrito.reduce((acc, prod) => acc + prod.precioVenta * prod.cantidad, 0);
    
    
    const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
        try {
            if (!ordenCompra) {
            throw new Error('No hay una orden de compra activa.');
            }

        for (const producto of carrito) {
            const ordenCompraDetalle = {
            id: uuidv4(),
            cantidad: producto.cantidad,
            subtotal: producto.precioVenta * producto.cantidad,
            detalleProducto: { id: producto.id },
            ordenCompra: { id: ordenCompra.id },
            habilitado: true,
            };

            await createOrdenCompraDetalleHttp(ordenCompraDetalle);
        }

        await Swal.fire({
            icon: 'success',
            title: 'Detalles agregados con éxito',
            confirmButtonText: 'Aceptar',
            timer: 2000,
        });

        vaciarCarrito();
        onClose();
        } catch (error) {
        console.error('Error al crear los detalles de la orden de compra:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo completar la acción',
        });
        }
    },
    });

    if (!isOpen) return null;

    return (
    <div className={styles.backgroundBlur}>
        <div className={styles.modalContainer}>
            <h3>Confirmar Pago</h3>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.productosResumen}>
                {carrito.map((producto) => (
                <div key={producto.id} className={styles.productoItem}>
                    <p><strong>{producto.producto.nombre}</strong></p>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio unitario: ${producto.precioVenta.toFixed(2)}</p>
                    <p>Subtotal: ${(producto.precioVenta * producto.cantidad).toFixed(2)}</p>
                    <hr />
                </div>
                ))}
            </div>
            <div className={styles.totalResumen}>
                <p>Total: ${total.toFixed(2)}</p>
            </div>
            <div className={styles.buttons}>
                <button type="submit" className={styles.botonConfirmar}>Confirmar y Pagar</button>
                <button type="button" className={styles.closeButton} onClick={onClose}>×</button>
            </div>
            </form>
        </div>
        </div>
    );
};

