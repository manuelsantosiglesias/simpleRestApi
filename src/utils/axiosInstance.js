import axios from 'axios';

// TODO: Muy sencillo pasar sistema handler
// TODO: Handler SOAP ??

const instance = axios.create({
    baseURL: process.env.EXTERNAL_API_URL,
    timeout: 5000
});

export default instance;