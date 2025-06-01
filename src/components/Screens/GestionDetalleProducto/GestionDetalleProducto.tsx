import { navigateTo } from '../../../routes/navigation'
import { productoStore } from '../../../store/productoStore'
import { ProductDetailsTable } from '../../UI/ProductDetailsTable/ProductDetailsTable'
import styles from './GestionDetalleProducto.module.css'

export const GestionDetalleProducto = () => {
    const productoActivo = productoStore((state) => state.productoActivo)
    const { setProductoActivo } = productoStore()
    const handleGoBackToProductos = () => {
        setProductoActivo(null)
        navigateTo('/gestion-de-productos')
    }
    return (
        <div className={styles.containerPage}>
            <div className={styles.containerHeader}>
                <h2 style={{ fontFamily: 'latoBold', position: 'fixed', fontSize: '30px' }}>Detalles - {productoActivo?.nombre}</h2>
                <div className={styles.containerButtonHeader}>
                    <button className={styles.buttonVolver} onClick={handleGoBackToProductos}>Volver a productos</button>
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
