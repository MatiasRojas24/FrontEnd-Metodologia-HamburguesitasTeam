import axios from "axios";
import { validateTokenHttp } from "./authHttp";
import { navigateTo } from "../routes/navigation";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    const esValido = await validateTokenHttp(token);
    if (esValido) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("Token inválido o usuario no logueado");
      localStorage.clear();
      navigateTo("/register");
      throw new axios.Cancel("Token inválido o usuario no logueado");
    }
  }

  return config;
});

export default api