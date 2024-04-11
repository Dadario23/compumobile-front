import axios, { AxiosResponse, AxiosError } from "axios";
import { UserLogin /* , UserRegister  */ } from "@/types/userTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authAxios = axios.create({
  //
  baseURL: API_URL,
  withCredentials: true,
});

/* export const checkAuth = async (): Promise<any> => {
	try {
		const response: AxiosResponse = await authAxios.get('/api/users/me')
		const userData = response.data
		return userData
	} catch (error) {
		console.error('Error al verificar la autenticación:', error)
	}
} */

/* export const registerUser = async (userData: UserRegister) => {
	try {
		await authAxios.post('/api/users/register', {
			name: userData.nombre,
			surname: userData.apellido,
			email: userData.email,
			password: userData.contraseña,
			isAdmin: false,
			profileImage: userData.foto,
		})
		return true
	} catch (error) {
		console.error('Error during registration:', error)
		throw error
	}
} */

/* export const loginUser = async (
  email: string,
  password: string
): Promise<UserLogin> => {
  try {
    const response: AxiosResponse = await authAxios.post("/api/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
 */
export const dataLogout = async (): Promise<void> => {
  try {
    const response = await authAxios.post("/api/users/logout", {});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* export const getUserProfileImage = async () => {
  try {
    const response: AxiosResponse = await authAxios.get(
      "/api/users/profile-image"
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
}; */

/* export const mailForgotPassword = async (email: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/api/users/forgot-password`,
      { email }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const mailResetPassword = async (token: string, newPassword: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/api/users/reset-password`,
      {
        token,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error as AxiosError)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `Error ${axiosError.response.status}: ${axiosError.response.data}`
        );
      } else if (axiosError.request) {
        throw new Error(
          "No se recibió respuesta del servidor. Por favor, verifica tu conexión."
        );
      } else {
        throw new Error("Hubo un error al realizar la solicitud.");
      }
    } else {
      console.error(error);
      throw error;
    }
  }
};
 */
