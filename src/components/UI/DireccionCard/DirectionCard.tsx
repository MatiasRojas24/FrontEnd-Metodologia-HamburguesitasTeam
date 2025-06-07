import { useState, type FC } from 'react'
import styles from './DireccionCard.module.css'
import type { IDireccion } from '../../../types/IDireccion'
import { direccionStore } from '../../../store/direccionStore'
import Swal from 'sweetalert2'
import { useDireccion } from '../../../hooks/useDireccion'
import { useDisableButton } from '../../../hooks/useDisableButton'

type IPropsDirectionCard = {
    setIsModal: (state: boolean) => void
    direccion: IDireccion | null
}

export const DirectionCard: FC<IPropsDirectionCard> = ({ setIsModal, direccion }) => {
    // STORE
    const setDireccionActiva = direccionStore((state) => state.setDireccionActiva)

    // HOOKS
    const { toggleEnableDireccion } = useDireccion()
    const { isDisabled, setIsDisabled } = useDisableButton()


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
        setIsDisabled(true)
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
            });
        } else {
            console.log('No se pudo eliminar en "handleDeleteDireccion"')
        }
        
        setIsDisabled(false)
        setDireccionActiva(null) // No se porque pero en una de las pruebas eliminando direcciones, despues de eliminar una quedo activa...
        //... y al querer crear una, se cargaron los datos en el modal de crear direccion, asi que cada que se elimine una direccion se settea la direccion activa en "null"
    }
    
    return (
        <div className={styles.direccionCard}>
            <div className={styles.infoContainer}>
                <h3>{direccion?.localidad}, {direccion?.departamento}</h3>
                <p>{direccion?.provincia}, {direccion?.pais}</p>
            </div>
            <div className={styles.iconsContainer}>
                <button onClick={() => handleEditDireccion(direccion)}><i className="bi bi-pencil-square"></i></button>
                <button disabled={isDisabled} onClick={() => handleDeleteDireccion(direccion?.id)}><i className="bi bi-trash"></i></button>
            </div>
        </div>
    )
}
