import { CuentasUsuarios } from "../components/screens/CuentasUsuarios/CuentasUsuarios"
import { Route, Routes } from 'react-router-dom'

export const ClientRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/cuenta-de-usuario' element={<CuentasUsuarios />} />
                <Route path='/carrito' element={<></>} />
            </Routes>
        </>
    )
}
