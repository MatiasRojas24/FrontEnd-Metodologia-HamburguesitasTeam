import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.contactContainer}>
        <p>Contactanos: +11 111 111 111</p>
        <p>
          Nuestras Redes:&nbsp;
          <i className="bi bi-instagram"></i>
          <i className="bi bi-facebook"></i>
        </p>
      </div>
      <p className={styles.rightsContainer}>
        &copy; Hamburguesitas Team. All rights reserved
      </p>
    </footer>
  );
};
