import { useFormik } from 'formik'
import styles from './FormRegister.module.css'
import { formRegisterSchema } from './formRegister.schema'
import { useUsuario } from '../../../hooks/useUsuario'
import { navigateTo } from '../../../routes/navigation'
import { useState } from 'react'

export const FormRegister = () => {
    const { registerUsuarioCliente } = useUsuario()
    const [cargando, setCargando] = useState(false)

    const formik = useFormik({
        initialValues: {
            nombre: "",
            email: "",
            username: "",
            password: "",
            confirmPass: "",
            dni: "",
        }, validationSchema: formRegisterSchema,
        onSubmit: async (values) => {
            const success = await registerUsuarioCliente(values)
            if (success) {
                navigateTo("/home")
            } else {
                alert("Datos inválidos. Puede que el nombre de usuario ya esté en uso")
            }
        }
    })
    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.containerInputs}>
                <div className={styles.inputWrapper}>
                    <input type='text'
                        name='nombre'
                        placeholder='Nombre'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        autoComplete='off'
                    />
                    {formik.touched.nombre && formik.errors.nombre && (
                        <div className={styles.error}>{formik.errors.nombre}</div>
                    )}
                </div>
                <div className={styles.inputWrapper}>
                    <input type='email'
                        name='email'
                        placeholder='Correo'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.error}>{formik.errors.email}</div>
                    )}
                </div>
                <div className={styles.inputWrapper}>
                    <input type='text'
                        name='username'
                        placeholder='Nombre de usuario'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div className={styles.error}>{formik.errors.username}</div>
                    )}
                </div>
                <div className={styles.inputWrapper}>
                    <input type='password'
                        name='password'
                        placeholder='Contraseña'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className={styles.error}>{formik.errors.password}</div>
                    )}
                </div>
                <div className={styles.inputWrapper}>
                    <input type='password'
                        name='confirmPass'
                        autoComplete='off'
                        placeholder='Confirmar contraseña'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPass}
                    />
                    {formik.touched.confirmPass && formik.errors.confirmPass && (
                        <div className={styles.error}>{formik.errors.confirmPass}</div>
                    )}
                </div>
                <div className={styles.inputWrapper}>
                    <input type='text'
                        name='dni'
                        autoComplete='off'
                        placeholder='DNI'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dni}
                        maxLength={8}
                    />
                    {formik.touched.dni && formik.errors.dni && (
                        <div className={styles.error}>{formik.errors.dni}</div>
                    )}
                </div>
            </div>
            <div className={styles.containerButtons}>
                <button
                    type='submit'
                    className={styles.acceptButton}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Crear cuenta
                </button>
                <button className={styles.cancelButton} onClick={() => { navigateTo("/home") }}>
                    Cancelar
                </button>
            </div>
        </form>
    )
}
