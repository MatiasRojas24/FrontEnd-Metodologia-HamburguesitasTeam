import type { FC } from "react"
import styles from "./Login.module.css"

type IPropsLogin = {
    setIsLogin: (state: boolean) => void
}

export const Login: FC<IPropsLogin> = ({ setIsLogin }) => {

  // Metodos de accion
  const handleSignIn = async () => {
    
  }
  const handleCloseModal = () => {
    setIsLogin(false)
  }

  return (
    <form className={styles.modalOverlay} onSubmit={handleSignIn}>
        <div className={styles.containerLogin}>
            <div className={styles.iconContainer}>
                <i className="bi bi-person-circle"></i>
                <h2>Login</h2>
            </div>
            <div className={styles.inputsContainer}>
                <input type="text" placeholder="Correo Electronico" />
                <input type="text" placeholder="Contraseña" />
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button className={styles.acceptButton}>Acceder</button>
            </div>
            <p className={styles.registrate}>¿No tienes una cuenta? <p>Registrate</p></p>
        </div>
    </form>
  )
}
