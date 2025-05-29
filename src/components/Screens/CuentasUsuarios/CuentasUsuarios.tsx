import { useEffect, useState } from 'react'
import styles from './CuentasUsuarios.module.css'
import { DirectionCard } from '../../UI/DireccionCard/DirectionCard'
import { ModalDirection } from '../../UI/ModalDirection/ModalDirection'
import { direccionStore } from '../../../store/direccionStore'
import { useDireccion } from '../../../hooks/useDireccion'
import { usuarioStore } from '../../../store/usuarioStore'

export const CuentasUsuarios = () => {
  // Estados locales
  const [isVisible, setIsVisible] = useState(false)
  const [isModalUsuario, setIsModalUsuario] = useState(false) // Estado apra el modal "modificar usuario"
  const [isModalDirection, setIsModalDirection] = useState(false) // Estado para el modal "agregar/modificar direccion"


  // STORES
  const direccionActiva = direccionStore((state) => state.direccionActiva)
  const direcciones = direccionStore((state) => state.direcciones)
  const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)


  // HOOKS
  const { getDirecciones } = useDireccion() 
  useEffect(() => {
    getDirecciones()
  }, [])


  // Funciones de accion
  const handleHidePassword = (password: string) => {
    const passLength = password.length
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


  return (
    <div className={styles.pageContainer}>
        <header className={styles.headerPage}>
            Cuenta
        </header>
        <main className={styles.bodyPage}>
            <section className={styles.sectionContainer}>
                <h2>Email</h2>
                <h3>{usuarioLogeado ? usuarioLogeado.email : "No hay email"}</h3>
            </section>
            <section className={styles.sectionContainer}>
                <h2>Contraseña</h2>
                {isVisible ?
                    <article>
                        <h3>{usuarioLogeado ? usuarioLogeado.password : 'No hay contraseña'}</h3>
                        <i className="bi bi-eye-slash" onClick={() => setIsVisible(false)}></i>
                    </article>
                :
                    <article>
                    <h3>{usuarioLogeado ? handleHidePassword(usuarioLogeado.password) : 'No hay contraseña'}</h3>
                    <i className="bi bi-eye" onClick={() => setIsVisible(true)}></i>
                    </article>
                }
            </section>
            <section className={styles.sectionContainer}>
                <h2>Nombre</h2>
                <h3>{usuarioLogeado ? usuarioLogeado.nombre : 'No hay nombre'}</h3>
            </section>
            <section className={styles.sectionContainer}>
                <h2>DNI</h2>
                <h3>{usuarioLogeado ? usuarioLogeado.dni : 'No hay DNI'}
                </h3>
            </section>
            <section className={styles.direccionesContainer}>
                <h2>Direcciones <button><i className="bi bi-plus-square" onClick={() => setIsModalDirection(true)}></i></button></h2>
                <article className={styles.direcciones}>
                    {direcciones.map((direccion) => <DirectionCard key={direccion.id} setIsModal={setIsModalDirection} direccion={direccion}/>)}
                </article>
            </section>
            <section className={styles.buttonContainer}>
                <button>Modificar Datos</button>
            </section>
        </main>

        {isModalDirection && <ModalDirection setIsModal={setIsModalDirection} direccionActiva={direccionActiva} usuarioLogeado={usuarioLogeado}/>}
    </div>
  )
}
