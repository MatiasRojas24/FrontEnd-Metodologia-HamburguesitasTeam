import styles from './ModalAddAdministrador.module.css'

export const ModalAddAdministrador = () => {
  return (
    <form className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>AGREGAR ADMINISTRADOR</h2>
            <section className={styles.modalBody}>
                <p>Nombre<input type="text"/></p>
                <p>Email<input type="text"/></p>
                <p>Contraseña<input type="text" /></p>
            </section>
            <section className={styles.buttonsContainer}>
                <button className={styles.acceptButton}>Crear cuenta</button>
                <button className={styles.cancelButton}>Cancelar</button>
            </section>
        </div>
    </form>
  )
}
