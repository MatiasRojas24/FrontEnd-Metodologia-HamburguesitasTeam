import React, { type FC } from 'react'
import styles from './ProductCardBroserPage.module.css'
import type { IDetalleProducto } from '../../../types/IDetalleProducto'
type IPropsProductBrowserPageCard = {
    detalleProductoHabilitado: IDetalleProducto
}
export const ProductCardBrowserPage: FC<IPropsProductBrowserPageCard> = ({detalleProductoHabilitado}) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardImage}>
                
            </div>

            <div className={styles.cardInfo}>
                <p>{detalleProductoHabilitado.producto.sexo}</p>
                <p>{detalleProductoHabilitado.producto.nombre}</p>
                
                
            </div>
        </div>
    )
}
