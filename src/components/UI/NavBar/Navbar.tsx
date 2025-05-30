import Logo from "../../../assets/img/Logo.png";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { usuarioStore } from "../../../store/usuarioStore";
import { Login } from "../Login/Login";
import { useNavigate } from "react-router-dom";
import { DropdownAdminOptions } from "../DropdownAdminOptions/DropdownAdminOptions";

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [openDropdownAdminOptions, setOpenDropdownAdminOptions] = useState(false);
  const [openDropdownUserOptions, setOpenDropdownUserOptions] = useState(false);

  const navigate = useNavigate();
  const setUsuarioLogeado = usuarioStore((state) => state.setUsuarioLogeado)
  const usuarioLogged = usuarioStore((state) => state.usuarioLogeado)
  const stylesI = {
    color: "white",
    fontSize: "20px",
    width: "40px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handlePersonIcon = () => {
    setIsLogin(true)
  }
  const handleLogout = () => {
    localStorage.removeItem("token")
    setUsuarioLogeado(null)
    localStorage.removeItem('usuarioLogeado')
  }

  const handleNavigateToHome = () => {
    navigate("/home")
  }
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogoSegment}>
        <img
          className={styles.navbarLogoContainer}
          src={Logo}
          alt="Logo de SPORTWEAR"
          onClick={handleNavigateToHome}
        />
      </div>
      <div className={styles.navbarFilterSegmnet}>
        <ul style={{ maxHeight: "80px" }}>
          <li>
            <a href="">Mujeres</a>
          </li>
          <li>
            <a href="">Hombres</a>
          </li>
          <li>
            <a href="">Unisex</a>
          </li>
        </ul>
        <div className={styles.searchbarSegment}>
          <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
            <i className="bi bi-search" style={stylesI}></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar"
              autoComplete="off"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>
      </div>
      <div className={styles.userOptionSegment}>
        {/* USUARIO NO ESTÁ LOGEADO*/}
        {!usuarioLogged && (
          <div className={styles.containerBotones}>
            <button className={styles.navbarButton}>
              <i className="bi bi-person" onClick={handlePersonIcon}></i>
            </button>
          </div>
        )}

        {/* USUARIO LOGEADO COMO ADMIN */}
        {usuarioLogged?.rol === "ADMIN" && (
          <div className={styles.containerBotones}>
            <button className={styles.navbarButton}>
              <i className="bi bi-box-arrow-right" onClick={handleLogout}></i>
            </button>
            <button className={styles.navbarButton}>
              <i className="bi bi-list" onClick={() => setOpenDropdownAdminOptions(!openDropdownAdminOptions)}></i>
            </button>
          </div>
        )}

        {/* USUARIO LOGEADO COMO CLIENTE */}
        {usuarioLogged?.rol === "CLIENTE" && (
          <div className={styles.containerBotones}>
            <button className={styles.navbarButton}>
              <i className="bi bi-cart3"></i>
            </button>
            <button className={styles.navbarButton}>
              <i className="bi bi-box-arrow-right" onClick={handleLogout}></i>
            </button>
            <button className={styles.navbarButton}>
              <i className="bi bi-list" onClick={() => { setOpenDropdownUserOptions(!openDropdownUserOptions) }}></i>
            </button>
          </div>
        )}

        {isLogin && <Login setIsLogin={setIsLogin} />}
        {openDropdownAdminOptions && <DropdownAdminOptions setOpenDropdownAdminOptions={setOpenDropdownAdminOptions} />}
        {openDropdownUserOptions && <DropdownUserOptions setOpenDropdownUserOptions={setOpenDropdownUserOptions} />}
      </div>
    </nav>
  );
};
