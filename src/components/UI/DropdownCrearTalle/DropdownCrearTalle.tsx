import { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import styles from './DropdownCrearTalle.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import LoaderGlobal from '../LoaderGlobal/LoaderGlobal';
import { v4 as uuidv4 } from 'uuid';
import { useTalle } from '../../../hooks/useTalle';

interface IDropdownProp {
    setOpenDropdownCrearTalle: Dispatch<SetStateAction<boolean>>
}
export const DropdownCrearTalle: FC<IDropdownProp> = ({ setOpenDropdownCrearTalle }) => {
    const [cargando, setCargando] = useState(false)
    const { createTalle } = useTalle()
    const formik = useFormik({
        initialValues: {
            id: "",
            talle: ""
        },
        validationSchema: Yup.object().shape({
            talle: Yup.string()
                .transform(value => {
                    // Normaliza: si es string, devuelve en mayúsculas
                    return typeof value === 'string' ? value.trim().toUpperCase() : value;
                })
                .required('El talle es obligatorio')
                .test(
                    'valid-talle',
                    '10-60 o XS-XXL',
                    value => {
                        if (!value) return false;

                        const allowedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

                        if (allowedSizes.includes(value)) return true;

                        const isNumeric = /^[0-9]+$/.test(value);
                        if (!isNumeric) return false;

                        const num = parseInt(value, 10);
                        return num >= 10 && num <= 60;
                    }
                )
        }),
        onSubmit: async (values) => {
            setCargando(true)
            values.id = uuidv4()
            const success = await createTalle(values)
            if (success) {
                setOpenDropdownCrearTalle(false)
                setCargando(false)
            }
            setCargando(false)
        }
    })
    return (
        <div className={styles.containerDropdown}>
            <div className={styles.containerExit}>
                <i className="bi bi-x" onClick={() => { setOpenDropdownCrearTalle(false) }}></i>
            </div>
            <form className={styles.containerForm} onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        name="talle"
                        placeholder='Ingrese el talle'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.talle}
                    />
                    {formik.touched.talle && formik.errors.talle && (
                        <div className={styles.error}>{formik.errors.talle}</div>
                    )}
                </div>
                <button
                    type='submit'
                    className={styles.formButton}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Crear talle
                </button>
            </form>
            {cargando && <LoaderGlobal />}
        </div>
    )
}
