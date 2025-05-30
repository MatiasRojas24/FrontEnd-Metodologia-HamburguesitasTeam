import { Route, Routes } from 'react-router-dom'
import { CuentasUsuarios } from '../components/Screens/CuentasUsuarios/CuentasUsuarios'

export const ClientRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/cuenta-del-usuario" element={<CuentasUsuarios />} />
            </Routes>
        </>
    )
}
