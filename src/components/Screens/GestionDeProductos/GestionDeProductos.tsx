import { useState } from 'react'
import { ProductsTable } from '../../UI/ProductsTable/ProductsTable'
import styles from './GestionDeProductos.module.css'
import { DropdownFiltroGestionDeProductos } from '../../UI/DropdownFiltroGestionDeProductos/DropdownFiltroGestionDeProductos'
import type { IProducto, Sexo, TipoProducto } from '../../../types/IProducto'
import { useNavigate } from 'react-router-dom'

type IFiltro = {
    nombre?: string;
    catalago?: string;
    tipoproducto?: TipoProducto;
    sexo?: Sexo;
}
const initialFilter: IFiltro = {
    nombre: "",
    catalago: "",
}
export const GestionDeProductos = () => {
    const [showFiltro, setShowFiltro] = useState(false)
    const [productos, setProductos] = useState<IProducto[]>([])
    const [filtros, setFiltros] = useState<IFiltro>(initialFilter)

    const navigate = useNavigate()
    return (
        <div className={styles.containerPage}>
            <div className={styles.containerHeader}>
                <h2 style={{ fontFamily: 'latoBold', position: 'fixed', fontSize: '30px' }}>Gestión de Productos</h2>
                <div className={styles.containerFilter}>
                    <button className={styles.agregarCategoria}>Agregar categoria</button>
                    <button onClick={() => { setShowFiltro(!showFiltro) }} className={showFiltro ? styles.botonFiltroClicked : styles.botonFiltro}>Filtrar {showFiltro ? (<i className="bi bi-funnel-fill"></i>) : (<i className="bi bi-funnel"></i>)}</button>
                </div>
                <hr />
                {showFiltro && (
                    <DropdownFiltroGestionDeProductos filtros={filtros} setFiltros={setFiltros} />
                )}

            </div>
            <div className={styles.containerBody}>
                <div className={styles.containerButton}>
                    <button>Agregar Producto</button>
                </div>
                <div className={styles.containerTable}>
                    <ProductsTable showFiltro={showFiltro} />
                </div>
            </div>
        </div >
    )
}
