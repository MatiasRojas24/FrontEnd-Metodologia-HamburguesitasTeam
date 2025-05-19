import { useState } from 'react'
import styles from './CuentaUser.module.css'
import { DirectionCard } from '../../UI/DireccionCard/DirectionCard'

export const CuentaUser = () => {
  // Estados
  const [isVisible, setIsVisible] = useState(false)

  // Funciones de accion
  const handleHidePassword = (password: number) => {
    const passLength = password.toString().length
    let hidePassword = ''

    for (let i=0; i < passLength; i++) {
        if (i === passLength) {
            hidePassword = hidePassword + '*'
        } else {
            hidePassword = hidePassword + '* '
        }
    }

    return hidePassword
  }

  // Variables
  const passwordVisible = 1981736163
  const passwordNotVisible = handleHidePassword(passwordVisible)

  return (
    <div className={styles.pageContainer}>
        <header className={styles.headerPage}>
            Cuenta
        </header>
        <main className={styles.bodyPage}>
            <section className={styles.sectionContainer}>
                <h2>Email</h2>
                <h3>correo@gmail.com</h3>
            </section>
            <section className={styles.sectionContainer}>
                <h2>Contraseña</h2>
                <h3>{isVisible
                    ?
                    <> {passwordVisible}<i className="bi bi-eye-slash" onClick={() => setIsVisible(false)}></i> </>
                    :
                    <> {passwordNotVisible}<i className="bi bi-eye" onClick={() => setIsVisible(true)}></i> </>
                }</h3>
            </section>
            <section className={styles.sectionContainer}>
                <h2>Nombre</h2>
                <h3>Nombre Apellido</h3>
            </section>
            <section className={styles.sectionContainer}>
                <h2>DNI</h2>
                <h3>39126712</h3>
            </section>
            <section className={styles.direccionesContainer}>
                <h2>Direcciones</h2>
                <article className={styles.direcciones}>
                    <DirectionCard/>
                    <DirectionCard/>
                    <DirectionCard/>
                    <DirectionCard/>
                    <DirectionCard/>
                </article>
            </section>
            <button>Modificar Datos</button>
        </main>
    </div>
  )
}
