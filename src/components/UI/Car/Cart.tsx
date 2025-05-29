import { useState, type FC } from 'react'
import styles from './Cart.module.css'

type IPropsCart = {
    setIsCart: (state: boolean) => void
}

export const Car: FC<IPropsCart> = ({ setIsCart }) => {
    const [counter, setCounter] = useState(1)

    const handleRestarUno = () => {
        if (counter >= 2) {
            setCounter(counter - 1)
        }
    }

    const handleSumarUno = () => {
        if (counter < 99) {
            setCounter(counter + 1)
        }
    }

    const handleIniciarCompra = () => {
        setIsCart(false)

        /* hay que hacer un use navigate que nos lleve a la pagina de llenar datos, o a la pagina del producto para comprarlo*/
    }

  return (
    <div className={styles.cartOverlay}>
        <div className={styles.cartContainer}>
            <h3 className={styles.title}>Carrito</h3>
            <section className={styles.product}>
                <div className={styles.imgContainer}>
                </div>
                <div className={styles.productBody}>
                    <p className={styles.nombreProduct}>Zapatillas Kobi VI Proto</p>
                    <p style={{color:"var(--yellow)"}}>Talle 40</p>
                    <div className={styles.counterContainer}>
                        <p className={styles.counter}><p onClick={handleRestarUno} style={{fontSize:"18px"}}>-</p> {counter} <p onClick={handleSumarUno}>+</p></p>
                        <p>$199.999</p>
                    </div>
                </div>
                <i className="bi bi-trash"></i>
            </section>
            <section className={styles.buyContainer}>
                <p>Total: $ 199.999</p>
                <button onClick={handleIniciarCompra}>Iniciar Compra</button>
            </section>
        </div>
    </div>
  )
}
