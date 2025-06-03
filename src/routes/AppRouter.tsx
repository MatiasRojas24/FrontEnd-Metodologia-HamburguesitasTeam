import { useEffect, useState } from 'react'
import { usuarioStore } from '../store/usuarioStore'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '../components/UI/Footer/Footer'
import { NavBar } from '../components/UI/NavBar/Navbar'
import { AdminRoutes } from './AdminRoutes'
import { ClientRoutes } from './ClientRoutes'
import { useUsuario } from '../hooks/useUsuario'
import { validateTokenHttp } from '../http/authHttp'
import { LandingPage } from '../components/Screens/LandingPage/LandingPage'
import { Register } from '../components/Screens/Register/Register'
import { PantallaCarga } from '../components/Screens/PantallaCarga/PantallaCarga'

export const AppRouter = () => {
    const usuarioLogged = usuarioStore((state) => state.usuarioLogeado)
    const setUsuarioLogeado = usuarioStore((state) => state.setUsuarioLogeado)
    const { getUsuarioById } = useUsuario()
    const [cargandoUsuario, setCargandoUsuario] = useState(true)
    useEffect(() => {
        const handlePersistUsuarioLoggeado = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                const validToken = await validateTokenHttp(token)
                if (validToken) {
                    const userId = localStorage.getItem('usuarioLogeado')
                    if (userId) {
                        const userLogPersist = await getUsuarioById(userId)
                        if (userLogPersist) {
                            setUsuarioLogeado(userLogPersist)
                        } else {
                            console.error('Usuario no encontrado')
                        }
                    }
                } else {
                    localStorage.clear()
                    console.warn("Token inválido. Cerrando sesión.")
                }
            } else {
                localStorage.clear()
                console.warn("No hay token. Cerrando sesión")
            }
            setCargandoUsuario(false)
        }

        handlePersistUsuarioLoggeado()
    }, [])
    const location = useLocation();
    const ocultarNavbar = location.pathname === "/register"
    const ocultarFooter =
        location.pathname === "/gestion-de-productos"
        ||
        location.pathname === "/gestion-de-productos/detalle"
        || location.pathname === "/register"
        || location.pathname === "/gestion-de-cuentas"
    if (cargandoUsuario) return <PantallaCarga />
    return (
        <>
            {!ocultarNavbar && <NavBar />}
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home' element={<LandingPage />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path="/*"
                    element={
                        usuarioLogged?.rol === 'ADMIN'
                            ? <AdminRoutes />
                            : usuarioLogged?.rol === 'CLIENTE'
                                ? <ClientRoutes />
                                : <Navigate to="/home" />
                    }
                />
            </Routes>
            {!ocultarFooter && <Footer />}
        </>
    )
}
