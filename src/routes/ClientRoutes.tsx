
import { Route, Routes } from 'react-router-dom'
import { BrowserPage } from '../components/Screens/BrowserPage/BrowserPage'

export const ClientRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/cuenta-de-usuario' element={<></>} />
                <Route path='/carrito' element={<></>} />
                <Route path='/browser-page' element={<BrowserPage/>} />
            </Routes>
        </>
    )
}
