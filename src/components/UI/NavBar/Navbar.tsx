import Logo from "../../../assets/img/Logo.png";
import styles from "./Navbar.module.css";
import { type FC } from "react";

type IPropsNavbar = {
  setIsLogin: (state: boolean) => void
  setIsLoged: (state: boolean) => void
  isLoged: boolean
}

export const NavBar: FC<IPropsNavbar> = ({ setIsLogin, setIsLoged, isLoged }) => {
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

  const handlePersonIcon = () => {
    const tokenLs = localStorage.getItem("token")
    if (tokenLs) {
      setIsLoged(!isLoged)
    } else {
      setIsLogin(true)
    }
  }

  return (
    <nav className={styles.navbarContainer}>
      <img
        className={styles.navbarLogoContainer}
        src={Logo}
        alt="Logo de SPORTWEAR"
      />

      <ul style={{maxHeight:"80px"}}>
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
          <i className="bi bi-person" onClick={handlePersonIcon}></i>
        </button>
      </ul>
    </nav>
  );
};
