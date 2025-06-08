import { useState, type FC } from 'react'
import styles from './ModalDeleteAccount.module.css'
import { useUsuario } from '../../../hooks/useUsuario'
import { useNavigate } from 'react-router-dom'
import { usuarioStore } from '../../../store/usuarioStore'
import { useDisableButton } from '../../../hooks/useDisableButton'

type IPropsModalDeleteAccount = {
    setIsDeleteAccount: (state: boolean) => void
    idUsuario: string | undefined
}

export const ModalDeleteAccount: FC<IPropsModalDeleteAccount> = ({ setIsDeleteAccount, idUsuario }) => {
    // Estados locales
    const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null)
    const [inputValue, setInputValue] = useState('') // Para almacenar el valor del input

    // Constante de matcheo
    const word = "delete"

    // STORES
    const setUsuarioLogeado = usuarioStore((state) => state.setUsuarioLogeado)

    // HOOKS
    const { deleteUsuario } = useUsuario()
    const navigate = useNavigate()
    const { isDisabled, setIsDisabled } = useDisableButton()
    

    // Metodos de accion
    const handleDeleteAccount = async (idUsuario: string) => {
        setIsDisabled(true)
        if (inputValue.toLowerCase() === word) {
            try {
                setIsConfirmed(true)
                const succes = await deleteUsuario(idUsuario)

                if (!succes) throw new Error

                localStorage.removeItem('token')
                localStorage.removeItem('usuarioLogeado')
                setUsuarioLogeado(null)
                setIsDeleteAccount(false)
                navigate("/home")
                
            } catch (error) {
                console.log("Error al intentar eliminar cuenta cliente: ", error)
                alert("Algo salio mal al eliminar el usuario, intentalo mas tarde")
            }
        } else {
            setIsConfirmed(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setIsConfirmed(null)
    }

    const handleAlert = () => {
        alert("El usuario que intentas eliminar no esta disponible")
    }

    const handleCloseModal = () => {
        setIsDeleteAccount(false)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContainer}>
                <div className={styles.headerModal}>
                    <h2>Eliminar Cuenta</h2>
                </div>
                <div className={styles.bodyContainer}>
                    <h3 style={isConfirmed === false ? ({ color: "var(--dark-red-2)" }) : {}}>Escribe la palabra "delete" para confirmar</h3>
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.cancelButton} disabled={isDisabled} onClick={handleCloseModal} >Cancelar</button>
                    <button className={styles.acceptButton} disabled={isDisabled} onClick={idUsuario ? () => handleDeleteAccount(idUsuario) : handleAlert} >Eliminar</button>
                </div>
            </div>
        </div>
    )
}
