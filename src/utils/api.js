import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Cambiá si es otro host o puerto
});

// ✅ Agregar token automáticamente si existe
api.interceptors.request.use((config) => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Convertimos el string a objeto
  const token = user?.token; // Usamos optional chaining por si user es null
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(config);
  return config;
});

axios.interceptors.request.use(config => {
      console.log('Solicitud:', config);
      return config;
    });

    axios.interceptors.response.use(response => {
      console.log('Respuesta:', response);
      return response;
    });

export default api;
