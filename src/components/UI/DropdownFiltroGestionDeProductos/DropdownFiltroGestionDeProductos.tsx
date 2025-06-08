import { useEffect, type ChangeEvent, type FC } from 'react'
import styles from './DropdownFiltroGestionDeProductos.module.css'
import type { IFiltroProducto } from '../../../types/IFiltroProducto';
import { useCatalogo } from '../../../hooks/useCatalogo';
import { catalogoStore } from '../../../store/catalogoStore';

type IDropdownFiltroGestionDeProductos = {
    filtros: IFiltroProducto;
    setFiltros: (filtros: IFiltroProducto) => void;
}
export const DropdownFiltroGestionDeProductos: FC<IDropdownFiltroGestionDeProductos> = ({ filtros, setFiltros }) => {
    const { getCatalogos } = useCatalogo()
    const catalogos = catalogoStore((state) => state.catalogos)
    useEffect(() => {
        getCatalogos()
    }, [])
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedFilter = {
            ...filtros,
            [name]:
                value === 'null'
                    ? null
                    : (name === 'tipoProducto' || name === 'sexo' ? value.toUpperCase() : value),
        };
        setFiltros(updatedFilter);
    };
    return (
        <div className={styles.containerDropdownFiltro}>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='nombre'>
                    Nombre
                </label>
                <input type='text' autoComplete='off' name='nombre' value={filtros.nombre} onChange={handleChange} />
            </div>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='idCatalogo'>
                    Categoría
                </label>
                <select name='idCatalogo' value={filtros.idCatalogo ?? 'null'} onChange={handleChange}>
                    <option value="null">Todas</option>
                    {catalogos.map((catalogo) => (
                        <option key={catalogo.id} value={catalogo.id}>{catalogo.nombre}</option>
                    ))}
                </select>
            </div>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='tipoProducto'>
                    Tipo de Producto
                </label>
                <select name='tipoProducto' value={filtros.tipoProducto ?? 'null'} onChange={handleChange}>
                    <option value="null">Todos</option>
                    <option value="REMERA">Remera</option>
                    <option value="PANTALON">Pantalón</option>
                    <option value="ZAPATILLA">Zapatillas</option>
                    <option value="CAMPERA">Campera</option>
                </select>
            </div>
            <div className={styles.inputFiltroContainer}>
                <label htmlFor='sexo'>
                    Sexo
                </label>
                <select name='sexo' value={filtros.sexo ?? 'null'} onChange={handleChange}>
                    <option value="null">Todos</option>
                    <option value="HOMBRE">Hombre</option>
                    <option value="MUJER">Mujer</option>
                    <option value="UNISEX">Unisex</option>
                </select>
            </div>
        </div>
    )
}
