import React, { useEffect, useState, type FC } from 'react'
import styles from './ProductCardBroserPage.module.css'
import type { IDetalleProducto } from '../../../types/IDetalleProducto'
import { getImagenesByDetalleProductoIdHttp } from '../../../http/imagenHttp'
import type { IImagen } from '../../../types/IImagen'

type IPropsProductBrowserPageCard = {
    detalleProductoHabilitado: IDetalleProducto
}
export const ProductCardBrowserPage: FC<IPropsProductBrowserPageCard> = ({detalleProductoHabilitado}) => {
    
    const [imagenes, setImagenes] = useState<IImagen[]>([])

    useEffect(() => {
        const fetchImagenes = async () => {
            if (detalleProductoHabilitado?.id) {
                const data = await getImagenesByDetalleProductoIdHttp(detalleProductoHabilitado.id)
                if (data) {
                    setImagenes(data)
                }
            }
        }

        fetchImagenes()
    }, [detalleProductoHabilitado])
    
    
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardImage}>
                {imagenes.map((imagen) => (
                    <div key={imagen.id} className={styles.containerImg}>
                        <img 
                            className={styles.imgDetalle}
                            src={imagen.url}
                            alt='imagen detalle'
                            onClick={() => console.log(imagen)} 
                        />
                    </div>
                ))}
            </div>

            <div className={styles.cardInfo}>
                <p className={styles.letraSexo}>{detalleProductoHabilitado.producto.sexo}</p>
                <p className={styles.letraNombre}>{detalleProductoHabilitado.producto.nombre}</p>
                <p className={styles.letraPrecio}>${detalleProductoHabilitado.precioVenta}</p>
                
            </div>
        </div>
    )
}
