import { createAxiosInstance, createAuthenticatedAxiosInstance } from '../utils/axiosFactory.js';

export const apiRequest = async (method, url, data = null, headers = {}, baseURL = process.env.EXTERNAL_API_URL) => {
    const axiosInstance = createAxiosInstance(baseURL);
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            headers
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch data from external API: ${error.message}`);
    }
};

export const apiRequestWithAuth = async (method, url, data = null, headers = {}, baseURL = process.env.EXTERNAL_API_URL, refreshPath = '/auth/refresh') => {
    const axiosInstance = createAuthenticatedAxiosInstance(baseURL, refreshPath);
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            headers
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch data from external API: ${error.message}`);
    }
};