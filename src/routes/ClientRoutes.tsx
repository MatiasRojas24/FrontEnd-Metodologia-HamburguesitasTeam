import { CuentaUsuario } from "../components/screens/CuentaUsuario/CuentaUsuario"
import { Route, Routes } from 'react-router-dom'

export const ClientRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/cuenta-de-usuario' element={<CuentaUsuario />} />
                <Route path='/carrito' element={<></>} />
            </Routes>
        </>
    )
}
