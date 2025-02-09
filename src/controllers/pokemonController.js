import axios from '../utils/axiosInstance.js';
import emailService from '../services/emailService.js';

export const getPokemon = async (req, res) => {
    try {
        // TODO: PRUEBA DE CONCEPTO PASAR A HANDLER
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        res.json(response.data);
    } catch (error) {
        // MAIL SI NO ES POSIBLE OBTENER LOS DATOS
        await emailService.sendErrorEmail(error.message);
        res.status(500).json({ message: 'Failed to fetch data from external API' });
    }
};