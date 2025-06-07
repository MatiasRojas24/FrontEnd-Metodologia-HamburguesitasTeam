import { addDireccionesToUsuarioHttp, deleteUsuarioHttp, getUsuarioByIdHttp, getUsuarioByUsername, getUsuariosHttp, updateUsuarioHttp } from '../http/usuarioHttp'
import { loginUsuarioHttp, registerUsuarioAdminHttp, registerUsuarioClienteHttp } from '../http/authHttp'
import { usuarioStore } from '../store/usuarioStore'
import { useShallow } from 'zustand/shallow'
import type { ILoginRequest } from '../types/ILoginRequest'
import type { IUsuario } from '../types/IUsuario'
import type { IDireccion } from '../types/IDireccion'
import { getDireccionesByUsuarioIdHttp } from '../http/direccionHttp'

export const useUsuario = () => {

    const { setUsuarios, añadirUsuario, eliminarUsuario, actualizarUsuario, setUsuarioLogeado, setDireccionesUsuario, direccionesUsuario, } = usuarioStore(useShallow((state) => ({
        setUsuarios: state.setUsuarios,
        añadirUsuario: state.añadirUsuario,
        eliminarUsuario: state.eliminarUsuario,
        actualizarUsuario: state.actualizarUsuario,
        setUsuarioLogeado: state.setUsuarioLogeado,
        setDireccionesUsuario: state.setDireccionesUsuario,
        direccionesUsuario: state.direccionesUsuario,
    })))

    const getUsuarios = async (): Promise<void> => {
        try {
            const data = await getUsuariosHttp()
            if (data) {
                setUsuarios(data)
            }
        } catch (error) {
            console.error("Error en getUsuarios: ", error)
        }
    }

    const getUsuarioById = async (idUsuario: string): Promise<IUsuario | undefined> => {
        try {
            const usuario = await getUsuarioByIdHttp(idUsuario)
            if (!usuario) throw new Error

            return usuario
        } catch (error) {
            console.error("Error en getUsuarioById: ", error)
        }
    }

    const registerUsuarioAdmin = async (datosRegister: IUsuario): Promise<boolean> => {
        try {
            const token = await registerUsuarioAdminHttp(datosRegister)
            if (!token) return false;
            localStorage.setItem('token', token)


            const usuario = await getUsuarioByUsername(datosRegister.username)
            localStorage.setItem('usuarioLogeado', usuario!.id!)
            añadirUsuario(usuario!)
            setUsuarioLogeado(usuario!)
            return true;
        } catch (error) {
            console.error("Error en registerUsuarioAdmin", error)
            return false;
        }
    }

    const registerUsuarioCliente = async (datosRegister: IUsuario): Promise<boolean> => {
        try {
            const token = await registerUsuarioClienteHttp(datosRegister)
            if (!token) return false;
            localStorage.setItem('token', token)

            const usuario = await getUsuarioByUsername(datosRegister.username)
            localStorage.setItem('usuarioLogeado', usuario!.id!)
            setUsuarioLogeado(usuario!)
            return true;
        } catch (error) {
            console.error("Error en registerUsuarioCliente", error)
            return false;
        }
    }

    const loginUsuario = async (datosLogin: ILoginRequest): Promise<boolean> => {
        try {

            const token = await loginUsuarioHttp(datosLogin);
            if (!token) throw new Error("No se obtuvo ningun token al intentar el login")
            localStorage.setItem("token", token!);


            const usuario = await getUsuarioByUsername(datosLogin.username)
            if (!usuario) {
                console.warn("No se encontro el usuario correspondiente al login en la BD")
                return false
            }
            localStorage.setItem('usuarioLogeado', usuario.id!)
            setUsuarioLogeado(usuario)

            return true;
        } catch (error) {
            console.error("Error en usuarioLogin:", error);
            localStorage.removeItem('token')
            return false;
        }
    };

    const updateUsuario = async (usuarioActualizado: IUsuario): Promise<boolean> => {
        try {
            const data = await updateUsuarioHttp(usuarioActualizado)
            console.log("Se actualizo el usuario: ", data)

            if (!data) throw new Error("No se puedo actualizar el usuario!")
            const usuarioActualizadoDb = await getUsuarioByUsername(usuarioActualizado.username)

            if (!usuarioActualizadoDb) {
                console.warn("No se pudo obtener la lista de usuarios después de actualizar")
                return false
            }
            actualizarUsuario(usuarioActualizadoDb)

            return true
        } catch (error) {
            console.error("Algo salio mal en editUsuarioAdmin", error)
            return false
        }
    }

    const deleteUsuario = async (idUsuario: string): Promise<boolean> => {
        try {
            const data = await deleteUsuarioHttp(idUsuario)
            if (!data) return false
            eliminarUsuario(idUsuario)

            return true
        } catch (error) {
            console.log("Error en deleteUsuario", error)
            return false
        }
    }

    const addDireccionesToUsuario = async (direcciones: IDireccion[], idUsuario: string): Promise<boolean> => {
        try {
            const data = await addDireccionesToUsuarioHttp(direcciones, idUsuario)
            if (!data) throw new Error

            const usuario = await getUsuarioById(idUsuario)
            if (!usuario) throw new Error

            setUsuarioLogeado(usuario)

            return true
        } catch (error) {
            console.error('Error en addDireccionesToUsuario: ', error)
            return false
        }
    }

    const getDireccionesByUsuarioId = async (idUsuario: string): Promise<void> => {
        try {
            const direccionesDB = await getDireccionesByUsuarioIdHttp(idUsuario)
            if (direccionesDB) setDireccionesUsuario(direccionesDB)
                            
        } catch (error) {
            console.error("Hubo un problema en getDireccionesByUsuarioId: ", error)
        }
    }

    const updateUsuarioLogeadoById = async (idUsuaio: string): Promise<void> => {
        try {
            const usuarioBd = await getUsuarioByIdHttp(idUsuaio)
            if (usuarioBd) setUsuarioLogeado(usuarioBd)
        } catch (error) {
            console.error("hubo un error en updateUsuarioLogeado: ", error)
        }
    }

  return {
    getUsuarios,
    loginUsuario,
    registerUsuarioAdmin,
    deleteUsuario,
    updateUsuario,
    getUsuarioById,
    addDireccionesToUsuario,
    updateUsuarioLogeadoById,
    registerUsuarioCliente,
    getDireccionesByUsuarioId,
  }
}
