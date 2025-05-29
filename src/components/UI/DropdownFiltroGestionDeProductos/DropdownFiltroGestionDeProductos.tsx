import { type ChangeEvent, type FC } from 'react'
import styles from './DropdownFiltroGestionDeProductos.module.css'
import type { IProducto, Sexo, TipoProducto } from '../../../types/IProducto';

type IFiltro = {
    nombre?: string;
    catalago?: string;
    tipoproducto?: TipoProducto;
    sexo?: Sexo;
}
type IDropdownFiltroGestionDeProductos = {
    filtros: IFiltro;
    setFiltros: (filtros: IFiltro) => void;
}
export const DropdownFiltroGestionDeProductos: FC<IDropdownFiltroGestionDeProductos> = ({ filtros, setFiltros }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        const updatedFilter = {
            ...filtros,
            [name]: name === "tipoProducto" || name === "sexo" ? value.toUpperCase() : value,
        };
        setFiltros(updatedFilter)
    }
    return (
        <div className={styles.containerDropdownFiltro}>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='nombre'>
                    Nombre
                </label>
                <input type='text' autoComplete='off' name='nombre' value={filtros.nombre} onChange={handleChange} />
            </div>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='catalago'>
                    Categoría
                </label>
                <input type='text' autoComplete='off' name='catalago' value={filtros.catalago} onChange={handleChange} />
            </div>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='tipoProducto'>
                    Tipo de Producto
                </label>
                <input style={{ textTransform: 'uppercase' }} type='text' autoComplete='off' name='tipoProducto' value={filtros.tipoproducto} onChange={handleChange} />
            </div>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='sexo'>
                    Sexo
                </label>
                <input style={{ width: '150px', textTransform: 'uppercase' }} type='text' autoComplete='off' name='sexo' value={filtros.sexo} onChange={handleChange} />
            </div>
        </div>
    )
}
