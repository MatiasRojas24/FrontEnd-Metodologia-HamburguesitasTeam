import { useEffect, type Dispatch, type FC, type SetStateAction } from 'react';
import { usuarioStore } from '../../../store/usuarioStore'
import styles from './DropdownAdminOptions.module.css'
import { navigateTo } from '../../../routes/navigation';
interface IDropdownProps {
    setOpenDropdownAdminOptions: Dispatch<SetStateAction<boolean>>;
}
export const DropdownAdminOptions: FC<IDropdownProps> = ({ setOpenDropdownAdminOptions }) => {
    const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)

    const handleNavigateToProductos = () => {
        navigateTo("/gestion-de-productos")
    }
    const handleNavigateToCuentas = () => {
        navigateTo("/gestion-de-cuentas")
    }
    useEffect(() => {
        if (!usuarioLogeado) {
            setOpenDropdownAdminOptions(false);
        }
    }, [usuarioLogeado]);

    if (!usuarioLogeado) return null;
    return (
        <div className={styles.dropdownContainer}>
            <p onClick={handleNavigateToProductos}>
                Gestion de productos
            </p>
            <hr />
            <p onClick={handleNavigateToCuentas}>
                Gestion de cuentas
            </p>
        </div>
    )
}
