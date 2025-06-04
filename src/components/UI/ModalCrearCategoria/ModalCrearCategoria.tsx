import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import styles from './ModalCrearCategoria.module.css'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useCatalogo } from '../../../hooks/useCatalogo';
import { v4 as uuidv4 } from 'uuid';

import LoaderGlobal from '../LoaderGlobal/LoaderGlobal';

interface IModalProp {
    setOpenModalCrearCategoria: Dispatch<SetStateAction<boolean>>;
}
export const ModalCrearCategoria: FC<IModalProp> = ({ setOpenModalCrearCategoria }) => {
    const { createCatalogo } = useCatalogo()
    const [cargando, setCargando] = useState(false)
    const formik = useFormik({
        initialValues: {
            id: "",
            nombre: ""
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Requerido").min(3, "Mínimo 4 caracteres").matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "Solo se permiten letras")
        }),
        onSubmit: async (values) => {
            setCargando(true)
            values.id = uuidv4()
            const success = await createCatalogo(values)
            if (success) {
                setOpenModalCrearCategoria(false)
                setCargando(false)
            }
        }
    })
    return (
        <div className={styles.containerModal}>
            <div className={styles.containerExit}>
                <i className="bi bi-x" onClick={() => { setOpenModalCrearCategoria(false) }}></i>
            </div>
            <form className={styles.containerForm} onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder='Nombre de la categoría'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                    />
                    {formik.touched.nombre && formik.errors.nombre && (
                        <div className={styles.error}>{formik.errors.nombre}</div>
                    )}
                </div>
                <button
                    type='submit'
                    className={styles.formButton}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Crear categoría
                </button>
            </form>
            {cargando && <LoaderGlobal />}
        </div>
    )
}
