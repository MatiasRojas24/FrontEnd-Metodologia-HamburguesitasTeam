import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const ClientRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/cuenta-de-usuario' element={<></>} />
                <Route path='/carrito' element={<></>} />
            </Routes>
        </>
    )
}
