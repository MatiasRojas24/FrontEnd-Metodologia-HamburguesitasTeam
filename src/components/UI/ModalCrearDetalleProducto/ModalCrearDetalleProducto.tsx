import { useEffect, useState, type Dispatch, type FC, type SetStateAction } from 'react'
import styles from './ModalCrearDetalleProducto.module.css'
import { detalleProductoStore } from '../../../store/detalleProductoStore'
import { productoStore } from '../../../store/productoStore'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import type { IDetalleProducto } from '../../../types/IDetalleProducto'
import { useDescuento } from '../../../hooks/useDescuento'
import { useTalle } from '../../../hooks/useTalle'
import { useDetalleProducto } from '../../../hooks/useDetalleProducto'
import { descuentoStore } from '../../../store/descuentoStore'
import { talleStore } from '../../../store/talleStore'
interface IModalProp {
    setOpenModalCrearDetalleProducto: Dispatch<SetStateAction<boolean>>
}
export const ModalCrearDetalleProducto: FC<IModalProp> = ({ setOpenModalCrearDetalleProducto }) => {
    const [cargando, setCargando] = useState(false)
    const productoActivo = productoStore((state) => state.productoActivo)
    const detalleProductoActivo = detalleProductoStore((state) => state.detalleProductoActivo)
    const { setDetalleProductoActivo } = detalleProductoStore()
    const descuentos = descuentoStore((state) => state.descuentosHabilitados)
    const { getDescuentoById, getDescuentosHabilitados } = useDescuento()
    const talles = talleStore((state) => state.tallesFiltrados)
    const { getTalleById, getTallesFiltrados } = useTalle()
    const { createDetalleProducto, updateDetalleProducto } = useDetalleProducto()

    useEffect(() => {
        getTallesFiltrados(productoActivo!.tipoProducto!)
        getDescuentosHabilitados()
    }, [])
    const formik = useFormik({
        initialValues: detalleProductoActivo ? {
            id: detalleProductoActivo.id,
            stock: detalleProductoActivo.stock,
            color: detalleProductoActivo.color,
            precioCompra: detalleProductoActivo.precioCompra,
            precioVenta: detalleProductoActivo.precioVenta,
            talleId: detalleProductoActivo.talle.id,
            descuentoId: detalleProductoActivo.descuento ? detalleProductoActivo.descuento.id : ''
        } : {
            id: '',
            stock: 0,
            color: '',
            precioCompra: 0,
            precioVenta: 0,
            talleId: '',
            descuentoId: ''
        }, enableReinitialize: true,
        validationSchema: Yup.object({
            stock: Yup.number().required('Requerido'),
            color: Yup.string().required('Requerido').min(3, 'Mínimo 3 caracteres'),
            precioCompra: Yup.number().required('Requerido').moreThan(0, 'Debe ser mayor a 0'),
            precioVenta: Yup.number().required('Requerido').moreThan(0, 'Debe ser mayor a 0'),
            talleId: Yup.string().required('Requerido').notOneOf(['null'], "Requerido"),
        }),
        onSubmit: async (values) => {
            setCargando(true)

            const talleValues = await getTalleById(values.talleId!)
            let descuentoValues = null
            if (values.descuentoId && values.descuentoId.length > 0) {
                descuentoValues = await getDescuentoById(values.descuentoId)
            }
            const detalleProductoValues: IDetalleProducto = {
                id: detalleProductoActivo?.id ?? uuidv4(),
                stock: values.stock,
                color: values.color,
                precioCompra: values.precioCompra,
                precioVenta: values.precioVenta,
                talle: talleValues!,
                producto: productoActivo!,
                ...(descuentoValues && { descuento: descuentoValues })
            }
            const success = detalleProductoActivo
                ? await updateDetalleProducto(detalleProductoValues)
                : await createDetalleProducto(detalleProductoValues)

            setOpenModalCrearDetalleProducto(false)
            setDetalleProductoActivo(null)
            setCargando(false)
        }
    })
    return (
        <div className={styles.backgroundBlur}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h3>{detalleProductoActivo ? 'Editar' : 'Crear'} detalle</h3>
                </div>
                <div className={styles.modalBody}>
                    <form className={styles.containerForm} onSubmit={formik.handleSubmit}>
                        <div className={styles.inputsForm}>
                            <div className={styles.inputsFormRow}>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor='talleId'>Talle</label>
                                    <hr />
                                    <select name='talleId' value={formik.values.talleId} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                                        <option value='null'>. . .</option>
                                        {talles.map((talle) => (
                                            <option key={talle.id} value={talle.id}>{talle.talle}</option>
                                        ))}
                                    </select>
                                    {formik.touched.talleId && formik.errors.talleId && (
                                        <div className={styles.error}>{formik.errors.talleId}</div>
                                    )}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor='stock'>Stock</label>
                                    <hr />
                                    <input type='number' name='stock' value={formik.values.stock} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.stock && formik.errors.stock && (
                                        <div className={styles.error}>{formik.errors.stock}</div>
                                    )}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor='color'>Color</label>
                                    <hr />
                                    <input autoComplete='off' type='text' name='color' value={formik.values.color} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.color && formik.errors.color && (
                                        <div className={styles.error}>{formik.errors.color}</div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.inputsFormRow}>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor='precioCompra'>Precio de compra</label>
                                    <hr />
                                    <input type='number' name='precioCompra' value={formik.values.precioCompra} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.precioCompra && formik.errors.precioCompra && (
                                        <div className={styles.error}>{formik.errors.precioCompra}</div>
                                    )}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor='precioVenta'>Precio de venta</label>
                                    <hr />
                                    <input type='number' name='precioVenta' value={formik.values.precioVenta} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.touched.precioVenta && formik.errors.precioVenta && (
                                        <div className={styles.error}>{formik.errors.precioVenta}</div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.inputsFormRow}>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor='descuentoId'>Descuento</label>
                                    <hr />
                                    <select name='descuentoId' value={formik.values.descuentoId} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                                        <option value='null'>. . .</option>
                                        {descuentos.map((descuento) => (
                                            <option key={descuento.id} value={descuento.id}>{descuento.descuento}% - {descuento.fechaInicio} - {descuento.fechaCierra}</option>
                                        ))}
                                    </select>
                                    {formik.touched.descuentoId && formik.errors.descuentoId && (
                                        <div className={styles.error}>{formik.errors.descuentoId}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonsForm}>
                            <button className={styles.cancelButton} type='button' disabled={cargando} onClick={() => { setOpenModalCrearDetalleProducto(false); setDetalleProductoActivo(null) }} >Cancelar</button>
                            <button className={styles.confirmButton} type='submit' disabled={!(formik.isValid && formik.dirty) || cargando} >{detalleProductoActivo ? 'Editar' : 'Crear'} detalle</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
