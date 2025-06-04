
import {  useEffect, useState } from 'react';

import styles from './BrowserPage.module.css';

import { productoStore } from '../../../store/productoStore';
import { useProducto } from '../../../hooks/useProducto';
import { detalleProductoStore } from '../../../store/detalleProductoStore';
import { useDetalleProducto } from '../../../hooks/useDetalleProducto';
import { ProductCardBrowserPage } from '../../UI/ProductCardBrowserPage/ProductCardBrowserPage';

export const BrowserPage = () => {
    
    const detalleProductoHabilitado = detalleProductoStore((state) => state.detalleProductoHabilitado)
    const { getDetalleProductoHabilitado} = useDetalleProducto()


    useEffect(()=> {
        getDetalleProductoHabilitado()
    }, [])

    const [activeTalle, setActiveTalle] = useState<number | null>(null);
    const handleChangeButton = (talle: number) => {
        setActiveTalle(prev => (prev === talle ? null : talle));
        };
    
    return (
        <div className={styles.pageContainer}>
            <div className={styles.encabezado}>
                <h1>Calzado Hombre</h1>
            </div>
            <div className={styles.contenidoFiltros}>
                    <div className={styles.filtros}>
                        <h3>Filtrar por</h3>
                        <h4>Genero</h4>
                        <div className={styles.inputsSexo}>
                            <label><input type="radio" name="genero" value="hombre" ></input>Hombre</label>
                            <br />    
                            <label><input type="radio" name="genero" value="mujer" ></input>Mujer</label> 
                            <br />
                            <label><input type="radio" name="genero" value="unisex" ></input>Unisex</label>    
                        </div>
                        
                        <h4>Precio</h4>
                        <div className={styles.containerSelect}>
                            <p>Precio mínimo</p>
                                <select>
                                    <option value="0">0</option>
                                    <option value="50000">50.000</option>
                                    <option value="100000">100.000</option>
                                    <option value="150000">150.000</option>
                                    <option value="200000">200.000</option>
                                    <option value="250000">250.000</option>
                                    <option value="300000">300.000</option>
                                    <option value="350000">350.000</option>
                                    <option value="400000">400.000</option>
                                    <option value="450000">450.000</option>
                                    <option value="500000">500.000</option>
                                </select>

                            <p>Precio máximo</p>
                                <select>
                                    <option value="0">0</option>
                                    <option value="50000">50.000</option>
                                    <option value="100000">100.000</option>
                                    <option value="150000">150.000</option>
                                    <option value="200000">200.000</option>
                                    <option value="250000">250.000</option>
                                    <option value="300000">300.000</option>
                                    <option value="350000">350.000</option>
                                    <option value="400000">400.000</option>
                                    <option value="450000">450.000</option>
                                    <option value="500000">500.000</option>
                                </select>
                        </div>
                        <h4>Talle</h4>
                        <div className={styles.buttons}>
                            {[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47].map((talle) => (
                                <button
                                    key={talle}
                                    onClick={() => handleChangeButton(talle)}
                                    className={`${styles.talleButton} ${activeTalle === talle ? styles.active : ''}`}
                                    >
                                    {talle}
                                </button>
                            ))}
                        </div>
                        <h4>Tipo Producto</h4>
                        <div className={styles.inputsRopa}>
                            <label><input type="radio" name="genero" value="zapatillas" ></input>Zapatilla</label>
                            <br />    
                            <label><input type="radio" name="genero" value="remera" ></input>Remera</label> 
                            <br />
                            <label><input type="radio" name="genero" value="pantalon" ></input>Pantalon</label> 
                            <br />
                            <label><input type="radio" name="genero" value="campera" ></input>Campera</label>  
                        </div>
                    </div>
                    <div className={styles.containerProductos}>
                        
                        {detalleProductoHabilitado.length > 0 ? (
                            detalleProductoHabilitado.map((el) => <ProductCardBrowserPage  key={el.id} detalleProductoHabilitado={el}/>)
                        ): <p>No hay productos</p>}
                    </div>         
            </div>
        
        </div>
        
    )
}

