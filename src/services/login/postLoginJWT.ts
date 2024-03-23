// import axios from 'axios';
// import getAuthHeaders from './authService'; // Ruta al archivo donde está definida la función

// const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE;
// const ENDPOINT = '/users/login';

// const postLoginJWT = async (refreshToken: string): Promise<string> => {
//   const data = { refresh: refreshToken };

//   const config = {
//     method: 'post',
//     url: BASE_URL + ENDPOINT,
//     headers: getAuthHeaders(), // Aquí usamos la función para obtener los encabezados de autenticación
//     data: JSON.stringify(data)
//   };

//   try {
//     const response = await axios.request(config);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export { postLoginJWT };

// //response.data.access
