import { useState, type FC } from 'react'
import styles from './DireccionCard.module.css'
import type { IDireccion } from '../../../types/IDireccion'
import { direccionStore } from '../../../store/direccionStore'
import Swal from 'sweetalert2'
import { useDireccion } from '../../../hooks/useDireccion'
import { PantallaCargaAlternativa } from '../../Screens/PantallaCargaAlternativa/PantallaCargaAlternativa'

type IPropsDirectionCard = {
    setIsModal: (state: boolean) => void
    direccion: IDireccion | null
}

export const DirectionCard: FC<IPropsDirectionCard> = ({ setIsModal, direccion }) => {
    // Estados locales
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // STORE
    const setDireccionActiva = direccionStore((state) => state.setDireccionActiva)

    // HOOKS
    const { toggleEnableDireccion } = useDireccion()

    // METODOS DE ACCION
    const handleEditDireccion = (direccion: IDireccion | null) => {
        if (direccion) {
            setDireccionActiva(direccion)
            setIsModal(true)
        } else {
            alert("No hay una direccion para editar") // por si de alguna manera se llega a haber direccionActiva=null
        }
    }

    const handleDeleteDireccion = (idDireccion: string | undefined) => {
        if (idDireccion && idDireccion != undefined) {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Si eliminas esta dirección no podrás recuperarla.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setIsLoading(true)

                    if (idDireccion) {
                        const succes = await toggleEnableDireccion(idDireccion)

                        if (succes) {
                            console.log("Direccion cambiada con exito")
                        } else {
                            alert("No se pudo eliminar el usuario")
                        }
                    } else {
                        Swal.fire("Error", "Hay un error con el ID del usuario y no pudo eliminarse", "error")
                    }
                } else {
                    console.log("Cancelado");
                }

                setIsLoading(false)
                setDireccionActiva(null)
            });
        } else {
            console.log('No se pudo eliminar en "handleDeleteDireccion"')
        }
    }

    if (isLoading) return <PantallaCargaAlternativa /> 
    
    return (
        <div className={styles.direccionCard}>
            <div className={styles.infoContainer}>
                <h3>{direccion?.localidad}, {direccion?.departamento}</h3>
                <p>{direccion?.provincia}, {direccion?.pais}</p>
            </div>
            <div className={styles.iconsContainer}>
                <i className="bi bi-pencil-square" onClick={() => handleEditDireccion(direccion)} ></i>
                <i className="bi bi-trash" onClick={() => handleDeleteDireccion(direccion?.id)} ></i>
            </div>
        </div>
    )
}
