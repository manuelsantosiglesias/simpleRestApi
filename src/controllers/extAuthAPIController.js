import axios from 'axios';
import { setAuthToken, setRefreshToken, getAuthToken, getRefreshToken, createAuthenticatedAxiosInstance } from '../utils/axiosFactory.js';

const ANOTHER_API_URL = 'https://dummyjson.com/auth';
const LOGIN_PATH = '/login';
const REFRESH_PATH = '/refresh';

export const simpleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post(`${ANOTHER_API_URL}${LOGIN_PATH}`, {
            username,
            password,
            expiresInMins: 30
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Failed to login:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post(`${ANOTHER_API_URL}${LOGIN_PATH}`, {
            username,
            password,
            expiresInMins: 30
        });

        const data = response.data;
        setAuthToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        res.json(data);
    } catch (error) {
        console.error('Failed to login:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginWithEnvCredentials = async () => {
    const username = process.env.EXT_LOGIN;
    const password = process.env.EXT_PASS;

    try {
        const response = await axios.post(`${ANOTHER_API_URL}${LOGIN_PATH}`, {
            username,
            password,
            expiresInMins: 30
        });

        const data = response.data;
        setAuthToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        return data.accessToken;
    } catch (error) {
        throw new Error('No se pudo hacer login');
    }
};

// Enviamos refreshAuthToken a createAuthenticatedAxiosInstance
const refreshAuthToken = async (baseURL, refreshPath) => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post(`${baseURL}${refreshPath}`, { refreshToken });
        const newAuthToken = response.data.accessToken;
        setAuthToken(newAuthToken);
        return newAuthToken;
    } catch (error) {
        throw new Error('No se pudo refrescar el token');
    }
};

export const getCurrentUser = async (req, res) => {
    let token = getAuthToken();
    
    // TODO: cuando se salven credenciales en BD ya no se hace login siempre
    if (!token) {
        try {
            token = await loginWithEnvCredentials();
            } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Usamos AxiosAuth
    const axiosInstance = createAuthenticatedAxiosInstance(
        ANOTHER_API_URL,
        REFRESH_PATH,
        getAuthToken,
        getRefreshToken,
        refreshAuthToken
    );

    try {
        const response = await axiosInstance.get(`${ANOTHER_API_URL}/me`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
};