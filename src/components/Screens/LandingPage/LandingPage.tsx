import Header from "../../../assets/img/Header.png";
import ImagenRopa from "../../../assets/img/ImagenRopa.png";
import ImagenCalzado from "../../../assets/img/ImagenCalzado.png";

import styles from "./LandingPage.module.css";
import { Carrusel } from "../../UI/Carrusel/Carrusel";

export const LandingPage = () => {
  return (
    <div className={styles.landingPageContainer}>
      <img
        className={styles.landingPageLogoContainer}
        src={Header}
        alt="Header LandingPage"
      />

      <h1>Nuevo</h1>
      <hr />

      <Carrusel />

      <div className={styles.containerImages}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.landingPageImage}
            src={ImagenRopa}
            alt="Imagen de la categoria Ropa"
          />
          <span className={styles.imageText}>Ropa</span>
        </div>

        <div className={styles.imageWrapper}>
          <img
            className={styles.landingPageImage}
            src={ImagenCalzado}
            alt="Imagen de la categoria Calzado"
          />
          <span className={styles.imageText}>Calzado</span>
        </div>
      </div>

      <h1>Solo Futbol</h1>
      <hr />

      <Carrusel />
    </div>
  );
};
