import type { Dispatch, FC, SetStateAction } from 'react';
import { usuarioStore } from '../../../store/usuarioStore'
import styles from './DropdownAdminOptions.module.css'
import { useNavigate } from 'react-router-dom'
interface IDropdownProps {
    setOpenDropdownAdminOptions: Dispatch<SetStateAction<boolean>>;
}
export const DropdownAdminOptions: FC<IDropdownProps> = ({ setOpenDropdownAdminOptions }) => {
    const usuarioLogeado = usuarioStore((state) => state.usuarioLogeado)
    const navigate = useNavigate()

    const handleNavigateToProductos = () => {
        navigate("/gestion-de-productos")
    }
    const handleNavigateToCuentas = () => {
        navigate("/gestion-de-cuentas")
    }
    return (
        <>
            {usuarioLogeado ? (
                <div className={styles.dropdownContainer}>
                    <p onClick={handleNavigateToProductos}>
                        Gestion de productos
                    </p>
                    <hr />
                    <p onClick={handleNavigateToCuentas}>
                        Gestion de cuentas
                    </p>
                </div>
            ) :
                <>
                    {setOpenDropdownAdminOptions(false)}
                </>
            }
        </>
    )
}
