import { useState } from 'react'

export const useDisableButton = () => {
    
    // Estado para desactivar un boton mientras que se realiza la accion que dispara
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    
    return {
        isDisabled,
        setIsDisabled
    }
}
