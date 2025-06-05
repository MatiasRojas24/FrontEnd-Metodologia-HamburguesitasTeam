import { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import styles from './ProductDetailsTable.module.css'
import type { IDetalleProducto } from '../../../types/IDetalleProducto'
import { useDetalleProducto } from '../../../hooks/useDetalleProducto'
import { detalleProductoStore } from '../../../store/detalleProductoStore'
import { ModalImagenes } from '../ModalImagenes/ModalImagenes'

interface IProductTableProp {
    openDropdownCrearTalle: boolean
    detallesDeProducto: IDetalleProducto[]
    setOpenModalCrearDetalleProducto: Dispatch<SetStateAction<boolean>>
}
export const ProductDetailsTable: FC<IProductTableProp> = ({ openDropdownCrearTalle, detallesDeProducto, setOpenModalCrearDetalleProducto }) => {
    const { setDetalleProductoActivo } = detalleProductoStore()
    const { deleteDetalleProducto, enableUnableDetalleProducto } = useDetalleProducto()
    const [openModalImagenes, setOpenModalImagenes] = useState(false)

    const handleEditDetalle = (detalleProducto: IDetalleProducto) => {
        setDetalleProductoActivo(detalleProducto)
        setOpenModalCrearDetalleProducto(true)
    }
    const handleDeleteDetalle = async (detalleProductoId: string) => {
        await deleteDetalleProducto(detalleProductoId)
    }
    const handleUnableEnable = async (detalleProducto: IDetalleProducto) => {
        await enableUnableDetalleProducto(detalleProducto.id!)
        console.log('cambiao')
    }
    const getColorClassForDescuento = (fechaInicioStr: string, fechaCierraStr: string): string => {
        const hoy = new Date()
        const inicio = new Date(fechaInicioStr)
        const cierre = new Date(fechaCierraStr)

        if (hoy < inicio) return styles.descuentoAmarillo
        if (hoy >= inicio && hoy <= cierre) return styles.descuentoVerde
        if (hoy > cierre) return styles.descuentoRojo
        return ''
    }
    const handleOpenImagenes = (detalleProducto: IDetalleProducto) => {
        setDetalleProductoActivo(detalleProducto)
        setOpenModalImagenes(true)
    }
    return (
        <table className={styles.tabla}>
            <thead className={openDropdownCrearTalle ? styles.tablaHeaderHidden : styles.tablaHeader}>
                <tr>
                    <th>Talle</th>
                    <th>Stock</th>
                    <th>Color</th>
                    <th>Precio venta</th>
                    <th>Precio compra</th>
                    <th>Descuento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={styles.tablaBody}>
                {detallesDeProducto.map((dp, i) => (
                    <tr key={dp.id}>
                        <td>{dp.talle.talle}</td>
                        <td>{dp.stock}</td>
                        <td>{dp.color}</td>
                        <td>$ {dp.precioVenta}</td>
                        <td>$ {dp.precioCompra}</td>
                        <td className={dp.descuento ? getColorClassForDescuento(dp.descuento.fechaInicio, dp.descuento.fechaCierra) : ''}>
                            {dp.descuento ? dp.descuento.descuento + '%' : 'No tiene descuento'}
                        </td>
                        <td>{dp.habilitado ? 'Habilitado' : 'Inhabilitado'}</td>
                        <td>
                            <div className={styles.tdAcciones}>
                                <i className="bi bi-images" onClick={() => handleOpenImagenes(dp)}></i>
                                <i className="bi bi-pencil-square" onClick={() => handleEditDetalle(dp)}></i>
                                {dp.habilitado ? (<i className="bi bi-toggle-on" onClick={() => handleUnableEnable(dp)}></i>) : (<i className="bi bi-toggle-off" onClick={() => handleUnableEnable(dp)}></i>)}
                                <i className="bi bi-trash" onClick={() => handleDeleteDetalle(dp.id!)}></i>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            {openModalImagenes && <ModalImagenes setOpenModalImagenes={setOpenModalImagenes} />}
        </table>
    )
}
