import Logo from "../../../assets/img/Logo.png";
import styles from "./Navbar.module.css";
import type { FC } from "react";

type IPropsNavbar = {
  setIsLogin: (state: boolean) => void
}

export const NavBar: FC<IPropsNavbar> = ({ setIsLogin }) => {
  const stylesI = {
    color: "white",
    fontSize: "20px",
    width: "40px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "15px",
  };

  return (
    <nav className={styles.navbarContainer}>
      <img
        className={styles.navbarLogoContainer}
        src={Logo}
        alt="Logo de SPORTWEAR"
      />

      <ul>
        <li>
          <a href="">Mujeres</a>
        </li>
        <li>
          <a href="">Hombres</a>
        </li>
        <li>
          <a href="">Niños</a>
        </li>
        <div className={styles.searchContainer}>
          <i className="bi bi-search" style={stylesI}></i>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar"
          />
        </div>
        <button className={styles.navbarButton}>
          <i className="bi bi-cart3"></i>
        </button>
        <button className={styles.navbarButton}>
          <i className="bi bi-person" onClick={() => setIsLogin(true)}></i>
        </button>
      </ul>
    </nav>

  );
};
