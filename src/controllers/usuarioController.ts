import axios from "./axios.ts";
import type { IUsuario } from "../types/IUsuario";
import type { IDireccion } from "../types/IDireccion";
import type { ILoginRequest } from "../types/ILoginRequest.ts";

const apiUrlUsuariosController = "/usuarios";
const apiUrlAuthController = "/auth";

interface AuthResponse {
  token: string;
}

export const getUsuariosController = async (): Promise<
  IUsuario[] | undefined
> => {
  try {
    const response = await axios.get<IUsuario[]>(apiUrlUsuariosController);
    console.log("token desde el controller: ", response.data)
    return response.data;
  } catch (error) {
    console.warn("Token expirado o inválido, cerrando sesión...");
    localStorage.removeItem("token");

    console.error("Problemas en getUsuariosController", error);
  }
};

export const getUsuarioByIdController = async (
  usuarioId: string
): Promise<IUsuario | undefined> => {
  try {
    const response = await axios.get<IUsuario>(
      apiUrlUsuariosController + `/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getUsuarioByIdController", error);
  }
};

export const registerUsuarioAdminController = async (
  datosRegister: IUsuario
): Promise<string | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(
      apiUrlAuthController + "/registerAdmin",
      datosRegister
    );

    return response.data.token;
  } catch (error) {
    console.error("Problemas en registerUsuarioAdminController", error);
  }
};

export const registerUsuarioClienteController = async (
  datosRegister: IUsuario
): Promise<string | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(
      apiUrlAuthController + "/registerCliente",
      datosRegister
    );
    return response.data.token;
  } catch (error) {
    console.error("Problemas en registerUsuarioClienteController", error);
  }
};

export const loginUsuarioController = async (
  datosLogin: ILoginRequest
): Promise<string | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(apiUrlAuthController + "/login", datosLogin);
    return response.data.token;
  } catch (error) {
    console.error("Problemas en loginUsuarioController", error);
  }
};

export const updateUsuarioController = async (
  usuarioActualizado: IUsuario
): Promise<IUsuario | undefined> => {
  try {
    const response = await axios.put<IUsuario>(
      apiUrlUsuariosController,
      usuarioActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en updateUsuarioController", error);
  }
};

export const deleteUsuarioController = async (
  usuarioId: string
): Promise<string | undefined> => {
  try {
    const response = await axios.delete<string>(
      apiUrlUsuariosController + `/${usuarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en deleteUsuarioController", error);
  }
};

export const addDireccionesToUsuarioController = async (
  direcciones: IDireccion[],
  usuarioId: string
): Promise<IUsuario | undefined> => {
  try {
    const response = await axios.post<IUsuario>(
      apiUrlUsuariosController + `/direcciones/${usuarioId}`,
      direcciones
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en addDireccionesToUsuarioController", error);
  }
};

export const getUsuariosByDireccionIdController = async (
  direccionId: string
): Promise<IUsuario[] | undefined> => {
  try {
    const response = await axios.get<IUsuario[]>(
      apiUrlUsuariosController + `/direcciones/${direccionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Problemas en getUsuariosByDireccionIdController", error);
  }
};
