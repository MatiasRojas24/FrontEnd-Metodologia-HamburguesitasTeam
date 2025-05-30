import type { FC } from "react"
import styles from "./ProductCard.module.css"

type IPropsProductCard = {
  product: string
}

export const ProductCard: FC<IPropsProductCard> = ({ product }) => {
  return (
      <>
          <div className={styles.cardContainer}>
              <div className={styles.cardImage}>
                {product}
              </div>

              <div className={styles.cardInfo}>
                <p>Zapatilla Deportiva</p>
                <p>Hombre</p>
                <p>$240.000</p>
              </div>
          </div>
    </>
  )
}
