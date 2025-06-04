import { useEffect, useState, type Dispatch, type FC, type SetStateAction } from 'react'
import styles from './ModalCrearProducto.module.css'
import { productoStore } from '../../../store/productoStore'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useProducto } from '../../../hooks/useProducto'
import { v4 as uuidv4 } from 'uuid';
import type { IProducto, Sexo, TipoProducto } from '../../../types/IProducto'
import type { ICatalogo } from '../../../types/ICatalogo'
import { useCatalogo } from '../../../hooks/useCatalogo'
import { catalogoStore } from '../../../store/catalogoStore'

interface IModalProp {
    setOpenModalCrearProducto: Dispatch<SetStateAction<boolean>>
}

export const ModalCrearProducto: FC<IModalProp> = ({ setOpenModalCrearProducto }) => {
    const { createProducto, updateProducto } = useProducto()
    const { getCatalogoById } = useCatalogo()
    const { setProductoActivo } = productoStore()
    const productoActivo = productoStore((state) => state.productoActivo)
    const [cargando, setCargando] = useState(false)
    const { getCatalogos } = useCatalogo()
    const catalogos = catalogoStore((state) => state.catalogos)
    useEffect(() => {
        getCatalogos()
    }, [])

    const initialValues = productoActivo ? {
        id: productoActivo.id,
        nombre: productoActivo.nombre,
        tipoProducto: productoActivo.tipoProducto.toUpperCase(),
        sexo: productoActivo.sexo.toUpperCase(),
        idCatalogo: productoActivo.catalogo.id!
    } : {
        id: "",
        nombre: "",
        tipoProducto: "null",
        sexo: "null",
        idCatalogo: "null"
    }
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            nombre: Yup.string().required('Requerido').min(5, 'Mínimo 5 caracteres'),
            tipoProducto: Yup.string().required('Requerido').notOneOf(['null'], "Requerido"),
            sexo: Yup.string().required('Requerido').notOneOf(['null'], "Requerido"),
            idCatalogo: Yup.string().required('Requerido').notOneOf(['null'], "Requerido")
        }),
        onSubmit: async (values) => {
            setCargando(true)

            const tipoP = values.tipoProducto.toUpperCase() as TipoProducto
            const sexoE = values.sexo.toUpperCase() as Sexo
            const catalogo: ICatalogo = (await getCatalogoById(values.idCatalogo))!

            const productValues: IProducto = {
                id: productoActivo?.id ?? uuidv4(), // si es edición, conserva el id
                nombre: values.nombre,
                tipoProducto: tipoP,
                sexo: sexoE,
                catalogo: catalogo,
            }

            const success = productoActivo
                ? await updateProducto(productValues)
                : await createProducto(productValues)

            setOpenModalCrearProducto(false)
            setProductoActivo(null)
            setCargando(false)
        }
    })
    return (
        <div className={styles.backgroundBlur}>
            <div className={styles.containerModal}>
                <h2>{productoActivo ? "Editar" : "Crear"} Producto</h2>
                <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                    <div className={styles.containerInputsForm}>
                        <div className={styles.containerColumn}>
                            <div className={styles.inputWrapper}>
                                <label htmlFor='nombre'>
                                    Nombre
                                </label>
                                <hr />
                                <input type='text' autoComplete='off' name='nombre' value={formik.values.nombre} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.touched.nombre && formik.errors.nombre && (
                                    <div className={styles.error}>{formik.errors.nombre}</div>
                                )}
                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor='tipoProducto'>
                                    Tipo de Producto
                                </label>
                                <hr />
                                <select name='tipoProducto' value={formik.values.tipoProducto} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                                    <option value="null">. . .</option>
                                    <option value="REMERA">Remera</option>
                                    <option value="PANTALON">Pantalón</option>
                                    <option value="ZAPATILLA">Zapatillas</option>
                                    <option value="CAMPERA">Campera</option>
                                </select>
                                {formik.touched.tipoProducto && formik.errors.tipoProducto && (
                                    <div className={styles.error}>{formik.errors.tipoProducto}</div>
                                )}
                            </div>
                        </div>
                        <div className={styles.containerColumn}>
                            <div className={styles.inputWrapper}>
                                <label htmlFor='catalogo'>
                                    Categoría
                                </label>
                                <hr />
                                <select name='idCatalogo' value={formik.values.idCatalogo} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                                    <option value="null">. . .</option>
                                    {catalogos.map((catalogo) => (
                                        <option key={catalogo.id} value={catalogo.id}>{catalogo.nombre}</option>
                                    ))}
                                </select>
                                {formik.touched.idCatalogo && formik.errors.idCatalogo && (
                                    <div className={styles.error}>{formik.errors.idCatalogo}</div>
                                )}
                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor='sexo'>
                                    Sexo
                                </label>
                                <hr />
                                <select name='sexo' value={formik.values.sexo} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                                    <option value="null">. . .</option>
                                    <option value="HOMBRE">Hombre</option>
                                    <option value="MUJER">Mujer</option>
                                    <option value="UNISEX">Unisex</option>
                                </select>
                                {formik.touched.sexo && formik.errors.sexo && (
                                    <div className={styles.error}>{formik.errors.sexo}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.containerButtons}>
                        <button
                            type="submit"
                            className={styles.confirmButton}
                            disabled={!(formik.isValid && formik.dirty) || cargando}
                        >{productoActivo ? "Editar" : "Crear"} producto</button>
                        <button type='button' disabled={cargando} className={styles.cancelButton} onClick={() => { setOpenModalCrearProducto(false); setProductoActivo(null) }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
