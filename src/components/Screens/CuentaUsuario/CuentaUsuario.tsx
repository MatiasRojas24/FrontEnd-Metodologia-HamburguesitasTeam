import { useEffect, useState } from 'react'
import styles from './CuentaUsuario.module.css'
import { DirectionCard } from '../../UI/DireccionCard/DirectionCard'
import { ModalDirection } from '../../UI/ModalDirection/ModalDirection'
import { direccionStore } from '../../../store/direccionStore'
import { usuarioStore } from '../../../store/usuarioStore'
import { ModalModificarUsuario } from '../../UI/ModalModificarUsuario/ModalModificarUsuario'
import { useUsuario } from '../../../hooks/useUsuario'
import { PantallaCarga } from '../PantallaCarga/PantallaCarga'

export const CuentaUsuario = () => {
    // Estados locales
    const [isModificarUsuario, setIsModificarUsuario] = useState(false) // Estado apra el modal "modificar usuario"
    const [isModalDirection, setIsModalDirection] = useState<boolean>(false) // Estado para el modal "agregar/modificar direccion"
    const [cargandoUsuarios, setCargandoUsuarios] = useState<boolean>(false)

    // STORES
    const direccionActiva = direccionStore((state) => state.direccionActiva)
    const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)
    const direccionesUsuario = usuarioStore((state) => state.direccionesUsuario).filter((d) => d.habilitado === true)

    // HOOKS
    const { getDireccionesByUsuarioId } = useUsuario()

    const handleGetUsuarios = async () => {
        setCargandoUsuarios(true)
        if (usuarioLogeado && usuarioLogeado.id) {
            await getDireccionesByUsuarioId(usuarioLogeado.id)
        } else {
            console.warn("No se estan pudiendo obtener las direcciones de la usuario Store")
        }
        setCargandoUsuarios(false)
    }

    useEffect(() => {
        if (usuarioLogeado && usuarioLogeado.id) {
            handleGetUsuarios()
        } else {
            console.warn("Usuario logeado o su id son null")
        }
    }, [direccionesUsuario])


    // Mtodos de accion
    const handleOpenModificarUsuario = () => {
        setIsModificarUsuario(true)
    }

    if (cargandoUsuarios) return <PantallaCarga />;

    return (
        <>
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
                        <h3>{usuarioLogeado ? usuarioLogeado.dni : 'No hay DNI'}</h3>
                    </section>
                    <section className={styles.sectionContainer_B}>
                        <h2>Direcciones <i className="bi bi-plus-square" onClick={() => setIsModalDirection(true)}></i></h2>
                        <article className={styles.direcciones}>
                            {direccionesUsuario
                                ? direccionesUsuario.map((direccion) => <DirectionCard key={direccion.id} setIsModal={setIsModalDirection} direccion={direccion} />)
                                : "Esperando Direcciones"
                            }
                        </article>
                    </section>
                </main>

                <div className={styles.buttonContainer}>
                    <button onClick={handleOpenModificarUsuario}>Modificar Datos</button>
                </div>

                {isModalDirection && <ModalDirection setIsModal={setIsModalDirection} direccionActiva={direccionActiva} usuarioLogeado={usuarioLogeado} />}
                {isModificarUsuario && <ModalModificarUsuario usuarioLogeado={usuarioLogeado} setIsModificarUsuario={setIsModificarUsuario} />}
            </div>
        </>
    )
}

