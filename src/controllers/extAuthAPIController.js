import axios from 'axios';
import emailService from '../services/emailService.js';
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
    // Usamos AxiosAuth
    const axiosInstance = createAuthenticatedAxiosInstance(
        ANOTHER_API_URL,
        REFRESH_PATH,
        loginWithEnvCredentials,
        getAuthToken,
        getRefreshToken,
        setAuthToken,
        setRefreshToken,
        refreshAuthToken
    );

    try {
        const response = await axiosInstance.get(`${ANOTHER_API_URL}/me`);
        res.json(response.data);
    } catch (error) {
        const errorMessage = error.response ? (error.response.data || error.message) : error.message;
        console.error('Failed to fetch user data:', errorMessage);
        // await emailService.sendErrorEmail(`Failed to fetch user data: ${errorMessage}`);
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
};