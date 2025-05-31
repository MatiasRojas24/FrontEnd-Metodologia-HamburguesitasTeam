import React, { useEffect, type Dispatch, type FC, type SetStateAction } from 'react'
import { usuarioStore } from '../../../store/usuarioStore';
import styles from './CarritoModal.module.css'
import { navigateTo } from '../../../routes/navigation';

interface ICarritoModalProp {
    setOpenCarritoModal: Dispatch<SetStateAction<boolean>>;
}
export const CarritoModal: FC<ICarritoModalProp> = ({ setOpenCarritoModal }) => {
    const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)

    const handleNavigateToCarrito = () => {
        navigateTo("/gestion-de-productos")
    }
    useEffect(() => {
        if (!usuarioLogeado) {
            setOpenCarritoModal(false);
        }
    }, [usuarioLogeado]);

    if (!usuarioLogeado) return null;

    return (
        <div className={styles.carritoModalContainer}>
            <h3>hola</h3>
        </div>
    )
}
