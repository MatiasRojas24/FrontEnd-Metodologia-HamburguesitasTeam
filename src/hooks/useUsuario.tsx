import { addDireccionesToUsuarioController, deleteUsuarioController, getUsuarioByIdController, getUsuariosController, loginUsuarioController, registerUsuarioAdminController, updateUsuarioController } from '../controllers/usuarioController'
import { usuarioStore } from '../store/usuarioStore'
import { useShallow } from 'zustand/shallow'
import type { ILoginRequest } from '../types/ILoginRequest'
import type { IUsuario } from '../types/IUsuario'
import type { IDireccion } from '../types/IDireccion'

export const useUsuario = () => {

    const { setUsuarios, añadirUsuario, eliminarUsuario, actualizarUsuario, setUsuarioLogeado, usuarios } = usuarioStore(useShallow((state) => ({
        setUsuarios: state.setUsuarios,
        añadirUsuario: state.añadirUsuario,
        eliminarUsuario: state.eliminarUsuario,
        actualizarUsuario: state.actualizarUsuario,
        setUsuarioLogeado: state.setUsuarioLogeado,
        usuarios: state.usuarios,
    })))

    const getUsuarios = async (): Promise<void> => {
        try {
            const data = await getUsuariosController()
            if (data) {
                setUsuarios(data)
            }
        } catch (error) {
            console.error("Error en getUsuarios: ", error)
        }
    }

    const getUsuarioById = async (idUsuario: string): Promise<IUsuario | undefined> => {
        try {
            const usuario = await getUsuarioByIdController(idUsuario)
            if (!usuario) throw new Error

            return usuario
        } catch (error) {
            console.error("Error en getUsuarioById: ", error)
        }
    }

    const registerUsuarioAdmin = async (datosRegister: IUsuario): Promise<boolean> => {
        try {
            const token = await registerUsuarioAdminController(datosRegister)
            if (!token) return false;
            
            await getUsuarios()
            const usuarioRegistrado = usuarios.find(u => u.email === datosRegister.email)

            if (usuarioRegistrado) {
                añadirUsuario(usuarioRegistrado)
            } else {
                console.log(usuarioRegistrado)
                return false
            }

            return true;
        } catch (error) {
            console.error("Error en registerUsuarioAdmin", error)
            return false;
        }
    }

    const loginUsuario = async (datosLogin: ILoginRequest): Promise<boolean> => {
        try {
            const token = await loginUsuarioController(datosLogin);
            console.log("token desde loginUsuario: ", token)

            localStorage.setItem("token", token!);

            /*await getUsuarios()
            const usuarioLogeado = usuarios.find(u => u.username === datosLogin.username)

            if (!usuarioLogeado) throw new Error
            
            setUsuarioLogeado(usuarioLogeado)*/

            return true;
        } catch (error) {
            console.error("Error en usuarioLogin:", error);
            localStorage.removeItem('token')
            return false;
        }
    };

    const updateUsuario = async (usuarioActualizado: IUsuario): Promise<boolean> => {
        try {
            const data = await updateUsuarioController(usuarioActualizado)
            console.log("Se actualizo el usuario: ", data)

            if (!data) throw new Error

            actualizarUsuario(usuarioActualizado)

            return true
        } catch (error) {
            console.error("Algo salio mal en editUsuarioAdmin", error)
            return false
        }
    }

    const deleteUsuario = async (idUsuario: string): Promise<boolean> => {
        try {
            const data = await deleteUsuarioController(idUsuario)
            if (!data) return false
            eliminarUsuario(idUsuario)

            return true
        } catch (error) {
            console.log("Error en deleteUsuario", error)
            return false
        }
    }

    const addDireccionesToUsuario = async (direcciones: IDireccion[], idUsuario: string): Promise<boolean> => {
        console.log("direcciones: ", direcciones)
        console.log("idusuario: ", idUsuario)
        try {
            const data = await addDireccionesToUsuarioController(direcciones, idUsuario)
            if (!data) throw new Error

            const usuario = await getUsuarioById(idUsuario)
            console.log('usuario del getById: ', usuario)
            if (!usuario) {
                const usuarioActualizado = await getUsuarioById(idUsuario)
                usuarioActualizado!.direcciones = []
                actualizarUsuario(usuarioActualizado!)
                throw new Error
            }

            actualizarUsuario(usuario)

            return true
        } catch (error) {
            console.log("direcciones: ", direcciones)
            console.log("idusuario: ", idUsuario)
            console.error('Error en addDireccionesToUsuario: ', error)
            return false
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
  }
}
