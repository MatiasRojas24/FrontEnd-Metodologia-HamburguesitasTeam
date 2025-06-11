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
      nombre: usuarioActivo?.nombre ? usuarioActivo.nombre : "",
      email: usuarioActivo?.email ? usuarioActivo.email : "",
      username: usuarioActivo?.username ? usuarioActivo.username : "",
      password: usuarioActivo?.password ? usuarioActivo.password : "",
      dni: usuarioActivo?.dni ? usuarioActivo.dni : "",
      direcciones: usuarioActivo?.direcciones ? usuarioActivo.direcciones : [],
      rol: usuarioActivo?.rol ? usuarioActivo.rol : "ADMIN"
    },
    enableReinitialize: true, // "enableReinitializable" es para reusar el formulario con nuevos datos
    validationSchema: Yup.object({
      nombre: Yup.string().required("Requerido"),
      email: Yup.string().required("Requerido"),
      username: Yup.string().required("Requerido"),
      password: Yup.string().required("Requerido"),
      dni: Yup.string().required("Requerido"),
      direcciones: Yup.array(),
      rol: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      if (usuarioActivo) {
        setSubmitting(true)

        const success = await updateUsuario(values)
        if (success) {
          setIsModal(false)
          if (setUsuarioActivo) setUsuarioActivo(null)
        } else {
          alert("No se lograron enviar los datos, corrigelos o intentalo mas tarde")
          setSubmitting(false)
        }
      } else {
        setSubmitting(true)
        const success = await registerUsuarioAdmin(values)
        if (success) {
          setIsModal(false)
        } else {
          alert("No se lograron enviar los datos, corrigelos o intentalo mas tarde")
          setSubmitting(false)
        }
      }
    }
  })

  console.log("Usuario activo desde el modal: ", usuarioActivo)

  return (
    <form className={styles.modalOverlay} onSubmit={formik.handleSubmit}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>{usuarioActivo ? usuarioActivo.rol === "CLIENTE" ? "MODIFICAR USUARIO" : "EDITAR ADMINISTRADOR" : "AGREGAR ADMINISTRADOR"}</h2>
        <section className={styles.modalBody}>
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
            <p>Usuario</p>
            <input type="text" name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </div>
          <div className={styles.item}>
            <p>Email</p>
            <input type="email" name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {!usuarioActivo && 
            <div className={styles.item}>
              <p>Contraseña</p>
              <input type="password" name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password || ""}
              />
            </div>
          }
        </section>
        <section className={styles.buttonsContainer}>
          <button className={styles.cancelButton} disabled={formik.isSubmitting} onClick={handleCloseModal}>Cancelar</button>
          <button className={styles.acceptButton} disabled={formik.isSubmitting} type="submit" >Aceptar</button>
        </section>
      </div>
    </form>
  )
}
