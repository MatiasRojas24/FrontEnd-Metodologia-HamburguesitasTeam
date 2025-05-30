import React from 'react'
import { usuarioStore } from '../store/usuarioStore'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import { LandingPage } from '../components/screens/LandingPage/LandingPage'
import { NavBar } from '../components/UI/NavBar/Navbar'
import { Register } from '../components/screens/Register/Register'
import { AdminRoutes } from './AdminRoutes'
import { ClientRoutes } from './ClientRoutes'

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
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home' element={<LandingPage />} />
                <Route path='/register' element={<Register />} />
                {usuarioLogged?.rol === "ADMIN" ?
                    <Route path="/*" element={<AdminRoutes />} />
                    :
                    <Route path='/*' element={<Navigate to="/home" />} />
                }
                {usuarioLogged?.rol === "CLIENTE" ?
                    <Route path="/*" element={<ClientRoutes />} />
                    :
                    <Route path='/*' element={<Navigate to="/home" />} />
                }
            </Routes>
            {!ocultarFooter && <Footer />}
        </>
    )
}
