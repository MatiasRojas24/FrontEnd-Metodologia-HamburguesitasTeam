import { useEffect, useState } from "react";
import { usuarioStore } from "../store/usuarioStore";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "../components/UI/Footer/Footer";
import { NavBar } from "../components/UI/NavBar/Navbar";
import { AdminRoutes } from "./AdminRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { useUsuario } from "../hooks/useUsuario";
import { validateTokenHttp } from "../http/authHttp";
import { LandingPage } from "../components/screens/LandingPage/LandingPage";
import { Register } from "../components/screens/Register/Register";
import { PantallaCarga } from "../components/Screens/PantallaCarga/PantallaCarga";
import { BrowserPage } from "../components/Screens/BrowserPage/BrowserPage";
import { ProductPage } from "../components/screens/ProductPage/ProductPage";
import { SlideNotification } from "../components/UI/SlideNotification/SlideNotification";
import { CarritoPage } from "../components/Screens/CarritoPage/CarritoPage";

export const AppRouter = () => {
  const usuarioLogged = usuarioStore((state) => state.usuarioLogeado);
  const setUsuarioLogeado = usuarioStore((state) => state.setUsuarioLogeado);
  const { getUsuarioById } = useUsuario();
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  const [mensajeNotificacion, setMensajeNotificacion] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!mensajeNotificacion) return;
    const timeout = setTimeout(() => {
      setMensajeNotificacion(null);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [mensajeNotificacion]);

  const location = useLocation();
  // Si intenta acceder a rutas protegidas sin usuario, seteamos mensaje
  useEffect(() => {
    const rutasProtegidas = [
      "/gestion-de-productos",
      "/gestion-de-productos/detalle",
      "/gestion-de-cuentas",
      "/cuenta-de-usuario",
      "/carrito",
    ];
    const esRutaProtegida = rutasProtegidas.some((ruta) =>
      location.pathname.startsWith(ruta)
    );
    if (!usuarioLogged && esRutaProtegida) {
      setMensajeNotificacion("Inicie sesión para continuar");
    }
  }, [location.pathname, usuarioLogged]);

  useEffect(() => {
    const handlePersistUsuarioLoggeado = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const validToken = await validateTokenHttp(token);
        if (validToken) {
          const userId = localStorage.getItem("usuarioLogeado");
          if (userId) {
            const userLogPersist = await getUsuarioById(userId);
            if (userLogPersist) {
              setUsuarioLogeado(userLogPersist);
            } else {
              console.error("Usuario no encontrado");
            }
          }
        } else {
          localStorage.clear();
          console.warn("Token inválido. Cerrando sesión.");
        }
      } else {
        localStorage.clear();
        console.warn("No hay token. Cerrando sesión");
      }
      setCargandoUsuario(false);
    };

    handlePersistUsuarioLoggeado();
  }, []);

  const ocultarNavbar = location.pathname === "/register";
  const ocultarFooter =
    location.pathname === "/gestion-de-productos" ||
    location.pathname === "/gestion-de-productos/detalle" ||
    location.pathname === "/register" ||
    location.pathname === "/gestion-de-cuentas";

  if (cargandoUsuario) return <PantallaCarga />;

  return (
    <>
      {!ocultarNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browser-page" element={<BrowserPage />} />
        <Route path="/carritoCompra" element={<CarritoPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/*"
          element={
            usuarioLogged?.rol === "ADMIN" ? (
              <AdminRoutes />
            ) : usuarioLogged?.rol === "CLIENTE" ? (
              <ClientRoutes />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
      </Routes>
      {!ocultarFooter && <Footer />}
      {mensajeNotificacion && (
        <SlideNotification mensaje={mensajeNotificacion} />
      )}
    </>
  );
};
