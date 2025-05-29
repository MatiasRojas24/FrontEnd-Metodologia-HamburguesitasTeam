import type { FC } from 'react'
import styles from './UserInfo.module.css'
import { usuarioStore } from '../../../store/usuarioStore'

type IPropsUserInfo = {
    setIsLoged: (state: boolean) => void
}

export const UserInfo: FC<IPropsUserInfo> = ({ setIsLoged }) => {
  const setUsuarioLogeado = usuarioStore((state) => state.setUsuarioLogeado)

  const handleLogOut = () => {
    localStorage.removeItem("token")
    setUsuarioLogeado(null)
    setIsLoged(false)
  }
  return (
    <div className={styles.userInfo}>
        <button onClick={handleLogOut}>Cerrar sesion</button>
    </div>
  )
}
