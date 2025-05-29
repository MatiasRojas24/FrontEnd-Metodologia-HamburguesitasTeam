import { ProductDetailsTable } from '../../UI/ProductDetailsTable/ProductDetailsTable'
import styles from './GestionDetalleProducto.module.css'

export const GestionDetalleProducto = () => {
    return (
        <div className={styles.containerPage}>
            <div className={styles.containerHeader}>
                <h2 style={{ fontFamily: 'latoBold', position: 'fixed', fontSize: '30px' }}>Detalles - Giannis Freak 6</h2>
                <div className={styles.containerButtonHeader}>
                    <button className={styles.buttonVolver}>Volver a productos</button>
                </div>
                <hr />

            </div>
            <div className={styles.containerBody}>
                <div className={styles.containerButton}>
                    <button>Agregar detalle</button>
                </div>
                <div className={styles.containerTable}>
                    <ProductDetailsTable />
                </div>
            </div>
        </div >
    )
}
