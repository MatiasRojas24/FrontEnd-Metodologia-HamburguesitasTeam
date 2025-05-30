import { useEffect, useState } from 'react'
import { usuarioStore } from '../store/usuarioStore'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import { LandingPage } from '../components/screens/LandingPage/LandingPage'
import { NavBar } from '../components/UI/NavBar/Navbar'
import { Register } from '../components/screens/Register/Register'
import { AdminRoutes } from './AdminRoutes'
import { ClientRoutes } from './ClientRoutes'
import { useUsuario } from '../hooks/useUsuario'
import { PantallaCarga } from '../components/screens/PantallaCarga/PantallaCarga'

export const AppRouter = () => {
    const usuarioLogged = usuarioStore((state) => state.usuarioLogeado)
    const setUsuarioLogeado = usuarioStore((state) => state.setUsuarioLogeado)
    const { getUsuarioById } = useUsuario()
    const [cargandoUsuario, setCargandoUsuario] = useState(true)
    useEffect(() => {
        const handlePersistUsuarioLoggeado = async () => {
            const userId = localStorage.getItem('usuarioLogeado')
            if (userId) {
                const userLogPersist = await getUsuarioById(userId)
                if (userLogPersist) {
                    setUsuarioLogeado(userLogPersist)
                } else {
                    console.error('Usuario no encontrado')
                }
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
