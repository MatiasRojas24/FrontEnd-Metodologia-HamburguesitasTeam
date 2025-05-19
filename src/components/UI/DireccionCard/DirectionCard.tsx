import styles from './DireccionCard.module.css'

export const DirectionCard = () => {
    return (
        <div className={styles.direccionCard}>
            <div className={styles.infoContainer}>
                <h3>Localidad, Departamento</h3>
                <p>Provincia, País</p>
            </div>
            <div className={styles.iconsContainer}>
                <i className="bi bi-pencil-square"></i>
                <i className="bi bi-trash"></i>
            </div>
        </div>
    )
}
