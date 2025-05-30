import { usuarioStore } from '../store/usuarioStore'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import { LandingPage } from '../components/Screens/LandingPage/LandingPage'
import { NavBar } from '../components/UI/NavBar/Navbar'
import { AdminRoutes } from './AdminRoutes'
import { ClientRoutes } from './ClientRoutes'
import { Register } from '../components/Screens/Register/Register'
import { CuentasUsuarios } from '../components/Screens/CuentasUsuarios/CuentasUsuarios'

export const AppRouter = () => {
    const usuarioLogged = usuarioStore((state) => state.usuarioLogeado)
    const location = useLocation();
    const ocultarNavbar = location.pathname === "/register"
    const ocultarFooter =
        location.pathname === "/gestion-de-productos"
        ||
        location.pathname === "/gestion-de-productos/detalle"
        || location.pathname === "/register"
    return (
        <>
            {!ocultarNavbar && <NavBar />}
            <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/*" element={
                usuarioLogged?.rol === "ADMIN"
                ? <AdminRoutes />
                : usuarioLogged?.rol === "CLIENTE"
                ? <ClientRoutes />
                : <Navigate to="/home" />
            } />
            </Routes>
            {!ocultarFooter && <Footer />}
        </>
    )
}
