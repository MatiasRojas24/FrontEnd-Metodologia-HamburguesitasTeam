import { useFormik } from 'formik'
import * as Yup from "yup"
import styles from './ModalModificarUsuario.module.css'
import type { FC } from 'react'
import type { IUsuario } from '../../../types/IUsuario'
import { useUsuario } from '../../../hooks/useUsuario'

type IPropsModalUsuario = {
    usuarioLogeado: IUsuario | null
    setIsModificarUsuario: (state: boolean) => void
}

export const ModalModificarUsuario: FC<IPropsModalUsuario> = ({ usuarioLogeado, setIsModificarUsuario }) => {

    // HOOKS
    const { updateUsuario, updateUsuarioLogeadoById } = useUsuario()

    // Metodos de accion
    const handleCloseModal = () => {
        setIsModificarUsuario(false)
    }

    const formik = useFormik({
        initialValues: {
            id: usuarioLogeado?.id ? usuarioLogeado.id : "",
            nombre: usuarioLogeado?.nombre ? usuarioLogeado.nombre : "",
            email: usuarioLogeado?.email ? usuarioLogeado.email : "",
            username: usuarioLogeado?.username ? usuarioLogeado.username : "",
            password: usuarioLogeado?.password ? usuarioLogeado.password: "" ,
            dni: usuarioLogeado?.dni ? usuarioLogeado.dni : "",
            rol: usuarioLogeado?.rol ? usuarioLogeado.rol : "CLIENTE"
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nombre: Yup.string().required("Requerido"),
            email: Yup.string().required("Requerido"),
            username: Yup.string().required("Requerido"),
            password: Yup.string(),
            dni: Yup.string().required("Requerido"),
            rol: Yup.string()
        }),
        onSubmit: async (values) => {
            if (usuarioLogeado) {
                console.log("Valores de initial values: ", values)
                const succes = await updateUsuario(values)

                if (succes) {
                    updateUsuarioLogeadoById(values.id)
                    setIsModificarUsuario(false)
                } else {
                    alert("Algo salio mal al actualizar, corrige los campos o intentalo mas tarde")
                }
            } else {
                console.log("non")
            }
        }
    })

    console.log("password: ", usuarioLogeado ? usuarioLogeado.password : "No hay usuario logeado")

    return (
        <div className={styles.formOverlay}>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                <div className={styles.headerForm}>
                    <h2>{usuarioLogeado ? "Modificar Usuario" : "Registrate"}</h2>
                </div>
                <div className={styles.bodyForm}>        
                    <div className={styles.item}>
                        <p>Nombre</p>
                        <input type="text" name="nombre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        />
                    </div>
                    <div className={styles.item}>
                        <p>DNI</p>
                        <input type="text" name="dni"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dni}
                        />
                    </div>
                    <div className={styles.item}>
                        <p>Email</p>
                        <input type="email"name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        />
                    </div>
                </div>
                <div className={styles.buttonsForm}>
                    <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                    <button className={styles.acceptButton} type='submit'>Aceptar</button>
                </div>
            </form>
        </div>
    )
}
