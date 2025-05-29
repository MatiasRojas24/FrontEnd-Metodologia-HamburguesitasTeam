import { useFormik } from 'formik'
import styles from './ModalAddAdministrador.module.css'
import * as Yup from "yup"
import { useUsuario } from '../../../hooks/useUsuario'
import type { FC } from 'react'
import type { IUsuario } from '../../../types/IUsuario'

type IPropsModalAddAdmin = {
  setUsuarioActivo?: (usuarioActivo: IUsuario | null) => void
  usuarioActivo?: IUsuario | null
  setIsModal: (state: boolean) => void
}

export const ModalAddAdministrador: FC<IPropsModalAddAdmin> = ({ setIsModal, setUsuarioActivo, usuarioActivo }) => {
  // HOOKS
  const { registerUsuarioAdmin, updateUsuario } = useUsuario()


  // Metodos de accion
  const handleCloseModal = () => {
    setIsModal(false)
    if (setUsuarioActivo) setUsuarioActivo(null)
  }


  // Configuracion de formik
  const formik = useFormik({
    initialValues: {
      id: usuarioActivo?.id ? usuarioActivo.id : "",
      username: usuarioActivo?.username ? usuarioActivo.username : "",
      password: "",
      email: usuarioActivo?.email ? usuarioActivo.email : "",
      nombre: usuarioActivo?.nombre ? usuarioActivo.nombre : "",
      dni: usuarioActivo?.dni ? usuarioActivo.dni : "",
      rol: "ADMIN"
    },
    enableReinitialize: true, // "enableReinitializable" es para reusar el formulario con nuevos datos
    validationSchema: Yup.object({
      id: Yup.string(),
      username: Yup.string().required("Requerido"),
      password: usuarioActivo ? Yup.string() : Yup.string().required("Requerido"),
      email: Yup.string().email().required("Requerido"),
      nombre: Yup.string().required("Requerido"),
      dni: Yup.string().required("Requerido")
    }),
    onSubmit: async (values) => {
      const payload: Partial<typeof values> = { ...values }

      console.log('payload: ', payload)

      if (usuarioActivo) {
        if (!payload.password) {
          delete payload.password // eliminar campo si está vacío
        }
      
        const success = await updateUsuario({ id: usuarioActivo.id, ...payload } as IUsuario)

        if (success) {
          setIsModal(false)
          if (setUsuarioActivo) setUsuarioActivo(null)
        } else {
          alert("No se lograron enviar los datos, corrigelos o intentalo mas tarde")
        }

      } else {
        const success = await registerUsuarioAdmin(payload as IUsuario)
        if (success) {
          setIsModal(false)
        } else {
          alert("No se lograron enviar los datos, corrigelos o intentalo mas tarde")
        }
      }
    }
  })

  return (
    <form className={styles.modalOverlay} onSubmit={formik.handleSubmit}>
        <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>{usuarioActivo ? usuarioActivo.rol === "CLIENTE" ? "MODIFICAR USUARIO" : "EDITAR ADMINISTRADOR" : "AGREGAR ADMINISTRADOR" }</h2>
            <section className={styles.modalBody}>
                <p>Nombre <input
                  type="text"
                  name="nombre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                /></p>

                <p>DNI <input
                  type="text"
                  name="dni"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dni}
                /></p>

                <p>Usuario <input
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                 value={formik.values.username}
                /></p>

                <p>Email <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                /></p>

                <p>Contraseña <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                /></p>
            </section>
            <section className={styles.buttonsContainer}>
                <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className={styles.acceptButton}>Crear cuenta</button>
            </section>
        </div>
    </form>
  )
}
