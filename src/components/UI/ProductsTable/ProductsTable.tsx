import type { Dispatch, FC, SetStateAction } from 'react'
import type { IProducto } from '../../../types/IProducto'
import styles from './ProductsTable.module.css'
import { productoStore } from '../../../store/productoStore'
import { useProducto } from '../../../hooks/useProducto'
import { navigateTo } from '../../../routes/navigation'

type ProductsTableProp = {
    products: IProducto[]
    showFiltro: boolean
    openModalCrearCategoria: boolean
    setOpenModalCrearProducto: Dispatch<SetStateAction<boolean>>
}
export const ProductsTable: FC<ProductsTableProp> = ({ products, showFiltro, openModalCrearCategoria, setOpenModalCrearProducto }) => {
    const { setProductoActivo } = productoStore()
    const handleEditProducto = (producto: IProducto) => {
        setProductoActivo(producto)
        setOpenModalCrearProducto(true)
    }
    const { enableUnableProducto, deleteProducto } = useProducto()
    const handleUnableEnable = async (producto: IProducto) => {
        await enableUnableProducto(producto.id!)
    }
    const handleDeleteProducto = async (productoId: string) => {
        await deleteProducto(productoId)
    }
    const handleNavigateToDetalleProducto = (producto: IProducto) => {
        setProductoActivo(producto)
        navigateTo(`/gestion-de-productos/detalle?producto=${producto.id}`)
    }
    return (
        <table className={styles.tabla}>
            <thead className={showFiltro || openModalCrearCategoria ? styles.tablaHeaderHidden : styles.tablaHeader}>
                <tr>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Tipo</th>
                    <th>Sexo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={styles.tablaBody}>
                {products.map((p, index) => (

                    <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td>{p.catalogo.nombre}</td>
                        <td>{p.tipoProducto}</td>
                        <td>{p.sexo}</td>
                        <td>{p.habilitado ? 'Habilitado' : 'Deshabilitado'}</td>
                        <td>
                            <div className={styles.tdAcciones}>
                                <i className="bi bi-list-ul" onClick={() => handleNavigateToDetalleProducto(p)}></i>
                                {p.habilitado ? (<i className="bi bi-toggle-on" onClick={() => handleUnableEnable(p)}></i>) : (<i className="bi bi-toggle-off" onClick={() => handleUnableEnable(p)}></i>)}
                                <i className="bi bi-pencil-square" onClick={() => handleEditProducto(p)}></i>
                                <i className="bi bi-trash" onClick={() => handleDeleteProducto(p.id!)}></i>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}
