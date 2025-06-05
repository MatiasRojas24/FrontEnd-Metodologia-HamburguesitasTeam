import { useEffect, useState } from 'react'
import styles from './CuentaUsuario.module.css'
import { DirectionCard } from '../../UI/DireccionCard/DirectionCard'
import { ModalDirection } from '../../UI/ModalDirection/ModalDirection'
import { direccionStore } from '../../../store/direccionStore'
import { useDireccion } from '../../../hooks/useDireccion'
import { usuarioStore } from '../../../store/usuarioStore'
import { ModalModificarUsuario } from '../../UI/ModalModificarUsuario/ModalModificarUsuario'

export const CuentaUsuario = () => {
  // Estados locales
  const [isVisible, setIsVisible] = useState(false)
  const [isModificarUsuario, setIsModificarUsuario] = useState(false) // Estado apra el modal "modificar usuario"
  const [isModalDirection, setIsModalDirection] = useState(false) // Estado para el modal "agregar/modificar direccion"


  // STORES
  const direccionActiva = direccionStore((state) => state.direccionActiva)
  const direcciones = direccionStore((state) => state.direcciones)
  const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)
  const usuarios = usuarioStore((state) => state.usuarios)


  // HOOKS
  const { getDireccionesByUsuarioId } = useDireccion() 

  useEffect(() => {
    if (usuarioLogeado && usuarioLogeado.id) {
        getDireccionesByUsuarioId(usuarioLogeado.id)
    } else {
        console.warn("Usuario logeado o su id son null")
    }
  }, [usuarioLogeado, usuarios])


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

  const handleOpenModificarUsuario = () => {
    setIsModificarUsuario(true)
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
                <h2>Nombre</h2>
                <h3>{usuarioLogeado ? usuarioLogeado.nombre : 'No hay nombre'}</h3>
            </section>
            <section className={styles.sectionContainer} >
                <h2>DNI</h2>
                <h3>{usuarioLogeado ? usuarioLogeado.dni : 'No hay DNI'}
                </h3>
            </section>
            <section className={styles.sectionContainer}>
                <h2 className={styles.h2Direcciones}>Direcciones <button><i className="bi bi-plus-square" onClick={() => setIsModalDirection(true)}></i></button></h2>
                <article className={styles.direcciones}>
                    {direcciones.map((direccion) => <DirectionCard key={direccion.id} setIsModal={setIsModalDirection} direccion={direccion}/>)}
                </article>
            </section>
        </main>

        <div className={styles.buttonContainer}>
            <button onClick={handleOpenModificarUsuario}>Modificar Datos</button>
        </div>

        {isModalDirection && <ModalDirection setIsModal={setIsModalDirection} direccionActiva={direccionActiva} usuarioLogeado={usuarioLogeado}/>}
        {isModificarUsuario && <ModalModificarUsuario usuarioLogeado={usuarioLogeado} setIsModificarUsuario={setIsModificarUsuario}/>}
    </div>
  )
}
