import type { FC } from 'react'
import type { IProducto } from '../../../types/IProducto'
import styles from './ProductsTable.module.css'

type ProductsTableProp = {
    products: IProducto[]
    showFiltro: boolean
    openModalCrearCategoria: boolean
}
export const ProductsTable: FC<ProductsTableProp> = ({ products, showFiltro, openModalCrearCategoria }) => {
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
                {Array.from({ length: 20 }).map((el, i) => (
                    <tr>
                        <td>Giannis Freak 6</td>
                        <td>Deportes</td>
                        <td>Zapatilla</td>
                        <td>Unisex</td>
                        <td>Habilitado</td>
                        <td>
                            <div className={styles.tdAcciones}>
                                <i className="bi bi-list-ul"></i>
                                <i className="bi bi-toggle-on"></i>
                                <i className="bi bi-pencil-square"></i>
                                <i className="bi bi-trash"></i>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}
