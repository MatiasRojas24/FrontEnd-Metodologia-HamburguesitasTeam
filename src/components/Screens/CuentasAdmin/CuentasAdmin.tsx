import { useEffect, useState } from 'react'
import styles from './CuentasAdmin.module.css'
import { ModalAddAdministrador } from '../../UI/ModalAddAdministrador/ModalAddAdministrador'
import { useUsuario } from '../../../hooks/useUsuario'
import { usuarioStore } from '../../../store/usuarioStore'
import Swal from 'sweetalert2'
import type { IUsuario } from '../../../types/IUsuario'

export const CuentasAdmin = () => {
  // Estados locales
  const [isModal, setIsModal] = useState(false)


  // STORE
  const usuariosAdmin = usuarioStore((state) => state.usuarios).filter((usuario) => usuario.rol === "ADMIN")
  const setUsuarioActivo = usuarioStore((state) => state.setUsuarioActivo)
  const usuarioActivo = usuarioStore((state) => state.usuarioActivo)


  // HOOKS
  const { getUsuarios, deleteUsuario } = useUsuario()

  useEffect(() => {
    getUsuarios()
  }, [])


  // Metodos de accion
  const handleOpenModal = () => {
    setIsModal(true)
  }

  // Abrir modal editar usuario
  const handleOpenEdit = (usuarioActivo: IUsuario) => {
    setUsuarioActivo(usuarioActivo)
    setIsModal(true)
  }

  // Eliminar un usuario
  const handleDelete = (usuarioActivo: IUsuario) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Si eliminas esta cuenta no podrás recuperarla.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (usuarioActivo.id) {
          deleteUsuario(usuarioActivo.id)
        } else {
          Swal.fire("Error", "Hay un error con el ID del usuario y no puedo eliminarse", "error")
        }
      } else {
        console.log("Cancelado");
      }
    });
  }

  return (
    <div className={styles.pageContainer}>
        <div className={styles.accounts}>
          <h2>ADMINISTRADORES</h2>
          <div className={styles.accountCardsContainer}>
            {usuariosAdmin.map((usuario) =>
              <div key={usuario.id} className={styles.accountCard}>
                <div className={styles.cardInfo}>
                  <div>
                    <h3>Administrador:</h3>
                    <p>{usuario.nombre}</p>
                  </div>
                  <div>
                    <h3>Email:</h3>
                    <p>{usuario.email}</p>
                  </div>
                </div>
                <div className={styles.butonsContainer}>
                  <i className="bi bi-pencil-square" onClick={() => handleOpenEdit(usuario)}></i>
                  <i className="bi bi-trash" onClick={() => handleDelete(usuario)}></i>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.addAccountContainer}>
            <button onClick={handleOpenModal}>Agregar administrador</button>
        </div>

        {isModal && <ModalAddAdministrador setIsModal={setIsModal} setUsuarioActivo={setUsuarioActivo} usuarioActivo={usuarioActivo}/>}
    </div>
  )
}