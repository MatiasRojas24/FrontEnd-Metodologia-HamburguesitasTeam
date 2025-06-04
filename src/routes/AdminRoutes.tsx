import { Route, Routes } from 'react-router-dom'
import { GestionDeProductos } from '../components/Screens/GestionDeProductos/GestionDeProductos'
import { CuentasAdmin } from '../components/Screens/CuentasAdmin/CuentasAdmin'
import { GestionDetalleProducto } from '../components/Screens/GestionDetalleProducto/GestionDetalleProducto'
import { BrowserPage } from '../components/Screens/BrowserPage/BrowserPage'

export const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/gestion-de-productos' element={<GestionDeProductos />} />
                <Route path='/gestion-de-productos/detalle' element={<GestionDetalleProducto />} />
                <Route path='/gestion-de-cuentas' element={<CuentasAdmin />} />
                <Route path='/browser-page' element={<BrowserPage/>} />
            </Routes>
        </>
    )
}
