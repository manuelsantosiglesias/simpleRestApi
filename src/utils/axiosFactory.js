import axios from 'axios';

export const createAxiosInstance = (baseURL, timeout = 5000) => {
    return axios.create({
        baseURL,
        timeout
    });
};