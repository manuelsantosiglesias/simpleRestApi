import axios from 'axios';

let authToken = null;
let refreshToken = null;

// Conexión básica
export const createAxiosInstance = (baseURL, timeout = 5000) => {
    return axios.create({
        baseURL,
        timeout
    });
};

// Conexión usando Bearer Token
export const createAuthenticatedAxiosInstance = (baseURL, refreshPath, loginWithEnvCredentials, getAuthToken, getRefreshToken, setAuthToken, setRefreshToken, refreshAuthToken, timeout = 5000) => {
    const axiosInstance = axios.create({
        baseURL,
        timeout,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Interceptor para manejar la autenticación
    axiosInstance.interceptors.request.use(async (config) => {
        let token = getAuthToken();
        if (!token) {
            token = await loginWithEnvCredentials();
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // Interceptor para manejar la renovación de tokens
    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await refreshAuthToken(baseURL, refreshPath);
            if (newToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    });

    return axiosInstance;
};

const getAuthToken = () => {
    return authToken;
};

const getRefreshToken = () => {
    return refreshToken;
};

// Getter y setter de token (por ahora en local)
export const setAuthToken = (token) => {
    authToken = token;
};

export const setRefreshToken = (token) => {
    refreshToken = token;
};

export { getAuthToken, getRefreshToken };