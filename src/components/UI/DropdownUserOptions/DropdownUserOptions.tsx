import { useEffect, type Dispatch, type FC, type SetStateAction } from 'react'
import { usuarioStore } from '../../../store/usuarioStore';
import styles from './DropdownUserOptions.module.css'
import { navigateTo } from '../../../routes/navigation';

interface IDropdownProps {
    setOpenDropdownUserOptions: Dispatch<SetStateAction<boolean>>;
}
export const DropdownUserOptions: FC<IDropdownProps> = ({ setOpenDropdownUserOptions }) => {
    const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)


    const handleNavigateToCuenta = () => {
        navigateTo("/cuenta-de-usuario")
    }
    useEffect(() => {
        if (!usuarioLogeado) {
            setOpenDropdownUserOptions(false);
        }
    }, [usuarioLogeado]);

    if (!usuarioLogeado) return null;
    return (
        <div className={styles.dropdownContainer}>
            <p onClick={handleNavigateToCuenta}>
                Cuenta
            </p>
        </div>
    )
}
