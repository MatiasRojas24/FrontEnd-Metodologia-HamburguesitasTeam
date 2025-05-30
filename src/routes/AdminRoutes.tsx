import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { GestionDeProductos } from '../components/screens/GestionDeProductos/GestionDeProductos'
import { GestionDetalleProducto } from '../components/screens/GestionDetalleProducto/GestionDetalleProducto'
import { CuentasAdmin } from '../components/screens/CuentasAdmin/CuentasAdmin'

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
