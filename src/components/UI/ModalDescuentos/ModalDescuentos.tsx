import { useEffect, useState, type Dispatch, type FC, type SetStateAction } from 'react'
import styles from './ModalDescuentos.module.css'
import { useFormik } from 'formik'
import { descuentoStore } from '../../../store/descuentoStore'
import * as Yup from 'yup'
import { useDescuento } from '../../../hooks/useDescuento'
import { v4 as uuidv4 } from 'uuid'
import type { IDescuento } from '../../../types/IDescuento'

interface IModalProp {
    setOpenModalDescuentos: Dispatch<SetStateAction<boolean>>
}
export const ModalDescuentos: FC<IModalProp> = ({ setOpenModalDescuentos }) => {
    const descuentoActivo = descuentoStore((state) => state.descuentoActivo)
    const descuentos = descuentoStore((state) => state.descuentos)
    const { setDescuentoActivo } = descuentoStore()
    const { getDescuentos, createDescuento, updateDescuento, deleteDescuento, enableUnableDescuento } = useDescuento()
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        formik.resetForm()
    }, [descuentoActivo])
    useEffect(() => {
        getDescuentos()
    }, (descuentos))

    const handleDeleteDescuento = async (descuento: IDescuento) => {
        setCargando(true)
        await deleteDescuento(descuento.id!)
        setCargando(false)
    }
    const handleUnableEnable = async (descuento: IDescuento) => {
        await enableUnableDescuento(descuento.id!)
    }
    const formik = useFormik({
        initialValues: descuentoActivo ? {
            id: descuentoActivo.id,
            descuento: descuentoActivo.descuento,
            fechaInicio: descuentoActivo.fechaInicio,
            fechaCierra: descuentoActivo.fechaInicio
        } : {
            id: '',
            descuento: 0,
            fechaInicio: '',
            fechaCierra: ''
        }, enableReinitialize: true,
        validationSchema: Yup.object({
            descuento: Yup.number().required('Requerido').moreThan(0, 'Debe ser mayor a 0').max(100, 'Debe ser menor o igual a 100'),
            fechaInicio: Yup.string().required('Requerido'),
            fechaCierra: Yup.string().required('Requerido').test(
                'fechaCierreMayorIgual',
                'La fecha de cierre no puede ser anterior a la de inicio',
                function (value) {
                    const { fechaInicio } = this.parent;
                    if (!fechaInicio || !value) return true; // evitar validar si alguno está vacío
                    return new Date(value) >= new Date(fechaInicio);
                }
            )
        }),
        onSubmit: async (values) => {
            setCargando(true)
            values.id = descuentoActivo?.id ?? uuidv4()

            const success = descuentoActivo
                ? await updateDescuento(values)
                : await createDescuento(values)

            formik.resetForm()
            setDescuentoActivo(null)
            setCargando(false)
        }
    })
    return (
        <div className={styles.backgroundBlur} >
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>Descuentos</h2>
                    <i className="bi bi-x" onClick={() => { setOpenModalDescuentos(false) }}></i>
                    <hr />
                </div>
                <div className={styles.modalForm}>
                    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputWrapper}>
                                <label htmlFor='descuento'>Descuento</label>
                                <input type='number' autoComplete='off' name='descuento' value={formik.values.descuento} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.touched.descuento && formik.errors.descuento && (
                                    <div className={styles.error}>{formik.errors.descuento}</div>
                                )}
                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor='fechaInicio'>Fecha de Inicio</label>
                                <input type='date' autoComplete='off' name='fechaInicio' value={formik.values.fechaInicio} onBlur={formik.handleBlur} onChange={formik.handleChange}
                                    min={new Date().toISOString().split("T")[0]} />
                                {formik.touched.fechaInicio && formik.errors.fechaInicio && (
                                    <div className={styles.error}>{formik.errors.fechaInicio}</div>
                                )}
                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor='fechaCierra'>Fecha de Cierre</label>
                                <input type='date' autoComplete='off' name='fechaCierra' value={formik.values.fechaCierra} onBlur={formik.handleBlur} onChange={formik.handleChange}
                                    min={
                                        formik.values.fechaInicio || new Date().toISOString().split("T")[0]
                                    } />
                                {formik.touched.fechaCierra && formik.errors.fechaCierra && (
                                    <div className={styles.error}>{formik.errors.fechaCierra}</div>
                                )}
                            </div>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button type='submit' className={styles.confirmButton} disabled={!(formik.isValid && formik.dirty) || cargando} >{descuentoActivo ? 'Editar' : 'Crear'} descuento</button>
                            <button type='button' className={styles.cancelButton} disabled={cargando} onClick={() => { setDescuentoActivo(null); formik.resetForm() }}>Cancelar</button>
                        </div>
                    </form>
                    <hr />
                </div>
                <div className={styles.descuentosContainer}>
                    {descuentos.length > 0 ? (descuentos.map((descuento) => (
                        <div className={styles.tarjetaDescuento} key={descuento.id}>
                            <div className={styles.containerDatos}>
                                <p>Descuento: {descuento.descuento}%</p>
                                <p>Fecha de inicio: {descuento.fechaInicio}</p>
                                <p>Fecha de cierre: {descuento.fechaCierra}</p>
                            </div>
                            <div className={styles.containerAcciones}>
                                <i className="bi bi-pencil-square" onClick={() => setDescuentoActivo(descuento)}></i>
                                {descuento.habilitado ? (<i className="bi bi-toggle-on" onClick={() => handleUnableEnable(descuento)}></i>) : (<i className="bi bi-toggle-off" onClick={() => handleUnableEnable(descuento)}></i>)}
                                <i className="bi bi-trash" onClick={() => handleDeleteDescuento(descuento)}></i>
                            </div>
                        </div>
                    )))
                        :
                        (<h3>No hay descuentos</h3>)}
                </div>
            </div>
        </div >
    )
}
