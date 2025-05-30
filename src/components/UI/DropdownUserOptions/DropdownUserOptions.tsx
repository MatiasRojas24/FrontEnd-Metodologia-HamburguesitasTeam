import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import { usuarioStore } from '../../../store/usuarioStore';
import { useNavigate } from 'react-router-dom';
import styles from './DropdownUserOptions.module.css'

interface IDropdownProps {
    setOpenDropdownUserOptions: Dispatch<SetStateAction<boolean>>;
}
export const DropdownUserOptions: FC<IDropdownProps> = ({ setOpenDropdownUserOptions }) => {
    const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)
    const navigate = useNavigate()


    const handleNavigateToCuenta = () => {
        navigate("/cuenta-de-usuario")
    }
    return (
        <>
            {usuarioLogeado ? (
                <div className={styles.dropdownContainer}>
                    <p onClick={handleNavigateToCuenta}>
                        Cuenta
                    </p>
                </div>
            ) :
                <>
                    {setOpenDropdownUserOptions(false)}
                </>
            }
        </>
    )
}
