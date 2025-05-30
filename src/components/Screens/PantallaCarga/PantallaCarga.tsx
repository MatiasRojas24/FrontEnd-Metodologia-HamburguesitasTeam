import styles from './PantallaCarga.module.css'
import Logo from '../../../assets/img/Logo.png'
export const PantallaCarga = () => {
    return (
        <div className={styles.containerPantalla}>
            <img
                width={"80px"}
                src={Logo}
            />
            <h1>SportWear</h1>
            <h3>Tienda de ropa deportiva</h3>
            <div className={styles.carga}>

            </div>
        </div>
    )
}
