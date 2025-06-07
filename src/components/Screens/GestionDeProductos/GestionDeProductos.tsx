import { useEffect, useState } from 'react'
import { ProductsTable } from '../../UI/ProductsTable/ProductsTable'
import styles from './GestionDeProductos.module.css'
import { DropdownFiltroGestionDeProductos } from '../../UI/DropdownFiltroGestionDeProductos/DropdownFiltroGestionDeProductos'
import type { IFiltroProducto } from '../../../types/IFiltroProducto'
import { ModalCrearCategoria } from '../../UI/ModalCrearCategoria/ModalCrearCategoria'
import { ModalCrearProducto } from '../../UI/ModalCrearProducto/ModalCrearProducto'
import { productoStore } from '../../../store/productoStore'
import { useProducto } from '../../../hooks/useProducto'
import { PantallaCarga } from '../PantallaCarga/PantallaCarga'

const initialFilter: IFiltroProducto = {
    nombre: "",
    idCatalogo: "",
}
export const GestionDeProductos = () => {
    const [showFiltro, setShowFiltro] = useState(false)
    const [openModalCrearCategoria, setOpenModalCrearCategoria] = useState(false)
    const [openModalCrearProducto, setOpenModalCrearProducto] = useState(false)
    const [filtros, setFiltros] = useState<IFiltroProducto>(initialFilter)
    const [ cargandoProducto ,setCargandoProducto ] = useState<boolean>(true)

    const { setProductoActivo } = productoStore()
    const productos = productoStore((state) => state.productos)

    const { getProductos } = useProducto()

    useEffect(() => {
        setProductoActivo(null)
    }, [])

    const handleTraerProductos = async () => {
        setCargandoProducto(true)
        await getProductos()
        setCargandoProducto(false)
    }

    useEffect(() => {
        handleTraerProductos()
    }, [productos])

    if (cargandoProducto) return <PantallaCarga />

    return (
        <div className={styles.containerPage}>
            <div className={styles.containerHeader}>
                <h2 style={{ fontFamily: 'latoBold', position: 'fixed', fontSize: '30px' }}>Gestión de Productos</h2>
                <div className={styles.containerFilter}>
                    <button className={styles.agregarCategoria} onClick={() => { setOpenModalCrearCategoria(true); setShowFiltro(false) }}>Agregar categoria</button>
                    <button onClick={() => { setShowFiltro(!showFiltro); setOpenModalCrearCategoria(false) }} className={showFiltro ? styles.botonFiltroClicked : styles.botonFiltro}>Filtrar {showFiltro ? (<i className="bi bi-funnel-fill"></i>) : (<i className="bi bi-funnel"></i>)}</button>
                </div>
                <hr />
                {openModalCrearCategoria && <ModalCrearCategoria setOpenModalCrearCategoria={setOpenModalCrearCategoria} />}
                {showFiltro && <DropdownFiltroGestionDeProductos filtros={filtros} setFiltros={setFiltros} />}

            </div>
            <div className={styles.containerBody}>
                <div className={styles.containerButton}>
                    <button onClick={() => setOpenModalCrearProducto(true)}>Agregar Producto</button>
                </div>
                <div className={styles.containerTable}>
                    <ProductsTable showFiltro={showFiltro} openModalCrearCategoria={openModalCrearCategoria} products={productos} setOpenModalCrearProducto={setOpenModalCrearProducto} />
                </div>
            </div>
            {openModalCrearProducto && <ModalCrearProducto setOpenModalCrearProducto={setOpenModalCrearProducto} />}
        </div >
    )
}
