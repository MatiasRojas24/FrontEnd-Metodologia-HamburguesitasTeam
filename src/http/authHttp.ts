import axios from 'axios'
import type { IUsuario } from '../types/IUsuario';
import type { ILoginRequest } from '../types/ILoginRequest';

const apiUrlAuthController = "/auth";

interface AuthResponse {
    token: string;
}

export const registerUsuarioAdminHttp = async (
    datosRegister: IUsuario
): Promise<string | undefined> => {
    try {
        const response = await axios.post<AuthResponse>(
            apiUrlAuthController + "/registerAdmin",
            datosRegister
        );

        const token = response.data.token;
        if (token) {
            localStorage.setItem("token", token); // ---> Guardar el 🔑 token en localStorage
        }

        return response.data.token;
    } catch (error) {
        console.error("Problemas en registerUsuarioAdminController", error);
    }
};

export const registerUsuarioClienteHttp = async (
    datosRegister: IUsuario
): Promise<string | undefined> => {
    try {
        const response = await axios.post<AuthResponse>(
            apiUrlAuthController + "/registerCliente",
            datosRegister
        );

        const token = response.data.token;
        if (token) {
            localStorage.setItem("token", token); // ---> Guardar el 🔑 token en localStorage
        }

        return response.data.token;
    } catch (error) {
        console.error("Problemas en registerUsuarioClienteController", error);
    }
};

export const loginUsuarioHttp = async (
    datosLogin: ILoginRequest
): Promise<string | undefined> => {
    try {
        const response = await axios.post<AuthResponse>(apiUrlAuthController + "/login", datosLogin);
        const token = response.data.token;
        if (token) {
            localStorage.setItem("token", token); // ---> Guardar el 🔑 token en localStorage
        }
        return response.data.token;
    } catch (error) {
        console.error("Problemas en loginUsuarioController", error);
    }
};

export const validateTokenHttp = async (token: string): Promise<boolean | undefined> => {
    try {
        const response = await axios.get<boolean>(apiUrlAuthController + `/validarToken?token=${token}`)
        return response.data
    } catch (error) {
        console.error("Error al validar el token", error)
    }
}