import axios from "axios";
import { validateTokenHttp } from "./authHttp";   // Ajusta la ruta

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
      // Opcional: puedes limpiar el token del localStorage o redirigir
      localStorage.removeItem("token");
      // Redirigir
      throw new axios.Cancel("Token inválido o usuario no logueado");
    }
  }

  return config;
});

export default api