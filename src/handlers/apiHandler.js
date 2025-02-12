import axios from '../utils/axiosInstance.js';

export const apiRequest = async (method, url, data = null, headers = {}) => {
    try {
        const response = await axios({
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