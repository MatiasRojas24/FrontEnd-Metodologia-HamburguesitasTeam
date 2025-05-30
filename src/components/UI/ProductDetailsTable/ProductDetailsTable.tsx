
import styles from './ProductDetailsTable.module.css'

export const ProductDetailsTable = () => {
    return (
        <table className={styles.tabla}>
            <thead className={styles.tablaHeader}>
                <tr>
                    <th>Talle</th>
                    <th>Stock</th>
                    <th>Color</th>
                    <th>Precio venta</th>
                    <th>Precio compra</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={styles.tablaBody}>
                {Array.from({ length: 20 }).map((el, i) => (
                    <tr>
                        <td>40</td>
                        <td>10</td>
                        <td>rojo</td>
                        <td>$ 100.000</td>
                        <td>$ 90.000</td>
                        <td>Habilitado</td>
                        <td>
                            <div className={styles.tdAcciones}>
                                <i className="bi bi-images"></i>
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
