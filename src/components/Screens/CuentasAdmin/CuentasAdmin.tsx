import { useState } from 'react'
import styles from './CuentasAdmin.module.css'
import { ModalAddAdministrador } from '../../UI/ModalAddAdministrador/ModalAddAdministrador'

export const CuentasAdmin = () => {
  const [isModal, setIsModal] = useState(false)

  const handleOpenModal = () => {
    setIsModal(true)
  }
  console.log(isModal)

  return (
    <div className={styles.pageContainer}>
        <div className={styles.accounts}>
          <h2>ADMINISTRADORES</h2>
          <div className={styles.accountCardsContainer}>
            <div className={styles.accountCard}>
              <div className={styles.cardInfo}>
                <div>
                  <h3>Administrador:</h3>
                  <p>marquitosjvscript</p>
                </div>
                <div>
                  <h3>Email:</h3>
                  <p>marquitosjvscript@gmail.com</p>
                </div>
              </div>
              <div className={styles.butonsContainer}>
                <i className="bi bi-trash"></i>
                <i className="bi bi-pencil-square"></i>
              </div>
            </div>
            <div className={styles.accountCard}></div>
            <div className={styles.accountCard}></div>
            <div className={styles.accountCard}></div>
            <div className={styles.accountCard}></div>
            <div className={styles.accountCard}></div>
            <div className={styles.accountCard}></div>
            <div className={styles.accountCard}></div>
          </div>
        </div>

        <div className={styles.addAccountContainer}>
            <button onClick={handleOpenModal}>Agregar administrador</button>
        </div>

        {isModal && <ModalAddAdministrador/>}
    </div>
  )
}