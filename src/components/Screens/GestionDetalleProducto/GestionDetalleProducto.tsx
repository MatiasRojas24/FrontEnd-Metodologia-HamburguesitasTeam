import { useEffect, useState } from 'react'
import { navigateTo } from '../../../routes/navigation'
import { productoStore } from '../../../store/productoStore'
import { ProductDetailsTable } from '../../UI/ProductDetailsTable/ProductDetailsTable'
import styles from './GestionDetalleProducto.module.css'
import { DropdownCrearTalle } from '../../UI/DropdownCrearTalle/DropdownCrearTalle'
import { useSearchParams } from 'react-router-dom'
import { useProducto } from '../../../hooks/useProducto'
import { ModalDescuentos } from '../../UI/ModalDescuentos/ModalDescuentos'
import { ModalCrearDetalleProducto } from '../../UI/ModalCrearDetalleProducto/ModalCrearDetalleProducto'
import { detalleProductoStore } from '../../../store/detalleProductoStore'
import { useDetalleProducto } from '../../../hooks/useDetalleProducto'

export const GestionDetalleProducto = () => {
    const { getProductoById } = useProducto()
    const [searchParams] = useSearchParams()
    const productoActivo = productoStore((state) => state.productoActivo)
    const { setProductoActivo } = productoStore()
    const [openDropdownCrearTalle, setOpenDropdownCrearTalle] = useState(false)
    const [openModalDescuentos, setOpenModalDescuentos] = useState(false)
    const [openModalCrearDetalleProducto, setOpenModalCrearDetalleProducto] = useState(false)

    const detallesDeProducto = detalleProductoStore((state) => state.detallesDeProducto)
    const { getDetallesDeProducto } = useDetalleProducto()

    const handleGoBackToProductos = () => {
        setProductoActivo(null)
        navigateTo('/gestion-de-productos')
    }

    const handlePersistActiveProduct = async () => {
        const urlProductId = searchParams.get("producto")
        const persistedProduct = await getProductoById(urlProductId!)
        if (persistedProduct) {
            setProductoActivo(persistedProduct!)
            getDetallesDeProducto(productoActivo!.id!)
        } else {
            navigateTo('/gestion-de-productos')
        }
    }
    useEffect(() => {
        handlePersistActiveProduct()
    }, [])
    useEffect(() => {
        getDetallesDeProducto(productoActivo?.id!)
    }, [detallesDeProducto])
    return (
        <div className={styles.containerPage}>
            <div className={styles.containerHeader}>
                <h2 style={{ fontFamily: 'latoBold', position: 'fixed', fontSize: '30px' }}>Detalles - {productoActivo?.nombre}</h2>
                <div className={styles.containerButtonHeader}>
                    <button className={styles.buttonVolver} onClick={handleGoBackToProductos}>Volver a productos</button>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <button className={styles.talleButton} onClick={() => { setOpenModalDescuentos(true) }}>Descuentos</button>
                        <button className={styles.talleButton} onClick={() => { setOpenDropdownCrearTalle(true) }}>Crear talle</button>
                    </div>
                    {openDropdownCrearTalle && <DropdownCrearTalle setOpenDropdownCrearTalle={setOpenDropdownCrearTalle} />}
                </div>
                <hr />

            </div>
            <div className={styles.containerBody}>
                <div className={styles.containerButton}>
                    <button onClick={() => setOpenModalCrearDetalleProducto(true)}>Agregar detalle</button>
                </div>
                <div className={styles.containerTable}>
                    <ProductDetailsTable openDropdownCrearTalle={openDropdownCrearTalle} detallesDeProducto={detallesDeProducto} setOpenModalCrearDetalleProducto={setOpenModalCrearDetalleProducto} />
                </div>
            </div>
            {openModalDescuentos && <ModalDescuentos setOpenModalDescuentos={setOpenModalDescuentos} />}
            {openModalCrearDetalleProducto && <ModalCrearDetalleProducto setOpenModalCrearDetalleProducto={setOpenModalCrearDetalleProducto} />}
        </div >
    )
}
