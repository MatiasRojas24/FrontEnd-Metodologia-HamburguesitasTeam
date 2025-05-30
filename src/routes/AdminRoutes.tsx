import { Route, Routes } from 'react-router-dom'
import { GestionDeProductos } from '../components/Screens/GestionDeProductos/GestionDeProductos'
import { GestionDetalleProducto } from '../components/Screens/GestionDetalleProducto/GestionDetalleProducto'
import { CuentasAdmin } from '../components/Screens/CuentasAdmin/CuentasAdmin'

export const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/gestion-de-productos' element={<GestionDeProductos />} />
                <Route path='/gestion-de-productos/detalle' element={<GestionDetalleProducto />} />
                <Route path='/gestion-de-cuentas' element={<CuentasAdmin />} />
            </Routes>
        </>
    )
}
