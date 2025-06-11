import Logo from "../../../assets/img/Logo.png";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { usuarioStore } from "../../../store/usuarioStore";
import { Login } from "../Login/Login";
import { DropdownAdminOptions } from "../DropdownAdminOptions/DropdownAdminOptions";
import { DropdownUserOptions } from "../DropdownUserOptions/DropdownUserOptions";
import { CarritoModal } from "../CarritoModal/CarritoModal";
import { navigateTo } from "../../../routes/navigation";
import { SlideNotification } from "../SlideNotification/SlideNotification";
import { useNavigate } from "react-router-dom";
import { detalleProductoStore } from "../../../store/detalleProductoStore";
import type { IDetalleProducto } from "../../../types/IDetalleProducto";

export const NavBar = () => {

  const productos = detalleProductoStore((state) => state.detallesProductosHabilitados);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [resultadosFiltrados, setResultadosFiltrados] = useState<IDetalleProducto[]>([]);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [openDropdownAdminOptions, setOpenDropdownAdminOptions] = useState(false);
  const [openDropdownUserOptions, setOpenDropdownUserOptions] = useState(false);
  const [openCarritoModal, setOpenCarritoModal] = useState(false)
  const [mensajeNotificacion, setMensajeNotificacion] = useState<string | null>(null);
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


  useEffect(() => {
    if (usuarioLogged) {
      setMensajeNotificacion(`Accediste como: ${usuarioLogged.username}`);
    }
  }, [usuarioLogged]);
  useEffect(() => {
    if (!mensajeNotificacion) return;
    const timeout = setTimeout(() => {
      setMensajeNotificacion(null);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [mensajeNotificacion]);


  const handlePersonIcon = () => {
    setIsLogin(true)
  }
  const handleLogout = () => {
    localStorage.removeItem("token")
    setUsuarioLogeado(null)
    localStorage.removeItem('usuarioLogeado')
    setMensajeNotificacion("Se ha cerrado la sesión");
  }

  const handleNavigateToHome = () => {
    navigateTo("/home")
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
            <a href="/browser-page?sexo=MUJER">Mujeres</a>
          </li>
          <li>
            <a href="/browser-page?sexo=HOMBRE">Hombres</a>
          </li>
          <li>
            <a href="/browser-page?sexo=UNISEX">Unisex</a>
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
                value={terminoBusqueda}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onChange={(e) => {
                  const valor = e.target.value;
                  setTerminoBusqueda(valor);

                  if (valor.trim() === "") {
                    setResultadosFiltrados([]);
                  } else {
                    const filtrados = productos.filter((p) =>
                      p.producto.nombre.toLowerCase().includes(valor.toLowerCase())
                    );
                    setResultadosFiltrados(filtrados);
                  }
                }}
              />
              {isFocused && resultadosFiltrados.length > 0 && (
                <div className={styles.sugerenciasContainer}>
                  {resultadosFiltrados.map((p) => (
                    <div
                    key={p.id}
                      className={styles.sugerenciaItem}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setTerminoBusqueda("");
                        setResultadosFiltrados([]);
                        setIsFocused(false);
                      }}
                    >
                      {p.producto.nombre}
                    </div>
                  ))}
                </div>
              )}              
          </div>
        </div>
      </div>
      <div className={styles.userOptionSegment}>
        {/* USUARIO NO ESTÁ LOGEADO*/}
        {!usuarioLogged && (
          <div className={styles.containerBotones}>
            <button className={styles.navbarButton} onClick={handlePersonIcon}>
              <i className="bi bi-person" ></i>
            </button>
          </div>
        )}

        {/* USUARIO LOGEADO COMO ADMIN */}
        {usuarioLogged?.rol === "ADMIN" && (
          <div className={styles.containerBotones}>
            <button className={styles.navbarButton} onClick={handleLogout}>
              <i className="bi bi-box-arrow-right" ></i>
            </button>
            <button className={styles.navbarButton} onClick={() => setOpenDropdownAdminOptions(!openDropdownAdminOptions)}>
              <i className="bi bi-list" ></i>
            </button>
          </div>
        )}

        {/* USUARIO LOGEADO COMO CLIENTE */}
        {usuarioLogged?.rol === "CLIENTE" && (
          <div className={styles.containerBotones}>
            <button className={styles.navbarButton} onClick={() => navigate("/carritoCompra")}>
              <i className="bi bi-cart3"></i>
            </button>
            <button className={styles.navbarButton} onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
            <button className={styles.navbarButton} onClick={() => { setOpenDropdownUserOptions(!openDropdownUserOptions); setOpenCarritoModal(false) }}>
              <i className="bi bi-list"></i>
            </button>
          </div>
        )}

        {isLogin && <Login setIsLogin={setIsLogin} />}
        {openDropdownAdminOptions && <DropdownAdminOptions setOpenDropdownAdminOptions={setOpenDropdownAdminOptions} />}
        {openDropdownUserOptions && <DropdownUserOptions setOpenDropdownUserOptions={setOpenDropdownUserOptions} />}
        {openCarritoModal && <CarritoModal setOpenCarritoModal={setOpenCarritoModal} />}
      </div>
      {mensajeNotificacion && <SlideNotification mensaje={mensajeNotificacion} />}
    </nav>
  );
};
